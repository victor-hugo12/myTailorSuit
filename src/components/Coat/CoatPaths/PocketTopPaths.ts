import { getPointAtY } from "@/components/mathUtils";

export function generatePocketTopPath(
  x0: number,
  y0: number,
  x5: number,
  y5: number,
  x6: number,
  y6: number,
  x7: number,
  y7: number,
  escala: number
): string {
  const x70 = x5 + (x6 - x5) / 2 - escala * 2,
    y70 = y5 + (y6 - y5) / 2;
  const point = getPointAtY(y70, x0, y0, x0, y0, x7, y7, x7, y7);
  const reducirWidht = 11 * escala < x70 - point.x;
  const width = reducirWidht ? 9 : (x70 - point.x - escala * 2) / escala;
  const x71 = x70,
    y71 = y70 + 2.5 * escala;
  const x72 = x71 - escala * width,
    y72 = y71 + escala / 2;
  const x73 = x72,
    y73 = y72 - 2.5 * escala;
  return [
    `M ${x70} ${y70}`,
    `C ${x70}, ${y70}, ${x71}, ${y71}, ${x71} ${y71}`,
    `C ${x71 + (x72 - x71) / 5}, ${y71 + (y72 - y71) / (8 / 5)}, ${
      x71 + (x72 - x71) / (5 / 3)
    }, ${y71 + (y72 - y71) / (4 / 5)}, ${x72} ${y72}`,
    `C ${x72}, ${y72}, ${x73}, ${y73}, ${x73} ${y73}`,
    `C ${x73 + (x70 - x73) / (20 / 7)}, ${y73 + (y70 - y73) / -8}, ${
      x73 + (x70 - x73) / (8 / 7)
    }, ${y73 + (y70 - y73) / (8 / 3)}, ${x70} ${y70}`,
  ].join(" ");
}
export function generatePocketWeltTopPath(
  x0: number,
  y0: number,
  x5: number,
  y5: number,
  x6: number,
  y6: number,
  x7: number,
  y7: number,
  escala: number
): string {
  const x70 = x5 + (x6 - x5) / 2 - escala * 2,
    y70 = y5 + (y6 - y5) / 2;
  const point = getPointAtY(y70, x0, y0, x0, y0, x7, y7, x7, y7);
  const reducirWidht = 11 * escala < x70 - point.x;
  const width = reducirWidht ? 9 : (x70 - point.x - escala * 2) / escala;
  const x71 = x70,
    y71 = y70 - escala / 2;
  const x72 = x71 - escala * width,
    y72 = y71 + escala / 2;
  const x73 = x72,
    y73 = y72 + escala / 2;
  const x74 = x70,
    y74 = y70 + escala / 2;
  const x75 = x74 - escala * width,
    y75 = y74 + escala / 2;
  const x76 = x75,
    y76 = y75 - escala / 2;
  return [
    `M ${x70} ${y70}`,
    `C ${x70}, ${y70}, ${x71}, ${y71}, ${x71} ${y71}`,
    `C ${x71}, ${y71}, ${x72}, ${y72}, ${x72} ${y72}`,
    `C ${x72}, ${y72}, ${x73}, ${y73}, ${x73} ${y73}`,
    `C ${x73}, ${y73}, ${x76}, ${y76}, ${x76} ${y76}`,
    `C ${x76}, ${y76}, ${x75}, ${y75}, ${x75} ${y75}`,
    `C ${x75}, ${y75}, ${x74}, ${y74}, ${x74} ${y74}`,
    `C ${x74}, ${y74}, ${x70}, ${y70}, ${x70} ${y70}`,
    `M ${x70} ${y70}`,
    `C ${x70 - escala / 8}, ${y70 + escala / 8}, ${x73}, ${
      y70 + escala / 2
    }, ${x73} ${y73}`,
    `C ${x73}, ${y73 - escala / 4}, ${x70 - escala / 8}, ${
      y70 - escala / 8
    }, ${x70} ${y70}`,
  ].join(" ");
}
