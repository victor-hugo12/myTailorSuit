import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

// MOCK REDUX
jest.mock("@/redux/hooks", () => ({
  useAppSelector: jest.fn(() => "light"),
}));

describe("ThemedSafeAreaView", () => {
  it("renderiza correctamente los children", () => {
    const screen = render(
      <ThemedSafeAreaView>
        <Text>Contenido de prueba</Text>
      </ThemedSafeAreaView>,
    );

    expect(screen.getByText("Contenido de prueba")).toBeTruthy();
  });

  it("renderiza correctamente el SafeAreaView", () => {
    const screen = render(
      <ThemedSafeAreaView>
        <Text>Test</Text>
      </ThemedSafeAreaView>,
    );

    expect(screen).toBeTruthy();
  });
});
