// src/utils/auth.utils.ts
import { firebaseAuth } from "../config/firebaseConfig"; // instancia modular

// Para chequear si hay usuario logueado
export const isUserLoggedIn = (): boolean => {
  return !!firebaseAuth.currentUser;
};

// Para obtener el UID
export const getCurrentUserId = (): string | null => {
  return firebaseAuth.currentUser?.uid ?? null;
};

// Escuchar cambios de autenticación
export const onAuthChanged = (callback: (user: any) => void) => {
  return firebaseAuth.onAuthStateChanged(callback);
};
