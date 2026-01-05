// src/screens/OptionsScreen/components/FabricsFilterPanel.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import i18n from "@/language";
import { useSelector } from "react-redux";
import { selectTheme } from "@/redux/selections/selections.selectors";
import en from "../en.json";
import es from "../es.json";
i18n.store(en);
i18n.store(es);
const TONE_COLORS_MAP: { [key: string]: string } = {
  rojo: "#FF0000",
  negro: "#000000",
  blanco: "#FFFFFF",
  azul: "#0000FF",
  verde: "#00A000",
  amarillo: "#FFFF00",
  gris: "#808080",
  marrón: "#A0522D",
  beige: "#F5F5DC",
  lila: "#C8A2C8",
  naranja: "#FFA500",
  rosa: "#FFC0CB",
};

interface FabricsFilterPanelProps {
  uniqueTones: string[];
  uniqueCompositions: string[];
  activeTones: string[];
  activeCompositions: string[];
  toggleTone: (tone: string) => void;
  toggleComposition: (composition: string) => void;
  clearFilters: () => void;
  theme?: "light" | "dark";
}

const FabricsFilterPanel: React.FC<FabricsFilterPanelProps> = ({
  uniqueTones,
  uniqueCompositions,
  activeTones,
  activeCompositions,
  toggleTone,
  toggleComposition,
  clearFilters,
  theme,
}) => {
  const reduxTheme = useSelector(selectTheme);
  const currentTheme = theme || reduxTheme;

  const [tonesExpanded, setTonesExpanded] = useState(true);
  const [compositionsExpanded, setCompositionsExpanded] = useState(true);

  const styles = getDynamicStyles(currentTheme);

  return (
    <View style={styles.panelContainer}>
      <ScrollView contentContainerStyle={styles.filtersContainer}>
        {/* CLEAR */}
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>{i18n.t("ClearFilters")}</Text>
        </TouchableOpacity>

        {/* TONOS */}
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setTonesExpanded((prev) => !prev)}
        >
          <Text style={styles.sectionButtonText}>
            {tonesExpanded ? "▼ " : "▶ "} {i18n.t("Tonos")}
          </Text>
        </TouchableOpacity>
        {tonesExpanded && (
          <FlatList
            horizontal
            data={uniqueTones}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingVertical: 5 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.toneCircle,
                  { backgroundColor: TONE_COLORS_MAP[item] || "#ccc" },
                  activeTones.includes(item) && styles.activeTone,
                ]}
                onPress={() => toggleTone(item)}
              />
            )}
          />
        )}

        {/* COMPOSICIÓN */}
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setCompositionsExpanded((prev) => !prev)}
        >
          <Text style={styles.sectionButtonText}>
            {compositionsExpanded ? "▼ " : "▶ "} {i18n.t("Composición")}
          </Text>
        </TouchableOpacity>
        {compositionsExpanded && (
          <FlatList
            horizontal
            data={uniqueCompositions}
            keyExtractor={(item) => item}
            contentContainerStyle={{ paddingVertical: 5 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.compositionItem,
                  activeCompositions.includes(item) && styles.activeComposition,
                ]}
                onPress={() => toggleComposition(item)}
              >
                <Text style={styles.compositionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default FabricsFilterPanel;

const getDynamicStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  return StyleSheet.create({
    panelContainer: {
      width: "100%",
      backgroundColor: isDark ? "#1E1E1E" : "#fff",
      borderBottomWidth: 1,
      borderColor: isDark ? "#333" : "#eee",
      paddingVertical: 10,
      zIndex: 10,
    },
    filtersContainer: { paddingHorizontal: 10 },
    clearButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: isDark ? "#333" : "#ccc",
      borderRadius: 6,
      alignItems: "center",
      marginBottom: 12,
    },
    clearButtonText: {
      fontWeight: "bold",
      color: isDark ? "#E0E0E0" : "#0B214A",
    },
    sectionButton: {
      paddingVertical: 8,
      marginTop: 8,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#333" : "#eee",
    },
    sectionButtonText: {
      fontWeight: "bold",
      color: isDark ? "#E0E0E0" : "#000",
      fontSize: 14,
    },
    toneCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDark ? "#555" : "#ccc",
      marginRight: 8,
    },
    activeTone: {
      borderWidth: 3,
      borderColor: isDark ? "#4F46E5" : "#0B214A",
    },
    compositionItem: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginRight: 8,
      borderWidth: 1,
      borderColor: isDark ? "#555" : "#ccc",
      borderRadius: 6,
      backgroundColor: isDark ? "#2D2D2D" : "transparent",
    },
    activeComposition: {
      backgroundColor: isDark ? "#4F46E5" : "#0B214A",
    },
    compositionText: { color: isDark ? "#E0E0E0" : "#000" },
  });
};
