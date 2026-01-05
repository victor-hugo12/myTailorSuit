// src/hooks/usePreviewCapture.ts
import { useCallback } from "react";
import { View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

export const usePreviewCapture = () => {
  const generatePreviewUri = useCallback(async (ref: React.RefObject<View>) => {
    if (!ref.current) return undefined;
    try {
      const tempUri = await captureRef(ref.current, {
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
  }, []);

  return { generatePreviewUri };
};
