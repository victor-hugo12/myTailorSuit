// src/components/SaveModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

interface SaveModalProps {
  visible: boolean;
  initialName?: string;
  onClose: () => void;
  onConfirm: (name: string, destination: "local" | "cloud") => void;
}

const SaveModal: React.FC<SaveModalProps> = ({
  visible,
  initialName = "",
  onClose,
  onConfirm,
}) => {
  const [suitName, setSuitName] = useState(initialName);
  const [destination, setDestination] = useState<"local" | "cloud">("local");

  const handleConfirm = () => {
    if (!suitName.trim()) return;
    onConfirm(suitName.trim(), destination);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <Text style={styles.title}>Nombre del diseño</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Traje Azul Marino"
            value={suitName}
            onChangeText={setSuitName}
          />

          <Text style={styles.label}>Guardar en:</Text>
          <View style={styles.optionBox}>
            {["local", "cloud"].map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionButton,
                  destination === opt && styles.optionSelected,
                ]}
                onPress={() => setDestination(opt as "local" | "cloud")}
              >
                <Text
                  style={[
                    styles.optionText,
                    destination === opt && styles.optionTextSelected,
                  ]}
                >
                  {opt === "local" ? "Local" : "Nube"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SaveModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  label: { fontWeight: "bold", marginBottom: 8 },
  optionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
  },
  optionSelected: { backgroundColor: "#0B214A", borderColor: "#0B214A" },
  optionText: { color: "#000", fontWeight: "bold" },
  optionTextSelected: { color: "#fff" },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  cancel: { padding: 10 },
  cancelText: { color: "red", fontWeight: "bold" },
  confirm: { backgroundColor: "#0B214A", padding: 10, borderRadius: 6 },
  confirmText: { color: "white", fontWeight: "bold" },
});
