import * as React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

type CustomActivityIndicatorProps = {
  animating?: boolean;
  color?: string;
  size?: "small" | "large" | number;
  hidesWhenStopped?: boolean;
  text?: string;
  style?: StyleProp<ViewStyle>;
};

export function CustomActivityIndicator({
  animating = true,
  color = "gray",
  size = 60,
  text = "Loading ...",
  hidesWhenStopped = true,
  style,
}: CustomActivityIndicatorProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        style={style}
        animating={animating}
        color={color}
        size={size}
        hidesWhenStopped={hidesWhenStopped}
      ></ActivityIndicator>
      <Text style={{ marginTop: 10, fontWeight: 400 }}>{text}</Text>
    </View>
  );
}
