import { SavedSuit } from "screen/OptionsScreen/types/suits";
import { saveSuitToCloud } from "storage/cloudUtils";
import { saveSuit } from "storage/customSuit.storage";

import * as FileSystem from "expo-file-system";
import { View } from "react-native";

export const handleSaveToLocal = async (suit: SavedSuit) => {
  if (!suit.previewUri) return;

  let localUri = suit.previewUri;
  if (suit.previewUri.startsWith("http")) {
    const fileName = `suit_${Date.now()}.png`;
    const fileUri = FileSystem.documentDirectory + fileName;
    const downloadResult = await FileSystem.downloadAsync(
      suit.previewUri,
      fileUri
    );
    localUri = downloadResult.uri;
  }

  await saveSuit({
    ...suit,
    id: Date.now().toString(),
    previewUri: localUri,
    savedAt: Date.now(),
  });
};

export const handleSaveToCloud = async (
  suit: SavedSuit,
  ref?: React.RefObject<View>
) => {
  if (!ref?.current) return;
  await saveSuitToCloud(suit, ref.current);
};
