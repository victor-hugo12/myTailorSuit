// src/__tests__/validateMeasurement.test.ts

import { validateMeasurement } from "../screen/OptionsScreen/rules/validateMeasurement";

// MOCK RULES
jest.mock("../screen/OptionsScreen/rules/measurementRules", () => ({
  measurementRules: {
    pants: {
      waist: [
        {
          dependsOn: "thigh",
          min: (base: number) => base + 10,
          message: (base: number) => `Waist must be at least ${base + 10}`,
        },
      ],

      length: [
        {
          dependsOn: "waist",
          max: (base: number) => base + 50,
          message: (base: number) => `Length must be at most ${base + 50}`,
        },
      ],
    },
  },
}));

describe("validateMeasurement", () => {
  it("retorna válido si no existen reglas", () => {
    const result = validateMeasurement("coat" as any, "chest", 100, {});

    expect(result.isValid).toBe(true);
  });

  it("retorna válido si el campo no tiene reglas", () => {
    const result = validateMeasurement("pants", "inseam", 50, {});

    expect(result.isValid).toBe(true);
  });

  it("retorna válido cuando cumple regla mínima", () => {
    const result = validateMeasurement("pants", "waist", 70, {
      thigh: "60",
    });

    expect(result.isValid).toBe(true);
  });

  it("retorna inválido cuando no cumple regla mínima", () => {
    const result = validateMeasurement("pants", "waist", 65, {
      thigh: "60",
    });

    expect(result.isValid).toBe(false);

    expect(result.message).toBe("Waist must be at least 70");
  });

  it("retorna válido cuando cumple regla máxima", () => {
    const result = validateMeasurement("pants", "length", 120, {
      waist: "80",
    });

    expect(result.isValid).toBe(true);
  });

  it("retorna inválido cuando supera regla máxima", () => {
    const result = validateMeasurement("pants", "length", 140, {
      waist: "80",
    });

    expect(result.isValid).toBe(false);

    expect(result.message).toBe("Length must be at most 130");
  });

  it("ignora reglas si dependsOn no es numérico", () => {
    const result = validateMeasurement("pants", "waist", 20, {
      thigh: "abc",
    });

    expect(result.isValid).toBe(true);
  });

  it("retorna válido si todas las reglas se cumplen", () => {
    const result = validateMeasurement("pants", "waist", 100, {
      thigh: "80",
    });

    expect(result.isValid).toBe(true);
  });
});
