import {
  getStateFromPath,
  NavigationContainer,
} from "@react-navigation/native";
import * as Linking from "expo-linking";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/helpers/contexts/AuthContext";
import { RootStack } from "./src/navigators/RootStackNavigator";

const linking = {
  prefixes: [Linking.createURL("/")],
  config: {},
  getStateFromPath(path: any, options: any) {
    if (path.startsWith("redirect")) {
      return undefined;
    }
    return getStateFromPath(path, options);
  },
};

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <AuthProvider>
            <RootStack></RootStack>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
