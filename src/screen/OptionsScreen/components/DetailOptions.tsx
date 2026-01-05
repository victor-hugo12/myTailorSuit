// src/screens/OptionsScreen/components/DetailOptions.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import i18n from "../../../language";
import { BACK_LABELS } from "../constants";

import OptionGroups from "@/components/OptionGroups";
import OptionsList from "@/components/OptionsList";
import en from "../en.json";
import es from "../es.json";
i18n.store(en);
i18n.store(es);
interface Option {
  id: number;
  label: string;
}

interface OptionGroup {
  label: string;
  icon?: any;
  options: Option[];
}

interface DetailOptionsProps {
  theme: "light" | "dark";
  currentOptionGroups: OptionGroup[];
  selectedOptions: { [key: string]: number | undefined };
  showBackView: boolean;
  setShowBackView: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectOption: (groupLabel: string, optionId: number) => void;
}

export default function DetailOptions({
  theme,
  currentOptionGroups,
  selectedOptions,
  showBackView,
  setShowBackView,
  onSelectOption,
}: DetailOptionsProps) {
  const [activeGroupLabel, setActiveGroupLabel] = useState(
    currentOptionGroups[0]?.label || ""
  );

  useEffect(() => {
    if (
      !currentOptionGroups.some((g) => g.label === activeGroupLabel) &&
      currentOptionGroups.length > 0
    ) {
      setActiveGroupLabel(currentOptionGroups[0].label);
    }
  }, [currentOptionGroups, activeGroupLabel]);

  const activeGroup = currentOptionGroups.find(
    (g) => g.label === activeGroupLabel
  );

  const handleSelectOption = (optionId: string | number) => {
    if (!activeGroup) return;

    const numeric =
      typeof optionId === "string" ? parseInt(optionId, 10) : optionId;

    // Disparar callback hacia OptionsScreen
    onSelectOption(activeGroup.label, numeric);

    // Manejar vista posterior si corresponde
    const shouldShowBack = BACK_LABELS.includes(activeGroup.label);
    if (showBackView !== shouldShowBack) {
      setShowBackView(shouldShowBack);
    }
  };

  const dynamicStyles = getDynamicStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      {currentOptionGroups.length > 0 && (
        <OptionGroups
          groups={currentOptionGroups.map(({ label, icon }) => ({
            label,
            icon,
          }))}
          activeGroupLabel={activeGroupLabel}
          onSelectGroup={setActiveGroupLabel}
          renderLabel={(label) => <Text>{i18n.t(label)}</Text>}
        />
      )}

      {activeGroup && (
        <OptionsList
          options={activeGroup.options}
          activeOptionId={selectedOptions[activeGroup.label]}
          onSelectOption={handleSelectOption}
          renderLabel={(label) => (
            <Text style={dynamicStyles.optionLabelText}>{i18n.t(label)}</Text>
          )}
        />
      )}
    </View>
  );
}

// 🔹 Estilos dinámicos según tema
const getDynamicStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";
  return StyleSheet.create({
    container: { backgroundColor: isDark ? "#000" : "#fff" },
    optionLabelText: {
      color: isDark ? "#E0E0E0" : "#000",
      fontSize: 13,
      fontWeight: "400",
    },
  });
};
