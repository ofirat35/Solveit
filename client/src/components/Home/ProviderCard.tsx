import { Star } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "../../helpers/methods/formatCurrency";
import { getPricingUnit } from "../../helpers/methods/getPricingUnit";
import { ServiceListModel } from "../../models/Services/ServiceListModel";
import { UserAvatar } from "../UserAvatar";

export function ProviderCard({
  item,
  onPress,
}: {
  item: ServiceListModel;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.cardTop}>
        <View>
          <UserAvatar
            user={item.provider}
            containerStyle={{ width: 52, height: 52, borderRadius: 26 }}
            imageStyle={{ width: 52, height: 52, borderRadius: 26 }}
          ></UserAvatar>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.providerName} numberOfLines={1}>
            {item.provider?.firstName}
          </Text>

          <View style={styles.ratingRow}>
            <Star size={13} color="#f59e0b" fill="#f59e0b" />
            {/* <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text> */}
            <Text style={styles.ratingText}>3</Text>
            {/* <Text style={styles.reviewCount}>
              ({item.reviewCount} {t("providers.reviews")})
            </Text> */}
          </View>

          {/* Price */}
          <Text style={styles.price}>
            {formatCurrency({
              amount: item.minPrice,
            })}
            {item.maxPrice
              ? ` – ${formatCurrency({
                  amount: item.maxPrice,
                })}`
              : ""}{" "}
            <Text style={styles.pricingUnit}>
              {getPricingUnit(t, item.pricing)}
            </Text>
          </Text>
        </View>

        {/* Distance badge */}
        {/* {item.distanceKm != null && (
          <View style={styles.distanceBadge}>
            <MapPin size={11} color="#185FA5" />
            <Text style={styles.distanceText}>
              {item.distanceKm.toFixed(1)} km
            </Text>
          </View>
        )} */}
        {/* <View style={styles.distanceBadge}>
          <MapPin size={11} color="#185FA5" />
          <Text style={styles.distanceText}>99 km</Text>
        </View> */}
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 14,
    gap: 10,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },

  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  // Text
  providerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  reviewCount: {
    fontSize: 12,
    color: "#aaa",
  },
  price: {
    fontSize: 13,
    fontWeight: "600",
    color: "#185FA5",
  },
  pricingUnit: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888",
  },
  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },

  // Distance
  distanceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#e7f5ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#185FA5",
  },
});
