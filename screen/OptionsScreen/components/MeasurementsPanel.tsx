import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { defaultSizes } from "../medidas";
import { measurementInstructions } from "../measurementInstructions";
import { validateMeasurement } from "../rules/validateMeasurement";
import i18n from "../../../language";
import en from "../en.json";
import es from "../es.json";
import MeasurementInstructionsModal from "./MeasurementInstructionsModal";
i18n.store(en);
i18n.store(es);

interface MeasurementsPanelProps {
  garmentType: "pants" | "vest" | "coat";
  localMeasurements: Record<string, string>;
  localSize: string;
  onChangeMeasurement: (field: string, value: string) => void;
  onChangeSize: (size: string) => void;
  theme: "light" | "dark";
}

const STEP = 0.5;
const INTERVAL_MS = 150;

const MeasurementsPanel: React.FC<MeasurementsPanelProps> = ({
  garmentType,
  localMeasurements,
  localSize,
  onChangeMeasurement,
  onChangeSize,
  theme,
}) => {
  const garmentSizes = Object.keys(defaultSizes[garmentType]);
  const measurementEntries = Object.entries(localMeasurements);
  const dynamicStyles = getDynamicStyles(theme);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tempValues, setTempValues] =
    useState<Record<string, string>>(localMeasurements);

  const [sizesVisible, setSizesVisible] = useState(true); // mostrar/ocultar tallas

  useEffect(() => {
    setTempValues(localMeasurements);
  }, [localMeasurements]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    steps: string[];
    images: any[];
  }>({ title: "", steps: [], images: [] });

  const finalizeMeasurement = (field: string, text: string) => {
    const nextValue = parseFloat(text);
    if (isNaN(nextValue)) {
      setTempValues((prev) => ({ ...prev, [field]: localMeasurements[field] }));
      return;
    }

    const validation = validateMeasurement(
      garmentType,
      field,
      nextValue,
      localMeasurements
    );

    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        [field]: validation.message || i18n.t("invalid_value"),
      }));
      setTempValues((prev) => ({ ...prev, [field]: localMeasurements[field] }));
      return;
    }

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });

    onChangeMeasurement(field, nextValue.toString());
    setTempValues((prev) => ({ ...prev, [field]: nextValue.toString() }));
  };

  const adjustMeasurement = (field: string, delta: number) => {
    const current = parseFloat(localMeasurements[field] || "0");
    const next = Math.max(0, current + delta);
    finalizeMeasurement(field, next.toString());
  };

  const startAdjusting = (field: string, delta: number) => {
    adjustMeasurement(field, delta);
    intervalRef.current = setInterval(() => {
      adjustMeasurement(field, delta);
    }, INTERVAL_MS);
  };

  const stopAdjusting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const showInstructions = (key: string) => {
    const instruction = measurementInstructions[garmentType][key];
    if (!instruction) return;

    const imagesMap: Record<string, any[]> = {
      vestLength: [
        require("assets/instructions/lenghtCoat1.png"),
        require("assets/instructions/lenghtCoat2.png"),
      ],
      shoulderWidth: [
        require("assets/instructions/ShoulderCoatVest1.png"),
        require("assets/instructions/ShoulderCoatVest2.png"),
      ],
      chest: [require("assets/instructions/ChestCoatVest.png")],
      waist: [require("assets/instructions/waistPants.png")],
      thigh: [require("assets/instructions/thighPants.png")],
      knee: [require("assets/instructions/kneePants.png")],
      boot: [require("assets/instructions/hemPants.png")],
      sleeveLength: [
        require("assets/instructions/ArmCoatVest1.png"),
        require("assets/instructions/ArmCoatVest2.png"),
        require("assets/instructions/ArmCoatVest3.png"),
      ],
      length: [
        require("assets/instructions/lenghtPants1.png"),
        require("assets/instructions/lenghtPants2.png"),
        require("assets/instructions/lenghtPants3.png"),
      ],
      inseam: [
        require("assets/instructions/shotPants1.png"),
        require("assets/instructions/shotPants2.png"),
        require("assets/instructions/shotPants3.png"),
      ],
    };

    setModalData({
      title: instruction.title,
      steps: instruction.steps,
      images: imagesMap[key] || [],
    });
    setModalVisible(true);
  };

  return (
    <View style={dynamicStyles.container}>
      <ScrollView
        style={dynamicStyles.measurementsContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* BOTÓN PARA MOSTRAR/OCULTAR TALLAS */}
        <TouchableOpacity
          style={dynamicStyles.toggleSizesButton}
          onPress={() => setSizesVisible(!sizesVisible)}
        >
          <Text style={dynamicStyles.toggleSizesText}>
            {sizesVisible ? "▼ Tallas" : "▶ Tallas"}
          </Text>
        </TouchableOpacity>

        {sizesVisible && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={dynamicStyles.horizontalSizesContainer}
          >
            {garmentSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  dynamicStyles.radioButtonHorizontal,
                  localSize === size &&
                    dynamicStyles.radioButtonActiveHorizontal,
                ]}
                onPress={() => onChangeSize(size)}
              >
                <Text
                  style={[
                    dynamicStyles.radioLabel,
                    localSize === size && dynamicStyles.radioLabelActive,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* INPUTS */}
        <View style={dynamicStyles.inputsWrapper}>
          {measurementEntries.map(([key, value]) => (
            <View key={key} style={dynamicStyles.inputGroup}>
              <Text style={dynamicStyles.inputLabel}>{i18n.t(key)}</Text>

              <View style={dynamicStyles.inputRow}>
                <TouchableOpacity
                  style={dynamicStyles.adjustButton}
                  onPressIn={() => startAdjusting(key, -STEP)}
                  onPressOut={stopAdjusting}
                >
                  <Text style={dynamicStyles.adjustButtonText}>−</Text>
                </TouchableOpacity>

                <View style={dynamicStyles.inputWithInfo}>
                  <TextInput
                    style={[
                      dynamicStyles.input,
                      errors[key] ? dynamicStyles.inputError : null,
                    ]}
                    value={tempValues[key]}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setTempValues((prev) => ({ ...prev, [key]: text }))
                    }
                    onEndEditing={(e) =>
                      finalizeMeasurement(key, e.nativeEvent.text)
                    }
                    placeholderTextColor={theme === "dark" ? "#888" : "#999"}
                  />
                  <TouchableOpacity
                    onPress={() => showInstructions(key)}
                    style={dynamicStyles.infoButton}
                  >
                    <Text style={dynamicStyles.infoText}>ℹ️</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={dynamicStyles.adjustButton}
                  onPressIn={() => startAdjusting(key, STEP)}
                  onPressOut={stopAdjusting}
                >
                  <Text style={dynamicStyles.adjustButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              {errors[key] && (
                <Text style={dynamicStyles.errorText}>{errors[key]}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <MeasurementInstructionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalData.title}
        steps={modalData.steps}
        images={modalData.images}
      />
    </View>
  );
};

const getDynamicStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: isDark ? "#121212" : "#fff",
    },
    measurementsContainer: { width: "100%" },
    toggleSizesButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginBottom: 6,
      backgroundColor: isDark ? "#1E1E1E" : "#F3F4F6",
      borderRadius: 6,
    },
    toggleSizesText: {
      fontSize: 14,
      fontWeight: "bold",
      color: isDark ? "#FFF" : "#0B214A",
    },
    horizontalSizesContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 10,
      gap: 10,
    },
    radioButtonHorizontal: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ccc",
      marginRight: 10,
      backgroundColor: "#F3F4F6",
    },
    radioButtonActiveHorizontal: {
      backgroundColor: "#E0E7FF",
      borderColor: "#0B214A",
    },
    radioLabel: { fontSize: 15, color: "#333", fontWeight: "500" },
    radioLabelActive: { fontWeight: "bold", color: "#0B214A" },
    inputsWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 10,
    },
    inputGroup: { width: "30%", marginBottom: 12 },
    inputLabel: {
      fontSize: 14,
      color: "#555",
      marginBottom: 6,
      fontWeight: "500",
    },
    inputRow: { flexDirection: "row", alignItems: "center" },
    adjustButton: {
      width: 22,
      height: 34,
      borderRadius: 6,
      backgroundColor: "#E5E7EB",
      justifyContent: "center",
      alignItems: "center",
    },
    adjustButtonText: { fontSize: 20, fontWeight: "bold", color: "#0B214A" },
    inputWithInfo: { flex: 1, position: "relative" },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 6,
      padding: 10,
      fontSize: 14,
      paddingRight: 28,
    },
    infoButton: {
      position: "absolute",
      right: 4,
      top: 4,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    infoText: { fontSize: 14, color: "#0B214A" },
    inputError: { borderColor: "#DC2626" },
    errorText: { marginTop: 4, fontSize: 12, color: "#DC2626" },
  });
};

export default MeasurementsPanel;
