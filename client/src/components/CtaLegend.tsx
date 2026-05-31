export default function CtaLegend() {
  return (
    <div className="rounded-lg border border-border bg-white/50 p-3 text-sm text-muted-foreground">
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <div className="font-semibold text-foreground">Start</div>
          <div className="text-muted-foreground">Begin a focused 20‑minute session</div>
        </div>
        <div>
          <div className="font-semibold text-foreground">Practice</div>
          <div className="text-muted-foreground">Open tools: shadowing, typing, cloze</div>
        </div>
        <div>
          <div className="font-semibold text-foreground">Review</div>
          <div className="text-muted-foreground">See progress or revisit previous lessons</div>
        </div>
      </div>
    </div>
  );
}
