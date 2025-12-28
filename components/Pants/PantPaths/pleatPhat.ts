import { getPointAtX } from "components/mathUtils";

export function generatePleatLeftPath(
  x2: number,
  y2: number,
  x4: number,
  y4: number,
  y6: number,
  escala: number,
  pliegues: number
): string {
  if (pliegues <= 0) return "";
  const yBase = y6 - 4 * escala;
  const xBase = x2 + (x4 - x2) / 2;
  const espacio = (xBase - x4) / (pliegues + 1);
  let path = "";
  for (let i = 0; i < pliegues; i++) {
    const xPico = xBase - i * espacio;
    const xIzq = xPico - 0.5 * escala;
    const xDer = xPico + 0.5 * escala;

    const puntoCurva = getPointAtX(
      xPico,
      x2,
      y2,
      x2 + (x4 - x2) / 3,
      y2 + (y4 - y2) / 4,
      x2 + (x4 - x2) / (5 / 3),
      y2 + (y4 - y2) / 2,
      x4,
      y4
    );

    path +=
      [
        `M ${xDer} ${yBase}`,
        `C ${xDer - escala}, ${yBase + (puntoCurva.y - yBase) / 4}, ${
          xDer - 2 * escala
        },${yBase + (puntoCurva.y - yBase) / (11 / 8)}, ${puntoCurva.x} ${
          puntoCurva.y
        }`,
        `C ${puntoCurva.x - 2 * escala}, ${
          puntoCurva.y + (yBase - puntoCurva.y) / (11 / 2)
        }, ${puntoCurva.x - 2 * escala},${
          puntoCurva.y + (yBase - puntoCurva.y) / (4 / 3)
        }, ${xIzq} ${yBase}`,
      ].join(" ") + " ";
  }

  return path.trim();
}

export function generatePleatRightPath(
  x2: number,
  y2: number,
  x02: number,
  y02: number,
  y04: number,
  width: number,
  pliegues: number
): string {
  if (pliegues <= 0) return "";
  const yBase = y04 - 4 * width;

  const xBase = x2 + (x02 - x2) / 2;

  const espacio = (xBase - x02) / (pliegues + 1);

  let path = "";

  for (let i = 0; i < pliegues; i++) {
    const xPico = xBase - i * espacio;
    const xIzq = xPico - 0.5 * width;
    const xDer = xPico + 0.5 * width;

    const puntoCurva = getPointAtX(
      xPico,
      x2,
      y2,
      x02 + (x2 - x02) / (11 / 8),
      y02 + (y2 - y02) / (4 / 3),
      x02 + (x2 - x02) / (11 / 5),
      y02 + (y2 - y02) / 2,
      x02,
      y02
    );
    path +=
      [
        `M ${xDer} ${yBase}`,
        `C ${xDer + 2 * width}, ${yBase + (puntoCurva.y - yBase) / 4}, ${
          xDer + 2 * width
        },${yBase + (puntoCurva.y - yBase) / (11 / 8)}, ${puntoCurva.x} ${
          puntoCurva.y
        }`,
        `C ${puntoCurva.x + width}, ${
          puntoCurva.y + (yBase - puntoCurva.y) / (11 / 2)
        }, ${puntoCurva.x + 2 * width},${
          puntoCurva.y + (yBase - puntoCurva.y) / (4 / 3)
        }, ${xIzq} ${yBase}`,
      ].join(" ") + " ";
  }

  return path.trim();
}
