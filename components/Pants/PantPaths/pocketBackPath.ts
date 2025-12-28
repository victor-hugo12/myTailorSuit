import { getPointAtX } from "components/mathUtils";

export function generatePocketBackWeltLeftPath(
  x2: number,
  x02: number,
  y02: number,
  escala: number
) {
  const reducirWidht = 16 * escala < x02 - x2;

  const width = reducirWidht ? 13 : (x02 - x2 - 4 * escala) / escala;

  const x31 = x02 - escala,
    y31 = y02 + escala * 6;
  const x32 = x31 - width * escala,
    y32 = y31 + escala;
  const x33 = x32,
    y33 = y32 - escala;
  const x34 = x33 + width * escala,
    y34 = y33 - escala;
  const x35 = x31 - width * escala,
    y35 = y31 + escala;
  const x36 = x35,
    y36 = y35 + escala;
  const x37 = x36 + width * escala,
    y37 = y35;
  const welt = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 4}, ${x32}, ${y32 - escala / 2}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
    `C ${x33}, ${y33}, ${x34}, ${y34}, ${x34} ${y34}`,
    `C ${x34}, ${y34}, ${x31}, ${y31}, ${x31} ${y31}`,
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 + escala / 4}, ${x35}, ${y35 + escala / 4}, ${x35} ${y35}`,
    `C ${x35}, ${y35}, ${x36}, ${y36}, ${x36} ${y36}`,
    `C ${x36}, ${y36}, ${x37}, ${y37}, ${x37} ${y37}`,
    `C ${x37}, ${y37}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const xTarget = x31 + (x32 - x31) / 2;
  const point = getPointAtX(xTarget, x31, y31, x31, y31, x35, y35, x35, y35);
  const point2 = getPointAtX(
    xTarget - escala / 2,
    x31,
    y31,
    x31,
    y31,
    x35,
    y35,
    x35,
    y35
  );
  const point3 = getPointAtX(
    xTarget + escala / 2,
    x31,
    y31,
    x31,
    y31,
    x35,
    y35,
    x35,
    y35
  );

  const x41 = point.x,
    y41 = point.y;
  const x42 = x41,
    y42 = y41 + 2 * escala;
  const x43 = x42 - 1,
    y43 = y42 - 0.5 * escala;
  const x44 = point2.x,
    y44 = point2.y;
  const x45 = x42 + escala / 2,
    y45 = y42 - 0.5 * escala;
  const x46 = point3.x,
    y46 = point3.y;
  const tab = [
    `M ${x41} ${y41}`,
    `Q ${x41 - escala / 4}, ${y41}, ${x42} ${y42}`,
    `C ${x42}, ${y42}, ${x43}, ${y43}, ${x43} ${y43}`,
    `C ${x43}, ${y43}, ${x44}, ${y44}, ${x44} ${y44}`,
    `M ${x41} ${y41}`,
    `Q ${x41 + escala / 4}, ${y41}, ${x42} ${y42}`,
    `C ${x42}, ${y42}, ${x45}, ${y45}, ${x45} ${y45}`,
    `C ${x45}, ${y45}, ${x46}, ${y46}, ${x46} ${y46}`,
  ].join(" ");
  const fly = [
    `M ${x42} ${y42 + 0 * escala}`,
    `L ${x42} ${y42 + 0.5 * escala}`,
  ].join(" ");
  return { welt, tab, fly };
}
export function generatePocketBackWeltRighttPath(
  x2: number,
  x4: number,
  y4: number,
  escala: number
) {
  const reducir = 16 * escala < x2 - x4;

  const length = reducir ? 13 : (x2 - x4 - 4 * escala) / escala;
  const x31 = x4 + escala,
    y31 = y4 + escala * 6;
  const x32 = x31 + length * escala,
    y32 = y31 + escala;
  const x33 = x32,
    y33 = y32 - escala;
  const x34 = x33 - length * escala,
    y34 = y33 - escala;
  const x35 = x31 + length * escala,
    y35 = y31 + escala;
  const x36 = x35,
    y36 = y35 + escala;
  const x37 = x36 - length * escala,
    y37 = y35;
  const welt = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 2}, ${x32}, ${y32 - escala / 2}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
    `C ${x33}, ${y33}, ${x34}, ${y34}, ${x34} ${y34}`,
    `C ${x34}, ${y34}, ${x31}, ${y31}, ${x31} ${y31}`,
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 + escala / 4}, ${x35}, ${y35}, ${x35} ${y35}`,
    `C ${x35}, ${y35}, ${x36}, ${y36}, ${x36} ${y36}`,
    `C ${x36}, ${y36}, ${x37}, ${y37}, ${x37} ${y37}`,
    `C ${x37}, ${y37}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const xTarget = x31 + (x32 - x31) / 2;
  const point = getPointAtX(xTarget, x31, y31, x31, y31, x32, y32, x32, y32);
  const point2 = getPointAtX(
    xTarget - escala / 2,
    x31,
    y31,
    x31,
    y31,
    x32,
    y32,
    x32,
    y32
  );
  const point3 = getPointAtX(
    xTarget + escala / 2,
    x31,
    y31,
    x31,
    y31,
    x32,
    y32,
    x32,
    y32
  );
  const x41 = point.x,
    y41 = point.y;
  const x42 = x41,
    y42 = y41 + 2 * escala;
  const x43 = x42 - escala / 2,
    y43 = y42 - 0.5 * escala;
  const x44 = point2.x,
    y44 = point2.y;
  const x45 = x42 + escala / 2,
    y45 = y42 - 0.5 * escala;
  const x46 = point3.x,
    y46 = point3.y;
  const tab = [
    `M ${x41} ${y41}`,
    `Q ${x41 - escala / 4}, ${y41}, ${x42} ${y42}`,
    `C ${x42}, ${y42}, ${x43}, ${y43}, ${x43} ${y43}`,
    `C ${x43}, ${y43}, ${x44}, ${y44}, ${x44} ${y44}`,
    `M ${x41} ${y41}`,
    `Q ${x41 + escala / 4}, ${y41}, ${x42} ${y42}`,
    `C ${x42}, ${y42}, ${x45}, ${y45}, ${x45} ${y45}`,
    `C ${x45}, ${y45}, ${x46}, ${y46}, ${x46} ${y46}`,
  ].join(" ");
  const fly = [
    `M ${x42} ${y42 + 0 * escala}`,
    `L ${x42} ${y42 + 0.5 * escala}`,
  ].join(" ");
  return { welt, tab, fly };
}

