// src/components/OptionGroups.tsx
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useAppSelector } from "../redux/hooks";
import { selectTheme } from "redux/selections/selections.selectors";

export interface OptionGroup {
  label: string;
  icon?: any;
}

interface OptionGroupsProps {
  groups: OptionGroup[];
  activeGroupLabel: string;
  onSelectGroup: (label: string) => void;
  renderLabel?: (label: string) => React.ReactNode;
}

export default function OptionGroups({
  groups,
  activeGroupLabel,
  onSelectGroup,
  renderLabel,
}: OptionGroupsProps) {
  const theme = useAppSelector(selectTheme); // "light" | "dark"

  const styles = getStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        { justifyContent: "center", flexGrow: 1 },
      ]}
    >
      {groups.map((group) => (
        <TouchableOpacity
          key={group.label}
          style={[
            styles.button,
            activeGroupLabel === group.label && styles.activeButton,
          ]}
          onPress={() => onSelectGroup(group.label)}
        >
          {group.icon && <Image source={group.icon} style={styles.icon} />}
          {renderLabel ? (
            renderLabel(group.label)
          ) : (
            <Text style={styles.label}>{group.label}</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// Estilos dinámicos según tema
const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      gap: 10,
      backgroundColor: theme === "light" ? "#f0f0f0" : "#1E1E1E",
      borderBottomWidth: 1,
      borderBottomColor: theme === "light" ? "#ccc" : "#333",
      marginTop: 5,
    },
    button: {
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: theme === "light" ? "#fff" : "#2A2A2A",
      borderRadius: 0,
      borderWidth: 1,
      borderColor: theme === "light" ? "#ccc" : "#555",
      minWidth: 90,
    },
    activeButton: {
      backgroundColor: theme === "light" ? "#D9D9D9" : "#3A3A3A",
      borderColor: theme === "light" ? "#4A90E2" : "#6EA0FF",
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: "contain",
      tintColor: theme === "light" ? "#0B214A" : "#fff",
    },
    label: {
      fontSize: 12,
      color: theme === "light" ? "#0B214A" : "#fff",
      textAlign: "center",
      marginTop: 5,
      fontWeight: "600",
    },
  });
