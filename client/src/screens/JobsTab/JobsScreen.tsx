import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { MyOrdersTab } from "./MyOrdersScreen";
import { MyServicesTab } from "./MyServicesScreen";

export function JobsScreen() {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();

  const [activeTab, setActiveTab] = useState<"services" | "orders">("orders");
  const [isProvider, setIsProvider] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);

  const handleProviderToggle = (newValue: boolean) => {
    console.log("Toggling provider mode:", newValue);
    if (newValue) {
      setShowProviderModal(true);
    } else {
      setIsProvider(false);
      if (activeTab === "services") setActiveTab("orders");
    }
  };

  const confirmActivateProvider = () => {
    setIsProvider(true);
    setShowProviderModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{t("jobs.title", "My jobs")}</Text>
        {isProvider && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "JobsTab",
                params: { screen: "CreateServiceScreen" },
              })
            }
          >
            <Ionicons name="add" size={18} color="#185FA5" />
            <Text style={styles.addBtnText}>Add service</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.providerBanner}>
        <View style={styles.providerBannerLeft}>
          <View
            style={[
              styles.providerDot,
              { backgroundColor: isProvider ? "#27ae60" : "#ccc" },
            ]}
          />
          <View>
            <Text style={styles.providerBannerTitle}>
              {isProvider ? "Provider mode on" : "Provider mode off"}
            </Text>
            <Text style={styles.providerBannerSub}>
              {isProvider
                ? "Your services are visible to customers"
                : "Activate to offer your own services"}
            </Text>
          </View>
        </View>
        <Switch
          value={isProvider}
          onValueChange={handleProviderToggle}
          trackColor={{ false: "#e0e0e0", true: "#cce3f8" }}
          thumbColor={isProvider ? "#185FA5" : "#aaa"}
        />
      </View>

      {isProvider ? (
        <View style={styles.segmented}>
          <TouchableOpacity
            style={[
              styles.segment,
              activeTab === "orders" && styles.segmentActive,
            ]}
            onPress={() => setActiveTab("orders")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "orders" && styles.segmentTextActive,
              ]}
            >
              {t("jobs.myOrders", "My orders")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segment,
              activeTab === "services" && styles.segmentActive,
            ]}
            onPress={() => setActiveTab("services")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "services" && styles.segmentTextActive,
              ]}
            >
              {t("jobs.myServices", "My services")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.soloTabLabel}>
          <Text style={styles.soloTabText}>
            {t("jobs.myOrders", "My orders")}
          </Text>
        </View>
      )}

      <View style={styles.body}>
        {isProvider && activeTab === "services" ? (
          <MyServicesTab />
        ) : (
          <MyOrdersTab />
        )}
      </View>

      <Modal
        visible={showProviderModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProviderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <Ionicons name="briefcase-outline" size={28} color="#185FA5" />
            </View>
            <Text style={styles.modalTitle}>Become a provider?</Text>
            <Text style={styles.modalBody}>
              Activating provider mode makes your services visible to customers.
              You can turn it off at any time.
            </Text>
            <TouchableOpacity
              style={styles.modalPrimary}
              onPress={confirmActivateProvider}
            >
              <Text style={styles.modalPrimaryText}>Activate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSecondary}
              onPress={() => setShowProviderModal(false)}
            >
              <Text style={styles.modalSecondaryText}>Not now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: { fontSize: 22, fontWeight: "700", color: "#1a1a1a" },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#e7f5ff",
  },
  addBtnText: { fontSize: 13, fontWeight: "600", color: "#185FA5" },

  providerBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 4,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  providerBannerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  providerDot: { width: 8, height: 8, borderRadius: 4 },
  providerBannerTitle: { fontSize: 13, fontWeight: "600", color: "#1a1a1a" },
  providerBannerSub: { fontSize: 11, color: "#aaa", marginTop: 1 },

  segmented: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  segmentActive: { backgroundColor: "#f8f9fa" },
  segmentText: { fontSize: 13, fontWeight: "500", color: "#888" },
  segmentTextActive: { color: "#1a1a1a" },

  soloTabLabel: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  soloTabText: { fontSize: 15, fontWeight: "600", color: "#1a1a1a" },

  body: { flex: 1, paddingHorizontal: 16 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  modalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#e7f5ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
  },
  modalPrimary: {
    backgroundColor: "#185FA5",
    borderRadius: 12,
    paddingVertical: 13,
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  modalPrimaryText: { fontSize: 14, fontWeight: "600", color: "#fff" },
  modalSecondary: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalSecondaryText: { fontSize: 14, color: "#aaa" },
});
