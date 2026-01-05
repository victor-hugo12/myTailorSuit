// src/screens/TechSheetScreen/index.tsx
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

import i18n from "@/language";
import en from "./en.json";
import es from "./es.json";
i18n.store(en);
i18n.store(es);

import { getOptionLabelById } from "@/utils/getOptionLabel";
import { useAppSelector } from "@/redux/hooks";
import { selectTheme } from "@/redux/selections/selections.selectors";

import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator } from "react-native-paper";
const db = firestore();

type HistorialItem = {
  estado: string;
  fecha: { toDate: () => Date };
  actor?: string;
  comentario?: string;
};

type TailorOrder = {
  suit?: {
    id?: string;
    name?: string;
    garment?: string;
    previewUri?: string;
    fabric?: any;
    measurements?: Record<string, any>;
    details?: Record<string, any>;
  };
  client?: { id?: string; name?: string; phone?: string; email?: string };
  tailor?: { id?: string; name?: string; email?: string; shop?: string };
  notes?: string | null;
  deadline?: { toDate: () => Date };
  createdAt?: { toDate: () => Date };
  status?: string;
  historialEstados?: HistorialItem[];
};

export default function TechSheetScreen() {
  const { orderId } = useLocalSearchParams();
  const theme = useAppSelector(selectTheme);
  const styles = getStyles(theme);

  const [order, setOrder] = useState<TailorOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const unsubscribe = db
      .collection("orders")
      .doc(String(orderId))
      .onSnapshot((docSnap) => {
        if (docSnap.exists) {
          const docData = docSnap.data();

          const data: TailorOrder = {
            ...docData,
            suit: docData?.suit
              ? {
                  ...docData.suit,
                  fabric: docData.suit.fabric
                    ? { ...docData.suit.fabric }
                    : null,
                }
              : undefined,
          };

          console.log("ORDER DATA:", data);
          console.log("SUIT FABRIC:", data.suit?.fabric);

          setOrder(data);
        } else {
          console.log("Order not found");
        }

        setLoading(false);
      });

    return () => unsubscribe();
  }, [orderId]);

  if (loading)
    return (
      <ThemedSafeAreaView>
        <Header title={i18n.t("tech_sheet")} showBackButton />
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      </ThemedSafeAreaView>
    );

  if (!order)
    return (
      <ThemedSafeAreaView>
        <Header title={i18n.t("tech_sheet")} showBackButton />
        <Text style={styles.errorText}>{i18n.t("order_not_found")}</Text>
      </ThemedSafeAreaView>
    );

  const s = order.suit;

  return (
    <ThemedSafeAreaView>
      <Header title={`${i18n.t("tech_sheet")} #${orderId}`} showBackButton />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        {s?.previewUri && (
          <Image
            source={{ uri: s.previewUri }}
            style={styles.suitImage}
            resizeMode="contain"
          />
        )}

        <Text style={styles.sectionTitle}>{i18n.t("client_data")}</Text>
        <Text style={styles.text}>
          {`${i18n.t("name")}: ${
            order.client?.name || i18n.t("not_specified")
          }`}
        </Text>
        <Text style={styles.text}>
          {`${i18n.t("phone")}: ${
            order.client?.phone || i18n.t("not_specified")
          }`}
        </Text>
        <Text style={styles.text}>
          {`${i18n.t("email")}: ${
            order.client?.email || i18n.t("not_specified")
          }`}
        </Text>

        {/* SASTRE */}
        <Text style={styles.sectionTitle}>{i18n.t("assigned_tailor")}</Text>
        <Text style={styles.text}>
          {order.tailor?.name || i18n.t("not_assigned")}
        </Text>
        {order.tailor?.shop && (
          <Text style={styles.text}>
            {`${i18n.t("shop")}: ${order.tailor.shop}`}
          </Text>
        )}

        {/* PRENDA */}
        <Text style={styles.sectionTitle}>{i18n.t("garment_type")}</Text>
        <Text style={styles.text}>{s?.garment || i18n.t("not_specified")}</Text>

        {/* MEDIDAS */}
        <Text style={styles.sectionTitle}>{i18n.t("client_measurements")}</Text>
        {s?.measurements && Object.keys(s.measurements).length ? (
          Object.entries(s.measurements).map(([key, value]) => {
            const translatedKey = i18n.t(`${key}`);
            return (
              <Text key={key} style={styles.text}>
                {`${translatedKey}: ${String(value)}`}
              </Text>
            );
          })
        ) : (
          <Text style={styles.text}>{i18n.t("no_measurements")}</Text>
        )}

        {/* TELA */}
        <Text style={styles.sectionTitle}>{i18n.t("selected_fabric")}</Text>
        <Text style={styles.text}>
          {s?.fabric?.name || i18n.t("not_selected")}
        </Text>

        {/* DETALLES */}
        <Text style={styles.sectionTitle}>{i18n.t("suit_details")}</Text>
        {s?.details && Object.keys(s.details).length ? (
          Object.entries(s.details).map(([key, value]) => {
            const translatedKey = i18n.t(`${key}`);
            const label =
              typeof value === "number"
                ? getOptionLabelById(s.garment as any, value)
                : Array.isArray(value)
                  ? value
                      .map((id) => getOptionLabelById(s.garment as any, id))
                      .join(", ")
                  : String(value);

            return (
              <Text key={key} style={styles.text}>
                {`${translatedKey}: ${label}`}
              </Text>
            );
          })
        ) : (
          <Text style={styles.text}>{i18n.t("no_details")}</Text>
        )}

        {/* NOTAS */}
        <Text style={styles.sectionTitle}>{i18n.t("order_notes")}</Text>
        <Text style={styles.text}>{order.notes || i18n.t("no_notes")}</Text>

        {/* ESTADO */}
        <Text style={styles.sectionTitle}>{i18n.t("current_status")}</Text>
        <Text style={styles.text}>{order.status}</Text>

        {/* FECHA DE ENTREGA */}
        <Text style={styles.sectionTitle}>{i18n.t("delivery_date")}</Text>
        <Text style={styles.text}>
          {order.deadline
            ? order.deadline.toDate().toLocaleString()
            : i18n.t("no_date")}
        </Text>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

function getStyles(theme: string) {
  const isDark = theme === "dark";

  return StyleSheet.create({
    container: { padding: 15 },
    suitImage: {
      width: "100%",
      height: 250,
      marginBottom: 15,
      borderRadius: 10,
    },
    sectionTitle: {
      fontSize: 18,
      marginTop: 20,
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#000000",
    },
    text: {
      color: isDark ? "#e5e5e5" : "#222",
      marginTop: 4,
    },
    errorText: {
      marginTop: 30,
      fontSize: 16,
      textAlign: "center",
      color: isDark ? "#ffffff" : "#000",
    },
  });
}
