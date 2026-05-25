import { t } from "i18next";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder ?? t("common.search")}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChange("")}>
          <Text style={styles.searchClear}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 24,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111",
  },
  searchClear: {
    fontSize: 14,
    color: "#999",
    paddingLeft: 8,
  },
});
