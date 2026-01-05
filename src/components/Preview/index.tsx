import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { PantsBack } from "@/components/Pants/pantBack";
import { Pants } from "@/components/Pants";
import VestBack from "@/components/Vest/vestBack";
import Vest from "@/components/Vest";
import CoatBack from "@/components/Coat/coatBack";
import Coat from "@/components/Coat";
import { Textures } from "@/components/Textura/textura";

interface PreviewProps {
  garment: "pants" | "vest" | "coat";
  measurements: Record<string, number>;
  selectedOptions?: Record<string, number>;
  selectedFabric?: { name: string };
  forceBackView?: boolean;
  onToggleView?: () => void;
  onCapture?: (uri: string) => void; // callback para enviar la imagen
}

const Preview = forwardRef<View, PreviewProps>((props, ref) => {
  const {
    garment,
    measurements,
    selectedOptions = {},
    selectedFabric,
    forceBackView,
    onToggleView,
    onCapture,
  } = props;

  const [internalBackView, setInternalBackView] = useState(false);

  const containerRef = useRef<View>(null);

  useImperativeHandle(ref, () => {
    if (!containerRef.current) throw new Error("Preview ref no disponible");
    return containerRef.current;
  });

  const fabricKey = selectedFabric?.name ?? "default";
  const isBackView =
    forceBackView !== undefined ? forceBackView : internalBackView;

  const svgWidth = 400;
  const svgHeight = 600;

  let content: React.ReactNode = null;

  if (garment === "pants") {
    const optionsWithFlyType = { ...selectedOptions };
    content = isBackView ? (
      <PantsBack
        waist={measurements.waist || 80}
        thigh={measurements.thigh || 50}
        knee={measurements.knee || 40}
        boot={measurements.boot || 20}
        length={measurements.length || 100}
        inseam={measurements.inseam || 75}
        selectedFabric={selectedFabric}
        selectedOptions={optionsWithFlyType}
      />
    ) : (
      <Pants
        waist={measurements.waist || 80}
        thigh={measurements.thigh || 50}
        knee={measurements.knee || 40}
        boot={measurements.boot || 20}
        length={measurements.length || 100}
        inseam={measurements.inseam || 75}
        selectedFabric={selectedFabric}
        selectedOptions={optionsWithFlyType}
      />
    );
  } else if (garment === "vest") {
    content = isBackView ? (
      <VestBack
        vestLength={measurements.vestLength || 60}
        shoulderWidth={measurements.shoulderWidth || 40}
        chest={measurements.chest || 50}
        waist={measurements.waist || 80}
        selectedOptions={selectedOptions}
        selectedFabric={selectedFabric}
      />
    ) : (
      <Vest
        vestLength={measurements.vestLength || 60}
        shoulderWidth={measurements.shoulderWidth || 40}
        chest={measurements.chest || 50}
        waist={measurements.waist || 80}
        selectedOptions={selectedOptions}
        selectedFabric={selectedFabric}
      />
    );
  } else if (garment === "coat") {
    content = isBackView ? (
      <CoatBack
        coatLength={measurements.coatLength || 90}
        shoulder={measurements.shoulder || 45}
        chest={measurements.chest || 55}
        waist={measurements.waist || 80}
        sleeveLength={measurements.sleeveLength || 60}
        selectedOptions={selectedOptions}
        selectedFabric={selectedFabric}
      />
    ) : (
      <Coat
        coatLength={measurements.coatLength || 90}
        shoulder={measurements.shoulder || 45}
        chest={measurements.chest || 55}
        waist={measurements.waist || 80}
        sleeveLength={measurements.sleeveLength || 60}
        selectedOptions={selectedOptions}
        selectedFabric={selectedFabric}
      />
    );
  }

  const handleToggle = () => {
    if (onToggleView) onToggleView();
    else setInternalBackView((prev) => !prev);
  };

  // 🔹 Captura la imagen solo si la ref existe
  useEffect(() => {
    if (!containerRef.current || !onCapture) return;

    const captureImage = async () => {
      try {
        const uri = await captureRef(containerRef, {
          format: "png",
          quality: 1,
        });
        const localUri = `${FileSystem.documentDirectory}preview_${Date.now()}.png`;
        await FileSystem.copyAsync({ from: uri, to: localUri });
        onCapture(localUri);
      } catch (err) {
        console.error("Error capturando preview:", err);
      }
    };
    captureImage();
  }, [content, onCapture]);

  return (
    <View style={styles.container} ref={containerRef}>
      <Textures key={fabricKey} selectedFabric={selectedFabric} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        nestedScrollEnabled
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator
          nestedScrollEnabled
          contentContainerStyle={{
            width: svgWidth,
            height: svgHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {content}
        </ScrollView>
      </ScrollView>

      <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
        <MaterialCommunityIcons name="autorenew" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
});

export default Preview;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 600,
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#fff",
    alignSelf: "center",
    overflow: "hidden",
  },
  toggleButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 6,
    borderRadius: 8,
    zIndex: 10,
  },
});
