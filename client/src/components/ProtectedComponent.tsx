import { Text, View } from "react-native";
import { useAuth } from "../helpers/contexts/AuthContext";
import { CustomActivityIndicator } from "./shared/CustomActivityIndicator";

export function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <CustomActivityIndicator></CustomActivityIndicator>;

  if (!isAuthenticated)
    return (
      <View>
        <Text>You are not authenticated</Text>
      </View>
    );

  return <>{children}</>;
}
