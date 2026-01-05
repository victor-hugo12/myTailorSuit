import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";

import Header from "@/components/Header";
import i18n from "@/language";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/selections/selections.selectors";

import en from "./en.json";
import es from "./es.json";

import { firebaseAuth } from "@/config/firebaseConfig";

i18n.store(en);
i18n.store(es);

export default function LoginScreen() {
  const theme = useAppSelector(selectTheme);
  const styles = getStyles(theme);

  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("invalid_email"))
      .required(i18n.t("required_email")),
    password: Yup.string().min(6).required(i18n.t("required_password")),
  });

  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const outlineColor = theme === "dark" ? "#555555" : "#cccccc";
  const activeOutlineColor = theme === "dark" ? "#ffffff" : "#6200ee";

  return (
    <View style={styles.container}>
      <Header title={i18n.t("title_login")} showBackButton />

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          setFirebaseError("");
          try {
            // 🔹 Login usando la instancia inicializada
            await firebaseAuth.signInWithEmailAndPassword(
              values.email,
              values.password
            );
            router.push("/");
          } catch (error: any) {
            setFirebaseError(error.message);
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

            {firebaseError && <Text style={styles.error}>{firebaseError}</Text>}

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.loginButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? <ActivityIndicator /> : i18n.t("button_login")}
            </Button>
          </>
        )}
      </Formik>

      <View style={{ marginTop: 30 }}>
        <Text style={[styles.text, { textAlign: "center", marginBottom: 10 }]}>
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
    input: { backgroundColor: isDark ? "#1a1a1a" : "#ffffff" },
    error: { color: "#ff4d4d", marginTop: 5 },
    text: { color: isDark ? "#e5e5e5" : "#333" },
    loginButton: { marginTop: 20 },
  });
}
