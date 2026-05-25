import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export function CreateService() {
  const { t } = useTranslation();

  return (
    <View>
      <Text>CreateService</Text>
    </View>
  );
}
