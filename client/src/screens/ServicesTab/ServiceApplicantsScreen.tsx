import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Calendar, ShoppingBag, SquarePen } from "lucide-react-native";
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
import { Badge } from "../../components/shared/Badge";
import { UserAvatar } from "../../components/UserAvatar";
import { Colors } from "../../helpers/consts/ColorConts";
import { OrderStatusEnum } from "../../helpers/enums/OrderStatusEnum";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";
import { formatLocaleDate } from "../../helpers/methods/formatLocaleDate";
import { getPricingUnit } from "../../helpers/methods/getPricingUnit";
import { ServicesStackParamList } from "../../helpers/types/RootStackParamList";
import { useServiceApplicants } from "../../hooks/Services/useServiceApplicants";
import { useAppNavigation } from "../../hooks/useAppNavigation";

type ServiceApplicantsRouteProp = RouteProp<
  ServicesStackParamList,
  "ServiceApplicantsScreen"
>;

export function ServiceApplicantsScreen() {
  const { t } = useTranslation();
  const route = useRoute<ServiceApplicantsRouteProp>();
  const { navigate, setOptions, goBack } = useAppNavigation();
  const { serviceId } = route.params;

  useEffect(() => {
    setOptions({
      title: t("services.serviceDetails"),
    });
  }, []);

  const {
    service,
    applications,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useServiceApplicants({ serviceId });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#185FA5" />
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color="#E53935" />
        <Text style={styles.errorText}>{t("services.serviceNotFound")}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={goBack}>
          <Text style={styles.retryBtnText}>{t("common.goBack")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderServiceHeader = () => {
    return (
      <View style={styles.heroCard}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={() => {
              navigate("RootTabNavigationScreen", {
                screen: "DiscoveryTab",
                params: {
                  screen: "ServiceDetailScreen",
                  params: { serviceId: service.id },
                },
              });
            }}
            style={styles.heroMainPressable}
            activeOpacity={0.7}
          >
            <View style={{ flex: 1, gap: 4 }}>
              <View style={styles.titleBadgeRow}>
                <Text style={styles.heroTitle} numberOfLines={2}>
                  {service.title}
                </Text>
                <Badge
                  status={ServiceStatusEnum[service.status].toLowerCase()}
                />
              </View>

              <Text style={styles.heroPrice}>
                {service.minPrice}
                {service.maxPrice ? ` - ${service.maxPrice}` : ""}{" "}
                <Text style={styles.currencyText}>TRY</Text>
                <Text style={styles.unitText}>
                  {" "}
                  • {getPricingUnit(t, service.pricing)}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editActionBtn}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "ServicesTab",
                params: {
                  screen: "EditServiceScreen",
                  params: { serviceId: service.id },
                },
              })
            }
            activeOpacity={0.7}
          >
            <SquarePen size={20} color="#185FA5" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {service.description ? (
          <>
            <View style={styles.divider} />
            <Text style={styles.heroDescription}>{service.description}</Text>
          </>
        ) : null}

        <View style={styles.divider} />
        <View style={styles.metaStatsRow}>
          <View style={styles.metaItem}>
            <ShoppingBag size={14} color="#888" strokeWidth={2} />
            <Text style={styles.metaText}>
              {t("services.totalOrders", {
                count: service.totalOrdersCount ?? 0,
              })}
            </Text>
          </View>

          <View style={styles.metaItem}>
            <Calendar size={14} color="#888" strokeWidth={2} />
            <Text style={styles.metaText}>
              {service.updatedDate ? t("common.updated") : t("common.created")}:{" "}
              {formatLocaleDate(service.updatedDate ?? service.createdDate)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.listEmptyState}>
      <Ionicons name="people-outline" size={40} color="#ccc" />
      <Text style={styles.emptyTitle}>{t("services.noApplications")}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={applications}
        keyExtractor={(order) => order.id.toString()}
        ListHeaderComponent={renderServiceHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item: order }) => (
          <TouchableOpacity
            style={styles.applicantCard}
            activeOpacity={0.7}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "ServicesTab",
                params: {
                  screen: "OrderDetailScreen",
                  params: {
                    orderId: order.id,
                  },
                },
              })
            }
          >
            <TouchableOpacity
              onPress={() =>
                navigate("UserProfileScreen", { userId: order.user.id })
              }
            >
              <UserAvatar user={order.user} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.applicantName}>
                {order.user?.firstName} {order.user?.lastName ?? ""}{" "}
              </Text>
              <Text style={styles.applicantDate}>
                {formatLocaleDate(order.createdDate)}
              </Text>
            </View>
            <Badge status={OrderStatusEnum[order.orderStatus].toLowerCase()} />
            <Ionicons name="chevron-forward" size={18} color="#ccc" />
          </TouchableOpacity>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator color="#185FA5" />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    padding: 16,
    marginBottom: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  heroMainPressable: {
    flex: 1,
  },
  titleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: 24,
  },
  heroPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#185FA5",
    marginTop: 2,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#185FA5",
  },
  unitText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#666",
  },
  editActionBtn: {
    padding: 8,
    backgroundColor: "#f5f9ff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  heroDescription: {
    fontSize: 13,
    color: "#4a4a4a",
    lineHeight: 18,
  },
  metaStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background.base,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#f7f9fc",
    padding: 32,
  },
  errorText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
  },
  retryBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#185FA5",
    borderRadius: 10,
  },
  retryBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Structure Layout
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#f0f0f0",
    marginVertical: 14,
  },

  // Applicant Card Row
  applicantCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eef2f6",
  },

  applicantName: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "600",
  },
  applicantDate: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 2,
  },

  // Empty List State
  listEmptyState: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 14,
    color: "#aaa",
    fontWeight: "500",
    textAlign: "center",
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
