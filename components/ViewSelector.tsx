// src/components/ViewSelector.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  active: "local" | "cloud";
  onChange: (view: "local" | "cloud") => void;
}

const ViewSelector: React.FC<Props> = ({ active, onChange }) => (
  <View style={styles.container}>
    <Text
      style={[styles.button, active === "local" && styles.active]}
      onPress={() => onChange("local")}
    >
      Local
    </Text>
    <Text
      style={[styles.button, active === "cloud" && styles.active]}
      onPress={() => onChange("cloud")}
    >
      Nube
    </Text>
  </View>
);

export default ViewSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  active: { backgroundColor: "#0B214A" },
});
