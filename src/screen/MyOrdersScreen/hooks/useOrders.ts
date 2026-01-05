import { useEffect, useState, useMemo } from "react";

import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OrderStatus } from "../logic/orderFlow";
import { db, firebaseAuth } from "@/config/firebaseConfig";

export default function useOrders() {
  const user = firebaseAuth.currentUser;

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [isTailor, setIsTailor] = useState(false);
  const [filter, setFilter] = useState<string>("ALL");

  const mutate = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  /* -------------------------------------------------------
     🔥 GUARDAR MODELO — LOCAL
  ------------------------------------------------------- */
  const saveModelLocal = async (order: any) => {
    const STORAGE_KEY = "CUSTOM_SUITS";

    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const list = stored ? JSON.parse(stored) : [];

    const newModel = {
      id: order.id,
      name: order.suit?.name ?? "Modelo sin nombre",
      garment: order.suit?.garment,
      measurements: order.suit?.measurements ?? {},
      fabric: order.suit?.fabric ?? {},
      details: order.suit?.details ?? {},
      previewUri: order.suit?.previewUri,
      savedAt: Date.now(),
      source: "local",
    };

    list.push(newModel);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    return { ok: true, method: "local" };
  };

  /* -------------------------------------------------------
     🔥 GUARDAR MODELO — NUBE
  ------------------------------------------------------- */
  const saveModelCloud = async (order: any) => {
    const ref = db
      .collection("users")
      .doc(user?.uid)
      .collection("cloud_suits")
      .doc();

    const newModel = {
      id: ref.id,
      name: order.suit?.name ?? "Modelo sin nombre",
      garment: order.suit?.garment,
      measurements: order.suit?.measurements ?? {},
      fabric: order.suit?.fabric ?? {},
      details: order.suit?.details ?? {},
      previewUri: order.suit?.previewUri,
      savedAt: firestore.Timestamp.now(),
      source: "cloud",
    };

    await ref.set(newModel);

    return { ok: true, method: "cloud" };
  };

  /* -------------------------------------------------------
     🔥 API FINAL → GUARDAR MODELO (LOCAL/NUBE)
  ------------------------------------------------------- */
  const createModelFromOrder = async (
    orderId: string,
    mode: "local" | "cloud"
  ) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return { ok: false, error: "Order not found" };

    if (mode === "local") return saveModelLocal(order);
    return saveModelCloud(order);
  };

  /* -------------------------------------------------------
     🔥 ACCIONES DE PEDIDOS (no tocadas)
  ------------------------------------------------------- */

  const acceptOrder = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "PENDIENTE_COTIZACION",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "PENDIENTE_COTIZACION",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "PENDIENTE_COTIZACION" as OrderStatus);
    mutate(id, next);
  };

  const rejectOrder = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "CANCELADO_SASTRE",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "CANCELADO_SASTRE",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "CANCELADO_SASTRE" as OrderStatus);
    mutate(id, next);
  };

  const submitQuote = async (
    id: string,
    price: number,
    time: number,
    notes = ""
  ) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        quote: { price, time, notes, createdAt: firestore.Timestamp.now() },
        status: "COTIZADO",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "COTIZADO",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "COTIZADO" as OrderStatus);
    mutate(id, next);
  };

  const acceptQuote = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "ESPERANDO_PAGO",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "ESPERANDO_PAGO",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "ESPERANDO_PAGO" as OrderStatus);
    mutate(id, next);
  };

  const rejectQuote = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "CANCELADO_CLIENTE",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "CANCELADO_CLIENTE",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "CANCELADO_CLIENTE" as OrderStatus);
    mutate(id, next);
  };

  const payDeposit = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "ANTICIPO_PAGADO",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "ANTICIPO_PAGADO",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "ANTICIPO_PAGADO" as OrderStatus);
    mutate(id, next);
  };

  const beginProduction = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "EN_CONFECCIÓN",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "EN_CONFECCIÓN",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "EN_CONFECCIÓN" as OrderStatus);
    mutate(id, next);
  };

  const startControlQuality = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "CONTROL_CALIDAD",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "CONTROL_CALIDAD",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "CONTROL_CALIDAD" as OrderStatus);
    mutate(id, next);
  };

  const markOrderReadyToShip = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "LISTO_ENVÍO",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "LISTO_ENVÍO",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "LISTO_ENVÍO" as OrderStatus);
    mutate(id, next);
  };

  const markOrderDelivered = async (id: string) => {
    const next = await db
      .collection("orders")
      .doc(id)
      .update({
        status: "ENTREGADO",
        historialEstados: firestore.FieldValue.arrayUnion({
          estado: "ENTREGADO",
          fecha: firestore.Timestamp.now(),
          actor: user?.uid,
        }),
      })
      .then(() => "ENTREGADO" as OrderStatus);
    mutate(id, next);
  };

  /* ---------------- FILTROS ---------------- */
  const filteredOrders = useMemo(() => {
    switch (filter) {
      case "PENDING":
        return orders.filter((o) =>
          ["PENDIENTE_APROBACION_SASTRE", "PENDIENTE_COTIZACION"].includes(
            o.status
          )
        );
      case "COTIZACION":
        return orders.filter((o) =>
          ["PENDIENTE_COTIZACION", "COTIZADO"].includes(o.status)
        );
      case "PROCESS":
        return orders.filter((o) =>
          [
            "ESPERANDO_PAGO",
            "ANTICIPO_PAGADO",
            "EN_CONFECCIÓN",
            "CONTROL_CALIDAD",
            "LISTO_ENVÍO",
          ].includes(o.status)
        );
      case "FINALIZED":
        return orders.filter((o) => o.status === "ENTREGADO");
      case "CANCELED":
        return orders.filter((o) =>
          ["CANCELADO_CLIENTE", "CANCELADO_SASTRE"].includes(o.status)
        );
      default:
        return orders;
    }
  }, [orders, filter]);

  /* ---------------- LOAD ORDERS ---------------- */
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        const userDoc = await db.collection("users").doc(user.uid).get();
        setIsTailor(userDoc.data()?.role === "tailor");

        const refSnap = await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .orderBy("createdAt", "desc")
          .get();

        const ids = refSnap.docs.map((d) => d.data().orderId);
        if (ids.length === 0) {
          setOrders([]);
          setLoading(false);
          return;
        }

        let full: any[] = [];
        for (let i = 0; i < ids.length; i += 10) {
          const batch = ids.slice(i, i + 10);
          const snap = await db
            .collection("orders")
            .where(firestore.FieldPath.documentId(), "in", batch)
            .get();
          full.push(...snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }

        full.sort(
          (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)
        );
        setOrders(full);
      } catch (e) {
        console.error("Error cargando pedidos:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    loading,
    orders: filteredOrders,
    isTailor,
    filter,
    setFilter,

    // acciones de pedido
    acceptOrder,
    rejectOrder,
    submitQuote,
    acceptQuote,
    rejectQuote,
    payDeposit,
    beginProduction,
    startControlQuality,
    markOrderReadyToShip,
    markOrderDelivered,

    // 🔥 EXPORTAMOS ESTA FUNCIÓN PARA USAR EN UI
    createModelFromOrder,
  };
}