export function generatePocketBackFlapButtonRightPath(
  x2: number,
  x4: number,
  y4: number,
  escala: number
) {
  const reducir = 16 * escala < x2 - x4;

  const length = reducir ? 13 : (x2 - x4 - 4 * escala) / escala;
  const x31 = x4 + escala,
    y31 = y4 + escala * 6;
  const x32 = x31 + length * escala,
    y32 = y31 + escala;
  const x33 = x32,
    y33 = y32 - escala;
  const x34 = x33 - length * escala,
    y34 = y33 - escala;
  const x35 = x31 + length * escala,
    y35 = y31 + escala;
  const x36 = x35,
    y36 = y35 + 2 * escala;
  const x37 = x36 - length * escala,
    y37 = y31 + 2 * escala;
  const x38 = x36 + (x37 - x36) / 2,
    y38 = y37 + 2 * escala;
  const welt = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 2}, ${x32}, ${y32 - escala / 2}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
    `C ${x33}, ${y33}, ${x34}, ${y34}, ${x34} ${y34}`,
    `C ${x34}, ${y34}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const tab = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 2}, ${x35}, ${y35 - escala / 2}, ${x35} ${y35}`,
    `C ${x35}, ${y35}, ${x36}, ${y36}, ${x36} ${y36}`,
    `C ${x36}, ${y36}, ${x38}, ${y38}, ${x38} ${y38}`,
    `C ${x38}, ${y38}, ${x37}, ${y37}, ${x37} ${y37}`,
    `C ${x37}, ${y37}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const fly = [
    `M ${x38} ${y38 - 0.5 * escala}`,
    `L ${x38} ${y38 - 2 * escala}`,
  ].join(" ");
  return { welt, tab, fly };
}
export function generatePocketBackFlapButtonLeftPath(
  x2: number,
  x02: number,
  y02: number,
  escala: number
) {
  const reducir = 16 * escala < x02 - x2;
  const length = reducir ? 13 : (x02 - x2 - 4 * escala) / escala;
  const x31 = x02 - escala,
    y31 = y02 + escala * 6;
  const x32 = x31 - length * escala,
    y32 = y31 + escala;
  const x33 = x32,
    y33 = y32 - escala;
  const x34 = x33 + length * escala,
    y34 = y33 - escala;
  const x35 = x31 - length * escala,
    y35 = y31 + escala;
  const x36 = x35,
    y36 = y35 + 2 * escala;
  const x37 = x36 + length * escala,
    y37 = y31 + 2 * escala;
  const x38 = x36 + (x37 - x36) / 2,
    y38 = y37 + 2 * escala;
  const welt = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 4}, ${x32}, ${y32 - escala / 2}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
    `C ${x33}, ${y33}, ${x34}, ${y34}, ${x34} ${y34}`,
    `C ${x34}, ${y34}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const tab = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 4}, ${x35}, ${y35 - escala / 2}, ${x35} ${y35}`,
    `C ${x35}, ${y35}, ${x36}, ${y36}, ${x36} ${y36}`,
    `C ${x36}, ${y36}, ${x38}, ${y38}, ${x38} ${y38}`,
    `C ${x38}, ${y38}, ${x37}, ${y37}, ${x37} ${y37}`,
    `C ${x37}, ${y37}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const fly = [
    `M ${x38} ${y38 - 0.5 * escala}`,
    `L ${x38} ${y38 - 2 * escala}`,
  ].join(" ");
  return { welt, tab, fly };
}
export function generatePocketBackPatchButtonRightPath(
  x2: number,
  y6: number,
  x4: number,
  y4: number,
  escala: number
) {
  const reducirAncho = 16 * escala < x2 - x4;
  const width = reducirAncho ? 13 : (x2 - x4 - 4 * escala) / escala;
  const reducirLargo = 21 * escala < y6 - y4;
  const length = reducirLargo ? 13 : (y6 - y4 - 8 * escala) / escala;

  const x31 = x4 + escala,
    y31 = y4 + escala * 6;
  const x32 = x31 + width * escala,
    y32 = y31 + escala;
  const x33 = x32,
    y33 = y32 - escala;
  const x34 = x33 - width * escala,
    y34 = y33 - escala;
  const x35 = x31 + width * escala,
    y35 = y31 + escala;
  const x36 = x35,
    y36 = y35 + length * escala;
  const x37 = x36 - width * escala,
    y37 = y31 + length * escala;
  const x38 = x36 + (x37 - x36) / 2,
    y38 = y37 + 2 * escala;
  const welt = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 2}, ${x32}, ${y32 - escala / 2}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
    `C ${x33}, ${y33}, ${x34}, ${y34}, ${x34} ${y34}`,
    `C ${x34}, ${y34}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const tab = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 2}, ${x35}, ${y35 - escala / 2}, ${x35} ${y35}`,
    `C ${x35}, ${y35}, ${x36}, ${y36}, ${x36} ${y36}`,
    `C ${x36}, ${y36}, ${x38}, ${y38}, ${x38} ${y38}`,
    `C ${x38}, ${y38}, ${x37}, ${y37}, ${x37} ${y37}`,
    `C ${x37}, ${y37}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const fly = [
    `M ${x38} ${y31 + 2 * escala}`,
    `L ${x38} ${y31 + 0.5 * escala}`,
  ].join(" ");
  return { welt, tab, fly };
}
export function generatePocketBackPatchButtonLeftPath(
  x2: number,
  y04: number,
  x02: number,
  y02: number,
  escala: number
) {
  const reducirAncho = 16 * escala < x02 - x2;
  const width = reducirAncho ? 13 : (x02 - x2 - 4 * escala) / escala;
  const reducirLargo = 21 * escala < y04 - y02;
  const length = reducirLargo ? 13 : (y04 - y02 - 8 * escala) / escala;

  const x31 = x02 - escala,
    y31 = y02 + escala * 6;
  const x32 = x31 - width * escala,
    y32 = y31 + escala;
  const x33 = x32,
    y33 = y32 - escala;
  const x34 = x33 + width * escala,
    y34 = y33 - escala;
  const x35 = x31 - width * escala,
    y35 = y31 + escala;
  const x36 = x35,
    y36 = y35 + length * escala;
  const x37 = x36 + width * escala,
    y37 = y31 + length * escala;
  const x38 = x36 + (x37 - x36) / 2,
    y38 = y37 + 2 * escala;
  const welt = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 4}, ${x32}, ${y32 - escala / 2}, ${x32} ${y32}`,
    `C ${x32}, ${y32}, ${x33}, ${y33}, ${x33} ${y33}`,
    `C ${x33}, ${y33}, ${x34}, ${y34}, ${x34} ${y34}`,
    `C ${x34}, ${y34}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const tab = [
    `M ${x31} ${y31}`,
    `C ${x31}, ${y31 - escala / 4}, ${x35}, ${y35 - escala / 2}, ${x35} ${y35}`,
    `C ${x35}, ${y35}, ${x36}, ${y36}, ${x36} ${y36}`,
    `C ${x36}, ${y36}, ${x38}, ${y38}, ${x38} ${y38}`,
    `C ${x38}, ${y38}, ${x37}, ${y37}, ${x37} ${y37}`,
    `C ${x37}, ${y37}, ${x31}, ${y31}, ${x31} ${y31}`,
  ].join(" ");
  const fly = [
    `M ${x38} ${y31 + 2 * escala}`,
    `L ${x38} ${y31 + 0.5 * escala}`,
  ].join(" ");
  return { welt, tab, fly };
}
