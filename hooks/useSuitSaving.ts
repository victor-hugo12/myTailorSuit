// src/hooks/useSuitSaving.ts
import { useState } from "react";
import { SavedSuit } from "screen/OptionsScreen/types/suits";
import { saveSuit } from "storage/customSuit.storage";
import { saveSuitToCloud } from "storage/cloudUtils";

export interface SuitSavingState {
  isSaving: boolean;
  savedSuccessfully: boolean;
}

export const useSuitSaving = () => {
  const [savingStates, setSavingStates] = useState<
    Record<string, SuitSavingState>
  >({});

  const saveSuitHandler = async (
    suit: SavedSuit,
    destination: "local" | "cloud",
    ref?: any
  ) => {
    setSavingStates((prev) => ({
      ...prev,
      [suit.id]: { isSaving: true, savedSuccessfully: false },
    }));

    try {
      if (destination === "local") {
        await saveSuit(suit);
      } else {
        await saveSuitToCloud(suit, ref);
      }

      setSavingStates((prev) => ({
        ...prev,
        [suit.id]: { isSaving: false, savedSuccessfully: true },
      }));

      // reset after 5s
      setTimeout(() => {
        setSavingStates((prev) => ({
          ...prev,
          [suit.id]: { ...prev[suit.id], savedSuccessfully: false },
        }));
      }, 5000);
    } catch (err) {
      console.error("Error saving suit:", err);
      setSavingStates((prev) => ({
        ...prev,
        [suit.id]: { isSaving: false, savedSuccessfully: false },
      }));
    }
  };

  return { savingStates, saveSuitHandler, setSavingStates };
};
