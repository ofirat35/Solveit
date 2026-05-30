import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/DiscoveryTab/DiscoveryScreen";
import { ServiceDetailScreen } from "../screens/DiscoveryTab/ServiceDetailScreen";
import { ServiceProvidersScreen } from "../screens/DiscoveryTab/ServiceProvidersScreen";

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
      <Stack.Screen
        name="ServiceProvidersScreen"
        component={ServiceProvidersScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceDetailScreen"
        component={ServiceDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
