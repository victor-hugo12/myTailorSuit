import { getPointAtY } from "@/components/mathUtils";

export function generatePocketRightPath(
  x0: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  escala: number
): string {
  const yTarget = y3 + (y4 - y3) / (14 / 11);
  const point = getPointAtY(
    yTarget,
    x3,
    y3,
    x3 + (x4 - x3) / -13,
    y3 + (y4 - y3) / (20 / 11),
    x3 + (x4 - x3) / (13 / 18),
    y3 + (y4 - y3) / (5 / 4),
    x4,
    y4
  );
  const reducirWidht = 11 * escala < point.x - x0;
  const width = reducirWidht ? 7 : (point.x - x0 - 4 * escala) / escala;
  const x60 = point.x,
    y60 = point.y;
  const x61 = x60 - escala * width,
    y61 = y60 - escala / 8;
  const x62 = x61 + escala,
    y62 = y61 + escala * 4;
  const x63 = x62 + escala * width,
    y63 = y62 + escala / 2;
  return [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / 17}, ${y60 + (y61 - y60) / (4 / 3)}, ${
      x60 + (x61 - x60) / (17 / 13)
    }, ${y61}, ${x61} ${y61}`,
    `C ${x61}, ${y61}, ${x62}, ${y62}, ${x62} ${y62}`,
    `C ${x62 + (x63 - x62) / (7 / 5)}, ${y62}, ${
      x62 + (x63 - x62) / (4 / 5)
    }, ${y62 + (y63 - y62) / (-4 / 5)}, ${x63} ${y63}`,
    `C ${x63 + (x60 - x63) / (-2 / 3)}, ${y63 + (y60 - y63) / 7}, ${
      x63 + (x60 - x63) / 8
    }, ${y63 + (y60 - y63) / 7}, ${x60} ${y60}`,
  ].join(" ");
}
export function generatePocketLeftPath(
  x00: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
): string {
  const yTargetleft = y03 + (y04 - y03) / (14 / 11);
  const point = getPointAtY(
    yTargetleft,
    x03,
    y03,
    x03,
    y03 + (y04 - y03) / (5 / 2),
    x03 + (x04 - x03) / (13 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const reducirWidht = 14 * escala < x00 - point.x;
  const width = reducirWidht ? 6 : (x00 - point.x - 8 * escala) / escala;
  const x64 = point.x,
    y64 = point.y;
  const x65 = x64 + escala * width,
    y65 = y64 - 0.5 * escala;
  const x66 = x65 - escala,
    y66 = y65 + escala * 5;
  const x67 = x66 - escala * (width + 1),
    y67 = y66 + escala / 2;
  return [
    `M ${x64} ${y64}`,
    `C ${x64 + (x65 - x64) / 16}, ${y64 + (y65 - y64) / 8}, ${
      x64 + (x65 - x64) / (5 / 3)
    }, ${y64 + (y65 - y64) / (8 / 7)}, ${x65} ${y65}`,
    `C ${x65}, ${y65}, ${x66}, ${y66}, ${x66} ${y66}`,
    `C ${x66 + (x67 - x66) / (13 / 6)}, ${y66}, ${
      x66 + (x67 - x66) / (13 / 14)
    }, ${y66 + (y67 - y66) / (-4 / 7)}, ${x67} ${y67}`,
    `C ${x67}, ${y67}, ${x64}, ${y64}, ${x64} ${y64}`,
  ].join(" ");
}

export function generatePocketPatchRightPath(
  x0: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  escala: number
): string {
  const yTarget = y3 + (y4 - y3) / (14 / 11);
  const point = getPointAtY(
    yTarget,
    x3,
    y3,
    x3 + (x4 - x3) / -13,
    y3 + (y4 - y3) / (20 / 11),
    x3 + (x4 - x3) / (13 / 18),
    y3 + (y4 - y3) / (5 / 4),
    x4,
    y4
  );
  const reducirWidht = 12 * escala < point.x - x0;
  const width = reducirWidht ? 7 : (point.x - x0 - 4 * escala) / escala;
  const reducirLength = 12 * escala < y3 - point.y;
  const length = reducirLength ? 10 : (y3 - point.y - 2 * escala) / escala;
  const point2 = getPointAtY(
    yTarget + escala * length,
    x3,
    y3,
    x3 + (x4 - x3) / -13,
    y3 + (y4 - y3) / (20 / 11),
    x3 + (x4 - x3) / (13 / 18),
    y3 + (y4 - y3) / (5 / 4),
    x4,
    y4
  );
  const x60 = point.x,
    y60 = point.y;
  const x61 = x60 - escala * width,
    y61 = y60 + escala;
  const x62 = x61 + escala * 3,
    y62 = y61 + escala * length;
  const x63 = point2.x,
    y63 = point2.y;
  return [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / 7}, ${y60 + (y61 - y60) / (8 / 5)}, ${
      x60 + (x61 - x60) / (7 / 5)
    }, ${y60 + (y61 - y60) / (8 / 7)}, ${x61} ${y61}`,
    `C ${x61 + (x62 - x61) / 8}, ${y61 + (y62 - y61) / (32 / 29)}, ${
      x61 + (x62 - x61) / 4
    }, ${y61 + (y62 - y61) / (32 / 31)}, ${x62} ${y62}`,
    `C ${x62 + (x63 - x62) / (19 / 13)}, ${y62}, ${
      x62 + (x63 - x62) / (19 / 15)
    }, ${y62 + (y63 - y62) / (8 / 5)}, ${x63} ${y63}`,
  ].join(" ");
}
export function generatePocketPatchLeftPath(
  x00: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
): string {
  const yTargetleft = y03 + (y04 - y03) / (14 / 11);
  const point = getPointAtY(
    yTargetleft,
    x03,
    y03,
    x03,
    y03 + (y04 - y03) / (5 / 2),
    x03 + (x04 - x03) / (13 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const reducirLength = 12 * escala < y03 - point.y;
  const length = reducirLength ? 10 : (y03 - point.y - 2 * escala) / escala;
  const reducirWidht = 15 * escala < x00 - point.x;

  const width = reducirWidht ? 8 : (x00 - point.x - 7 * escala) / escala;

  const point2 = getPointAtY(
    yTargetleft + escala * length,
    x03,
    y03,
    x03,
    y03 + (y04 - y03) / (5 / 2),
    x03 + (x04 - x03) / (13 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const x64 = point.x,
    y64 = point.y;
  const x65 = x64 + escala * width,
    y65 = y64 + escala;
  const x66 = x65 - 2.5 * escala,
    y66 = y65 + escala * length;
  const x67 = point2.x,
    y67 = point2.y;
  return [
    `M ${x64} ${y64}`,
    `C ${x64 + (x65 - x64) / 11}, ${y64 + (y65 - y64) / 4}, ${
      x64 + (x65 - x64) / (11 / 9)
    }, ${y64 + (y65 - y64) / 2}, ${x65} ${y65}`,
    `C ${x65 + (x66 - x65) / (16 / 7)}, ${y65 + (y66 - y65) / (8 / 7)}, ${
      x65 + (x66 - x65) / 2
    }, ${y66}, ${x66} ${y66}`,
    `C ${x66 + (x67 - x66) / (7 / 3)}, ${y66 + (y67 - y66) / 8}, ${
      x66 + (x67 - x66) / (7 / 6)
    }, ${y66 + (y67 - y66) / (8 / 5)}, ${x67} ${y67}`,
  ].join(" ");
}

export function generatePocketWeltRightPath(
  x0: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  escala: number
): string {
  const yTarget = y3 + (y4 - y3) / (14 / 11);
  const point = getPointAtY(
    yTarget,
    x3,
    y3,
    x3 + (x4 - x3) / -13,
    y3 + (y4 - y3) / (20 / 11),
    x3 + (x4 - x3) / (13 / 18),
    y3 + (y4 - y3) / (5 / 4),
    x4,
    y4
  );
  const point2 = getPointAtY(
    yTarget + escala / 2,
    x3,
    y3,
    x3 + (x4 - x3) / -13,
    y3 + (y4 - y3) / (20 / 11),
    x3 + (x4 - x3) / (13 / 18),
    y3 + (y4 - y3) / (5 / 4),
    x4,
    y4
  );
  const point3 = getPointAtY(
    yTarget + escala,
    x3,
    y3,
    x3 + (x4 - x3) / -13,
    y3 + (y4 - y3) / (20 / 11),
    x3 + (x4 - x3) / (13 / 18),
    y3 + (y4 - y3) / (5 / 4),
    x4,
    y4
  );
  const reducirWidht = 12 * escala < point.x - x0;

  const width = reducirWidht ? 7 : (point.x - x0 - 4 * escala) / escala;

  const x60 = point.x,
    y60 = point.y;
  const x61 = x60 - escala * width,
    y61 = y60 - escala / 2;
  const x62 = x61,
    y62 = y61 + escala / 2;
  const x63 = point2.x,
    y63 = point2.y;
  const x64 = x63 - escala * width,
    y64 = y63 - escala / 2;
  const x65 = x64,
    y65 = y64 + escala / 2;
  const x66 = point3.x,
    y66 = point3.y;
  return [
    `M ${x60} ${y60}`,
    `C ${x60}, ${y60}, ${x61}, ${y61}, ${x61} ${y61}`,
    `C ${x61}, ${y61}, ${x62}, ${y62}, ${x62} ${y62}`,
    `C ${x62}, ${y62 - 1}, ${x63}, ${y63 - 2}, ${x63} ${y63}`,
    `M ${x63} ${y63}`,
    `C ${x63}, ${y63 + 2}, ${x64}, ${y64 + 1}, ${x64} ${y64}`,
    `C ${x64}, ${y64}, ${x65}, ${y65}, ${x65} ${y65}`,
    `C ${x65}, ${y65}, ${x66}, ${y66}, ${x66} ${y66}`,
  ].join(" ");
}
export function generatePocketWeltLeftPath(
  x00: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
): string {
  const yTargetleft = y03 + (y04 - y03) / (14 / 11);
  const point = getPointAtY(
    yTargetleft,
    x03,
    y03,
    x03,
    y03 + (y04 - y03) / (5 / 2),
    x03 + (x04 - x03) / (13 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const point2 = getPointAtY(
    yTargetleft + escala / 2,
    x03,
    y03,
    x03,
    y03 + (y04 - y03) / (5 / 2),
    x03 + (x04 - x03) / (13 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const point3 = getPointAtY(
    yTargetleft + escala,
    x03,
    y03,
    x03,
    y03 + (y04 - y03) / (5 / 2),
    x03 + (x04 - x03) / (13 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const reducirWidht = 14 * escala < x00 - point.x;

  const width = reducirWidht ? 6 : (x00 - point.x - 8 * escala) / escala;

  const x64 = point.x,
    y64 = point.y;
  const x65 = x64 + escala * width,
    y65 = y64 + escala / 2;
  const x66 = x65 - escala / 4,
    y66 = y65 + escala * 0.5;
  const x67 = point2.x,
    y67 = point2.y;
  const x68 = x67 + escala * width - escala / 4,
    y68 = y67 + escala / 2;
  const x69 = x68,
    y69 = y68 + escala * 0.5;
  const x70 = point3.x,
    y70 = point3.y;
  return [
    `M ${x64} ${y64}`,
    `C ${x64}, ${y64}, ${x65}, ${y65}, ${x65} ${y65}`,
    `C ${x65}, ${y65}, ${x66}, ${y66}, ${x66} ${y66}`,
    `C ${x66}, ${y66 - 2}, ${x67}, ${y67 - 2}, ${x67} ${y67}`,
    `M ${x67} ${y67}`,
    `C ${x67}, ${y67 + 2}, ${x68}, ${y68 + 1}, ${x68} ${y68}`,
    `C ${x68}, ${y68}, ${x69}, ${y69}, ${x69} ${y69}`,
    `C ${x69}, ${y69}, ${x70}, ${y70}, ${x70} ${y70}`,
  ].join(" ");
}
