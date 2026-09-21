import type { ReactNode } from "react";
import { FadeIn } from "@/components/animations";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  label: string;
  heading: ReactNode;
  intro?: string;
  /** `light` inverts for dark panels. */
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
  headingClassName?: string;
  children?: ReactNode;
}

/**
 * Shared section opener: hairline + label, then a masked heading reveal.
 * The hairline is the frame-profile motif at its smallest size.
 */
export function SectionIntro({
  label,
  heading,
  intro,
  tone = "dark",
  align = "start",
  className,
  headingClassName,
  children,
}: SectionIntroProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <FadeIn y={12} duration={0.5}>
        <p
          className={cn(
            "flex items-center gap-3 text-sm tracking-label",
            align === "center" && "justify-center",
            isLight ? "text-silver-300" : "text-graphite-400",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              isLight ? "bg-silver-400/60" : "bg-graphite-900/25",
            )}
          />
          {label}
        </p>
      </FadeIn>

      <h2
        className={cn(
          "mt-5 font-display text-display-sm font-normal",
          isLight ? "text-bone" : "text-graphite-900",
          headingClassName,
        )}
      >
        <FadeIn>{heading}</FadeIn>
      </h2>

      {intro ? (
        <FadeIn y={18} delay={0.12}>
          <p
            className={cn(
              "mt-6 max-w-prose text-lg leading-relaxed",
              align === "center" && "mx-auto",
              isLight ? "text-silver-200" : "text-graphite-500",
            )}
          >
            {intro}
          </p>
        </FadeIn>
      ) : null}

      {children}
    </div>
  );
}
