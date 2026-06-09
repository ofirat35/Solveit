import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LanguageModal } from "../components/shared/LanguageModal";
import { useAuth } from "../helpers/contexts/AuthContext";
import { useAppNavigation } from "../hooks/useAppNavigation";
import i18n from "../localization";

export function LoginScreen() {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();
  const { login, isLoading } = useAuth();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [changeLanguageVisible, setChangeLanguageVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 24,
        }}
      >
        <TouchableOpacity onPress={() => setChangeLanguageVisible(true)}>
          <FontAwesome name="language" size={30} color="black" />
        </TouchableOpacity>
      </View>
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
            <Text style={styles.title}>{t("login.title")}</Text>
            <Text
              style={{
                fontSize: 15,
                color: "#888",
              }}
            >
              {t("login.subtitle")}
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
              {t("login.dontHaveAccount")}{" "}
            </Text>
            <TouchableOpacity onPress={() => navigate("RegisterScreen")}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#111",
                  fontWeight: "600",
                }}
              >
                {t("login.register")}
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
              {t("login.forgotPassword")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
            onPress={() =>
              navigate("RootTabNavigationScreen", {
                screen: "DiscoveryTab",
                params: {
                  screen: "DiscoveryScreen",
                },
              })
            }
          >
            <Text
              style={{
                fontSize: 16,
                color: "#111",
                fontWeight: "600",
              }}
            >
              {t("login.continueWithoutLogging")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <LanguageModal
        visible={changeLanguageVisible}
        onDismiss={() => setChangeLanguageVisible(false)}
        onConfirm={() => setChangeLanguageVisible(false)}
        selectedLang={selectedLang}
        setSelectedLang={(lang) => setSelectedLang(lang)}
      ></LanguageModal>
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
