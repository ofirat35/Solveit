import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationScreen } from "../screens/NotificationTab/NotificationScreen";

const Stack = createNativeStackNavigator();

export function NotificationStackNavigator() {
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
