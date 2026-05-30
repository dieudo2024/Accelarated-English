import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CORE_WORDS,
  CoreWordCard,
  getCoreWordProgress,
  getStoredCoreDeck,
  reviewCoreWordCard,
} from "@/lib/coreWords";

const STORAGE_KEY = "ae_flashcards_deck";

function saveDeck(deck: CoreWordCard[]) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    }
  } catch (e) {}
}

export default function Flashcards(): React.ReactNode {
  const [deck, setDeck] = useState<CoreWordCard[]>(() => getStoredCoreDeck(STORAGE_KEY));
  const [showBack, setShowBack] = useState(false);
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    saveDeck(deck);
  }, [deck]);

  // tick "now" every 30s so due list updates
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const progress = useMemo(() => getCoreWordProgress(deck, now), [deck, now]);
  const due = useMemo(() => deck.filter((card) => card.nextReview <= now).sort((left, right) => left.nextReview - right.nextReview), [deck, now]);
  const nextCard = due.length > 0 ? due[0] : null;
  const unlocked = progress.masteredCount >= CORE_WORDS.length;

  const handleReview = (cardId: string, quality: number) => {
    setDeck((prev) => {
      return prev.map((c) => {
        if (c.id !== cardId) return c;

        return reviewCoreWordCard(c, quality, Date.now());
      });
    });

    setShowBack(false);
  };

  const handleAddSample = () => {
    setDeck((d) => getStoredCoreDeck(STORAGE_KEY).map((card) => ({ ...card })));
  };

  const exportDeckCSV = (items: CoreWordCard[]) => {
    if (typeof window === "undefined") return;
    const rows = [
      ["id", "front", "back", "box", "reps", "interval", "ef", "nextReview"],
      ...items.map((card) => [
        card.id,
        escapeCsv(card.front),
        escapeCsv(card.back),
        String(card.box),
        String(card.reps),
        String(card.interval),
        String(card.ef),
        new Date(card.nextReview).toISOString(),
      ]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ae_core_words_${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const printDeckFlashcards = (items: CoreWordCard[]) => {
    if (typeof window === "undefined") return;
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;
    const styles = `body{font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:20px} .card{width:45%;display:inline-block;border:1px solid #ddd;border-radius:6px;padding:12px;margin:6px;vertical-align:top} .front{font-weight:700;font-size:16px;margin-bottom:8px} .back{color:#444;font-size:14px} .meta{color:#666;font-size:12px;margin-top:6px}`;
    const html = `<!doctype html><html><head><title>Flashcards</title><style>${styles}</style></head><body>${items
      .map(
        (card) => `<div class="card"><div class="front">${escapeHtml(card.front)}</div><div class="back">${escapeHtml(card.back)}</div><div class="meta">Box ${card.box} • Next ${new Date(card.nextReview).toLocaleDateString()}</div></div>`
      )
      .join("")}<script>window.onload=()=>{window.print();}</script></body></html>`;

    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container max-w-5xl">
          <div className="flex flex-col gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Flashcards</h1>
              <p className="text-muted-foreground max-w-2xl">Study the full 1,000-word core deck with Leitner progression. Advanced lessons unlock only after the core set is mastered.</p>
            </div>

            <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Core mastery</div>
                  <div className="text-2xl font-bold text-foreground mt-1">{progress.masteredCount}/{CORE_WORDS.length}</div>
                  <div className="text-sm text-muted-foreground">{unlocked ? "Gate open" : "Advanced lessons locked"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Due today</div>
                  <div className="text-2xl font-bold text-foreground mt-1">{progress.dueCount}</div>
                  <div className="text-sm text-muted-foreground">Ready for review now</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Review target</div>
                  <div className="text-2xl font-bold text-foreground mt-1">1,000</div>
                  <div className="text-sm text-muted-foreground">High-frequency gateway</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Daily routine</div>
                  <div className="text-2xl font-bold text-foreground mt-1">Leitner</div>
                  <div className="text-sm text-muted-foreground">Boxed spaced repetition</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {([1, 2, 3, 4, 5] as const).map((box) => (
                  <div key={box} className="rounded-lg border border-border bg-secondary/20 p-3">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Box {box}</div>
                    <div className="text-2xl font-bold text-foreground mt-1">{progress.boxCounts[box]}</div>
                    <div className="text-sm text-muted-foreground">Review every {box === 1 ? "day" : `${[1, 3, 7, 14, 30][box - 1]} days`}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button className="bg-primary text-primary-foreground" onClick={() => setDeck(getStoredCoreDeck(STORAGE_KEY))}>Reset Core Deck</Button>
              <Button variant="outline" onClick={handleAddSample}>Restore Core Deck</Button>
              <Button variant="ghost" onClick={() => exportDeckCSV(deck)}>Export CSV</Button>
              <Button variant="outline" onClick={() => printDeckFlashcards(deck)}>Print Flashcards</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card className="p-8">
              {nextCard ? (
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Due now</div>
                      <h2 className="text-2xl font-bold text-foreground mt-2">{nextCard.front}</h2>
                    </div>
                    <div className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-foreground">Box {nextCard.box}</div>
                  </div>

                  <div className="mb-6">
                    <div className={`p-6 rounded border ${showBack ? "bg-secondary/10" : "bg-primary/5"}`}>
                      {showBack ? <p className="text-foreground">{nextCard.back}</p> : <p className="text-muted-foreground">Tap "Show" to reveal answer</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => setShowBack((s) => !s)}>{showBack ? "Hide" : "Show"}</Button>
                    <Button className="bg-destructive text-primary-foreground" onClick={() => handleReview(nextCard.id, 0)}>Again</Button>
                    <Button variant="outline" onClick={() => handleReview(nextCard.id, 3)}>Hard</Button>
                    <Button className="bg-primary text-primary-foreground" onClick={() => handleReview(nextCard.id, 4)}>Good</Button>
                    <Button className="bg-secondary text-foreground" onClick={() => handleReview(nextCard.id, 5)}>Easy</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No cards due right now. Come back later or reset the deck.</p>
                  <Button className="bg-primary text-primary-foreground" onClick={() => setDeck((d) => d.map((card) => ({ ...card, nextReview: Date.now() }))) }>Make all due now</Button>
                </div>
              )}
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-foreground mb-3">Leitner Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-4">Words move up a box when you answer correctly and fall back to Box 1 when you miss them.</p>
                <div className="space-y-3">
                  {([1, 2, 3, 4, 5] as const).map((box) => (
                    <div key={box} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                      <div>
                        <div className="font-medium text-foreground">Box {box}</div>
                        <div className="text-xs text-muted-foreground">{box === 1 ? "Immediate review" : `${[1, 3, 7, 14, 30][box - 1]}-day spacing`}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{progress.boxCounts[box]}</div>
                        <div className="text-xs text-muted-foreground">cards</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-foreground mb-3">Deck Overview</h3>
                <div className="grid grid-cols-1 gap-3 max-h-[34rem] overflow-y-auto pr-1">
                  {deck.slice(0, 12).map((card) => (
                    <div key={card.id} className="rounded-md border border-border p-3 text-sm bg-background">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-foreground">{card.front}</div>
                        <div className="text-xs rounded-full bg-secondary/20 px-2 py-0.5 text-foreground">Box {card.box}</div>
                      </div>
                      <div className="text-muted-foreground text-xs italic mt-1">{card.back}</div>
                      <div className="text-xs text-muted-foreground mt-2">Next: {new Date(card.nextReview).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Interval: {card.interval}d • EF: {card.ef.toFixed(2)} • Reps: {card.reps}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function escapeCsv(value: string) {
  if (value == null) return "";
  const needs = /[",\n]/.test(value);
  let out = value.replace(/"/g, '""');
  if (needs) out = `"${out}"`;
  return out;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}
