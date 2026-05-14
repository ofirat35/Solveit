import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export function CategoryCard({ item }) {
  return (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
    >
      <View style={styles.iconContainer}>{item.icon}</View>
      <Text style={styles.subcategoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    width: (width - 60) / 2,
    height: 120,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: { marginBottom: 10 },
  subcategoryText: { fontWeight: "600", color: "#444" },
});
