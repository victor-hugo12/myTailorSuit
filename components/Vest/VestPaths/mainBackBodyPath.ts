export function generateBackVestPath(
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  x5: number,
  y5: number,
  x6: number,
  y6: number,
  x7: number,
  y7: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  x05: number,
  y05: number,
  x06: number,
  y06: number,
  x07: number,
  y07: number,
  escala: number
): string {
  return [
    `M  ${x3} ${y3}`,
    `C ${x3 + (x4 - x3) / -13}, ${y3 + (y4 - y3) / (20 / 11)}, ${
      x3 + (x4 - x3) / (13 / 18)
    }, ${y3 + (y4 - y3) / (5 / 4)}, ${x4} ${y4}`,
    `C ${x4 + (x5 - x4) / (29 / 4)}, ${y4 + (y5 - y4) / (20 / 9)}, ${
      x4 + (x5 - x4) / (29 / 12)
    }, ${y4 + (y5 - y4) / (14 / 11)}, ${x5} ${y5}`,
    `C ${x5 + (x6 - x5) / 48}, ${y5 + (y6 - y5) / 5.03}, ${
      x5 + (x6 - x5) / 2
    }, ${y5 + (y6 - y5) / 1.25}, ${x6} ${y6}`,
    `C ${x6 + (x7 - x6) / (41 / 11)}, ${y6 + (y7 - y6) / (20 / 7)}, ${
      x6 + (x7 - x6) / (41 / 29)
    }, ${y6 + (y7 - y6) / (5 / 4)}, ${x7} ${y7}`,
    `Q ${x7 + (x07 - x7) / 2}, ${y07 + escala}, ${x07} ${y07}`,
    `C ${x06 + (x07 - x06) / (7 / 4)}, ${y06 + (y07 - y06) / 2}, ${
      x06 + (x07 - x06) / 14
    }, ${y06 + (y07 - y06) / (24 / 7)}, ${x06} ${y06}`,
    `C ${x05 + (x06 - x05) / 2}, ${y05 + (y06 - y05) / 1.25}, ${
      x05 + (x06 - x05) / 48
    }, ${y05 + (y06 - y05) / 5.03}, ${x05} ${y05}`,
    `C ${x04 + (x05 - x04) / 2}, ${y04 + (y05 - y04) / (5 / 4)}, ${
      x04 + (x05 - x04) / (15 / 2)
    }, ${y04 + (y05 - y04) / (20 / 9)}, ${x04} ${y04}`,
    `C ${x03 + (x04 - x03) / (13 / 20)}, ${
      y03 + (y04 - y03) / (7 / 5)
    }, ${x03}, ${y03 + (y04 - y03) / (5 / 2)}, ${x03} ${y03}`,
    `Q ${x03 + (x3 - x03) / 2}, ${y03 + 5 * escala}, ${x3} ${y3}`,
    `z`,
  ].join(" ");
}
export function generateBackRigthVestPath(
  x03: number,
  y03: number,
  x07: number,
  y07: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
  x5: number,
  y5: number,
  x6: number,
  y6: number,
  x7: number,
  y7: number,
  escala: number
): string {
  const x45 = x03 + (x3 - x03) / 2,
    y45 = y03 + 4 * escala;
  const x46 = x07 + (x7 - x07) / 2,
    y46 = y07 + escala;
  return [
    `M  ${x45} ${y45}`,
    `Q ${x3 + (x45 - x3) / 2}, ${y45}, ${x3} ${y3}`,
    `C ${x3 + (x4 - x3) / -13}, ${y3 + (y4 - y3) / (20 / 11)}, ${
      x3 + (x4 - x3) / (13 / 18)
    }, ${y3 + (y4 - y3) / (5 / 4)}, ${x4} ${y4}`,
    `C ${x4 + (x5 - x4) / (29 / 4)}, ${y4 + (y5 - y4) / (20 / 9)}, ${
      x4 + (x5 - x4) / (29 / 12)
    }, ${y4 + (y5 - y4) / (14 / 11)}, ${x5} ${y5}`,
    `C ${x5 + (x6 - x5) / 48}, ${y5 + (y6 - y5) / 5.03}, ${
      x5 + (x6 - x5) / 2
    }, ${y5 + (y6 - y5) / 1.25}, ${x6} ${y6}`,
    `C ${x6 + (x7 - x6) / (41 / 11)}, ${y6 + (y7 - y6) / (20 / 7)}, ${
      x6 + (x7 - x6) / (41 / 29)
    }, ${y6 + (y7 - y6) / (5 / 4)}, ${x7} ${y7}`,
    `Q ${x7 + (x46 - x7) / 2}, ${y46}, ${x46} ${y46}`,
    `z`,
  ].join(" ");
}
export function generateBackLeftVestPath(
  x3: number,
  x7: number,
  x03: number,
  y03: number,
  x04: number,
  y04: number,
  x05: number,
  y05: number,
  x06: number,
  y06: number,
  x07: number,
  y07: number,
  escala: number
): string {
  const x45 = x03 + (x3 - x03) / 2,
    y45 = y03 + 4 * escala;
  const x46 = x07 + (x7 - x07) / 2,
    y46 = y07 + escala;
  return [
    `M  ${x45} ${y45}`,
    `Q ${x03 + (x45 - x03) / 2}, ${y45}, ${x03} ${y03}`,
    `C ${x03}, ${y03 + (y04 - y03) / (5 / 2)}, ${
      x03 + (x04 - x03) / (13 / 20)
    }, ${y03 + (y04 - y03) / (7 / 5)}, ${x04} ${y04}`,
    `C ${x04 + (x05 - x04) / (15 / 2)}, ${y04 + (y05 - y04) / (20 / 9)}, ${
      x04 + (x05 - x04) / 2
    }, ${y04 + (y05 - y04) / (5 / 4)}, ${x05} ${y05}`,
    `C ${x05 + (x06 - x05) / 48}, ${y05 + (y06 - y05) / 5.03}, ${
      x05 + (x06 - x05) / 2
    }, ${y05 + (y06 - y05) / 1.25}, ${x06} ${y06}`,
    `C ${x06 + (x07 - x06) / 14}, ${y06 + (y07 - y06) / (24 / 7)}, ${
      x06 + (x07 - x06) / (7 / 4)
    }, ${y06 + (y07 - y06) / 2}, ${x07} ${y07}`,
    `Q ${x07 + (x46 - x07) / 2}, ${y46}, ${x46} ${y46}`,
    `z`,
  ].join(" ");
}
