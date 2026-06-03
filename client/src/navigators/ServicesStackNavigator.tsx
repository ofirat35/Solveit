import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenHeader } from "../components/shared/ScreenHeader";
import { CreateServiceScreen } from "../screens/ServicesTab/CreateServiceScreen";
import { EditServiceScreen } from "../screens/ServicesTab/EditServiceScreen";
import { OrderDetailScreen } from "../screens/ServicesTab/OrderDetailScreen";
import { ServiceApplicantsScreen } from "../screens/ServicesTab/ServiceApplicantsScreen";
import { ServicesScreen } from "../screens/ServicesTab/ServicesScreen";

const Stack = createNativeStackNavigator();

export function ServicesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <ScreenHeader props={props} />,
      }}
    >
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
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditServiceScreen"
        component={EditServiceScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ServiceApplicantsScreen"
        component={ServiceApplicantsScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
