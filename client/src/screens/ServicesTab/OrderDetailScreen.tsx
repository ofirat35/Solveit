import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserAvatar } from "../../components/UserAvatar";
import { OrderStausEnum } from "../../helpers/enums/OrderStatusEnum";
import { formatLocaleDate } from "../../helpers/formatLocaleDate";
import { getPricingUnit } from "../../helpers/methods/getPricingUnit";
import { ServicesStackParamList } from "../../helpers/types/RootStackParamList";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { OrderService } from "../../services/OrderService";

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  OrderStausEnum,
  { bg: string; text: string; icon: string; label: string }
> = {
  [OrderStausEnum.Upcoming]: {
    bg: "#E3F2FD",
    text: "#1565C0",
    icon: "time-outline",
    label: "Upcoming",
  },
  [OrderStausEnum.Completed]: {
    bg: "#E8F5E9",
    text: "#2E7D32",
    icon: "checkmark-circle-outline",
    label: "Completed",
  },
  [OrderStausEnum.Canceled]: {
    bg: "#FFEBEE",
    text: "#C62828",
    icon: "close-circle-outline",
    label: "Canceled",
  },
};

const getStatusConfig = (status: OrderStausEnum) =>
  STATUS_CONFIG[status] ?? {
    bg: "#F5F5F5",
    text: "#757575",
    icon: "ellipse-outline",
    label: "Unknown",
  };

// ─── Section components ────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.sectionCard}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  accent,
}: {
  icon: string;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrap}>
        <Ionicons name={icon as any} size={16} color="#185FA5" />
      </View>
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, accent && styles.infoValueAccent]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

type ServiceProvidersRouteProp = RouteProp<
  ServicesStackParamList,
  "OrderDetailScreen"
>;

