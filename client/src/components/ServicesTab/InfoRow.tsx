import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function InfoRow({
  icon,
  label,
  value,
  accent,
}: {
  icon: string;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrap}>
        <Ionicons name={icon as any} size={16} color="#185FA5" />
      </View>
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, accent && styles.infoValueAccent]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#185FA510",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextWrap: { flex: 1 },
  infoLabel: { fontSize: 11, color: "#aaa", fontWeight: "500" },
  infoValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "600",
    marginTop: 1,
  },
  infoValueAccent: { color: "#185FA5" },
  infoSeparator: { height: 1, backgroundColor: "#f5f5f5", marginVertical: 10 },
});
