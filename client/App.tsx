import {
  getStateFromPath,
  NavigationContainer,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/helpers/contexts/AuthContext";
import { RootStack } from "./src/navigators/RootStackNavigator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {},
  },
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
        <QueryClientProvider client={queryClient}>
          <NavigationContainer linking={linking}>
            <AuthProvider>
              <RootStack></RootStack>
            </AuthProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
