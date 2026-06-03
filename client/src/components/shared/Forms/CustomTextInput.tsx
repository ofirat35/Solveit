import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type CustomTextInputProps = {
  labelText: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  isError?: boolean;
  autoCapitalize?: "none" | "words" | "sentences" | "characters" | undefined;
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholderTextColor?: string;
};
export const CustomTextInput = ({
  labelText,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  isError = false,
  autoCapitalize = "none",
  autoCorrect = false,
  keyboardType = "default",
  placeholderTextColor = "#ABABAB",
}: CustomTextInputProps) => {
  return (
    <View>
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        style={[styles.input, isError && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#414141",
    fontWeight: "500",
    backgroundColor: "#fbfcfc",
  },
  inputError: {
    borderColor: "#E05252",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#111",
    paddingVertical: 12,
  },
});
