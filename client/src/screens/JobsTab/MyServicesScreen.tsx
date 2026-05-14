import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "../../components/JobsTab/Avatar";
import { Badge } from "../../components/JobsTab/Badge";
import { useAppNavigation } from "../../hooks/useAppNavigation";
export type Application = {
  id: string;
  applicantName: string;
  applicantInitials: string;
  avatarBg: string;
  avatarColor: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
};

export type MyService = {
  id: string;
  title: string;
  price: string;
  status: "active" | "paused";
  applications: Application[];
};
export const MY_SERVICES: MyService[] = [
  {
    id: "1",
    title: "House cleaning",
    price: "$45 / session",
    status: "active",
    applications: [
      {
        id: "a1",
        applicantName: "John Doe",
        applicantInitials: "JD",
        avatarBg: "#e7f5ff",
        avatarColor: "#185FA5",
        date: "Today at 10:30",
        status: "pending",
      },
      {
        id: "a2",
        applicantName: "Sara R.",
        applicantInitials: "SR",
        avatarBg: "#ebfbee",
        avatarColor: "#27500A",
        date: "Yesterday",
        status: "accepted",
      },
    ],
  },
  {
    id: "2",
    title: "Math tutoring",
    price: "$30 / hour",
    status: "paused",
    applications: [],
  },
];

export function MyServicesTab() {
  const { navigate } = useAppNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {MY_SERVICES.map((service) => (
        <View key={service.id} style={styles.card}>
          {/* Service header */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardSubtitle}>{service.price}</Text>
            </View>
            <Badge status={service.status} />
          </View>

          <View style={styles.divider} />

          {/* Applications */}
          {service.applications.length === 0 ? (
            <Text style={styles.emptyText}>No applications yet</Text>
          ) : (
            <>
              <Text style={styles.sectionMini}>
                {service.applications.length} application
                {service.applications.length > 1 ? "s" : ""}
              </Text>
              {service.applications.map((app) => (
                <TouchableOpacity
                  key={app.id}
                  style={styles.applicantRow}
                  onPress={() => {}}
                  // onPress={() =>
                  //   navigate("ApplicationDetailScreen", {
                  //     applicationId: app.id,
                  //   })
                  // }
                >
                  <Avatar
                    initials={app.applicantInitials}
                    bg={app.avatarBg}
                    color={app.avatarColor}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.applicantName}>
                      {app.applicantName}
                    </Text>
                    <Text style={styles.applicantDate}>{app.date}</Text>
                  </View>
                  <Badge status={app.status} />
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      ))}

      {/* Add service CTA */}
      <TouchableOpacity
        style={styles.addCard}
        onPress={() =>
          navigate("RootTabNavigationScreen", {
            screen: "JobsTab",
            params: { screen: "CreateServiceScreen" },
          })
        }
      >
        <Ionicons name="add-circle-outline" size={24} color="#aaa" />
        <Text style={styles.addText}>Add a new service</Text>
      </TouchableOpacity>
    </ScrollView>
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
  sectionMini: { fontSize: 12, color: "#888", marginBottom: 8 },

  applicantRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },
  applicantName: { fontSize: 13, color: "#1a1a1a", fontWeight: "500" },
  applicantDate: { fontSize: 11, color: "#aaa", marginTop: 1 },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 11, fontWeight: "600" },

  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "500" },

  providerName: { flex: 1, fontSize: 13, color: "#555" },
  price: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },

  addCard: {
    borderWidth: 0.5,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  addText: { fontSize: 13, color: "#aaa" },

  emptyText: { fontSize: 12, color: "#aaa" },
});
