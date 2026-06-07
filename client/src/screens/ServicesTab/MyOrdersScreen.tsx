import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next"; // Added Hook Import
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
import { OrderStatusEnum } from "../../helpers/enums/OrderStatusEnum";
import { formatCurrency } from "../../helpers/methods/formatCurrency";
import { formatLocaleDate } from "../../helpers/methods/formatLocaleDate";
import { getPricingUnit } from "../../helpers/methods/getPricingUnit";
import { useMyOrders } from "../../hooks/Services/useMyOrders";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export function MyOrdersTab() {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();
  const { orders, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyOrders();

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "ServicesTab",
                params: {
                  screen: "OrderDetailScreen",
                  params: {
                    orderId: item.id,
                  },
                },
              })
            }
          >
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Badge
                status={OrderStatusEnum[item.orderStatus].toLowerCase()}
              ></Badge>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <View>
                <UserAvatar user={item.provider!}></UserAvatar>
              </View>
              <Text style={styles.providerName} numberOfLines={1}>
                {item.provider?.firstName}
              </Text>
              <View>
                <Text style={styles.price}>
                  {formatCurrency({
                    amount: item.minPrice,
                  })}
                  {item.maxPrice
                    ? ` - ${formatCurrency({
                        amount: item.maxPrice,
                      })}`
                    : ""}
                </Text>
                <Text
                  style={{ fontSize: 11, textAlign: "right", color: "#aaa" }}
                >
                  {getPricingUnit(t, item.pricing)}
                </Text>
              </View>
            </View>

            <Text style={[styles.applicantDate, { marginTop: 10 }]}>
              {t("orders.orderedOnDate", {
                date: formatLocaleDate(item.createdDate),
              })}
            </Text>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={48} color="#ccc" />
          <Text style={styles.emptyTitle}>{t("orders.noOrdersYet")}</Text>
          <Text style={styles.emptySubtitle}>
            {t("orders.emptyOrdersSubtitle")}
          </Text>
        </View>
      }
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator color="#185FA5" />
          </View>
        ) : (
          <Text style={{ textAlign: "center", color: "#aaa", padding: 10 }}>
            {orders.length > 0
              ? t("orders.totalOrdersCount", { count: orders.length })
              : t("orders.noMoreOrders")}
          </Text>
        )
      }
    />
  );
}

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
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    padding: 14,
  },
  cardTitle: { flex: 1, fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  divider: { height: 0.5, backgroundColor: "#f0f0f0", marginVertical: 10 },
  applicantDate: { fontSize: 11, color: "#aaa" },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 10, fontWeight: "600" },
  providerName: { flex: 1, fontSize: 13, color: "#555" },
  price: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
});
