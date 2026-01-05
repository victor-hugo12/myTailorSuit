// screens/MyOrdersScreen/components/TailorActions.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import i18n from "@/language";
import { useAppSelector } from "@/redux/hooks";
import { selectTheme } from "@/redux/selections/selections.selectors";
import { OrderStatus } from "../logic/orderFlow";

export default function TailorActions({
  status,
  orderId,
  nextState,
  onNext,
  onReject,
  onCreateQuote,
}: {
  status: OrderStatus;
  orderId: string;
  nextState: OrderStatus | null;
  onNext: any;
  onReject: any;
  onCreateQuote: any;
}) {
  const theme = useAppSelector(selectTheme);
  const colors = {
    accept: "#16a34a",
    reject: "#dc2626",
    next: theme === "dark" ? "#4F46E5" : "#0B214A",
    text: "#fff",
  };

  if (status === "PENDIENTE_APROBACION_SASTRE")
    return (
      <View style={[styles.row, { marginTop: 12 }]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accept }]}
          onPress={() => onCreateQuote(orderId)}
        >
          <Text style={[styles.text]}>{i18n.t("create_quote")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.reject }]}
          onPress={() => onReject(orderId)}
        >
          <Text style={[styles.text]}>{i18n.t("reject")}</Text>
        </TouchableOpacity>
      </View>
    );

  if (nextState)
    return (
      <TouchableOpacity
        style={[styles.nextButton, { backgroundColor: colors.next }]}
        onPress={() => onNext(orderId, status)}
      >
        <Text style={[styles.text]}>
          {i18n.t("advance_to")} {i18n.t(nextState.toLowerCase())}
        </Text>
      </TouchableOpacity>
    );

  return null;
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10 },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
  },
  nextButton: {
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
  },
  text: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
