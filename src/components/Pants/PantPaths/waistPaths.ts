import { getPointAtX } from "@/components/mathUtils";

export function generateWaistLeftPath(
  x2: number,
  y2: number,
  waist: number,
  escala: number
): { waistPath: string; loopPath: string } {
  const x50 = x2,
    y50 = y2;
  const x51 = x2 - escala * waist,
    y51 = y2 - 2 * escala;
  const x52 = x51 + escala,
    y52 = y51 - 5.5 * escala;
  const x53 = x52 + escala * waist,
    y53 = y52 + 2 * escala;
  const waistPath = [
    `M ${x50} ${y50}`,
    `C ${x50 + (x51 - x50) / (11 / 4)}, ${y50 + (y51 - y50) / 4}, ${
      x50 + (x51 - x50) / (11 / 8)
    },${y50 + (y51 - y50) / 2}, ${x51} ${y51}`,
    `C ${x51 + (x52 - x51) / 4}, ${y51 + (y52 - y51) / (5 / 2)}, ${
      x51 + (x52 - x51) / 4
    },${y51 + (y52 - y51) / (5 / 4)}, ${x52} ${y52}`,
    `C ${x52 + (x53 - x52) / (11 / 4)}, ${y52 + (y53 - y52) / 4}, ${
      x52 + (x53 - x52) / (11 / 7)
    },${y52 + (y53 - y52) / 2}, ${x53} ${y53}`,
    `C ${x53 + (x50 - x53) / (4 / 3)}, ${y53 + (y50 - y53) / (11 / 7)}, ${
      x53 + (x50 - x53) / 4
    },${y53 + (y50 - y53) / (22 / 7)}, ${x50} ${y50}`,
  ].join(" ");
  const xTarget = x50 + (x51 - x50) / 2 - escala;
  const point = getPointAtX(
    xTarget,
    x50,
    y50,
    x50 + (x51 - x50) / (11 / 4),
    y50 + (y51 - y50) / 4,
    x50 + (x51 - x50) / (11 / 8),
    y50 + (y51 - y50) / 2,
    x51,
    y51
  );
  const point2 = getPointAtX(
    xTarget + 2 * escala,
    x50,
    y50,
    x50 + (x51 - x50) / (11 / 4),
    y50 + (y51 - y50) / 4,
    x50 + (x51 - x50) / (11 / 8),
    y50 + (y51 - y50) / 2,
    x51,
    y51
  );
  const point3 = getPointAtX(
    xTarget + 3 * escala,
    x52,
    y52,
    x52 + (x53 - x52) / (11 / 4),
    y52 + (y53 - y52) / 4,
    x52 + (x53 - x52) / (11 / 7),
    y52 + (y53 - y52) / 2,
    x53,
    y53
  );
  const point4 = getPointAtX(
    xTarget + escala,
    x52,
    y52,
    x52 + (x53 - x52) / (11 / 4),
    y52 + (y53 - y52) / 4,
    x52 + (x53 - x52) / (11 / 7),
    y52 + (y53 - y52) / 2,
    x53,
    y53
  );
  const x70 = point.x,
    y70 = point.y;
  const x71 = point2.x,
    y71 = point2.y;
  const x72 = point3.x,
    y72 = point3.y;
  const x73 = point4.x,
    y73 = point4.y;

  const loopPath = [
    `M ${x70} ${y70}`,
    `C ${x71}, ${y70 + (y71 - y70) / (14 / 6)}, ${
      x70 + (x71 - x70) / (4 / 5)
    },${y70 + (y71 - y70) / (7 / 4)}, ${x71} ${y71}`,
    `C ${x71 - 4}, ${y71 + 6}, ${x72 - 4},${y72 - 5}, ${x72} ${y72}`,
    `C ${x72}, ${y72 + (y73 - y72) / (7 / 3)}, ${x72},${
      y72 + (y73 - y72) / (14 / 11)
    }, ${x73} ${y73}`,
    `C ${x73 - 3}, ${y73 - 5}, ${x70 - 2},${y70 + 6}, ${x70} ${y70}`,
  ].join(" ");
  return { waistPath, loopPath };
}

