import { FontAwesome5 } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker"; // 1. Import Image Picker
import React, { useEffect, useMemo, useState } from "react";
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
import { CustomTextInput } from "../../components/shared/Forms/CustomTextInput";
import { ScreenHeader } from "../../components/shared/ScreenHeader";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { GenderEnum } from "../../helpers/enums/GenderEnum";
import {
  UserUpdateFormData,
  userUpdateSchema,
} from "../../helpers/schemas/users/userUpdateSchema";
import { showToast } from "../../helpers/Toasts/DefaultToasts";
import { useSettings } from "../../hooks/Settings/useSettings";
import { AppUserUpdateModel } from "../../models/Users/AppUserUpdateModel";

export function EditProfileScreen() {
  const { user, updateUser, uploadUserImage } = useSettings();
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const { t } = useTranslation();

  const birthday = useMemo(() => {
    return user?.birthday ? new Date(user.birthday) : new Date();
  }, [user]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateFormData>({
    resolver: yupResolver(userUpdateSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? null,
      gender: user?.gender,
      birthday: birthday,
    },
  });

  useEffect(() => {
    user &&
      reset({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? null,
        gender: user?.gender,
        birthday: birthday,
      });
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast(
        t("editProfile.permissionDenied") ||
          "Permission to access gallery was denied",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      await uploadUserImage(result.assets[0]);
    }
  };

  const handleRegister = async (data: UserUpdateFormData) => {
    setLoading(true);

    const payload: AppUserUpdateModel = {
      id: user!.id,
      ...data,
      birthday: data.birthday.toISOString().split("T")[0],
    };

    updateUser(payload)
      .then(
        () => showToast(t("editProfile.updateSuccess")),
        () => showToast(t("editProfile.updateFailed")),
      )
      .finally(() => {
        setLoading(false);
        keycloakService.refreshAccessToken();
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScreenHeader headerTitle={t("editProfile.title")} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 40,
            justifyContent: "space-between",
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* 6. Profile Image Selector UI */}
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={() => pickImage()}
              >
                {user?.profileImage ? (
                  <Image
                    source={{ uri: user?.profileImage }}
                    style={styles.avatarImage}
                    transition={200}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <FontAwesome5 name="camera" size={24} color="#888" />
                    <Text style={styles.avatarText}>
                      {t("editProfile.addPhoto") || "Add Photo"}
                    </Text>
                  </View>
                )}
                <View style={styles.editBadge}>
                  <FontAwesome5 name="pen" size={10} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <View style={[styles.field, styles.rowField]}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, value } }) => (
                    <CustomTextInput
                      labelText={t("editProfile.firstName")}
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
                      labelText={t("editProfile.lastName")}
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

            <View style={styles.row}>
              <View style={[styles.field, styles.rowField]}>
                <Text style={styles.label}>{t("editProfile.birthday")}</Text>
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
                              maxAge.setFullYear(new Date().getFullYear() - 18);
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
                <Text style={styles.label}>{t("editProfile.gender")}</Text>
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
                      <Text>{t("editProfile.woman")}</Text>

                      <RadioButton
                        value={GenderEnum.Man.toString()}
                        status={
                          value === GenderEnum.Man ? "checked" : "unchecked"
                        }
                        onPress={() => onChange(GenderEnum.Man)}
                      />
                      <Text>{t("editProfile.man")}</Text>
                    </View>
                  )}
                />
                {errors.gender && (
                  <Text style={styles.errorText}>{errors.gender.message}</Text>
                )}
              </View>
            </View>

            <View style={[styles.field, styles.rowField]}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    labelText={t("editProfile.email")}
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
                    labelText={t("editProfile.phone")}
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
                {t("editProfile.update")}
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 7. Added styles for image container and picker
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    fontWeight: "500",
  },
  editBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#111",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
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
