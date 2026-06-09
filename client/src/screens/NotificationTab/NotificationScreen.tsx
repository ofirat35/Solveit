import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginRedirect } from "../../components/shared/LoginRedirect";
import { Colors } from "../../helpers/consts/ColorConts";
import { useAuth } from "../../helpers/contexts/AuthContext";

export function NotificationScreen() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <View style={styles.container}>
        <LoginRedirect></LoginRedirect>
      </View>
    );

  return (
    <View>
      <SafeAreaView style={styles.header}>
        <Text style={styles.heading}>{t("services.title")}</Text>
      </SafeAreaView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.base },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: { fontSize: 17, fontWeight: "700", color: "#1a1a1a" },
});
