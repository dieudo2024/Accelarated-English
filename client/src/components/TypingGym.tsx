import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = { prompt?: string; duration?: number; onClose?: () => void };

export default function TypingGym({ prompt = "Type the sentence as fast and accurately as you can.", duration = 30, onClose }: Props) {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [running, setRunning] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ wpm: number; accuracy: number } | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      timerRef.current = window.setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = null; };
  }, [running]);

  useEffect(() => {
    if (timeLeft === 0 && running) {
      setRunning(false);
      finish();
    }
  }, [timeLeft, running]);

  const start = () => {
    setText("");
    setResult(null);
    setTimeLeft(duration);
    setRunning(true);
  };

  const finish = () => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = (duration - timeLeft) / 60 || 0.001;
    const wpm = Math.round(words / minutes);
    // crude accuracy: percent of characters that match prompt start
    let matches = 0;
    const compareLen = Math.min(text.length, prompt.length);
    for (let i = 0; i < compareLen; i++) if (text[i] === prompt[i]) matches++;
    const accuracy = Math.round((matches / Math.max(1, text.length)) * 100);
    setResult({ wpm, accuracy });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Typing Gym</h3>
        <p className="text-sm text-muted-foreground mb-4">{prompt}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold">{timeLeft}s</div>
          {!running ? (
            <Button onClick={start}>Start {duration}s</Button>
          ) : (
            <Button variant="destructive" onClick={() => { setRunning(false); finish(); }}>Stop</Button>
          )}
        </div>

        <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} className="w-full p-3 border rounded mb-4" placeholder="Start typing when you press Start..." />

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>

        {result && (
          <div className="mt-4 p-3 bg-primary/5 rounded">
            <div>WPM: <strong>{result.wpm}</strong></div>
            <div>Accuracy: <strong>{result.accuracy}%</strong></div>
          </div>
        )}
      </div>
    </div>
  );
}
