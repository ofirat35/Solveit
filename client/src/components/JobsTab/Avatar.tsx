import { StyleSheet, Text, View } from "react-native";

export function Avatar({
  initials,
  bg,
  color,
}: {
  initials: string;
  bg: string;
  color: string;
}) {
  return (
    <View style={[styles.avatar, { backgroundColor: bg }]}>
      <Text style={[styles.avatarText, { color }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 11, fontWeight: "600" },
});
