import "react-native-gesture-handler";

import i18n from "@/language";
import en from "./en.json";
import es from "./es.json";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store, persistor } from "@/redux/store";

i18n.store(en);
i18n.store(es);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <SafeAreaProvider>
              <Slot />
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
