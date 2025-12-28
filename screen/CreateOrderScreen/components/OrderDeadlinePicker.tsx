// src/screens/CreateOrderScreen/components/OrderDeadlinePicker.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import i18n from "../../../language";
import en from "../en.json";
import es from "../es.json";
import { useAppSelector } from "../../../redux/hooks";
import { selectTheme } from "../../../redux/selections/selections.selectors";

i18n.store(en);
i18n.store(es);

export default function OrderDeadlinePicker({
  date,
  setDate,
  minDate,
  showValidation,
}: any) {
  const [open, setOpen] = useState(false);

  const theme = useAppSelector(selectTheme);

  const invalid = showValidation && date.getTime() < minDate.getTime();

  const colors =
    theme === "dark"
      ? {
          card: "#1e1e1e",
          text: "#fff",
          border: "#666",
          placeholder: "#aaa",
        }
      : {
          card: "#fff",
          text: "#000",
          border: "#bbb",
          placeholder: "#777",
        };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {i18n.t("delivery_date")} {invalid && <Text style={styles.req}>*</Text>}
      </Text>

      <TouchableOpacity
        style={[
          styles.selector,
          { borderColor: colors.border },
          invalid && styles.error,
        ]}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color: colors.text }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {open && (
        <DateTimePicker
          value={date}
          onChange={(e, d) => {
            setOpen(false);
            if (d) setDate(d);
          }}
          minimumDate={minDate}
          mode="date"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    marginTop: 12,
  },
  title: { fontWeight: "700", fontSize: 16 },
  req: { color: "red" },
  selector: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  error: { borderColor: "red" },
});
