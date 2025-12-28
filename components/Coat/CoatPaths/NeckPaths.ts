export function generateNotchLapelLeftPath(
  x00: number,
  y00: number,
  x07: number,
  y07: number,
  escala: number
) {
  const x31 = x07 + 1 * escala,
    y31 = y07 - 2.5 * escala;
  const x32 = x31 - 5.8 * escala,
    y32 = y31 + 5.8 * escala;
  const x33 = x32 + 2 * escala,
    y33 = y32 + escala;
  const x34 = x33 - 3 * escala,
    y34 = y33 + 2 * escala;
  const zolapaUpPath = [
    `M ${x07} ${y07}`,
    `C ${x07 + (x31 - x07) / -20}, ${y07 + (y31 - y07) / (8 / 3)}, ${
      x07 + (x31 - x07) / (40 / 13)
    }, ${y07 + (y31 - y07) / (4 / 3)}, ${x31} ${y31}`,
    `C ${x31 + (x32 - x31) / (23 / 7)}, ${y31 + (y32 - y31) / (23 / 3)}, ${
      x31 + (x32 - x31) / (23 / 10)
    }, ${y31 + (y32 - y31) / (23 / 13)}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
  ].join(" ");
  const zolapaDownPath = [
    `M ${x33} ${y33}`,
    `C ${x33 + (x34 - x33) / 6}, ${y33 + (y34 - y33) / 2}, ${
      x33 + (x34 - x33) / (8 / 5)
    }, ${y33 + (y34 - y33) / (4 / 3)}, ${x34} ${y34}`,
    `C ${x34 + (x00 - x34) / 4}, ${y34 + (y00 - y34) / (37 / 10)}, ${
      x34 + (x00 - x34) / (8 / 5)
    }, ${y34 + (y00 - y34) / (37 / 28)}, ${x00} ${y00}`,
    `C ${x00}, ${y00}, ${x07}, ${y07}, ${x07} ${y07}`,
  ].join(" ");

  return { zolapaUpPath, zolapaDownPath };
}

export function generateNotchLapelRightPath(
  x0: number,
  y0: number,
  x7: number,
  y7: number,
  escala: number
) {
  const x41 = x7 - 1 * escala,
    y41 = y7 - 3 * escala;
  const x42 = x41 + 6 * escala,
    y42 = y41 + 7 * escala;
  const x43 = x42 - 2 * escala,
    y43 = y42 + 0.5 * escala;
  const x44 = x43 + 2 * escala,
    y44 = y43 + 2 * escala;
  const zolapaUpPath = [
    `M ${x7} ${y7}`,
    `C ${x7 + (x41 - x7) / -4}, ${y7 + (y41 - y7) / 3}, ${x7}, ${
      y7 + (y41 - y7) / (3 / 2)
    }, ${x41} ${y41}`,
    `C ${x41 + (x42 - x41) / (16 / 3)}, ${y41 + (y42 - y41) / (28 / 3)}, ${
      x41 + (x42 - x41) / 2
    }, ${y41 + (y42 - y41) / (8 / 5)}, ${x42} ${y42}`,
    `C ${x42}, ${y42}, ${x43}, ${y43}, ${x43} ${y43}`,
  ].join(" ");
  const zolapaDownPath = [
    `M ${x43} ${y43}`,
    `C ${x43}, ${y43}, ${x44}, ${y44}, ${x44} ${y44}`,
    `C ${x44 + (x0 - x44) / (53 / 10)}, ${y44 + (y0 - y44) / 4}, ${
      x44 + (x0 - x44) / (53 / 34)
    }, ${y44 + (y0 - y44) / (4 / 3)}, ${x0} ${y0}`,
    `C ${x0}, ${y0}, ${x7}, ${y7}, ${x7} ${y7}`,
  ].join(" ");
  return { zolapaUpPath, zolapaDownPath };
}

export function generateNotchLapelMedPath(
  x7: number,
  y7: number,
  x07: number,
  y07: number,
  escala: number
): string {
  const x41 = x7 - 1 * escala,
    y41 = y7 - 3 * escala;
  const x31 = x07 + 1 * escala,
    y31 = y07 - 2.5 * escala;
  return [
    `M ${x7} ${y7}`,
    `C ${x7 + (x41 - x7) / -4}, ${y7 + (y41 - y7) / 3}, ${x7}, ${
      y7 + (y41 - y7) / (3 / 2)
    }, ${x41} ${y41}`,
    `C ${x41}, ${y41}, ${x31}, ${y31}, ${x31} ${y31}`,
    `C ${x07 + (x31 - x07) / -20}, ${y07 + (y31 - y07) / (8 / 3)}, ${
      x07 + (x31 - x07) / (40 / 13)
    }, ${y07 + (y31 - y07) / (4 / 3)}, ${x07} ${y07}`,
    `C ${x07}, ${y07}, ${x7}, ${y7}, ${x7} ${y7}`,
  ].join(" ");
}

export function generatePeakLapelLeftPath(
  x00: number,
  y00: number,
  x07: number,
  y07: number,
  escala: number
) {
  const x31 = x07 + 1 * escala,
    y31 = y07 - 2.5 * escala;
  const x32 = x31 - 5.8 * escala,
    y32 = y31 + 5.8 * escala;
  const x33 = x32 + 2 * escala,
    y33 = y32 + escala;
  const x34 = x33 - 5 * escala,
    y34 = y33 - escala;

  const zolapaUpPath = [
    `M ${x07} ${y07}`,
    `C ${x07 + (x31 - x07) / -20}, ${y07 + (y31 - y07) / (8 / 3)}, ${
      x07 + (x31 - x07) / (40 / 13)
    }, ${y07 + (y31 - y07) / (4 / 3)}, ${x31} ${y31}`,
    `C ${x31 + (x32 - x31) / (23 / 7)}, ${y31 + (y32 - y31) / (23 / 3)}, ${
      x31 + (x32 - x31) / (23 / 10)
    }, ${y31 + (y32 - y31) / (23 / 13)}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
  ].join(" ");
  const zolapaDownPath = [
    `M ${x33} ${y33}`,
    `C ${x33}, ${y33}, ${x34}, ${y34}, ${x34} ${y34}`,
    `C ${x34 + (x00 - x34) / 4}, ${y34 + (y00 - y34) / (37 / 10)}, ${
      x34 + (x00 - x34) / (8 / 5)
    }, ${y34 + (y00 - y34) / (37 / 28)}, ${x00} ${y00}`,
    `C ${x00}, ${y00}, ${x07}, ${y07}, ${x07} ${y07}`,
  ].join(" ");

  return { zolapaUpPath, zolapaDownPath };
}

