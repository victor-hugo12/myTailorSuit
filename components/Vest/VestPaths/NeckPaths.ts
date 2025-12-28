import { getPointAtX, getSplitBezierC } from "components/mathUtils";

export function generateNotchLapelLeftPath(
  x00: number,
  y00: number,
  x06: number,
  y06: number,
  x07: number,
  y07: number,
  escala: number
) {
  const [curva1, curva2] = getSplitBezierC(
    1 / 16,
    x07,
    y07,
    x07 + (x00 - x07) / (43 / 5),
    y07 + (y00 - y07) / 2,
    x07 + (x00 - x07) / (43 / 24),
    y07 + (y00 - y07) / (11 / 9),
    x00,
    y00
  );

  const yTarget = x07 - escala;
  const point = getPointAtX(
    yTarget,
    x06,
    y06,
    x06 + (x07 - x06) / 14,
    y06 + (y07 - y06) / (24 / 7),
    x06 + (x07 - x06) / (7 / 4),
    y06 + (y07 - y06) / 2,
    x07,
    y07
  );
  const x41 = x07,
    y41 = y07;
  const x42 = x41 - 4 * escala,
    y42 = y41 + 5 * escala;
  const x43 = x42 + 2 * escala,
    y43 = y42 + 0.5 * escala;
  const x44 = point.x,
    y44 = point.y;
  const x45 = x43 - 3 * escala,
    y45 = y43 + 2 * escala;
  const zolapaUpPath = [
    `M ${x07} ${y07}`,
    curva1,
    `C ${x43}, ${y43 + escala / 4}, ${x43}, ${y43}, ${x43} ${y43}`,
    `L  ${x42} ${y42}`,
    `C ${x42 + (x44 - x42) / 4}, ${y42 + (y44 - y42) / (10 / 3)}, ${
      x42 + (x44 - x42) / (8 / 7)
    }, ${y42 + (y44 - y42) / (10 / 7)}, ${x44} ${y44}`,
    `C ${x44 + (x07 - x44) / 4}, ${y44 + (y07 - y44) / 2}, ${
      x44 + (x07 - x44) / (4 / 3)
    }, ${y44 + (y07 - y44) / (6 / 7)}, ${x07} ${y07}`,
  ].join(" ");
  const zolapaDownPath = [
    curva2,
    `C ${x00 + (x45 - x00) / (29 / 23)}, ${y00 + (y45 - y00) / (34 / 15)}, ${
      x00 + (x45 - x00) / (29 / 26)
    }, ${y00 + (y45 - y00) / (17 / 12)}, ${x45} ${y45}`,
    `C ${x45 + (x43 - x45) / 2}, ${y45 + (y43 - y45) / 4},${
      x45 + (x43 - x45) / (8 / 7)
    }, ${y45 + (y43 - y45) / (4 / 3)}, ${x43} ${y43}`,
    `z`,
  ].join(" ");

  return { zolapaUpPath, zolapaDownPath };
}

export function generateNotchLapelRightPath(
  x0: number,
  y0: number,
  x6: number,
  y6: number,
  x7: number,
  y7: number,
  escala: number
) {
  const [curva1, curva2] = getSplitBezierC(
    1 / 10,
    x7,
    y7,
    x7,
    y7 + (y0 - y7) / (11 / 3),
    x7 + (x0 - x7) / 2,
    y7 + (y0 - y7) / (22 / 17),
    x0,
    y0
  );

  const yTarget = x7 + escala;
  const point = getPointAtX(
    yTarget,
    x6,
    y6,
    x6 + (x7 - x6) / (41 / 11),
    y6 + (y7 - y6) / (20 / 7),
    x6 + (x7 - x6) / (41 / 29),
    y6 + (y7 - y6) / (5 / 4),
    x7,
    y7
  );
  const x41 = x7,
    y41 = y7;
  const x42 = x41 + 4 * escala,
    y42 = y41 + 5 * escala;
  const x43 = x42 - 2 * escala,
    y43 = y42 + 0.5 * escala;
  const x44 = point.x,
    y44 = point.y;
  const x45 = x43 + 2 * escala,
    y45 = y43 + 2 * escala;
  const zolapaUpPath = [
    `M ${x7} ${y7}`,
    curva1,
    `C ${x43}, ${y43 + escala / 4}, ${x43}, ${y43}, ${x43} ${y43}`,
    `L  ${x42} ${y42}`,
    `C ${x42 + (x44 - x42) / 4}, ${y42 + (y44 - y42) / (10 / 3)}, ${
      x42 + (x44 - x42) / (8 / 7)
    }, ${y42 + (y44 - y42) / (10 / 7)}, ${x44} ${y44}`,
    `C ${x44 + (x7 - x44) / 4}, ${y44 + (y7 - y44) / 2}, ${
      x44 + (x7 - x44) / (4 / 3)
    }, ${y44 + (y7 - y44) / (6 / 7)}, ${x7} ${y7}`,
  ].join(" ");
  const zolapaDownPath = [
    curva2,
    `C ${x0 + (x45 - x0) / (29 / 23)}, ${y0 + (y45 - y0) / (34 / 15)}, ${
      x0 + (x45 - x0) / (29 / 26)
    }, ${y0 + (y45 - y0) / (17 / 12)}, ${x45} ${y45}`,
    `C ${x45 + (x43 - x45) / 2}, ${y45 + (y43 - y45) / 4},${
      x45 + (x43 - x45) / (8 / 7)
    }, ${y45 + (y43 - y45) / (4 / 3)}, ${x43} ${y43}`,
    `z`,
  ].join(" ");
  return { zolapaUpPath, zolapaDownPath };
}

