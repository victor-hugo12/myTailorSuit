// src/screens/CreateOrderScreen/components/OrderClientForm.tsx
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import i18n from "../../../language";
import en from "../en.json";
import es from "../es.json";
import { useAppSelector } from "../../../redux/hooks";
import { selectTheme } from "../../../redux/selections/selections.selectors";
i18n.store(en);
i18n.store(es);
export default function OrderClientForm({
  clientInfo,
  setClientInfo,
  notes,
  setNotes,
  showValidation,
}: any) {
  const theme = useAppSelector(selectTheme);

  const invalidName = showValidation && !clientInfo.name;
  const invalidPhone = showValidation && !clientInfo.phone;

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
        {i18n.t("order_client_data")}
      </Text>

      {/* NAME */}
      <Text style={[styles.label, { color: colors.text }]}>
        {i18n.t("full_name")} {invalidName && <Text style={styles.req}>*</Text>}
      </Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
          invalidName && styles.inputError,
        ]}
        value={clientInfo.name}
        onChangeText={(v) => setClientInfo({ ...clientInfo, name: v })}
        placeholder={i18n.t("placeholder_name")}
        placeholderTextColor={colors.placeholder}
      />

      {/* PHONE */}
      <Text style={[styles.label, { color: colors.text }]}>
        {i18n.t("phone")} {invalidPhone && <Text style={styles.req}>*</Text>}
      </Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
          invalidPhone && styles.inputError,
        ]}
        keyboardType="phone-pad"
        value={clientInfo.phone}
        onChangeText={(v) => setClientInfo({ ...clientInfo, phone: v })}
        placeholder={i18n.t("placeholder_phone")}
        placeholderTextColor={colors.placeholder}
      />

      {/* NOTES */}
      <Text style={[styles.label, { color: colors.text }]}>
        {i18n.t("optional_notes")}
      </Text>

      <TextInput
        style={[
          styles.input,
          { height: 80, borderColor: colors.border, color: colors.text },
        ]}
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder={i18n.t("placeholder_notes")}
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  title: { fontWeight: "700", fontSize: 16, marginBottom: 10 },
  label: { marginTop: 8, fontWeight: "600" },
  req: { color: "red" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  inputError: { borderColor: "red" },
});
