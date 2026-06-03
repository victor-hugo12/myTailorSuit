// src/__tests__/DetailOptions.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import DetailOptions from "../screen/OptionsScreen/components/DetailOptions";

// MOCK I18N
jest.mock("../language", () => ({
  t: (key: string) => key,
  store: jest.fn(),
}));

// MOCK CONSTANTS
jest.mock("../screen/OptionsScreen/constants", () => ({
  BACK_LABELS: ["back"],
}));

// MOCK OPTION GROUPS
jest.mock("@/components/OptionGroups", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");

  return function MockOptionGroups({ groups, onSelectGroup }: any) {
    return (
      <View>
        {groups.map((group: any) => (
          <TouchableOpacity
            key={group.label}
            onPress={() => onSelectGroup(group.label)}
          >
            <Text>{group.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
});

// MOCK OPTIONS LIST
jest.mock("@/components/OptionsList", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");

  return function MockOptionsList({ options, onSelectOption }: any) {
    return (
      <View>
        {options.map((option: any) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => onSelectOption(option.id)}
          >
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
});

describe("DetailOptions", () => {
  const mockSetShowBackView = jest.fn();
  const mockOnSelectOption = jest.fn();

  const defaultProps = {
    theme: "light" as const,

    currentOptionGroups: [
      {
        label: "front",
        options: [
          {
            id: 1,
            label: "option_front",
          },
        ],
      },

      {
        label: "back",
        options: [
          {
            id: 2,
            label: "option_back",
          },
        ],
      },
    ],

    selectedOptions: {
      front: 1,
    },

    showBackView: false,
    setShowBackView: mockSetShowBackView,
    onSelectOption: mockOnSelectOption,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    const screen = render(<DetailOptions {...defaultProps} />);

    expect(screen).toBeTruthy();
  });

  it("renderiza grupos de opciones", () => {
    const screen = render(<DetailOptions {...defaultProps} />);

    expect(screen.getByText("front")).toBeTruthy();
    expect(screen.getByText("back")).toBeTruthy();
  });

  it("renderiza opciones del grupo activo", () => {
    const screen = render(<DetailOptions {...defaultProps} />);

    expect(screen.getByText("option_front")).toBeTruthy();
  });

  it("cambia el grupo activo", () => {
    const screen = render(<DetailOptions {...defaultProps} />);

    fireEvent.press(screen.getByText("back"));

    expect(screen.getByText("option_back")).toBeTruthy();
  });

  it("llama onSelectOption", () => {
    const screen = render(<DetailOptions {...defaultProps} />);

    fireEvent.press(screen.getByText("option_front"));

    expect(mockOnSelectOption).toHaveBeenCalledWith("front", 1);
  });

  it("activa vista trasera cuando el grupo está en BACK_LABELS", () => {
    const screen = render(<DetailOptions {...defaultProps} />);

    fireEvent.press(screen.getByText("back"));

    fireEvent.press(screen.getByText("option_back"));

    expect(mockSetShowBackView).toHaveBeenCalledWith(true);
  });

  it("desactiva vista trasera cuando el grupo no está en BACK_LABELS", () => {
    const screen = render(
      <DetailOptions {...defaultProps} showBackView={true} />,
    );

    fireEvent.press(screen.getByText("front"));

    fireEvent.press(screen.getByText("option_front"));

    expect(mockSetShowBackView).toHaveBeenCalledWith(false);
  });

  it("no falla si no hay grupos", () => {
    const screen = render(
      <DetailOptions {...defaultProps} currentOptionGroups={[]} />,
    );

    expect(screen).toBeTruthy();
  });
});
