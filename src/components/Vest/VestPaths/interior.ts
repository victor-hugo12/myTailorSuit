export function generateInteriorPath(
  y0: number,
  x1: number,
  y1: number,
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
  return [
    `M ${x07} ${y07}`,
    `Q ${x7 + (x07 - x7) / 2}, ${y07 + 1 * escala}, ${x7} ${y7}`,
    `C ${x7}, ${y7}, ${x7}, ${y0}, ${x7} ${y0}`,
    `C ${x7}, ${y0}, ${x07}, ${y0}, ${x07} ${y0}`,
    `C ${x07}, ${y0}, ${x07}, ${y07}, ${x07} ${y07}`,
    `M ${x1} ${y1}`,
    `C ${x1}, ${y1}, ${x2}, ${y2 - 4 * escala}, ${x2} ${y2 - 4 * escala}`,
    `Q ${x2 + (x02 - x2) / 2}, ${y02 - 5 * escala}, ${x02} ${y02 - 4 * escala}`,
    `C ${x02}, ${y02 - 4 * escala}, ${x1}, ${y1}, ${x1} ${y1}`,
  ].join(" ");
}
export function generateInterior2Path(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x00: number,
  y00: number,
  x02: number,
  y02: number,
  x7: number,
  y7: number,
  x07: number,
  y07: number,
  escala: number
): string {
  return [
    `M ${x00} ${y00}`,
    `C ${x07 + (x00 - x07) / (43 / 24)}, ${y07 + (y00 - y07) / (11 / 9)},  ${x07 + (x00 - x07) / (43 / 5)},${
      y07 + (y00 - y07) / 2
    }, ${x07} ${y07}`,
    `Q ${x7 + (x07 - x7) / 2}, ${y07 + 1 * escala}, ${x7} ${y7}`,
    `C ${x7}, ${y7 + (y0 - y7) / (11 / 3)}, ${x7 + (x0 - x7) / 2}, ${
      y7 + (y0 - y7) / (22 / 17)
    }, ${x0} ${y0}`,
    `M ${x1} ${y1}`,
    `C ${x1}, ${y1}, ${x2}, ${y2 - 4 * escala}, ${x2} ${y2 - 4 * escala}`,
    `Q ${x2 + (x02 - x2) / 2}, ${y02 - 2 * escala}, ${x02} ${y02 - 4 * escala}`,
    `C ${x02}, ${y02 - 4 * escala}, ${x1}, ${y1}, ${x1} ${y1}`,
  ].join(" ");
}
