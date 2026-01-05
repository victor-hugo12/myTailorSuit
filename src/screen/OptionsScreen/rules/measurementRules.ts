// src/screens/OptionsScreen/rules/measurementRules.ts

export type GarmentType = "pants" | "vest" | "coat";

export interface MeasurementRule {
  dependsOn: string; // medida base (ej: muslo, cintura, rodilla)
  min?: (baseValue: number) => number;
  max?: (baseValue: number) => number;
  message: (baseValue: number) => string;
}

/**
 * Reglas de validación de medidas por prenda
 * Cada regla se evalúa cuando se intenta modificar la clave (key)
 */
export const measurementRules: Record<
  GarmentType,
  Record<string, MeasurementRule[]>
> = {
  // =========================
  // 👖 PANTALÓN
  // =========================
  pants: {
    knee: [
      {
        dependsOn: "thigh",
        min: (thigh) => thigh * 0.6,
        max: (thigh) => thigh * 0.85,
        message: (thigh) =>
          `La rodilla debe estar entre el 60% y 85% del muslo (${(
            thigh * 0.6
          ).toFixed(1)} – ${(thigh * 0.85).toFixed(1)}).`,
      },
    ],

    boot: [
      {
        dependsOn: "knee",
        min: (knee) => knee * 0.65,
        max: (knee) => knee * 1.0,
        message: (knee) =>
          `La bota debe estar entre el 65% y 100% de la rodilla (${(
            knee * 0.65
          ).toFixed(1)} – ${knee.toFixed(1)}).`,
      },
    ],

    thigh: [
      {
        dependsOn: "waist",
        min: (waist) => waist * 0.55,
        max: (waist) => waist * 0.75,
        message: (waist) =>
          `El muslo debe estar entre el 55% y 75% de la cintura (${(
            waist * 0.55
          ).toFixed(1)} – ${(waist * 0.75).toFixed(1)}).`,
      },
    ],

    inseam: [
      {
        dependsOn: "length",
        min: (length) => length * 0.7,
        max: (length) => length * 0.85,
        message: (length) =>
          `La entrepierna debe estar entre el 70% y 85% del largo (${(
            length * 0.7
          ).toFixed(1)} – ${(length * 0.85).toFixed(1)}).`,
      },
    ],
  },

  // =========================
  // 🦺 CHALECO
  // =========================
  vest: {
    waist: [
      {
        dependsOn: "chest",
        min: (chest) => chest - 14,
        max: (chest) => chest + 4,
        message: (chest) =>
          `La diferencia entre pecho y cintura debe estar entre 6 y 14 cm (cintura entre ${(
            chest - 14
          ).toFixed(1)} y ${(chest - 6).toFixed(1)}).`,
      },
    ],

    shoulderWidth: [
      {
        dependsOn: "chest",
        min: (chest) => chest * 0.6,
        max: (chest) => chest * 0.9,
        message: (chest) =>
          `Los hombros deben estar entre el 60% y 90% del pecho (${(
            chest * 0.6
          ).toFixed(1)} – ${(chest * 0.9).toFixed(1)}).`,
      },
    ],
  },

  // =========================
  // 🧥 SACO
  // =========================
  coat: {
    waist: [
      {
        dependsOn: "chest",
        min: (chest) => chest - 14,
        max: (chest) => chest + 4,
        message: (chest) =>
          `La diferencia entre pecho y cintura debe estar entre 6 y 14 cm (cintura entre ${(
            chest - 14
          ).toFixed(1)} y ${(chest - 6).toFixed(1)}).`,
      },
    ],

    shoulder: [
      {
        dependsOn: "chest",
        min: (chest) => chest * 0.6,
        max: (chest) => chest * 0.9,
        message: (chest) =>
          `Los hombros deben estar entre el 60% y 90% del pecho (${(
            chest * 0.6
          ).toFixed(1)} – ${(chest * 0.9).toFixed(1)}).`,
      },
    ],

    sleeveLength: [
      {
        dependsOn: "coatLength",
        min: (length) => length * 0.75,
        max: (length) => length * 1.0,
        message: (length) =>
          `La manga debe medir entre el 75% y 100% del largo del saco (${(
            length * 0.75
          ).toFixed(1)} – ${length.toFixed(1)}).`,
      },
    ],
  },
};
