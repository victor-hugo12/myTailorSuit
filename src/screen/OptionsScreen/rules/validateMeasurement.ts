// src/screens/OptionsScreen/rules/validateMeasurement.ts

import { measurementRules, GarmentType } from "./measurementRules";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Valida una modificación de medida según reglas proporcionales
 *
 * @param garmentType  Tipo de prenda (pants | vest | coat)
 * @param field        Campo que se intenta modificar
 * @param newValue     Nuevo valor propuesto
 * @param measurements Medidas actuales
 */
export function validateMeasurement(
  garmentType: GarmentType,
  field: string,
  newValue: number,
  measurements: Record<string, string>
): ValidationResult {
  const garmentRules = measurementRules[garmentType];
  if (!garmentRules) return { isValid: true };

  const rulesForField = garmentRules[field];
  if (!rulesForField || rulesForField.length === 0) {
    return { isValid: true };
  }

  for (const rule of rulesForField) {
    const baseRaw = measurements[rule.dependsOn];
    const baseValue = parseFloat(baseRaw);

    // Si la medida base no existe o no es válida, no bloqueamos
    if (isNaN(baseValue)) continue;

    if (rule.min) {
      const minValue = rule.min(baseValue);
      if (newValue < minValue) {
        return {
          isValid: false,
          message: rule.message(baseValue),
        };
      }
    }

    if (rule.max) {
      const maxValue = rule.max(baseValue);
      if (newValue > maxValue) {
        return {
          isValid: false,
          message: rule.message(baseValue),
        };
      }
    }
  }

  return { isValid: true };
}
