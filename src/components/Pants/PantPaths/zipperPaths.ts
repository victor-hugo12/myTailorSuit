export function generateZipperPath(
  x1: number,
  y1: number,
  y2: number,
  escala: number
): string {
  const x91 = x1,
    y91 = y1;
  const x92 = x91 + 4 * escala,
    y92 = y91 - 2 * escala;
  const x93 = x92 + 0.5 * escala,
    y93 = y2;

  const x94 = x92 - 4 * escala,
    y94 = y93;

  return [
    `M ${x91} ${y91}`,
    `C ${x91 + (x92 - x91) / (20 / 11)}, ${y91 + (y92 - y91) / -4}, ${
      x91 + (x92 - x91) / (10 / 9)
    },${y91 + (y92 - y91) / 4}, ${x92} ${y92}`,
    `C ${x92}, ${y92}, ${x93},${y93}, ${x93} ${y93}`,
    `C ${x93}, ${y93}, ${x94},${y94}, ${x94} ${y94}`,
    `z`,
  ].join(" ");
}
