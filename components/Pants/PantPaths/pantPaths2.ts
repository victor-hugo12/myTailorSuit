import { ellipseAxes } from "components/mathUtils";
import {
  generateLegLeftPath,
  generateLegLeftPath2,
  generateLegRightPath,
  generateLegRightPath2,
} from "./legPath";
import { generateMedLeftTopPath, generateMedRightTopPath } from "./medPaths";
import {
  generatePocketBackFlapButtonLeftPath,
  generatePocketBackFlapButtonRightPath,
  generatePocketBackPatchButtonLeftPath,
  generatePocketBackPatchButtonRightPath,
  generatePocketBackWeltLeftPath,
  generatePocketBackWeltRighttPath,
} from "./pocketBackPath";

import { generateZipperPath } from "./zipperPaths";
import {
  generatePocketAmericanLeftPath,
  generatePocketAmericanRightPath,
  generatePocketJeansLeftPath,
  generatePocketJeansRightPath,
  generatePocketLeftPath,
  generatePocketRightPath,
} from "./pocketPath";
import { generateButtonPath, generateExtendedButtonPath } from "./flyPath";
import { generatePleatLeftPath, generatePleatRightPath } from "./pleatPhat";
import {
  generateWaistExtendedRightPath,
  generateWaistLeftPath,
  generateWaistRightPath,
} from "./waistPaths";
import {
  generateWaistBackLeftPath,
  generateWaistBackRightPath,
} from "./waistBackPath";

