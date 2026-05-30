import React, { useEffect, useRef, useState } from "react";

type AudioOption = {
  id: string;
  title: string;
  level: string;
  description: string;
  url: string;
};

type Props = {
  src?: string | null;
  audioOptions?: AudioOption[];
};

export default function ShadowPlayer({ src, audioOptions = [] }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);

  const [url, setUrl] = useState<string | null>(src ?? null);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(audioOptions[0]?.id ?? "");
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loopStart, setLoopStart] = useState<number>(0);
  const [loopEnd, setLoopEnd] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    if (src) setUrl(src);
  }, [src]);

  useEffect(() => {
    if (audioOptions.length === 0) return;
    const initialOption = audioOptions.find((option) => option.url === src) ?? audioOptions[0];
    setSelectedOptionId(initialOption.id);
    setUrl(initialOption.url);
  }, [audioOptions, src]);

  useEffect(() => {
    return () => {
      cleanupMic();
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
      }
    };
  }, [recordedUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = speed;

    const timeHandler = () => setCurrentTime(audio.currentTime || 0);
    const durHandler = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", timeHandler);
    audio.addEventListener("loadedmetadata", durHandler);
    audio.addEventListener("error", () => {
      setAudioError("Could not load this audio URL. Make sure it points directly to an audio file.");
      setPlaying(false);
    });

    return () => {
      audio.removeEventListener("timeupdate", timeHandler);
      audio.removeEventListener("loadedmetadata", durHandler);
    };
  }, [speed, url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !url) return;

    setAudioError(null);
    audio.pause();
    setPlaying(false);
    audio.load();
  }, [url]);

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

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    context.fillStyle = "rgba(34, 197, 94, 0.08)";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "rgba(34, 197, 94, 0.9)";
    context.lineWidth = 2;
    context.beginPath();

    const sliceWidth = width / data.length;
    let x = 0;
    for (let i = 0; i < data.length; i += 1) {
      const v = data[i] / 128.0;
      const y = (v * height) / 2;
      if (i === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(width, height / 2);
    context.stroke();

    animationRef.current = requestAnimationFrame(drawWaveform);
  };

  const cleanupMic = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    recordingChunksRef.current = [];
    setMicReady(false);
    setIsRecording(false);
  };

  const initMic = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError("Microphone capture is not supported in this browser.");
      return;
    }

    try {
      cleanupMic();
      setMicError(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const sourceNode = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;

      sourceNode.connect(analyser);

      mediaStreamRef.current = stream;
      audioContextRef.current = context;
      analyserRef.current = analyser;
      setMicReady(true);
      drawWaveform();
    } catch (error) {
      setMicError("Could not access microphone. Check browser permissions.");
    }
  };

  const startRecording = () => {
    if (!mediaStreamRef.current) {
      setMicError("Initialize microphone first.");
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      setMicError("MediaRecorder is not supported in this browser.");
      return;
    }

    try {
      setMicError(null);
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
        setRecordedUrl(null);
      }

      recordingChunksRef.current = [];
      const recorder = new MediaRecorder(mediaStreamRef.current);
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordingChunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(recordingChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const nextRecordedUrl = URL.createObjectURL(blob);
        setRecordedUrl(nextRecordedUrl);
        setUrl(nextRecordedUrl);
        setIsRecording(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (error) {
      setMicError("Failed to start recording.");
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") return;
    recorder.stop();
  };

  const downloadRecording = () => {
    if (!recordedUrl) return;
    const anchor = document.createElement("a");
    anchor.href = recordedUrl;
    anchor.download = `shadowing-${new Date().toISOString().replace(/[:.]/g, "-")}.webm`;
    anchor.click();
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !url) return;
    try {
      setAudioError(null);
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (e) {
      setAudioError("Playback failed. Confirm the URL is a direct audio file and the browser allows playback.");
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

  const handleAudioChoice = (optionId: string) => {
    const option = audioOptions.find((entry) => entry.id === optionId);
    if (!option) return;

    setSelectedOptionId(optionId);
    setUrl(option.url);
    setAudioError(null);
  };

  return (
    <div className="p-4 border border-border rounded-md">
      {audioOptions.length > 0 ? (
        <div className="mb-3">
          <label className="text-sm text-muted-foreground">Choose a BBC Learning English lesson</label>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 mt-2">
            <select value={selectedOptionId} onChange={(e) => handleAudioChoice(e.target.value)} className="select w-full">
              {audioOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.level} - {option.title}
                </option>
              ))}
            </select>
            <div className="rounded-md border border-border bg-secondary/20 px-3 py-2">
              {audioOptions.find((option) => option.id === selectedOptionId)?.description ?? "Select a lesson to load audio."}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <label className="text-sm text-muted-foreground">Audio URL</label>
          <div className="flex gap-2 mt-2">
            <input
              value={url ?? ""}
              onChange={(e) => {
                setUrl(e.target.value || null);
                setAudioError(null);
              }}
              placeholder="Paste .mp3/.ogg/.wav URL or drop a file URL"
              className="flex-1 input"
            />
            <button className="btn" onClick={() => { setUrl(null); setAudioError(null); if (audioRef.current) { audioRef.current.pause(); } }}>Clear</button>
          </div>
        </div>
      )}

      {audioError ? <div className="mb-3 text-xs text-destructive">{audioError}</div> : null}

      <div className="mb-4 p-3 border border-border rounded-md bg-secondary/20">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button className="btn" onClick={initMic}>{micReady ? "Re-init Mic" : "Init Mic"}</button>
          <button className="btn" onClick={startRecording} disabled={!micReady || isRecording}>Start Rec</button>
          <button className="btn" onClick={stopRecording} disabled={!isRecording}>Stop Rec</button>
          <button className="btn" onClick={downloadRecording} disabled={!recordedUrl}>Download</button>
          <button className="btn" onClick={cleanupMic} disabled={!micReady && !isRecording}>Release Mic</button>
        </div>

        <div className="text-xs text-muted-foreground mb-2">
          {isRecording ? "Recording in progress..." : micReady ? "Mic ready" : "Mic not initialized"}
        </div>
        {micError ? <div className="text-xs text-destructive mb-2">{micError}</div> : null}

        <canvas
          ref={canvasRef}
          className="w-full h-24 rounded border border-border bg-background"
          aria-label="Live microphone waveform"
        />
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

      <audio ref={audioRef} src={url ?? undefined} preload="metadata" controls={false} />
    </div>
  );
}