export function generatePeakLapelRightPath(
  x0: number,
  y0: number,
  x7: number,
  y7: number,
  escala: number
) {
  const x41 = x7 - 1 * escala,
    y41 = y7 - 3 * escala;
  const x42 = x41 + 6 * escala,
    y42 = y41 + 6 * escala;
  const x43 = x42 - 2 * escala,
    y43 = y42 + escala;
  const x44 = x43 + 5 * escala,
    y44 = y43 - escala;
  const zolapaUpPath = [
    `M ${x7} ${y7}`,
    `C ${x7 + (x41 - x7) / -4}, ${y7 + (y41 - y7) / 3}, ${x7}, ${
      y7 + (y41 - y7) / (3 / 2)
    }, ${x41} ${y41}`,
    `C ${x41 + (x42 - x41) / (16 / 3)}, ${y41 + (y42 - y41) / (28 / 3)}, ${
      x41 + (x42 - x41) / 2
    }, ${y41 + (y42 - y41) / (8 / 5)}, ${x42} ${y42}`,
    `C ${x42}, ${y42}, ${x43}, ${y43}, ${x43} ${y43}`,
  ].join(" ");
  const zolapaDownPath = [
    `M ${x43} ${y43}`,
    `C ${x43}, ${y43}, ${x44}, ${y44}, ${x44} ${y44}`,
    `C ${x44 + (x0 - x44) / (53 / 10)}, ${y44 + (y0 - y44) / 4}, ${
      x44 + (x0 - x44) / (53 / 34)
    }, ${y44 + (y0 - y44) / (4 / 3)}, ${x0} ${y0}`,
    `C ${x0}, ${y0}, ${x7}, ${y7}, ${x7} ${y7}`,
  ].join(" ");
  return { zolapaUpPath, zolapaDownPath };
}

