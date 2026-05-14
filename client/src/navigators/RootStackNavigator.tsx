import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomActivityIndicator } from "../components/shared/CustomActivityIndicator";
import { useAuth } from "../helpers/contexts/AuthContext";
import { LoginScreen } from "../screens/LoginScreen";
import { PasswordResetScreen } from "../screens/PasswordResetScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RootTabNavigator } from "./RootTabNavigator";
const Stack = createNativeStackNavigator();

const AUTH_SCREENS = [
  { name: "LoginScreen", component: LoginScreen },
  { name: "RegisterScreen", component: RegisterScreen },
  { name: "PasswordResetScreen", component: PasswordResetScreen },
] as const;
const transparentHeaderOptions = {
  headerTransparent: true,
  header: (params: any) => <TransparentBackHeader {...params} />,
};

export function RootStack() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <CustomActivityIndicator></CustomActivityIndicator>;

  return (
    <Stack.Navigator>
      {!isAuthenticated && (
        <>
          {AUTH_SCREENS.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              options={transparentHeaderOptions}
              component={screen.component}
            />
          ))}
        </>
      )}

      {isAuthenticated && (
        <>
          <Stack.Screen
            name="RootTabNavigationScreen"
            component={RootTabNavigator}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const TransparentBackHeader = ({ navigation }: any) => {
  const canGoBack = navigation.canGoBack();
  if (!canGoBack) return null;
  return (
    <SafeAreaView style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 15 }}
      >
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
