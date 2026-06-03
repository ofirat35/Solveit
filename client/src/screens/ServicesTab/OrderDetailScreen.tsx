import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"; // 1. Added useState
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  Modal, // 2. Added Modal for the bottom sheet
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InfoRow } from "../../components/ServicesTab/InfoRow";
import { SectionCard } from "../../components/ServicesTab/SectionCard";
import { Badge } from "../../components/shared/Badge";
import { UserAvatar } from "../../components/UserAvatar";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { Colors } from "../../helpers/consts/ColorConts";
import { OrderStatusEnum } from "../../helpers/enums/OrderStatusEnum";
import { formatLocaleDate } from "../../helpers/methods/formatLocaleDate";
import { getPricingUnit } from "../../helpers/methods/getPricingUnit";
import { ServicesStackParamList } from "../../helpers/types/RootStackParamList";
import { useOrderDetail } from "../../hooks/Services/useOrderDetail";
import { useAppNavigation } from "../../hooks/useAppNavigation";

type ServiceProvidersRouteProp = RouteProp<
  ServicesStackParamList,
  "OrderDetailScreen"
>;

export function OrderDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute<ServiceProvidersRouteProp>();
  const { orderId } = route.params;
  const { goBack, navigate, setOptions } = useAppNavigation();

  const [pickerVisible, setPickerVisible] = useState(false);
  const currentUserId = keycloakService.getCurrentUserId();

  useEffect(() => {
    setOptions({
      title: t("orders.title"),
    });
  }, []);

  const { order, isLoading, isError, updateStatus, isUpdatingStatus } =
    useOrderDetail(orderId);

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
        <Text style={styles.errorText}>{t("orders.failedToLoad")}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={goBack}>
          <Text style={styles.retryBtnText}>{t("common.goBack")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isOrderOwner =
    currentUserId === order.user.id || currentUserId === order.user?.id;
  const isProvider = currentUserId === order.providerId;

  const handleStatusSelect = (newStatus: OrderStatusEnum) => {
    setPickerVisible(false);
    updateStatus({ status: newStatus });
  };

  const handleCustomerCancel = () => {
    Alert.alert(
      t("orders.changeStatusTitle"),
      t("orders.changeStatusConfirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.confirm"),
          onPress: () => updateStatus({ status: OrderStatusEnum.Canceled }),
        },
      ],
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <TouchableOpacity
            onPress={() => {
              navigate("RootTabNavigationScreen", {
                screen: "DiscoveryTab",
                params: {
                  screen: "ServiceDetailScreen",
                  params: { serviceId: order.serviceId },
                },
              });
            }}
            style={styles.heroTop}
          >
            <Text style={styles.heroTitle}>{order.title}</Text>
            <Badge
              status={OrderStatusEnum[order.orderStatus].toLowerCase()}
            ></Badge>
          </TouchableOpacity>

          {order.description ? (
            <Text style={styles.heroDescription}>{order.description}</Text>
          ) : null}

          <View style={styles.heroDivider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{t("orders.price")}</Text>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>
                {order.minPrice}
                {order.maxPrice ? ` – ${order.maxPrice}` : ""}{" "}
                <Text style={styles.priceCurrency}>TRY</Text>
              </Text>
              <Text style={styles.pricePer}>
                {getPricingUnit(t, order.pricing)}
              </Text>
            </View>
          </View>
        </View>

        {order.user ? (
          <SectionCard title={t("orders.customer") || "Customer"}>
            <View style={styles.providerRow}>
              <TouchableOpacity
                onPress={() =>
                  navigate("UserProfileScreen", { userId: order.user.id })
                }
              >
                <UserAvatar
                  user={order.user}
                  containerStyle={{ width: 40, height: 40, borderRadius: 20 }}
                  imageStyle={{ width: 40, height: 40, borderRadius: 20 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigate("UserProfileScreen", { userId: order.user.id })
                }
                style={{ flex: 1 }}
              >
                <Text style={styles.providerName}>
                  {order.user?.firstName} {order.user?.lastName ?? ""}
                </Text>
                {order.user?.email ? (
                  <Text style={styles.providerSub}>{order.user.email}</Text>
                ) : null}
              </TouchableOpacity>
              {currentUserId !== order.user?.id && (
                <TouchableOpacity style={styles.contactBtn}>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={18}
                    color="#185FA5"
                  />
                </TouchableOpacity>
              )}
            </View>
          </SectionCard>
        ) : null}

        <SectionCard title={t("orders.serviceProvider")}>
          <View style={styles.providerRow}>
            <TouchableOpacity
              onPress={() =>
                navigate("UserProfileScreen", { userId: order.providerId })
              }
            >
              <UserAvatar
                user={order.provider}
                containerStyle={{ width: 40, height: 40, borderRadius: 20 }}
                imageStyle={{ width: 40, height: 40, borderRadius: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate("UserProfileScreen", { userId: order.providerId })
              }
              style={{ flex: 1 }}
            >
              <Text style={styles.providerName}>
                {order.provider?.firstName} {order.provider?.lastName ?? ""}
              </Text>
              {order.provider?.phone ? (
                <Text style={styles.providerSub}>{order.provider.phone}</Text>
              ) : null}
            </TouchableOpacity>
            {currentUserId !== order.provider?.id && (
              <TouchableOpacity style={styles.contactBtn}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={18}
                  color="#185FA5"
                />
              </TouchableOpacity>
            )}
          </View>
        </SectionCard>

        <SectionCard title={t("orders.orderInfo")}>
          <InfoRow
            icon="receipt-outline"
            label={t("orders.orderId")}
            value={`#${order.id}`}
          />
          <View style={styles.infoSeparator} />
          <InfoRow
            icon="calendar-outline"
            label={t("orders.orderedOn")}
            value={formatLocaleDate(order.createdDate) ?? "—"}
          />
          {order.scheduledDate ? (
            <>
              <View style={styles.infoSeparator} />
              <InfoRow
                icon="alarm-outline"
                label={t("orders.scheduledFor")}
                value={order.scheduledDate}
              />
            </>
          ) : null}
          {order.location ? (
            <>
              <View style={styles.infoSeparator} />
              <InfoRow
                icon="location-outline"
                label={t("orders.location")}
                value={order.location}
              />
            </>
          ) : null}
        </SectionCard>

        {/* ── Notes section ── */}
        {order.notes ? (
          <SectionCard title={t("orders.notes")}>
            <Text style={styles.notesText}>{order.notes}</Text>
          </SectionCard>
        ) : null}

        <View style={styles.actionArea}>
          {isUpdatingStatus && (
            <ActivityIndicator color="#185FA5" style={{ marginVertical: 12 }} />
          )}

          {isProvider &&
            !isUpdatingStatus &&
            (order.orderStatus === OrderStatusEnum.Pending ||
              order.orderStatus === OrderStatusEnum.Active) && (
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>
                  {t("orders.statusManagement")}
                </Text>
                <TouchableOpacity
                  style={styles.dropdownSelector}
                  onPress={() => setPickerVisible(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.dropdownLeftValue}>
                    <View
                      style={[
                        styles.indicatorDot,
                        { backgroundColor: "#185FA5" },
                      ]}
                    />
                    <Text style={styles.dropdownSelectorValue}>
                      {t(
                        `status.${OrderStatusEnum[order.orderStatus].toLowerCase()}`,
                      )}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={18} color="#666" />
                </TouchableOpacity>
              </View>
            )}

          {!isProvider &&
            !isUpdatingStatus &&
            (order.orderStatus === OrderStatusEnum.Pending ||
              order.orderStatus === OrderStatusEnum.Active) &&
            isOrderOwner && (
              <TouchableOpacity
                onPress={handleCustomerCancel}
                style={styles.dangerBtn}
                activeOpacity={0.85}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={18}
                  color="#E53935"
                />
                <Text style={styles.dangerBtnText}>
                  {t("orders.cancelOrder")}
                </Text>
              </TouchableOpacity>
            )}

          {order.orderStatus === OrderStatusEnum.Canceled && (
            <View style={[styles.staticStateBox, { borderColor: "#FFCDD2" }]}>
              <Text style={styles.dangerBtnText}>{t("status.canceled")}</Text>
            </View>
          )}

          {order.orderStatus === OrderStatusEnum.Completed && (
            <View style={[styles.staticStateBox, { borderColor: "#C8E6C9" }]}>
              <Text style={styles.successTextText}>
                {t("status.completed")}
              </Text>
            </View>
          )}

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
            <Text style={styles.primaryBtnText}>{t("orders.viewService")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setPickerVisible(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>{t("orders.manageStatus")}</Text>
            <Text style={styles.modalSubtitle}>
              {t("orders.currentStatus")} :{" "}
              {t(`status.${OrderStatusEnum[order.orderStatus].toLowerCase()}`)}
            </Text>

            {/* Row Layout container for Action pairs */}
            <View style={styles.modalButtonsRow}>
              {isProvider && OrderStatusEnum.Pending == order.orderStatus && (
                <TouchableOpacity
                  style={[styles.sheetBtn, styles.sheetSuccessBtn]}
                  onPress={() => handleStatusSelect(OrderStatusEnum.Active)}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#fff"
                  />
                  <Text style={styles.sheetSuccessBtnText}>
                    {t("orders.activate")}
                  </Text>
                </TouchableOpacity>
              )}
              {isProvider && OrderStatusEnum.Active == order.orderStatus && (
                <TouchableOpacity
                  style={[styles.sheetBtn, styles.sheetSuccessBtn]}
                  onPress={() => handleStatusSelect(OrderStatusEnum.Completed)}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#fff"
                  />
                  <Text style={styles.sheetSuccessBtnText}>
                    {t("orders.complete")}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetDangerBtn]}
                onPress={() => handleStatusSelect(OrderStatusEnum.Canceled)}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={18}
                  color="#E53935"
                />
                <Text style={styles.sheetDangerBtnText}>
                  {t("orders.cancelOrder")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.sheetCancelBtn}
              onPress={() => setPickerVisible(false)}
            >
              <Text style={styles.sheetCancelBtnText}>
                {t("common.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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

  scrollContent: { padding: 16, paddingBottom: 48, gap: 14 },

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
  heroTop: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
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
  heroDivider: { height: 1, backgroundColor: "#f0f0f0", marginVertical: 14 },
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
  infoSeparator: { height: 1, backgroundColor: "#f5f5f5", marginVertical: 10 },
  notesText: { fontSize: 13, color: "#555", lineHeight: 20 },

  actionArea: { gap: 12, marginTop: 4 },
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
  successTextText: { color: "#2E7D32", fontWeight: "700", fontSize: 15 },
  staticStateBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#fafafa",
    borderWidth: 1,
  },

  dropdownContainer: { gap: 6, marginBottom: 2 },
  dropdownLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    paddingLeft: 2,
  },
  dropdownSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dbe2eb",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownLeftValue: { flexDirection: "row", alignItems: "center", gap: 8 },
  indicatorDot: { width: 8, height: 8, borderRadius: 4 },
  dropdownSelectorValue: { fontSize: 15, fontWeight: "600", color: "#1a1a1a" },

  // ─── BOTTOM DROPDOWN MODAL DESIGN LAYOUTS ───
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 34,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  modalSubtitle: { fontSize: 13, color: "#777", marginBottom: 20 },

  // Custom Horizontal Side-by-Side Row layout config
  modalButtonsRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 12,
  },
  sheetBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 14,
    paddingVertical: 14,
  },
  sheetSuccessBtn: { backgroundColor: "#2E7D32" },
  sheetSuccessBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  sheetDangerBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  sheetDangerBtnText: { color: "#E53935", fontWeight: "700", fontSize: 14 },

  // Bottom isolated dismiss action
  sheetCancelBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 4,
  },
  sheetCancelBtnText: { color: "#666", fontWeight: "600", fontSize: 15 },
});
