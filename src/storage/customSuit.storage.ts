// src/storage/customSuit.storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SavedSuit } from "screen/OptionsScreen/types/suits";

const STORAGE_KEY = "CUSTOM_SUITS";

export async function saveSuit(suit: SavedSuit) {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    let existing: SavedSuit[] = [];
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) existing = parsed;
      } catch (e) {}
    }

    const index = existing.findIndex((s) => s.id === suit.id);
    if (index !== -1) {
      existing[index] = suit;
    } else {
      existing.push(suit);
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {}
}

export async function loadAllSuits(): Promise<SavedSuit[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export async function loadSuitById(id: string): Promise<SavedSuit | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const suits = JSON.parse(stored);
    if (!Array.isArray(suits)) return null;

    return suits.find((s: SavedSuit) => s.id === id) || null;
  } catch (e) {
    return null;
  }
}

export async function deleteSuitById(id: string): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const suits = JSON.parse(stored);
    if (!Array.isArray(suits)) return;

    const filtered = suits.filter((s: SavedSuit) => s.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {}
}
