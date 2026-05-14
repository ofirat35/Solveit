import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/DiscoveryTab/DiscoveryScreen";

const Stack = createNativeStackNavigator();

export function DiscoveryTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiscoveryScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
