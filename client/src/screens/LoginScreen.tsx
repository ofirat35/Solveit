import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../helpers/contexts/AuthContext";
import { useAppNavigation } from "../hooks/useAppNavigation";

export function LoginScreen() {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();
  const { login, isLoading } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginBottom: 36,
            }}
          >
            <Text style={styles.title}>{t("Sign in")}</Text>
            <Text
              style={{
                fontSize: 15,
                color: "#888",
              }}
            >
              {t("Welcome back")}
            </Text>
          </View>

          <View style={styles.form}></View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && {
                opacity: 0.8,
              },
            ]}
            onPress={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {t("Sign in")}
              </Text>
            )}
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 28,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#888",
              }}
            >
              {t("Don't have an account?")}{" "}
            </Text>
            <TouchableOpacity onPress={() => navigate("RegisterScreen")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111",
                  fontWeight: "600",
                }}
              >
                {t("Register")}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
            onPress={() => navigate("PasswordResetScreen")}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#555",
              }}
            >
              {t("Forgot password?")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  form: {
    marginBottom: 8,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111",
    backgroundColor: "#FAFAFA",
  },
  inputError: {
    borderColor: "#E05252",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
  },
  button: {
    backgroundColor: "#111",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
});
