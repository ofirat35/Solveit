import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge } from "../../components/ServicesTab/Badge";
import { UserAvatar } from "../../components/UserAvatar";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";
import { formatLocaleDate } from "../../helpers/formatLocaleDate";
import { useMyServices } from "../../hooks/Services/useMyServices";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export function MyServicesTab() {
  const { navigate } = useAppNavigation();
  const { t } = useTranslation();
  const {
    isLoading,
    services,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyServices();

  const getServiceStatusStyle = (status: ServiceStatusEnum) => {
    switch (status) {
      case ServiceStatusEnum.Active:
        return { bg: "#E3F2FD", text: "#1E88E5", labelKey: "status.upcoming" };
      case ServiceStatusEnum.Paused:
        return { bg: "#E8F5E9", text: "#43A047", labelKey: "status.completed" };
      case ServiceStatusEnum.Pending:
        return { bg: "#FFEBEE", text: "#e5e535", labelKey: "status.canceled" };
      case ServiceStatusEnum.Reejected:
        return { bg: "#FFEBEE", text: "#E53935", labelKey: "status.canceled" };
      default:
        return { bg: "#F5F5F5", text: "#757575", labelKey: "status.unknown" };
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>{t("providers.loading")}</Text>
        </View>
      ) : services && services.length > 0 ? (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>
                    {item.minPrice}
                    {item.maxPrice ? ` - ${item.maxPrice}` : ""}
                  </Text>
                </View>
                <Badge status={getServiceStatusStyle(item.status).labelKey} />
              </View>

              <View style={styles.divider} />

              {/* Applications */}
              {item.totalOrdersCount === 0 ? (
                <Text style={styles.emptyText}>
                  {t("services.noApplications")}
                </Text>
              ) : (
                <>
                  <Text style={styles.sectionMini}>
                    {t("services.applicationsCount", {
                      count: item.totalOrdersCount,
                    })}
                  </Text>
                  {item.orders.map((order) => (
                    <TouchableOpacity
                      key={order.id}
                      style={styles.applicantRow}
                      onPress={() => {}}
                    >
                      <View style={styles.avatar}>
                        <UserAvatar user={order.user}></UserAvatar>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.applicantName}>
                          {order.user.firstName}
                        </Text>
                        <Text style={styles.applicantDate}>
                          {formatLocaleDate(order.createdDate)}
                        </Text>
                      </View>
                      <Badge status={"active"} />
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          contentContainerStyle={{ paddingBottom: 30 }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator color="#185FA5" />
              </View>
            ) : null
          }
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>{t("services.noServicesYet")}</Text>
          <Text style={styles.emptySubtitle}>
            {t("services.emptyServicesSubtitle")}
          </Text>
        </View>
      )}
    </View>
  );
}

// ... styles remain identical
const styles = StyleSheet.create({
  container: { flex: 1 },

  separator: { height: 12 },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyIcon: { fontSize: 40, marginBottom: 8 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    lineHeight: 18,
  },
  emptyText: {
    fontSize: 14,
    color: "#aaa",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    padding: 14,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
  cardSubtitle: { fontSize: 12, color: "#888", marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  divider: { height: 0.5, backgroundColor: "#f0f0f0", marginVertical: 10 },
  sectionMini: { fontSize: 12, color: "#888", marginBottom: 8 },

  applicantRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },
  applicantName: { fontSize: 13, color: "#1a1a1a", fontWeight: "500" },
  applicantDate: { fontSize: 11, color: "#aaa", marginTop: 1 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e7f5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: { fontSize: 11, fontWeight: "600" },

  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "500" },

  providerName: { flex: 1, fontSize: 13, color: "#555" },
  price: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },

  addCard: {
    borderWidth: 0.5,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  addText: { fontSize: 13, color: "#aaa" },
});
