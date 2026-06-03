import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TFunction } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DropdownPicker } from "../../components/shared/DropdownPicker";
import { CustomTextInput } from "../../components/shared/Forms/CustomTextInput";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { Colors } from "../../helpers/consts/ColorConts";
import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";
import {
  ServiceUpdateFormData,
  serviceUpdateSchema,
} from "../../helpers/schemas/services/serviceUpdateSchema";
import { ServicesStackParamList } from "../../helpers/types/RootStackParamList";
import { useEditService } from "../../hooks/Services/useEditService";
import { useAppNavigation } from "../../hooks/useAppNavigation";

const getPricingUnits = (t: TFunction) => [
  { label: t("common.perSession"), value: PricingUnitsEnum.Session },
  { label: t("common.perHour"), value: PricingUnitsEnum.Hour },
  { label: t("common.perDay"), value: PricingUnitsEnum.Day },
  { label: t("common.fixed"), value: PricingUnitsEnum.Fixed },
];
type ServiceProvidersRouteProp = RouteProp<
  ServicesStackParamList,
  "EditServiceScreen"
>;

export function EditServiceScreen() {
  const route = useRoute<ServiceProvidersRouteProp>();
  const { serviceId } = route.params;
  const userId = useMemo(() => keycloakService.getCurrentUserId()!, []);
  const { goBack, setOptions } = useAppNavigation();
  const { t } = useTranslation();
  const PRICING_UNITS = getPricingUnits(t);

  const [hasMaxPrice, setHasMaxPrice] = useState(false);
  const [pricingUnit, setPricingUnit] = useState<PricingUnitsEnum>(
    PricingUnitsEnum.Session,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ServiceUpdateFormData>({
    resolver: yupResolver(serviceUpdateSchema),
    defaultValues: {
      id: serviceId,
      title: "",
      description: "",
      categoryId: 0,
      subcategoryId: 0,
      pricing: PricingUnitsEnum.Session,
      minPrice: 0,
      maxPrice: null,
      status: ServiceStatusEnum.Active,
      providerId: userId,
    },
  });

  const {
    service,
    isLoadingDetails,
    categories,
    subcategories,
    updateService,
    isUpdating,
  } = useEditService({ serviceId, selectedCategoryId });

  useEffect(() => {
    setOptions({
      title: t("editService.title"),
    });
  }, []);

  useEffect(() => {
    if (service) {
      reset({
        id: service.id,
        title: service.title,
        description: service.description,
        categoryId: service.categoryId,
        subcategoryId: service.subcategoryId,
        pricing: service.pricing,
        minPrice: service.minPrice,
        maxPrice: service.maxPrice,
        status: service.status,
        providerId: service.providerId || userId,
      });
      console.log(service);

      setPricingUnit(service.pricing);
      if (service.categoryId) setSelectedCategoryId(service.categoryId);
      if (service.maxPrice !== null && service.maxPrice !== undefined)
        setHasMaxPrice(true);
    }
  }, [service, reset, userId]);

  if (isLoadingDetails) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#185FA5" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background.base }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {t("createService.serviceDetails")}
          </Text>
          <View style={styles.card}>
            <View>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    placeholder={t("createService.titlePlaceholder")}
                    placeholderTextColor="#bbb"
                    labelText={t("createService.titleLabel")}
                    value={value}
                    onChangeText={onChange}
                    isError={!!errors.title}
                  />
                )}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title.message}</Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    placeholder={t("createService.descriptionPlaceholder")}
                    placeholderTextColor="#bbb"
                    labelText={t("createService.descriptionLabel")}
                    value={value}
                    onChangeText={onChange}
                    isError={!!errors.description}
                  />
                )}
              />
              {errors.description && (
                <Text style={styles.errorText}>
                  {errors.description.message}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Category + Subcategory */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("createService.category")}</Text>
          <View style={styles.card}>
            <Controller
              control={control}
              name="categoryId"
              render={({ field: { onChange, value } }) => (
                <DropdownPicker
                  label={t("createService.categoryLabel")}
                  placeholder={t("createService.categoryPlaceholder")}
                  selectedOption={
                    value
                      ? {
                          label:
                            categories?.find((c) => c.id === value)?.name || "",
                          value: value.toString(),
                        }
                      : null
                  }
                  options={
                    categories?.map((c) => ({
                      label: c.name,
                      value: c.id.toString(),
                    })) || []
                  }
                  onSelect={(id) => {
                    if (!id) return;
                    setSelectedCategoryId(parseInt(id));
                    setValue("subcategoryId", 0);
                    onChange(id);
                  }}
                />
              )}
            />
            {errors.categoryId && (
              <Text style={styles.errorText}>{errors.categoryId.message}</Text>
            )}

            <Controller
              control={control}
              name="subcategoryId"
              render={({ field: { onChange, value } }) => (
                <DropdownPicker
                  label={t("createService.subcategoryLabel")}
                  placeholder={
                    selectedCategoryId
                      ? t("createService.subcategoryPlaceholder")
                      : t("createService.subcategoryPlaceholderFirst")
                  }
                  selectedOption={
                    value
                      ? {
                          label: subcategories?.find((s) => s.id === value)
                            ?.name,
                          value: value.toString(),
                        }
                      : null
                  }
                  options={
                    subcategories?.map((s) => ({
                      label: s.name,
                      value: s.id.toString(),
                    })) || []
                  }
                  onSelect={onChange}
                  disabled={!selectedCategoryId}
                />
              )}
            />
            {errors.subcategoryId && (
              <Text style={styles.errorText}>
                {errors.subcategoryId.message}
              </Text>
            )}
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("createService.pricing")}</Text>
          <View style={styles.card}>
            <View>
              <Text style={styles.fieldLabel}>
                {hasMaxPrice
                  ? t("createService.minPrice")
                  : t("createService.price")}
              </Text>
              <Controller
                control={control}
                name="minPrice"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.priceInputWrap}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                      style={[
                        styles.priceInput,
                        errors.minPrice && styles.inputError,
                      ]}
                      placeholder="0"
                      placeholderTextColor="#bbb"
                      keyboardType="decimal-pad"
                      value={value?.toString() || ""}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
              {errors.minPrice && (
                <Text style={styles.errorText}>{errors.minPrice.message}</Text>
              )}
            </View>

            <View style={styles.maxPriceToggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.toggleTitle}>
                  {t("createService.priceRange")}
                </Text>
                <Text style={styles.toggleSub}>
                  {t("createService.setMaxPrice")}
                </Text>
              </View>
              <Switch
                value={hasMaxPrice}
                onValueChange={(val) => {
                  setHasMaxPrice(val);
                  if (!val) setValue("maxPrice", null);
                }}
                trackColor={{ false: "#e0e0e0", true: "#cce3f8" }}
                thumbColor={hasMaxPrice ? "#185FA5" : "#aaa"}
              />
            </View>

            {hasMaxPrice && (
              <View>
                <Text style={styles.fieldLabel}>
                  {t("createService.maxPrice")}
                </Text>
                <Controller
                  control={control}
                  name="maxPrice"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.priceInputWrap}>
                      <Text style={styles.currencySymbol}>$</Text>
                      <TextInput
                        style={[
                          styles.priceInput,
                          errors.maxPrice && styles.inputError,
                        ]}
                        placeholder="0"
                        placeholderTextColor="#bbb"
                        keyboardType="decimal-pad"
                        value={value?.toString() || ""}
                        onChangeText={(text) =>
                          onChange(text === "" ? undefined : Number(text))
                        }
                      />
                    </View>
                  )}
                />
                {errors.maxPrice && (
                  <Text style={styles.errorText}>
                    {errors.maxPrice.message}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.unitRow}>
              {PRICING_UNITS.map((u) => (
                <TouchableOpacity
                  key={u.value}
                  style={[
                    styles.unitChip,
                    pricingUnit === u.value && styles.unitChipActive,
                  ]}
                  onPress={() => {
                    setPricingUnit(u.value);
                    setValue("pricing", u.value);
                  }}
                >
                  <Text
                    style={[
                      styles.unitLabel,
                      pricingUnit === u.value && styles.unitLabelActive,
                    ]}
                  >
                    {u.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Availability Switch */}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {t("createService.availability")}
          </Text>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <View style={[styles.card, styles.toggleRow]}>
                <View style={{ flex: 1 }}>
                  {service?.status == ServiceStatusEnum.Active ||
                  service?.status == ServiceStatusEnum.Paused ? (
                    <>
                      <Text style={styles.toggleTitle}>
                        {value === ServiceStatusEnum.Active
                          ? t("createService.active")
                          : t("createService.paused")}
                      </Text>
                      <Text style={styles.toggleSub}>
                        {value === ServiceStatusEnum.Active
                          ? t("createService.activeDescription")
                          : t("createService.pausedDescription")}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.toggleTitle}>
                      {t(
                        `status.${ServiceStatusEnum[service?.status!].toLowerCase()}`,
                      )}
                    </Text>
                  )}
                </View>
                {(service?.status == ServiceStatusEnum.Active ||
                  service?.status == ServiceStatusEnum.Paused) && (
                  <Switch
                    value={value === ServiceStatusEnum.Active}
                    onValueChange={(boolValue) => {
                      const updatedStatus = boolValue
                        ? ServiceStatusEnum.Active
                        : ServiceStatusEnum.Paused;
                      onChange(updatedStatus);
                    }}
                    trackColor={{ false: "#e0e0e0", true: "#cce3f8" }}
                    thumbColor={
                      value === ServiceStatusEnum.Active ? "#185FA5" : "#aaa"
                    }
                  />
                )}
              </View>
            )}
          />
        </View>

        {/* Actions Button Footers */}
        <TouchableOpacity
          style={[styles.submitBtn, isUpdating && { opacity: 0.7 }]}
          onPress={handleSubmit((data) => updateService(data))}
          disabled={isUpdating}
          activeOpacity={0.85}
        >
          {isUpdating ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="save-outline" size={18} color="#fff" />
              <Text style={styles.submitText}>
                {t("editService.saveChanges")}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={goBack}
          disabled={isUpdating}
        >
          <Text style={styles.cancelText}>{t("createService.cancel")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background.base,
  },
  content: {
    padding: 16,
    paddingBottom: 48,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#aaa",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 2,
  },
  maxPriceToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    padding: 14,
    gap: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888",
    marginBottom: 3,
  },
  inputError: {
    borderBottomColor: "#ff4d4f",
  },
  errorText: {
    fontSize: 11,
    color: "#ff4d4f",
    marginTop: 2,
  },
  priceInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 6,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  priceInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: "600",
    color: "#1a1a1a",
    paddingVertical: 4,
  },
  unitRow: {
    flexDirection: "row",
    gap: 6,
  },
  unitChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  unitChipActive: {
    borderColor: "#185FA5",
    backgroundColor: "#e7f5ff",
  },
  unitLabel: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
  unitLabelActive: {
    color: "#185FA5",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  toggleSub: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
    lineHeight: 16,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#185FA5",
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 4,
  },
  submitText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  cancelBtn: {
    alignItems: "center",
    paddingVertical: 14,
  },
  cancelText: {
    fontSize: 14,
    color: "#aaa",
  },
});
