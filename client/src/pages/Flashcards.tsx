import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CardItem = {
  id: string;
  front: string;
  back: string;
  reps: number; // repetition count
  interval: number; // days
  ef: number; // easiness factor
  nextReview: number; // epoch ms
};

const STORAGE_KEY = "ae_flashcards_deck";

const sampleDeck: CardItem[] = [
  {
    id: "the",
    front: "the",
    back: "definite article — The book is here",
    reps: 0,
    interval: 0,
    ef: 2.5,
    nextReview: Date.now(),
  },
  {
    id: "be",
    front: "be",
    back: "verb — I am happy",
    reps: 0,
    interval: 0,
    ef: 2.5,
    nextReview: Date.now(),
  },
  {
    id: "to",
    front: "to",
    back: "preposition/infinitive marker — I want to go",
    reps: 0,
    interval: 0,
    ef: 2.5,
    nextReview: Date.now(),
  },
  {
    id: "and",
    front: "and",
    back: "connector — You and me",
    reps: 0,
    interval: 0,
    ef: 2.5,
    nextReview: Date.now(),
  },
  {
    id: "have",
    front: "have",
    back: "verb — I have a book",
    reps: 0,
    interval: 0,
    ef: 2.5,
    nextReview: Date.now(),
  },
];

function loadDeck(): CardItem[] {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CardItem[];
    }
  } catch (e) {
    // ignore
  }
  return sampleDeck;
}

function saveDeck(deck: CardItem[]) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    }
  } catch (e) {}
}

export default function Flashcards(): React.ReactNode {
  const [deck, setDeck] = useState<CardItem[]>(() => loadDeck());
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

  const due = useMemo(() => deck.filter((c) => c.nextReview <= now), [deck, now]);
  const nextCard = due.length > 0 ? due[0] : null;

  const handleReview = (cardId: string, quality: number) => {
    // SM-2 like algorithm
    setDeck((prev) => {
      return prev.map((c) => {
        if (c.id !== cardId) return c;

        const q = Math.max(0, Math.min(5, quality));
        let { reps, interval, ef } = c;

        if (q < 3) {
          reps = 0;
          interval = 1;
        } else {
          if (reps === 0) interval = 1;
          else if (reps === 1) interval = 6;
          else interval = Math.round(interval * ef);
          reps = reps + 1;
        }

        // update EF
        ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
        if (ef < 1.3) ef = 1.3;

        const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

        return { ...c, reps, interval, ef, nextReview };
      });
    });

    setShowBack(false);
  };

  const handleAddSample = () => {
    const id = `card_${Date.now()}`;
    const item: CardItem = {
      id,
      front: "new",
      back: "Example back",
      reps: 0,
      interval: 0,
      ef: 2.5,
      nextReview: Date.now(),
    };
    setDeck((d) => [item, ...d]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-4">Flashcards</h1>
          <p className="text-muted-foreground mb-6">Study due cards using spaced repetition. Cards with the earliest review time appear first.</p>

          <div className="mb-6">
            <Button className="bg-primary text-primary-foreground mr-2" onClick={() => setDeck(loadDeck())}>Reset Deck</Button>
            <Button variant="outline" onClick={handleAddSample}>Add Sample Card</Button>
          </div>

          <Card className="p-8">
            {nextCard ? (
              <div>
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground">Due now</div>
                  <h2 className="text-2xl font-bold text-foreground mt-2">{nextCard.front}</h2>
                </div>

                <div className="mb-6">
                  <div className={`p-6 rounded border ${showBack ? "bg-secondary/10" : "bg-primary/5"}`}> 
                    {showBack ? <p className="text-foreground">{nextCard.back}</p> : <p className="text-muted-foreground">Tap "Show" to reveal answer</p>}
                  </div>
                </div>

                <div className="flex gap-3">
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
                <Button className="bg-primary text-primary-foreground" onClick={() => setDeck((d) => d.map(c => ({ ...c, nextReview: Date.now() }))) }>Make all due now</Button>
              </div>
            )}
          </Card>

          <div className="mt-6">
            <h3 className="font-bold text-foreground mb-3">Deck Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {deck.map((c) => (
                <Card key={c.id} className="p-3 text-sm">
                  <div className="font-semibold">{c.front}</div>
                  <div className="text-muted-foreground text-xs italic">{c.back}</div>
                  <div className="text-xs text-muted-foreground mt-2">Next: {new Date(c.nextReview).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Interval: {c.interval}d • EF: {c.ef.toFixed(2)} • Reps: {c.reps}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
