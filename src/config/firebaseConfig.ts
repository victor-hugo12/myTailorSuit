// Importaciones
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Obtener la app por defecto
const app = firebase.app();

// Auth y Firestore usando la app por defecto
export const firebaseAuth = auth(app);
export const db = firestore(app);
