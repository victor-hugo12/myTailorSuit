import { render, fireEvent } from "@testing-library/react-native";
import OptionsScreen from "../screen/OptionsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn((selector) => {
    const mockState = {
      selections: {
        garment: "pants",
        selectedOptions: {},
        measurements: {},
        selectedFabric: null,
        theme: "light",
        size: "M",
      },
    };
    return selector(mockState);
  }),
}));

jest.mock("@/redux/selections/selections.selectors", () => ({
  selectGarmentType: (state: any) => state.selections.garment,
  selectSelectedOptions: (state: any) => state.selections.selectedOptions,
  selectMeasurements: (state: any) => state.selections.measurements,
  selectSelectedFabric: (state: any) => state.selections.selectedFabric,
  selectTheme: (state: any) => state.selections.theme,
  selectSize: (state: any) => state.selections.size,
}));

jest.mock("@/redux/selections/selections.actions", () => ({
  updateMeasurement: jest.fn(),
  changeSize: jest.fn(),
  updateOption: jest.fn(),
  selectFabric: jest.fn(),
}));

jest.mock("@/language", () => ({
  t: (key: string) => key,
}));

jest.mock("@/components/Header", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockHeader() {
    return <Text>Header</Text>;
  };
});

jest.mock("@/components/Preview", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return React.forwardRef(() => {
    return <Text testID="preview">Preview</Text>;
  });
});

jest.mock("@/components/ThemedSafeAreaView", () => {
  const React = require("react");
  const { View } = require("react-native");
  return function MockSafeArea({ children }: any) {
    return <View>{children}</View>;
  };
});

jest.mock("../screen/OptionsScreen/components/DetailOptions", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockDetailOptions() {
    return <Text>DetailOptions</Text>;
  };
});

jest.mock("../screen/OptionsScreen/components/MeasurementsPanel", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockMeasurementsPanel() {
    return <Text>MeasurementsPanel</Text>;
  };
});

jest.mock("../screen/OptionsScreen/components/FabricsGrid", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockFabricsGrid() {
    return <Text>FabricsGrid</Text>;
  };
});

jest.mock("@/components/Modals/SuitNameModal", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return function MockModal() {
    return <Text>SuitNameModal</Text>;
  };
});

jest.mock("@/storage/customSuit.storage", () => ({
  saveSuit: jest.fn(),
}));

jest.mock("@/storage/cloudUtils", () => ({
  saveSuitToCloud: jest.fn(),
}));

jest.mock("@/config/firebaseConfig", () => ({
  firebaseAuth: {
    onAuthStateChanged: jest.fn(() => jest.fn()),
  },
}));

jest.mock("react-native-view-shot", () => ({
  captureRef: jest.fn(),
}));

jest.mock("expo-file-system", () => ({
  documentDirectory: "file://",
  copyAsync: jest.fn(),
}));

describe("OptionsScreen", () => {
  it("renderiza correctamente", () => {
    const screen = render(<OptionsScreen />);
    expect(screen).toBeTruthy();
  });
  it("renderiza el preview", () => {
    const screen = render(<OptionsScreen />);
    expect(screen.getByTestId("preview")).toBeTruthy();
  });
  it("renderiza FabricsGrid por defecto", () => {
    const screen = render(<OptionsScreen />);
    expect(screen.getByText("FabricsGrid")).toBeTruthy();
  });
  it("cambia al tab details", () => {
    const screen = render(<OptionsScreen />);
    fireEvent.press(screen.getByText("details"));
    expect(screen.getByText("DetailOptions")).toBeTruthy();
  });
  it("cambia al tab measurements", () => {
    const screen = render(<OptionsScreen />);
    fireEvent.press(screen.getByText("measurements"));
    expect(screen.getByText("MeasurementsPanel")).toBeTruthy();
  });
});
