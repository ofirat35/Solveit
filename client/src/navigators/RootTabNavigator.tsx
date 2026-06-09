import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { Colors } from "../helpers/consts/ColorConts";
import { DiscoveryStackNavigator } from "./DiscoveryStackNavigator";
import { NotificationStackNavigator } from "./NotificationStackNavigator";
import { ServicesStackNavigator } from "./ServicesStackNavigator";
import { SettingsStackNavigator } from "./SettingsStackNavigator";
const Tab = createBottomTabNavigator();

export function RootTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.text.gray_primary,
        tabBarInactiveTintColor: Colors.text.gray_secondary,
        headerStyle: {},
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
          backgroundColor: "#f8f8f8",
        },
      }}
    >
      <Tab.Screen
        name="DiscoveryTab"
        component={DiscoveryStackNavigator}
        options={{
          title: t("DiscoveryTab.TabNavTitle"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={24}
              color={
                focused ? Colors.text.gray_primary : Colors.text.gray_secondary
              }
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          title: t("ServicesTab.TabNavTitle"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="opencart"
              size={24}
              color={
                focused ? Colors.text.gray_primary : Colors.text.gray_secondary
              }
            />
          ),
        }}
        name="ServicesTab"
        component={ServicesStackNavigator}
      />
      <Tab.Screen
        options={{
          title: t("NotificationTab.TabNavTitle"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={
                focused ? Colors.text.gray_primary : Colors.text.gray_secondary
              }
            />
          ),
        }}
        name="NotificationTab"
        component={NotificationStackNavigator}
      />
      <Tab.Screen
        options={{
          title: t("SettingsTab.TabNavTitle"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-sharp"
              size={24}
              color={
                focused ? Colors.text.gray_primary : Colors.text.gray_secondary
              }
            />
          ),
        }}
        name="SettingsTab"
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
}
