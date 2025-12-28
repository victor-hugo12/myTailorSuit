// src/screens/OptionsScreen/components/FabricsGrid.tsx
import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import fabricsData from "../telas_mapped.json";
import { fabricImages } from "./fabricImages";
import FabricsFilterPanel from "./FabricsFilterPanel";

interface Fabric {
  id: string;
  name: string;
  image?: string;
  man_jacket: string;
  man_pants: string;
  man_waistcoat: string;
  tone: string;
  simple_composition: string;
}

export interface FabricSelection {
  id: string;
  name: string;
  imageKey: string;
  image?: string;
}

interface FabricsGridProps {
  garment: "coat" | "pants" | "vest";
  selectedFabric: FabricSelection | null;
  onSelectFabric: (fabric: FabricSelection) => void;
  theme: "light" | "dark";
}
const FabricCard: React.FC<{
  item: Fabric;
  isSelected: boolean;
  onPress: () => void;
  price: string;
  imageSource: any;
  theme: "light" | "dark";
}> = React.memo(({ item, isSelected, onPress, price, imageSource, theme }) => {
  const styles = getDynamicStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>+${price}</Text>
    </TouchableOpacity>
  );
});

/* =========================
   MAIN COMPONENT
========================= */
const FabricsGrid: React.FC<FabricsGridProps> = ({
  garment,
  selectedFabric,
  onSelectFabric,
  theme,
}) => {
  const [activeTones, setActiveTones] = useState<string[]>([]);
  const [activeCompositions, setActiveCompositions] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false); // toggle igual que MeasurementsPanel

  const listRef = useRef<FlatList<Fabric>>(null);

  /* =========================
     UNIQUE FILTER VALUES
  ========================= */
  const { uniqueTones, uniqueCompositions } = useMemo(() => {
    const tones = new Set<string>();
    const compositions = new Set<string>();

    fabricsData.forEach((f) => {
      if (f.tone) tones.add(f.tone);
      if (f.simple_composition) compositions.add(f.simple_composition);
    });

    return {
      uniqueTones: Array.from(tones).sort(),
      uniqueCompositions: Array.from(compositions).sort(),
    };
  }, []);

  /* =========================
     FILTERED FABRICS
  ========================= */
  const filteredFabrics = useMemo(() => {
    return fabricsData.filter((fabric) => {
      const toneMatch =
        activeTones.length === 0 || activeTones.includes(fabric.tone);
      const compositionMatch =
        activeCompositions.length === 0 ||
        activeCompositions.includes(fabric.simple_composition);

      return toneMatch && compositionMatch;
    });
  }, [activeTones, activeCompositions]);

  /* =========================
     SCROLL TO TOP WHEN FILTER CHANGES
  ========================= */
  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [filteredFabrics.length]);

  /* =========================
     PRICE BY GARMENT
  ========================= */
  const getPrice = useCallback(
    (fabric: Fabric) => {
      switch (garment) {
        case "coat":
          return fabric.man_jacket;
        case "pants":
          return fabric.man_pants;
        case "vest":
          return fabric.man_waistcoat;
        default:
          return "0";
      }
    },
    [garment]
  );

  const handleSelectFabric = (item: Fabric) => {
    onSelectFabric({
      id: item.id,
      name: item.name,
      imageKey: item.name,
      image: item.image,
    });
  };

  const styles = getDynamicStyles(theme);

  return (
    <View style={styles.container}>
      {/* BOTÓN PARA MOSTRAR/OCULTAR FILTROS */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFiltersVisible(!filtersVisible)}
      >
        <Text style={styles.filterButtonText}>
          {filtersVisible ? "▼ Filtros" : "▶ Filtros"}
        </Text>
      </TouchableOpacity>

      {/* PANEL DE FILTROS */}
      {filtersVisible && (
        <FabricsFilterPanel
          uniqueTones={uniqueTones}
          uniqueCompositions={uniqueCompositions}
          activeTones={activeTones}
          activeCompositions={activeCompositions}
          toggleTone={(tone) =>
            setActiveTones((prev) =>
              prev.includes(tone)
                ? prev.filter((t) => t !== tone)
                : [...prev, tone]
            )
          }
          toggleComposition={(comp) =>
            setActiveCompositions((prev) =>
              prev.includes(comp)
                ? prev.filter((c) => c !== comp)
                : [...prev, comp]
            )
          }
          clearFilters={() => {
            setActiveTones([]);
            setActiveCompositions([]);
          }}
          theme={theme}
        />
      )}

      {/* LISTA DE TELAS */}
      <FlatList
        ref={listRef}
        data={filteredFabrics}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedFabric?.id === item.id;
          const imageSource = fabricImages[item.name];
          if (!imageSource) return null;

          return (
            <FabricCard
              item={item}
              isSelected={isSelected}
              onPress={() => handleSelectFabric(item)}
              price={getPrice(item)}
              imageSource={imageSource}
              theme={theme}
            />
          );
        }}
        contentContainerStyle={styles.listContentContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

/* =========================
   STYLES
========================= */
const getDynamicStyles = (theme: "light" | "dark") => {
  const isDark = theme === "dark";

  return StyleSheet.create({
    container: {
      backgroundColor: isDark ? "#121212" : "#fff",
      paddingVertical: 10,
    },
    listContentContainer: {
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    card: {
      width: 100,
      marginRight: 10,
      backgroundColor: isDark ? "#1E1E1E" : "#f5f5f5",
      borderRadius: 10,
      padding: 6,
      alignItems: "center",
    },
    cardSelected: {
      borderWidth: 2,
      borderColor: isDark ? "#4F46E5" : "#0B214A",
    },
    image: {
      width: 70,
      height: 70,
      borderRadius: 6,
      marginBottom: 6,
    },
    name: {
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
      color: isDark ? "#E0E0E0" : "#000",
    },
    price: {
      marginTop: 2,
      fontSize: 10,
      color: isDark ? "#B0B0B0" : "#333",
    },
    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: isDark ? "rgba(79,70,229,0.7)" : "rgba(11,33,74,0.7)",
      borderRadius: 8,
      alignSelf: "flex-start",
      marginHorizontal: 10,
      marginBottom: 10,
      zIndex: 5,
    },
    filterButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
};

export default FabricsGrid;
