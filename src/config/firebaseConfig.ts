import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "616381673530-gcl7hlgvluh6jak8n7rasa5qugfpp278.apps.googleusercontent.com",
});

export const firebaseAuth = auth();
export const db = firestore();

export default firebase;
