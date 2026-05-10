import { StyleSheet, Text, View } from "react-native";

export function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.starsRow}>
      <Text style={styles.starFilled}>★</Text>
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  starFilled: {
    color: "#F59E0B",
    fontSize: 13,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111",
  },
});
