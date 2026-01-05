//src/redux/selections/selections.reducer.ts
import { createReducer } from "@reduxjs/toolkit";
import {
  changeLanguage,
  switchTheme,
  changeGarment,
  changeSize,
  updateMeasurement,
  updateOption,
  selectFabric,
} from "./selections.actions";
import { defaultSizes } from "@/screen/OptionsScreen/medidas";
import { REVERSE_GARMENT_MAP } from "@/screen/HomeScreen/constants";
import { OPTIONS_BY_GARMENT } from "@/screen/OptionsScreen/constants";

const getDefaultSelectedOptions = (garment: "coat" | "vest" | "pants") => {
  const garmentOptions = OPTIONS_BY_GARMENT[garment];
  const defaults: Record<string, number> = {};

  garmentOptions.forEach((group) => {
    if (group.options && group.options.length > 0) {
      defaults[group.label] = group.options[0].id;
    }
  });
  return defaults;
};

interface FabricSelection {
  id: string | null;
  name: string | null;
  imageKey: string | null;
}

export interface GarmentData {
  selectedSize: string;
  measurements: Record<string, string>;
  selectedOptions: Record<string, number>;
  selectedFabric: FabricSelection;
}

export interface SelectionsState {
  language: "es" | "en";
  theme: "light" | "dark";
  garmentId: number;
  garments: Record<"pants" | "vest" | "coat", GarmentData>;
}

const initialFabric: FabricSelection = {
  id: null,
  name: null,
  imageKey: null,
};

const initialState: SelectionsState = {
  language: "es",
  theme: "light",
  garmentId: REVERSE_GARMENT_MAP.pants,
  garments: {
    pants: {
      selectedSize: "46",
      measurements: defaultSizes.pants["46"],
      selectedOptions: getDefaultSelectedOptions("pants"),
      selectedFabric: initialFabric,
    },
    vest: {
      selectedSize: "46",
      measurements: defaultSizes.vest["46"],
      selectedOptions: getDefaultSelectedOptions("vest"),
      selectedFabric: initialFabric,
    },
    coat: {
      selectedSize: "46",
      measurements: defaultSizes.coat["46"],
      selectedOptions: getDefaultSelectedOptions("coat"),
      selectedFabric: initialFabric,
    },
  },
};

const getCurrentGarmentType = (garmentId: number) =>
  Object.keys(REVERSE_GARMENT_MAP).find(
    (key) => REVERSE_GARMENT_MAP[key as "pants" | "vest" | "coat"] === garmentId
  ) as "pants" | "vest" | "coat";

export const selectionsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLanguage, (state, action) => {
      state.language = action.payload;
    })
    .addCase(switchTheme, (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    })
    .addCase(changeGarment, (state, action) => {
      state.garmentId = action.payload;
    })
    .addCase(changeSize, (state, action) => {
      const garmentType = getCurrentGarmentType(state.garmentId);
      state.garments[garmentType].selectedSize = action.payload.size;

      if (action.payload.measurements) {
        state.garments[garmentType].measurements = action.payload.measurements;
      }
    })
    .addCase(updateMeasurement, (state, action) => {
      const garmentType = getCurrentGarmentType(state.garmentId);
      state.garments[garmentType].measurements[action.payload.field] =
        action.payload.value;
    })
    .addCase(updateOption, (state, action) => {
      const garmentType = getCurrentGarmentType(state.garmentId);
      state.garments[garmentType].selectedOptions[action.payload.groupLabel] =
        action.payload.optionId;
    })
    .addCase(selectFabric, (state, action) => {
      const garmentType = getCurrentGarmentType(state.garmentId);
      state.garments[garmentType].selectedFabric = {
        id: action.payload.fabricId,
        name: action.payload.fabricName,
        imageKey: action.payload.imageKey,
      };
    });
});
