// src/utils/sacoPaths.ts

import { generateArmLeftPath, generateArmRightPath } from "./armPaths";
import { generateInterior2Path } from "./interior";
import { generateLeftCoatPath, generateRightCoatPath } from "./MainBodyPaths";
import {
  generateNotchLapelLeftPath,
  generateNotchLapelRightPath,
  generatePeakLapelLeftPath,
  generatePeakLapelMedPath,
  generatePeakLapelRightPath,
  generateShawlLapelLeftPath,
  generateShawlLapelRightPath,
} from "./NeckPaths";
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
  generateBackLeftCoatPath,
  generateBackRightCoatPath,
} from "./mainBackBodyPath";
import {
  generateDoubleVentLeftPath,
  generateDoubleVentRightPath,
  generateSingleVentLeftPath,
  generateSingleVentRightPath,
  generateVentLeftPath,
  generateVentRightPath,
} from "./ventPaths";
import { ellipseAxes } from "@/components/mathUtils";

interface SacoMeasurements {
  coatLength: number;
  chest: number;
  waist: number;
  sleeveLength: number;
  shoulder: number;
}

export function getSacoPaths(
  measurements: SacoMeasurements,
  selectedOptions: any
) {
  const { coatLength, chest, waist, sleeveLength, shoulder } = measurements;
  const lapelStyleId = selectedOptions["Lapel"];
  const buttonsId = selectedOptions["Buttons"];
  const lowerPocketId = selectedOptions["Lower Pockets"];
  const upperPocketId = selectedOptions["Upper Pocket"];
  const ventsId = selectedOptions["Back Vents"];

  const dchest = ellipseAxes(2 * chest);
  const dwaist = ellipseAxes(2 * waist);
  const escala = 6;
  const x0 = 250,
    y0 = 300;
  let lenghtChest: number;
  if (coatLength > 55) {
    lenghtChest = 25;
  } else {
    const dif = Math.floor((55 - coatLength) / 2);
    lenghtChest = 25 - dif;
  }
  let lenghtWaist: number;

  if (coatLength < 30) {
    lenghtWaist = 0;
  } else if (coatLength < 40) {
    lenghtWaist = coatLength - 30;
  } else {
    lenghtWaist = 10;
  }

  const x1 = x0 + escala,
    y1 = y0 + escala * lenghtChest;
  const x2 = x1 + escala * 8,
    y2 = y1 + escala * lenghtWaist;
  const x3 = x0 + escala * dchest + 3 * escala,
    y3 = y2 - escala;
  const x5 = x0 + escala * dchest + 2 * escala,
    y5 = y3 - escala * (coatLength - coatLength / 2.4);
  const x4 = x0 + escala * dwaist + 2 * escala,
    y4 = y5 + (y3 - y5) / 4;
  const x6 = x0 + escala * (shoulder / 2) + 2 * escala,
    y6 = y3 - escala * coatLength + escala * 5;
  const x7 = x0 + escala * (shoulder / 5),
    y7 = y3 - escala * coatLength;

  const x00 = x0 + 4 * escala,
    y00 = 310;
  const x01 = x00,
    y01 = y1;
  const x02 = x01 - 7 * escala,
    y02 = y3 + escala / 2;
  const x03 = x00 - escala * dchest - 4 * escala,
    y03 = y02 - escala;
  const x05 = x00 - escala * dchest - escala,
    y05 = y03 - escala * (coatLength - coatLength / 2.4);
  const x04 = x00 - escala * dwaist - escala,
    y04 = y05 + (y03 - y05) / 4;
  const x06 = x00 - escala * (shoulder / 2) - escala,
    y06 = y03 - escala * coatLength + escala * 6;
  const x07 = x00 - escala * (shoulder / 5),
    y07 = y03 - escala * coatLength;

  let pechoX0 = x0;
  let pechoX1 = x1;
  let pechoX00 = x00;
  let pechoX01 = x01;

  let botones = 4;
  let breasted = false;

  switch (buttonsId) {
    case 101:
      botones = 2;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 102:
      botones = 3;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 103:
      botones = 4;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 104:
      botones = 5;
      breasted = false;
      pechoX0 = x0;
      pechoX1 = x1;
      pechoX00 = x00;
      pechoX01 = x01;
      break;
    case 105:
      botones = 2;
      breasted = true;
      pechoX0 = x0 - 3 * escala;
      pechoX1 = x1 - 3 * escala;
      pechoX00 = x00 + 3 * escala;
      pechoX01 = x01 + 3 * escala;
      break;
    case 106:
      botones = 3;
      breasted = true;
      pechoX0 = x0 - 3 * escala;
      pechoX1 = x1 - 3 * escala;
      pechoX00 = x00 + 3 * escala;
      pechoX01 = x01 + 3 * escala;
      break;
  }
  const x50 = pechoX0 + 2 * escala;
  const y50 = y0 + escala;
  const y51 = y1 - 3 * escala;
  let separacion = (y51 - y50) / (botones - 1);
  const longitud = escala * 1.5;

  if (botones < 3) {
    separacion = ((3 / 2) * (y51 - y50)) / botones;
  }

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

  const PECHODERECHO = generateRightCoatPath(
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
    y6,
    x7,
    y7
  );
  const PECHOIZQUIERDO = generateLeftCoatPath(
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
    y06,
    x07,
    y07
  );
  const x11 = x03 - escala,
    y11 = y06 + escala * sleeveLength - escala;
  const x10 = x11 - 8 * escala,
    y10 = y06 + escala * sleeveLength;
  const BRAZOIZQUIERDO = generateArmLeftPath(
    x05,
    y05,
    x06,
    y06,
    x10,
    y10,
    x11,
    y11
  );

  const x21 = x3 + (3 / 2) * escala,
    y21 = y6 + escala * sleeveLength - escala;
  const x20 = x21 + 8 * escala,
    y20 = y6 + escala * sleeveLength;
  const BRAZODERECHO = generateArmRightPath(x5, y5, x6, y6, x20, y20, x21, y21);
  let CUELLOIZQUIERDOARRIBA,
    CUELLOIZQUIERDOABAJO,
    CUELLODERECHOARRIBA,
    CUELLODERECHOABAJO;
  switch (lapelStyleId) {
    case 110:
      ({
        zolapaUpPath: CUELLOIZQUIERDOARRIBA,
        zolapaDownPath: CUELLOIZQUIERDOABAJO,
      } = generateNotchLapelLeftPath(pechoX00, y00, x07, y07, escala));
      ({
        zolapaUpPath: CUELLODERECHOARRIBA,
        zolapaDownPath: CUELLODERECHOABAJO,
      } = generateNotchLapelRightPath(pechoX0, y0, x7, y7, escala));
      break;
    case 111:
      ({
        zolapaUpPath: CUELLOIZQUIERDOARRIBA,
        zolapaDownPath: CUELLOIZQUIERDOABAJO,
      } = generatePeakLapelLeftPath(pechoX00, y00, x07, y07, escala));
      ({
        zolapaUpPath: CUELLODERECHOARRIBA,
        zolapaDownPath: CUELLODERECHOABAJO,
      } = generatePeakLapelRightPath(pechoX0, y0, x7, y7, escala));
      break;
    case 112:
      ({
        zolapaUpPath: CUELLOIZQUIERDOARRIBA,
        zolapaDownPath: CUELLOIZQUIERDOABAJO,
      } = generateShawlLapelLeftPath(pechoX00, y00, x07, y07, escala));
      ({
        zolapaUpPath: CUELLODERECHOARRIBA,
        zolapaDownPath: CUELLODERECHOABAJO,
      } = generateShawlLapelRightPath(pechoX0, y0, x7, y7, escala));
      break;
  }
  const CUELLOMEDIO = generatePeakLapelMedPath(x7, y7, x07, y07, escala);
  const INTERIOR = generateInterior2Path(
    x0,
    y0,
    x2,
    y2,
    x7,
    y7,
    x00,
    y00,
    x02,
    y02,
    x07,
    y07,
    escala
  );
  let BOLSILLODERECHO, BOLSILLOIZQUIERDO, BOLSILLOSUPERIOR;
  switch (lowerPocketId) {
    case 120:
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
    case 121:
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
    case 122:
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
    case 130:
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
    case 131:
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
    case 132:
      BOLSILLOSUPERIOR = "";
      break;
  }

  const ESPALDADER = generateBackRightCoatPath(
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
    x07,
    y07
  );
  const ESPALDAIZQ = generateBackLeftCoatPath(
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
    x7,
    y7
  );
  let ABERTURADERECHA, ABERTURAIZQUIERDA;
  switch (ventsId) {
    case 140:
      ABERTURAIZQUIERDA = generateVentLeftPath(x3, y3, x03, y03, escala);
      ABERTURADERECHA = generateVentRightPath(x3, y3, x03, escala);
      break;
    case 141:
      ABERTURAIZQUIERDA = generateSingleVentLeftPath(
        x3,
        y3,
        y4,
        x03,
        y03,
        escala
      );
      ABERTURADERECHA = generateSingleVentRightPath(
        x3,
        y3,
        y4,
        x03,
        y03,
        escala
      );
      break;
    case 142:
      ABERTURAIZQUIERDA = generateDoubleVentLeftPath(
        x3,
        y3,
        x03,
        y03,
        x04,
        y04,
        escala
      );
      ABERTURADERECHA = generateDoubleVentRightPath(
        x03,
        x3,
        y3,
        x4,
        y4,
        escala
      );
      break;
  }

  const ESPALDADERECHA = `${ABERTURADERECHA} ${ESPALDADER} `;
  const ESPALDAIZQUIERDA = `${ABERTURAIZQUIERDA} ${ESPALDAIZQ} `;

  return {
    PECHODERECHO,
    PECHOIZQUIERDO,
    BRAZOIZQUIERDO,
    BRAZODERECHO,
    CUELLOIZQUIERDOARRIBA,
    CUELLOIZQUIERDOABAJO,
    CUELLODERECHOARRIBA,
    CUELLODERECHOABAJO,
    CUELLOMEDIO,
    INTERIOR,
    OJALES,
    OJALES_COORDS,
    BOLSILLODERECHO,
    BOLSILLOIZQUIERDO,
    BOLSILLOSUPERIOR,
    ESPALDADERECHA,
    ESPALDAIZQUIERDA,
  };
}
