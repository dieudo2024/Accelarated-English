import express from "express";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const router = express.Router();

const DB_DIR = path.resolve(import.meta.url.replace("file://", ""), "..", "data");
const DB_PATH = path.join(path.dirname(import.meta.url.replace("file://", "")), "data", "vocab.db");

function ensureDataDir() {
  const dir = path.join(path.dirname(import.meta.url.replace("file://", "")), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDataDir();

const db = new Database(DB_PATH);

// Initialize schema
db.exec(`
CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word TEXT NOT NULL UNIQUE,
  meta TEXT,
  level TEXT
);

CREATE TABLE IF NOT EXISTS deck (
  user_id TEXT NOT NULL,
  word_id INTEGER NOT NULL,
  reps INTEGER DEFAULT 0,
  interval INTEGER DEFAULT 0,
  ef REAL DEFAULT 2.5,
  box INTEGER DEFAULT 1,
  next_review INTEGER DEFAULT 0,
  last_review INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, word_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  word_id INTEGER,
  quality INTEGER,
  created_at INTEGER
);
`);

function sm2Update(reps: number, ef: number, interval: number, quality: number) {
  // simple SM-2 update
  if (quality < 3) {
    reps = 0;
    interval = 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ef);
    ef = Math.max(1.3, ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  }
  return { reps, ef, interval };
}

// GET /api/coreWords - list words
router.get("/coreWords", (_req, res) => {
  const rows = db.prepare("SELECT id, word, meta, level FROM words ORDER BY id LIMIT 1000").all();
  res.json(rows);
});

// POST /api/seed-core - seed core words array: [{word, meta, level}]
router.post("/seed-core", (req, res) => {
  try {
    const items: Array<{ word: string; meta?: any; level?: string }> = req.body || [];
    const insert = db.prepare("INSERT OR IGNORE INTO words (word, meta, level) VALUES (@word, @meta, @level)");
    const insertMany = db.transaction((rows: any[]) => {
      for (const r of rows) insert.run({ word: r.word, meta: r.meta ? JSON.stringify(r.meta) : null, level: r.level || null });
    });
    insertMany(items);
    res.json({ success: true, inserted: items.length });
  } catch (e) {
    res.status(500).json({ success: false, error: String(e) });
  }
});

// GET /api/deck?user=local
router.get("/deck", (req, res) => {
  const user = String(req.query.user || "local");
  const rows = db.prepare(
    `SELECT d.user_id, d.word_id, d.reps, d.interval, d.ef, d.box, d.next_review, w.word, w.meta FROM deck d JOIN words w ON w.id = d.word_id WHERE d.user_id = ? ORDER BY d.next_review ASC`
  ).all(user);
  res.json(rows);
});

// POST /api/review - { userId, wordId, quality }
router.post("/review", (req, res) => {
  try {
    const { userId = "local", wordId, quality } = req.body as { userId?: string; wordId: number; quality: number };
    if (!wordId || typeof quality !== "number") return res.status(400).json({ error: "missing" });
    const now = Date.now();
    const deckRow = db.prepare("SELECT reps, ef, interval FROM deck WHERE user_id = ? AND word_id = ?").get(userId, wordId) || { reps: 0, ef: 2.5, interval: 0 };
    const updated = sm2Update(deckRow.reps, deckRow.ef, deckRow.interval, quality);
    const nextReview = now + updated.interval * 24 * 60 * 60 * 1000;

    db.prepare(
      `INSERT INTO deck (user_id, word_id, reps, interval, ef, box, next_review, last_review)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, word_id) DO UPDATE SET reps=excluded.reps, interval=excluded.interval, ef=excluded.ef, box=excluded.box, next_review=excluded.next_review, last_review=excluded.last_review`
    ).run(userId, wordId, updated.reps, updated.interval, updated.ef, Math.min(5, Math.max(1, updated.reps)), nextReview, now);

    db.prepare("INSERT INTO reviews (user_id, word_id, quality, created_at) VALUES (?, ?, ?, ?)").run(userId, wordId, quality, now);

    res.json({ success: true, nextReview, reps: updated.reps, ef: updated.ef, interval: updated.interval });
  } catch (e) {
    res.status(500).json({ success: false, error: String(e) });
  }
});

// GET /api/analytics?user=local
router.get("/analytics", (req, res) => {
  const user = String(req.query.user || "local");
  try {
    const total = db.prepare("SELECT COUNT(*) as c FROM words").get().c;
    const mastered = db.prepare("SELECT COUNT(*) as c FROM deck WHERE user_id = ? AND reps >= 5").get(user).c;
    const due = db.prepare("SELECT COUNT(*) as c FROM deck WHERE user_id = ? AND next_review <= ?").get(user, Date.now()).c;
    const reviews = db.prepare("SELECT COUNT(*) as c FROM reviews WHERE user_id = ?").get(user).c;
    res.json({ total, mastered, due, reviews });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// POST /api/sync - bulk sync reviews: { userId, reviews: [{ wordId, quality, created_at }] }
router.post("/sync", (req, res) => {
  try {
    const { userId = "local", reviews = [] } = req.body as { userId?: string; reviews: Array<{ wordId: number; quality: number; created_at?: number }> };
    const now = Date.now();
    const insertReview = db.prepare("INSERT INTO reviews (user_id, word_id, quality, created_at) VALUES (?, ?, ?, ?)");
    const upsertDeck = db.prepare(
      `INSERT INTO deck (user_id, word_id, reps, interval, ef, box, next_review, last_review)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, word_id) DO UPDATE SET reps=excluded.reps, interval=excluded.interval, ef=excluded.ef, box=excluded.box, next_review=excluded.next_review, last_review=excluded.last_review`
    );

    const process = db.transaction((items: any[]) => {
      for (const r of items) {
        const wordId = r.wordId;
        const quality = Number(r.quality || 0);
        const t = Number(r.created_at || now);
        const deckRow = db.prepare("SELECT reps, ef, interval FROM deck WHERE user_id = ? AND word_id = ?").get(userId, wordId) || { reps: 0, ef: 2.5, interval: 0 };
        const updated = sm2Update(deckRow.reps, deckRow.ef, deckRow.interval, quality);
        const nextReview = t + updated.interval * 24 * 60 * 60 * 1000;

        upsertDeck.run(userId, wordId, updated.reps, updated.interval, updated.ef, Math.min(5, Math.max(1, updated.reps)), nextReview, t);
        insertReview.run(userId, wordId, quality, t);
      }
    });

    process(reviews);

    res.json({ success: true, synced: reviews.length });
  } catch (e) {
    res.status(500).json({ success: false, error: String(e) });
  }
});

export default router;
