/** Tiny class joiner - avoids pulling in clsx/tailwind-merge for this project size. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
