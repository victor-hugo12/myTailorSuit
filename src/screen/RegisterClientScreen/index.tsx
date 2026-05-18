import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
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
import { db, firebaseAuth } from "@/config/firebaseConfig";

i18n.store(en);
i18n.store(es);

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterClientScreen() {
  const theme = useAppSelector(selectTheme);
  const styles = getStyles(theme);

  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const outlineColor = theme === "dark" ? "#666666" : "#cccccc";
  const activeOutlineColor = theme === "dark" ? "#ffffff" : "#6200ee";
  const placeholderColor = theme === "dark" ? "#aaaaaa" : "#666666";

  const [firebaseError, setFirebaseError] = useState("");
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

  return (
    <View style={styles.container}>
      <Header title={i18n.t("title")} showBackButton />

      <Formik<FormValues>
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
            try {
              const tempUser =
                await firebaseAuth.createUserWithEmailAndPassword(
                  values.email,
                  values.password,
                );

              await tempUser.user.delete();
            } catch (error: any) {
              if (error.code === "auth/email-already-in-use") {
                throw new Error("This email is already registered");
              }

              throw error;
            }

            const verificationCode = generateVerificationCode();

            const verificationDoc = await db
              .collection("email_verifications")
              .add({
                name: values.name,
                email: values.email,
                code: verificationCode,
                createdAt: firestore.FieldValue.serverTimestamp(),
                expireAt: new Date(Date.now() + 10 * 60 * 1000),
              });

            const emailSent = await sendVerificationEmail(
              values.email,
              values.name,
              verificationCode,
            );

            if (!emailSent) {
              throw new Error("Could not send verification email");
            }

            setIsSubmitting(false);

            router.push({
              pathname: "/verify-email",
              params: {
                verificationId: verificationDoc.id,
                email: values.email,
                password: values.password,
                name: values.name,
              },
            });
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
              placeholderTextColor={placeholderColor}
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
              textColor={textColor}
              outlineColor={outlineColor}
              activeOutlineColor={activeOutlineColor}
              placeholderTextColor={placeholderColor}
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
              textColor={textColor}
              outlineColor={outlineColor}
              activeOutlineColor={activeOutlineColor}
              placeholderTextColor={placeholderColor}
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
              textColor={textColor}
              outlineColor={outlineColor}
              activeOutlineColor={activeOutlineColor}
              placeholderTextColor={placeholderColor}
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

            {firebaseError !== "" && (
              <Text style={styles.error}>{firebaseError}</Text>
            )}

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
