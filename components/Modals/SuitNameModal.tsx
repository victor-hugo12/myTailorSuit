// src/components/SuitNameModal.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useAppSelector } from "redux/hooks";
import { selectTheme } from "redux/selections/selections.selectors";

// 🔹 Firebase modular
import { firebaseAuth } from "config/firebaseConfig";

export interface SuitNameModalProps {
  visible: boolean;
  initialName?: string;
  onCancel: () => void;
  onConfirm: (
    name: string,
    action?: "save_changes" | "copy_cloud" | "copy_local" | "local" | "cloud"
  ) => Promise<void>;
  saveOptions?: boolean;
  saveButtons?: {
    label: string;
    value: "save_changes" | "copy_cloud" | "copy_local";
  }[];
}

const SuitNameModal: React.FC<SuitNameModalProps> = ({
  visible,
  initialName = "",
  onCancel,
  onConfirm,
  saveOptions = false,
  saveButtons = [],
}) => {
  const theme = useAppSelector(selectTheme);

  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [destination, setDestination] = useState<"local" | "cloud">("local");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setName(initialName);
  }, [initialName, visible]);

  useEffect(() => {
    try {
      const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        setUserLoggedIn(!!user);
      });
      return unsubscribe;
    } catch (e) {
      console.log("Firebase no inicializado:", e);
      setUserLoggedIn(false);
    }
  }, []);

  const handleConfirm = async (actionParam?: string) => {
    if (!name.trim()) {
      alert("Debes ingresar un nombre.");
      return;
    }

    setSaving(true);
    try {
      const actionToPass =
        actionParam ?? (saveOptions ? destination : undefined);
      await onConfirm(name.trim(), actionToPass as any);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSaving(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Error al guardar.");
      setSaving(false);
    }
  };

  const colors = {
    backdrop: "rgba(0,0,0,0.5)",
    modalBackground: theme === "dark" ? "#1E1E1E" : "#fff",
    text: theme === "dark" ? "#fff" : "#000",
    border: theme === "dark" ? "#555" : "#ccc",
    primary: "#0B214A",
    danger: "#ff3030",
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={[styles.modalBackdrop, { backgroundColor: colors.backdrop }]}
        activeOpacity={1}
        onPress={onCancel}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalBox, { backgroundColor: colors.modalBackground }]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onCancel}
            disabled={saving}
          >
            <Text style={[styles.closeText, { color: colors.danger }]}>×</Text>
          </TouchableOpacity>

          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Nombre del diseño
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: theme === "dark" ? "#2A2A2A" : "#fff",
              },
            ]}
            placeholder="Ej: Traje Azul Marino"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#888"}
            value={name}
            onChangeText={setName}
          />

          {saveOptions && (
            <>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 8,
                  color: colors.text,
                }}
              >
                Guardar en:
              </Text>
              <View style={styles.saveOptionBox}>
                {["local", userLoggedIn ? "cloud" : null]
                  .filter(Boolean)
                  .map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.saveOptionButton,
                        {
                          borderColor: colors.border,
                          backgroundColor:
                            destination === opt
                              ? colors.primary
                              : "transparent",
                        },
                      ]}
                      onPress={() => setDestination(opt as "local" | "cloud")}
                      disabled={saving}
                    >
                      <Text
                        style={{
                          color: destination === opt ? "#fff" : colors.text,
                          fontWeight: "bold",
                        }}
                      >
                        {opt === "local" ? "Local" : "Nube"}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </>
          )}

          {saveButtons.length > 0 ? (
            saveButtons.map((btn) => (
              <TouchableOpacity
                key={btn.value}
                style={[
                  styles.saveButton,
                  {
                    opacity: saving ? 0.6 : 1,
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => handleConfirm(btn.value)}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>{btn.label}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
                disabled={saving}
              >
                <Text style={[styles.cancelText, { color: colors.danger }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={() => handleConfirm()}
                disabled={saving || success}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.confirmText}>
                    {success ? "✔️ Guardado" : "Guardar"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default SuitNameModal;

const styles = StyleSheet.create({
  modalBackdrop: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalBox: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    position: "relative",
  },
  closeButton: { position: "absolute", top: 10, right: 20, zIndex: 50 },
  closeText: { fontSize: 28, fontWeight: "bold" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 20 },
  saveOptionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  saveOptionButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: "center",
  },
  saveButtonText: { color: "white", fontWeight: "bold", fontSize: 14 },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cancelButton: { padding: 10 },
  cancelText: { fontWeight: "bold" },
  confirmButton: { padding: 10, borderRadius: 6 },
  confirmText: { color: "white", fontWeight: "bold" },
});
