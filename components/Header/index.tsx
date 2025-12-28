// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import i18n from "language";
import en from "./en.json";
import es from "./es.json";
import { useAppSelector } from "redux/hooks";
import { selectTheme } from "redux/selections/selections.selectors";

// 🔹 Firebase modular
import { firebaseAuth, db } from "config/firebaseConfig";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

i18n.store(en);
i18n.store(es);

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showAuthButton?: boolean;
}

export default function Header({
  title,
  showBackButton = true,
  showAuthButton = false,
}: HeaderProps) {
  const theme = useAppSelector(selectTheme);
  const router = useRouter();
  const isDark = theme === "dark";

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profile, setProfile] = useState<{ name: string; role: string } | null>(
    null
  );

  useEffect(() => {
    if (!showAuthButton) return;

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
  }, [showAuthButton]);

  const handleAuthAction = async () => {
    if (user) {
      try {
        await firebaseAuth.signOut();
        setUser(null);
        setProfile(null);
      } catch (error) {
        console.log("Error al cerrar sesión:", error);
      }
    } else {
      router.push("/login");
    }
  };

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

      {showAuthButton && (
        <TouchableOpacity onPress={handleAuthAction} style={styles.authButton}>
          <Text style={[styles.authText, { color: isDark ? "#fff" : "#000" }]}>
            {user
              ? `${profile?.name || "Usuario"} (${profile?.role || "-"})`
              : i18n.t("login")}
          </Text>
        </TouchableOpacity>
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
  authButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  authText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
