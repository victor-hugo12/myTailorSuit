export function ellipseAxes(perimeter: number) {
  const factor = Math.PI * (9 - Math.sqrt(35));
  const b = perimeter / factor;
  const a = 2 * b;
  return a;
}
export function pointAtFraction(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  fraction: number
) {
  const x = x1 + (x2 - x1) * fraction;
  const y = y1 + (y2 - y1) * fraction;
  return { x, y };
}

export function getPointAtY(
  yTarget: number,
  x0: number,
  y0: number,
  cx1: number,
  cy1: number,
  cx2: number,
  cy2: number,
  x1: number,
  y1: number
): { x: number; y: number } {
  function cubicBezierPoint(t: number) {
    const mt = 1 - t;
    const x =
      mt ** 3 * x0 +
      3 * mt ** 2 * t * cx1 +
      3 * mt * t ** 2 * cx2 +
      t ** 3 * x1;
    const y =
      mt ** 3 * y0 +
      3 * mt ** 2 * t * cy1 +
      3 * mt * t ** 2 * cy2 +
      t ** 3 * y1;
    return { x, y };
  }
  let t0 = 0;
  let t1 = 1;
  let mid = 0;
  const tolerance = 0.01;

  const isDescending = y1 < y0;

  for (let i = 0; i < 30; i++) {
    mid = (t0 + t1) / 2;
    const { y } = cubicBezierPoint(mid);
    if (Math.abs(y - yTarget) < tolerance) break;

    if (isDescending) {
      if (y < yTarget) t1 = mid;
      else t0 = mid;
    } else {
      if (y > yTarget) t1 = mid;
      else t0 = mid;
    }
  }
  return cubicBezierPoint(mid);
}
export function getPointAtX(
  xTarget: number,
  x0: number,
  y0: number,
  cx1: number,
  cy1: number,
  cx2: number,
  cy2: number,
  x1: number,
  y1: number
): { x: number; y: number } {
  function cubicBezierPoint(t: number) {
    const mt = 1 - t;
    const x =
      mt ** 3 * x0 +
      3 * mt ** 2 * t * cx1 +
      3 * mt * t ** 2 * cx2 +
      t ** 3 * x1;
    const y =
      mt ** 3 * y0 +
      3 * mt ** 2 * t * cy1 +
      3 * mt * t ** 2 * cy2 +
      t ** 3 * y1;
    return { x, y };
  }

  let t0 = 0;
  let t1 = 1;
  let mid = 0;
  const tolerance = 0.01;

  const isDescending = x1 < x0;

  for (let i = 0; i < 30; i++) {
    mid = (t0 + t1) / 2;
    const { x } = cubicBezierPoint(mid);
    if (Math.abs(x - xTarget) < tolerance) break;

    if (isDescending) {
      if (x < xTarget) t1 = mid;
      else t0 = mid;
    } else {
      if (x > xTarget) t1 = mid;
      else t0 = mid;
    }
  }

  return cubicBezierPoint(mid);
}
export function getPointBelowYOnCurve(
  yStart: number, // y del punto de referencia (no necesariamente en la curva)
  yTarget: number, // distancia vertical hacia abajo
  x0: number,
  y0: number,
  cx1: number,
  cy1: number,
  cx2: number,
  cy2: number,
  x1: number,
  y1: number
): { x: number; y: number } {
  const desiredY = yStart + yTarget; // buscamos este valor en la curva

  // Función que calcula el punto en la curva cúbica de Bézier para un parámetro t
  function cubicBezierPoint(t: number) {
    const mt = 1 - t;
    const x =
      mt ** 3 * x0 +
      3 * mt ** 2 * t * cx1 +
      3 * mt * t ** 2 * cx2 +
      t ** 3 * x1;
    const y =
      mt ** 3 * y0 +
      3 * mt ** 2 * t * cy1 +
      3 * mt * t ** 2 * cy2 +
      t ** 3 * y1;
    return { x, y };
  }

  // Búsqueda binaria del parámetro t cuyo punto y esté cerca de desiredY
  let t0 = 0;
  let t1 = 1;
  let mid = 0;
  const tolerance = 0.01;

  // Determinamos si la curva sube o baja globalmente
  const isDescending = y1 < y0;

  for (let i = 0; i < 40; i++) {
    mid = (t0 + t1) / 2;
    const { y } = cubicBezierPoint(mid);

    if (Math.abs(y - desiredY) < tolerance) break;

    if (isDescending) {
      // si la curva va de abajo hacia arriba (en SVG), invertimos la lógica
      if (y < desiredY) t1 = mid;
      else t0 = mid;
    } else {
      if (y > desiredY) t1 = mid;
      else t0 = mid;
    }
  }

  return cubicBezierPoint(mid);
}
export function getSplitBezierC(
  t: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): [string, string] {
  const x01 = x0 + (x1 - x0) * t;
  const y01 = y0 + (y1 - y0) * t;
  const x12 = x1 + (x2 - x1) * t;
  const y12 = y1 + (y2 - y1) * t;
  const x23 = x2 + (x3 - x2) * t;
  const y23 = y2 + (y3 - y2) * t;

  const x012 = x01 + (x12 - x01) * t;
  const y012 = y01 + (y12 - y01) * t;
  const x123 = x12 + (x23 - x12) * t;
  const y123 = y12 + (y23 - y12) * t;

  const x0123 = x012 + (x123 - x012) * t;
  const y0123 = y012 + (y123 - y012) * t;

  const curve1 = `C ${x01} ${y01}, ${x012} ${y012}, ${x0123} ${y0123}`;

  const curve2 = `M ${x0123} ${y0123} C ${x123} ${y123}, ${x23} ${y23}, ${x3} ${y3}`;

  return [curve1, curve2];
}
