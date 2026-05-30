import React, { useState } from "react";
import Cloze from "@/components/Cloze";
import SyntaxLock from "@/components/SyntaxLock";
import TypingGym from "@/components/TypingGym";
import MicroImmersionPlayer from "@/components/MicroImmersionPlayer";
import ShadowPlayer from "@/components/ShadowPlayer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  recommendedAudio?: string | null;
  recommendedVideo?: string | null;
  topWords?: string[];
  onClose?: () => void;
};

export default function PracticeTray({ recommendedAudio, recommendedVideo, topWords = [], onClose }: Props) {
  const [showCloze, setShowCloze] = useState(false);
  const [showSyntax, setShowSyntax] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showImmersion, setShowImmersion] = useState(false);
  const [showShadow, setShowShadow] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl p-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Practice Tray — Listen → Shadow → Record</h3>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>Close</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2 font-semibold">Primary Flow</p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => setShowShadow((s) => !s)}>{showShadow ? "Hide Player" : "Open Shadow Player"}</Button>
                <Button onClick={() => setShowImmersion(true)}>Open Immersion Player</Button>
                <Button onClick={() => setShowTyping(true)}>Start Typing Gym (Sprint)</Button>
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold">Practice Tools (Advanced)</p>
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => setShowCloze(true)}>Cloze (Fill the Blank)</Button>
                <Button variant="outline" onClick={() => setShowSyntax(true)}>Syntax Lock (S‑V‑O)</Button>
                <Button variant="outline" onClick={() => setShowTyping(true)}>Typing Gym</Button>
              </div>
            </div>
          </div>

          {showShadow && (
            <div className="mt-4">
              <ShadowPlayer src={recommendedAudio ?? null} audioOptions={recommendedAudio ? [{ id: "rec", title: "Recommended", level: "Beginner", description: "Recommended audio", url: recommendedAudio }] : []} />
            </div>
          )}

          {showImmersion && (
            <div className="mt-4">
              <MicroImmersionPlayer videoUrl={recommendedVideo ?? ""} />
            </div>
          )}

          {showCloze && <Cloze phrase={topWords.slice(0,5).join(" ") + " ..."} onClose={() => setShowCloze(false)} />}
          {showSyntax && <SyntaxLock sentence={`I want coffee`} onClose={() => setShowSyntax(false)} />}
          {showTyping && <TypingGym onClose={() => setShowTyping(false)} />}
        </Card>
      </div>
    </div>
  );
}
