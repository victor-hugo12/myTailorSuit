// src/__tests__/SettingsScreen.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SettingsScreen from "@/screen/SettingsScreen";

const mockDispatch = jest.fn();
const mockPush = jest.fn();

// MOCKS
jest.mock("expo-router", () => ({
  router: {
    push: mockPush,
  },
}));

jest.mock("@/components/Header", () => "Header");
jest.mock("@/components/ThemedSafeAreaView", () => "ThemedSafeAreaView");

jest.mock("@/config/firebaseConfig", () => ({
  firebaseAuth: {
    onAuthStateChanged: jest.fn((callback) => {
      callback(null);
      return jest.fn();
    }),
    signOut: jest.fn(),
  },
}));

jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    isSignedIn: jest.fn(() => Promise.resolve(false)),
    signOut: jest.fn(),
  },
}));

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn((selector) => {
    const mockState = {
      selections: {
        language: "es",
        theme: "light",
      },
    };

    return selector(mockState);
  }),
}));

describe("SettingsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente la pantalla de configuración", () => {
    const screen = render(<SettingsScreen />);

    expect(screen).toBeTruthy();
  });

  it("permite cambiar idioma a inglés", () => {
    const screen = render(<SettingsScreen />);

    const englishButton = screen.getByText("English");

    fireEvent.press(englishButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("permite cambiar el tema", () => {
    const screen = render(<SettingsScreen />);

    const darkButton = screen.getByText(/oscuro/i);

    fireEvent.press(darkButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("redirige al login cuando no hay usuario autenticado", () => {
    const screen = render(<SettingsScreen />);

    const loginButton = screen.getByText(/iniciar sesión/i);

    fireEvent.press(loginButton);

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
