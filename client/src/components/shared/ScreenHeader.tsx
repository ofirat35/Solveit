import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppNavigation } from "../../hooks/useAppNavigation";

type ScreenHeaderProps = {
  headerTitle?: string;
};

export function ScreenHeader({ headerTitle }: ScreenHeaderProps) {
  const { goBack } = useAppNavigation();

  return (
    <SafeAreaView edges={["top"]} style={styles.header}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={22} color="#1a1a1a" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
      <View style={{ width: 36 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e8e8",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
});
