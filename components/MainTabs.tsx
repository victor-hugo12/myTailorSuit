// src/components/MainTabs.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MainTabsProps {
  tabs: { label: string }[];
  activeTab: string;
  onChangeTab: (label: string) => void;
}

const MainTabs: React.FC<MainTabsProps> = ({
  tabs,
  activeTab,
  onChangeTab,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={[styles.tabButton, activeTab === tab.label && styles.active]}
          onPress={() => onChangeTab(tab.label)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.label && styles.activeText,
            ]}
          >
            {tab.label.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MainTabs;

const styles = StyleSheet.create({
  container: { flexDirection: "row", backgroundColor: "#0B214A", height: 50 },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "transparent",
  },
  active: { borderBottomColor: "white" },
  tabText: { color: "white", fontSize: 16, fontWeight: "bold" },
  activeText: { color: "white" },
});
