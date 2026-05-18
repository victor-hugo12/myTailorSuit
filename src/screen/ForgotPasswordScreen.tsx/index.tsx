import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { firebaseAuth } from "@/config/firebaseConfig";
import { router } from "expo-router";

import Header from "@/components/Header";

import i18n from "@/language";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/selections/selections.selectors";

import en from "./en.json";
import es from "./es.json";

i18n.store(en);
i18n.store(es);

export default function ForgotPasswordScreen() {
  const theme = useAppSelector(selectTheme);
  const styles = getStyles(theme);

  const [message, setMessage] = useState("");

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("invalid_email"))
      .required(i18n.t("required_email")),
  });

  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const outlineColor = theme === "dark" ? "#555555" : "#cccccc";
  const activeOutlineColor = theme === "dark" ? "#ffffff" : "#6200ee";

  return (
    <View style={styles.container}>
      <Header title={i18n.t("forgot_password_title")} showBackButton />

      <Formik
        initialValues={{ email: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          setMessage("");

          try {
            await firebaseAuth.sendPasswordResetEmail(values.email);

            setMessage(i18n.t("reset_email_sent"));
          } catch (error) {
            setMessage(i18n.t("reset_email_error"));
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
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator />
              ) : (
                i18n.t("send_reset_email")
              )}
            </Button>
          </>
        )}
      </Formik>

      {message !== "" && <Text style={styles.message}>{message}</Text>}

      <Button onPress={() => router.back()} style={{ marginTop: 20 }}>
        {i18n.t("back_to_login")}
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
    input: {
      marginTop: 20,
      backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
    },
    button: {
      marginTop: 20,
    },
    error: {
      color: "#ff4d4d",
      marginTop: 5,
    },
    message: {
      marginTop: 20,
      textAlign: "center",
      color: isDark ? "#e5e5e5" : "#333",
    },
  });
}
