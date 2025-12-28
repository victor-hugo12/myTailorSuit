import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  selectGarmentId,
  selectGarmentType,
  selectMeasurements,
  selectSelectedOptions,
  selectSelectedFabric,
} from "../../redux/selections/selections.selectors";
import { changeGarment } from "../../redux/selections/selections.actions";
import i18n from "../../language";
import en from "./en.json";
import es from "./es.json";
import Header from "components/Header";
import ThemedSafeAreaView from "components/ThemedSafeAreaView";
import OptionGroups from "components/OptionGroups";
import { useRouter } from "expo-router";
import { GARMENT_OPTIONS, GARMENT_MAP } from "./constants";
import Preview from "components/Preview/index";

i18n.store(en);
i18n.store(es);

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const garmentId = useAppSelector(selectGarmentId);
  const garmentType = useAppSelector(selectGarmentType);
  const measurements = useAppSelector(selectMeasurements);
  const selectedOptions = useAppSelector(selectSelectedOptions);
  const selectedFabric = useAppSelector(selectSelectedFabric);

  const initialId = garmentId ?? GARMENT_OPTIONS[0].id;
  const [activeGroup, setActiveGroup] = useState<number>(initialId);

  const handleSelectGarment = (id: number) => {
    setActiveGroup(id);
    dispatch(changeGarment(id));
  };

  const garment = GARMENT_MAP[activeGroup];

  return (
    <ThemedSafeAreaView>
      <Header
        title={i18n.t("choose_garment")}
        showBackButton={false}
        showAuthButton={true}
      />

      <Preview
        garment={garment}
        measurements={Object.fromEntries(
          Object.entries(measurements).map(([k, v]) => [k, Number(v)])
        )}
        selectedOptions={selectedOptions}
        selectedFabric={
          selectedFabric && selectedFabric.name
            ? { name: selectedFabric.name }
            : undefined
        }
      />

      <TouchableOpacity
        style={styles.navigateButton}
        onPress={() => {
          if (garmentType) router.push("/options");
        }}
      >
        <Text style={styles.navigateButtonText}>
          {i18n.t("design_garment")}
        </Text>
      </TouchableOpacity>

      <View style={styles.selectionContainer}>
        <OptionGroups
          groups={GARMENT_OPTIONS.map((g) => ({
            label: String(g.id),
            icon: g.icon,
          }))}
          activeGroupLabel={String(activeGroup)}
          onSelectGroup={(label: string) =>
            handleSelectGarment(parseInt(label, 10))
          }
          renderLabel={(label) => {
            const option = GARMENT_OPTIONS.find((g) => String(g.id) === label);
            return <Text>{option ? i18n.t(option.label) : label}</Text>;
          }}
        />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigateButton: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 8,
  },
  navigateButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  selectionContainer: { marginTop: 5, alignItems: "center" },
});
