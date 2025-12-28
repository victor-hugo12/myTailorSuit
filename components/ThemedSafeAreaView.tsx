// src/components/ThemedSafeAreaView.tsx
import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, ViewStyle, Platform } from "react-native";
import { useAppSelector } from "../redux/hooks";
import { selectTheme } from "../redux/selections/selections.selectors";

interface ThemedSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export default function ThemedSafeAreaView({
  children,
  style,
}: ThemedSafeAreaViewProps) {
  const theme = useAppSelector(selectTheme);
  const isDark = theme === "dark";

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#1f1f1f" : "#fff",
          paddingTop: Platform.OS === "android" ? 20 : 0,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
