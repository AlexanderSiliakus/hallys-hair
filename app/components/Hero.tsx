"use client";

import { useRef, useEffect, useCallback, useReducer } from "react";
import Image from "next/image";
import { useScroll, useTransform, useMotionValueEvent, motion, useSpring } from "framer-motion";

const FRAME_COUNT = 121;

const desktopPath = (i: number) =>
  `/hero-frames/desktop/frame_${String(i).padStart(3, "0")}.jpg`;

type State = {
  loaded: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  videoEnded: boolean;
};

type Action =
  | { type: "SET_LOADED" }
  | { type: "SET_ENV"; reducedMotion: boolean; isMobile: boolean }
  | { type: "SET_VIDEO_ENDED" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LOADED":
      return { ...state, loaded: true };
    case "SET_ENV":
      return { ...state, reducedMotion: action.reducedMotion, isMobile: action.isMobile };
    case "SET_VIDEO_ENDED":
      return { ...state, videoEnded: true };
    default:
      return state;
  }
}

export default function Hero() {
  const [state, dispatch] = useReducer(reducer, {
    loaded: false,
    reducedMotion: false,
    isMobile: false,
    videoEnded: false,
  });

  const outerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const handleMobileVideoEnded = useCallback(() => {
    dispatch({ type: "SET_VIDEO_ENDED" });
    const video = mobileVideoRef.current;
    if (video) {
      video.loop = true;
      video.play();
    }
  }, []);

  // Mobile and reduced-motion render branches never attach outerRef to any
  // element (there's no scroll-scrub section in those cases), so useScroll
  // must not be given that ref as a target then — otherwise it errors with
  // "Target ref is defined but not hydrated" once the branch swaps away.
  const skipScrollTarget = state.isMobile || state.reducedMotion;
  const { scrollYProgress } = useScroll(
    skipScrollTarget
      ? {}
      : {
          target: outerRef,
          offset: ["start start", "end end"],
        }
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const frameProgress = useTransform(
    smoothProgress,
    [0, 1],
    [0, FRAME_COUNT - 1]
  );

  const taglineOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.55, 0.72],
    [0, 1, 1, 0]
  );

  const ctaOpacity = useTransform(smoothProgress, [0.82, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.82, 0.95], [16, 0]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    const img = frames[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;

    let dw: number, dh: number, dx: number, dy: number;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = index;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    dispatch({ type: "SET_ENV", reducedMotion, isMobile });

    // Phones play the video normally (see render branch below) instead of
    // scrubbing a frame sequence, so there's nothing to preload here.
    if (isMobile) return;

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = desktopPath(i);
      img.onload = () => {
        loaded++;
        if (i === 1) {
          resizeCanvas();
          drawFrame(0);
        }
        if (loaded === FRAME_COUNT) {
          dispatch({ type: "SET_LOADED" });
        }
      };
      images.push(img);
    }
    framesRef.current = images;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [drawFrame, resizeCanvas]);

  useMotionValueEvent(frameProgress, "change", (latest) => {
    if (state.reducedMotion || state.isMobile) return;
    const index = Math.round(Math.max(0, Math.min(FRAME_COUNT - 1, latest)));
    drawFrame(index);
  });

  // Phones: the actual video, playing normally — no scroll-scrub, no frame
  // sequence. The text waits for the first full playthrough before it fades
  // in, then the video keeps looping quietly in the background.
  if (state.isMobile) {
    return (
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center bg-hero-bg overflow-hidden"
      >
        {state.reducedMotion ? (
          <Image
            src="/hero-mobile-poster.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
            priority
          />
        ) : (
          <video
            ref={mobileVideoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleMobileVideoEnded}
            poster="/hero-mobile-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/hero-mobile.mp4" type="video/mp4" />
          </video>
        )}

        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(28,23,18,0.6) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(28,23,18,0.6) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Visually hidden — the video itself shows the wordmark, but the
            page still needs exactly one real h1 for semantics/SEO. */}
        <h1 className="sr-only">Je barbershop in Amstelveen.</h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: state.reducedMotion || state.videoEnded ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-24 left-0 right-0 z-10 flex justify-center px-6"
        >
          <a
            href="https://hallyshair.youcanbook.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-14 px-10 font-mono text-sm uppercase tracking-widest bg-copper text-ink hover:bg-bronze transition-all duration-200 cursor-pointer glow-copper"
          >
            Boek een afspraak
          </a>
        </motion.div>
      </section>
    );
  }

  if (state.reducedMotion) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center bg-hero-bg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
        <div className="relative z-10 text-center px-6">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-hero-copper mb-6">
            Barbershop · Amstelveen
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-hero-smoke leading-tight mb-6">
            Je barbershop
            <br />
            in Amstelveen.
          </h1>
          <p className="text-lg text-hero-smoke/80 mb-8">
            Knippen, baard, kleuring en styling — voor jong en oud.
          </p>
          <a
            href="https://hallyshair.youcanbook.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-14 px-10 font-mono text-sm uppercase tracking-widest bg-copper text-ink hover:bg-bronze transition-all duration-200 cursor-pointer glow-copper"
          >
            Boek een afspraak
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={outerRef}
      className="relative"
      style={{ height: "400vh" }}
      aria-label="Hero scroll animatie"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Dark overlay — subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(28,23,18,0.55) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top gradient for header legibility */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(28,23,18,0.6) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Tagline */}
        <motion.div
          style={{ opacity: taglineOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-hero-copper mb-6">
            Barbershop · Amstelveen
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-hero-smoke leading-tight mb-6">
            Je barbershop
            <br />
            in Amstelveen.
          </h1>
          <p className="text-hero-smoke/80 text-lg md:text-xl">
            Knippen, baard, kleuring en styling — voor jong en oud.
          </p>
        </motion.div>

        {/* CTA at ~90% progress */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4"
        >
          <a
            href="https://hallyshair.youcanbook.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-14 px-10 font-mono text-base uppercase tracking-widest bg-copper text-ink hover:bg-bronze transition-all duration-200 cursor-pointer glow-copper glow-copper-hover"
          >
            Boek een afspraak
          </a>
          <p className="font-mono text-sm uppercase tracking-widest text-hero-smoke/70">
            Scroll verder
          </p>
        </motion.div>
      </div>
    </section>
  );
}
