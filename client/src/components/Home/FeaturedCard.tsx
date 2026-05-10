import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StarRating } from "./StarRating";
const { width } = Dimensions.get("window");

export function FeaturedCard({ restaurant }: { restaurant: any }) {
  return (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
      {/* Cover */}
      <View
        style={[
          styles.featuredCover,
          { backgroundColor: restaurant.coverColor },
        ]}
      >
        <Text style={styles.featuredEmoji}>{restaurant.emoji}</Text>
        {restaurant.openNow ? (
          <View style={styles.openBadge}>
            <Text style={styles.openBadgeText}>Open</Text>
          </View>
        ) : (
          <View style={[styles.openBadge, styles.closedBadge]}>
            <Text style={styles.openBadgeText}>Closed</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.featuredInfo}>
        <View style={styles.featuredRow}>
          <Text style={styles.featuredName} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
        </View>
        <View style={styles.featuredMeta}>
          <StarRating rating={restaurant.rating} />
          <Text style={styles.dot}>·</Text>
          <Text style={styles.metaText}>{restaurant.cuisineLabel}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.metaText}>{restaurant.distance}</Text>
        </View>

        {/* Available slots */}
        {restaurant.slots.length > 0 && (
          <View style={styles.slotsRow}>
            {restaurant.slots.slice(0, 3).map((slot) => (
              <TouchableOpacity key={slot} style={styles.slotChip}>
                <Text style={styles.slotText}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Featured card
  featuredCard: {
    width: width * 0.62,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
    marginLeft: 24,
  },
  featuredCover: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredEmoji: {
    fontSize: 52,
  },
  openBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#22C55E",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  closedBadge: {
    backgroundColor: "#888",
  },
  openBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  featuredInfo: {
    padding: 14,
  },
  featuredRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  featuredName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    flex: 1,
    marginRight: 8,
  },
  priceRange: {
    fontSize: 13,
    color: "#888",
    fontWeight: "600",
  },
  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  dot: {
    color: "#CCC",
    fontSize: 12,
  },
  metaText: {
    fontSize: 12,
    color: "#888",
  },
  slotsRow: {
    flexDirection: "row",
    gap: 6,
  },
  slotChip: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#86EFAC",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  slotText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16A34A",
  },
});
