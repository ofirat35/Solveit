import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PasswordResetFormData,
  passwordResetSchema,
} from "../helpers/schemas/auth/passwordResetSchema";
import { useAppNavigation } from "../hooks/useAppNavigation";

export function PasswordResetScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: yupResolver(passwordResetSchema),
  });

  const [loading, setLoading] = useState(false);
  const { navigate } = useAppNavigation();

  const handleLogin = async (data: PasswordResetFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
          <View style={{ marginBottom: 36 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#111",
                marginBottom: 4,
              }}
            >
              {t("Reset Password")}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: 8,
                }}
              >
                {t("Email")}
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.email && {
                        borderColor: "#E05252",
                      },
                    ]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="you@example.com"
                    secureTextEntry
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#ABABAB"
                  />
                )}
              />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email.message}</Text>
              )}
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && {
                opacity: 0.8,
              },
            ]}
            onPress={handleSubmit(handleLogin)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {t("Reset")}
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
              {t("Already have an account?")}{" "}
            </Text>
            <TouchableOpacity onPress={() => navigate("LoginScreen")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111",
                  fontWeight: "600",
                }}
              >
                {t("Sign in")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 8,
  },
  field: {
    marginBottom: 20,
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
  button: {
    backgroundColor: "#111",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
});
