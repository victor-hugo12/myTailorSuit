// src/services/orders.ts
import firestore from "@react-native-firebase/firestore";
import { db } from "config/firebaseConfig";

export async function createOrder({
  userId,
  tailor,
  suit,
  clientData,
  notes,
  deadline,
}: {
  userId: string;
  tailor: any;
  suit: any;
  clientData: any;
  notes?: string;
  deadline: number;
}) {
  try {
    const orderData = {
      suitId: suit.id,
      suitSnapshot: suit, // guarda todo el traje
      tailorId: tailor.id,
      tailorData: tailor,
      clientId: userId,
      clientData,
      status: "pending",
      notes: notes || "",
      deadline,
      createdAt: firestore.Timestamp.now(),
    };

    // 1️⃣ Documento principal en "orders"
    const orderRef = await db.collection("orders").add(orderData);

    // 2️⃣ Subcolección del cliente
    await db
      .collection("users")
      .doc(userId)
      .collection("orders")
      .doc(orderRef.id)
      .set({
        orderId: orderRef.id,
        createdAt: firestore.Timestamp.now(),
      });

    // 3️⃣ Subcolección del sastre
    await db
      .collection("users")
      .doc(tailor.id)
      .collection("orders")
      .doc(orderRef.id)
      .set({
        orderId: orderRef.id,
        userId,
        createdAt: firestore.Timestamp.now(),
      });

    return { success: true, id: orderRef.id };
  } catch (error) {
    console.error("❌ Error al crear pedido:", error);
    return { success: false, error };
  }
}
