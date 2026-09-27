// shadcn-style class joiner (components.json maps "utils" here).
// The project has no Tailwind, so there are no conflicting utilities to merge.
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
