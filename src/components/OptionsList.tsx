// src/components/OptionsList.tsx
import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectTheme } from "@/redux/selections/selections.selectors";

export interface Option {
  id: string | number;
  label: string;
}

interface OptionsListProps {
  options: Option[];
  activeOptionId: string | number | undefined;
  onSelectOption: (optionId: string | number) => void;
  renderLabel?: (label: string) => React.ReactNode;
  horizontal?: boolean;
}

export default function OptionsList({
  options,
  activeOptionId,
  onSelectOption,
  renderLabel,
  horizontal = true,
}: OptionsListProps) {
  const theme = useSelector(selectTheme); // 🔹 Obtener el tema desde Redux

  // 🔹 Obtener estilos dinámicos basados en el tema
  const dynamicStyles = getDynamicStyles(theme);

  return (
    <ScrollView
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={dynamicStyles.container}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            dynamicStyles.optionButton,
            activeOptionId === option.id && dynamicStyles.optionButtonActive,
          ]}
          onPress={() => onSelectOption(option.id)}
        >
          {renderLabel ? (
            renderLabel(option.label)
          ) : (
            <Text
              style={[
                dynamicStyles.optionText,
                activeOptionId === option.id && dynamicStyles.optionTextActive,
              ]}
            >
              {option.label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// 🔹 Función para obtener estilos dinámicos basados en el tema
const getDynamicStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 10,
      gap: 5,
      backgroundColor: isDark ? "#1E1E1E" : "transparent",
    },
    optionButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 0,
      borderWidth: 0,
      backgroundColor: isDark ? "#333" : "#ccc",
      alignItems: "center",
      minWidth: 100,
      height: 40,
      justifyContent: "center",
    },
    optionButtonActive: {
      backgroundColor: isDark ? "#4F46E5" : "#0B214A",
    },
    optionText: {
      color: isDark ? "#E0E0E0" : "#0B214A",
      fontSize: 13,
      fontWeight: "500",
    },
    optionTextActive: {
      color: "#fff",
      fontWeight: "700",
    },
  });
};
