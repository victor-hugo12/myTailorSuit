import { generateLeftVestPath, generateRightVestPath } from "./MainBodyPaths";
import {
  generateNotchLapelLeftPath,
  generateNotchLapelRightPath,
  generatePeakLapelLeftPath,
  generatePeakLapelRightPath,
  generateShawlLapelLeftPath,
  generateShawlLapelRightPath,
} from "./NeckPaths";
import { generateInterior2Path } from "./interior";
import {
  generatePocketLeftPath,
  generatePocketPatchLeftPath,
  generatePocketPatchRightPath,
  generatePocketRightPath,
  generatePocketWeltLeftPath,
  generatePocketWeltRightPath,
} from "./PocketsPaths";
import {
  generatePocketTopPath,
  generatePocketWeltTopPath,
} from "./PocketTopPaths";
import {
  generateBackLeftVestPath,
  generateBackRigthVestPath,
} from "./mainBackBodyPath";
import { generateBucklePath } from "./bucklePath";
import { generateBackBeltPath } from "./backBeltPaTh";
import { ellipseAxes } from "@/components/mathUtils";

interface VestMeasurements {
  vestLength: number;
  chest: number;
  waist: number;
  shoulderWidth: number;
}

export function getVestPaths(
  measurements: VestMeasurements,
  selectedOptions: any
) {
  const { vestLength, chest, waist, shoulderWidth } = measurements;
  const dchest = ellipseAxes(2 * chest);
  const dwaist = ellipseAxes(2 * waist);

  const lapelStyleId = selectedOptions["Lapel"];
  const buttonsId = selectedOptions["Buttons"];
  const lowerPocketId = selectedOptions["Lower Pockets"];
  const upperPocketId = selectedOptions["Upper Pocket"];

  let lengthVest: number;
  if (vestLength > 55) {
    lengthVest = 25;
  } else {
    const dif = Math.floor((55 - vestLength) / 2);
    lengthVest = 25 - dif;
  }

  let lengthWaist: number;
  if (vestLength < 30) {
    lengthWaist = 0;
  } else if (vestLength < 40) {
    lengthWaist = vestLength - 30;
  } else {
    lengthWaist = 10;
  }

  const x0 = 250,
    y0 = 305;
  const escala = 6;
  const x1 = x0,
    y1 = y0 + escala * lengthVest;
  const x2 = x1 + escala * 8,
    y2 = y1 + escala * lengthWaist;
  const x3 = x0 + escala * dchest - escala,
    y3 = y2 - 7 * escala;
  const x5 = x0 + escala * dchest + escala,
    y5 = y2 - escala * (vestLength - vestLength / 2.6);
  const x4 = x0 + escala * dwaist + escala,
    y4 = y5 + (y3 - y5) / 2;
  const x6 = x0 + escala * (shoulderWidth / 2) + escala,
    y6 = y2 - escala * vestLength + escala * 6;
  const x7 = x0 + escala * (shoulderWidth / 4),
    y7 = y2 - escala * vestLength;
  const y8 = y6 + 0.5 * escala;
  const y9 = y7 + 0.5 * escala;

  const x00 = x0 + 4 * escala,
    y00 = y0;
  const x01 = x00,
    y01 = y1;
  const x02 = x01 - 8 * escala,
    y02 = y2;
  const x03 = x00 - escala * dchest - escala,
    y03 = y3;
  const x05 = x00 - escala * dchest - 3 * escala,
    y05 = y5;
  const x04 = x00 - escala * dwaist - 3 * escala,
    y04 = y4;
  const x06 = x00 - escala * (shoulderWidth / 2) - 3 * escala,
    y06 = y6;
  const x07 = x00 - escala * (shoulderWidth / 4) - escala,
    y07 = y7;
  const y08 = y06 + 0.5 * escala;
  const y09 = y07 + 0.5 * escala;

  let botones = 4;
  let breasted = false;
  let pechoX0 = x0;
  let pechoX1 = x1;
  let pechoX00 = x00;
  let pechoX01 = x01;
  switch (buttonsId) {
    case 201:
      botones = 2;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 202:
      botones = 3;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 203:
      botones = 4;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 204:
      botones = 5;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 205:
      botones = 2;
      breasted = true;
      pechoX0 = x0 - 3 * escala;
      pechoX1 = x1 - 3 * escala;
      pechoX00 = x00 + 3 * escala;
      pechoX01 = x01 + 3 * escala;
      break;
    case 206:
      botones = 3;
      breasted = true;
      pechoX0 = x0 - 3 * escala;
      pechoX1 = x1 - 3 * escala;
      pechoX00 = x00 + 3 * escala;
      pechoX01 = x01 + 3 * escala;
      break;
  }

  const x50 = pechoX1 + 2 * escala,
    y50 = y0 + escala;
  const y51 = y1 - 3 * escala;
  let separacion = (y51 - y50) / (botones - 1);
  const longitud = escala * 1.5;

  if (botones < 3) separacion = ((3 / 2) * (y51 - y50)) / botones;

  const generarOjales = (offsetX = 0) =>
    Array.from({ length: botones }, (_, i) => {
      const y = y50 + i * separacion;
      const x = x50 + offsetX + (i * escala) / 8;
      return { x, y };
    });

  const ojalesPrincipales = generarOjales();
  const ojalesSecundarios = breasted ? generarOjales(4 * escala) : [];

  const OJALES_COORDS = [...ojalesPrincipales, ...ojalesSecundarios];
  const OJALES = OJALES_COORDS.map(
    ({ x, y }) => `M${x} ${y} H${x + longitud}`
  ).join(" ");
  const PECHODERECHO = generateRightVestPath(
    pechoX0,
    y0,
    pechoX1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    x5,
    y5,
    x6,
    y8,
    x7,
    y9
  );

  const PECHOIZQUIERDO = generateLeftVestPath(
    pechoX00,
    y00,
    pechoX01,
    y01,
    x02,
    y02,
    x03,
    y03,
    x04,
    y04,
    x05,
    y05,
    x06,
    y08,
    x07,
    y09
  );

  let CUELLOIZQUIERDOARRIBA,
    CUELLOIZQUIERDOABAJO,
    CUELLODERECHOARRIBA,
    CUELLODERECHOABAJO;

  switch (lapelStyleId) {
    case 210:
      CUELLOIZQUIERDOARRIBA = "";
      CUELLOIZQUIERDOABAJO = "";
      CUELLODERECHOARRIBA = "";
      CUELLODERECHOABAJO = "";
      break;
    case 211:
      ({
        zolapaUpPath: CUELLOIZQUIERDOARRIBA,
        zolapaDownPath: CUELLOIZQUIERDOABAJO,
      } = generateNotchLapelLeftPath(
        pechoX00,
        y00,
        x06,
        y06,
        x07,
        y07,
        escala
      ));
      ({
        zolapaUpPath: CUELLODERECHOARRIBA,
        zolapaDownPath: CUELLODERECHOABAJO,
      } = generateNotchLapelRightPath(pechoX0, y0, x6, y6, x7, y7, escala));
      break;
    case 212:
      ({
        zolapaUpPath: CUELLOIZQUIERDOARRIBA,
        zolapaDownPath: CUELLOIZQUIERDOABAJO,
      } = generatePeakLapelLeftPath(pechoX00, y00, x06, y06, x07, y07, escala));
      ({
        zolapaUpPath: CUELLODERECHOARRIBA,
        zolapaDownPath: CUELLODERECHOABAJO,
      } = generatePeakLapelRightPath(pechoX0, y0, x6, y6, x7, y7, escala));
      break;
    case 213:
      ({
        zolapaUpPath: CUELLOIZQUIERDOARRIBA,
        zolapaDownPath: CUELLOIZQUIERDOABAJO,
      } = generateShawlLapelLeftPath(
        pechoX00,
        y00,
        x06,
        y06,
        x07,
        y07,
        escala
      ));
      ({
        zolapaUpPath: CUELLODERECHOARRIBA,
        zolapaDownPath: CUELLODERECHOABAJO,
      } = generateShawlLapelRightPath(pechoX0, y0, x6, y6, x7, y7, escala));
      break;
  }

  const INTERIOR = generateInterior2Path(
    pechoX0,
    y0,
    pechoX1,
    y1,
    x2,
    y2,
    pechoX00,
    y00,
    x02,
    y02,
    x7,
    y7,
    x07,
    y07,
    escala
  );
  let BOLSILLODERECHO, BOLSILLOIZQUIERDO, BOLSILLOSUPERIOR;
  switch (lowerPocketId) {
    case 220:
      BOLSILLODERECHO = generatePocketRightPath(x0, x3, y3, x4, y4, escala);
      BOLSILLOIZQUIERDO = generatePocketLeftPath(
        x00,
        x03,
        y03,
        x04,
        y04,
        escala
      );
      break;
    case 221:
      BOLSILLODERECHO = generatePocketWeltRightPath(x0, x3, y3, x4, y4, escala);
      BOLSILLOIZQUIERDO = generatePocketWeltLeftPath(
        x00,
        x03,
        y03,
        x04,
        y04,
        escala
      );
      break;
    case 222:
      BOLSILLODERECHO = generatePocketPatchRightPath(
        x0,
        x3,
        y3,
        x4,
        y4,
        escala
      );
      BOLSILLOIZQUIERDO = generatePocketPatchLeftPath(
        x00,
        x03,
        y03,
        x04,
        y04,
        escala
      );
      break;
  }
  switch (upperPocketId) {
    case 230:
      BOLSILLOSUPERIOR = generatePocketTopPath(
        x0,
        y0,
        x5,
        y5,
        x6,
        y6,
        x7,
        y7,
        escala
      );
      break;
    case 231:
      BOLSILLOSUPERIOR = generatePocketWeltTopPath(
        x0,
        y0,
        x5,
        y5,
        x6,
        y6,
        x7,
        y7,
        escala
      );
      break;
    case 232:
      BOLSILLOSUPERIOR = "";
      break;
  }

  const ESPALDADERECHA = generateBackRigthVestPath(
    x03,
    y03,
    x07,
    y07,
    x3,
    y3,
    x4,
    y4,
    x5,
    y5,
    x6,
    y6,
    x7,
    y7,
    escala
  );
  const ESPALDAIZQUIERDA = generateBackLeftVestPath(
    x3,
    x7,
    x03,
    y03,
    x04,
    y04,
    x05,
    y05,
    x06,
    y06,
    x07,
    y07,
    escala
  );
  const HEBILLA = generateBucklePath(x4, y4, x04, escala);

  const { backBelt1: BACKBELT1, backBelt2: BACKBELT2 } = generateBackBeltPath(
    x3,
    y3,
    x4,
    y4,
    x03,
    y03,
    x04,
    y04,
    escala
  );

  return {
    PECHODERECHO,
    PECHOIZQUIERDO,
    CUELLOIZQUIERDOARRIBA,
    CUELLOIZQUIERDOABAJO,
    CUELLODERECHOARRIBA,
    CUELLODERECHOABAJO,
    INTERIOR,
    OJALES,
    BOLSILLODERECHO,
    BOLSILLOIZQUIERDO,
    BOLSILLOSUPERIOR,
    ESPALDADERECHA,
    ESPALDAIZQUIERDA,
    HEBILLA,
    BACKBELT1,
    BACKBELT2,
    OJALES_COORDS,
  };
}
