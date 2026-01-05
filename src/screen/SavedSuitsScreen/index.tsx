// src/screens/SavedSuitsScreen/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Portal,
  Dialog,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";

import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import Header from "@/components/Header";
import SuitsSection from "./components/SuitsSection";

import { SavedSuit } from "@/screen/OptionsScreen/types/suits";
import {
  loadAllSuits,
  deleteSuitById,
  saveSuit,
} from "@/storage/customSuit.storage";
import { saveSuitToCloud } from "@/storage/cloudUtils";

import i18n from "@/language";
import en from "./en.json";
import es from "./es.json";

i18n.store(en);
i18n.store(es);

// 🔹 React Native Firebase
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

interface SuitSavingState {
  isSaving: boolean;
  savedSuccessfully: boolean;
}

export default function SavedSuitsScreen() {
  const [localSuits, setLocalSuits] = useState<SavedSuit[]>([]);
  const [cloudSuits, setCloudSuits] = useState<SavedSuit[]>([]);
  const [activeView, setActiveView] = useState<"local" | "cloud">("local");
  const [savingStates, setSavingStates] = useState<
    Record<string, SuitSavingState>
  >({});
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [suitToDelete, setSuitToDelete] = useState<SavedSuit | null>(null);

  const user = auth().currentUser;
  const isLoggedIn = !!user;

  useEffect(() => {
    handleRefresh();
  }, []);

  // -------------------- REFRESH --------------------
  const handleRefresh = async () => {
    await loadLocalSuits();
    if (isLoggedIn) await loadCloudSuits();
  };

  // -------------------- CARGA --------------------
  const loadLocalSuits = async () => {
    const suits = await loadAllSuits();
    setLocalSuits(suits || []);
  };

  const loadCloudSuits = async () => {
    if (!user) return;

    const suitsCol = firestore()
      .collection("users")
      .doc(user.uid)
      .collection("suits");
    const snapshot = await suitsCol.get();

    const suits = snapshot.docs
      .map((doc) => {
        const data = doc.data() as Omit<SavedSuit, "id">;
        return { id: doc.id, ...data };
      })
      .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));

    setCloudSuits(suits);
  };

  // -------------------- GUARDAR --------------------
  const handleSaveToLocal = async (suit: SavedSuit) => {
    setSavingStates((prev) => ({
      ...prev,
      [suit.id]: { isSaving: true, savedSuccessfully: false },
    }));
    try {
      await saveSuit(suit);
      setSavingStates((prev) => ({
        ...prev,
        [suit.id]: { isSaving: false, savedSuccessfully: true },
      }));
      await loadLocalSuits();
    } catch {
      setSavingStates((prev) => ({
        ...prev,
        [suit.id]: { isSaving: false, savedSuccessfully: false },
      }));
    }
  };

  const handleSaveToCloud = async (suit: SavedSuit) => {
    if (!user) return;

    setSavingStates((prev) => ({
      ...prev,
      [suit.id]: { isSaving: true, savedSuccessfully: false },
    }));
    try {
      await saveSuitToCloud(suit);
      setSavingStates((prev) => ({
        ...prev,
        [suit.id]: { isSaving: false, savedSuccessfully: true },
      }));
      await loadCloudSuits();
    } catch {
      setSavingStates((prev) => ({
        ...prev,
        [suit.id]: { isSaving: false, savedSuccessfully: false },
      }));
    }
  };

  // -------------------- ELIMINAR --------------------
  const deleteLocalSuit = async (suit: SavedSuit) => {
    await deleteSuitById(suit.id);
    await loadLocalSuits();
  };

  const deleteCloudSuit = async (suit: SavedSuit) => {
    if (!user) return;

    const suitDocRef = firestore()
      .collection("users")
      .doc(user.uid)
      .collection("suits")
      .doc(suit.id);
    await suitDocRef.delete();
    await loadCloudSuits();
  };

  const suits = activeView === "local" ? localSuits : cloudSuits;

  return (
    <PaperProvider>
      <ThemedSafeAreaView>
        <Header title={i18n.t("my_designs")} showBackButton />

        {/* -------------------- SELECTOR DE VISTA -------------------- */}
        <View style={styles.viewSelector}>
          <Text
            style={[
              styles.viewButton,
              activeView === "local" && styles.viewButtonActive,
            ]}
            onPress={() => setActiveView("local")}
          >
            {i18n.t("local")}
          </Text>
          {isLoggedIn && (
            <Text
              style={[
                styles.viewButton,
                activeView === "cloud" && styles.viewButtonActive,
              ]}
              onPress={() => setActiveView("cloud")}
            >
              {i18n.t("cloud")}
            </Text>
          )}
        </View>

        {/* -------------------- SECCIÓN DE TRAJES -------------------- */}
        <SuitsSection
          title={
            activeView === "local"
              ? i18n.t("local_designs")
              : i18n.t("cloud_designs")
          }
          suits={suits}
          savingStates={savingStates}
          onDelete={(suit) => {
            setSuitToDelete(suit);
            setConfirmVisible(true);
          }}
          onSaveToLocal={handleSaveToLocal}
          onSaveToCloud={isLoggedIn ? handleSaveToCloud : undefined}
          source={activeView}
          onRefresh={handleRefresh}
          isLoggedIn={isLoggedIn}
        />

        {/* -------------------- DIÁLOGO -------------------- */}
        <Portal>
          <Dialog
            visible={confirmVisible}
            onDismiss={() => setConfirmVisible(false)}
          >
            <Dialog.Title>Confirmar eliminación</Dialog.Title>
            <Dialog.Content>
              <Text>
                ¿Deseas eliminar el traje{" "}
                <Text style={{ fontWeight: "bold" }}>{suitToDelete?.name}</Text>
                ?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setConfirmVisible(false)}>Cancelar</Button>
              <Button
                onPress={async () => {
                  if (!suitToDelete) return;
                  activeView === "local"
                    ? await deleteLocalSuit(suitToDelete)
                    : await deleteCloudSuit(suitToDelete);
                  setConfirmVisible(false);
                  setSuitToDelete(null);
                }}
              >
                Eliminar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ThemedSafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  viewSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
    gap: 10,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewButtonActive: { backgroundColor: "#0B214A" },
});
