// screens/MyOrdersScreen/components/ClientActions.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import i18n from "../../../language"; // importa tu configuración de i18n
import { useAppSelector } from "../../../redux/hooks";
import { selectTheme } from "../../../redux/selections/selections.selectors";
import en from "../en.json";
import es from "../es.json";

i18n.store(en);
i18n.store(es);
interface ClientActionsProps {
  status: string;
  orderId: string;
  onNext: (orderId: string, action: string) => void;
}

export default function ClientActions({
  status,
  orderId,
  onNext,
}: ClientActionsProps) {
  const theme = useAppSelector(selectTheme);

  const colors =
    theme === "dark"
      ? {
          accept: "#16a34a",
          reject: "#dc2626",
          text: "#fff",
        }
      : {
          accept: "#16a34a",
          reject: "#dc2626",
          text: "#fff",
        };

  if (status === "COTIZADO")
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accept }]}
          onPress={() => onNext(orderId, "COTIZADO")}
        >
          <Text style={[styles.text, { color: colors.text }]}>
            {i18n.t("accept_price")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.reject }]}
          onPress={() => onNext(orderId, "EN_MODIFICACION_COTIZACION")}
        >
          <Text style={[styles.text, { color: colors.text }]}>
            {i18n.t("reject_price")}
          </Text>
        </TouchableOpacity>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, marginTop: 12 },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
  },
  text: { textAlign: "center", fontWeight: "bold" },
});
