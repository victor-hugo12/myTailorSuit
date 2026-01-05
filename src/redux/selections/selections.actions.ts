//src/redux/selections/selections.actions.ts
import { createAction } from "@reduxjs/toolkit";

export const changeLanguage = createAction<"es" | "en">(
  "selections/changeLanguage"
);
export const switchTheme = createAction("selections/switchTheme");
export const changeGarment = createAction<number>("selections/changeGarment");

export const changeSize = createAction<{
  size: string;
  measurements?: Record<string, string>;
}>("selections/changeSize");

export const updateMeasurement = createAction<{
  field: string;
  value: string;
}>("selections/updateMeasurement");

export const updateOption = createAction<{
  groupLabel: string;
  optionId: number;
}>("selections/updateOption");

// 🧵 NUEVO ACTION: seleccionar tela
export const selectFabric = createAction<{
  fabricId: string;
  fabricName: string;
  imageKey: string;
}>("selections/selectFabric");
