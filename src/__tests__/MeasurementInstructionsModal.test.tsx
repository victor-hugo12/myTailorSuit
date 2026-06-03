// src/__tests__/MeasurementInstructionsModal.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import MeasurementInstructionsModal from "../screen/OptionsScreen/components/MeasurementInstructionsModal";

describe("MeasurementInstructionsModal", () => {
  const mockOnClose = jest.fn();

  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    title: "Cómo medir cintura",
    steps: ["Coloque la cinta alrededor de la cintura", "No ajuste demasiado"],
    images: [1, 2, 3],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    expect(screen).toBeTruthy();
  });

  it("renderiza el título", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    expect(screen.getByText("Cómo medir cintura")).toBeTruthy();
  });

  it("renderiza los pasos", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    expect(
      screen.getByText("1. Coloque la cinta alrededor de la cintura"),
    ).toBeTruthy();

    expect(screen.getByText("2. No ajuste demasiado")).toBeTruthy();
  });

  it("renderiza botón cerrar", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    expect(screen.getByText("Cerrar")).toBeTruthy();
  });

  it("llama onClose al presionar cerrar", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    fireEvent.press(screen.getByText("Cerrar"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renderiza botones de navegación", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    expect(screen.getByText("◀")).toBeTruthy();
    expect(screen.getByText("▶")).toBeTruthy();
  });

  it("permite avanzar imágenes", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    fireEvent.press(screen.getByText("▶"));

    expect(screen.getByText("▶")).toBeTruthy();
  });

  it("permite retroceder imágenes", () => {
    const screen = render(<MeasurementInstructionsModal {...defaultProps} />);

    fireEvent.press(screen.getByText("▶"));
    fireEvent.press(screen.getByText("◀"));

    expect(screen.getByText("◀")).toBeTruthy();
  });

  it("no falla con lista vacía de imágenes", () => {
    const screen = render(
      <MeasurementInstructionsModal {...defaultProps} images={[]} />,
    );

    expect(screen).toBeTruthy();
  });

  it("no falla con lista vacía de pasos", () => {
    const screen = render(
      <MeasurementInstructionsModal {...defaultProps} steps={[]} />,
    );

    expect(screen).toBeTruthy();
  });

  it("renderiza correctamente cuando visible es false", () => {
    const screen = render(
      <MeasurementInstructionsModal {...defaultProps} visible={false} />,
    );

    expect(screen).toBeTruthy();
  });
});
