// src/__tests__/LoginScreen.test.tsx

import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import LoginScreen from "../screen/LoginScreen";
import { router } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { firebaseAuth } from "@/config/firebaseConfig";

jest.mock("react-native-paper", () => {
  const RealModule = jest.requireActual("react-native-paper");
  return {
    ...RealModule,
    TextInput: Object.assign(RealModule.TextInput, {
      defaultProps: {
        ...RealModule.TextInput.defaultProps,
        animation: { scale: 0 },
      },
    }),
  };
});

jest.mock("@/language", () => ({
  t: (key: string) => key,
  store: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock Redux Hooks locales
const mockSelectTheme = jest.fn(() => "light");
jest.mock("../redux/hooks", () => ({
  useAppSelector: (selector: any) => selector(),
}));
jest.mock("../redux/selections/selections.selectors", () => ({
  selectTheme: () => mockSelectTheme(),
}));

// Mock Google Sign In
jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => Promise.resolve()),
    signIn: jest.fn(),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
  },
}));

jest.mock("@react-native-firebase/auth", () => {
  const authMock = () => ({
    signInWithCredential: jest.fn(() =>
      Promise.resolve({ user: { uid: "123" } }),
    ),
  });

  authMock.GoogleAuthProvider = {
    credential: jest.fn((idToken) => ({
      token: idToken,
      providerId: "google.com",
    })),
  };

  return authMock;
});

// Mock Firestore
const mockGet = jest.fn();
const mockLimit = jest.fn(() => ({ get: mockGet }));
const mockWhere = jest.fn(() => ({ limit: mockLimit }));
const mockCollection = jest.fn(() => ({ where: mockWhere }));

jest.mock("@react-native-firebase/firestore", () => {
  const firestoreMock = () => ({
    collection: mockCollection,
  });
  return firestoreMock;
});

// Mock de tu instancia de configuración personalizada
jest.mock("@/config/firebaseConfig", () => ({
  firebaseAuth: {
    signInWithEmailAndPassword: jest.fn(),
    signInWithCredential: jest.fn(),
  },
}));

// Mock de componentes hijos
jest.mock("@/components/Header", () => {
  const { Text } = require("react-native");
  return function MockHeader({ title }: any) {
    return <Text>{title}</Text>;
  };
});

// =========================================================================
// BLOQUE DE PRUEBAS
// =========================================================================

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renderiza todos los elementos del formulario inicial correctamente", () => {
    const screen = render(<LoginScreen />);

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText("title_login")).toBeTruthy();

    const inputs = screen.getAllByPlaceholderText(" ");
    expect(inputs.length).toBeGreaterThanOrEqual(2);

    expect(screen.getByText("button_login")).toBeTruthy();
    expect(screen.getByText("google_login")).toBeTruthy();
  });

  it("muestra errores de validación de Formik si los campos están vacíos al enviar", async () => {
    const screen = render(<LoginScreen />);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText("button_login"));

    await waitFor(() => {
      expect(screen.getByText("required_email")).toBeTruthy();
      expect(screen.getByText("required_password")).toBeTruthy();
    });
  });

  it("inicia sesión correctamente con Email y Password válidos", async () => {
    (
      firebaseAuth.signInWithEmailAndPassword as jest.Mock
    ).mockResolvedValueOnce({
      user: { uid: "12345" },
    });

    const screen = render(<LoginScreen />);

    act(() => {
      jest.runAllTimers();
    });

    const inputs = screen.getAllByPlaceholderText(" ");

    fireEvent.changeText(inputs[0], "test@example.com");
    fireEvent.changeText(inputs[1], "password123");
    fireEvent.press(screen.getByText("button_login"));

    await waitFor(() => {
      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
      );
      expect(router.replace).toHaveBeenCalledWith("/");
    });
  });

  it("maneja errores nativos de Firebase Auth en el login tradicional", async () => {
    (
      firebaseAuth.signInWithEmailAndPassword as jest.Mock
    ).mockRejectedValueOnce({
      code: "auth/user-not-found",
    });

    const screen = render(<LoginScreen />);

    act(() => {
      jest.runAllTimers();
    });

    const inputs = screen.getAllByPlaceholderText(" ");

    fireEvent.changeText(inputs[0], "wrong@example.com");
    fireEvent.changeText(inputs[1], "password123");
    fireEvent.press(screen.getByText("button_login"));

    await waitFor(() => {
      expect(screen.getByText("user_not_found")).toBeTruthy();
    });
  });

  it("redirecciona al home si el usuario de Google ya existe en Firestore", async () => {
    (GoogleSignin.signIn as jest.Mock).mockResolvedValueOnce({
      idToken: "mock-google-token",
      user: { email: "existente@gmail.com", name: "John Doe", photo: "" },
    });

    mockGet.mockResolvedValueOnce({ empty: false });
    (firebaseAuth.signInWithCredential as jest.Mock).mockResolvedValueOnce({});

    const screen = render(<LoginScreen />);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText("google_login"));

    await waitFor(() => {
      expect(GoogleSignin.hasPlayServices).toHaveBeenCalled();
      expect(mockCollection).toHaveBeenCalledWith("users");
      expect(firebaseAuth.signInWithCredential).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith("/");
    });
  });

  it("redirige a completar perfil si el usuario de Google es nuevo", async () => {
    (GoogleSignin.signIn as jest.Mock).mockResolvedValueOnce({
      idToken: "mock-new-google-token",
      user: { email: "nuevo@gmail.com", name: "New User", photo: "photo_url" },
    });

    mockGet.mockResolvedValueOnce({ empty: true });

    const screen = render(<LoginScreen />);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText("google_login"));

    await waitFor(() => {
      expect(GoogleSignin.signOut).toHaveBeenCalled();
      expect(router.push).toHaveBeenCalledWith({
        pathname: "/complete-profile",
        params: {
          email: "nuevo@gmail.com",
          name: "New User",
          photo: "photo_url",
          idToken: "mock-new-google-token",
        },
      });
    });
  });

  it("navega correctamente a las pantallas secundarias (Olvidé mi contraseña y registros)", () => {
    const screen = render(<LoginScreen />);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(screen.getByText("forgot_password"));
    expect(router.push).toHaveBeenCalledWith("/forgotPassword");

    fireEvent.press(screen.getByText("register_client"));
    expect(router.push).toHaveBeenCalledWith("/registerClient");

    fireEvent.press(screen.getByText("register_tailor"));
    expect(router.push).toHaveBeenCalledWith("/registerTailor");
  });
});
