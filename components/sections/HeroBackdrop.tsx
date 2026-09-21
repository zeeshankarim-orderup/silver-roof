"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

type HeroSlide = {
  type: "image";
  src: string;
  mobileSrc?: string;
  alt: string;
};

type HeroVideoSlide = {
  type: "video";
  src: string;
  mobileSrc?: string;
  alt: string;
  poster?: string;
  mobilePoster?: string;
};

type Slide = HeroSlide | HeroVideoSlide;

const HERO_SLIDES: Slide[] = [
  {
    type: "video",
    src: "/videos/hero_video.mp4",
    alt: "Home maintenance and glass door services",
  },
  {
    type: "image",
    src: "/images/kitchen_hero.jpg",
    alt: "Modern aluminum kitchen",
  },
  {
    type: "image",
    src: "/images/hero.jpg",
    alt: "Aluminum doors and windows",
  },
];

const AUTOPLAY_INTERVAL = 10000;

export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Keep the existing scroll-linked drift.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  const activeSlide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewport();

    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, []);

  const mediaSrc =
    isMobile && activeSlide.mobileSrc
      ? activeSlide.mobileSrc
      : activeSlide.src;

  const poster =
    activeSlide.type === "video"
      ? isMobile && activeSlide.mobilePoster
        ? activeSlide.mobilePoster
        : activeSlide.poster
      : undefined;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      {/* Existing scroll motion */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={`${activeSlide.type}-${activeSlide.src}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
          >
            {/* Keep existing zoom animation, but use less zoom on mobile */}
            <motion.div
              className="relative h-full w-full md:h-[116%]"
              initial={
                reduce
                  ? false
                  : {
                      scale: isMobile ? 1.04 : 1.12,
                    }
              }
              animate={{ scale: 1 }}
              transition={{
                duration: 1.8,
                ease: EASE,
              }}
            >
              {activeSlide.type === "image" ? (
                <Image
                  src={mediaSrc}
                  alt={activeSlide.alt}
                  fill
                  priority={activeIndex === 0}
                  sizes="100vw"
                  quality={82}
                  className="object-cover object-center"
                />
              ) : (
                <video
                  key={mediaSrc}
                  src={mediaSrc}
                  poster={poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}