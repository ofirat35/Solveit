import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "../../components/ServicesTab/Avatar";
import { Badge } from "../../components/ServicesTab/Badge";
import { useAppNavigation } from "../../hooks/useAppNavigation";
export type MyOrder = {
  id: string;
  title: string;
  providerName: string;
  providerInitials: string;
  price: string;
  date: string;
  status: "upcoming" | "completed" | "cancelled";
};

export const MY_ORDERS: MyOrder[] = [
  {
    id: "o1",
    title: "Deep cleaning",
    providerName: "Maria S.",
    providerInitials: "MS",
    price: "$60",
    date: "May 14, 2026",
    status: "upcoming",
  },
  {
    id: "o2",
    title: "furniture moving",
    providerName: "Tom B.",
    providerInitials: "TB",
    price: "$120",
    date: "Apr 30, 2026",
    status: "completed",
  },
];

export function MyOrdersTab() {
  const { navigate } = useAppNavigation();

  return (
    <FlatList
      data={MY_ORDERS}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={40} color="#ccc" />
          <Text style={styles.emptyStateText}>No orders yet</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {}}
          // onPress={() => navigate("OrderDetailScreen", { orderId: item.id })}
        >
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.date}</Text>
            </View>
            <Badge status={item.status} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Avatar
              initials={item.providerInitials}
              bg="#f3f0fe"
              color="#3C3489"
            />
            <Text style={styles.providerName}>{item.providerName}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
  cardSubtitle: { fontSize: 12, color: "#888", marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  divider: { height: 0.5, backgroundColor: "#f0f0f0", marginVertical: 10 },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  providerName: { flex: 1, fontSize: 13, color: "#555" },
  price: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },

  emptyState: { alignItems: "center", marginTop: 60, gap: 10 },
  emptyStateText: { fontSize: 14, color: "#aaa" },
});
