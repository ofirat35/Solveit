import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function DropdownPicker({
  label,
  placeholder,
  selectedOption,
  options,
  onSelect,
  disabled,
}: {
  label: string;
  placeholder: string;
  selectedOption: { label: string | undefined; value: string } | null;
  options: { label: string; value: string }[];
  onSelect: (selectedId: string | null) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.dropdownWrap}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TouchableOpacity
          style={[styles.dropdownTrigger, disabled && styles.dropdownDisabled]}
          onPress={() => !disabled && setOpen(true)}
          activeOpacity={disabled ? 1 : 0.7}
        >
          <Text
            style={[
              styles.dropdownTriggerText,
              !selectedOption && styles.dropdownPlaceholder,
            ]}
          >
            {selectedOption?.label ?? placeholder}
          </Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={14}
            color={disabled ? "#ccc" : "#aaa"}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{label}</Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 320 }}
            >
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={styles.sheetOption}
                  onPress={() => {
                    onSelect(opt.value.toString());
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.sheetOptionText,
                      selectedOption?.value === opt.value &&
                        styles.sheetOptionActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {selectedOption?.value === opt.value && (
                    <Ionicons name="checkmark" size={16} color="#185FA5" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
    marginBottom: 6,
  },

  // Dropdown styles
  dropdownWrap: {
    gap: 4,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
    gap: 4,
  },
  dropdownDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ebebeb",
  },
  dropdownTriggerText: {
    flex: 1,
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },
  dropdownPlaceholder: {
    color: "#bbb",
    fontWeight: "400",
  },

  // Modal sheet
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 36,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e0e0e0",
    alignSelf: "center",
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#aaa",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 4,
  },
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f2f2f2",
  },
  sheetOptionText: {
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "400",
  },
  sheetOptionActive: {
    color: "#185FA5",
    fontWeight: "600",
  },
});
