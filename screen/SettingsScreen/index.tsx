import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
import en from "./en.json";
import es from "./es.json";
import ThemedSafeAreaView from "components/ThemedSafeAreaView";
import Header from "components/Header";

i18n.store(en);
i18n.store(es);

const themeOptions = ["light", "dark"];
const languageOptions = ["en", "es"];

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  return (
    <ThemedSafeAreaView>
      <Header title={i18n.t("settings")} showBackButton />

      {/* Tema */}
      <Text style={[styles.sectionTitle, theme === "dark" && styles.textDark]}>
        {i18n.t("theme")}
      </Text>
      <View style={styles.row}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              theme === "dark" && styles.optionButtonDark,
              theme === option && styles.optionButtonActive,
            ]}
            onPress={() => dispatch(switchTheme())}
          >
            <Text
              style={[
                styles.optionText,
                theme === "dark" && styles.optionTextDark,
                theme === option && styles.optionTextActive,
              ]}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Idioma */}
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
            onPress={() => dispatch(changeLanguage(option as "en" | "es"))}
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
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

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
    backgroundColor: "#f3f4f6", // fondo claro
  },

  optionButtonDark: {
    backgroundColor: "#1f2933", // fondo oscuro
    borderColor: "#6b7280",
  },

  optionButtonActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },

  optionText: {
    fontSize: 16,
    color: "#111827", // texto claro en modo claro
  },

  optionTextDark: {
    color: "#e5e7eb", // texto legible en oscuro
  },

  optionTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
