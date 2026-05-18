import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import auth, { firebase } from "@react-native-firebase/auth";
import Header from "@/components/Header";
import i18n from "@/language";
import { useAppSelector } from "@/redux/hooks";
import { selectTheme } from "@/redux/selections/selections.selectors";

import en from "./en.json";
import es from "./es.json";

i18n.store(en);
i18n.store(es);

export default function CompleteProfileScreen() {
  const theme = useAppSelector(selectTheme);

  const styles = getStyles(theme);

  const isDark = theme === "dark";

  // ==========================
  // PARAMS
  // ==========================
  const params = useLocalSearchParams();

  const googleEmail = String(params.email || "");

  const googleName = String(params.name || "");

  const googlePhoto = String(params.photo || "");

  const idToken = String(params.idToken || "");

  // ==========================
  // STATES
  // ==========================
  const [role, setRole] = useState<"client" | "tailor">("client");

  const [shop, setShop] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const textColor = isDark ? "#ffffff" : "#000000";

  const outlineColor = isDark ? "#555555" : "#cccccc";

  const activeOutlineColor = isDark ? "#ffffff" : "#6200ee";

  // ==========================
  // SAVE PROFILE
  // ==========================
  const handleSave = async () => {
    // validar tienda
    if (role === "tailor" && !shop.trim()) {
      Alert.alert(i18n.t("error"), i18n.t("shop_required"));

      return;
    }

    // validar password
    if (password.length < 6) {
      Alert.alert(
        i18n.t("error"),
        "La contraseña debe tener al menos 6 caracteres",
      );

      return;
    }

    // validar token
    if (!idToken) {
      Alert.alert(i18n.t("error"), "Missing Google token");

      return;
    }

    try {
      setLoading(true);

      // ==========================
      // LOGIN GOOGLE
      // ==========================
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential =
        await auth().signInWithCredential(googleCredential);

      const user = userCredential.user;

      // ==========================
      // LINK EMAIL/PASSWORD
      // ==========================
      const emailCredential = firebase.auth.EmailAuthProvider.credential(
        googleEmail,
        password,
      );

      await user.linkWithCredential(emailCredential);

      // ==========================
      // FIRESTORE
      // ==========================
      const userData: any = {
        createdAt: firestore.FieldValue.serverTimestamp(),

        email: googleEmail || user.email || "",

        name: googleName || user.displayName || "",

        photo: googlePhoto || user.photoURL || "",

        role,
      };

      // SI ES SASTRE
      if (role === "tailor") {
        userData.shop = shop.trim();
      }

      await firestore().collection("users").doc(user.uid).set(userData);

      // ==========================
      // HOME
      // ==========================
      router.replace("/");
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        i18n.t("error"),
        error.message || i18n.t("profile_save_error"),
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // UI
  // ==========================
  return (
    <View style={styles.container}>
      <Header title={i18n.t("complete_profile")} showBackButton={false} />

      <Text style={styles.label}>{i18n.t("user_type")}</Text>

      <View style={styles.roleContainer}>
        {/* CLIENT */}
        <TouchableOpacity
          style={[
            styles.roleButton,

            role === "client" && styles.roleButtonActive,
          ]}
          onPress={() => setRole("client")}
        >
          <Text
            style={[
              styles.roleText,

              role === "client" && styles.roleTextActive,
            ]}
          >
            {i18n.t("client")}
          </Text>
        </TouchableOpacity>

        {/* TAILOR */}
        <TouchableOpacity
          style={[
            styles.roleButton,

            role === "tailor" && styles.roleButtonActive,
          ]}
          onPress={() => setRole("tailor")}
        >
          <Text
            style={[
              styles.roleText,

              role === "tailor" && styles.roleTextActive,
            ]}
          >
            {i18n.t("tailor")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* SHOP */}
      {role === "tailor" && (
        <TextInput
          label={i18n.t("shop_name")}
          mode="outlined"
          value={shop}
          onChangeText={setShop}
          style={styles.input}
          textColor={textColor}
          outlineColor={outlineColor}
          activeOutlineColor={activeOutlineColor}
        />
      )}

      {/* PASSWORD */}
      <TextInput
        label="Contraseña"
        mode="outlined"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        textColor={textColor}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      {/* BUTTON */}
      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {i18n.t("save_profile")}
      </Button>
    </View>
  );
}

function getStyles(theme: string) {
  const isDark = theme === "dark";

  return StyleSheet.create({
    container: {
      flex: 1,

      padding: 20,

      justifyContent: "center",

      backgroundColor: isDark ? "#0d0d0d" : "#ffffff",
    },

    label: {
      fontSize: 16,

      fontWeight: "bold",

      marginBottom: 12,

      color: isDark ? "#ffffff" : "#000000",
    },

    roleContainer: {
      flexDirection: "row",

      gap: 10,

      marginBottom: 20,
    },

    roleButton: {
      flex: 1,

      paddingVertical: 14,

      borderRadius: 10,

      borderWidth: 1,

      borderColor: isDark ? "#555" : "#ccc",

      alignItems: "center",
    },

    roleButtonActive: {
      backgroundColor: "#4f46e5",

      borderColor: "#4f46e5",
    },

    roleText: {
      fontWeight: "bold",

      color: isDark ? "#fff" : "#000",
    },

    roleTextActive: {
      color: "#fff",
    },

    input: {
      marginBottom: 18,

      backgroundColor: isDark ? "#1a1a1a" : "#fff",
    },

    button: {
      marginTop: 10,

      backgroundColor: "#4f46e5",
    },
  });
}
