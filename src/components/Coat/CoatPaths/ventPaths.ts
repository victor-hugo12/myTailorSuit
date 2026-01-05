import { getPointAtY } from "@/components/mathUtils";

export function generateVentLeftPath(
  x3: number,
  y3: number,
  x03: number,
  y03: number,
  escala: number
): string {
  const x72 = x3 + (x03 - x3) / 2,
    y72 = y3 + 2 * escala;
  return [
    `M  ${x72} ${y72}`,
    `Q ${x72 + (x03 - x72) / 2}, ${y72}, ${x03} ${y03}`,
  ].join(" ");
}
export function generateVentRightPath(
  x3: number,
  y3: number,
  x03: number,
  escala: number
): string {
  const x72 = x3 + (x03 - x3) / 2,
    y72 = y3 + 2 * escala;
  return [
    `M  ${x72} ${y72}`,
    `Q ${x72 + (x3 - x72) / 2}, ${y72}, ${x3} ${y3}`,
  ].join(" ");
}

export function generateSingleVentLeftPath(
  x3: number,
  y3: number,
  y4: number,
  x03: number,
  y03: number,
  escala: number
): string {
  const reducirLenght = y3 - y4 > 25 * escala;
  const length = reducirLenght ? 25 : (y3 - y4) / escala;

  const x91 = x03 + (x3 - x03) / 2,
    y91 = y3 - length * escala;
  const x90 = x91 - escala / 16,
    y90 = y03 + (y3 - y03) / 2;

  return [
    `M  ${x91} ${y91}`,
    `C ${x91}, ${y91}, ${x90}, ${y90}, ${x90} ${y90}`,
    `C ${x90}, ${y90 + escala / 2}, ${x03}, ${y03 + escala}, ${x03} ${y03}`,
  ].join(" ");
}
export function generateSingleVentRightPath(
  x3: number,
  y3: number,
  y4: number,
  x03: number,
  y03: number,
  escala: number
): string {
  const reducirLenght = y3 - y4 > 25 * escala;
  const length = reducirLenght ? 25 : (y3 - y4) / escala;
  const x91 = x03 + (x3 - x03) / 2,
    y91 = y3 - length * escala;
  const x92 = x91 + escala / 16,
    y92 = y03 + (y3 - y03) / 2;
  return [
    `M  ${x91} ${y91}`,
    `C ${x91}, ${y91}, ${x92}, ${y92}, ${x92} ${y92}`,
    `C ${x92}, ${y92 + escala}, ${x3}, ${y3 + escala / 2}, ${x3} ${y3}`,
  ].join(" ");
}

export function generateDoubleVentLeftPath(
  x3: number,
  y3: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
): string {
  const reducirLenght = y03 - y04 > 20 * escala;
  const length = reducirLenght ? 20 : (y03 - y04) / escala;
  const yTargetleft = y03 - length * escala;
  const point = getPointAtY(
    yTargetleft,
    x03,
    y03,
    x03 + (x04 - x03) / (31 / 2),
    y03 + (y04 - y03) / (14 / 5),
    x03 + (x04 - x03) / (31 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const x72 = x3 + (x03 - x3) / 2,
    y72 = y3 + 2 * escala;
  const x73 = point.x + 2 * escala,
    y73 = y03 - length * escala;
  const x74 = x03 + 2.75 * escala,
    y74 = y03 + escala;
  const x75 = x03 + 3 * escala,
    y75 = y03 + escala;
  return [
    `M  ${x72} ${y72}`,
    `Q ${x72 + (x75 - x72) / 2}, ${y72}, ${x75} ${y75}`,
    `C ${x75}, ${y75}, ${x73}, ${y73}, ${x73} ${y73}`,
    `C ${x73}, ${y73}, ${x74}, ${y74}, ${x74} ${y74}`,
    `Q ${x74 + (x03 - x74) / 2}, ${y74}, ${x03} ${y03}`,
  ].join(" ");
}

export function generateDoubleVentRightPath(
  x03: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  escala: number
): string {
  const reducirLenght = y3 - y4 > 20 * escala;
  const length = reducirLenght ? 20 : (y3 - y4) / escala;
  const yTarget = y3 - length * escala;
  const point = getPointAtY(
    yTarget,
    x3,
    y3,
    x3 + (x4 - x3) / 15,
    y3 + (y4 - y3) / (17 / 6),
    x3 + (x4 - x3) / (5 / 4),
    y3 + (y4 - y3) / (17 / 11),
    x4,
    y4
  );
  const x72 = x3 + (x03 - x3) / 2,
    y72 = y3 + 2 * escala;
  const x73 = point.x - 2 * escala,
    y73 = y3 - length * escala;
  const x74 = x3 - 2.75 * escala,
    y74 = y3 + escala;
  const x75 = x3 - 3 * escala,
    y75 = y3 + escala;
  return [
    `M  ${x72} ${y72}`,
    `Q ${x72 + (x75 - x72) / 2}, ${y72}, ${x75} ${y75}`,
    `C ${x75}, ${y75}, ${x73}, ${y73}, ${x73} ${y73}`,
    `C ${x73}, ${y73}, ${x74}, ${y74}, ${x74} ${y74}`,
    `Q ${x74 + (x3 - x74) / 2}, ${y74}, ${x3} ${y3}`,
  ].join(" ");
}
