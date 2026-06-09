import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserAvatar } from "../components/UserAvatar";
import { keycloakService } from "../helpers/Auth/keycloak";
import { Colors } from "../helpers/consts/ColorConts";
import { COUNTRY_TO_CURRENCY } from "../helpers/methods/currencyMapping";
import { formatCurrency } from "../helpers/methods/formatCurrency";
import { getPricingUnit } from "../helpers/methods/getPricingUnit";
import { RootStackParamList } from "../helpers/types/RootStackParamList";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useUserProfile } from "../hooks/useUserProfile";

type UserProfileRouteProp = RouteProp<RootStackParamList, "UserProfileScreen">;

export function UserProfileScreen() {
  const { t } = useTranslation();
  const route = useRoute<UserProfileRouteProp>();
  const { userId } = route.params;
  const { goBack, navigate, setOptions } = useAppNavigation();
  useEffect(() => {
    setOptions({
      title: t("users.userProfile"),
    });
  }, []);

  const {
    services,
    totalServices,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isUserError,
    user,
  } = useUserProfile({ userId });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#185FA5" />
      </View>
    );
  }

  if (isUserError || !user) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color="#E53935" />
        <Text style={styles.errorText}>{t("providers.noProviders")}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={goBack}>
          <Text style={styles.retryBtnText}>{t("common.goBack")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderFooterLoader = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#185FA5" />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={renderFooterLoader}
        ListHeaderComponent={
          <View>
            {/* Identity Card Block */}
            <View style={styles.profileCard}>
              <UserAvatar
                user={user}
                containerStyle={styles.avatarContainer}
                imageStyle={styles.avatarImage}
              />
              <Text style={styles.userName}>
                {user.firstName} {user.lastName ?? ""}
              </Text>
              {user.email ? (
                <Text style={styles.userEmail}>{user.email}</Text>
              ) : null}

              {user.isServiceProvider && (
                <View style={styles.providerBadge}>
                  <Text style={styles.providerBadgeText}>
                    {t("orders.serviceProvider")}
                  </Text>
                </View>
              )}
            </View>

            {/* Services Section Header Divider */}
            {user.isServiceProvider && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                {keycloakService.getCurrentUserId() == user.id ? (
                  <>
                    <Text style={styles.sectionHeadline}>
                      {t("services.myServices")}
                    </Text>
                    <Text style={styles.sectionBody}>
                      ({t("services.totalServices", { count: totalServices })})
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.sectionHeadline}>
                      {t("services.totalServices", { count: totalServices })}
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>
              {user.isServiceProvider
                ? t("services.noServicesYet")
                : t("providers.noProvidersSubtitle")}
            </Text>
          </View>
        }
        renderItem={({ item: service }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            activeOpacity={0.8}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "DiscoveryTab",
                params: {
                  screen: "ServiceDetailScreen",
                  params: {
                    serviceId: service.id,
                  },
                },
              })
            }
          >
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceTitle} numberOfLines={1}>
                {service.title}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </View>

            {service.description ? (
              <Text style={styles.serviceDescription} numberOfLines={2}>
                {service.description}
              </Text>
            ) : null}

            <View style={styles.serviceFooter}>
              <Text style={styles.priceValue}>
                {formatCurrency({
                  amount: service.minPrice,
                })}
                {service.maxPrice
                  ? ` – ${formatCurrency({
                      amount: service.maxPrice,
                    })}`
                  : ""}{" "}
                <Text style={styles.priceCurrency}>
                  {COUNTRY_TO_CURRENCY[keycloakService.getCurrentUserCountry()]}
                </Text>
              </Text>
              <Text style={styles.pricePer}>
                {getPricingUnit(t, service.pricing)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background.base },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 32,
    backgroundColor: "#f7f9fc",
  },
  errorText: { fontSize: 15, color: "#555", textAlign: "center" },
  retryBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#185FA5",
    borderRadius: 10,
  },
  retryBtnText: { color: "#fff", fontWeight: "600" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: "#f7f9fc",
  },
  scrollContent: { padding: 16, paddingBottom: 40 },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#185FA5",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatarContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: 14,
    borderWidth: 3,
    borderColor: "#f0f5fa",
  },
  avatarImage: { width: 78, height: 78, borderRadius: 39 },
  userName: { fontSize: 18, fontWeight: "700", color: "#1a1a1a" },
  userEmail: { fontSize: 13, color: "#868e96", marginTop: 4 },
  providerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#185FA512",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 12,
  },
  providerBadgeText: { fontSize: 11, fontWeight: "700", color: "#185FA5" },

  sectionHeadline: {
    fontSize: 14,
    fontWeight: "700",
    color: "#868e96",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 14,
    paddingLeft: 4,
  },
  sectionBody: {
    fontSize: 12,
    fontWeight: "700",
    color: "#868e96",
    marginBottom: 14,
    paddingLeft: 4,
  },

  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  serviceTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: "#1a1a1a" },
  serviceDescription: {
    fontSize: 13,
    color: "#6c757d",
    lineHeight: 18,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: "#f8f9fa",
    paddingTop: 10,
  },
  priceValue: { fontSize: 16, fontWeight: "700", color: "#185FA5" },
  priceCurrency: { fontSize: 11, fontWeight: "600" },
  pricePer: { fontSize: 12, color: "#adb5bd" },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: { fontSize: 13, color: "#adb5bd", textAlign: "center" },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
