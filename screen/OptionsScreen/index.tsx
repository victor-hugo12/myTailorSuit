// src/screens/OptionsScreen/index.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";

import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  selectGarmentType,
  selectSelectedOptions,
  selectMeasurements,
  selectSelectedFabric,
  selectTheme,
  selectSize,
} from "redux/selections/selections.selectors";
import {
  updateMeasurement,
  changeSize,
  updateOption,
  selectFabric,
} from "redux/selections/selections.actions";

import { OPTIONS_BY_GARMENT } from "./constants";
import { saveSuit } from "storage/customSuit.storage";
import { saveSuitToCloud } from "storage/cloudUtils";

import Header from "components/Header";
import Preview from "components/Preview";
import DetailOptions from "./components/DetailOptions";
import MeasurementsPanel from "./components/MeasurementsPanel";
import FabricsGrid from "./components/FabricsGrid";
import ThemedSafeAreaView from "components/ThemedSafeAreaView";
import SuitNameModal from "components/Modals/SuitNameModal";
import { SavedSuit, FabricSelection } from "./types/suits";
import i18n from "language";
import en from "./en.json";
import es from "./es.json";
import { defaultSizes } from "./medidas";
import { firebaseAuth } from "config/firebaseConfig";

i18n.store(en);
i18n.store(es);

const MAIN_TABS = [
  { label: "measurements" },
  { label: "fabrics" },
  { label: "details" },
] as const;

export default function OptionsScreen() {
  const dispatch = useAppDispatch();

  const garment = useAppSelector(selectGarmentType);
  const selectedOptions = useAppSelector(selectSelectedOptions);
  const measurements = useAppSelector(selectMeasurements);
  const selectedFabric = useAppSelector(selectSelectedFabric);
  const theme = useAppSelector(selectTheme);
  const size = useAppSelector(selectSize);

  const previewRef = useRef<View>(null);

  const [activeTab, setActiveTab] = useState<
    "measurements" | "fabrics" | "details"
  >("details");
  const [showBackView, setShowBackView] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [suitName, setSuitName] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // ✅ Persistencia de sesión con RNFirebase v17
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const allOptionGroups = OPTIONS_BY_GARMENT[garment] || [];
  const currentOptionGroups = activeTab === "details" ? allOptionGroups : [];

  const mappedFabricForPreview: FabricSelection | null = useMemo(() => {
    if (!selectedFabric?.id || !selectedFabric?.name) return null;
    return {
      id: selectedFabric.id,
      name: selectedFabric.name,
      imageKey: selectedFabric.id,
    };
  }, [selectedFabric]);

  const handleChangeSize = (newSize: string) => {
    dispatch(changeSize({ size: newSize }));
    const sizeMeasurements = defaultSizes[garment]?.[newSize];
    if (!sizeMeasurements) return;
    Object.entries(sizeMeasurements).forEach(([field, value]) => {
      dispatch(updateMeasurement({ field, value }));
    });
  };

  const handleSave = async (
    name: string,
    action?: "local" | "cloud" | "save_changes" | "copy_cloud" | "copy_local"
  ) => {
    if (!previewRef.current) {
      Alert.alert(i18n.t("error"), "No se pudo generar la imagen");
      return;
    }

    try {
      const tmpUri = await captureRef(previewRef.current, {
        format: "png",
        quality: 0.8,
        result: "tmpfile",
      });

      const permanentUri =
        FileSystem.documentDirectory + `suit_${Date.now()}.png`;
      await FileSystem.copyAsync({ from: tmpUri, to: permanentUri });

      const suit: SavedSuit = {
        id: Date.now().toString(),
        name,
        garment,
        measurements: Object.fromEntries(
          Object.entries(measurements).map(([k, v]) => [k, Number(v) || 0])
        ),
        fabric: mappedFabricForPreview!,
        details: selectedOptions,
        savedAt: Date.now(),
        previewUri: permanentUri,
      };

      switch (action) {
        case "cloud":
        case "copy_cloud":
          if (!userLoggedIn) throw new Error("Usuario no logueado");
          await saveSuitToCloud(suit);
          break;
        default:
          await saveSuit(suit);
      }

      setShowNameModal(false);
      Alert.alert(i18n.t("success"), i18n.t("saved_successfully"));
    } catch (error) {
      console.error("Error saving suit:", error);
      Alert.alert(i18n.t("error"), i18n.t("failed_to_save"));
    }
  };

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <Header title={i18n.t("options_title")} showBackButton />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <FlatList
          data={[]}
          renderItem={() => null}
          keyExtractor={() => "root"}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={{ maxHeight: 600 }}>
                <Preview
                  ref={previewRef}
                  key={mappedFabricForPreview?.id ?? garment}
                  measurements={Object.fromEntries(
                    Object.entries(measurements).map(([k, v]) => [
                      k,
                      Number(v) || 0,
                    ])
                  )}
                  selectedOptions={selectedOptions}
                  garment={garment}
                  selectedFabric={
                    mappedFabricForPreview
                      ? { name: mappedFabricForPreview.name }
                      : undefined
                  }
                  forceBackView={showBackView}
                  onToggleView={() => setShowBackView((prev) => !prev)}
                />
              </View>

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
                    garmentType={garment}
                    theme={theme}
                    localMeasurements={measurements}
                    localSize={size}
                    onChangeMeasurement={(field, value) =>
                      dispatch(updateMeasurement({ field, value }))
                    }
                    onChangeSize={handleChangeSize}
                  />
                )}

                {activeTab === "fabrics" && (
                  <FabricsGrid
                    garment={garment}
                    selectedFabric={
                      mappedFabricForPreview
                        ? {
                            ...mappedFabricForPreview,
                            imageKey: mappedFabricForPreview.id,
                          }
                        : null
                    }
                    onSelectFabric={(fab) =>
                      dispatch(
                        selectFabric({
                          fabricId: fab.id,
                          fabricName: fab.name,
                          imageKey: fab.id,
                        })
                      )
                    }
                    theme={theme}
                  />
                )}

                {activeTab === "details" && (
                  <DetailOptions
                    theme={theme}
                    currentOptionGroups={currentOptionGroups}
                    selectedOptions={selectedOptions}
                    showBackView={showBackView}
                    setShowBackView={setShowBackView}
                    onSelectOption={(group, option) =>
                      dispatch(
                        updateOption({ groupLabel: group, optionId: option })
                      )
                    }
                  />
                )}
              </View>
            </>
          }
        />
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={styles.topRightSaveButton}
        onPress={() => {
          setSuitName("");
          setShowNameModal(true);
        }}
      >
        <Text style={styles.topRightSaveButtonText}>Guardar</Text>
      </TouchableOpacity>

      <SuitNameModal
        visible={showNameModal}
        saveOptions={userLoggedIn}
        initialName={suitName}
        onCancel={() => setShowNameModal(false)}
        onConfirm={handleSave}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  mainTabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mainTabTextActive: { color: "white" },
  contentContainer: { flex: 1 },
  topRightSaveButton: {
    position: "absolute",
    top: 90,
    right: 16,
    backgroundColor: "#0B214A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    zIndex: 10,
  },
  topRightSaveButtonText: { color: "white", fontWeight: "bold", fontSize: 14 },
});
