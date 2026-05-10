import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";
import { FeaturedCard } from "../components/Home/FeaturedCard";
import { RestaurantRow } from "../components/Home/RestaurantRow";

const { width } = Dimensions.get("window");

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CUISINES = [
  { id: "all", label: "All" },
  { id: "italian", label: "🍝 Italian" },
  { id: "turkish", label: "🥙 Turkish" },
  { id: "japanese", label: "🍱 Japanese" },
  { id: "burger", label: "🍔 Burger" },
  { id: "seafood", label: "🦞 Seafood" },
];

const RESTAURANTS = [
  {
    id: "1",
    name: "Köşk Ocakbaşı",
    cuisine: "turkish",
    cuisineLabel: "Turkish",
    rating: 4.8,
    reviewCount: 312,
    priceRange: "$$",
    distance: "0.4 km",
    address: "Mevlana Caddesi, Konya",
    openNow: true,
    tags: ["Kebab", "Mangal", "Family"],
    coverColor: "#C8553D",
    emoji: "🥩",
    slots: ["19:00", "19:30", "20:00"],
  },
  {
    id: "2",
    name: "Sakura Garden",
    cuisine: "japanese",
    cuisineLabel: "Japanese",
    rating: 4.6,
    reviewCount: 198,
    priceRange: "$$$",
    distance: "1.2 km",
    address: "Alaaddin Bulvarı, Konya",
    openNow: true,
    tags: ["Sushi", "Ramen", "Sake"],
    coverColor: "#2D4A3E",
    emoji: "🌸",
    slots: ["18:30", "20:30"],
  },
  {
    id: "3",
    name: "Bella Napoli",
    cuisine: "italian",
    cuisineLabel: "Italian",
    rating: 4.5,
    reviewCount: 145,
    priceRange: "$$",
    distance: "0.9 km",
    address: "Karatay, Konya",
    openNow: false,
    tags: ["Pizza", "Pasta", "Wine"],
    coverColor: "#8B5E3C",
    emoji: "🍕",
    slots: [],
  },
  {
    id: "4",
    name: "The Smokehouse",
    cuisine: "burger",
    cuisineLabel: "Burger",
    rating: 4.7,
    reviewCount: 421,
    priceRange: "$",
    distance: "0.6 km",
    address: "Selçuklu, Konya",
    openNow: true,
    tags: ["Burgers", "Craft Beer", "Wings"],
    coverColor: "#1B2838",
    emoji: "🍔",
    slots: ["18:00", "19:00", "21:00"],
  },
  {
    id: "5",
    name: "Deniz & Balık",
    cuisine: "seafood",
    cuisineLabel: "Seafood",
    rating: 4.9,
    reviewCount: 87,
    priceRange: "$$$",
    distance: "2.1 km",
    address: "Meram, Konya",
    openNow: true,
    tags: ["Fresh Fish", "Mezes", "Rakı"],
    coverColor: "#1A4A6B",
    emoji: "🐟",
    slots: ["19:30", "20:00", "20:30"],
  },
];

const FEATURED = RESTAURANTS.filter((r) => r.rating >= 4.7);

function CuisineFilter({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterList}
    >
      {CUISINES.map((c) => (
        <TouchableOpacity
          key={c.id}
          style={[
            styles.filterChip,
            selected === c.id && styles.filterChipActive,
          ]}
          onPress={() => onSelect(c.id)}
        >
          <Text
            style={[
              styles.filterChipText,
              selected === c.id && styles.filterChipTextActive,
            ]}
          >
            {c.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");

  const filtered = RESTAURANTS.filter((r) => {
    const matchesCuisine =
      selectedCuisine === "all" || r.cuisine === selectedCuisine;
    const matchesSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisineLabel.toLowerCase().includes(search.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F7F4" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Good evening 👋</Text>
            <Text style={styles.headerTitle}>Find your table</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <Text style={styles.avatarText}>JD</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <SearchBar value={search} onChange={setSearch} />

        {/* Cuisine filter */}
        <CuisineFilter
          selected={selectedCuisine}
          onSelect={setSelectedCuisine}
        />

        {/* Featured — only shown when no search/filter active */}
        {search === "" && selectedCuisine === "all" && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>⭐ Top Picks</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 16, paddingRight: 24 }}
            >
              {FEATURED.map((r) => (
                <FeaturedCard key={r.id} restaurant={r} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* All / filtered restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {search || selectedCuisine !== "all"
                ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`
                : "All Restaurants"}
            </Text>
          </View>

          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🍽️</Text>
              <Text style={styles.emptyText}>No restaurants found</Text>
              <Text style={styles.emptySubtext}>
                Try a different search or filter
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {filtered.map((r) => (
                <RestaurantRow key={r.id} restaurant={r} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  safe: {
    flex: 1,
    backgroundColor: "#F9F7F4",
  },
  scroll: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerGreeting: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
    letterSpacing: -0.5,
  },
  avatarBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // Filter
  filterList: {
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
  },
  filterChipActive: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  filterChipTextActive: {
    color: "#fff",
  },

  // Section
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 13,
    color: "#888",
    fontWeight: "600",
  },

  // Empty state
  empty: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#999",
  },
});
