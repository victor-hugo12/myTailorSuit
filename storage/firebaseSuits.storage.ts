// src/storage/firebaseSuits.storage.ts
import { firebaseAuth, db } from "../config/firebaseConfig"; // instancias modulares
import { SavedSuit } from "screen/OptionsScreen/types/suits";

// --------------------------------------------
// GUARDAR UNA PRENDA EN FIRESTORE
// --------------------------------------------
export const saveSuitToFirestore = async (suit: SavedSuit): Promise<void> => {
  const user = firebaseAuth.currentUser;
  if (!user) return;

  await db
    .collection("users")
    .doc(user.uid)
    .collection("suits")
    .doc(suit.id)
    .set(suit, { merge: true });
};

// --------------------------------------------
// CARGAR TODAS LAS PRENDAS DEL USUARIO
// --------------------------------------------
export const loadSuitsFromFirestore = async (): Promise<SavedSuit[]> => {
  const user = firebaseAuth.currentUser;
  if (!user) return [];

  const snapshot = await db
    .collection("users")
    .doc(user.uid)
    .collection("suits")
    .orderBy("savedAt", "desc")
    .get();

  return snapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as SavedSuit
  );
};

// --------------------------------------------
// ELIMINAR PRENDA DE FIRESTORE
// --------------------------------------------
export const deleteSuitFromFirestore = async (id: string): Promise<void> => {
  const user = firebaseAuth.currentUser;
  if (!user) return;

  await db
    .collection("users")
    .doc(user.uid)
    .collection("suits")
    .doc(id)
    .delete();
};
