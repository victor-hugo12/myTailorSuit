// src/screens/OptionsScreen/constants.ts
export const COAT_OPTIONS = [
  {
    label: "Buttons",
    icon: require("../../assets/icons/botones.png"),
    options: [
      { id: 101, label: "2 Buttons" },
      { id: 102, label: "3 Buttons" },
      { id: 103, label: "4 Buttons" },
      { id: 104, label: "5 Buttons" },
      { id: 105, label: "4 Crossed Buttons" },
      { id: 106, label: "6 Crossed Buttons" },
    ],
  },

  {
    label: "Lapel",
    icon: require("../../assets/icons/solapa3.png"),
    options: [
      { id: 110, label: "Notch Lapel" },
      { id: 111, label: "Peak Lapel" },
      { id: 112, label: "Round Lapel" },
    ],
  },
  {
    label: "Lower Pockets",
    icon: require("../../assets/icons/pocket.png"),
    options: [
      { id: 120, label: "With Flap" },
      { id: 121, label: "Double Welt" },
      { id: 122, label: "Patch" },
    ],
  },
  {
    label: "Upper Pocket",
    icon: require("../../assets/icons/pocket.png"),
    options: [
      { id: 130, label: "With Flap" },
      { id: 131, label: "Double Welt" },
    ],
  },
  {
    label: "Back Vents",
    icon: require("../../assets/icons/vents.png"),
    options: [
      { id: 140, label: "No Vent" },
      { id: 141, label: "Single Vent" },
      { id: 142, label: "Double Side Vents" },
    ],
  },
];

export const VEST_OPTIONS = [
  {
    label: "Buttons",
    icon: require("../../assets/icons/botones.png"),
    options: [
      { id: 201, label: "2 Buttons" },
      { id: 202, label: "3 Buttons" },
      { id: 203, label: "4 Buttons" },
      { id: 204, label: "5 Buttons" },
      { id: 205, label: "4 Crossed Buttons" },
      { id: 206, label: "6 Crossed Buttons" },
    ],
  },
  {
    label: "Lapel",
    icon: require("../../assets/icons/solapa3.png"),
    options: [
      { id: 210, label: "No Lapel" },
      { id: 211, label: "Notch Lapel" },
      { id: 212, label: "Peak Lapel" },
      { id: 213, label: "Round Lapel" },
    ],
  },
  {
    label: "Lower Pockets",
    icon: require("../../assets/icons/pocket.png"),
    options: [
      { id: 220, label: "With Flap" },
      { id: 221, label: "Double Welt" },
      { id: 222, label: "Patch" },
    ],
  },
  {
    label: "Upper Pocket",
    icon: require("../../assets/icons/pocket.png"),
    options: [
      { id: 230, label: "With Flap" },
      { id: 231, label: "Double Welt" },
    ],
  },

  {
    label: "Lining",
    icon: require("../../assets/icons/lining.png"),
    options: [
      { id: 240, label: "Full Lining" },
      { id: 241, label: "Half Lining" },
      { id: 242, label: "Unstructured (No Lining)" },
    ],
  },
];

export const PANTS_OPTIONS = [
  {
    label: "Back Pockets",
    icon: require("../../assets/icons/pocket.png"),
    options: [
      { id: 301, label: "With Flap" },
      { id: 302, label: "Double Welt" },
      { id: 303, label: "Patch" },
    ],
  },
  {
    label: "Back Buttons",
    icon: require("../../assets/icons/botones.png"),
    options: [
      { id: 321, label: "With Buttons" },
      { id: 322, label: "Without Buttons" },
    ],
  },
  {
    label: "Pleats",
    icon: require("../../assets/icons/pliegues.png"),
    options: [
      { id: 304, label: "Classic" },
      { id: 305, label: "1 Pleat" },
      { id: 306, label: "2 Pleats" },
      { id: 307, label: "3 Pleats" },
    ],
  },
  {
    label: "Front Pockets",
    icon: require("../../assets/icons/pocket.png"),
    options: [
      { id: 308, label: "Seam Pocket" },
      { id: 309, label: "French (Jeans Type)" },
      { id: 310, label: "American" },
    ],
  },
  {
    label: "Fly Type",
    icon: require("../../assets/icons/fly.png"),
    options: [
      { id: 311, label: "Button Fly" },
      { id: 312, label: "Hidden Zip" },
      { id: 313, label: "Extended Front (with Button)" },
    ],
  },
];

export const OPTIONS_BY_GARMENT = {
  coat: COAT_OPTIONS,
  vest: VEST_OPTIONS,
  pants: PANTS_OPTIONS,
};

export const BACK_LABELS = ["Back Vents", "Back Pockets", "Back Buttons"];
