// src/__tests__/MeasurementsPanel.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import MeasurementsPanel from "../screen/OptionsScreen/components/MeasurementsPanel";

// MOCK I18N
jest.mock("../language", () => ({
  t: (key: string) => key,
  store: jest.fn(),
}));

// MOCK VALIDATION
jest.mock("../screen/OptionsScreen/rules/validateMeasurement", () => ({
  validateMeasurement: jest.fn(() => ({
    isValid: true,
  })),
}));

// MOCK MEDIDAS
jest.mock("../screen/OptionsScreen/medidas", () => ({
  defaultSizes: {
    pants: {
      46: {},
      48: {},
      50: {},
      52: {},
    },
    vest: {},
    coat: {},
  },
}));

// MOCK MODAL
jest.mock(
  "../screen/OptionsScreen/components/MeasurementInstructionsModal",
  () => {
    const React = require("react");
    const { Text } = require("react-native");

    return function MockModal() {
      return <Text>MeasurementInstructionsModal</Text>;
    };
  },
);

describe("MeasurementsPanel", () => {
  const mockOnChangeMeasurement = jest.fn();
  const mockOnChangeSize = jest.fn();

  const defaultProps = {
    garmentType: "pants" as const,
    localMeasurements: {
      waist: "80",
      length: "100",
      thigh: "50",
    },
    localSize: "48",
    onChangeMeasurement: mockOnChangeMeasurement,
    onChangeSize: mockOnChangeSize,
    theme: "light" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    expect(screen).toBeTruthy();
  });

  it("renderiza medidas básicas", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    expect(screen.getByText("waist")).toBeTruthy();
    expect(screen.getByText("length")).toBeTruthy();
  });

  it("renderiza las tallas", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    expect(screen.getByText("46")).toBeTruthy();
    expect(screen.getByText("48")).toBeTruthy();
  });

  it("llama onChangeSize al seleccionar talla", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    fireEvent.press(screen.getByText("50"));

    expect(mockOnChangeSize).toHaveBeenCalledWith("50");
  });

  it("permite escribir en un input", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    const input = screen.getByDisplayValue("80");

    fireEvent.changeText(input, "90");

    expect(input.props.value).toBe("90");
  });

  it("llama onChangeMeasurement al finalizar edición", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    const input = screen.getByDisplayValue("80");

    fireEvent.changeText(input, "85");

    fireEvent(input, "endEditing", {
      nativeEvent: {
        text: "85",
      },
    });

    expect(mockOnChangeMeasurement).toHaveBeenCalledWith("waist", "85");
  });

  it("muestra medidas avanzadas", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    fireEvent.press(screen.getByText("✂ Mostrar medidas avanzadas"));

    expect(screen.getByText("thigh")).toBeTruthy();
  });

  it("abre instrucciones al presionar botón info", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    const infoButtons = screen.getAllByText("ℹ️");

    fireEvent.press(infoButtons[0]);

    expect(screen.getByText("MeasurementInstructionsModal")).toBeTruthy();
  });

  it("oculta las tallas", () => {
    const screen = render(<MeasurementsPanel {...defaultProps} />);

    fireEvent.press(screen.getByText("▼ Tallas"));

    expect(screen.getByText("▶ Tallas")).toBeTruthy();
  });
});
