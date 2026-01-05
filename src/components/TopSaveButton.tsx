// src/components/TopSaveButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
  label?: string;
}

const TopSaveButton: React.FC<Props> = ({ onPress, label = "Guardar" }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

export default TopSaveButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 90,
    right: 16,
    backgroundColor: "#0B214A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    zIndex: 10,
  },
  text: { color: "white", fontWeight: "bold", fontSize: 14 },
});
