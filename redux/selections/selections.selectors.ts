//src/redux/selections/selections.selectors.ts
import { GARMENT_MAP } from "screen/HomeScreen/constants";
import { RootState } from "../store";

export const selectLanguage = (state: RootState) => state.selections.language;
export const selectTheme = (state: RootState) => state.selections.theme;

export const selectGarmentId = (state: RootState) => state.selections.garmentId;

export const selectGarmentType = (state: RootState) =>
  GARMENT_MAP[state.selections.garmentId];

export const selectSize = (state: RootState) => {
  const garment = selectGarmentType(state);
  return state.selections.garments[garment].selectedSize;
};

export const selectMeasurements = (state: RootState) => {
  const garment = selectGarmentType(state);
  return state.selections.garments[garment].measurements;
};

export const selectSelectedOptions = (state: RootState) => {
  const garment = selectGarmentType(state);
  return state.selections.garments[garment].selectedOptions;
};

// 🧵 NUEVO SELECTOR
export const selectSelectedFabric = (state: RootState) => {
  const garment = selectGarmentType(state);
  return state.selections.garments[garment].selectedFabric;
};
