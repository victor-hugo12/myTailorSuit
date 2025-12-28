// src/screens/CreateOrderScreen/components/OrderTailorPicker.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { useAppSelector } from "../../../redux/hooks";
import { selectTheme } from "../../../redux/selections/selections.selectors";
import i18n from "../../../language";
import en from "../en.json";
import es from "../es.json";

i18n.store(en);
i18n.store(es);

export interface Tailor {
  id: string;
  name: string;
  email: string;
  shop: string;
}

interface OrderTailorPickerProps {
  tailors: Tailor[];
  selectedTailorId: string | null;
  onSelect: (id: string) => void;
  showValidation?: boolean;
}

export default function OrderTailorPicker({
  tailors,
  selectedTailorId,
  onSelect,
  showValidation = false,
}: OrderTailorPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const theme = useAppSelector(selectTheme);

  const colors =
    theme === "dark"
      ? {
          card: "#1E1E1E",
          text: "#fff",
          placeholder: "#888",
          border: "#555",
          modalBg: "rgba(0,0,0,0.45)",
          modalBox: "#252525",
          inputBg: "#1E1E1E",
          inputBorder: "#555",
          closeBtnBg: "#4F46E5",
          info: "#ccc",
          error: "red",
        }
      : {
          card: "#fff",
          text: "#000",
          placeholder: "#999",
          border: "#ccc",
          modalBg: "rgba(0,0,0,0.45)",
          modalBox: "#fff",
          inputBg: "#fff",
          inputBorder: "#ccc",
          closeBtnBg: "#0B214A",
          info: "#666",
          error: "red",
        };

  const invalid = showValidation && !selectedTailorId;

  const filtered = tailors.filter(
    (t: Tailor) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.shop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {i18n.t("select_tailor")}{" "}
        {invalid && <Text style={{ color: colors.error }}>*</Text>}
      </Text>

      <TouchableOpacity
        style={[
          styles.selector,
          { borderColor: invalid ? colors.error : colors.border },
        ]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={{ color: selectedTailorId ? colors.text : colors.placeholder }}
        >
          {selectedTailorId
            ? tailors.find((t) => t.id === selectedTailorId)?.name
            : i18n.t("choose_tailor")}
        </Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <View style={[styles.modalBg, { backgroundColor: colors.modalBg }]}>
          <View style={[styles.modalBox, { backgroundColor: colors.modalBox }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {i18n.t("select_tailor")}
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: colors.inputBorder,
                  color: colors.text,
                },
              ]}
              placeholder={i18n.t("search")}
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.id);
                    setOpen(false);
                  }}
                >
                  <Text style={[styles.itemName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemInfo, { color: colors.info }]}>
                    {item.shop}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={[styles.closeBtn, { backgroundColor: colors.closeBtnBg }]}
              onPress={() => setOpen(false)}
            >
              <Text style={{ color: "#fff" }}>{i18n.t("close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  title: { fontWeight: "700", fontSize: 16 },
  selector: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  modalBg: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalBox: { padding: 16, borderRadius: 12 },
  modalTitle: { fontWeight: "700", fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  itemName: { fontWeight: "700" },
  itemInfo: { fontSize: 14 },
  closeBtn: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
