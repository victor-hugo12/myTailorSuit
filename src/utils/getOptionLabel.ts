import { OPTIONS_BY_GARMENT } from "@/screen/OptionsScreen/constants";

export type GarmentType = keyof typeof OPTIONS_BY_GARMENT;

export interface OptionItem {
  id: number;
  label: string;
}

export function getOptionLabelById(garment: GarmentType, id: number) {
  const groups = OPTIONS_BY_GARMENT[garment];
  if (!groups) return String(id);

  for (const group of groups) {
    const found = group.options.find((opt: OptionItem) => opt.id === id);
    if (found) return found.label;
  }

  return String(id);
}
