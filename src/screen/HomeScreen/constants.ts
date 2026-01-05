export const GARMENT_OPTIONS = [
  { id: 1, label: "pants", icon: require("../../../assets/pant.png") },
  { id: 2, label: "vest", icon: require("../../../assets/vest.png") },
  { id: 3, label: "coat", icon: require("../../../assets/coat.png") },
];

export const GARMENT_MAP: Record<number, "pants" | "vest" | "coat"> = {
  1: "pants",
  2: "vest",
  3: "coat",
};

// 🔁 Mapeo tipo de prenda → numérico
export const REVERSE_GARMENT_MAP: Record<"pants" | "vest" | "coat", number> = {
  pants: 1,
  vest: 2,
  coat: 3,
};
