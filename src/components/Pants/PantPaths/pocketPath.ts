import { getPointAtX, getPointAtY } from "@/components/mathUtils";

export function generatePocketRightPath(
  x2: number,
  y2: number,
  x02: number,
  y02: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
): string {
  const reducirLargo = 22 * escala < y04 - y02;
  const length = reducirLargo ? 17 : (y04 - y2 - 4 * escala) / escala;

  const punto = getPointAtY(
    y02 + length * escala,
    x03,
    y03,
    x03 + (x04 - x03) / 2,
    y03 + (y04 - y03) / (13 / 5),
    x03 + (x04 - x03) / 2,
    y03 + (y04 - y03) / (13 / 9),
    x04,
    y04
  );

  const punto2 = getPointAtX(
    x02 - 3 * escala,
    x2,
    y2,
    x2 + (x02 - x2) / (5 / 2),
    y2 + (y02 - y2) / 4,
    x2 + (x02 - x2) / (9 / 7),
    y2 + (y02 - y2) / (8 / 5),
    x02,
    y02
  );
  const x60 = punto.x,
    y60 = punto.y;
  const x61 = punto2.x,
    y61 = punto2.y;

  return [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / (3 / 2)}, ${y60 + (y61 - y60) / (11 / 6)}, ${
      x60 + (x61 - x60) / (7 / 4)
    }, ${y60 + (y61 - y60) / 3}, ${x61} ${y61}`,
  ].join(" ");
}

export function generatePocketLeftPath(
  x2: number,
  y2: number,
  x4: number,
  y4: number,
  x5: number,
  y5: number,
  x6: number,
  y6: number,
  escala: number
): string {
  const reducirLargo = 22 * escala < y6 - y4;
  const length = reducirLargo ? 17 : (y6 - y4 - 4 * escala) / escala;

  const punto = getPointAtY(
    y4 + length * escala,
    x5,
    y5,
    x5 + (x6 - x5) / 6,
    y5 + (y6 - y5) / (13 / 6),
    x5 + (x6 - x5) / 2,
    y5 + (y6 - y5) / (13 / 9),
    x6,
    y6
  );

  const punto2 = getPointAtX(
    x4 + 3 * escala,
    x2,
    y2,
    x2 + (x4 - x2) / 3,
    y2 + (y4 - y2) / 4,
    x2 + (x4 - x2) / (5 / 3),
    y2 + (y4 - y2) / 2,
    x4,
    y4
  );
  const x60 = punto.x,
    y60 = punto.y;
  const x61 = punto2.x,
    y61 = punto2.y;

  return [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / (3 / 2)}, ${y60 + (y61 - y60) / (11 / 6)}, ${
      x60 + (x61 - x60) / (7 / 4)
    }, ${y60 + (y61 - y60) / 3}, ${x61} ${y61}`,
  ].join(" ");
}

