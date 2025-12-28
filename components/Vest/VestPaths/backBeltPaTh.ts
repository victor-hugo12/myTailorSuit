import { getPointAtY } from "components/mathUtils";

export function generateBackBeltPath(
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  escala: number
) {
  const yTarget = y4 + 2 * escala;
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

  const yTarget2 = y04 + 2 * escala;
  const point2 = getPointAtY(
    yTarget2,
    x03,
    y03,
    x03,
    y03 + (y04 - y03) / (5 / 2),
    x03 + (x04 - x03) / (13 / 20),
    y03 + (y04 - y03) / (7 / 5),
    x04,
    y04
  );
  const reducirWidht = 30 * escala < x4 - x04;

  let width = reducirWidht ? 10 : (x4 - x04 - 20 * escala) / escala;

  if (width < 2) {
    width = 2;
  }
  const width4 = (x4 - x04) / escala;

  const x60 = x4 - escala * width,
    y60 = y4;
  const x61 = x60,
    y61 = y4 + 2 * escala;
  const x62 = point.x,
    y62 = point.y;
  const x63 = x04 + escala * width,
    y63 = y04;
  const x64 = x63,
    y64 = y63 + 2 * escala;
  const x65 = point2.x,
    y65 = point2.y;

  const x66 = x4 + (x04 - x4) / 2 + escala,
    y66 = y04;
  const x67 = x66,
    y67 = y66 + 2 * escala;
  const x68 = x66 - 2 * escala,
    y68 = y66;
  const x69 = x68,
    y69 = y68 + 2 * escala;

  const x70 = x4 + (x04 - x4) / 2 + 1.3 * escala,
    y70 = y04 + 0.1 * escala;
  const x71 = x70,
    y71 = y70 + 1.8 * escala;
  const x72 = x70 + 2 * escala,
    y72 = y70 + 0.2 * escala;
  const x73 = x72,
    y73 = y72 + 2 * escala;
  const x74 = x73,
    y74 = y71;
  const backBelt1 = [
    `M ${x4} ${y4}`,
    `C ${x4}, ${y4}, ${x60}, ${y60}, ${x60} ${y60}`,
    `C ${x60}, ${y60}, ${x61}, ${y61}, ${x61} ${y61}`,
    `C ${x61}, ${y61}, ${x62}, ${y62}, ${x62} ${y62}`,
    `M ${x04} ${y04}`,
    `C ${x04}, ${y04}, ${x63}, ${y63}, ${x63} ${y63}`,
    `C ${x63}, ${y63}, ${x64}, ${y64}, ${x64} ${y64}`,
    `C ${x64}, ${y64}, ${x65}, ${y65}, ${x65} ${y65}`,
  ].join(" ");
  const backBelt2 = [
    `M ${x63} ${y63}`,
    `C ${x63}, ${y63}, ${x66}, ${y66}, ${x66} ${y66}`,
    `C ${x66}, ${y66}, ${x67}, ${y67}, ${x67} ${y67}`,
    `C ${x67}, ${y67}, ${x64}, ${y64}, ${x64} ${y64}`,
    `C ${x64}, ${y64}, ${x63}, ${y63}, ${x63} ${y63}`,
    `M ${x68} ${y68}`,
    `C ${x68 - escala / 16}, ${y68}, ${
      x69 - escala / 16
    }, ${y69}, ${x69} ${y69}`,
    `C ${x69}, ${y69}, ${x68}, ${y68}, ${x68} ${y68}`,
    `M ${x70} ${y70}`,
    `C ${x70}, ${y70}, ${x72}, ${y72}, ${x72} ${y72}`,
    `C ${x72}, ${y72}, ${x73}, ${y73}, ${x73} ${y73}`,
    `C ${x73}, ${y73}, ${x71}, ${y71}, ${x71} ${y71}`,
    `C ${x71}, ${y71}, ${x70}, ${y70}, ${x70} ${y70}`,
    `M ${x60} ${y60}`,
    `C ${x60}, ${y60}, ${x70}, ${y70}, ${x70} ${y70}`,
    `C ${x70}, ${y70}, ${x72}, ${y72}, ${x72} ${y72}`,
    `C ${x72}, ${y72}, ${x74}, ${y74}, ${x74} ${y74}`,
    `C ${x74}, ${y74}, ${x61}, ${y61}, ${x61} ${y61}`,
  ].join(" ");
  return { backBelt1, backBelt2 };
}
