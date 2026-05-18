import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";

import { useLocalSearchParams, router } from "expo-router";

import firestore from "@react-native-firebase/firestore";
import { firebaseAuth, db } from "@/config/firebaseConfig";

import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/selections/selections.selectors";

import Header from "@/components/Header";

import i18n from "@/language";
import en from "./en.json";
import es from "./es.json";

i18n.store(en);
i18n.store(es);

export default function VerifyEmailScreen() {
  const { verificationId, email, password, name, role, shop } =
    useLocalSearchParams();

  const theme = useAppSelector(selectTheme);

  const styles = getStyles(theme);

  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  const outlineColor = theme === "dark" ? "#555555" : "#cccccc";

  const activeOutlineColor = theme === "dark" ? "#ffffff" : "#6200ee";

  const [code, setCode] = useState("");

  const [error, setError] = useState("");

  const [info, setInfo] = useState("");

  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async (
    email: string,
    name: string,
    code: string,
  ) => {
    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_8hz8b5k",
            template_id: "template_v5hwur4",
            user_id: "6lfXJtaegeASdYWwS",
            template_params: {
              name,
              email,
              code,
            },
          }),
        },
      );

      return response.status === 200;
    } catch (error) {
      console.log("Email error:", error);

      return false;
    }
  };

  const verifyCode = async () => {
    setError("");

    setLoading(true);

    try {
      const docRef = db
        .collection("email_verifications")
        .doc(String(verificationId));

      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        throw new Error(i18n.t("verification_not_found"));
      }

      const data: any = docSnap.data();

      if (data.expireAt && data.expireAt.toDate() < new Date()) {
        throw new Error(i18n.t("code_expired"));
      }

      if (data.code !== code) {
        throw new Error(i18n.t("invalid_code"));
      }

      // 🔥 CREAR USUARIO AUTH
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        String(email),
        String(password),
      );

      // 🔥 DATA BASE
      const userData: any = {
        role: String(role || "client"),
        name: String(name),
        email: String(email),
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      // 🔥 SI ES SASTRE AGREGAR SHOP
      if (String(role) === "tailor" && shop) {
        userData.shop = String(shop);
      }

      // 🔥 GUARDAR USUARIO
      await db.collection("users").doc(userCredential.user.uid).set(userData);

      // 🔥 BORRAR VERIFICACIÓN
      await docRef.delete();

      router.replace("/");
    } catch (err: any) {
      console.log(err);

      setError(err.message);
    }

    setLoading(false);
  };

  const resendCode = async () => {
    setError("");

    setInfo("");

    setResendLoading(true);

    try {
      const docRef = db
        .collection("email_verifications")
        .doc(String(verificationId));

      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        throw new Error(i18n.t("verification_not_found"));
      }

      const data: any = docSnap.data();

      const newCode = generateVerificationCode();

      await docRef.update({
        code: newCode,
        createdAt: firestore.FieldValue.serverTimestamp(),
        expireAt: new Date(Date.now() + 10 * 60 * 1000),
      });

      const emailSent = await sendVerificationEmail(
        data.email,
        data.name,
        newCode,
      );

      if (!emailSent) {
        throw new Error(i18n.t("email_resend_error"));
      }

      setInfo(i18n.t("code_resent"));
    } catch (err: any) {
      setError(err.message);
    }

    setResendLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header title={i18n.t("verify_email")} showBackButton />

      <Text style={styles.text}>{i18n.t("code_sent_to")}</Text>

      <Text style={styles.email}>{email}</Text>

      <TextInput
        mode="outlined"
        label={i18n.t("verification_code")}
        value={code}
        onChangeText={setCode}
        style={styles.input}
        keyboardType="number-pad"
        textColor={textColor}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {info !== "" && <Text style={styles.info}>{info}</Text>}

      <Button mode="contained" onPress={verifyCode} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : i18n.t("verify")}
      </Button>

      <Button
        mode="text"
        onPress={resendCode}
        disabled={resendLoading}
        style={{ marginTop: 10 }}
      >
        {resendLoading ? <ActivityIndicator /> : i18n.t("resend_code")}
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

    text: {
      fontSize: 16,
      marginBottom: 5,
      color: isDark ? "#ffffff" : "#000000",
    },

    email: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 20,
      color: isDark ? "#ffffff" : "#000000",
    },

    input: {
      marginBottom: 15,
      backgroundColor: isDark ? "#1a1a1a" : "#fafafa",
    },

    error: {
      color: "#ff4d4d",
      marginBottom: 10,
    },

    info: {
      color: "#4caf50",
      marginBottom: 10,
    },
  });
}
