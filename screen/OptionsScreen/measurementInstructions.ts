import i18n from "language";
import en from "./en.json";
import es from "./es.json";
i18n.store(en);
i18n.store(es);
export const measurementInstructions: Record<
  string,
  Record<string, { title: string; steps: string[] }>
> = {
  vest: {
    vestLength: {
      title: i18n.t("vestLength"),
      steps: [
        i18n.t("vestLength_step1"),
        i18n.t("vestLength_step2"),
        i18n.t("vestLength_step3"),
        i18n.t("vestLength_step4"),
      ],
    },
    shoulderWidth: {
      title: i18n.t("shoulderWidth"),
      steps: [
        i18n.t("shoulderWidth_step1"),
        i18n.t("shoulderWidth_step2"),
        i18n.t("shoulderWidth_step3"),
        i18n.t("shoulderWidth_step4"),
      ],
    },
    chest: {
      title: i18n.t("chest"),
      steps: [
        i18n.t("chest_step1"),
        i18n.t("chest_step2"),
        i18n.t("chest_step3"),
        i18n.t("chest_step4"),
      ],
    },
    waist: {
      title: i18n.t("waist"),
      steps: [
        i18n.t("waist_step1"),
        i18n.t("waist_step2"),
        i18n.t("waist_step3"),
        i18n.t("waist_step4"),
      ],
    },
  },

  pants: {
    waist: {
      title: i18n.t("pantWaist"),
      steps: [
        i18n.t("pantWaist_step1"),
        i18n.t("pantWaist_step2"),
        i18n.t("pantWaist_step3"),
        i18n.t("pantWaist_step4"),
      ],
    },
    length: {
      title: i18n.t("pantLength"),
      steps: [i18n.t("pantLength_step1"), i18n.t("pantLength_step2")],
    },
    inseam: {
      title: i18n.t("inseam"),
      steps: [
        i18n.t("inseam_step1"),
        i18n.t("inseam_step2"),
        i18n.t("inseam_step3"),
        i18n.t("inseam_step4"),
      ],
    },
    thigh: {
      title: i18n.t("thigh"),
      steps: [
        i18n.t("thigh_step1"),
        i18n.t("thigh_step2"),
        i18n.t("thigh_step3"),
        i18n.t("thigh_step4"),
      ],
    },
    knee: {
      title: i18n.t("knee"),
      steps: [i18n.t("knee_step1"), i18n.t("knee_step2"), i18n.t("knee_step4")],
    },
    boot: {
      title: i18n.t("boot"),
      steps: [
        i18n.t("boot_step1"),
        i18n.t("boot_step2"),
        i18n.t("boot_step3"),
        i18n.t("boot_step4"),
      ],
    },
  },

  coat: {
    coatLength: {
      title: i18n.t("coatLength"),
      steps: [
        i18n.t("coatLength_step1"),
        i18n.t("coatLength_step2"),
        i18n.t("coatLength_step3"),
      ],
    },
    shoulder: {
      title: i18n.t("shoulder"),
      steps: [
        i18n.t("shoulder_step1"),
        i18n.t("shoulder_step2"),
        i18n.t("shoulder_step3"),
        i18n.t("shoulder_step4"),
      ],
    },
    chest: {
      title: i18n.t("coatChest"),
      steps: [
        i18n.t("coatChest_step1"),
        i18n.t("coatChest_step2"),
        i18n.t("coatChest_step3"),
      ],
    },
    waist: {
      title: i18n.t("coatWaist"),
      steps: [
        i18n.t("coatWaist_step1"),
        i18n.t("coatWaist_step2"),
        i18n.t("coatWaist_step3"),
      ],
    },
    sleeveLength: {
      title: i18n.t("sleeveLength"),
      steps: [
        i18n.t("sleeveLength_step1"),
        i18n.t("sleeveLength_step2"),
        i18n.t("sleeveLength_step3"),
        i18n.t("sleeveLength_step4"),
      ],
    },
  },
};
