import { render } from "@testing-library/react-native";
import Preview from "@/components/Preview";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

jest.mock("react-native-gesture-handler", () => ({
  GestureDetector: ({ children }: any) => children,
  Gesture: {
    Pinch: () => ({
      onUpdate: () => ({
        onEnd: () => ({}),
      }),
    }),
    Pan: () => ({
      onStart: () => ({
        onUpdate: () => ({}),
      }),
    }),
    Tap: () => ({
      numberOfTaps: () => ({
        onEnd: () => ({}),
      }),
    }),
    Exclusive: jest.fn(),
    Simultaneous: jest.fn(),
  },
}));

describe("Preview", () => {
  it("renderiza correctamente el preview", () => {
    const screen = render(<Preview garment="pants" measurements={{}} />);
    expect(screen).toBeTruthy();
  });
});
