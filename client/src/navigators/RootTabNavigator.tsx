import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { Colors } from "../helpers/consts/ColorConts";
import { DiscoveryTabNavigator } from "./DiscoveryTabNavigator";
import { NotificationTabNavigator } from "./NotificationTabNavigator";
import { ServicesTabNavigator } from "./ServicesTabNavigator";
import { SettingsTabNavigator } from "./SettingsTabNavigator";

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
        component={DiscoveryTabNavigator}
        options={{
          title: t("DiscoveryTab.TabNavTitle"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="users"
              size={22}
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
            <FontAwesome5
              name="users"
              size={22}
              color={
                focused ? Colors.text.gray_primary : Colors.text.gray_secondary
              }
            />
          ),
        }}
        name="ServicesTab"
        component={ServicesTabNavigator}
      />
      <Tab.Screen
        options={{
          title: t("NotificationTab.TabNavTitle"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="users"
              size={22}
              color={
                focused ? Colors.text.gray_primary : Colors.text.gray_secondary
              }
            />
          ),
        }}
        name="NotificationTab"
        component={NotificationTabNavigator}
      />
      <Tab.Screen
        options={{
          title: t("SettingsTab.TabNavTitle"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="users"
              size={22}
              color={
                focused ? Colors.text.gray_primary : Colors.text.gray_secondary
              }
            />
          ),
        }}
        name="SettingsTab"
        component={SettingsTabNavigator}
      />
    </Tab.Navigator>
  );
}
