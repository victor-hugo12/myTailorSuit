export const defaultSizes: Record<
  string,
  Record<string, Record<string, string>>
> = {
  vest: {
    "46": { vestLength: "64", shoulderWidth: "38", chest: "46", waist: "38" },
    "48": { vestLength: "66", shoulderWidth: "40", chest: "48", waist: "40" },
    "50": { vestLength: "68", shoulderWidth: "42", chest: "50", waist: "42" },
    "52": { vestLength: "70", shoulderWidth: "44", chest: "52", waist: "44" },
  },

  pants: {
    "46": {
      waist: "46",
      length: "94",
      inseam: "72",
      thigh: "32",
      knee: "22",
      boot: "18",
    },
    "48": {
      waist: "48",
      length: "96",
      inseam: "74",
      thigh: "33",
      knee: "23",
      boot: "18",
    },
    "50": {
      waist: "50",
      length: "98",
      inseam: "76",
      thigh: "34",
      knee: "24",
      boot: "19",
    },
    "52": {
      waist: "52",
      length: "100",
      inseam: "78",
      thigh: "35",
      knee: "25",
      boot: "20",
    },
  },

  coat: {
    "46": {
      coatLength: "72",
      shoulder: "38",
      chest: "46",
      waist: "40",
      sleeveLength: "62",
    },
    "48": {
      coatLength: "73.5",
      shoulder: "40",
      chest: "48",
      waist: "42",
      sleeveLength: "63",
    },
    "50": {
      coatLength: "75",
      shoulder: "42",
      chest: "50",
      waist: "44",
      sleeveLength: "64",
    },
    "52": {
      coatLength: "76.5",
      shoulder: "44",
      chest: "52",
      waist: "46",
      sleeveLength: "65",
    },
  },
};
