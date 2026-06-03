import {
  changeLanguage,
  switchTheme,
  changeGarment,
  changeSize,
  updateMeasurement,
  updateOption,
  selectFabric,
} from "@/redux/selections/selections.actions";

describe("Selections Actions", () => {
  it("debe crear la acción changeLanguage", () => {
    const action = changeLanguage("en");

    expect(action.type).toBe("selections/changeLanguage");
    expect(action.payload).toBe("en");
  });

  it("debe crear la acción switchTheme", () => {
    const action = switchTheme();

    expect(action.type).toBe("selections/switchTheme");
  });

  it("debe crear la acción changeGarment", () => {
    const action = changeGarment(2);

    expect(action.type).toBe("selections/changeGarment");
    expect(action.payload).toBe(2);
  });

  it("debe crear la acción changeSize", () => {
    const action = changeSize({
      size: "48",
      measurements: {
        waist: "90",
      },
    });

    expect(action.type).toBe("selections/changeSize");
    expect(action.payload.size).toBe("48");
  });

  it("debe crear la acción updateMeasurement", () => {
    const action = updateMeasurement({
      field: "waist",
      value: "95",
    });

    expect(action.type).toBe("selections/updateMeasurement");
    expect(action.payload.field).toBe("waist");
    expect(action.payload.value).toBe("95");
  });

  it("debe crear la acción updateOption", () => {
    const action = updateOption({
      groupLabel: "Pockets",
      optionId: 3,
    });

    expect(action.type).toBe("selections/updateOption");
    expect(action.payload.groupLabel).toBe("Pockets");
    expect(action.payload.optionId).toBe(3);
  });

  it("debe crear la acción selectFabric", () => {
    const action = selectFabric({
      fabricId: "1",
      fabricName: "Lana",
      imageKey: "fabric_1",
    });

    expect(action.type).toBe("selections/selectFabric");
    expect(action.payload.fabricName).toBe("Lana");
  });
});
