// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { Platform, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import i18n from "@/language";
import en from "./en.json";
import es from "./es.json";
import { useAppSelector } from "@/redux/hooks";
import { selectTheme } from "@/redux/selections/selections.selectors";

// Firebase modular (SOLO mostrar usuario, sin acciones)
import { firebaseAuth, db } from "@/config/firebaseConfig";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

i18n.store(en);
i18n.store(es);

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showUserInfo?: boolean;
}

export default function Header({
  title,
  showBackButton = true,
  showUserInfo = false,
}: HeaderProps) {
  const theme = useAppSelector(selectTheme);
  const router = useRouter();
  const isDark = theme === "dark";

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profile, setProfile] = useState<{ name: string; role: string } | null>(
    null
  );

  useEffect(() => {
    if (!showUserInfo) return;

    const unsubscribe = firebaseAuth.onAuthStateChanged(async (userData) => {
      setUser(userData);

      if (userData) {
        try {
          const userDoc = await db.collection("users").doc(userData.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setProfile({
              name: (data as any)?.name || "Usuario",
              role: (data as any)?.role || "cliente",
            });
          }
        } catch (error) {
          console.log("Error obteniendo datos del usuario:", error);
        }
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, [showUserInfo]);

  return (
    <Appbar.Header
      statusBarHeight={0}
      style={[
        styles.header,
        {
          backgroundColor: isDark ? "#2c2c2c" : "#fff",
          paddingTop: Platform.OS === "android" ? 20 : 0,
          width: "100%",
        },
      ]}
    >
      {showBackButton && (
        <Appbar.BackAction
          onPress={() => router.back()}
          color={isDark ? "#fff" : "#000"}
        />
      )}

      <Appbar.Content
        title={title}
        titleStyle={[styles.title, { color: isDark ? "#fff" : "#000" }]}
      />

      {/* Muestra nombre y rol del usuario autenticado */}
      {showUserInfo && user && profile && (
        <Text style={[styles.userText, { color: isDark ? "#fff" : "#000" }]}>
          {profile.name} ({profile.role})
        </Text>
      )}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  userText: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 12,
  },
});
