import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EditProfileScreen } from "../screens/SettingsTab/EditProfileScreen";
import { SettingsScreen } from "../screens/SettingsTab/SettingsScreen";

const Stack = createNativeStackNavigator();

export function SettingsTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
