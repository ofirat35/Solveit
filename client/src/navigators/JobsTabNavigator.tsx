import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateServiceScreen } from "../screens/JobsTab/CreateServiceScreen";
import { JobsScreen } from "../screens/JobsTab/JobsScreen";

const Stack = createNativeStackNavigator();

export function JobsTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobsScreen"
        component={JobsScreen}
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
    </Stack.Navigator>
  );
}
