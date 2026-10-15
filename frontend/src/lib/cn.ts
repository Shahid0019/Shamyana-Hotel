/** Tiny className joiner — avoids adding a dependency for this alone. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
