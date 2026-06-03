import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenHeader } from "../components/shared/ScreenHeader";
import { EditProfileScreen } from "../screens/SettingsTab/EditProfileScreen";
import { SettingsScreen } from "../screens/SettingsTab/SettingsScreen";

const Stack = createNativeStackNavigator();

export function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <ScreenHeader props={props} />,
      }}
    >
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
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
