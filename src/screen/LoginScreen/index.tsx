import React, { useState } from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { router } from "expo-router";

import Header from "@/components/Header";

import i18n from "@/language";

import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/selections/selections.selectors";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { firebaseAuth } from "@/config/firebaseConfig";

i18n.store(require("./en.json"));
i18n.store(require("./es.json"));

export default function LoginScreen() {
  const theme = useAppSelector(selectTheme);

  const styles = getStyles(theme);

  const [firebaseError, setFirebaseError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("invalid_email"))
      .required(i18n.t("required_email")),

    password: Yup.string()
      .min(6, i18n.t("password_min"))
      .required(i18n.t("required_password")),
  });

  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  const outlineColor = theme === "dark" ? "#555555" : "#cccccc";

  const activeOutlineColor = theme === "dark" ? "#ffffff" : "#6200ee";

  // ==========================
  // GOOGLE LOGIN
  // ==========================
  const signInWithGoogle = async () => {
    try {
      setFirebaseError("");

      await GoogleSignin.hasPlayServices();

      // fuerza selector de cuenta
      await GoogleSignin.signOut();

      // LOGIN GOOGLE (SIN FIREBASE)
      const signInResult = await GoogleSignin.signIn();

      const idToken = signInResult.idToken;

      if (!idToken) {
        setFirebaseError("No se obtuvo idToken");
        return;
      }

      const email = signInResult.user.email;
      const name = signInResult.user.name ?? "";
      const photo = signInResult.user.photo ?? "";

      // ==========================
      // BUSCAR USUARIO FIRESTORE
      // ==========================
      const snapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();

      // ==========================
      // USUARIO EXISTE
      // ==========================
      if (!snapshot.empty) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await firebaseAuth.signInWithCredential(googleCredential);

        router.replace("/");

        return;
      }

      // ==========================
      // USUARIO NUEVO
      // NO INICIAR SESIÓN
      // ==========================
      await GoogleSignin.signOut();

      router.push({
        pathname: "/complete-profile",
        params: {
          email,
          name,
          photo,
          idToken,
        },
      });
    } catch (error: any) {
      console.log("Google Login Error:", error);

      if (
        error.code === statusCodes.SIGN_IN_CANCELLED ||
        error.message?.toLowerCase().includes("cancel")
      ) {
        return;
      }

      setFirebaseError(error.message || "Google Sign In Error");
    }
  };

  return (
    <View style={styles.container}>
      <Header title={i18n.t("title_login")} showBackButton />

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          setFirebaseError("");

          try {
            const email = values.email.trim().toLowerCase();

            const password = values.password;

            await firebaseAuth.signInWithEmailAndPassword(email, password);

            router.replace("/");
          } catch (error: any) {
            console.log(error);

            switch (error.code) {
              case "auth/user-not-found":
                setFirebaseError(i18n.t("user_not_found"));
                break;

              case "auth/wrong-password":
              case "auth/invalid-credential":
              case "auth/invalid-login-credentials":
                setFirebaseError(i18n.t("invalid_credentials"));
                break;

              case "auth/too-many-requests":
                setFirebaseError(i18n.t("too_many_requests"));
                break;

              default:
                setFirebaseError(error.message || i18n.t("login_error"));
            }
          }

          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <TextInput
              label={i18n.t("email")}
              mode="outlined"
              value={values.email}
              onChangeText={handleChange("email")}
              error={touched.email && !!errors.email}
              style={styles.input}
              textColor={textColor}
              outlineColor={outlineColor}
              activeOutlineColor={activeOutlineColor}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              label={i18n.t("password")}
              mode="outlined"
              secureTextEntry={!showPassword}
              value={values.password}
              onChangeText={handleChange("password")}
              style={[styles.input, { marginTop: 15 }]}
              textColor={textColor}
              outlineColor={outlineColor}
              activeOutlineColor={activeOutlineColor}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                  forceTextInputFocus={false}
                />
              }
            />

            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPress={() => router.push("/forgotPassword")}
              style={{
                marginTop: 10,
                alignSelf: "flex-end",
              }}
            >
              <Text style={styles.forgotPassword}>
                {i18n.t("forgot_password")}
              </Text>
            </TouchableOpacity>

            {firebaseError !== "" && (
              <Text style={styles.error}>{firebaseError}</Text>
            )}

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.loginButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? <ActivityIndicator /> : i18n.t("button_login")}
            </Button>

            <Button
              mode="contained"
              onPress={signInWithGoogle}
              style={styles.googleButton}
            >
              {i18n.t("google_login")}
            </Button>
          </>
        )}
      </Formik>

      <View style={{ marginTop: 30 }}>
        <Text
          style={[
            styles.text,
            {
              textAlign: "center",
              marginBottom: 10,
            },
          ]}
        >
          {i18n.t("no_account")}
        </Text>

        <Button
          mode="outlined"
          onPress={() => router.push("/registerClient")}
          style={{ marginBottom: 10 }}
        >
          {i18n.t("register_client")}
        </Button>

        <Button mode="outlined" onPress={() => router.push("/registerTailor")}>
          {i18n.t("register_tailor")}
        </Button>
      </View>
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

    input: {
      backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
    },

    error: {
      color: "#ff4d4d",
      marginTop: 5,
    },

    text: {
      color: isDark ? "#e5e5e5" : "#333333",
    },

    forgotPassword: {
      color: "#6200ee",
      fontSize: 14,
    },

    loginButton: {
      marginTop: 20,
    },

    googleButton: {
      marginTop: 15,
      backgroundColor: "#db4437",
    },
  });
}
