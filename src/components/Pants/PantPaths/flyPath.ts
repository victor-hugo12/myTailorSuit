export function generateButtonPath(
  x2: number,
  y2: number,
  escala: number
): string {
  return [
    `M ${x2 + 2 * escala} ${y2 - 3 * escala}`,
    `L ${x2 + 4 * escala} ${y2 - 3 * escala}`,
  ].join(" ");
}
export function generateExtendedButtonPath(
  x2: number,
  y2: number,
  escala: number
): string {
  return [
    `M ${x2 - 5 * escala} ${y2 - 3 * escala}`,
    `L ${x2 - 3 * escala} ${y2 - 3 * escala}`,
  ].join(" ");
}
