import {
  GraduationCap,
  Paintbrush,
  Search,
  Truck,
  Zap,
} from "lucide-react-native";
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
import { CategoryCard } from "../../components/Home/CategoryCard";

const CATEGORIES = [
  {
    id: "1",
    name: "Cleaning",
    icon: <Paintbrush color="#ff6b6b" />,
    subcategories: [
      {
        id: "1",
        name: "House Cleaning",
        icon: <Paintbrush color="#ff6b6b" />,
        color: "#fff5f5",
      },
      {
        id: "2",
        name: "Regular",
        icon: <Paintbrush color="#ff6b6b" />,
        color: "#fff5f5",
      },
      {
        id: "3",
        name: "Windows",
        icon: <Paintbrush color="#ff6b6b" />,
        color: "#fff5f5",
      },
      {
        id: "4",
        name: "Regular",
        icon: <Paintbrush color="#ff6b6b" />,
        color: "#fff5f5",
      },
      {
        id: "5",
        name: "Windows",
        icon: <Paintbrush color="#ff6b6b" />,
        color: "#fff5f5",
      },
    ],
  },
  {
    id: "2",
    name: "Moving",
    icon: <Truck color="#4dadf7" />,
    subcategories: [
      {
        id: "6",
        name: "Local",
        icon: <Truck color="#4dadf7" />,
        color: "#e7f5ff",
      },
      {
        id: "7",
        name: "Long Distance",
        icon: <Truck color="#4dadf7" />,
        color: "#e7f5ff",
      },
      {
        id: "8",
        name: "Packing",
        icon: <Truck color="#4dadf7" />,
        color: "#e7f5ff",
      },
    ],
  },
  {
    id: "3",
    name: "Electrician",
    icon: <Zap color="#fcc419" />,
    subcategories: [
      {
        id: "9",
        name: "Installation",
        icon: <Zap color="#fcc419" />,
        color: "#fff9db",
      },
      {
        id: "10",
        name: "Repair",
        icon: <Zap color="#fcc419" />,
        color: "#fff9db",
      },
      {
        id: "11",
        name: "Inspection",
        icon: <Zap color="#fcc419" />,
        color: "#fff9db",
      },
    ],
  },
  {
    id: "4",
    name: "Tutoring",
    icon: <GraduationCap color="#51cf66" />,
    subcategories: [
      {
        id: "12",
        name: "Math",
        icon: <GraduationCap color="#51cf66" />,
        color: "#ebfbee",
      },
      {
        id: "13",
        name: "Science",
        icon: <GraduationCap color="#51cf66" />,
        color: "#ebfbee",
      },
      {
        id: "14",
        name: "Languages",
        icon: <GraduationCap color="#51cf66" />,
        color: "#ebfbee",
      },
    ],
  },
];

export function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}> {t("What do you need help with?")}</Text>
        <View style={styles.searchBar}>
          <Search size={20} color="#888" />
          <TextInput
            placeholder={`${t("Try 'House Cleaning'")}...`}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.body}
      >
        {CATEGORIES.map((cat) => (
          <View key={cat.id}>
            <Text style={styles.sectionTitle}>{cat.name}</Text>
            <FlatList
              data={cat.subcategories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CategoryCard item={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingHorizontal: 20,
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
