// src/screens/EditSuitScreen/index.tsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { SavedSuit } from "../OptionsScreen/types/suits";
import { loadSuitById, saveSuit } from "storage/customSuit.storage";
import { loadSuitsFromCloud } from "storage/cloud.storage";
import { saveSuitToCloud } from "storage/cloudUtils";

import Header from "components/Header";
import Preview from "components/Preview";
import DetailOptions from "../OptionsScreen/components/DetailOptions";
import MeasurementsPanel from "../OptionsScreen/components/MeasurementsPanel";
import FabricsGrid from "../OptionsScreen/components/FabricsGrid";
import ThemedSafeAreaView from "components/ThemedSafeAreaView";

import { OPTIONS_BY_GARMENT } from "../OptionsScreen/constants";
import i18n from "../../language";
import en from "../OptionsScreen/en.json";
import es from "../OptionsScreen/es.json";

import uuid from "react-native-uuid";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import SuitNameModal from "components/Modals/SuitNameModal";
import { selectTheme } from "redux/selections/selections.selectors";
import { useAppSelector } from "redux/hooks";

i18n.store(en);
i18n.store(es);

const MAIN_TABS = [
  { label: "measurements" },
  { label: "fabrics" },
  { label: "details" },
];

export default function EditSuitScreen() {
  const router = useRouter();
  const { suitId } = useLocalSearchParams<{ suitId: string }>();
  const theme = useAppSelector(selectTheme);
  const previewRef = useRef<View>(null);

  const [loadedSuit, setLoadedSuit] = useState<SavedSuit | null>(null);
  const [suitSource, setSuitSource] = useState<"local" | "cloud">("local");
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0].label);
  const [showBackView, setShowBackView] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [suitName, setSuitName] = useState("");

  const [localDetails, setLocalDetails] = useState<Record<string, number>>({});
  const [localFabric, setLocalFabric] = useState<any>(null);

  useEffect(() => {
    if (suitId) loadSuit();
  }, [suitId]);

  const loadSuit = async () => {
    try {
      let result: SavedSuit | null = await loadSuitById(String(suitId));
      if (!result) {
        const cloudSuits = await loadSuitsFromCloud();
        result =
          cloudSuits.find((s) => String(s.id) === String(suitId)) || null;
        if (result) setSuitSource("cloud");
      } else setSuitSource("local");

      if (!result) {
        Alert.alert(i18n.t("error"), i18n.t("suit_not_found"));
        router.back();
        return;
      }

      setLoadedSuit(result);
      setLocalDetails(result.details || {});
      setLocalFabric(
        result.fabric ? { ...result.fabric, imageKey: result.fabric.id } : null
      );
      setActiveTab(MAIN_TABS[0].label);
    } catch (err) {
      console.error(err);
      Alert.alert(i18n.t("error"), i18n.t("failed_to_load"));
      router.back();
    }
  };

  const currentOptionGroups = useMemo(() => {
    if (!loadedSuit) return [];
    return OPTIONS_BY_GARMENT[loadedSuit.garment] || [];
  }, [loadedSuit]);

  const generatePreviewUri = async (): Promise<string | undefined> => {
    if (!previewRef.current) {
      console.warn("Preview ref not ready");
      return undefined;
    }
    try {
      const tempUri = await captureRef(previewRef.current, {
        format: "png",
        quality: 0.8,
        result: "tmpfile",
      });
      const permanentUri =
        FileSystem.documentDirectory + `suit_${Date.now()}.png`;
      await FileSystem.copyAsync({ from: tempUri, to: permanentUri });
      return permanentUri;
    } catch (err) {
      console.error("Error generating preview:", err);
      return undefined;
    }
  };

  const handleSave = async (
    name: string,
    action?: "local" | "cloud" | "save_changes" | "copy_cloud" | "copy_local"
  ) => {
    if (!loadedSuit) return;

    if (!name.trim()) {
      Alert.alert("Nombre requerido", "Debes ingresar un nombre para guardar.");
      return;
    }

    let newSuit: SavedSuit = {
      ...loadedSuit,
      name: name.trim(),
      measurements: loadedSuit.measurements || {},
      fabric: localFabric || {},
      details: localDetails || {},
      savedAt: Date.now(),
      id: loadedSuit.id,
    };

    try {
      const previewUri = await generatePreviewUri();
      if (previewUri) newSuit.previewUri = previewUri;

      switch (action) {
        case "save_changes":
          if (suitSource === "cloud") {
            const publicUrl = await saveSuitToCloud(
              newSuit,
              previewRef.current,
              loadedSuit.id
            );
            newSuit.previewUri = publicUrl;
            Alert.alert(i18n.t("saved"), i18n.t("updated_in_cloud"));
          } else {
            await saveSuit(newSuit);
            Alert.alert(i18n.t("saved"), i18n.t("updated_locally"));
          }
          setLoadedSuit({ ...newSuit });
          break;

        case "copy_cloud":
          newSuit = { ...newSuit, id: uuid.v4().toString() };
          const publicUrlCopy = await saveSuitToCloud(
            newSuit,
            previewRef.current
          );
          newSuit.previewUri = publicUrlCopy;
          setLoadedSuit({ ...newSuit });
          setSuitSource("cloud");
          Alert.alert(i18n.t("saved"), i18n.t("saved_to_cloud"));
          break;

        case "copy_local":
        case "local":
          newSuit = { ...newSuit, id: uuid.v4().toString() };
          await saveSuit(newSuit);
          setLoadedSuit({ ...newSuit });
          setSuitSource("local");
          Alert.alert(i18n.t("saved"), i18n.t("saved_locally"));
          break;

        case "cloud":
          const publicUrlCloud = await saveSuitToCloud(
            newSuit,
            previewRef.current
          );
          newSuit.previewUri = publicUrlCloud;
          setLoadedSuit({ ...newSuit });
          setSuitSource("cloud");
          Alert.alert(i18n.t("saved"), i18n.t("saved_to_cloud"));
          break;

        default:
          await saveSuit(newSuit);
          setLoadedSuit({ ...newSuit });
          setSuitSource("local");
          Alert.alert(i18n.t("saved"), i18n.t("saved_locally"));
          break;
      }

      setShowSaveModal(false);
    } catch (error) {
      console.error("Error saving suit:", error);
      Alert.alert(i18n.t("error"), i18n.t("failed_to_save"));
    }
  };

  if (!loadedSuit) {
    return (
      <ThemedSafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>{i18n.t("loading") || "Cargando..."}</Text>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <Header title={i18n.t("edit_design")} showBackButton />

      <View style={styles.topButtonsWrapper}>
        <TouchableOpacity
          style={styles.topSmallButton}
          onPress={() => {
            setSuitName(loadedSuit.name || "");
            setShowSaveModal(true);
          }}
        >
          <Text style={styles.topSmallButtonText}>{i18n.t("save")}</Text>
        </TouchableOpacity>
      </View>

      <Preview
        ref={previewRef}
        garment={loadedSuit.garment}
        measurements={loadedSuit.measurements || {}}
        selectedOptions={localDetails}
        selectedFabric={localFabric ?? undefined}
        forceBackView={showBackView}
        onToggleView={() => setShowBackView(!showBackView)}
      />

      {/* Tabs */}
      <View style={styles.mainTabsContainer}>
        {MAIN_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={[
              styles.mainTabButton,
              activeTab === tab.label && styles.mainTabButtonActive,
            ]}
            onPress={() => setActiveTab(tab.label)}
          >
            <Text
              style={[
                styles.mainTabText,
                activeTab === tab.label && styles.mainTabTextActive,
              ]}
            >
              {i18n.t(tab.label)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>
        {activeTab === "measurements" && (
          <MeasurementsPanel
            garmentType={loadedSuit.garment}
            theme={theme}
            localMeasurements={Object.fromEntries(
              Object.entries(loadedSuit.measurements || {}).map(([k, v]) => [
                k,
                String(v),
              ])
            )}
            localSize={loadedSuit.size || "M"}
            onChangeMeasurement={(field, valueStr) =>
              setLoadedSuit((prev) =>
                prev
                  ? {
                      ...prev,
                      measurements: {
                        ...prev.measurements,
                        [field]: Number(valueStr) || 0,
                      },
                    }
                  : prev
              )
            }
            onChangeSize={(size) =>
              setLoadedSuit((prev) => (prev ? { ...prev, size } : prev))
            }
          />
        )}
        {activeTab === "fabrics" && (
          <FabricsGrid
            garment={loadedSuit.garment}
            selectedFabric={localFabric}
            onSelectFabric={(fab) =>
              setLocalFabric({ ...fab, imageKey: fab.id })
            }
            theme={theme}
          />
        )}
        {activeTab === "details" && (
          <DetailOptions
            theme={theme}
            currentOptionGroups={currentOptionGroups}
            selectedOptions={localDetails}
            showBackView={showBackView}
            setShowBackView={setShowBackView}
            onSelectOption={(group, optionId) =>
              setLocalDetails((prev) => ({ ...prev, [group]: optionId }))
            }
          />
        )}
      </View>

      {/* Modal para guardar */}
      <SuitNameModal
        visible={showSaveModal}
        initialName={suitName}
        saveButtons={[
          { label: "Guardar cambios", value: "save_changes" },
          { label: "Copia en nube", value: "copy_cloud" },
          { label: "Copia local", value: "copy_local" },
        ]}
        onConfirm={handleSave}
        onCancel={() => setShowSaveModal(false)}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  topButtonsWrapper: {
    position: "absolute",
    top: 90,
    right: 16,
    flexDirection: "row",
    gap: 8,
    zIndex: 20,
  },
  topSmallButton: {
    backgroundColor: "#0B214A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  topSmallButtonText: { color: "white", fontWeight: "bold" },
  mainTabsContainer: {
    flexDirection: "row",
    backgroundColor: "#0B214A",
    height: 50,
  },
  mainTabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "transparent",
  },
  mainTabButtonActive: { borderBottomColor: "white" },
  mainTabText: { color: "white", fontSize: 16, fontWeight: "bold" },
  mainTabTextActive: { color: "white" },
  contentContainer: { flex: 1 },
});
