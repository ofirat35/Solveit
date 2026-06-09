import { t } from "i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export const LoginRedirect = ({ text }: { text?: string }) => {
  const { navigate } = useAppNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.applyButton]}
        activeOpacity={0.8}
        onPress={() => navigate("LoginScreen")}
      >
        <Text style={styles.applyButtonText}>
          {text ?? t("common.loginToContinue")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bottomActionContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  applyButton: {
    backgroundColor: "#185FA5",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#185FA5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledButton: { backgroundColor: "#a5c2df" },
  applyButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
});
