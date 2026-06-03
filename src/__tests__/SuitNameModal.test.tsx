// src/__tests__/SuitNameModal.test.tsx

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import SuitNameModal from "../components/Modals/SuitNameModal";

// MOCK REDUX
jest.mock("../redux/hooks", () => ({
  useAppSelector: jest.fn(() => "light"),
}));

// MOCK SELECTOR
jest.mock("../redux/selections/selections.selectors", () => ({
  selectTheme: jest.fn(),
}));

// MOCK I18N
jest.mock("../language", () => ({
  t: (key: string) => key,
  store: jest.fn(),
}));

// MOCK FIREBASE
jest.mock("../config/firebaseConfig", () => ({
  firebaseAuth: {
    onAuthStateChanged: jest.fn((callback) => {
      callback(null);
      return jest.fn();
    }),
  },
}));

// MOCK ACTIVITY INDICATOR
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    ActivityIndicator: () => <Text>Loading...</Text>,
  };
});

describe("SuitNameModal", () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn(() => Promise.resolve());

  const defaultProps = {
    visible: true,
    initialName: "",
    onCancel: mockOnCancel,
    onConfirm: mockOnConfirm,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    const screen = render(<SuitNameModal {...defaultProps} />);

    expect(screen).toBeTruthy();
  });

  it("renderiza el input", () => {
    const screen = render(<SuitNameModal {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("suit_name_modal.placeholder"),
    ).toBeTruthy();
  });

  it("permite escribir el nombre", () => {
    const screen = render(<SuitNameModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("suit_name_modal.placeholder");

    fireEvent.changeText(input, "Traje Elegante");

    expect(input.props.value).toBe("Traje Elegante");
  });

  it("llama onCancel al cerrar", () => {
    const screen = render(<SuitNameModal {...defaultProps} />);

    fireEvent.press(screen.getByText("×"));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("llama onConfirm al guardar", async () => {
    const screen = render(<SuitNameModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("suit_name_modal.placeholder");

    fireEvent.changeText(input, "Mi Traje");

    fireEvent.press(screen.getByText("suit_name_modal.save"));

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledWith("Mi Traje", undefined);
    });
  });

  it("muestra botones de guardado cuando saveOptions=true", () => {
    const screen = render(
      <SuitNameModal {...defaultProps} saveOptions={true} />,
    );

    expect(screen.getByText("suit_name_modal.save_in")).toBeTruthy();

    expect(screen.getByText("suit_name_modal.local")).toBeTruthy();
  });

  it("renderiza botones personalizados", () => {
    const screen = render(
      <SuitNameModal
        {...defaultProps}
        saveButtons={[
          {
            label: "Guardar cambios",
            value: "save_changes",
          },
        ]}
      />,
    );

    expect(screen.getByText("Guardar cambios")).toBeTruthy();
  });

  it("llama onConfirm con acción personalizada", async () => {
    const screen = render(
      <SuitNameModal
        {...defaultProps}
        saveButtons={[
          {
            label: "Guardar cambios",
            value: "save_changes",
          },
        ]}
      />,
    );

    const input = screen.getByPlaceholderText("suit_name_modal.placeholder");

    fireEvent.changeText(input, "Traje Azul");

    fireEvent.press(screen.getByText("Guardar cambios"));

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledWith("Traje Azul", "save_changes");
    });
  });
});