export function generatePeakLapelLeftPath(
  x00: number,
  y00: number,
  x06: number,
  y06: number,
  x07: number,
  y07: number,
  escala: number
) {
  const [curva1, curva2] = getSplitBezierC(
    1 / 16,
    x07,
    y07,
    x07 + (x00 - x07) / (43 / 5),
    y07 + (y00 - y07) / 2,
    x07 + (x00 - x07) / (43 / 24),
    y07 + (y00 - y07) / (11 / 9),
    x00,
    y00
  );

  const yTarget = x07 - escala;
  const point = getPointAtX(
    yTarget,
    x06,
    y06,
    x06 + (x07 - x06) / 14,
    y06 + (y07 - y06) / (24 / 7),
    x06 + (x07 - x06) / (7 / 4),
    y06 + (y07 - y06) / 2,
    x07,
    y07
  );
  const x41 = x07,
    y41 = y07;
  const x42 = x41 - 4 * escala,
    y42 = y41 + 4 * escala;
  const x43 = x42 + 2 * escala,
    y43 = y42 + 0.5 * escala;
  const x44 = point.x,
    y44 = point.y;
  const x45 = x43 - 5 * escala,
    y45 = y43 - escala;
  const zolapaUpPath = [
    `M ${x07} ${y07}`,
    curva1,
    `C ${x43}, ${y43 + escala / 4}, ${x43}, ${y43}, ${x43} ${y43}`,
    `L  ${x42} ${y42}`,
    `C ${x42 + (x44 - x42) / 4}, ${y42 + (y44 - y42) / (10 / 3)}, ${
      x42 + (x44 - x42) / (8 / 7)
    }, ${y42 + (y44 - y42) / (10 / 7)}, ${x44} ${y44}`,
    `C ${x44 + (x07 - x44) / 4}, ${y44 + (y07 - y44) / 2}, ${
      x44 + (x07 - x44) / (4 / 3)
    }, ${y44 + (y07 - y44) / (6 / 7)}, ${x07} ${y07}`,
  ].join(" ");
  const zolapaDownPath = [
    curva2,
    `C ${x00 + (x45 - x00) / (29 / 23)}, ${y00 + (y45 - y00) / (34 / 15)}, ${
      x00 + (x45 - x00) / (29 / 26)
    }, ${y00 + (y45 - y00) / (17 / 12)}, ${x45} ${y45}`,
    `C ${x45 + (x43 - x45) / 4}, ${y45 + (y43 - y45) / (4 / 3)},${
      x45 + (x43 - x45) / 2
    }, ${y45 + (y43 - y45) / (4 / 5)}, ${x43} ${y43}`,
    `z`,
  ].join(" ");

  return { zolapaUpPath, zolapaDownPath };
}

