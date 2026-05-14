import { StyleSheet, Text, View } from "react-native";
export const STATUS_BADGE: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  active: { bg: "#ebfbee", color: "#27500A", label: "Active" },
  paused: { bg: "#F1EFE8", color: "#444441", label: "Paused" },
  pending: { bg: "#FAEEDA", color: "#633806", label: "Pending" },
  accepted: { bg: "#ebfbee", color: "#27500A", label: "Accepted" },
  rejected: { bg: "#FCEBEB", color: "#791F1F", label: "Rejected" },
  upcoming: { bg: "#E6F1FB", color: "#0C447C", label: "Upcoming" },
  completed: { bg: "#ebfbee", color: "#27500A", label: "Completed" },
  cancelled: { bg: "#FCEBEB", color: "#791F1F", label: "Cancelled" },
};
export function Badge({ status }: { status: string }) {
  const s = STATUS_BADGE[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "500" },
});
