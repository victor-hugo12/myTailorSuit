export function generateBucklePath(
  x4: number,
  y4: number,
  x04: number,
  escala: number
): string {
  const x60 = x4 + (x04 - x4) / 2,
    y60 = y4;
  const x61 = x60 + 2 * escala,
    y61 = y4;
  const x62 = x61,
    y62 = y4 + 2 * escala;
  const x63 = x62 - 2 * escala,
    y63 = y62;
  return [
    `M ${x60} ${y60}`,
    `C ${x60}, ${y60}, ${x61}, ${y61}, ${x61} ${y61}`,
    `Q ${x61 + escala / 2}, ${y61 + (y62 - y61) / 2}, ${x62} ${y62}`,
    `C ${x62}, ${y62}, ${x63}, ${y63}, ${x63} ${y63}`,
    `Q ${x63 - escala / 2}, ${y63 + (y60 - y63) / 2}, ${x60} ${y60}`,
    `M ${x60 + escala / 4} ${y60 + escala / 4}`,
    `C ${x60 + escala / 4}, ${y60 + escala / 4}, ${x61 - escala / 4}, ${
      y61 + escala / 4
    }, ${x61 - escala / 4} ${y61 + escala / 4}`,
    `C ${x61 - escala / 4}, ${y61 + escala / 4}, ${x62 - escala / 4}, ${
      y62 - escala / 4
    }, ${x62 - escala / 4} ${y62 - escala / 4}`,
    `C ${x62 - escala / 4}, ${y62 - escala / 4}, ${x63 + escala / 4}, ${
      y63 - escala / 4
    }, ${x63 + escala / 4} ${y63 - escala / 4}`,
    `C ${x63 + escala / 4}, ${y63 - escala / 4}, ${x60 + escala / 4}, ${
      y60 + escala / 4
    }, ${x60 + escala / 4} ${y60 + escala / 4}`,
  ].join(" ");
}
