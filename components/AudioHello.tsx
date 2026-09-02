"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  /** AAC in an MP4 container (.m4a), moov atom first. */
  src: string;
  /** MP3 fallback for browsers that refuse the AAC file. */
  fallbackSrc?: string;
  image: string;
  alt: string;
  /** Shown under the title while nothing is playing, e.g. "2 min". */
  caption?: string;
};

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

/**
 * A voice note with a face: the practitioner's portrait, a play button, and a
 * scrubber. The portrait gets a soft "breathing" ring and a live waveform
 * while the audio is playing, so the block visibly belongs to her voice.
 */
export default function AudioHello({ src, fallbackSrc, image, alt, caption }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setCurrent(0);
    };
    const onError = () => {
      setPlaying(false);
      setError("This browser couldn't load the recording. Try Chrome, Safari, or Firefox, or check your connection.");
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("durationchange", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    a.addEventListener("error", onError);
    if (a.readyState >= 1) onMeta();
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("durationchange", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("error", onError);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      return;
    }
    setError(null);
    a.play().catch((err: unknown) => {
      const name = err instanceof Error ? err.name : "";
      setError(
        name === "NotAllowedError"
          ? "Your browser blocked playback. Tap play again, or check the tab isn't muted."
          : "Playback couldn't start in this browser. Try Chrome, Safari, or Firefox.",
      );
    });
  };

  const seek = (value: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = value;
    setCurrent(value);
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="mx-auto grid max-w-[720px] grid-cols-[auto_1fr] items-center gap-9 rounded-[22px] border border-rule bg-parchment p-8 text-left max-md:grid-cols-1 max-md:justify-items-center max-md:gap-6 max-md:p-6 max-md:text-center">
      <audio ref={audioRef} preload="metadata">
        <source src={src} type="audio/mp4" />
        {fallbackSrc && <source src={fallbackSrc} type="audio/mpeg" />}
      </audio>

      {/* Portrait — breathes while she's speaking. */}
      <div className="relative">
        <span
          aria-hidden="true"
          className={`absolute -inset-2 rounded-full border-2 border-clay-pale transition-opacity ${
            playing ? "animate-breathe opacity-100" : "opacity-0"
          }`}
        />
        <span
          aria-hidden="true"
          className={`absolute -inset-5 rounded-full border border-clay-pale/60 transition-opacity ${
            playing ? "animate-breathe-slow opacity-100" : "opacity-0"
          }`}
        />
        <Image
          src={image}
          alt={alt}
          width={200}
          height={200}
          className={`relative h-[200px] w-[200px] rounded-full object-cover object-top shadow-[0_10px_34px_rgba(53,48,42,0.18)] transition-transform duration-500 max-md:h-[168px] max-md:w-[168px] ${
            playing ? "scale-[1.02]" : ""
          }`}
        />
      </div>

      <div className="w-full">
        <div className="mb-5 flex items-center gap-4 max-md:justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
            className="flex h-[60px] w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-clay text-linen shadow-[0_8px_24px_rgba(169,107,79,0.35)] transition-colors hover:bg-clay-dark"
          >
            {playing ? (
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="h-5 w-1.5 rounded-sm bg-linen" />
                <span className="h-5 w-1.5 rounded-sm bg-linen" />
              </span>
            ) : (
              <span aria-hidden="true" className="ml-1 border-y-[10px] border-l-[17px] border-y-transparent border-l-linen" />
            )}
          </button>

          <div className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-sage-dark">
              {playing ? "Now playing" : "Voice note"}
            </p>
            <p className="font-display text-[22px] leading-tight text-ink">A hello from Hadassah</p>
            {caption && !playing && <p className="text-[13px] text-muted">{caption}</p>}
            {playing && (
              <span aria-hidden="true" className="mt-1 flex h-4 items-end gap-[3px]">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-sm bg-clay animate-wave"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12px] tabular-nums text-muted">
          <span className="w-9 text-right">{fmt(current)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek"
            aria-valuetext={`${fmt(current)} of ${fmt(duration)}`}
            className="audio-scrubber h-1.5 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, var(--color-clay) ${progress}%, var(--color-rule-2) ${progress}%)`,
            }}
          />
          <span className="w-9">{fmt(duration)}</span>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-[13px] leading-relaxed text-clay-dark">
            {error}{" "}
            <a href={fallbackSrc ?? src} className="border-b border-clay-pale">
              Download the recording
            </a>{" "}
            instead.
          </p>
        )}
      </div>
    </div>
  );
}
