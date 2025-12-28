// app/(tabs)/_layout.tsx
import React from "react";
import { Text, Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "language";
import en from "./en.json";
import es from "./es.json";
import { useAppSelector } from "redux/hooks";
import { selectTheme } from "redux/selections/selections.selectors";

i18n.store(en);
i18n.store(es);

export default function TabsLayout() {
  const theme = useAppSelector(selectTheme);
  const isDark = theme === "dark";

  const tabBarBackground = isDark ? "#111" : "#fff";
  const tabBarBorder = isDark ? "#333" : "#ccc";
  const activeColor = isDark ? "#8b5cf6" : "#4f46e5";
  const inactiveColor = isDark ? "#aaa" : "#888";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarBackground,
          borderTopWidth: 0.5,
          borderTopColor: tabBarBorder,
          height: Platform.OS === "ios" ? 90 : 65,
          paddingBottom: Platform.OS === "ios" ? 20 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12 }}>{i18n.t("home")}</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12 }}>{i18n.t("settings")}</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* SUITS */}
      <Tabs.Screen
        name="suits"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12 }}>{i18n.t("suits")}</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hanger" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
