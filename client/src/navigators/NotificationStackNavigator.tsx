import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenHeader } from "../components/shared/ScreenHeader";
import { NotificationScreen } from "../screens/NotificationTab/NotificationScreen";

const Stack = createNativeStackNavigator();

export function NotificationStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <ScreenHeader props={props} />,
      }}
    >
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
          statusBarHidden: true,
        }}
      />
    </Stack.Navigator>
  );
}
