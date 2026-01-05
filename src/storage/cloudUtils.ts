// src/storage/saveSuitWithSupabase.ts
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";

// 🔹 RN Firebase modular
import { firebaseAuth, db } from "@/config/firebaseConfig";
import { supabase } from "@/config/supabase";
import { SavedSuit } from "@/screen/OptionsScreen/types/suits";

// Convierte base64 a Uint8Array
export function base64ToUint8Array(base64: string) {
  const binaryString = global.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

// Guarda traje del usuario (Supabase + Firestore)
export async function saveSuitToCloud(
  suit: SavedSuit,
  ref?: any,
  existingId?: string
) {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");

  const suitId = existingId || uuid.v4().toString();
  const cloudSuit: SavedSuit = { ...suit, id: suitId, savedAt: Date.now() };

  let base64: string;

  if (ref) {
    base64 = await captureRef(ref, { format: "png", result: "base64" });
  } else if (suit.previewUri?.startsWith("file://")) {
    base64 = await FileSystem.readAsStringAsync(suit.previewUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } else if (suit.previewUri?.startsWith("https://")) {
    const localPath = `${FileSystem.cacheDirectory}${suit.id}.png`;
    await FileSystem.downloadAsync(suit.previewUri, localPath);
    base64 = await FileSystem.readAsStringAsync(localPath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await FileSystem.deleteAsync(localPath, { idempotent: true });
  } else {
    throw new Error("No preview image disponible para guardar.");
  }

  const folderPath = `${user.uid}/${cloudSuit.id}.png`;
  const bytes = base64ToUint8Array(base64);

  const { error: uploadError } = await supabase.storage
    .from("user-images-tailor")
    .upload(folderPath, bytes, { contentType: "image/png", upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from("user-images-tailor")
    .getPublicUrl(folderPath);
  const finalUrl = `${urlData.publicUrl}?t=${Date.now()}`;

  // Firestore modular
  await db
    .collection("users")
    .doc(user.uid)
    .collection("suits")
    .doc(cloudSuit.id)
    .set({
      ...cloudSuit,
      previewUri: finalUrl,
      savedAt: Date.now(),
    });

  return finalUrl;
}

// Guarda solo la imagen del pedido
export async function saveOrderPreviewToCloud(
  suit: SavedSuit
): Promise<string> {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");
  if (!suit.previewUri) throw new Error("No hay imagen disponible para subir");

  let base64: string;

  if (suit.previewUri.startsWith("file://")) {
    base64 = await FileSystem.readAsStringAsync(suit.previewUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } else if (suit.previewUri.startsWith("https://")) {
    const localPath = `${FileSystem.cacheDirectory}${suit.id}_order.png`;
    await FileSystem.downloadAsync(suit.previewUri, localPath);
    base64 = await FileSystem.readAsStringAsync(localPath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await FileSystem.deleteAsync(localPath, { idempotent: true });
  } else {
    throw new Error("Formato de imagen inválido");
  }

  const orderImageId = `${suit.id}_order_${Date.now()}`;
  const folderPath = `${user.uid}/${orderImageId}.png`;
  const bytes = base64ToUint8Array(base64);

  const { error: uploadError } = await supabase.storage
    .from("user-images-tailor")
    .upload(folderPath, bytes, { contentType: "image/png", upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from("user-images-tailor")
    .getPublicUrl(folderPath);

  return `${urlData.publicUrl}?t=${Date.now()}`;
}
