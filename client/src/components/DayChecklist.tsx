import { useEffect } from "react";

export default function DayChecklist({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey as any);
    return () => window.removeEventListener('keydown', onKey as any);
  }, []);

  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-3">How to use Day 1 — 3 quick steps</h3>
        <ol className="list-decimal ml-5 space-y-2 text-sm">
          <li>Review the day's 20 target words aloud (5 minutes).</li>
          <li>Shadow the recommended video (7 minutes): listen and repeat.</li>
          <li>Do a quick production activity (write/speak one short response).</li>
        </ol>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-1 rounded bg-primary text-primary-foreground">Got it</button>
        </div>
      </div>
    </div>
  );
}
