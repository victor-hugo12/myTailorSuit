import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";

import { useRouter } from "expo-router";
import { SavedSuit } from "@/screen/OptionsScreen/types/suits";

// 🔹 Firebase
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator } from "react-native-paper";

interface SuitCardProps {
  suit: SavedSuit & { previewUri?: string; source: "cloud" | "local" };
  onDelete: (suit: SavedSuit) => void;
  onSaveToCloud?: (suit: SavedSuit) => void;
  onSaveToLocal?: (suit: SavedSuit) => void;
  isSaving?: boolean;
  savedSuccessfully?: boolean;
}

export default function SuitCard({
  suit,
  onDelete,
  onSaveToCloud,
  onSaveToLocal,
  isSaving = false,
  savedSuccessfully = false,
}: SuitCardProps) {
  const router = useRouter();
  const user = auth().currentUser;

  const [role, setRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoadingRole(false);
      return;
    }

    const loadRole = async () => {
      try {
        const doc = await firestore().collection("users").doc(user.uid).get();
        setRole(doc.data()?.role ?? null);
      } catch (e) {
        console.error("Error obteniendo rol:", e);
        setRole(null);
      } finally {
        setLoadingRole(false);
      }
    };

    loadRole();
  }, [user]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUri, setImageUri] = useState(suit.previewUri ?? null);
  const [showMenu, setShowMenu] = useState(false);
  const isCloud = suit.source === "cloud";

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setError(false);
    setLoading(true);
    setImageUri(suit.previewUri ?? null);

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 15000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [suit.previewUri]);

  const handleImageLoaded = () => {
    setLoading(false);
    setError(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const reloadImage = () => {
    setError(false);
    setLoading(true);
    setImageUri((suit.previewUri ?? "") + "?t=" + Date.now());
  };

  const handleSaveLocal = () => onSaveToLocal?.(suit);
  const handleSaveCloud = () => onSaveToCloud?.(suit);
  const handleDelete = () => onDelete(suit);

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      maxWidth: "48%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#ddd",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.4)",
      borderRadius: 10,
      zIndex: 5,
    },
    overlayText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      marginTop: 6,
    },
    imageWrapper: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 10,
      backgroundColor: "#f2f2f2",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    image: { width: "100%", height: "100%", position: "absolute" },
    name: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 2,
      color: "#000",
    },
    type: {
      fontSize: 14,
      color: "#555",
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
      color: "#888",
      marginBottom: 8,
    },
    errorText: {
      color: "#D32F2F",
      textAlign: "center",
      fontSize: 14,
      marginBottom: 6,
    },
    menuButton: {
      position: "absolute",
      top: 8,
      right: 8,
      padding: 4,
      zIndex: 999,
    },
    menuDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: "#000",
      marginVertical: 1,
    },
    menuModal: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      marginHorizontal: 40,
    },
    menuOption: { paddingVertical: 12 },
    menuText: {
      fontSize: 16,
      color: "#000",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.card}>
      {loadingRole ? (
        <View style={{ position: "absolute", top: 8, right: 8 }}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
        </TouchableOpacity>
      )}

      <View>
        <View style={styles.imageWrapper}>
          {loading && !error && <ActivityIndicator size="large" />}
          {imageUri && !error && (
            <Image
              source={{ uri: imageUri }}
              style={[styles.image, loading && { opacity: 0 }]}
              resizeMode="contain"
              onLoad={handleImageLoaded}
              onError={handleImageError}
            />
          )}
          {error && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.errorText}>Error al cargar imagen</Text>
              <TouchableOpacity onPress={reloadImage}>
                <Text style={{ color: "#1976D2", fontWeight: "bold" }}>
                  Recargar
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {isSaving && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" />
              <Text style={styles.overlayText}>Guardando...</Text>
            </View>
          )}

          {savedSuccessfully && !isSaving && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>✔ Guardado</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: "/edit", params: { suitId: suit.id } })
          }
        >
          <Text style={styles.name}>{suit.name}</Text>
          <Text style={styles.type}>{suit.garment.toUpperCase()}</Text>
          <Text style={styles.date}>
            {new Date(suit.savedAt).toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>

      {!loadingRole && (
        <Modal transparent visible={showMenu} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View style={styles.menuModal}>
              {/* EDITAR → cualquier usuario logueado */}

              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  setShowMenu(false);
                  router.push({
                    pathname: "/edit",
                    params: { suitId: suit.id },
                  });
                }}
              >
                <Text style={styles.menuText}>Editar</Text>
              </TouchableOpacity>

              {/* SOLO CLIENTE → CREAR PEDIDO */}
              {user && role === "client" && (
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    setShowMenu(false);
                    router.push({
                      pathname: "/createOrder",
                      params: { suitId: suit.id },
                    });
                  }}
                >
                  <Text style={styles.menuText}>Crear pedido</Text>
                </TouchableOpacity>
              )}

              {/* GUARDAR EN NUBE / LOCAL → según corresponda */}
              {user && !isCloud && (
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    setShowMenu(false);
                    handleSaveCloud();
                  }}
                >
                  <Text style={styles.menuText}>Guardar en la nube</Text>
                </TouchableOpacity>
              )}
              {user && isCloud && (
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={() => {
                    setShowMenu(false);
                    handleSaveLocal();
                  }}
                >
                  <Text style={styles.menuText}>Guardar en local</Text>
                </TouchableOpacity>
              )}

              {/* ELIMINAR → siempre disponible */}
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  setShowMenu(false);
                  handleDelete();
                }}
              >
                <Text style={[styles.menuText, { color: "#D32F2F" }]}>
                  Eliminar
                </Text>
              </TouchableOpacity>

              {/* CERRAR */}
              <TouchableOpacity
                style={[styles.menuOption, { marginTop: 10 }]}
                onPress={() => setShowMenu(false)}
              >
                <Text style={[styles.menuText, { textAlign: "center" }]}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
