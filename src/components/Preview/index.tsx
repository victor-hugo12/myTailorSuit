import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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
  onCapture?: (uri: string) => void;
}

const { width: screenWidth } = Dimensions.get("window");

const PREVIEW_WIDTH = Math.min(screenWidth * 0.95, 500);
const PREVIEW_HEIGHT = PREVIEW_WIDTH * 1.5;

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

  const svgWidth = PREVIEW_WIDTH;
  const svgHeight = PREVIEW_HEIGHT;

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // 🔥 PINCH (zoom)
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      let newScale = savedScale.value * e.scale;
      newScale = Math.max(1, Math.min(newScale, 3));
      scale.value = newScale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // 🔥 PAN (mover cuando hay zoom)
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // 📌 guardar posición actual al iniciar el gesto
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      if (scale.value <= 1) return;

      const maxTranslateX = (svgWidth * (scale.value - 1)) / 2;
      const maxTranslateY = (svgHeight * (scale.value - 1)) / 2;

      // 🔥 ahora sí acumulas correctamente
      let newX = startX.value + e.translationX;
      let newY = startY.value + e.translationY;

      // 🔒 límites
      newX = Math.max(-maxTranslateX, Math.min(newX, maxTranslateX));
      newY = Math.max(-maxTranslateY, Math.min(newY, maxTranslateY));

      translateX.value = newX;
      translateY.value = newY;
    });
  // 🔥 DOBLE TAP (toggle zoom)
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        // RESET
        scale.value = withTiming(1);
        savedScale.value = 1;

        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      } else {
        // ZOOM IN
        scale.value = withTiming(2);
        savedScale.value = 2;
      }
    });

  // 🔥 COMBINACIÓN DE GESTOS
  const composed = Gesture.Exclusive(
    doubleTapGesture,
    Gesture.Simultaneous(pinchGesture, panGesture),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  let content: React.ReactNode = null;

  if (garment === "pants") {
    content = isBackView ? (
      <PantsBack
        waist={measurements.waist || 80}
        thigh={measurements.thigh || 50}
        knee={measurements.knee || 40}
        boot={measurements.boot || 20}
        length={measurements.length || 100}
        inseam={measurements.inseam || 75}
        selectedFabric={selectedFabric}
        selectedOptions={selectedOptions}
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
        selectedOptions={selectedOptions}
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
    <View
      style={[
        styles.container,
        { width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT },
      ]}
      ref={containerRef}
    >
      <Textures key={fabricKey} selectedFabric={selectedFabric} />

      <GestureDetector gesture={composed}>
        <Animated.View
          style={[
            {
              width: svgWidth,
              height: svgHeight,
              alignItems: "center",
              justifyContent: "center",
            },
            animatedStyle,
          ]}
        >
          {content}
        </Animated.View>
      </GestureDetector>

      <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
        <MaterialCommunityIcons name="autorenew" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
});

export default Preview;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
    zIndex: 10,
  },
});
