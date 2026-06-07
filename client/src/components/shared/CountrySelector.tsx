import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface CountryItem {
  code: string;
  labelKey: string;
}

export const COUNTRY_LIST: CountryItem[] = [
  { code: "TR", labelKey: "countries.tr" },
  { code: "DE", labelKey: "countries.de" },
  { code: "US", labelKey: "countries.us" },
];

interface CountrySelectorProps {
  value: string;
  onChange: (code: string) => void;
  error?: string;
  labelText: string;
}

export function CountrySelector({
  value,
  onChange,
  error,
  labelText,
}: CountrySelectorProps) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCountry = COUNTRY_LIST.find((c) => c.code === value);

  const handleSelect = (code: string) => {
    onChange(code);
    setModalVisible(false);
  };

  return (
    <View>
      <Text style={styles.label}>{labelText}</Text>

      <TouchableOpacity
        style={[styles.selectorButton, error ? styles.inputError : null]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.selectorText,
            !selectedCountry && { color: "#ABABAB" },
          ]}
        >
          {selectedCountry
            ? t(selectedCountry.labelKey)
            : t("register.selectCountry", "Select Country")}
        </Text>
        <FontAwesome5 name="chevron-down" size={14} color="#555" />
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} pointerEvents="box-none">
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {t("register.chooseCountry", "Choose Country")}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <FontAwesome5 name="times" size={16} color="#555" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={COUNTRY_LIST}
              keyExtractor={(item) => item.code}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              style={styles.list}
              renderItem={({ item }) => {
                const isCurrent = item.code === value;
                return (
                  <TouchableOpacity
                    style={styles.itemRow}
                    onPress={() => handleSelect(item.code)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        isCurrent && styles.itemTextActive,
                      ]}
                    >
                      {t(item.labelKey)}
                    </Text>
                    {isCurrent && (
                      <FontAwesome5 name="check" size={12} color="#111" />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "600", color: "#888", marginBottom: 8 },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#FAFAFA",
  },
  selectorText: { fontSize: 15, color: "#111" },
  inputError: { borderColor: "#E05252" },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  modalContent: {
    width: "100%",
    maxHeight: "50%",
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
  closeButton: { padding: 4 },
  list: {
    paddingVertical: 4,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  itemText: { fontSize: 15, color: "#444" },
  itemTextActive: { fontWeight: "600", color: "#111" },
  separator: { height: 1, backgroundColor: "#F5F5F5" },
});
