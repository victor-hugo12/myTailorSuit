// src/screens/RegisterClientScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { router } from "expo-router";

import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/selections/selections.selectors";

import Header from "@/components/Header";
import i18n from "@/language";

import en from "./en.json";
import es from "./es.json";
import firestore from "@react-native-firebase/firestore";

import { firebaseAuth, db } from "@/config/firebaseConfig";

i18n.store(en);
i18n.store(es);

export default function RegisterClientScreen() {
  const theme = useAppSelector(selectTheme);
  const styles = getStyles(theme);

  const [firebaseError, setFirebaseError] = useState("");
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required(i18n.t("error_name_required")),
    email: Yup.string()
      .email(i18n.t("error_email_invalid"))
      .required(i18n.t("error_email_required")),
    password: Yup.string()
      .min(6, i18n.t("error_password_min"))
      .required(i18n.t("error_password_required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], i18n.t("error_confirm_match"))
      .required(i18n.t("error_confirm_required")),
  });

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    router.push("/");
  };

  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const outlineColor = theme === "dark" ? "#555555" : "#cccccc";
  const activeOutlineColor = theme === "dark" ? "#ffffff" : "#6200ee";

  return (
    <View style={styles.container}>
      <Header title={i18n.t("title")} showBackButton />

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          setFirebaseError("");
          setIsSubmitting(true);

          try {
            // 🔹 Crear usuario con RNFirebase (namespaced API)
            const userCredential =
              await firebaseAuth.createUserWithEmailAndPassword(
                values.email,
                values.password
              );

            // 🔹 Guardar datos en Firestore
            // Guardar datos en Firestore RNFirebase
            await db.collection("users").doc(userCredential.user.uid).set({
              role: "client",
              name: values.name,
              email: values.email,
              createdAt: firestore.FieldValue.serverTimestamp(), // ← aquí
            });

            setIsSubmitting(false);
            showDialog();
          } catch (error: any) {
            setFirebaseError(error.message);
            setIsSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label={i18n.t("name")}
              mode="outlined"
              value={values.name}
              onChangeText={handleChange("name")}
              style={styles.input}
              textColor={textColor}
              outlineColor={outlineColor}
              activeOutlineColor={activeOutlineColor}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              label={i18n.t("email")}
              mode="outlined"
              value={values.email}
              onChangeText={handleChange("email")}
              style={[styles.input, { marginTop: 15 }]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
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
              value={values.password}
              onChangeText={handleChange("password")}
              style={[styles.input, { marginTop: 15 }]}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
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
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              label={i18n.t("confirm_password")}
              mode="outlined"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              style={[styles.input, { marginTop: 15 }]}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              textColor={textColor}
              outlineColor={outlineColor}
              activeOutlineColor={activeOutlineColor}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            {firebaseError && <Text style={styles.error}>{firebaseError}</Text>}

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                i18n.t("register_client")
              )}
            </Button>

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{i18n.t("modal_title")}</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{i18n.t("modal_message")}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>{i18n.t("modal_ok")}</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        )}
      </Formik>
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
      backgroundColor: isDark ? "#1a1a1a" : "#fafafa",
    },
    error: {
      color: "#ff4d4d",
      marginTop: 5,
    },
    submitButton: {
      marginTop: 20,
    },
  });
}
