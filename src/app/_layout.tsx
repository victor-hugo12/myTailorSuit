import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "@/language";
import en from "./en.json";
import es from "./es.json";
i18n.store(en);
i18n.store(es);

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <SafeAreaProvider>
            <Slot />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
