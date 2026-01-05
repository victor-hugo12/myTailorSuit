// src/screens/SettingsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeLanguage,
  switchTheme,
} from "../../redux/selections/selections.actions";
import {
  selectLanguage,
  selectTheme,
} from "../../redux/selections/selections.selectors";
import i18n from "../../language";

import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import Header from "@/components/Header";
import en from "./en.json";
import es from "./es.json";
import { firebaseAuth } from "@/config/firebaseConfig";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

i18n.store(en);
i18n.store(es);

const themeOptions = [
  { key: "light", labelKey: "light" },
  { key: "dark", labelKey: "dark" },
] as const;

const languageOptions = ["en", "es"] as const;

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  i18n.locale = language;

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    if (!firebaseAuth.onAuthStateChanged) return;
    const unsubscribe = firebaseAuth.onAuthStateChanged((userData) => {
      setUser(userData);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthAction = async () => {
    if (user) {
      // CONFIRMACION ANTES DE LOGOUT
      Alert.alert(
        i18n.t("logoutConfirmTitle") || "Confirmación",
        i18n.t("logoutConfirmMessage") ||
          "¿Estás seguro de que quieres cerrar sesión?",
        [
          { text: i18n.t("cancel") || "Cancelar", style: "cancel" },
          {
            text: i18n.t("logout") || "Cerrar sesión",
            style: "destructive",
            onPress: async () => {
              try {
                await firebaseAuth.signOut();
                setUser(null);
              } catch (error) {
                console.log("Error al cerrar sesión:", error);
              }
            },
          },
        ]
      );
    } else {
      const { router } = require("expo-router");
      router.push("/login");
    }
  };

  return (
    <ThemedSafeAreaView>
      <Header title={i18n.t("settings")} showBackButton />

      <Text style={[styles.sectionTitle, theme === "dark" && styles.textDark]}>
        {i18n.t("theme")}
      </Text>

      <View style={styles.row}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.optionButton,
              theme === "dark" && styles.optionButtonDark,
              theme === option.key && styles.optionButtonActive,
            ]}
            onPress={() => dispatch(switchTheme())}
          >
            <Text
              style={[
                styles.optionText,
                theme === "dark" && styles.optionTextDark,
                theme === option.key && styles.optionTextActive,
              ]}
            >
              {i18n.t(option.labelKey)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, theme === "dark" && styles.textDark]}>
        {i18n.t("language")}
      </Text>

      <View style={styles.row}>
        {languageOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              theme === "dark" && styles.optionButtonDark,
              language === option && styles.optionButtonActive,
            ]}
            onPress={() => dispatch(changeLanguage(option))}
          >
            <Text
              style={[
                styles.optionText,
                theme === "dark" && styles.optionTextDark,
                language === option && styles.optionTextActive,
              ]}
            >
              {option === "en" ? "English" : "Español"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTON LOGIN / LOGOUT CON COLORES DISTINTOS */}
      <View style={styles.authSection}>
        <TouchableOpacity
          style={[
            styles.authButton,
            user ? styles.logoutButton : styles.loginButton,
          ]}
          onPress={handleAuthAction}
        >
          <Text style={styles.authButtonText}>
            {user ? i18n.t("logout") || "Cerrar sesión" : i18n.t("login")}
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  textDark: { color: "#fff" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  row: { flexDirection: "row", gap: 10 },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  optionButtonDark: { backgroundColor: "#1f2933", borderColor: "#6b7280" },
  optionButtonActive: { backgroundColor: "#4f46e5", borderColor: "#4f46e5" },
  optionText: { fontSize: 16, color: "#111827" },
  optionTextDark: { color: "#e5e7eb" },
  optionTextActive: { color: "#fff", fontWeight: "bold" },

  authSection: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  authButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: "#4caf50", // verde para login
  },
  logoutButton: {
    backgroundColor: "#d32f2f", // rojo para logout
  },
  authButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
