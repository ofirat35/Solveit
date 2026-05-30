import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { AppUserListModel } from "../models/Users/AppUserListModel";
import { UserService } from "../services/UserService";

export function UserAvatar({
  user,
  containerStyle,
  imageStyle,
}: {
  user: AppUserListModel | null | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}) {
  const { data: userImageData, isLoading } = useQuery({
    queryKey: ["userImage", user?.id],
    queryFn: () => UserService.getUserImage(user!.id),
    enabled: !!user,
  });

  if (isLoading) {
    return <ActivityIndicator size="small" color="#185FA5" />;
  }

  return (
    <View
      style={[styles.avatar, { backgroundColor: "#185FA515" }, containerStyle]}
    >
      {user && userImageData ? (
        <Image
          source={{
            uri: userImageData?.imagePath || "https://via.placeholder.com/150",
          }}
          style={[{ width: 32, height: 32, borderRadius: 16 }, imageStyle]}
          transition={200}
        />
      ) : (
        <Text style={{ color: "#185FA5" }}>
          {user?.firstName.charAt(0).toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
