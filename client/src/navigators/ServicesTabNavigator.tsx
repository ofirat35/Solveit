import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateServiceScreen } from "../screens/ServicesTab/CreateServiceScreen";
import { OrderDetailScreen } from "../screens/ServicesTab/OrderDetailScreen";
import { ServicesScreen } from "../screens/ServicesTab/ServicesScreen";

const Stack = createNativeStackNavigator();

export function ServicesTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServicesScreen"
        component={ServicesScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CreateServiceScreen"
        component={CreateServiceScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