export function generateWaistRightPath(
  x02: number,
  y02: number,
  waist: number,
  escala: number
): { waistPath: string; loopPath: string } {
  const x60 = x02,
    y60 = y02;
  const x61 = x60 - escala * waist,
    y61 = y02 + 2 * escala;
  const x62 = x61 + escala,
    y62 = y61 - 5.5 * escala;
  const x63 = x62 + escala * waist,
    y63 = y62 - 2 * escala;

  const waistPath = [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / (11 / 5)}, ${y60 + (y61 - y60) / 2}, ${
      x60 + (x61 - x60) / (11 / 8)
    },${y60 + (y61 - y60) / (4 / 3)}, ${x61} ${y61}`,
    `C ${x61 + (x62 - x61) / 4}, ${y61 + (y62 - y61) / (11 / 4)}, ${
      x61 + (x62 - x61) / 2
    },${y61 + (y62 - y61) / (11 / 8)}, ${x62} ${y62}`,
    `C ${x62 + (x63 - x62) / (22 / 9)}, ${y62 + (y63 - y62) / 6}, ${
      x62 + (x63 - x62) / (11 / 10)
    },${y62 + (y63 - y62) / 6}, ${x63} ${y63}`,
    `C ${x60}, ${y63 + (y60 - y63) / (22 / 9)}, ${x60},${
      y63 + (y60 - y63) / (11 / 7)
    }, ${x60} ${y60}`,
  ].join(" ");
  const xTarget = x60 + (x61 - x60) / 2 + escala;
  const point = getPointAtX(
    xTarget,
    x60,
    y60,
    x60 + (x61 - x60) / (11 / 5),
    y60 + (y61 - y60) / 2,
    x60 + (x61 - x60) / (11 / 8),
    y60 + (y61 - y60) / (4 / 3),
    x61,
    y61
  );
  const point2 = getPointAtX(
    xTarget - 2 * escala,
    x60,
    y60,
    x60 + (x61 - x60) / (11 / 5),
    y60 + (y61 - y60) / 2,
    x60 + (x61 - x60) / (11 / 8),
    y60 + (y61 - y60) / (4 / 3),
    x61,
    y61
  );
  const point3 = getPointAtX(
    xTarget - 2 * escala,
    x62,
    y62,
    x62 + (x63 - x62) / (22 / 9),
    y62 + (y63 - y62) / 6,
    x62 + (x63 - x62) / (11 / 10),
    y62 + (y63 - y62) / 6,
    x63,
    y63
  );
  const point4 = getPointAtX(
    xTarget,
    x62,
    y62,
    x62 + (x63 - x62) / (22 / 9),
    y62 + (y63 - y62) / 6,
    x62 + (x63 - x62) / (11 / 10),
    y62 + (y63 - y62) / 6,
    x63,
    y63
  );
  const x80 = point.x,
    y80 = point.y;
  const x81 = point2.x,
    y81 = point2.y;
  const x82 = point3.x,
    y82 = point3.y;
  const x83 = point4.x,
    y83 = point4.y;
  const loopPath = [
    `M ${x80} ${y80}`,
    `C ${x80}, ${y80}, ${x81},${y81}, ${x81} ${y81}`,
    `C ${x81 + 5}, ${y81 + 5}, ${x82 + 2},${y82 - 5}, ${x82} ${y82}`,
    `C ${x82 * (152 / 151)}, ${y82 + (y83 - y82) / 3}, ${x82 * (152 / 151)},${
      y82 + (y83 - y82) / (8 / 5)
    }, ${x83} ${y83}`,
    `C ${x83 + 2}, ${y83 - 5}, ${x80 + 1},${y80 + 5}, ${x80} ${y80}`,
    `M ${x60} ${y60}`,
    `C ${x63}, ${y60 + 2 * escala}, ${x63},${
      y60 + (y63 - y60) / 2
    }, ${x63} ${y63}`,
    `C ${x60}, ${y63 + (y60 - y63) / 5.5}, ${x63 + escala},${
      y60 + 2 * escala
    }, ${x60} ${y60}`,
  ].join(" ");
  return { waistPath, loopPath };
}
export function generateWaistExtendedRightPath(
  x02: number,
  y02: number,
  waist: number,
  escala: number
): { waistPath: string; loopPath: string } {
  const x60 = x02,
    y60 = y02;
  const x61 = x60 - escala * waist,
    y61 = y02 + 2 * escala;
  const x62 = x61 + escala,
    y62 = y61 - 5.5 * escala;
  const x63 = x62 + escala * waist,
    y63 = y62 - 2 * escala;
  const x64 = x61 - 6 * escala,
    y64 = y61;

  const x66 = x62 - 6 * escala,
    y66 = y62;
  const x65 = x64 - 1 * escala,
    y65 = y64 + (y66 - y64) / 2;
  const waistPath = [
    `M ${x60} ${y60}`,
    `C ${x60 + (x61 - x60) / (11 / 5)}, ${y60 + (y61 - y60) / 2}, ${
      x60 + (x61 - x60) / (11 / 8)
    },${y60 + (y61 - y60) / (4 / 3)}, ${x61} ${y61}`,
    `C ${x61}, ${y61}, ${x64},${y64}, ${x64} ${y64}`,
    `C ${x64}, ${y64}, ${x65},${y65}, ${x65} ${y65}`,
    `C ${x65}, ${y65}, ${x66},${y66}, ${x66} ${y66}`,
    `C ${x66}, ${y66}, ${x62},${y62}, ${x62} ${y62}`,
    `C ${x62 + (x63 - x62) / (22 / 9)}, ${y62 + (y63 - y62) / 6}, ${
      x62 + (x63 - x62) / (11 / 10)
    },${y62 + (y63 - y62) / 6}, ${x63} ${y63}`,
    `C ${x60}, ${y63 + (y60 - y63) / (22 / 9)}, ${x60},${
      y63 + (y60 - y63) / (11 / 7)
    }, ${x60} ${y60}`,
  ].join(" ");
  const xTarget = x60 + (x61 - x60) / 2 + escala;
  const point = getPointAtX(
    xTarget,
    x60,
    y60,
    x60 + (x61 - x60) / (11 / 5),
    y60 + (y61 - y60) / 2,
    x60 + (x61 - x60) / (11 / 8),
    y60 + (y61 - y60) / (4 / 3),
    x61,
    y61
  );
  const point2 = getPointAtX(
    xTarget - 2 * escala,
    x60,
    y60,
    x60 + (x61 - x60) / (11 / 5),
    y60 + (y61 - y60) / 2,
    x60 + (x61 - x60) / (11 / 8),
    y60 + (y61 - y60) / (4 / 3),
    x61,
    y61
  );
  const point3 = getPointAtX(
    xTarget - 2 * escala,
    x62,
    y62,
    x62 + (x63 - x62) / (22 / 9),
    y62 + (y63 - y62) / 6,
    x62 + (x63 - x62) / (11 / 10),
    y62 + (y63 - y62) / 6,
    x63,
    y63
  );
  const point4 = getPointAtX(
    xTarget,
    x62,
    y62,
    x62 + (x63 - x62) / (22 / 9),
    y62 + (y63 - y62) / 6,
    x62 + (x63 - x62) / (11 / 10),
    y62 + (y63 - y62) / 6,
    x63,
    y63
  );
  const x80 = point.x,
    y80 = point.y;
  const x81 = point2.x,
    y81 = point2.y;
  const x82 = point3.x,
    y82 = point3.y;
  const x83 = point4.x,
    y83 = point4.y;

  const loopPath = [
    `M ${x80} ${y80}`,
    `C ${x80}, ${y80}, ${x81},${y81}, ${x81} ${y81}`,
    `C ${x81 + 5}, ${y81 + 5}, ${x82 + 2},${y82 - 5}, ${x82} ${y82}`,
    `C ${x82 * (152 / 151)}, ${y82 + (y83 - y82) / 3}, ${x82 * (152 / 151)},${
      y82 + (y83 - y82) / (8 / 5)
    }, ${x83} ${y83}`,
    `C ${x83 + 2}, ${y83 - 5}, ${x80 + 1},${y80 + 5}, ${x80} ${y80}`,
    `M ${x60} ${y60}`,
    `C ${x63}, ${y60 + 2 * escala}, ${x63},${
      y60 + (y63 - y60) / 2
    }, ${x63} ${y63}`,
    `C ${x60}, ${y63 + (y60 - y63) / 5.5}, ${x63 + escala},${
      y60 + 2 * escala
    }, ${x60} ${y60}`,
  ].join(" ");
  return { waistPath, loopPath };
}
