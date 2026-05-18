import React, { useEffect, useState } from "react";

import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Divider, Text } from "react-native-paper";
import Header from "@/components/Header";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import { selectTheme } from "@/redux/selections/selections.selectors";
import { firebaseAuth, db } from "@/config/firebaseConfig";
import i18n from "@/language";
import en from "./en.json";
import es from "./es.json";

i18n.store(en);

i18n.store(es);

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  const styles = getStyles(theme);
  const isDark = theme === "dark";

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = firebaseAuth.currentUser;

        if (!user) return;

        const userDoc = await db.collection("users").doc(user.uid).get();

        const data = userDoc.data();

        setProfile({
          name: (data as any)?.name || user.displayName || i18n.t("user"),

          email: user.email || "",

          role: (data as any)?.role || "cliente",
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadProfile();
  }, []);

  const initials =
    profile.name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <ThemedSafeAreaView>
      <Header title={i18n.t("title")} showBackButton />

      <ScrollView contentContainerStyle={styles.container}>
        <Avatar.Text
          size={90}
          label={initials}
          style={styles.avatar}
          labelStyle={styles.avatarLabel}
        />

        <Text style={styles.name}>{profile.name}</Text>

        <Text style={styles.role}>{profile.role}</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>{i18n.t("email")}</Text>

            <Text style={styles.value}>{profile.email}</Text>

            <Divider style={styles.divider} />

            <Text style={styles.label}>{i18n.t("role")}</Text>

            <Text style={styles.value}>{profile.role}</Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => router.push("/settings")}
        >
          {i18n.t("settings")}
        </Button>

        <Button
          mode="outlined"
          style={styles.logoutButton}
          onPress={async () => {
            await firebaseAuth.signOut();

            router.replace("/login");
          }}
        >
          {i18n.t("logout")}
        </Button>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

function getStyles(theme: string) {
  const isDark = theme === "dark";

  return StyleSheet.create({
    container: {
      padding: 20,
      alignItems: "center",
    },
    avatar: {
      backgroundColor: isDark ? "#4f46e5" : "#1A2332",
    },
    avatarLabel: {
      color: "#fff",
      fontWeight: "bold",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 15,
      color: isDark ? "#fff" : "#000",
    },
    role: {
      fontSize: 16,
      marginTop: 4,
      marginBottom: 20,
      textTransform: "capitalize",
      color: isDark ? "#ccc" : "#666",
    },
    card: {
      width: "100%",
      borderRadius: 14,
      marginBottom: 20,
      backgroundColor: isDark ? "#1f1f1f" : "#fff",
    },
    label: {
      fontSize: 14,
      opacity: 0.7,
      marginBottom: 5,
      color: isDark ? "#ccc" : "#666",
    },
    value: {
      fontSize: 16,
      fontWeight: "500",
      color: isDark ? "#fff" : "#000",
    },
    divider: {
      marginVertical: 15,
      backgroundColor: isDark ? "#333" : "#ddd",
    },
    button: {
      width: "100%",
      marginBottom: 10,
    },
    logoutButton: {
      width: "100%",
      borderColor: isDark ? "#666" : "#999",
    },
  });
}