export function OrderDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute<ServiceProvidersRouteProp>();
  const { serviceApplicationId } = route.params;
  const { goBack, navigate } = useAppNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetail", serviceApplicationId],
    queryFn: () => OrderService.getOrderById(serviceApplicationId),
  });

  // ── Header animation ──
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // ── Loading / Error ──
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#185FA5" />
      </View>
    );
  }

  if (isError || !order) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color="#E53935" />
        <Text style={styles.errorText}>Failed to load order details.</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={goBack}>
          <Text style={styles.retryBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusConfig = getStatusConfig(order.orderStatus);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fc" />

      {/* ── Animated floating header title ── */}
      <Animated.View
        style={[styles.floatingHeader, { opacity: headerOpacity }]}
        pointerEvents="none"
      >
        <Text style={styles.floatingHeaderTitle} numberOfLines={1}>
          {order.title}
        </Text>
      </Animated.View>

      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="chevron-back" size={22} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Order Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        {/* ── Hero card ── */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <Text style={styles.heroTitle}>{order.title}</Text>
            <View
              style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}
            >
              <Ionicons
                name={statusConfig.icon as any}
                size={12}
                color={statusConfig.text}
              />
              <Text style={[styles.statusText, { color: statusConfig.text }]}>
                {statusConfig.label}
              </Text>
            </View>
          </View>

          {order.description ? (
            <Text style={styles.heroDescription}>{order.description}</Text>
          ) : null}

          <View style={styles.heroDivider} />

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price</Text>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>
                {order.minPrice}
                {order.maxPrice ? ` – ${order.maxPrice}` : ""}{" "}
                <Text style={styles.priceCurrency}>TRY</Text>
              </Text>
              <Text style={styles.pricePer}>
                / {getPricingUnit(t, order.pricing)}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Provider section ── */}
        <SectionCard title="Service Provider">
          <View style={styles.providerRow}>
            <View>
              <UserAvatar
                user={order.provider}
                containerStyle={{ width: 40, height: 40, borderRadius: 20 }}
                imageStyle={{ width: 40, height: 40, borderRadius: 20 }}
              ></UserAvatar>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.providerName}>
                {order.provider?.firstName} {order.provider?.lastName ?? ""}
              </Text>
              {order.provider?.phone ? (
                <Text style={styles.providerSub}>{order.provider.phone}</Text>
              ) : null}
            </View>
            <TouchableOpacity style={styles.contactBtn}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={18}
                color="#185FA5"
              />
            </TouchableOpacity>
          </View>
        </SectionCard>

        {/* ── Order info section ── */}
        <SectionCard title="Order Info">
          <InfoRow
            icon="receipt-outline"
            label="Order ID"
            value={`#${order.id}`}
          />
          <View style={styles.infoSeparator} />
          <InfoRow
            icon="calendar-outline"
            label="Ordered On"
            value={formatLocaleDate(order.createdDate) ?? "—"}
          />
          {order.scheduledDate ? (
            <>
              <View style={styles.infoSeparator} />
              <InfoRow
                icon="alarm-outline"
                label="Scheduled For"
                value={order.scheduledDate}
              />
            </>
          ) : null}
          {order.location ? (
            <>
              <View style={styles.infoSeparator} />
              <InfoRow
                icon="location-outline"
                label="Location"
                value={order.location}
              />
            </>
          ) : null}
        </SectionCard>

        {/* ── Notes section ── */}
        {order.notes ? (
          <SectionCard title="Notes">
            <Text style={styles.notesText}>{order.notes}</Text>
          </SectionCard>
        ) : null}

        {/* ── Action buttons ── */}
        <View style={styles.actionArea}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.85}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "DiscoveryTab",
                params: {
                  screen: "ServiceDetailScreen",
                  params: { serviceId: order.serviceId },
                },
              })
            }
          >
            <Ionicons name="storefront-outline" size={18} color="#fff" />
            <Text style={styles.primaryBtnText}>View Service</Text>
          </TouchableOpacity>

          {order.orderStatus === OrderStausEnum.Upcoming && (
            <TouchableOpacity
              onPress={() => OrderService.cancelOrder(order.id)}
              style={styles.dangerBtn}
              activeOpacity={0.85}
            >
              <Ionicons name="close-circle-outline" size={18} color="#E53935" />
              <Text style={styles.dangerBtnText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
          {order.orderStatus === OrderStausEnum.Canceled && (
            <TouchableOpacity style={styles.dangerBtn} activeOpacity={0.85}>
              <Text style={styles.dangerBtnText}>Order Canceled!</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f7f9fc" },
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

  // Top bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: "#f7f9fc",
  },
  topBarTitle: { fontSize: 17, fontWeight: "700", color: "#1a1a1a" },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  floatingHeader: {
    position: "absolute",
    top: 58,
    left: 60,
    right: 60,
    zIndex: 10,
    alignItems: "center",
  },
  floatingHeaderTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  // Scroll
  scrollContent: { padding: 16, paddingBottom: 48, gap: 14 },

  // Hero card
  heroCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#185FA5",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  heroTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    lineHeight: 24,
  },
  heroDescription: {
    marginTop: 10,
    fontSize: 13,
    color: "#666",
    lineHeight: 19,
  },
  heroDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 14,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceLabel: { fontSize: 13, color: "#999", fontWeight: "500" },
  priceRight: { alignItems: "flex-end" },
  priceValue: { fontSize: 20, fontWeight: "700", color: "#185FA5" },
  priceCurrency: { fontSize: 13, fontWeight: "500", color: "#185FA5" },
  pricePer: { fontSize: 11, color: "#aaa", marginTop: 1 },

  // Status badge
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: { fontSize: 11, fontWeight: "700" },

  // Section card
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 14,
  },

  // Provider
  providerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  providerName: { fontSize: 15, fontWeight: "600", color: "#1a1a1a" },
  providerSub: { fontSize: 12, color: "#aaa", marginTop: 2 },
  contactBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#185FA510",
    alignItems: "center",
    justifyContent: "center",
  },

  // Info rows
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#185FA510",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextWrap: { flex: 1 },
  infoLabel: { fontSize: 11, color: "#aaa", fontWeight: "500" },
  infoValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "600",
    marginTop: 1,
  },
  infoValueAccent: { color: "#185FA5" },
  infoSeparator: { height: 1, backgroundColor: "#f5f5f5", marginVertical: 10 },

  // Notes
  notesText: { fontSize: 13, color: "#555", lineHeight: 20 },

  // Actions
  actionArea: { gap: 10, marginTop: 4 },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#185FA5",
    borderRadius: 14,
    paddingVertical: 15,
  },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  dangerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  dangerBtnText: { color: "#E53935", fontWeight: "700", fontSize: 15 },
});
