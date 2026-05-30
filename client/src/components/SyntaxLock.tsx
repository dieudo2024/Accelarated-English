import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  sentence: string; // simple S V O sentence
  onClose?: () => void;
};

export default function SyntaxLock({ sentence, onClose }: Props) {
  const words = sentence.split(" ").filter(Boolean);
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [remaining, setRemaining] = useState<string[]>(words.slice());
  const [result, setResult] = useState<boolean | null>(null);

  const place = (word: string, idx: number) => {
    const next = slots.slice();
    next[idx] = word;
    setSlots(next);
    setRemaining((r) => r.filter((w) => w !== word));
  };

  const removeFromSlot = (idx: number) => {
    const next = slots.slice();
    if (next[idx]) setRemaining((r) => [...r, next[idx] as string]);
    next[idx] = null;
    setSlots(next);
  };

  const check = () => {
    const assembled = slots.map((s) => s || "").join(" ").trim();
    setResult(assembled === sentence);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Syntax Constraint (S‑V‑O)</h3>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Drag words into the 3 slots to form a correct S‑V‑O sentence.</p>
        </div>

        <div className="mb-4 flex gap-3">
          {slots.map((s, i) => (
            <div key={i} className="flex-1 p-3 border rounded min-h-[56px]">
              <div className="flex justify-between items-start">
                <strong>Slot {i + 1}</strong>
                {s && (
                  <button className="text-sm text-red-600" onClick={() => removeFromSlot(i)}>Remove</button>
                )}
              </div>
              <div className="mt-3">{s || <em className="text-sm text-muted-foreground">empty</em>}</div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <p className="mb-2 font-semibold">Available words</p>
          <div className="flex flex-wrap gap-2">
            {remaining.map((w, i) => (
              <button key={i} onClick={() => place(w, slots.findIndex(s => s === null))} className="px-3 py-1 border rounded">
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button onClick={check}>Check</Button>
        </div>

        {result !== null && (
          <div className={`mt-4 p-3 rounded ${result ? "bg-green-50" : "bg-red-50"}`}>
            {result ? "Correct S‑V‑O order!" : "Order incorrect — try again."}
          </div>
        )}
      </div>
    </div>
  );
}
