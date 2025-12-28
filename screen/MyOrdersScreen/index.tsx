// src/screens/MyOrdersScreen/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Portal, Dialog, Button, TextInput } from "react-native-paper";

import useOrders from "./hooks/useOrders";
import OrderCard from "./components/OrderCard";
import OrderFilter from "./components/OrderFilter";
import { useRouter } from "expo-router";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/selections/selections.selectors";
import i18n from "../../language";
import en from "./en.json";
import es from "./es.json";
import ThemedSafeAreaView from "components/ThemedSafeAreaView";
import Header from "components/Header";

i18n.store(en);
i18n.store(es);

export default function MyOrdersScreen() {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);

  const colors =
    theme === "dark"
      ? {
          background: "#121212",
          text: "#fff",
          placeholder: "#888",
          inputBg: "#1E1E1E",
          inputBorder: "#555",
          buttonBg: "#4F46E5",
          buttonText: "#fff",
          infoText: "#ccc",
        }
      : {
          background: "#fff",
          text: "#000",
          placeholder: "#999",
          inputBg: "#fff",
          inputBorder: "#ccc",
          buttonBg: "#0B214A",
          buttonText: "#fff",
          infoText: "#666",
        };

  const {
    loading,
    orders,
    isTailor,
    filter,
    setFilter,
    acceptOrder,
    rejectOrder,
    submitQuote,
    acceptQuote,
    rejectQuote,
    payDeposit,
    beginProduction,
    startControlQuality,
    markOrderReadyToShip,
    markOrderDelivered,
  } = useOrders();

  const [quoteVisible, setQuoteVisible] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");

  // ------------------ Cotización ------------------
  const openQuoteModal = (orderId: string) => {
    setCurrentOrderId(orderId);
    setQuoteVisible(true);
  };

  const submitQuoteModal = async () => {
    if (!currentOrderId) return;
    await submitQuote(currentOrderId, Number(price), Number(time));
    setQuoteVisible(false);
    setPrice("");
    setTime("");
  };

  // ------------------ Render ------------------
  if (loading)
    return (
      <ThemedSafeAreaView style={{ backgroundColor: colors.background }}>
        <Header title={i18n.t("my_orders")} showBackButton />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.buttonBg} />
        </View>
      </ThemedSafeAreaView>
    );

  return (
    <ThemedSafeAreaView style={{ backgroundColor: colors.background }}>
      <Header title={i18n.t("my_orders")} showBackButton />

      <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <OrderFilter selected={filter} onChange={setFilter} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: colors.text }}>{i18n.t("no_orders")}</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <OrderCard
                order={item}
                isTailor={isTailor}
                onAcceptOrder={acceptOrder}
                onRejectOrder={rejectOrder}
                onSubmitQuote={() => openQuoteModal(item.id)}
                onAcceptQuote={acceptQuote}
                onRejectQuote={rejectQuote}
                onPayDeposit={payDeposit}
                onStartProduction={beginProduction}
                onControlQuality={startControlQuality}
                onReadyToShip={markOrderReadyToShip}
                onMarkDelivered={markOrderDelivered}
                onViewTechnicalSheet={() =>
                  router.push(`/tech-sheet/${item.id}`)
                }
              />
            </View>
          )}
        />
      )}

      {/* ------------------ Modal Cotización ------------------ */}
      <Portal>
        <Dialog visible={quoteVisible} onDismiss={() => setQuoteVisible(false)}>
          <Dialog.Title>{i18n.t("create_quote")}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label={i18n.t("price")}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              mode="outlined"
              style={{ backgroundColor: colors.inputBg }}
              textColor={colors.text}
              placeholderTextColor={colors.placeholder}
            />
            <TextInput
              label={i18n.t("time_days")}
              value={time}
              onChangeText={setTime}
              keyboardType="numeric"
              mode="outlined"
              style={{ backgroundColor: colors.inputBg, marginTop: 12 }}
              textColor={colors.text}
              placeholderTextColor={colors.placeholder}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setQuoteVisible(false)}>
              {i18n.t("cancel")}
            </Button>
            <Button onPress={submitQuoteModal}>{i18n.t("submit")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
