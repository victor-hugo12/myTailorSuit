import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "@/screen/HomeScreen";

// MOCK ROUTER
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// MOCK COMPONENTS
jest.mock("@/components/Preview", () => "Preview");
jest.mock("@/components/Header", () => "Header");
jest.mock("@/components/ThemedSafeAreaView", () => "ThemedSafeAreaView");

// MOCK REDUX HOOKS
jest.mock("@/redux/hooks", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => "light",
}));

// MOCK SELECTORS
jest.mock("@/redux/selections/selections.selectors", () => ({
  selectGarmentId: jest.fn(() => 1),
  selectGarmentType: jest.fn(() => "pants"),
  selectMeasurements: jest.fn(() => ({})),
  selectSelectedOptions: jest.fn(() => ({})),
  selectSelectedFabric: jest.fn(() => null),
  selectTheme: jest.fn(() => "light"),
}));

describe("HomeScreen", () => {
  it("renderiza correctamente la pantalla principal", () => {
    const screen = render(<HomeScreen />);

    expect(screen).toBeTruthy();
  });
});
