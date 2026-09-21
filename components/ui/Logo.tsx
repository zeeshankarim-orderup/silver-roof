import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** `light` is for the dark footer and transparent header over the hero. */
  tone?: "dark" | "light";
  showWordmark?: boolean;
  title?: string;
}

export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  title = "Silver Roof",
}: LogoProps) {
  const logoSrc =
    tone === "light" ? "/logo-light.svg" : "/logo.svg";

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={logoSrc}
        alt={title}
        width={256}
        height={150}
        priority
        className="h-20 w-auto"
      />

      {!showWordmark && null}
    </span>
  );
}
