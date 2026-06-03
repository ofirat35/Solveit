import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react-native";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SubcategoryCard } from "../../components/Home/SubcategoryCard";
import { Colors } from "../../helpers/consts/ColorConts";
import { queryKeys } from "../../helpers/queryKeys";
import { CategoryService } from "../../services/CategoryService";

// The precise total height of your search header container including padding
const HEADER_HEIGHT = 130;

export function HomeScreen() {
  const { t } = useTranslation();

  // Create an animated value reference to log the Y scroll position
  const scrollY = useRef(new Animated.Value(0)).current;

  const { data: categories } = useQuery({
    queryKey: queryKeys.categories.categoriesWithSubcategories,
    queryFn: () => CategoryService.getCategoriesWithSubcategories(),
  });

  // diffClamp limits the value between 0 and the header height.
  // It gives us relative scroll updates (tells us immediately if scrolling up or down)
  const clampedScroll = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  // Map the clamped scroll range to a translateY value to slide it off-screen
  const headerTranslateY = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  return (
    <View style={styles.container}>
      {/* ── Animated Search Header ── */}
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <View style={styles.searchBar}>
          <Search size={20} color="#888" />
          <TextInput
            placeholder={`${t("home.searchPlaceholder")}...`}
            style={styles.searchInput}
          />
        </View>
      </Animated.View>

      {/* ── Main Scroll View ── */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + 10,
          paddingBottom: 20,
        }}
        style={styles.body}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        {categories &&
          categories.map((cat) => (
            <View key={cat.id}>
              <Text style={styles.sectionTitle}>{cat.name}</Text>
              <FlatList
                data={cat.subcategories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <SubcategoryCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}
              />
            </View>
          ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    // Fixed over the viewport window
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10, // Layers over the scrollview list
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.background.base,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  body: { flex: 1 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});