export function generatePocketJeansRightPath(
  x2: number,
  y2: number,
  x02: number,
  y02: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
): string {
  const yTarget = y02 + 8 * escala;

  const punto = getPointAtY(
    yTarget,
    x03,
    y03,
    x03 + (x04 - x03) / 2,
    y03 + (y04 - y03) / (13 / 5),
    x03 + (x04 - x03) / 2,
    y03 + (y04 - y03) / (13 / 9),
    x04,
    y04
  );

  const punto3 = getPointAtY(
    yTarget,
    x02,
    y02,
    x02 + (x03 - x02) / 5,
    y02 + (y03 - y02) / (26 / 7),
    x02 + (x03 - x02) / (5 / 3),
    y02 + (y03 - y02) / (13 / 8),
    x03,
    y03
  );

  const punto2 = getPointAtX(
    x02 - 11 * escala,
    x2,
    y2,
    x2 + (x02 - x2) / (5 / 2),
    y2 + (y02 - y2) / 4,
    x2 + (x02 - x2) / (9 / 7),
    y2 + (y02 - y2) / (8 / 5),
    x02,
    y02
  );

  const usarPunto = y03 < y02 + 8 * escala;

  const x60 = usarPunto ? punto.x : punto3.x;
  const y60 = usarPunto ? punto.y : punto3.y;

  const x61 = x60 - 10 * escala;
  const y61 = y60 - escala;
  const x62 = punto2.x;
  const y62 = punto2.y;
  return [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / 2}, ${y60}, ${
      x60 + (x61 - x60) / (5 / 4)
    }, ${y60}, ${x61} ${y61}`,
    `M ${x61} ${y61}`,
    `C ${x61 + (x62 - x61) / (9 / 5)}, ${y61 + (y62 - y61) / (23 / 4)}, ${
      x61 + (x62 - x61) / (3 / 2)
    }, ${y61 + (y62 - y61) / (23 / 6)}, ${x62} ${y62}`,
  ].join(" ");
}
export function generatePocketJeansLeftPath(
  x2: number,
  y2: number,
  x4: number,
  y4: number,
  x5: number,
  y5: number,
  x6: number,
  y6: number,
  escala: number
): string {
  const yTarget = y4 + 8 * escala;

  const punto = getPointAtY(
    yTarget,
    x5,
    y5,
    x5 + (x6 - x5) / 6,
    y5 + (y6 - y5) / (13 / 6),
    x5 + (x6 - x5) / 2,
    y5 + (y6 - y5) / (13 / 9),
    x6,
    y6
  );

  const punto3 = getPointAtY(
    yTarget,
    x4,
    y4,
    x4 + (x5 - x4) / (7 / 3),
    y4 + (y5 - y4) / 4,
    x4 + (x5 - x4) / (7 / 6),
    y4 + (y5 - y4) / (13 / 8),
    x5,
    y5
  );

  const punto2 = getPointAtX(
    x4 + 11 * escala,
    x2,
    y2,
    x2 + (x4 - x2) / 3,
    y2 + (y4 - y2) / 4,
    x2 + (x4 - x2) / (5 / 3),
    y2 + (y4 - y2) / 2,
    x4,
    y4
  );

  const usarPunto = y5 < y4 + 8 * escala;
  const x60 = usarPunto ? punto.x : punto3.x;
  const y60 = usarPunto ? punto.y : punto3.y;
  const x61 = x60 + 10 * escala;
  const y61 = y60 - escala;
  const x62 = punto2.x;
  const y62 = punto2.y;
  return [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / 2}, ${y60}, ${
      x60 + (x61 - x60) / (5 / 4)
    }, ${y60}, ${x61} ${y61}`,
    `M ${x61} ${y61}`,
    `C ${x61 + (x62 - x61) / (9 / 5)}, ${y61 + (y62 - y61) / (23 / 4)}, ${
      x61 + (x62 - x61) / (3 / 2)
    }, ${y61 + (y62 - y61) / (23 / 6)}, ${x62} ${y62}`,
  ].join(" ");
}
export function generatePocketAmericanLeftPath(
  x2: number,
  y2: number,
  x4: number,
  y4: number,
  x5: number,
  y5: number,
  x6: number,
  y6: number,
  escala: number
): string {
  const yTarget = y4 + 4 * escala;

  const punto = getPointAtY(
    yTarget,
    x5,
    y5,
    x5 + (x6 - x5) / 6,
    y5 + (y6 - y5) / (13 / 6),
    x5 + (x6 - x5) / 2,
    y5 + (y6 - y5) / (13 / 9),
    x6,
    y6
  );

  const punto3 = getPointAtY(
    yTarget,
    x4,
    y4,
    x4 + (x5 - x4) / (7 / 3),
    y4 + (y5 - y4) / 4,
    x4 + (x5 - x4) / (7 / 6),
    y4 + (y5 - y4) / (13 / 8),
    x5,
    y5
  );

  const punto2 = getPointAtX(
    x4 + 10 * escala,
    x2,
    y2,
    x2 + (x4 - x2) / 3,
    y2 + (y4 - y2) / 4,
    x2 + (x4 - x2) / (5 / 3),
    y2 + (y4 - y2) / 2,
    x4,
    y4
  );

  const usarPunto = y5 < y4 + 4 * escala;
  const x60 = usarPunto ? punto.x : punto3.x;
  const y60 = usarPunto ? punto.y : punto3.y;
  const x61 = x60 + 10 * escala;
  const y61 = y60 - escala;
  const x62 = punto2.x;
  const y62 = punto2.y;
  return [
    `M ${x60} ${y60}`,
    `C ${x60}, ${y60}, ${x61}, ${y61}, ${x61} ${y61}`,
    `M ${x61} ${y61}`,
    `C ${x61 + (x62 - x61) / (9 / 5)}, ${y61 + (y62 - y61) / (23 / 4)}, ${
      x61 + (x62 - x61) / (3 / 2)
    }, ${y61 + (y62 - y61) / (23 / 6)}, ${x62} ${y62}`,
  ].join(" ");
}
export function generatePocketAmericanRightPath(
  x2: number,
  y2: number,
  x02: number,
  y02: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
): string {
  const yTarget = y02 + 4 * escala;

  const punto = getPointAtY(
    yTarget,
    x03,
    y03,
    x03 + (x04 - x03) / 2,
    y03 + (y04 - y03) / (13 / 5),
    x03 + (x04 - x03) / 2,
    y03 + (y04 - y03) / (13 / 9),
    x04,
    y04
  );

  const punto3 = getPointAtY(
    yTarget,
    x02,
    y02,
    x02 + (x03 - x02) / 5,
    y02 + (y03 - y02) / (26 / 7),
    x02 + (x03 - x02) / (5 / 3),
    y02 + (y03 - y02) / (13 / 8),
    x03,
    y03
  );

  const punto2 = getPointAtX(
    x02 - 10 * escala,
    x2,
    y2,
    x2 + (x02 - x2) / (5 / 2),
    y2 + (y02 - y2) / 4,
    x2 + (x02 - x2) / (9 / 7),
    y2 + (y02 - y2) / (8 / 5),
    x02,
    y02
  );

  const usarPunto = y03 < y02 + 4 * escala;

  const x60 = usarPunto ? punto.x : punto3.x;
  const y60 = usarPunto ? punto.y : punto3.y;

  const x61 = x60 - 10 * escala;
  const y61 = y60 - escala;
  const x62 = punto2.x;
  const y62 = punto2.y;
  return [
    `M ${x60} ${y60}`,
    `C ${x60}, ${y60}, ${x61}, ${y61}, ${x61} ${y61}`,
    `M ${x61} ${y61}`,
    `C ${x61 + (x62 - x61) / (9 / 5)}, ${y61 + (y62 - y61) / (23 / 4)}, ${
      x61 + (x62 - x61) / (3 / 2)
    }, ${y61 + (y62 - y61) / (23 / 6)}, ${x62} ${y62}`,
  ].join(" ");
}
