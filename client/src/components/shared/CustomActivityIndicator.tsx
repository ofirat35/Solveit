import * as React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Portal } from "react-native-paper";

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
  color = "rgba(0, 0, 0, 0.58)",
  size = 40,
  text = "Loading ...",
  hidesWhenStopped = true,
  style,
}: CustomActivityIndicatorProps) {
  const isVisible = animating || !hidesWhenStopped;

  if (!isVisible) return null;

  return (
    <Portal>
      <TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.32)",
          }}
        >
          <View
            style={{
              borderRadius: 12,
              padding: 24,
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              style={style}
              animating={animating}
              color={color}
              size={size}
              hidesWhenStopped={hidesWhenStopped}
            />
            {text ? (
              <Text style={{ marginTop: 10, fontWeight: "400", color: color }}>
                {text}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  );
}
