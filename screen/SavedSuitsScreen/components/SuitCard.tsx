import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";

import { useRouter } from "expo-router";
import { useAppSelector } from "redux/hooks";
import { selectTheme } from "redux/selections/selections.selectors";
import { SavedSuit } from "screen/OptionsScreen/types/suits";
import { isUserLoggedIn } from "utils/auth.utils";

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
  const theme = useAppSelector(selectTheme);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUri, setImageUri] = useState(suit.previewUri ?? null);
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn] = useState(isUserLoggedIn()); // <--- Cambiado para render inmediato

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCloud = suit.source === "cloud";

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
      backgroundColor: theme === "dark" ? "#1c1c1c" : "#fff",
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#ddd",
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
      backgroundColor: theme === "dark" ? "#333" : "#f2f2f2",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    image: { width: "100%", height: "100%", position: "absolute" },
    name: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 2,
      color: theme === "dark" ? "#fff" : "#000",
    },
    type: {
      fontSize: 14,
      color: theme === "dark" ? "#ccc" : "#555",
      marginBottom: 2,
    },
    date: {
      fontSize: 12,
      color: theme === "dark" ? "#aaa" : "#888",
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
      backgroundColor: theme === "dark" ? "#fff" : "#000",
      marginVertical: 1,
    },
    menuModal: {
      backgroundColor: theme === "dark" ? "#222" : "#fff",
      padding: 20,
      borderRadius: 10,
      marginHorizontal: 40,
    },
    menuOption: { paddingVertical: 12 },
    menuText: {
      fontSize: 16,
      color: theme === "dark" ? "#fff" : "#000",
      fontWeight: "bold",
    },
    deleteButton: {
      position: "absolute",
      top: 8,
      right: 8,
      padding: 4,
      zIndex: 999,
    },
  });

  return (
    <View style={styles.card}>
      {/* BOTÓN DEL MENÚ ⋮ O ELIMINAR DIRECTO */}
      {loggedIn ? (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
          <View style={styles.menuDot} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={{ color: "#D32F2F", fontWeight: "bold" }}>Eliminar</Text>
        </TouchableOpacity>
      )}

      {/* IMAGEN Y DATOS */}
      <View>
        <View style={styles.imageWrapper}>
          {loading && !error && <ActivityIndicator size="large" color="#888" />}
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
                <Text
                  style={{ color: "#1976D2", fontWeight: "bold", marginTop: 4 }}
                >
                  Recargar
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {isSaving && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
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

      {/* MODAL DE OPCIONES SOLO SI ESTÁ LOGUEADO */}
      {loggedIn && (
        <Modal transparent visible={showMenu} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View style={styles.menuModal}>
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
                <Text style={styles.menuText}>crear pedido</Text>
              </TouchableOpacity>

              {!isCloud && (
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

              {isCloud && (
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
