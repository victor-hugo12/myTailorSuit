import React, { useEffect, useState } from "react";
import { Text, Platform, View, ActivityIndicator } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { firebaseAuth } from "config/firebaseConfig"; // instancia modular
import i18n from "language";
import en from "../(tabs)/en.json";
import es from "../(tabs)/es.json";

import { useAppSelector } from "redux/hooks";
import { selectTheme } from "redux/selections/selections.selectors";

i18n.store(en);
i18n.store(es);

export default function AuthTabsLayout() {
  const theme = useAppSelector(selectTheme);
  const isDark = theme === "dark";

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: () => void;

    try {
      unsubscribe = firebaseAuth.onAuthStateChanged((usr) => {
        setUser(usr);
        setLoading(false);
        if (!usr) router.replace("/(tabs)");
      });
    } catch (e) {
      console.log("Firebase no inicializado:", e);
      setLoading(false);
    }

    return () => unsubscribe?.();
  }, [router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) return null;

  const tabBarBackground = isDark ? "#111" : "#fff";
  const tabBarBorder = isDark ? "#333" : "#ccc";
  const activeColor = isDark ? "#8b5cf6" : "#4f46e5";
  const inactiveColor = isDark ? "#aaa" : "#888";

  const tabs = [
    {
      name: "index",
      label: i18n.t("home"),
      icon: (focused: boolean, size: number, color: string) => (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={size}
          color={color}
        />
      ),
    },
    {
      name: "settings",
      label: i18n.t("settings"),
      icon: (focused: boolean, size: number, color: string) => (
        <Ionicons
          name={focused ? "settings" : "settings-outline"}
          size={size}
          color={color}
        />
      ),
    },
    {
      name: "suits",
      label: i18n.t("suits"),
      icon: (_focused: boolean, size: number, color: string) => (
        <MaterialCommunityIcons name="hanger" size={size} color={color} />
      ),
    },
    {
      name: "my_orders",
      label: i18n.t("orders"),
      icon: (_focused: boolean, size: number, color: string) => (
        <Ionicons name="cart-outline" size={size} color={color} />
      ),
    },
  ];

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
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontSize: 12 }}>{tab.label}</Text>
            ),
            tabBarIcon: ({ focused, size, color }) =>
              tab.icon(focused, size, color),
          }}
        />
      ))}
    </Tabs>
  );
}
