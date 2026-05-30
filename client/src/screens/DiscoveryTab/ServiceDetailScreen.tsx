import { RouteProp, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreenHeader } from "../../components/shared/ScreenHeader";
import { DiscoveryStackParamList } from "../../helpers/types/RootStackParamList";
import { ServiceProviderService } from "../../services/ServiceProviderService";
import { UserService } from "../../services/UserService";

type ServiceProviderDetailRouteProp = RouteProp<
  DiscoveryStackParamList,
  "ServiceDetailScreen"
>;

export function ServiceDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute<ServiceProviderDetailRouteProp>();
  const { serviceId } = route.params;
  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: () => ServiceProviderService.getServiceById(serviceId),
  });

  const provider = useMemo(() => service?.provider, [service]);
  const { data: userImageData } = useQuery({
    queryKey: ["userImage", service?.providerId],
    queryFn: () => {
      return service?.providerId
        ? UserService.getUserImage(service.providerId)
        : undefined;
    },
    enabled: !!service?.providerId,
  });

  // 2. Mutation for applying to a service
  const { mutate: applyForService, isPending: isApplying } = useMutation({
    mutationFn: (id: number) => ServiceProviderService.applyForService(id),
    onSuccess: () => {
      Alert.alert(
        t("common.success", "Success"),
        t(
          "providerDetail.applySuccess",
          "Your application has been submitted successfully!",
        ),
      );
    },
    onError: (err) => {
      Alert.alert(
        t("common.error", "Error"),
        err.message ||
          t("providerDetail.applyError", "Failed to submit application."),
      );
    },
  });

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
        <Text style={styles.errorText}>
          {t("providerDetail.errorLoading", "Failed to load provider details.")}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader headerTitle={provider?.firstName} />

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
          <View
            style={[
              styles.bannerImage,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Text style={[{ color: "#185FA5", fontSize: 32, fontWeight: 500 }]}>
              {service.provider?.firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.contentCard}>
          {/* Header Row (Name & Rating) */}
          <View style={styles.metaRow}>
            <Text style={styles.providerName}>{provider?.firstName}</Text>
            {/* {provider.rating && (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>
                  ⭐️ {provider.rating.toFixed(1)}
                </Text>
              </View>
            )} */}
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐️ 3.5</Text>
            </View>
          </View>

          {/* Pricing or Subcategory context if applicable */}
          {service.pricing && (
            <Text style={styles.priceText}>
              {t("providerDetail.startingFrom", "Starting from")}:{" "}
              <Text style={styles.priceValue}>
                ${service.minPrice}
                {service.maxPrice ? ` - $${service.maxPrice}` : ""}
              </Text>
            </Text>
          )}

          <View style={styles.divider} />

          {/* About / Description */}
          <Text style={styles.sectionTitle}>
            {t("providerDetail.about", "About Service")}
          </Text>
          <Text style={styles.description}>
            {service.description ||
              t(
                "providerDetail.noDescription",
                "No description available for this vendor.",
              )}
          </Text>

          <View style={styles.divider} />

          {/* Additional Details info blocks */}
          <Text style={styles.sectionTitle}>
            {t("providerDetail.contact", "Contact Info")}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              📍 {t("providerDetail.location", "Location")}:
            </Text>
            <Text style={styles.infoValue}>
              {/* {provider.address || t("common.n/a", "N/A")} */}address
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              📞 {t("providerDetail.phone", "Phone")}:
            </Text>
            <Text style={styles.infoValue}>
              {provider?.phone || t("common.n/a", "N/A")}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Application Button Container */}
      <View style={styles.bottomActionContainer}>
        <TouchableOpacity
          style={[styles.applyButton, isApplying && styles.disabledButton]}
          activeOpacity={0.8}
          disabled={isApplying}
          onPress={() => applyForService(serviceId)}
        >
          {isApplying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.applyButtonText}>
              {t("providerDetail.applyButton", "Apply for Service")}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
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
  contentCard: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
    minHeight: 400,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },
  providerName: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  ratingBadge: {
    backgroundColor: "#fff9db",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffe066",
  },
  ratingText: { fontSize: 13, fontWeight: "600", color: "#f59f00" },
  priceText: { fontSize: 14, color: "#666", marginBottom: 16 },
  priceValue: { fontWeight: "700", color: "#185FA5", fontSize: 16 },
  divider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 10,
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
