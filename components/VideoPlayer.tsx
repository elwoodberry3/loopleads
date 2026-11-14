"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PlayIcon } from "./Icons";

/**
 * VSL player.
 *  - NEXT_PUBLIC_VSL_VIDEO_URL accepts an .mp4/.webm/.m3u8 file URL (Vercel Blob, Mux, S3…),
 *    a YouTube URL, or a Vimeo URL.
 *  - NEXT_PUBLIC_VSL_POSTER_URL (optional) is a poster image.
 *  - No URL yet? The poster still renders, and "play" opens the transcript instead.
 * Nothing third-party loads until the viewer presses play.
 */

type Source = { kind: "file"; src: string } | { kind: "embed"; src: string } | { kind: "none" };

function resolveSource(url: string | undefined): Source {
  if (!url) return { kind: "none" };
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com") {
      const id = host === "youtu.be" ? u.pathname.slice(1) : u.searchParams.get("v") ?? u.pathname.split("/").pop();
      return { kind: "embed", src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1` };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return { kind: "embed", src: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0` };
    }
    return { kind: "file", src: url };
  } catch {
    return { kind: "none" };
  }
}

const source = resolveSource(process.env.NEXT_PUBLIC_VSL_VIDEO_URL);
const poster = process.env.NEXT_PUBLIC_VSL_POSTER_URL;

export const PLAY_EVENT = "loopleads:play-video";

export function VideoPlayer({ caption, transcript }: { caption: string; transcript: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDetailsElement>(null);

  const start = () => {
    try {
      sessionStorage.setItem("ll_watched", "1");
    } catch {}
    if (source.kind === "none") {
      if (transcriptRef.current) {
        transcriptRef.current.open = true;
        transcriptRef.current.querySelector("summary")?.focus();
      }
      return;
    }
    setPlaying(true);
  };

  useEffect(() => {
    const onPlay = () => {
      wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      start();
    };
    window.addEventListener(PLAY_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_EVENT, onPlay);
  });

  return (
    <figure ref={wrapRef} id="video" className="scroll-mt-24">
      <div className="relative aspect-video overflow-hidden rounded-[14px] bg-navy-900 ring-1 ring-white/10 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)]">
        {playing && source.kind === "file" && (
          <video className="absolute inset-0 h-full w-full" src={source.src} poster={poster} controls autoPlay playsInline>
            <track kind="captions" />
          </video>
        )}
        {playing && source.kind === "embed" && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={source.src}
            title="LoopLeads — 3-minute video"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        )}
        {!playing && (
          <button
            type="button"
            onClick={start}
            className="group absolute inset-0 flex w-full flex-col justify-between p-5 text-left sm:p-8"
            aria-label={source.kind === "none" ? "Video coming soon — read the transcript" : "Play the 3-minute LoopLeads video"}
          >
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            ) : (
              <PosterArt />
            )}
            <span className="relative max-w-[30ch] font-display text-[clamp(1.05rem,2.3vw,1.6rem)] font-semibold leading-snug text-ivory-500 [font-stretch:104%]">
              “You know what's crazy about running your own business?”
            </span>
            <span className="relative flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-full bg-orange-500 text-navy-900 shadow-[inset_0_-3px_0_rgb(18_22_39/0.25)] transition-transform group-hover:scale-105 sm:size-20">
                <PlayIcon className="ml-1 size-7 sm:size-8" />
              </span>
              <span className="text-base leading-tight text-white sm:text-lg">
                {source.kind === "none" ? (
                  <>
                    Video coming soon
                    <span className="block text-sm text-white/70">Read the script below</span>
                  </>
                ) : (
                  <>
                    Watch the video
                    <span className="block text-sm text-white/70">About 3 minutes</span>
                  </>
                )}
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-base text-white/75">{caption}</figcaption>
      <details ref={transcriptRef} className="group mt-3 text-white/85">
        <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded text-base font-bold text-ivory-500 underline decoration-ivory-500/40 underline-offset-4 hover:decoration-ivory-500 [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Read the video transcript</span>
          <span className="hidden group-open:inline">Hide the transcript</span>
        </summary>
        <div className="mt-4 max-h-80 overflow-y-auto rounded-[10px] bg-navy-900/70 p-5 text-base leading-relaxed ring-1 ring-white/10 sm:p-6">
          {transcript}
        </div>
      </details>
    </figure>
  );
}

export function PlayVideoButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="#video"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event(PLAY_EVENT));
      }}
    >
      {children}
    </a>
  );
}

/** Abstract poster: a phone call log where one line is caught. No stock imagery. */
function PosterArt() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="640" height="360" fill="#121627" />
      <g opacity="0.55">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(380 ${42 + i * 50})`}>
            <rect width="230" height="38" rx="8" fill={i === 3 ? "#E07A40" : "#1C2333"} opacity={i === 3 ? 0.95 : 1} />
            <rect x="14" y="13" width={i === 3 ? 120 : 90 + (i % 3) * 18} height="12" rx="6" fill={i === 3 ? "#121627" : "#38434F"} />
            <circle cx="208" cy="19" r="6" fill={i === 3 ? "#121627" : "#38434F"} />
          </g>
        ))}
      </g>
      <rect width="640" height="360" fill="url(#fade)" />
      <defs>
        <linearGradient id="fade" x1="0" x2="1">
          <stop offset="0.35" stopColor="#121627" />
          <stop offset="1" stopColor="#121627" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
