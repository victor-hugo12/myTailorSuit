// src/screens/MyOrdersScreen/components/OrderCard.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import { selectTheme } from "../../../redux/selections/selections.selectors";
import i18n from "../../../language";
import {
  OrderStatus,
  ORDER_STATE_COLORS,
  ORDER_STATE_LABELS,
} from "../logic/orderFlow";
import { SavedSuit } from "screen/OptionsScreen/types/suits";
import { saveSuit } from "storage/customSuit.storage";
import { saveSuitToCloud, saveOrderPreviewToCloud } from "storage/cloudUtils";
import * as FileSystem from "expo-file-system";

export default function OrderCard({
  order,
  isTailor,
  onAcceptOrder,
  onRejectOrder,
  onSubmitQuote,
  onAcceptQuote,
  onRejectQuote,
  onPayDeposit,
  onStartProduction,
  onControlQuality,
  onReadyToShip,
  onMarkDelivered,
  onViewTechnicalSheet,
}: any) {
  const theme = useAppSelector(selectTheme);
  const [modalVisible, setModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const status: OrderStatus = order.status;
  const color = ORDER_STATE_COLORS[status];
  const label = ORDER_STATE_LABELS[status];
  const suit = order.suit || {};

  const colors =
    theme === "dark"
      ? {
          background: "#121212",
          card: "#1E1E1E",
          text: "#fff",
          secondaryText: "#ccc",
          accept: "#0B214A",
          reject: "#B91C1C",
          save: "#10B981",
        }
      : {
          background: "#fff",
          card: "#fff",
          text: "#0B214A",
          secondaryText: "#444",
          accept: "#0B214A",
          reject: "#B91C1C",
          save: "#10B981",
        };

  // ------------------ GUARDAR MODELO ------------------
  const handleCreateModel = async (type: "local" | "cloud") => {
    if (!order.suit) return;

    setModalVisible(false);
    setSaving(true);

    try {
      let suitData = order.suit;
      let previewUri = suitData.previewUri;

      if (!previewUri) {
        Alert.alert(i18n.t("cannot_save"), i18n.t("no_preview_available"));
        setSaving(false);
        return;
      }

      if (type === "cloud") {
        if (!previewUri.startsWith("file://")) {
          const tempUri = `${FileSystem.cacheDirectory}${Date.now()}.png`;
          const downloadResult = await FileSystem.downloadAsync(
            previewUri,
            tempUri
          );
          previewUri = await saveOrderPreviewToCloud({
            ...suitData,
            previewUri: downloadResult.uri,
          });
          await FileSystem.deleteAsync(downloadResult.uri, {
            idempotent: true,
          });
        } else {
          previewUri = await saveOrderPreviewToCloud(suitData);
        }

        const newModel: SavedSuit = {
          id: Date.now().toString(),
          name: suitData.name,
          garment: suitData.garment,
          previewUri,
          savedAt: Date.now(),
          measurements: suitData.measurements || null,
          fabric: suitData.fabric || null,
          details: suitData.details || {},
        };

        await saveSuitToCloud(newModel);
        Alert.alert(i18n.t("saved"), i18n.t("model_saved_cloud"));
      } else {
        const newModel: SavedSuit = {
          id: Date.now().toString(),
          name: suitData.name,
          garment: suitData.garment,
          previewUri,
          savedAt: Date.now(),
          measurements: suitData.measurements || null,
          fabric: suitData.fabric || null,
          details: suitData.details || {},
        };

        await saveSuit(newModel);
        Alert.alert(i18n.t("saved"), i18n.t("model_saved_local"));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(i18n.t("error"), i18n.t("could_not_save_model"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {i18n.t("order")} #{order.id}
      </Text>

      <View style={[styles.stateBadge, { backgroundColor: color }]}>
        <Text style={styles.stateText}>{label}</Text>
      </View>

      <View style={styles.suitRow}>
        {suit.previewUri && (
          <Image source={{ uri: suit.previewUri }} style={styles.image} />
        )}
        <View style={{ marginLeft: 12 }}>
          <Text style={[styles.label, { color: colors.text }]}>
            {i18n.t("name")}:
          </Text>
          <Text style={[styles.value, { color: colors.secondaryText }]}>
            {suit.name}
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>
            {i18n.t("type")}:
          </Text>
          <Text style={[styles.value, { color: colors.secondaryText }]}>
            {suit.garment}
          </Text>
        </View>
      </View>

      <Text style={[styles.label, { color: colors.text }]}>
        {i18n.t("client")}:
      </Text>
      <Text style={[styles.value, { color: colors.secondaryText }]}>
        {order?.client?.name || order?.client?.email}
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>
        {i18n.t("date")}:
      </Text>
      <Text style={[styles.value, { color: colors.secondaryText }]}>
        {order.createdAt?.toDate
          ? order.createdAt.toDate().toLocaleDateString()
          : "—"}
      </Text>

      {/* ESTIMACIÓN DEL SASTRE */}
      {!isTailor && order.status === "COTIZADO" && order.quote && (
        <View
          style={[
            styles.quoteContainer,
            {
              backgroundColor: colors.card,
              borderColor: colors.secondaryText,
              borderWidth: 1,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {i18n.t("tailor_estimate")}
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {i18n.t("price")}: ${order.quote.price.toFixed(2)}
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {i18n.t("delivery_time")}: {order.quote.time} {i18n.t("days")}
          </Text>
          {order.quote.notes ? (
            <Text style={[styles.value, { color: colors.text }]}>
              {i18n.t("notes")}: {order.quote.notes}
            </Text>
          ) : null}
        </View>
      )}

      {/* ACCIONES */}
      {isTailor && status === "PENDIENTE_APROBACION_SASTRE" && (
        <>
          <TouchableOpacity
            style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
            onPress={() => onAcceptOrder(order.id)}
          >
            <Text style={styles.btnText}>{i18n.t("accept_order")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rejectBtn, { backgroundColor: colors.reject }]}
            onPress={() => onRejectOrder(order.id)}
          >
            <Text style={styles.btnText}>{i18n.t("reject_order")}</Text>
          </TouchableOpacity>
        </>
      )}

      {isTailor && status === "PENDIENTE_COTIZACION" && (
        <TouchableOpacity
          style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
          onPress={() => onSubmitQuote(order.id)}
        >
          <Text style={styles.btnText}>{i18n.t("create_quote")}</Text>
        </TouchableOpacity>
      )}

      {!isTailor && status === "COTIZADO" && (
        <>
          <TouchableOpacity
            style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
            onPress={() => onAcceptQuote(order.id)}
          >
            <Text style={styles.btnText}>{i18n.t("accept_price")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rejectBtn, { backgroundColor: colors.reject }]}
            onPress={() => onRejectQuote(order.id)}
          >
            <Text style={styles.btnText}>{i18n.t("reject_price")}</Text>
          </TouchableOpacity>
        </>
      )}

      {!isTailor && status === "ESPERANDO_PAGO" && (
        <TouchableOpacity
          style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
          onPress={() => onPayDeposit(order.id)}
        >
          <Text style={styles.btnText}>{i18n.t("pay_deposit")}</Text>
        </TouchableOpacity>
      )}

      {isTailor && status === "ANTICIPO_PAGADO" && (
        <TouchableOpacity
          style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
          onPress={() => onStartProduction(order.id)}
        >
          <Text style={styles.btnText}>{i18n.t("start_production")}</Text>
        </TouchableOpacity>
      )}

      {isTailor && status === "EN_CONFECCIÓN" && (
        <TouchableOpacity
          style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
          onPress={() => onControlQuality(order.id)}
        >
          <Text style={styles.btnText}>{i18n.t("send_quality_control")}</Text>
        </TouchableOpacity>
      )}

      {isTailor && status === "CONTROL_CALIDAD" && (
        <TouchableOpacity
          style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
          onPress={() => onReadyToShip(order.id)}
        >
          <Text style={styles.btnText}>{i18n.t("mark_ready_to_ship")}</Text>
        </TouchableOpacity>
      )}

      {isTailor && status === "LISTO_ENVÍO" && (
        <TouchableOpacity
          style={[styles.acceptBtn, { backgroundColor: colors.accept }]}
          onPress={() => onMarkDelivered(order.id)}
        >
          <Text style={styles.btnText}>{i18n.t("mark_delivered")}</Text>
        </TouchableOpacity>
      )}

      {/* GUARDAR MODELO */}
      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: colors.save }]}
        onPress={() => setModalVisible(true)}
        disabled={saving}
      >
        <Text style={styles.saveBtnText}>
          {saving ? i18n.t("saving") : i18n.t("save_model")}
        </Text>
      </TouchableOpacity>

      {/* HOJA TÉCNICA */}
      <TouchableOpacity
        style={[styles.technicalBtn, { backgroundColor: colors.accept }]}
        onPress={onViewTechnicalSheet}
      >
        <Text style={styles.technicalBtnText}>
          {i18n.t("view_technical_sheet")}
        </Text>
      </TouchableOpacity>

      {/* MODAL DE SELECCIÓN */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {i18n.t("save_model")}
            </Text>

            <TouchableOpacity
              style={[styles.optionBtn, { backgroundColor: colors.accept }]}
              disabled={saving}
              onPress={() => handleCreateModel("local")}
            >
              <Text style={styles.btnText}>{i18n.t("save_local")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionBtn, { backgroundColor: colors.accept }]}
              disabled={saving}
              onPress={() => handleCreateModel("cloud")}
            >
              <Text style={styles.btnText}>{i18n.t("save_cloud")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rejectBtn, { backgroundColor: colors.reject }]}
              disabled={saving}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnText}>{i18n.t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, borderRadius: 12, marginBottom: 16, elevation: 3 },
  title: { fontWeight: "700", fontSize: 16 },
  stateBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginVertical: 6,
  },
  stateText: { color: "#fff", fontWeight: "700" },
  suitRow: { flexDirection: "row", marginVertical: 10 },
  image: { width: 80, height: 100, borderRadius: 8 },
  label: { fontWeight: "600", marginTop: 6 },
  value: { fontWeight: "600", fontSize: 14, marginTop: 2 },
  acceptBtn: { padding: 10, borderRadius: 8, marginTop: 10 },
  rejectBtn: { padding: 10, borderRadius: 8, marginTop: 10 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  saveBtn: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "700" },
  technicalBtn: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  technicalBtnText: { color: "#fff", fontWeight: "700" },
  quoteContainer: { marginTop: 12, padding: 10, borderRadius: 8 },
  sectionTitle: { fontWeight: "700", marginBottom: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: { padding: 20, borderRadius: 12 },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  optionBtn: { padding: 12, borderRadius: 8, marginBottom: 10 },
});
