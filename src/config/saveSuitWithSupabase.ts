// src/utils/suitsCloud.utils.ts
import { supabase } from "./supabase";
import { SavedSuit } from "screen/OptionsScreen/types/suits";

// 🔹 React Native Firebase
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

console.log("SUPABASE:", supabase);

export const saveSuitFileToCloud = async (suit: SavedSuit, fileUri: string) => {
  try {
    if (!fileUri) throw new Error("No se proporcionó archivo para subir");

    const fileName = `${suit.id}.png`;

    // Leer archivo como Blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    // Subir a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("user-images-tailor")
      .upload(fileName, blob, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Obtener URL pública
    const { data } = supabase.storage
      .from("user-images-tailor")
      .getPublicUrl(fileName);
    const publicUrl = data.publicUrl;

    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error("Usuario no autenticado");

    // Guardar en Firestore React Native Firebase
    const suitDocRef = firestore().collection("suits").doc(suit.id);
    await suitDocRef.set({
      ...suit,
      previewUri: publicUrl,
      userId,
      savedAt: Date.now(),
      savedAtTs: firestore.FieldValue.serverTimestamp(),
    });

    return publicUrl;
  } catch (err) {
    console.error("Error guardando traje en la nube:", err);
    throw err;
  }
};
