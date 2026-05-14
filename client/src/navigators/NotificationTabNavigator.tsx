import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationScreen } from "../screens/NotificationTab/NotificationScreen";

const Stack = createNativeStackNavigator();

export function NotificationTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
