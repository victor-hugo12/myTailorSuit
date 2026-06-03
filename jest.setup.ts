import "react-native-gesture-handler/jestSetup";

// --- INICIO: FILTRO PARA WARNINGS DE "act(...)" ---
const originalError = console.error;
const originalLog = console.log;

beforeAll(() => {
  // 1. Silenciar advertencias de act(...)
  console.error = (...args) => {
    if (
      /Warning: An update to .* inside a test was not wrapped in act\(...\)/.test(
        args[0],
      ) ||
      /Warning: An update to Animated\(View\) inside a test was not wrapped in act\(...\)/.test(
        args[0],
      )
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  // 2. Silenciar todos los console.log de la app durante los tests
  console.log = () => {};
});

afterAll(() => {
  console.error = originalError;
  console.log = originalLog; // Restaurar logs al terminar
});
// --- FIN: FILTRO ---

jest.mock("redux-persist", () => {
  return {
    persistReducer: jest.fn((config, reducers) => reducers),
    persistStore: jest.fn(() => ({
      purge: jest.fn(),
      flush: jest.fn(),
      pause: jest.fn(),
      persist: jest.fn(),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn(),
    })),
  };
});

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
  MaterialCommunityIcons: "MaterialCommunityIcons",
  Ionicons: "Ionicons",
  Feather: "Feather",
  FontAwesome: "FontAwesome",
  AntDesign: "AntDesign",
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  Provider: ({ children }: any) => children,
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: jest.fn(() => ({})),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
  Link: ({ children }: any) => children,
}));

jest.mock("@react-native-firebase/app", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    app: jest.fn(),
  })),
}));

jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    currentUser: null,
  })),
}));

jest.mock("@react-native-firebase/firestore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
      })),
    })),
  })),
}));

jest.mock("@react-native-google-signin/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    signInSilently: jest.fn(),
    signOut: jest.fn(),
    revokeAccess: jest.fn(),
    getTokens: jest.fn(),
    isSignedIn: jest.fn(),
    ERROR_CODES: {
      SIGN_IN_CANCELLED: "SIGN_IN_CANCELLED",
      IN_PROGRESS: "IN_PROGRESS",
      PLAY_SERVICES_NOT_AVAILABLE: "PLAY_SERVICES_NOT_AVAILABLE",
    },
  },
}));

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaConsumer: ({
      children,
    }: {
      children: (insets: any) => React.ReactNode;
    }) => children(inset),
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});
