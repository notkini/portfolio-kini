// NOTE: Using simple string concatenation since clsx/twMerge are not installed.
// This is a lightweight replacement that handles the common cases.
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
