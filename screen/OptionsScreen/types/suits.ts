export interface FabricSelection {
  id: string;
  name: string;
  image?: string;
}
export interface SavedSuit {
  id: string;
  name: string;
  garment: "pants" | "vest" | "coat";
  measurements: Record<string, number>;
  fabric: any;
  details: Record<string, number>;
  savedAt: number;
  size?: string;
  isFromCloud?: boolean;
  previewUri?: string; // OK
}

export interface Fabric {
  id: string;
  name: string;
  image?: string;
  man_jacket: string;
  man_pants: string;
  man_waistcoat: string;
  tone: string;
  simple_composition: string;
}
