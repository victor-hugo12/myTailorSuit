export function generateMedLeftTopPath(
  x0: number,
  y0: number,
  x2: number,
  y2: number,
  x4: number,
  x6: number
): string {
  const x30 = x6 + (x0 - x6) / 2.51,
    y30 = y0;
  const x31 = x4 + (x2 - x4) / (11 / 6),
    y31 = y2;
  return [
    `M ${x30} ${y30}`,
    `C ${x30 + (x31 - x30) / 12}, ${y30 + (y31 - y30) / 4}, ${
      x30 + (x31 - x30) / 4
    },${y30 + (y31 - y30) / (3 / 2)}, ${x31} ${y31}`,
  ].join(" ");
}
export function generateMedLeftDownPath(
  x0: number,
  y0: number,
  x6: number,
  x11: number,
  x14: number,
  y14: number,
  x17: number,
  y17: number
): string {
  const x30 = x6 + (x0 - x6) / 2.51,
    y30 = y0;
  const x32 = x11 + (x17 - x11) / (12 / 7),
    y32 = y17;
  const x33 = x14,
    y33 = y14;
  return [
    `M ${x30} ${y30}`,
    `C ${x30 + (x32 - x30) / 2}, ${y30 + (y32 - y30) / 3.71}, ${
      x30 + (x32 - x30) / 2
    },${y30 + (y30 - y30) / 2}, ${x32} ${y32}`,
    `C ${x32 + (x33 - x32) / (17 / 2)}, ${y32 + (y33 - y33) / (39 / 11)}, ${
      x32 + (x33 - x32) / (17 / 8)
    },${y32 + (y33 - y32) / (39 / 29)}, ${x33} ${y33}`,
  ].join(" ");
}
export function generateMedRightTopPath(
  x00: number,
  y00: number,
  x2: number,
  y2: number,
  x02: number,
  x04: number
): string {
  const x40 = x00 + (x04 - x00) / (7 / 4),
    y40 = y00;
  const x41 = x2 + (x02 - x2) / (11 / 6),
    y41 = y2;
  return [
    `M ${x40} ${y40}`,
    `C ${x40 + (x41 - x40) / (17 / 3)}, ${y40 + (y41 - y40) / (12 / 5)}, ${
      x40 + (x41 - x40) / (17 / 11)
    },${y40 + (y41 - y40) / (6 / 5)}, ${x41} ${y41}`,
  ].join(" ");
}
export function generateMedRightDownPath(
  x00: number,
  y00: number,
  x04: number,
  x21: number,
  y21: number,
  x24: number,
  y24: number,
  x27: number
): string {
  const x40 = x00 + (x04 - x00) / (7 / 4),
    y40 = y00;
  const x42 = x21 + (x27 - x21) / 1.71,
    y42 = y21;
  const x43 = x24,
    y43 = y24;
  return [
    `M ${x40} ${y40}`,
    `C ${x40 + (x42 - x40) / -2}, ${y40 + (y42 - y40) / (23 / 7)}, ${
      x40 + (x42 - x40) / -1
    },${y40 + (y42 - y40) / (23 / 17)}, ${x42} ${y42}`,
    `C ${x42 + (x43 - x42) / (11 / 4)}, ${y42 + (y43 - y42) / (17 / 5)}, ${
      x42 + (x43 - x42) / (11 / 10)
    },${y42 + (y43 - y42) / (15 / 11)}, ${x43} ${y43}`,
  ].join(" ");
}