type PantMeasurements = {
  waist: number;
  thigh: number;
  length: number;
  inseam: number;
  knee: number;
  boot: number;
};
export function getPantPaths(
  measurements: PantMeasurements,
  selectedOptions: any
) {
  const { waist, thigh, length, inseam, knee, boot } = measurements;
  const backPocketsId = selectedOptions["Back Pockets"];
  const pleatId = selectedOptions["Pleats"];
  const frontPocketId = selectedOptions["Front Pockets"];
  const flyId = selectedOptions["Fly Type"];

  const dthigh = (2 * thigh) / Math.PI;
  const dwaist = ellipseAxes(2 * waist);
  const size = length - inseam;
  const width = 4;
  const x0 = 250,
    y0 = 200;
  const x2 = x0 - width,
    y2 = y0 - width * size;
  const reducirCierre = y0 - y2 - 4 * width > 18 * width;
  const largoCierre = reducirCierre ? 18 : (y0 - y2 - 4 * width) / 4;
  const x1 = x2,
    y1 = y0 - width * (size - largoCierre);
  const x4 = x2 - width * dwaist,
    y4 = y2 - 2 * width;

  const x6 = x0 - width * dthigh - width,
    y6 = y0;
  const x5 = (x4 + x6) / 2 - 1.5 * width,
    y5 = (y4 + y6) / 2;

  const PIERNASUPERIORIZQUIERDA = [
    `M ${x0} ${y0}`,
    `C ${x0 + (x1 - x0) / 4}, ${y0 + (y1 - y0) / (12 / 5)}, ${
      x0 + (x1 - x0) / 2
    },${y0 + (y1 - y0) / (3 / 2)}, ${x1} ${y1}`,
    `C ${x1}, ${y1}, ${x2},${y2}, ${x2} ${y2}`,
    `C ${x2 + (x4 - x2) / 3}, ${y2 + (y4 - y2) / 4}, ${
      x2 + (x4 - x2) / (5 / 3)
    },${y2 + (y4 - y2) / 2}, ${x4} ${y4}`,
    `C ${x4 + (x5 - x4) / (7 / 3)}, ${y4 + (y5 - y4) / 4}, ${
      x4 + (x5 - x4) / (7 / 6)
    },${y4 + (y5 - y4) / (13 / 8)}, ${x5} ${y5}`,
    `C ${x5 + (x6 - x5) / 6}, ${y5 + (y6 - y5) / (13 / 6)}, ${
      x5 + (x6 - x5) / 2
    },${y5 + (y6 - y5) / (13 / 9)}, ${x6} ${y6}`,
  ].join(" ");
  const x00 = x0 - width,
    y00 = y0;
  const x02 = x2 + width * dwaist,
    y02 = y2 - 2 * width;
  const x04 = x00 + width * dthigh + 2.5 * width,
    y04 = y00;
  const x03 = (x02 + x04) / 2 + width,
    y03 = (y02 + y04) / 2;
  const PIERNASUPERIORDERECHA = [
    `M ${x00} ${y00}`,
    `C ${x00 + (x1 - x00) / 2}, ${y00 + (y1 - y00) / 4}, ${
      x00 + (x1 - x00) / 2
    },${y00 + (y1 - y00) / 2}, ${x1} ${y1}`,
    `C ${x1}, ${y1}, ${x2},${y2}, ${x2} ${y2}`,
    `C ${x02 + (x2 - x02) / (11 / 8)}, ${y02 + (y2 - y02) / (4 / 3)}, ${
      x02 + (x2 - x02) / (11 / 5)
    },${y02 + (y2 - y02) / 2}, ${x02} ${y02}`,
    `C ${x02 + (x03 - x02) / 5}, ${y02 + (y03 - y02) / (26 / 7)}, ${
      x02 + (x03 - x02) / (5 / 3)
    },${y02 + (y03 - y02) / (13 / 8)}, ${x03} ${y03}`,
    `C ${x03 + (x04 - x03) / 2}, ${y03 + (y04 - y03) / (13 / 5)}, ${
      x03 + (x04 - x03) / 2
    },${y03 + (y04 - y03) / (13 / 9)}, ${x04} ${y04}`,
  ].join(" ");
  const dknee = (2 * knee) / Math.PI;
  const dboot = (2 * boot) / Math.PI;
  const x11 = (x0 + x6) / 2 + (width / 2) * dknee,
    y11 = y0 + width * (inseam / 2 - 5);

  const x10 = (x0 + x11) / 2 - 0.5 * width,
    y10 = (y0 + y11) / 2;
  const x13 = (x0 + x6) / 2 + width * 0.75 * dboot - width / 2,
    y13 = y0 + width * inseam;
  const x12 = (x11 + x13) / 2,
    y12 = (y11 + y13) / 2;
  const x15 = x13 - width * dboot,
    y15 = y13 + 2 * width;
  const x14 = (x13 + x15) / 2,
    y14 = (y13 + y15) / 2 + 3 * width;
  const x17 = x11 - width * dknee,
    y17 = y11;
  const x16 = (x15 + x17) / 2 - width / 2,
    y16 = (y15 + y17) / 2;

  const x18 = (x17 + x6) / 2,
    y18 = (y17 + y6) / 2;
  const PIERNAINFERIORIZQUIERDA = generateLegLeftPath(
    x0,
    y0,
    x6,
    x10,
    y10,
    x11,
    y11,
    x12,
    y12,
    x13,
    y13,
    x14,
    y14,
    x17,
    y17
  );
  const x21 = (x00 + x04) / 2 - (width / 2) * dknee,
    y21 = y00 + width * (inseam / 2 - 5);

  const x20 = (x00 + x21) / 2,
    y20 = (y00 + y21) / 2 - 5 * width;
  const x23 = (x00 + x04) / 2 - (width / 2) * dboot - (width * 3) / 2,
    y23 = y00 + width * inseam - 5 * width;
  const x22 = (x21 + x23) / 2,
    y22 = (y21 + y23) / 2;
  const x25 = x23 + width * dboot,
    y25 = y23 + 2 * width;
  const x24 = (x23 + x25) / 2,
    y24 = (y23 + y25) / 2 + 3.5 * width;
  const x27 = x21 + width * dknee,
    y27 = y21;
  const x26 = (x25 + x27) / 2,
    y26 = (y25 + y27) / 2;
  const x28 = (x27 + x04) / 2,
    y28 = (y27 + y04) / 2;
  const PIERNAINFERIORDERECHA = generateLegRightPath(
    x00,
    y00,
    x20,
    y20,
    x21,
    y21,
    x22,
    y22,
    x23,
    y23,
    x24,
    y24,
    x27,
    x04
  );

  const MEDSUPERIORIZQUIERDA = generateMedLeftTopPath(x0, y0, x2, y2, x4, x6);

  const PIERNAINFERIORIZQUIERDA2 = generateLegLeftPath2(
    x0,
    y0,
    x6,
    y6,
    x11,
    x14,
    y14,
    x15,
    y15,
    x16,
    y16,
    x17,
    y17,
    x18,
    y18
  );

  const MEDSUPERIORDERECHA = generateMedRightTopPath(
    x00,
    y00,
    x2,
    y2,
    x02,
    x04
  );

  const PIERNAINFERIORDERECHA2 = generateLegRightPath2(
    x00,
    y00,
    x04,
    y04,
    x21,
    y21,
    x24,
    y24,
    x25,
    y25,
    x26,
    y26,
    x27,
    y27,
    x28,
    y28
  );
  const ZIPPER = generateZipperPath(x1, y1, y2, width);

  let nPleats = 0;
  switch (pleatId) {
    case 304:
      nPleats = 0;
      break;
    case 305:
      nPleats = 1;
      break;
    case 306:
      nPleats = 2;
      break;
    case 307:
      nPleats = 3;
      break;
  }
  let BOLSILLODELANTERODERECHO, BOLSILLODELANTEROIZQUIERDO;
  switch (frontPocketId) {
    case 308:
      BOLSILLODELANTERODERECHO = generatePocketRightPath(
        x2,
        y2,
        x02,
        y02,
        x03,
        y03,
        x04,
        y04,
        width
      );
      BOLSILLODELANTEROIZQUIERDO = generatePocketLeftPath(
        x2,
        y2,
        x4,
        y4,
        x5,
        y5,
        x6,
        y6,
        width
      );
      break;
    case 309:
      BOLSILLODELANTERODERECHO = generatePocketJeansRightPath(
        x2,
        y2,
        x02,
        y02,
        x03,
        y03,
        x04,
        y04,
        width
      );
      BOLSILLODELANTEROIZQUIERDO = generatePocketJeansLeftPath(
        x2,
        y2,
        x4,
        y4,
        x5,
        y5,
        x6,
        y6,
        width
      );
      break;
    case 310:
      BOLSILLODELANTERODERECHO = generatePocketAmericanRightPath(
        x2,
        y2,
        x02,
        y02,
        x03,
        y03,
        x04,
        y04,
        width
      );
      BOLSILLODELANTEROIZQUIERDO = generatePocketAmericanLeftPath(
        x2,
        y2,
        x4,
        y4,
        x5,
        y5,
        x6,
        y6,
        width
      );
      break;
  }
  const PLIEGUEIZQUIERDA = generatePleatLeftPath(
    x2,
    y2,
    x4,
    y4,
    y6,
    width,
    nPleats
  );
  const PLIEGUEDERECHA = generatePleatRightPath(
    x2,
    y2,
    x02,
    y02,
    y04,
    width,
    nPleats
  );

  const { waistPath: CINTURAIZQUIERDA, loopPath: PASADORIZQUIERDO } =
    generateWaistLeftPath(x2, y2, dwaist, width);
  let CINTURADERECHA, PASADORDERECHO;
  let CIERRE: string = "";

  switch (flyId) {
    case 311:
      ({ waistPath: CINTURADERECHA, loopPath: PASADORDERECHO } =
        generateWaistRightPath(x02, y02, dwaist, width));
      CIERRE = generateButtonPath(x2, y2, width);
      break;
    case 312:
      ({ waistPath: CINTURADERECHA, loopPath: PASADORDERECHO } =
        generateWaistRightPath(x02, y02, dwaist, width));
      CIERRE = "";
      break;
    case 313:
      ({ waistPath: CINTURADERECHA, loopPath: PASADORDERECHO } =
        generateWaistExtendedRightPath(x02, y02, dwaist, width));
      CIERRE = generateExtendedButtonPath(x2, y2, width);
      break;
  }

  const flyCoordsCierre = CIERRE.match(/M\s*([\d.-]+)\s*([\d.-]+)/);
  const FLYCOORDSCIERRE = {
    cierre: flyCoordsCierre
      ? {
          x: parseFloat(flyCoordsCierre[1]),
          y: parseFloat(flyCoordsCierre[2]),
        }
      : null,
  };

  const backButtonsId = selectedOptions["Back Buttons"];

  let BOLSILLOTRASERODERECHO = "",
    PESTAÑATRASERODERECHO = "",
    OJALDERECHO = "";
  let BOLSILLOTRASEROIZQUIERDO = "",
    PESTAÑATRASEROIZQUIERDO = "",
    OJALIZQUIERDO = "";

  switch (backPocketsId) {
    case 301:
      ({
        welt: BOLSILLOTRASERODERECHO,
        tab: PESTAÑATRASERODERECHO,
        fly: OJALDERECHO,
      } = generatePocketBackFlapButtonLeftPath(x2, x02, y02, width));
      ({
        welt: BOLSILLOTRASEROIZQUIERDO,
        tab: PESTAÑATRASEROIZQUIERDO,
        fly: OJALIZQUIERDO,
      } = generatePocketBackFlapButtonRightPath(x2, x4, y4, width));
      break;
    case 302:
      ({
        welt: BOLSILLOTRASERODERECHO,
        tab: PESTAÑATRASERODERECHO,
        fly: OJALDERECHO,
      } = generatePocketBackWeltLeftPath(x2, x02, y02, width));
      ({
        welt: BOLSILLOTRASEROIZQUIERDO,
        tab: PESTAÑATRASEROIZQUIERDO,
        fly: OJALIZQUIERDO,
      } = generatePocketBackWeltRighttPath(x2, x4, y4, width));
      break;
    case 303:
      ({
        welt: BOLSILLOTRASERODERECHO,
        tab: PESTAÑATRASERODERECHO,
        fly: OJALDERECHO,
      } = generatePocketBackPatchButtonLeftPath(x2, y04, x02, y02, width));
      ({
        welt: BOLSILLOTRASEROIZQUIERDO,
        tab: PESTAÑATRASEROIZQUIERDO,
        fly: OJALIZQUIERDO,
      } = generatePocketBackPatchButtonRightPath(x2, y6, x4, y4, width));
      break;
  }

  if (backButtonsId === 322) {
    OJALDERECHO = "";
    OJALIZQUIERDO = "";
  }

  const flyCoordsDerecho = OJALDERECHO
    ? OJALDERECHO.match(/M\s*([\d.-]+)\s*([\d.-]+)/)
    : null;
  const flyCoordsIzquierdo = OJALIZQUIERDO
    ? OJALIZQUIERDO.match(/M\s*([\d.-]+)\s*([\d.-]+)/)
    : null;

  const FLYCOORDS = {
    derecho: flyCoordsDerecho
      ? {
          x: parseFloat(flyCoordsDerecho[1]),
          y: parseFloat(flyCoordsDerecho[2]),
        }
      : null,
    izquierdo: flyCoordsIzquierdo
      ? {
          x: parseFloat(flyCoordsIzquierdo[1]),
          y: parseFloat(flyCoordsIzquierdo[2]),
        }
      : null,
  };

  const {
    waistPath: CINTURATRACERAIZQUIERDA,
    loopPath: PASADORTRACERAIZQUIERDA,
  } = generateWaistBackLeftPath(x2, y2, dwaist, width);
  const { waistPath: CINTURATRACERADERECHA, loopPath: PASADORTRACERADERECHA } =
    generateWaistBackRightPath(x02, y02, dwaist, width);
  return {
    MEDSUPERIORIZQUIERDA,
    PIERNAINFERIORIZQUIERDA2,
    MEDSUPERIORDERECHA,
    PIERNAINFERIORDERECHA2,
    PIERNASUPERIORIZQUIERDA,
    PIERNASUPERIORDERECHA,
    PIERNAINFERIORIZQUIERDA,
    PIERNAINFERIORDERECHA,
    CINTURAIZQUIERDA,
    CINTURADERECHA,
    PASADORIZQUIERDO,
    PASADORDERECHO,
    ZIPPER,
    BOLSILLOTRASERODERECHO,
    PESTAÑATRASERODERECHO,
    BOLSILLOTRASEROIZQUIERDO,
    PESTAÑATRASEROIZQUIERDO,
    BOLSILLODELANTERODERECHO,
    BOLSILLODELANTEROIZQUIERDO,
    CIERRE,
    OJALIZQUIERDO,
    OJALDERECHO,
    PLIEGUEIZQUIERDA,
    PLIEGUEDERECHA,
    FLYCOORDSCIERRE,
    FLYCOORDS,
    CINTURATRACERAIZQUIERDA,
    PASADORTRACERAIZQUIERDA,
    CINTURATRACERADERECHA,
    PASADORTRACERADERECHA,
  };
}
