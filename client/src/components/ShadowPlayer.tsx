import React, { useEffect, useRef, useState } from "react";

type Props = { src?: string | null };

export default function ShadowPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [url, setUrl] = useState<string | null>(src ?? null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loopStart, setLoopStart] = useState<number>(0);
  const [loopEnd, setLoopEnd] = useState<number>(0);

  useEffect(() => {
    if (src) setUrl(src);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = speed;

    const timeHandler = () => setCurrentTime(audio.currentTime || 0);
    const durHandler = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", timeHandler);
    audio.addEventListener("loadedmetadata", durHandler);

    return () => {
      audio.removeEventListener("timeupdate", timeHandler);
      audio.removeEventListener("loadedmetadata", durHandler);
    };
  }, [speed, url]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (loopEnabled && loopEnd > loopStart) {
      const onTime = () => {
        if (audio.currentTime >= loopEnd) {
          audio.currentTime = loopStart;
          audio.play();
        }
      };
      audio.addEventListener("timeupdate", onTime);
      return () => audio.removeEventListener("timeupdate", onTime);
    }
  }, [loopEnabled, loopStart, loopEnd, url]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !url) return;
    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (e) {
      // play failed (autoplay policy)
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  };

  const setStartHere = () => setLoopStart(Math.max(0, Math.floor(currentTime)));
  const setEndHere = () => setLoopEnd(Math.max(0, Math.ceil(currentTime)));

  return (
    <div className="p-4 border border-border rounded-md">
      <div className="mb-3">
        <label className="text-sm text-muted-foreground">Audio URL</label>
        <div className="flex gap-2 mt-2">
          <input
            value={url ?? ""}
            onChange={(e) => setUrl(e.target.value || null)}
            placeholder="Paste .mp3/.ogg/.wav URL or drop a file URL"
            className="flex-1 input"
          />
          <button className="btn" onClick={() => { setUrl(null); if (audioRef.current) { audioRef.current.pause(); } }}>Clear</button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <button className="btn" onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
        <button className="btn" onClick={stop}>Stop</button>

        <label className="text-sm text-muted-foreground">Speed</label>
        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="select">
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
            <option key={s} value={s}>{s}x</option>
          ))}
        </select>
      </div>

      <div className="mb-3 text-sm text-muted-foreground">{Math.floor(currentTime)}s / {isFinite(duration) ? Math.floor(duration) : "-"}s</div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <label className="font-semibold">Loop segment</label>
          <label className="text-sm text-muted-foreground">Enable</label>
          <input type="checkbox" checked={loopEnabled} onChange={(e) => setLoopEnabled(e.target.checked)} />
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">Start</div>
            <input type="number" value={loopStart} onChange={(e) => setLoopStart(Number(e.target.value))} className="input input-xs w-20" />
            <button className="btn btn-xs" onClick={setStartHere}>Set to Current</button>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">End</div>
            <input type="number" value={loopEnd} onChange={(e) => setLoopEnd(Number(e.target.value))} className="input input-xs w-20" />
            <button className="btn btn-xs" onClick={setEndHere}>Set to Current</button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={url ?? undefined} preload="metadata" />
    </div>
  );
}
