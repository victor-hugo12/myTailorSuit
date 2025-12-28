// src/storage/cloudUtils.ts
import { captureRef } from "react-native-view-shot";
import { Alert, View } from "react-native";
import { SavedSuit } from "screen/OptionsScreen/types/suits";

// 🔹 RN Firebase modular
import { firebaseAuth, db } from "config/firebaseConfig";
import { supabase } from "../config/supabase";

// Guarda traje del usuario (Supabase + Firestore)
export async function saveToCloud(suit: SavedSuit, ref: View | null) {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("Usuario no autenticado");
  if (!ref) throw new Error("No se proporcionó referencia de preview");

  try {
    const tempUri = await captureRef(ref, { format: "png", quality: 0.8 });
    const response = await fetch(tempUri);
    const blob = await response.blob();
    const fileName = `suit_${suit.id}.png`;

    // Subida a Supabase
    const { error: uploadError } = await supabase.storage
      .from("user-images-tailor")
      .upload(fileName, blob, { cacheControl: "3600", upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("user-images-tailor")
      .getPublicUrl(fileName);
    const publicUrl = data.publicUrl;

    const { error: dbError } = await supabase.from("suits").upsert(
      [
        {
          id: suit.id,
          name: suit.name,
          garment: suit.garment,
          measurements: suit.measurements,
          details: suit.details,
          fabric: suit.fabric,
          previewUri: publicUrl,
          savedAt: suit.savedAt,
        },
      ],
      { onConflict: "id" }
    );

    if (dbError) throw dbError;

    // Guardado en Firestore modular
    await db
      .collection("users")
      .doc(user.uid)
      .collection("suits")
      .doc(suit.id)
      .set({
        ...suit,
        previewUri: publicUrl,
        savedAt: Date.now(),
      });

    return publicUrl;
  } catch (err) {
    Alert.alert("Error", "No se pudo guardar en la nube.");
    throw err;
  }
}

// Cargar trajes usando Firestore modular
export const loadSuitsFromCloud = async (): Promise<SavedSuit[]> => {
  const user = firebaseAuth.currentUser;
  if (!user) return [];

  try {
    const snapshot = await db
      .collection("users")
      .doc(user.uid)
      .collection("suits")
      .orderBy("savedAt", "desc")
      .get();

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<SavedSuit, "id">),
    }));
  } catch (err) {
    Alert.alert("Error", "No se pudieron cargar los trajes desde la nube.");
    return [];
  }
};
