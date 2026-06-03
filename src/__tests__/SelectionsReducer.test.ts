import { selectionsReducer } from "@/redux/selections/selections.reducer";

import {
  changeLanguage,
  switchTheme,
  changeGarment,
  updateMeasurement,
} from "@/redux/selections/selections.actions";

describe("Selections Reducer", () => {
  const initialState = selectionsReducer(undefined, { type: "@@INIT" });

  it("debe cargar el estado inicial correctamente", () => {
    expect(initialState.language).toBe("es");
    expect(initialState.theme).toBe("light");
    expect(initialState.garmentId).toBe(1);
  });

  it("debe cambiar el idioma a inglés", () => {
    const state = selectionsReducer(initialState, changeLanguage("en"));

    expect(state.language).toBe("en");
  });

  it("debe cambiar el tema", () => {
    const state = selectionsReducer(initialState, switchTheme());

    expect(state.theme).toBe("dark");
  });

  it("debe cambiar la prenda seleccionada", () => {
    const state = selectionsReducer(initialState, changeGarment(2));

    expect(state.garmentId).toBe(2);
  });

  it("debe actualizar una medida correctamente", () => {
    const stateWithGarment = selectionsReducer(initialState, changeGarment(1));

    const updatedState = selectionsReducer(
      stateWithGarment,
      updateMeasurement({
        field: "waist",
        value: "95",
      }),
    );

    expect(updatedState.garments.pants.measurements.waist).toBe("95");
  });
});
