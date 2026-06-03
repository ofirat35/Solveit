import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export const STATUS_BADGE: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  active: { bg: "#E6F4EA", color: "#137333", label: "status.active" },
  accepted: { bg: "#E6F4EA", color: "#137333", label: "status.accepted" },
  completed: { bg: "#E6F4EA", color: "#137333", label: "status.completed" },
  rejected: { bg: "#FCE8E6", color: "#C5221F", label: "status.rejected" },
  canceled: { bg: "#FCE8E6", color: "#C5221F", label: "status.canceled" },
  pending: { bg: "#FEF7E0", color: "#B06000", label: "status.pending" },
  upcoming: { bg: "#E8F0FE", color: "#1A73E8", label: "status.upcoming" },
  paused: { bg: "#F1F3F4", color: "#5F6368", label: "status.paused" },
};
export function Badge({ status }: { status: string }) {
  const { t } = useTranslation();
  const s = STATUS_BADGE[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.badgeText, { color: s.color }]}>{t(s.label)}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "500" },
});
