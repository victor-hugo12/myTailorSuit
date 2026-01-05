// src/screens/CreateOrderScreen/components/OrderSuitCard.tsx

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SavedSuit } from "@/screen/OptionsScreen/types/suits";
import { getOptionLabelById } from "@/utils/getOptionLabel";

import i18n from "../../../language";
import en from "../en.json";
import es from "../es.json";

import { useAppSelector } from "../../../redux/hooks";
import { selectTheme } from "../../../redux/selections/selections.selectors";

i18n.store(en);
i18n.store(es);

/* ---------------------------------------------------------
   COMPONENTE ROW → ahora recibe colores dinámicos
--------------------------------------------------------- */
function Row({
  label,
  value,
  labelColor,
  valueColor,
}: {
  label: string;
  value: string | number;
  labelColor?: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.rowItem}>
      <Text style={[styles.rowLabel, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: valueColor }]}>
        {String(value)}
      </Text>
    </View>
  );
}

/* ---------------------------------------------------------
   COMPONENTE PRINCIPAL
--------------------------------------------------------- */
export default function OrderSuitCard({ suit }: { suit: SavedSuit }) {
  const [open, setOpen] = useState(false);

  const theme = useAppSelector(selectTheme);

  const colors =
    theme === "dark"
      ? {
          card: "#1e1e1e",
          text: "#fff",
          info: "#ccc",
          border: "#666",
          modal: "#252525",
          modalTitle: "#fff",
          section: "#333",
        }
      : {
          card: "#fff",
          text: "#000",
          info: "#444",
          border: "#bbb",
          modal: "#fff",
          modalTitle: "#000",
          section: "#F6F7FA",
        };

  const estimatedPrice = suit.details?.estimatedPrice ?? "—";

  const groupedDetails = useMemo(() => {
    const details = suit.details || {};
    const result: { label: string; value: string }[] = [];

    for (const key in details) {
      const rawValue = details[key];

      let value: string | number = rawValue;

      if (typeof rawValue === "number") {
        const label = getOptionLabelById(suit.garment, rawValue);
        value = typeof label === "number" ? String(label) : label;
      }

      result.push({
        label: key,
        value: String(value),
      });
    }

    return result;
  }, [suit.details, suit.garment]);

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      {/* --------------- ENCABEZADO --------------- */}
      <View style={styles.headerRow}>
        {suit.previewUri ? (
          <Image source={{ uri: suit.previewUri }} style={styles.thumb} />
        ) : (
          <View
            style={[
              styles.thumbPlaceholder,
              { backgroundColor: colors.section },
            ]}
          >
            <Text style={{ color: colors.text }}>{i18n.t("no_image")}</Text>
          </View>
        )}

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={[styles.title, { color: colors.text }]}>
            {suit.name}
          </Text>

          <Text style={[styles.info, { color: colors.info }]}>
            {i18n.t("garment")}: {i18n.t(suit.garment)}
          </Text>

          <Text style={[styles.info, { color: colors.info }]}>
            {i18n.t("fabric")}: {suit.fabric?.name ?? "—"}
          </Text>

          <Text style={[styles.info, { color: colors.info }]}>
            {i18n.t("estimated_price")}: {estimatedPrice}
          </Text>
        </View>
      </View>

      {/* --------------- BOTÓN DETALLES --------------- */}
      <TouchableOpacity style={styles.detailsBtn} onPress={() => setOpen(true)}>
        <Text style={styles.detailsBtnText}>{i18n.t("view_details")}</Text>
      </TouchableOpacity>

      {/* ============================================================
         MODAL DETALLES
      ============================================================ */}
      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.modal }]}>
            <TouchableOpacity
              style={styles.closeBtnAbsolute}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.closeBtnText}>X</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingTop: 40 }}>
              <Text style={[styles.modalTitle, { color: colors.modalTitle }]}>
                {suit.name}
              </Text>

              {/* Imagen + info general */}
              <View style={styles.infoRow}>
                {suit.previewUri && (
                  <Image
                    source={{ uri: suit.previewUri }}
                    style={styles.bigImage}
                  />
                )}

                <View style={styles.generalInfo}>
                  <Row
                    label={i18n.t("garment")}
                    value={i18n.t(suit.garment)}
                    labelColor={colors.text}
                    valueColor={colors.info}
                  />
                  <Row
                    label={i18n.t("fabric")}
                    value={suit.fabric?.name ?? "—"}
                    labelColor={colors.text}
                    valueColor={colors.info}
                  />
                  <Row
                    label={i18n.t("estimated_price")}
                    value={estimatedPrice}
                    labelColor={colors.text}
                    valueColor={colors.info}
                  />
                </View>
              </View>

              {/* Medidas */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {i18n.t("measurements")}
              </Text>
              <View
                style={[styles.sectionBox, { backgroundColor: colors.section }]}
              >
                {Object.entries(suit.measurements || {}).map(([key, value]) => (
                  <Row
                    key={key}
                    label={i18n.t(key)}
                    value={value}
                    labelColor={colors.text}
                    valueColor={colors.info}
                  />
                ))}
              </View>

              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {i18n.t("technical_details")}
              </Text>
              <View
                style={[styles.sectionBox, { backgroundColor: colors.section }]}
              >
                {groupedDetails.map((item, i) => (
                  <Row
                    key={i}
                    label={i18n.t(item.label)}
                    value={i18n.t(item.value)}
                    labelColor={colors.text}
                    valueColor={colors.info}
                  />
                ))}
              </View>

              <View style={{ height: 30 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ---------------------------------------------------------
   ESTILOS BASE
--------------------------------------------------------- */
const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 14,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 4,
  },

  info: {
    fontSize: 14,
  },

  thumb: {
    width: 90,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  thumbPlaceholder: {
    width: 90,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  detailsBtn: {
    marginTop: 12,
    backgroundColor: "#0B214A",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  detailsBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    borderRadius: 12,
    padding: 14,
    maxHeight: "90%",
    position: "relative",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 14,
  },

  bigImage: {
    width: "50%",
    height: 280,
    borderRadius: 12,
    marginRight: 10,
  },

  generalInfo: {
    flex: 1,
    justifyContent: "center",
  },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 14,
    marginBottom: 6,
  },

  sectionBox: {
    borderRadius: 10,
    padding: 10,
  },

  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  rowLabel: {
    fontWeight: "600",
  },

  rowValue: {
    maxWidth: "60%",
    textAlign: "right",
  },

  closeBtnAbsolute: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "#0B214A",
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  closeBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
