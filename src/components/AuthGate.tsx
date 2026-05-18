import React, { useEffect, useState } from "react";

import { View } from "react-native";

import { ActivityIndicator } from "react-native-paper";

import { router, useSegments } from "expo-router";

import firestore from "@react-native-firebase/firestore";

import { firebaseAuth } from "@/config/firebaseConfig";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const segments = useSegments();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      try {
        // -----------------------------------
        // NO LOGIN
        // -----------------------------------
        if (!user) {
          if (segments[0] !== "login") {
            router.replace("/login");
          }

          setLoading(false);

          return;
        }

        // -----------------------------------
        // BUSCAR PERFIL FIRESTORE
        // -----------------------------------
        const userDoc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        // -----------------------------------
        // PERFIL INCOMPLETO
        // -----------------------------------
        if (!userDoc.exists || !userDoc.data()?.completedProfile) {
          if (segments[0] !== "complete-profile") {
            router.replace("/complete-profile");
          }

          setLoading(false);

          return;
        }

        // -----------------------------------
        // PERFIL COMPLETO
        // -----------------------------------
        if (segments[0] === "login" || segments[0] === "complete-profile") {
          router.replace("/");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    });

    return unsubscribe;
  }, [segments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
