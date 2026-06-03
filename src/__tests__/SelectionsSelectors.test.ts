import {
  selectLanguage,
  selectTheme,
  selectGarmentId,
  selectGarmentType,
  selectSize,
  selectMeasurements,
  selectSelectedOptions,
  selectSelectedFabric,
} from "@/redux/selections/selections.selectors";

describe("Selections Selectors", () => {
  const mockState: any = {
    selections: {
      language: "es",
      theme: "dark",
      garmentId: 1,

      garments: {
        pants: {
          selectedSize: "48",

          measurements: {
            waist: "90",
            length: "100",
          },

          selectedOptions: {
            fit: 2,
          },

          selectedFabric: {
            id: "1",
            name: "Lana Premium",
            imageKey: "fabric_1",
          },
        },

        vest: {
          selectedSize: "46",
          measurements: {},
          selectedOptions: {},
          selectedFabric: {},
        },

        coat: {
          selectedSize: "46",
          measurements: {},
          selectedOptions: {},
          selectedFabric: {},
        },
      },
    },
  };

  it("debe seleccionar el idioma correctamente", () => {
    expect(selectLanguage(mockState)).toBe("es");
  });

  it("debe seleccionar el tema correctamente", () => {
    expect(selectTheme(mockState)).toBe("dark");
  });

  it("debe seleccionar el ID de prenda correctamente", () => {
    expect(selectGarmentId(mockState)).toBe(1);
  });

  it("debe seleccionar el tipo de prenda correctamente", () => {
    expect(selectGarmentType(mockState)).toBe("pants");
  });

  it("debe seleccionar la talla correctamente", () => {
    expect(selectSize(mockState)).toBe("48");
  });

  it("debe seleccionar las medidas correctamente", () => {
    expect(selectMeasurements(mockState)).toEqual({
      waist: "90",
      length: "100",
    });
  });

  it("debe seleccionar las opciones correctamente", () => {
    expect(selectSelectedOptions(mockState)).toEqual({
      fit: 2,
    });
  });

  it("debe seleccionar la tela correctamente", () => {
    expect(selectSelectedFabric(mockState)).toEqual({
      id: "1",
      name: "Lana Premium",
      imageKey: "fabric_1",
    });
  });
});
