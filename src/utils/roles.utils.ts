// src/utils/roles.utils.ts
import { firebaseAuth, db } from "config/firebaseConfig";

interface FirestoreUser {
  role?: string;
  name?: string;
}

export const getUserRole = async (): Promise<"tailor" | "client" | null> => {
  const user = firebaseAuth.currentUser;
  if (!user) return null;

  try {
    const userDoc = await db.collection("users").doc(user.uid).get();
    const data = userDoc.data() as FirestoreUser | undefined;

    if (!data?.role) return null;

    if (data.role === "tailor") return "tailor";
    if (data.role === "client") return "client";

    return null;
  } catch (error) {
    console.error("Error obteniendo el rol del usuario:", error);
    return null;
  }
};

export const isTailor = async (): Promise<boolean> =>
  (await getUserRole()) === "tailor";

export const isClient = async (): Promise<boolean> =>
  (await getUserRole()) === "client";
