import { useEffect, useState } from "react";

export default function Tour({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    "Welcome — this 60s tour shows core actions: Start, Practice, Review.",
    "Day cards: tap a day to open the day's plan and video.",
    "Practice tray: open advanced tools (shadowing, typing, cloze).",
    "Tip: Follow the 20‑minute checklist for quick daily progress.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          localStorage.setItem("seenTour", "1");
          onClose?.();
          clearInterval(timer);
          return s;
        }
        return s + 1;
      });
    }, 15000); // 4 steps × 15s = 60s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => { localStorage.setItem("seenTour","1"); onClose?.(); }}></div>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-2">Quick Tour</h3>
        <p className="text-sm text-muted-foreground mb-4">{steps[step]}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Step {step + 1} / {steps.length}</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-secondary/10" onClick={() => { localStorage.setItem("seenTour","1"); onClose?.(); }}>Skip</button>
            <button className="px-3 py-1 rounded bg-primary text-primary-foreground" onClick={() => {
              if (step >= steps.length - 1) { localStorage.setItem("seenTour","1"); onClose?.(); }
              else setStep(step + 1);
            }}>{step >= steps.length - 1 ? "Done" : "Next"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
