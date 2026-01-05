import React, { useEffect, useState } from "react";
import { Text, Platform, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ActivityIndicator } from "react-native-paper";

import { firebaseAuth } from "@/config/firebaseConfig";
import i18n from "@/language";

export default function TabsLayout() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((usr) => {
      setUser(usr);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          height: Platform.OS === "ios" ? 90 : 65,
          paddingBottom: Platform.OS === "ios" ? 20 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12 }}>{i18n.t("home")}</Text>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12 }}>{i18n.t("settings")}</Text>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="suits"
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12 }}>{i18n.t("suits")}</Text>
          ),
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="hanger" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="my_orders"
        options={{
          tabBarItemStyle: user ? undefined : { display: "none" },
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12 }}>{i18n.t("orders")}</Text>
          ),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
