export function generateInteriorPath(
  x0: number,
  y0: number,
  x2: number,
  y2: number,
  x02: number,
  y02: number,
  x7: number,
  y7: number,
  x07: number,
  y07: number,
  escala: number
): string {
  const arcoY = y2 - 4 * escala;
  const arcoY2 = y02 - 4 * escala;
  return [
    `M ${x07} ${y07}`,
    `C ${x07}, ${y07}, ${x7}, ${y7}, ${x7} ${y7}`,
    `C ${x7}, ${y7}, ${x7}, ${y0}, ${x7} ${y0}`,
    `C ${x7}, ${y0}, ${x07}, ${y0}, ${x07} ${y0}`,
    `C ${x07}, ${y0}, ${x07}, ${y07}, ${x07} ${y07}`,
    `M ${x0} ${y0}`,
    `C ${x0}, ${y0}, ${x2}, ${arcoY}, ${x2} ${arcoY}`,
    `Q ${x2 + (x02 - x2) / 2}, ${arcoY - escala}, ${x02} ${arcoY2}`,
    `C ${x02}, ${arcoY2}, ${x0}, ${y0}, ${x0} ${y0}`,
  ].join(" ");
}
export function generateInterior2Path(
  x0: number,
  y0: number,
  x2: number,
  y2: number,
  x7: number,
  y7: number,
  x00: number,
  y00: number,
  x02: number,
  y02: number,
  x07: number,
  y07: number,
  escala: number
): string {
  const arcoY = y2 - 2 * escala;
  const arcoY2 = y02 - 2 * escala;
  return [
    `M ${x00} ${y00}`,
    `C ${x00}, ${y00}, ${x07}, ${y07}, ${x07} ${y07}`,
    `C ${x07}, ${y07}, ${x7}, ${y7}, ${x7} ${y7}`,
    `C ${x7}, ${y7}, ${x0}, ${y0}, ${x0} ${y0}`,
    `M ${x0} ${y0}`,
    `C ${x0}, ${y0}, ${x2}, ${arcoY}, ${x2} ${arcoY}`,
    `Q ${x2 + (x02 - x2) / 2}, ${arcoY - escala}, ${x02} ${arcoY2}`,
    `C ${x02}, ${arcoY2}, ${x0}, ${y0}, ${x0} ${y0}`,
  ].join(" ");
}
