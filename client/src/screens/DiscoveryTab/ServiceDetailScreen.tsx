import { RouteProp, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomModal } from "../../components/shared/CustomModal";
import { LoginRedirect } from "../../components/shared/LoginRedirect";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { Colors } from "../../helpers/consts/ColorConts";
import { useAuth } from "../../helpers/contexts/AuthContext";
import { formatCurrency } from "../../helpers/methods/formatCurrency";
import { DiscoveryStackParamList } from "../../helpers/types/RootStackParamList";
import { useServiceDetail } from "../../hooks/Discovery/useServiceDetail";
import { useAppNavigation } from "../../hooks/useAppNavigation";

type ServiceProviderDetailRouteProp = RouteProp<
  DiscoveryStackParamList,
  "ServiceDetailScreen"
>;

export function ServiceDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute<ServiceProviderDetailRouteProp>();
  const { navigate, setOptions } = useAppNavigation();
  const { serviceId } = route.params;
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const {
    service,
    isLoading,
    error,
    userImageData,
    applyForService,
    isApplying,
  } = useServiceDetail({
    serviceId,
  });
  const { isAuthenticated } = useAuth();
  const currentUserId = useMemo(() => keycloakService.getCurrentUserId(), []);
  const applyForServiceHandler = async () => {
    applyForService();
  };
  useEffect(() => {
    if (service?.title) {
      setOptions({
        title: service.title,
      });
    }
  }, [service?.title, setOptions]);

  if (isLoading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color="#185FA5" />
      </View>
    );
  }

  if (error || !service) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.errorText}>{t("providerDetail.errorLoading")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Provider Banner Image */}
        {service.provider && userImageData ? (
          <Image
            source={{
              uri:
                userImageData?.imagePath || "https://via.placeholder.com/150",
            }}
            style={styles.bannerImage}
            transition={200}
          />
        ) : (
          <View style={[styles.bannerImage, styles.bannerPlaceholder]}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>
                {service.provider?.firstName?.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.contentCard}>
          {/* ── Enhanced Provider identity Block ── */}
          <TouchableOpacity
            onPress={() => {
              navigate("UserProfileScreen", {
                userId: service.providerId,
              });
            }}
            style={styles.providerCard}
          >
            <View style={styles.providerInfo}>
              <Text style={styles.providerLabel}>
                {t("providerDetail.offeredBy")}
              </Text>
              <Text style={styles.providerName}>
                {service.provider?.firstName} {service.provider?.lastName ?? ""}
              </Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐️ 3.5</Text>
            </View>
          </TouchableOpacity>

          {/* ── Enhanced Service Title Block ── */}
          <Text style={styles.mainServiceTitle}>{service.title}</Text>

          {service.pricing && (
            <Text style={styles.priceText}>
              {t("providerDetail.startingFrom")}:{" "}
              <Text style={styles.priceValue}>
                {formatCurrency({
                  amount: service.minPrice,
                })}
                {service.maxPrice
                  ? ` - ${formatCurrency({
                      amount: service.maxPrice,
                    })}`
                  : ""}
              </Text>
            </Text>
          )}

          <View style={styles.divider} />

          {/* About / Description */}
          <Text style={styles.sectionTitle}>{t("providerDetail.about")}</Text>
          <Text style={styles.description}>
            {service.description || t("providerDetail.noDescription")}
          </Text>

          <View style={styles.divider} />

          {/* Additional Details info blocks */}
          <Text style={styles.sectionTitle}>{t("providerDetail.contact")}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              📍 {t("providerDetail.location")}:
            </Text>
            <Text style={styles.infoValue}>address</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              📞 {t("providerDetail.phone")}:
            </Text>
            <Text style={styles.infoValue}>
              {service.provider?.phone || t("common.n/a")}
            </Text>
          </View>
        </View>
      </ScrollView>

      <CustomModal
        visible={confirmModalVisible}
        onDismiss={() => setConfirmModalVisible(false)}
        title={t("serviceDetail.confirmApplicationTitle")}
        onConfirm={() =>
          applyForServiceHandler().then(() => setConfirmModalVisible(false))
        }
        onCancel={() => setConfirmModalVisible(false)}
      >
        <Text>{t("serviceDetail.confirmApplicationBody")}</Text>
      </CustomModal>

      {/* Sticky Bottom Application Button Container */}
      {currentUserId != service.providerId && isAuthenticated && (
        <View style={styles.bottomActionContainer}>
          <TouchableOpacity
            style={[styles.applyButton, isApplying && styles.disabledButton]}
            activeOpacity={0.8}
            disabled={isApplying}
            onPress={() => setConfirmModalVisible(true)}
          >
            {isApplying ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.applyButtonText}>
                {t("providerDetail.applyButton")}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {!isAuthenticated && (
        <View
          style={{
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderColor: "#eee",
            height: 100,
          }}
        >
          <LoginRedirect
            text={t("providerDetail.loginToApply")}
          ></LoginRedirect>
          {/* <TouchableOpacity
            style={[styles.applyButton, isApplying && styles.disabledButton]}
            activeOpacity={0.8}
            disabled={isApplying}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "SettingsTab",
                params: {
                  screen: "SettingsScreen",
                },
              })
            }
          >
            <Text style={styles.applyButtonText}>
              {t("providerDetail.LoginToApply")}
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.base },
  centerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scrollContent: { paddingBottom: 40 },
  bannerImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#e9ecef",
  },
  bannerPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e7f1f9",
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#185FA5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarLetter: {
    color: "#185FA5",
    fontSize: 28,
    fontWeight: "600",
  },
  contentCard: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
    minHeight: 400,
  },

  // New Stylings for Identity presentation
  providerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 20,
  },
  providerInfo: {
    flex: 1,
  },
  providerLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#868e96",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  providerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212529",
  },
  mainServiceTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 30,
    marginBottom: 8,
  },
  ratingBadge: {
    backgroundColor: "#fff9db",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffe066",
  },
  ratingText: { fontSize: 13, fontWeight: "700", color: "#f59f00" },
  priceText: { fontSize: 14, color: "#495057", marginBottom: 8 },
  priceValue: { fontWeight: "700", color: "#185FA5", fontSize: 16 },
  divider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  description: { fontSize: 14, color: "#495057", lineHeight: 22 },
  infoRow: { flexDirection: "row", marginBottom: 8, alignItems: "center" },
  infoLabel: { fontSize: 14, color: "#6c757d", width: 90 },
  infoValue: { fontSize: 14, color: "#212529", flex: 1, fontWeight: "500" },
  errorText: { fontSize: 14, color: "#fa5252", textAlign: "center" },

  // Sticky footer action styling
  bottomActionContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    flex: 1,
  },
  applyButton: {
    backgroundColor: "#185FA5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#185FA5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledButton: { backgroundColor: "#a5c2df" },
  applyButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
});
