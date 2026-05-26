import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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
import { keycloakService } from "../../helpers/Auth/keycloak";
import { showToast } from "../../helpers/Toasts/DefaultToasts";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { UserService } from "../../services/UserService";
import { MyOrdersTab } from "./MyOrdersScreen";
import { MyServicesTab } from "./MyServicesScreen";

const cacheName = "ServicesTab.DefaultTab";

export function ServicesScreen() {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();
  const [pendingDefaultTab, setPendingDefaultTab] = useState<
    "myOrders" | "myServices" | null
  >(null);
  const [activeTab, setActiveTab] = useState<"myOrders" | "myServices">();
  const [isProvider, setIsProvider] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [showDefaultTabModal, setShowDefaultTabModal] = useState(false);

  const getDefaultTab = async () => {
    let selectedTab = await AsyncStorage.getItem(cacheName);
    if (!selectedTab) selectedTab = "myOrders";
    await AsyncStorage.setItem(cacheName, selectedTab);
    return selectedTab as "myOrders" | "myServices";
  };

  const setDefaultTab = async (tab: "myOrders" | "myServices") => {
    setPendingDefaultTab(tab);
    setShowDefaultTabModal(true);
  };

  const confirmSetDefaultTab = async () => {
    if (!pendingDefaultTab) return;
    await AsyncStorage.setItem(cacheName, pendingDefaultTab);
    setActiveTab(pendingDefaultTab);
    setShowDefaultTabModal(false);
    showToast(
      t("services.defaultChanged", { tab: t(`services.${pendingDefaultTab}`) }),
    );
  };

  const handleProviderToggle = async (newValue: boolean) => {
    if (newValue) {
      setShowProviderModal(true);
    } else {
      await UserService.SetIsServiceProviderAsync(false);
      setIsProvider(false);
      if (activeTab === "myServices") setActiveTab("myOrders");
    }
  };

  const confirmActivateProvider = async () => {
    await UserService.SetIsServiceProviderAsync(true);
    setIsProvider(true);
    setShowProviderModal(false);
  };

  useEffect(() => {
    UserService.checkIsServiceProviderByUserId(
      keycloakService.getCurrentUserId()!,
    )
      .then((isServiceProvider) => setIsProvider(isServiceProvider))
      .catch((error) =>
        console.error("Error fetching provider status:", error),
      );
    getDefaultTab().then((tab) => setActiveTab(tab));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.heading}>{t("services.title")}</Text>
        {isProvider && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "ServicesTab",
                params: { screen: "CreateServiceScreen" },
              })
            }
          >
            <Ionicons name="add" size={18} color="#185FA5" />
            <Text style={styles.addBtnText}>{t("services.addService")}</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>

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
              {isProvider
                ? t("services.providerModeOn")
                : t("services.providerModeOff")}
            </Text>
            <Text style={styles.providerBannerSub}>
              {isProvider
                ? t("services.servicesVisible")
                : t("services.activateToOffer")}
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
              activeTab === "myOrders" && styles.segmentActive,
            ]}
            onPress={() => setActiveTab("myOrders")}
            onLongPress={() => setDefaultTab("myOrders")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "myOrders" && styles.segmentTextActive,
              ]}
            >
              {t("services.myOrders")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segment,
              activeTab === "myServices" && styles.segmentActive,
            ]}
            onPress={() => setActiveTab("myServices")}
            onLongPress={() => setDefaultTab("myServices")}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === "myServices" && styles.segmentTextActive,
              ]}
            >
              {t("services.myServices")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.soloTabLabel}>
          <Text style={styles.soloTabText}>{t("services.myOrders")}</Text>
        </View>
      )}

      <View style={styles.body}>
        {isProvider && activeTab === "myServices" ? (
          <MyServicesTab />
        ) : (
          <MyOrdersTab />
        )}
      </View>

      {/* Default Tab Modal */}
      <Modal
        visible={showDefaultTabModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDefaultTabModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <Ionicons name="bookmark-outline" size={28} color="#185FA5" />
            </View>
            <Text style={styles.modalTitle}>
              {t("services.setAsDefaultTitle")}
            </Text>
            <Text style={styles.modalBody}>
              {t("services.setAsDefaultDescription", {
                tab: t(`services.${pendingDefaultTab}`),
              })}
            </Text>
            <TouchableOpacity
              style={styles.modalPrimary}
              onPress={confirmSetDefaultTab}
            >
              <Text style={styles.modalPrimaryText}>
                {t("services.setAsDefault")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSecondary}
              onPress={() => setShowDefaultTabModal(false)}
            >
              <Text style={styles.modalSecondaryText}>
                {t("common.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Provider Modal */}
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
            <Text style={styles.modalTitle}>
              {t("services.becomeProviderTitle")}
            </Text>
            <Text style={styles.modalBody}>
              {t("services.becomeProviderDescription")}
            </Text>
            <TouchableOpacity
              style={styles.modalPrimary}
              onPress={confirmActivateProvider}
            >
              <Text style={styles.modalPrimaryText}>
                {t("services.activate")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSecondary}
              onPress={() => setShowProviderModal(false)}
            >
              <Text style={styles.modalSecondaryText}>
                {t("common.notNow")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
