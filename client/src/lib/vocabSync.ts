type QueuedReview = { wordId: number; quality: number; created_at: number };

const QUEUE_KEY = "ae_vocab_review_queue";

function readQueue(): QueuedReview[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as QueuedReview[];
  } catch {
    return [];
  }
}

function writeQueue(items: QueuedReview[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
  } catch {}
}

export function queueReview(review: { wordId: number; quality: number }) {
  const q = readQueue();
  q.push({ wordId: review.wordId, quality: review.quality, created_at: Date.now() });
  writeQueue(q);
}

export async function flushQueue(): Promise<{ success: boolean; synced?: number } | null> {
  const q = readQueue();
  if (q.length === 0) return { success: true, synced: 0 };

  try {
    const resp = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "local", reviews: q }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    if (data && data.success) {
      writeQueue([]);
      return { success: true, synced: data.synced };
    }
    return null;
  } catch {
    return null;
  }
}

let daemonStarted = false;
export function startSyncDaemon(intervalMs = 30_000) {
  if (typeof window === "undefined" || daemonStarted) return;
  daemonStarted = true;

  const tryFlush = async () => {
    if (!navigator.onLine) return;
    await flushQueue();
  };

  window.addEventListener("online", tryFlush);
  // attempt immediately, and periodically
  tryFlush();
  setInterval(tryFlush, intervalMs);
}

export default { queueReview, flushQueue, startSyncDaemon };
