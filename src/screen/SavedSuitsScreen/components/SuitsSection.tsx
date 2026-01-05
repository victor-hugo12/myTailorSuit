import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAppSelector } from "@/redux/hooks";
import { selectTheme } from "@/redux/selections/selections.selectors";
import SuitCard from "./SuitCard";
import { SavedSuit } from "../../OptionsScreen/types/suits";
import { Provider, Button } from "react-native-paper";

interface SuitSavingState {
  isSaving: boolean;
  savedSuccessfully: boolean;
}

interface SuitsSectionProps {
  title: string;
  suits: SavedSuit[];
  onDelete: (suit: SavedSuit) => void;

  // 👇 Opcionales
  onSaveToCloud?: (suit: SavedSuit) => Promise<void>;
  onSaveToLocal?: (suit: SavedSuit) => Promise<void>;

  savingStates?: { [id: string]: SuitSavingState };
  source: "cloud" | "local";
  onRefresh: () => void;

  // ✅ NUEVO
  isLoggedIn: boolean;
}

export default function SuitsSection({
  title,
  suits,
  onDelete,
  onSaveToCloud,
  onSaveToLocal,
  savingStates = {},
  source,
  onRefresh,
  isLoggedIn,
}: SuitsSectionProps) {
  const theme = useAppSelector(selectTheme);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<
    "az" | "za" | "date_asc" | "date_desc"
  >("date_desc");
  const [showOptions, setShowOptions] = useState(false);
  const [displaySuits, setDisplaySuits] = useState<SavedSuit[]>(suits);

  useEffect(() => {
    setDisplaySuits(suits);
  }, [suits]);

  const processedSuits = useMemo(() => {
    let filtered = displaySuits;

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortMode) {
      case "az":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date_asc":
        filtered = [...filtered].sort((a, b) => a.savedAt - b.savedAt);
        break;
      case "date_desc":
        filtered = [...filtered].sort((a, b) => b.savedAt - a.savedAt);
        break;
    }

    return filtered;
  }, [displaySuits, searchQuery, sortMode]);

  const sectionStyles = StyleSheet.create({
    container: { marginBottom: 20 },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#000",
    },
    row: { justifyContent: "space-between", marginBottom: 12 },
    searchBox: {
      backgroundColor: theme === "dark" ? "#222" : "#eee",
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      color: theme === "dark" ? "#fff" : "#000",
    },
    comboContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    optionsPanel: {
      flexDirection: "row",
      marginLeft: 8,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 6,
      overflow: "hidden",
    },
    optionButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: "#eee",
    },
    optionButtonActive: { backgroundColor: "#0B214A" },
    optionText: { color: "#333", fontWeight: "bold" },
    optionTextActive: { color: "#fff" },
  });

  const sortOptions = [
    { value: "az", label: "A–Z" },
    { value: "za", label: "Z–A" },
    { value: "date_asc", label: "↑ Fecha" },
    { value: "date_desc", label: "↓ Fecha" },
  ];

  return (
    <Provider>
      <View style={sectionStyles.container}>
        {/* Título + Actualizar */}
        <View style={sectionStyles.titleRow}>
          <Text style={sectionStyles.sectionTitle}>{title}</Text>
          <Button mode="contained" onPress={onRefresh} compact>
            Actualizar
          </Button>
        </View>

        <TextInput
          placeholder="Buscar…"
          placeholderTextColor={theme === "dark" ? "#888" : "#666"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={sectionStyles.searchBox}
        />

        <View style={sectionStyles.comboContainer}>
          <Button mode="outlined" onPress={() => setShowOptions(!showOptions)}>
            Ordenar
          </Button>

          {showOptions && (
            <View style={sectionStyles.optionsPanel}>
              {sortOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    sectionStyles.optionButton,
                    sortMode === opt.value && sectionStyles.optionButtonActive,
                  ]}
                  onPress={() => setSortMode(opt.value as any)}
                >
                  <Text
                    style={[
                      sectionStyles.optionText,
                      sortMode === opt.value && sectionStyles.optionTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <FlatList
          data={processedSuits}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={sectionStyles.row}
          renderItem={({ item }) => {
            const state = savingStates[item.id] || {
              isSaving: false,
              savedSuccessfully: false,
            };

            return (
              <SuitCard
                suit={{ ...item, source }}
                onDelete={onDelete}
                onSaveToLocal={onSaveToLocal}
                // ✅ SOLO SI ESTÁ LOGUEADO
                onSaveToCloud={isLoggedIn ? onSaveToCloud : undefined}
                isSaving={state.isSaving}
                savedSuccessfully={state.savedSuccessfully}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </Provider>
  );
}
