// src/screens/CreateOrderScreen/index.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import i18n from "../../language";
import en from "./en.json";
import es from "./es.json";
i18n.store(en);
i18n.store(es);

import Header from "@/components/Header";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { loadAllSuits } from "@/storage/customSuit.storage";
import { SavedSuit } from "@/screen/OptionsScreen/types/suits";
import { saveOrderPreviewToCloud } from "@/storage/cloudUtils";

import OrderSuitCard from "./components/OrderSuitCard";
import OrderClientForm from "./components/OrderClientForm";
import OrderTailorPicker, { Tailor } from "./components/OrderTailorPicker";
import OrderDeadlinePicker from "./components/OrderDeadlinePicker";

// 🔹 React Native Firebase
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator } from "react-native-paper";

export default function CreateOrderScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [user, setUser] = useState(auth().currentUser);

  const [suit, setSuit] = useState<
    (SavedSuit & { source: "local" | "cloud" }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [tailors, setTailors] = useState<Tailor[]>([]);
  const [selectedTailorId, setSelectedTailorId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [deadlineDate, setDeadlineDate] = useState(
    new Date(Date.now() + 5 * 24 * 3600 * 1000)
  );
  const MIN_HOURS_BEFORE_DEADLINE = 48;
  const [touchedSubmit, setTouchedSubmit] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const userDocSnap = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (userDocSnap.exists) {
        const d = userDocSnap.data();
        setClientInfo({
          name: d?.name || "",
          phone: d?.phone || "",
          email: d?.email || "",
        });
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const snap = await firestore()
        .collection("users")
        .where("role", "==", "tailor")
        .get();

      const list: Tailor[] = snap.docs.map((d) => ({
        id: d.id,
        name: d.data().name,
        email: d.data().email,
        shop: d.data().shop,
      }));
      setTailors(list);
    })();
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (!params.suitId) return setSuit(null);

        const local = await loadAllSuits();
        const found = local.find((s) => s.id === params.suitId);
        if (found) {
          setSuit({ ...found, source: "local" });
        } else if (user) {
          const suitSnap = await firestore()
            .collection("users")
            .doc(user.uid)
            .collection("suits")
            .doc(params.suitId as string)
            .get();

          if (suitSnap.exists) {
            setSuit({
              ...(suitSnap.data() as SavedSuit),
              id: suitSnap.id,
              source: "cloud",
            });
          }
        }
      } catch (err) {
        console.error("suit load:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.suitId, user]);

  const minDeadline = useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + MIN_HOURS_BEFORE_DEADLINE);
    return d;
  }, []);

  const isDeadlineValid = (d: Date) => d.getTime() >= minDeadline.getTime();

  const onSubmit = async () => {
    setTouchedSubmit(true);
    if (!suit) return Alert.alert(i18n.t("error"), i18n.t("no_suit_selected"));
    if (!user) return Alert.alert(i18n.t("error"), i18n.t("login_required"));
    if (!selectedTailorId)
      return Alert.alert(i18n.t("error"), i18n.t("select_tailor"));
    if (!clientInfo.name || !clientInfo.phone)
      return Alert.alert(i18n.t("error"), i18n.t("fill_client_info"));
    if (!isDeadlineValid(deadlineDate))
      return Alert.alert(
        i18n.t("invalid_date"),
        i18n.t("deadline_too_close", { hours: MIN_HOURS_BEFORE_DEADLINE })
      );

    setCreating(true);
    try {
      const timestamp = firestore.Timestamp.now();

      if (!suit.previewUri) throw new Error(i18n.t("no_preview_image"));
      const orderPreviewUri = await saveOrderPreviewToCloud(suit);

      const suitSnapshot = {
        id: suit.id,
        name: suit.name,
        garment: suit.garment,
        previewUri: suit.previewUri,
        orderPreviewUri,
        fabric: suit.fabric || null,
        measurements: suit.measurements || null,
        details: suit.details || null,
        estimatedPrice: suit.details?.estimatedPrice ?? null,
      };

      const tailor = tailors.find((t) => t.id === selectedTailorId);
      if (!tailor) throw new Error("Tailor not found");

      const orderData = {
        suit: suitSnapshot,
        client: { id: user.uid, ...clientInfo },
        tailor,
        notes: notes || null,
        deadline: firestore.Timestamp.fromDate(deadlineDate),
        createdAt: timestamp,
        status: "PENDIENTE_APROBACION_SASTRE",
        historialEstados: [
          {
            estado: "PENDIENTE_APROBACION_SASTRE",
            fecha: timestamp,
            actor: user.uid,
            comentario: "Pedido creado por cliente",
          },
        ],
      };

      const orderRef = await firestore().collection("orders").add(orderData);

      const refData = {
        orderId: orderRef.id,
        createdAt: timestamp,
        suit: { id: suitSnapshot.id, name: suitSnapshot.name },
        status: orderData.status,
      };

      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(orderRef.id)
        .set(refData);

      await firestore()
        .collection("users")
        .doc(tailor.id)
        .collection("orders")
        .doc(orderRef.id)
        .set(refData);

      Alert.alert(i18n.t("order_sent"), i18n.t("order_sent_msg"));
      router.back();
    } catch (err) {
      console.error("order create:", err);
      Alert.alert(i18n.t("error"), i18n.t("order_create_error"));
    } finally {
      setCreating(false);
    }
  };

  if (loading)
    return (
      <ThemedSafeAreaView>
        <Header title={i18n.t("create_order")} showBackButton />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0B214A" />
        </View>
      </ThemedSafeAreaView>
    );

  if (!suit)
    return (
      <ThemedSafeAreaView>
        <Header title={i18n.t("create_order")} showBackButton />
        <View style={styles.center}>
          <Text>{i18n.t("suit_not_found")}</Text>
        </View>
      </ThemedSafeAreaView>
    );

  return (
    <ThemedSafeAreaView>
      <Header title={i18n.t("create_order")} showBackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <OrderSuitCard suit={suit} />
        <OrderClientForm
          clientInfo={clientInfo}
          setClientInfo={setClientInfo}
          notes={notes}
          setNotes={setNotes}
          showValidation={touchedSubmit}
        />
        <OrderTailorPicker
          tailors={tailors}
          selectedTailorId={selectedTailorId}
          onSelect={setSelectedTailorId}
          showValidation={touchedSubmit}
        />
        <OrderDeadlinePicker
          date={deadlineDate}
          setDate={setDeadlineDate}
          minDate={minDeadline}
          showValidation={touchedSubmit}
        />
        <TouchableOpacity
          style={[
            styles.cta,
            (!selectedTailorId || creating) && { opacity: 0.5 },
          ]}
          disabled={!selectedTailorId || creating}
          onPress={onSubmit}
        >
          {creating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.ctaText}>{i18n.t("send_order")}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  cta: {
    backgroundColor: "#0B214A",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  ctaText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
