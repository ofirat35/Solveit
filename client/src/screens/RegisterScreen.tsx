import { FontAwesome5 } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountrySelector } from "../components/shared/CountrySelector";
import { CustomTextInput } from "../components/shared/Forms/CustomTextInput";
import { GenderEnum } from "../helpers/enums/GenderEnum";
import { getInitialCountryFromLanguage } from "../helpers/methods/getInitialCountryFromLanguage";
import {
  RegisterFormData,
  registerSchema,
} from "../helpers/schemas/auth/registerSchema";
import { showToast } from "../helpers/Toasts/DefaultToasts";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { RegisterModel } from "../models/Auths/RegisterModel";
import { AuthService } from "../services/AuthService";

export function RegisterScreen() {
  const { navigate } = useAppNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const { t, i18n } = useTranslation();
  const structuralDefaultCountry = getInitialCountryFromLanguage(i18n.language);

  const defaultBirthday = new Date();
  defaultBirthday.setFullYear(defaultBirthday.getFullYear() - 18);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      birthday: defaultBirthday,
      countryCode: structuralDefaultCountry,
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    const { confirmPassword, ...rest } = data;
    const payload: RegisterModel = {
      ...rest,
      countryCode: rest.countryCode.trim().toUpperCase(),
      birthday: rest.birthday.toISOString().split("T")[0],
    };
    AuthService.register({ ...payload }).then((isSuccess) => {
      setLoading(false);
      if (isSuccess) {
        showToast(t("register.registerSuccess"));
        navigate("LoginScreen");
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 40,
            justifyContent: "center",
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 36 }}>
            <Text style={styles.title}>{t("register.title")}</Text>
            <Text style={styles.subtitle}>{t("register.subtitle")}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.field, styles.rowField]}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextInput
                      labelText={`${t("register.firstName")} *`}
                      value={value}
                      onChangeText={onChange}
                      isError={!!errors.firstName}
                    />
                  )}
                />
                {errors.firstName && (
                  <Text style={styles.errorText}>
                    {errors.firstName.message}
                  </Text>
                )}
              </View>

              <View style={[styles.field, styles.rowField]}>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextInput
                      labelText={`${t("register.lastName")} *`}
                      value={value}
                      onChangeText={onChange}
                      isError={!!errors.lastName}
                    />
                  )}
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>
                    {errors.lastName.message}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.form}>
              <View style={styles.row}>
                <View style={[styles.field, styles.rowField]}>
                  <Text
                    style={styles.label}
                  >{`${t("register.birthday")} *`}</Text>
                  <Controller
                    control={control}
                    name="birthday"
                    render={({ field: { onChange, value } }) => {
                      const dateValue = value ? new Date(value) : new Date();
                      return (
                        <>
                          <TouchableOpacity
                            style={[
                              styles.input,
                              { paddingVertical: 0 },
                              errors.birthday && styles.inputError,
                            ]}
                            onPress={() => setShowPicker(true)}
                          >
                            <View
                              pointerEvents="none"
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <View style={{ paddingRight: 5 }}>
                                <FontAwesome5 name="calendar-alt" size={16} />
                              </View>
                              <TextInput
                                value={dateValue.toLocaleDateString()}
                                editable={false}
                              />
                            </View>
                          </TouchableOpacity>

                          {showPicker && (
                            <DateTimePicker
                              value={dateValue}
                              mode="date"
                              display={
                                Platform.OS === "ios" ? "spinner" : "default"
                              }
                              maximumDate={(() => {
                                const maxAge = new Date();
                                maxAge.setFullYear(
                                  new Date().getFullYear() - 18,
                                );
                                return maxAge;
                              })()}
                              onChange={(event, selectedDate) => {
                                setShowPicker(Platform.OS === "ios");
                                if (selectedDate) onChange(selectedDate);
                              }}
                            />
                          )}
                        </>
                      );
                    }}
                  />
                  {errors.birthday && (
                    <Text style={styles.errorText}>
                      {errors.birthday.message}
                    </Text>
                  )}
                </View>

                <View style={[styles.field, styles.rowField]}>
                  <Text
                    style={styles.label}
                  >{`${t("register.gender")} *`}</Text>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange, value } }) => (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton
                          value={GenderEnum.Woman.toString()}
                          status={
                            value === GenderEnum.Woman ? "checked" : "unchecked"
                          }
                          onPress={() => onChange(GenderEnum.Woman)}
                        />
                        <Text>{t("register.woman")}</Text>

                        <RadioButton
                          value={GenderEnum.Man.toString()}
                          status={
                            value === GenderEnum.Man ? "checked" : "unchecked"
                          }
                          onPress={() => onChange(GenderEnum.Man)}
                        />
                        <Text>{t("register.man")}</Text>
                      </View>
                    )}
                  />
                  {errors.gender && (
                    <Text style={styles.errorText}>
                      {errors.gender.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* Country Input Field Setup */}
            <View style={styles.field}>
              <Controller
                control={control}
                name="countryCode"
                render={({ field: { onChange, value } }) => (
                  <CountrySelector
                    labelText={`${t("register.country")} *`}
                    value={value}
                    onChange={onChange}
                    error={errors.countryCode?.message}
                  />
                )}
              />
            </View>

            <View style={[styles.field, styles.rowField]}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    labelText={`${t("register.email")} *`}
                    value={value}
                    onChangeText={onChange}
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    isError={!!errors.email}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={[styles.field, styles.rowField]}>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    labelText={t("register.phone")}
                    value={value ?? ""}
                    onChangeText={onChange}
                    placeholder="(123) 456-7890"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    isError={!!errors.phone}
                  />
                )}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone.message}</Text>
              )}
            </View>

            <View style={[styles.field, styles.rowField]}>
              <Text style={styles.label}>{`${t("register.password")} *`}</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.input,
                      styles.passwordRow,
                      errors.password && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.passwordInput}
                      value={value}
                      onChangeText={onChange}
                      placeholder="••••••••"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholderTextColor="#ABABAB"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((p) => !p)}
                    >
                      <Text style={styles.toggleText}>
                        {showPassword ? t("register.hide") : t("register.show")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            <View style={[styles.field, styles.rowField]}>
              <Text
                style={styles.label}
              >{`${t("register.confirmPassword")} *`}</Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.input,
                      styles.passwordRow,
                      errors.confirmPassword && styles.inputError,
                    ]}
                  >
                    <TextInput
                      style={styles.passwordInput}
                      value={value}
                      onChangeText={onChange}
                      placeholder="••••••••"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholderTextColor="#ABABAB"
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword((p) => !p)}
                    >
                      <Text style={styles.toggleText}>
                        {showConfirmPassword
                          ? t("register.hide")
                          : t("register.show")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleSubmit(handleRegister)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                {t("register.createAccount")}
              </Text>
            )}
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 28,
            }}
          >
            <Text style={{ fontSize: 14, color: "#888" }}>
              {t("register.alreadyHaveAccount")}{" "}
            </Text>
            <TouchableOpacity onPress={() => navigate("LoginScreen")}>
              <Text style={{ fontSize: 14, color: "#111", fontWeight: "600" }}>
                {t("register.signIn")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
  },
  form: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowField: {
    flex: 1,
  },
  field: {
    marginBottom: 20,
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
    color: "#111",
    backgroundColor: "#FAFAFA",
  },
  inputError: {
    borderColor: "#E05252",
  },
  errorText: {
    color: "red",
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
  toggleText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
    paddingRight: 4,
  },
  button: {
    backgroundColor: "#111",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
});