export function generatePeakLapelRightPath(
  x0: number,
  y0: number,
  x6: number,
  y6: number,
  x7: number,
  y7: number,
  escala: number
) {
  const [curva1, curva2] = getSplitBezierC(
    1 / 16,
    x7,
    y7,
    x7 + (x0 - x7) / (43 / 5),
    y7 + (y0 - y7) / 2,
    x7 + (x0 - x7) / (43 / 24),
    y7 + (y0 - y7) / (11 / 9),
    x0,
    y0
  );

  const yTarget = x7 + escala;
  const point = getPointAtX(
    yTarget,
    x6,
    y6,
    x6 + (x7 - x6) / 14,
    y6 + (y7 - y6) / (24 / 7),
    x6 + (x7 - x6) / (7 / 4),
    y6 + (y7 - y6) / 2,
    x7,
    y7
  );
  const x41 = x7,
    y41 = y7;
  const x42 = x41 + 4 * escala,
    y42 = y41 + 4 * escala;
  const x43 = x42 - 2 * escala,
    y43 = y42 + 0.5 * escala;
  const x44 = point.x,
    y44 = point.y;
  const x45 = x43 + 5 * escala,
    y45 = y43 - escala;
  const zolapaUpPath = [
    `M ${x7} ${y7}`,
    curva1,
    `C ${x43}, ${y43 + escala / 4}, ${x43}, ${y43}, ${x43} ${y43}`,
    `L  ${x42} ${y42}`,
    `C ${x42 + (x44 - x42) / 4}, ${y42 + (y44 - y42) / (10 / 3)}, ${
      x42 + (x44 - x42) / (8 / 7)
    }, ${y42 + (y44 - y42) / (10 / 7)}, ${x44} ${y44}`,
    `C ${x44 + (x7 - x44) / 4}, ${y44 + (y7 - y44) / 2}, ${
      x44 + (x7 - x44) / (4 / 3)
    }, ${y44 + (y7 - y44) / (6 / 7)}, ${x7} ${y7}`,
  ].join(" ");
  const zolapaDownPath = [
    curva2,
    `C ${x0 + (x45 - x0) / (29 / 23)}, ${y0 + (y45 - y0) / (34 / 15)}, ${
      x0 + (x45 - x0) / (29 / 26)
    }, ${y0 + (y45 - y0) / (17 / 12)}, ${x45} ${y45}`,
    `C ${x45 + (x43 - x45) / 4}, ${y45 + (y43 - y45) / (4 / 3)},${
      x45 + (x43 - x45) / 2
    }, ${y45 + (y43 - y45) / (4 / 5)}, ${x43} ${y43}`,
    `z`,
  ].join(" ");

  return { zolapaUpPath, zolapaDownPath };
}

export function generateShawlLapelLeftPath(
  x00: number,
  y00: number,
  x06: number,
  y06: number,
  x07: number,
  y07: number,
  escala: number
) {
  const x31 = x07,
    y31 = y07;

  const yTarget = x07 - 7 * escala;
  const point = getPointAtX(
    yTarget,
    x06,
    y06,
    x06 + (x07 - x06) / 14,
    y06 + (y07 - y06) / (24 / 7),
    x06 + (x07 - x06) / (7 / 4),
    y06 + (y07 - y06) / 2,
    x07,
    y07
  );
  const x34 = point.x,
    y34 = point.y;

  const zolapaUpPath = [].join(" ");
  const zolapaDownPath = [
    `M  ${x31} ${y31}`,
    `C ${x31 + (x34 - x31) / (7 / 4)}, ${y31 + (y34 - y31) / (13 / 2)}, ${
      x31 + (x34 - x31) / (7 / 6)
    }, ${y31 + (y34 - y31) / (13 / 6)}, ${x34} ${y34}`,
    `C ${x34 + (x00 - x34) / (37 / 5)}, ${y34 + (y00 - y34) / (24 / 7)}, ${
      x34 + (x00 - x34) / (37 / 12)
    }, ${y34 + (y00 - y34) / (24 / 19)}, ${x00} ${y00}`,
    `C ${x07 + (x00 - x07) / (43 / 24)}, ${y07 + (y00 - y07) / (11 / 9)}, ${
      x07 + (x00 - x07) / (43 / 5)
    }, ${y07 + (y00 - y07) / 2}, ${x07} ${y07}`,
  ].join(" ");
  return { zolapaUpPath, zolapaDownPath };
}

export function generateShawlLapelRightPath(
  x0: number,
  y0: number,
  x6: number,
  y6: number,
  x7: number,
  y7: number,
  escala: number
) {
  const x41 = x7,
    y41 = y7;
  const yTarget = x7 + 7 * escala;
  const point = getPointAtX(
    yTarget,
    x6,
    y6,
    x6 + (x7 - x6) / (41 / 11),
    y6 + (y7 - y6) / (20 / 7),
    x6 + (x7 - x6) / (41 / 29),
    y6 + (y7 - y6) / (5 / 4),
    x7,
    y7
  );
  const x44 = point.x,
    y44 = point.y;
  const zolapaUpPath = [].join(" ");
  const zolapaDownPath = [
    `M  ${x41} ${y41}`,
    `C ${x41 + (x44 - x41) / (8 / 3)}, ${y41 + (y44 - y41) / 8}, ${
      x41 + (x44 - x41) / (9 / 8)
    }, ${y41 + (y44 - y41) / 2}, ${x44} ${y44}`,
    `C ${x44 + (x0 - x44) / 13}, ${y44 + (y0 - y44) / (16 / 3)}, ${
      x44 + (x0 - x44) / 2
    }, ${y44 + (y0 - y44) / (16 / 15)}, ${x0} ${y0}`,
    `C ${x7 + (x0 - x7) / 2}, ${y7 + (y0 - y7) / (22 / 17)}, ${x7}, ${
      y7 + (y0 - y7) / (11 / 3)
    }, ${x7} ${y7}`,
  ].join(" ");
  return { zolapaUpPath, zolapaDownPath };
}
