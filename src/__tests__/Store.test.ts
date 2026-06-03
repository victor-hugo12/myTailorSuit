// src/__tests__/Store.test.ts

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

import { store } from "@/redux/store";

describe("Redux Store", () => {
  it("debe inicializar correctamente el store", () => {
    const state = store.getState();

    expect(state).toBeTruthy();
  });

  it("debe contener el reducer selections", () => {
    const state = store.getState();

    expect(state.selections).toBeTruthy();
  });

  it("debe cargar el idioma inicial", () => {
    const state = store.getState();

    expect(state.selections.language).toBe("es");
  });

  it("debe cargar el tema inicial", () => {
    const state = store.getState();

    expect(state.selections.theme).toBe("light");
  });

  it("debe tener prendas iniciales", () => {
    const state = store.getState();

    expect(state.selections.garments.pants).toBeTruthy();
    expect(state.selections.garments.vest).toBeTruthy();
    expect(state.selections.garments.coat).toBeTruthy();
  });
});
