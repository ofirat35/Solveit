import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenHeader } from "../components/shared/ScreenHeader";
import { HomeScreen } from "../screens/DiscoveryTab/DiscoveryScreen";
import { ServiceDetailScreen } from "../screens/DiscoveryTab/ServiceDetailScreen";
import { ServiceProvidersScreen } from "../screens/DiscoveryTab/ServiceProvidersScreen";

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
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="ServiceProvidersScreen"
        component={ServiceProvidersScreen}
      />
      <Stack.Screen
        name="ServiceDetailScreen"
        component={ServiceDetailScreen}
      />
    </Stack.Navigator>
  );
}
