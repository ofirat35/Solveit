import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useAuth } from "../../helpers/contexts/AuthContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export function NotificationScreen() {
  const { t } = useTranslation();
  const { navigate } = useAppNavigation();
  const { login, isLoading } = useAuth();

  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  );
}
