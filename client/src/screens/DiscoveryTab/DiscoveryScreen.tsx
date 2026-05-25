import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SubcategoryCard } from "../../components/Home/SubcategoryCard";
import { CategoryService } from "../../services/CategoryService";

export function HomeScreen() {
  const { t } = useTranslation();
  const { data: categories } = useQuery({
    queryKey: ["categoriesWithSubcategories"],
    queryFn: () => CategoryService.getCategoriesWithSubcategories(),
  });

  console.log(categories);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}> {t("home.greeting")}</Text>
        <View style={styles.searchBar}>
          <Search size={20} color="#888" />
          <TextInput
            placeholder={`${t("home.searchPlaceholder")}...`}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.body}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, paddingTop: 60, backgroundColor: "#f8f9fa" },
  greeting: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
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
  body: { flex: 1, paddingTop: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});
