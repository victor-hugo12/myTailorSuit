// myTailorSuit/screen/MyOrdersScreen/components/OrderFilter.tsx
import i18n from "@/language";
import { useAppSelector } from "@/redux/hooks";
import { selectTheme } from "@/redux/selections/selections.selectors";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const options = [
  "ALL",
  "PENDING",
  "COTIZACION",
  "PROCESS",
  "FINALIZED",
  "CANCELED",
];

export default function OrderFilter({ selected, onChange }: any) {
  const theme = useAppSelector(selectTheme);

  const colors =
    theme === "dark"
      ? {
          btn: "#333",
          selectedBtn: "#4F46E5",
          text: "#fff",
          selectedText: "#fff",
        }
      : {
          btn: "#f3f3f3",
          selectedBtn: "#0B214A",
          text: "#000",
          selectedText: "#fff",
        };

  const translateOption = (opt: string) => {
    switch (opt) {
      case "ALL":
        return i18n.t("all");
      case "PENDING":
        return i18n.t("pending");
      case "COTIZACION":
        return i18n.t("quote_pending");
      case "PROCESS":
        return i18n.t("in_process");
      case "FINALIZED":
        return i18n.t("finalized");
      case "CANCELED":
        return i18n.t("canceled");
      default:
        return opt;
    }
  };

  return (
    <View style={styles.container}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.btn,
            {
              backgroundColor:
                selected === opt ? colors.selectedBtn : colors.btn,
            },
          ]}
          onPress={() => onChange(opt)}
        >
          <Text
            style={{
              color: selected === opt ? colors.selectedText : colors.text,
              fontWeight: "600",
            }}
          >
            {translateOption(opt)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap" },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
});
