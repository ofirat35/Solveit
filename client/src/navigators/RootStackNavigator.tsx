import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomActivityIndicator } from "../components/shared/CustomActivityIndicator";
import { useAuth } from "../helpers/contexts/AuthContext";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { PasswordResetScreen } from "../screens/PasswordResetScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
const Stack = createNativeStackNavigator();

export function RootStack() {
  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated + "  isAuthenticated");
  if (isLoading) return <CustomActivityIndicator></CustomActivityIndicator>;

  return (
    <Stack.Navigator>
      {!isAuthenticated && (
        <>
          <Stack.Screen
            name="LoginScreen"
            options={{
              headerTransparent: true,
              header: (params) => (
                <TransparentBackHeader {...params}></TransparentBackHeader>
              ),
            }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="RegisterScreen"
            options={{
              headerTransparent: true,
              header: (params) => (
                <TransparentBackHeader {...params}></TransparentBackHeader>
              ),
            }}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="PasswordResetScreen"
            options={{
              headerTransparent: true,
              header: (params) => (
                <TransparentBackHeader {...params}></TransparentBackHeader>
              ),
            }}
            component={PasswordResetScreen}
          />
        </>
      )}

      {isAuthenticated && (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const TransparentBackHeader = ({ navigation }: any) => (
  <SafeAreaView style={{ flexDirection: "row" }}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="chevron-back-outline" size={24} color="black" />
    </TouchableOpacity>
  </SafeAreaView>
);
