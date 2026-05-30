import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  phrase: string;
  answer?: string;
  onClose?: () => void;
};

export default function Cloze({ phrase, answer = "", onClose }: Props) {
  const blankMarker = "...";
  const hasMarker = phrase.includes(blankMarker);
  const displayPhrase = hasMarker ? phrase.replace(blankMarker, "__") : phrase;
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<boolean | null>(null);

  const check = () => {
    const clean = value.trim().toLowerCase();
    setChecked(clean.length > 0 && (answer ? clean === answer.toLowerCase() : true));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Cloze Practice</h3>
        <p className="mb-4">{displayPhrase}</p>

        <div className="mb-4">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type the missing words"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button onClick={check}>Check</Button>
        </div>

        {checked !== null && (
          <div className={`mt-4 p-3 rounded ${checked ? "bg-green-50" : "bg-red-50"}`}>
            {checked ? "Correct — well done!" : "Not quite — try again."}
          </div>
        )}
      </div>
    </div>
  );
}
