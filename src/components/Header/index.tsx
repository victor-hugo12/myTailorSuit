import React, { useEffect, useState } from "react";

import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";

import { Appbar, Avatar, Menu, Divider, Text } from "react-native-paper";

import { useRouter } from "expo-router";

import i18n from "@/language";

import en from "./en.json";

import es from "./es.json";

import { useAppSelector } from "@/redux/hooks";

import { selectTheme } from "@/redux/selections/selections.selectors";

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

  const styles = getStyles(theme);

  const isDark = theme === "dark";

  const [menuVisible, setMenuVisible] = useState(false);

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const [profile, setProfile] = useState<{
    name: string;
    role: string;
  } | null>(null);

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
              name:
                (data as any)?.name || userData.displayName || i18n.t("user"),

              role: (data as any)?.role || i18n.t("client"),
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

  const initials =
    profile?.name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      setMenuVisible(false);

      await firebaseAuth.signOut();

      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Appbar.Header statusBarHeight={0} style={styles.header}>
      {showBackButton && (
        <Appbar.BackAction
          onPress={() => router.back()}
          color={isDark ? "#ffffff" : "#000000"}
        />
      )}

      <Appbar.Content
        title={title}
        style={styles.content}
        titleStyle={styles.title}
      />

      {showUserInfo && user && profile && (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          contentStyle={styles.menuContent}
          anchor={
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.avatarContainer}
              activeOpacity={0.8}
            >
              <Avatar.Text
                size={40}
                label={initials}
                style={styles.avatar}
                labelStyle={styles.avatarLabel}
              />
            </TouchableOpacity>
          }
        >
          <View style={styles.menuHeader}>
            <Text style={styles.userName}>{profile.name}</Text>

            <Text style={styles.userRole}>{profile.role}</Text>
          </View>

          <Divider />

          <Menu.Item
            leadingIcon="account-circle"
            titleStyle={styles.menuItemTitle}
            theme={{
              colors: {
                onSurface: isDark ? "#ffffff" : "#000000",
              },
            }}
            onPress={() => {
              setMenuVisible(false);

              router.push("/profile");
            }}
            title={i18n.t("profile")}
          />

          <Menu.Item
            leadingIcon="cog"
            titleStyle={styles.menuItemTitle}
            theme={{
              colors: {
                onSurface: isDark ? "#ffffff" : "#000000",
              },
            }}
            onPress={() => {
              setMenuVisible(false);

              router.push("/settings");
            }}
            title={i18n.t("settings")}
          />

          <Divider />

          <Menu.Item
            leadingIcon="logout"
            titleStyle={styles.menuItemTitle}
            theme={{
              colors: {
                onSurface: isDark ? "#ffffff" : "#000000",
              },
            }}
            onPress={handleLogout}
            title={i18n.t("logout")}
          />
        </Menu>
      )}
    </Appbar.Header>
  );
}

function getStyles(theme: string) {
  const isDark = theme === "dark";

  return StyleSheet.create({
    header: {
      elevation: 0,

      shadowOpacity: 0,

      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      backgroundColor: isDark ? "#2c2c2c" : "#ffffff",

      paddingTop: Platform.OS === "android" ? 20 : 0,
    },

    content: {
      flex: 1,
    },

    title: {
      fontWeight: "bold",

      fontSize: 18,

      color: isDark ? "#ffffff" : "#000000",
    },

    avatarContainer: {
      marginRight: 10,
    },

    avatar: {
      backgroundColor: isDark ? "#4f46e5" : "#1A2332",
    },

    avatarLabel: {
      color: "#ffffff",

      fontWeight: "bold",
    },

    menuContent: {
      backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
    },

    menuHeader: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },

    userName: {
      fontWeight: "bold",
      fontSize: 16,
      color: isDark ? "#ffffff" : "#000000",
    },

    userRole: {
      opacity: 0.7,
      marginTop: 2,
      textTransform: "capitalize",
      color: isDark ? "#cccccc" : "#666666",
    },
    menuItemTitle: {
      color: isDark ? "#ffffff" : "#000000",
    },
  });
}