export function generatePeakLapelMedPath(
  x7: number,
  y7: number,
  x07: number,
  y07: number,
  escala: number
): string {
  const x41 = x7 - 1 * escala,
    y41 = y7 - 3 * escala;
  const x31 = x07 + 1 * escala,
    y31 = y07 - 2.5 * escala;
  return [
    `M ${x7} ${y7}`,
    `C ${x7 + (x41 - x7) / -4}, ${y7 + (y41 - y7) / 3}, ${x7}, ${
      y7 + (y41 - y7) / (3 / 2)
    }, ${x41} ${y41}`,
    `C ${x41}, ${y41}, ${x31}, ${y31}, ${x31} ${y31}`,
    `C ${x07 + (x31 - x07) / (40 / 13)}, ${y07 + (y31 - y07) / (4 / 3)}, ${
      x07 + (x31 - x07) / -20
    }, ${y07 + (y31 - y07) / (8 / 3)}, ${x07} ${y07}`,
    `C ${x07}, ${y07}, ${x7}, ${y7}, ${x7} ${y7}`,
  ].join(" ");
}

export function generateShawlLapelLeftPath(
  x00: number,
  y00: number,
  x07: number,
  y07: number,
  escala: number
) {
  const x31 = x07 + 1 * escala,
    y31 = y07 - 2.5 * escala;

  const x34 = x31 - 9 * escala,
    y34 = y31 + 6.5 * escala;

  const zolapaUpPath = [
    `M ${x07} ${y07}`,
    `C ${x07 + (x31 - x07) / -20}, ${y07 + (y31 - y07) / (8 / 3)}, ${
      x07 + (x31 - x07) / (40 / 13)
    }, ${y07 + (y31 - y07) / (4 / 3)}, ${x31} ${y31}`,
    `C ${x31 + (x34 - x31) / (7 / 4)}, ${y31 + (y34 - y31) / (13 / 2)}, ${
      x31 + (x34 - x31) / (7 / 6)
    }, ${y31 + (y34 - y31) / (13 / 6)}, ${x34} ${y34}`,
    `C ${x34 + (x00 - x34) / 12.8}, ${y34 + (y00 - y34) / (41 / 11)}, ${
      x34 + (x00 - x34) / 2
    }, ${y34 + (y00 - y34) / (41 / 27)}, ${x00} ${y00}`,
    `C ${x00}, ${y00}, ${x07}, ${y07}, ${x07} ${y07}`,
  ].join(" ");
  const zolapaDownPath = [].join(" ");
  return { zolapaUpPath, zolapaDownPath };
}

export function generateShawlLapelRightPath(
  x0: number,
  y0: number,
  x7: number,
  y7: number,
  escala: number
) {
  const x41 = x7 - 1 * escala,
    y41 = y7 - 3 * escala;

  const x44 = x41 + 9 * escala,
    y44 = y41 + 5 * escala;
  const zolapaUpPath = [
    `M ${x7} ${y7}`,
    `C ${x7 + (x41 - x7) / -4}, ${y7 + (y41 - y7) / 3}, ${x7}, ${
      y7 + (y41 - y7) / (3 / 2)
    }, ${x41} ${y41}`,
    `C ${x41 + (x44 - x41) / (8 / 3)}, ${y41 + (y44 - y41) / 8}, ${
      x41 + (x44 - x41) / (9 / 8)
    }, ${y41 + (y44 - y41) / 2}, ${x44} ${y44}`,
    `C ${x44 + (x0 - x44) / 13}, ${y44 + (y0 - y44) / (16 / 3)}, ${
      x44 + (x0 - x44) / 2
    }, ${y44 + (y0 - y44) / (16 / 15)}, ${x0} ${y0}`,
    `C ${x0}, ${y0}, ${x7}, ${y7}, ${x7} ${y7}`,
  ].join(" ");
  const zolapaDownPath = [].join(" ");
  return { zolapaUpPath, zolapaDownPath };
}

export function generateShawlLapelMedPath(
  x7: number,
  y7: number,
  x07: number,
  y07: number,
  escala: number
): string {
  const x41 = x7 - 1 * escala,
    y41 = y7 - 3 * escala;
  const x31 = x07 + 1 * escala,
    y31 = y07 - 2.5 * escala;
  return [
    `M ${x7} ${y7}`,
    `C ${x7 + (x41 - x7) / -4}, ${y7 + (y41 - y7) / 3}, ${x7}, ${
      y7 + (y41 - y7) / (3 / 2)
    }, ${x41} ${y41}`,
    `C ${x41}, ${y41}, ${x31}, ${y31}, ${x31} ${y31}`,
    `C ${x07 + (x31 - x07) / -20}, ${y07 + (y31 - y07) / (8 / 3)}, ${
      x07 + (x31 - x07) / (40 / 13)
    }, ${y07 + (y31 - y07) / (4 / 3)}, ${x07} ${y07}`,
    `C ${x07}, ${y07}, ${x7}, ${y7}, ${x7} ${y7}`,
  ].join(" ");
}
