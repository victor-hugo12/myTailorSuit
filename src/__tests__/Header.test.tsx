// src/__tests__/Header.test.tsx

import React from "react";
import { render } from "@testing-library/react-native";
import { Text, View } from "react-native";
import Header from "@/components/Header";

// MOCK ROUTER
const mockBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
    replace: mockReplace,
  }),
}));

// MOCK REDUX
jest.mock("@/redux/hooks", () => ({
  useAppSelector: jest.fn(() => "light"),
}));

// MOCK FIREBASE
jest.mock("@/config/firebaseConfig", () => ({
  firebaseAuth: {
    onAuthStateChanged: jest.fn(() => jest.fn()),
    signOut: jest.fn(),
  },
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  },
}));

// MOCK react-native-paper
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text, View } = require("react-native");

  const MockMenu: any = ({ children }: any) => <View>{children}</View>;

  MockMenu.Item = ({ title }: any) => <Text>{title}</Text>;

  return {
    Appbar: {
      Header: ({ children }: any) => <View>{children}</View>,
      BackAction: () => <Text>Back</Text>,
      Content: ({ title }: any) => <Text>{title}</Text>,
    },

    Avatar: {
      Text: ({ label }: any) => <Text>{label}</Text>,
    },

    Menu: MockMenu,

    Divider: () => <View />,

    Text,
  };
});

describe("Header", () => {
  it("renderiza correctamente el título", () => {
    const screen = render(<Header title="Configuración" />);

    expect(screen.getByText("Configuración")).toBeTruthy();
  });

  it("muestra el botón back cuando showBackButton es true", () => {
    const screen = render(<Header title="Configuración" showBackButton />);

    expect(screen.getByText("Back")).toBeTruthy();
  });

  it("renderiza sin botón back cuando showBackButton es false", () => {
    const screen = render(
      <Header title="Configuración" showBackButton={false} />,
    );

    expect(screen.queryByText("Back")).toBeNull();
  });

  it("renderiza correctamente con showUserInfo false", () => {
    const screen = render(<Header title="Inicio" showUserInfo={false} />);

    expect(screen.getByText("Inicio")).toBeTruthy();
  });
});
