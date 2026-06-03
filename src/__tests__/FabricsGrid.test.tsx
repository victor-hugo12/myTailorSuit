// src/__tests__/FabricsGrid.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import FabricsGrid from "../screen/OptionsScreen/components/FabricsGrid";

// MOCK TELAS
jest.mock("../screen/OptionsScreen/telas_mapped.json", () => [
  {
    id: "1",
    name: "Fabric A",
    man_jacket: "50",
    man_pants: "30",
    man_waistcoat: "20",
    tone: "Dark",
    simple_composition: "Wool",
  },
  {
    id: "2",
    name: "Fabric B",
    man_jacket: "60",
    man_pants: "40",
    man_waistcoat: "25",
    tone: "Light",
    simple_composition: "Cotton",
  },
]);

// MOCK IMÁGENES
jest.mock("../screen/OptionsScreen/components/fabricImages", () => ({
  fabricImages: {
    "Fabric A": 1,
    "Fabric B": 2,
  },
}));

// MOCK FILTER PANEL
jest.mock("../screen/OptionsScreen/components/FabricsFilterPanel", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return function MockFilterPanel() {
    return (
      <View>
        <Text>FabricsFilterPanel</Text>
      </View>
    );
  };
});

describe("FabricsGrid", () => {
  const mockOnSelectFabric = jest.fn();

  const defaultProps = {
    garment: "pants" as const,
    selectedFabric: null,
    onSelectFabric: mockOnSelectFabric,
    theme: "light" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    const screen = render(<FabricsGrid {...defaultProps} />);

    expect(screen).toBeTruthy();
  });

  it("renderiza las telas", () => {
    const screen = render(<FabricsGrid {...defaultProps} />);

    expect(screen.getByText("Fabric A")).toBeTruthy();
    expect(screen.getByText("Fabric B")).toBeTruthy();
  });

  it("renderiza el precio según la prenda", () => {
    const screen = render(<FabricsGrid {...defaultProps} />);

    expect(screen.getByText("+$30")).toBeTruthy();
    expect(screen.getByText("+$40")).toBeTruthy();
  });

  it("llama onSelectFabric al seleccionar una tela", () => {
    const screen = render(<FabricsGrid {...defaultProps} />);

    fireEvent.press(screen.getByText("Fabric A"));

    expect(mockOnSelectFabric).toHaveBeenCalledWith({
      id: "1",
      name: "Fabric A",
      imageKey: "Fabric A",
      image: undefined,
    });
  });

  it("muestra el panel de filtros", () => {
    const screen = render(<FabricsGrid {...defaultProps} />);

    fireEvent.press(screen.getByText("▶ Filtros"));

    expect(screen.getByText("FabricsFilterPanel")).toBeTruthy();
  });

  it("oculta el panel de filtros", () => {
    const screen = render(<FabricsGrid {...defaultProps} />);

    fireEvent.press(screen.getByText("▶ Filtros"));

    expect(screen.getByText("▼ Filtros")).toBeTruthy();
  });
});
