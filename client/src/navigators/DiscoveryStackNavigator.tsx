import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenHeader } from "../components/shared/ScreenHeader";
import { HomeScreen } from "../screens/DiscoveryTab/DiscoveryScreen";
import { ServiceDetailScreen } from "../screens/DiscoveryTab/ServiceDetailScreen";
import { ServiceProviderListScreen } from "../screens/DiscoveryTab/ServiceProviderListScreen";

const Stack = createNativeStackNavigator();

export function DiscoveryStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <ScreenHeader props={props} />,
      }}
    >
      <Stack.Screen
        name="DiscoveryScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceProviderListScreen"
        component={ServiceProviderListScreen}
      />
      <Stack.Screen
        name="ServiceDetailScreen"
        component={ServiceDetailScreen}
      />
    </Stack.Navigator>
  );
}
