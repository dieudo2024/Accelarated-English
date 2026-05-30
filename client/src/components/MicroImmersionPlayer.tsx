import React from "react";
import { Card } from "@/components/ui/card";

type SubtitleLine = { t: number; text: string };

type Props = { videoUrl: string; subtitles?: SubtitleLine[] };

export default function MicroImmersionPlayer({ videoUrl, subtitles = [] }: Props) {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="aspect-video w-full bg-black">
            <iframe title="micro-immersion" src={videoUrl} className="w-full h-full" />
          </div>
        </div>

        <div className="p-2 border rounded h-full overflow-auto">
          <h4 className="font-semibold mb-2">Subtitles / Glossary</h4>
          {subtitles.length === 0 ? (
            <p className="text-sm text-muted-foreground">No subtitles available for this clip.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {subtitles.map((s, i) => (
                <li key={i} className="cursor-pointer hover:bg-primary/5 p-1 rounded" onClick={() => { window.postMessage({ type: "seek", t: s.t }, "*"); }}>
                  <div className="text-xs text-muted-foreground">{formatTime(s.t)}</div>
                  <div>{s.text}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}

function formatTime(t: number) {
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  const m = Math.floor(t / 60).toString();
  return `${m}:${s}`;
}
