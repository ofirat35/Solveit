import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
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
import { ScreenHeader } from "../../components/shared/ScreenHeader";
import { useAppNavigation } from "../../hooks/useAppNavigation";

const CATEGORIES = [
  { label: "Cleaning", icon: "sparkles-outline" },
  { label: "Tutoring", icon: "school-outline" },
  { label: "Repair", icon: "build-outline" },
  { label: "Delivery", icon: "bicycle-outline" },
  { label: "Gardening", icon: "leaf-outline" },
  { label: "Other", icon: "ellipsis-horizontal-outline" },
] as const;

type Category = (typeof CATEGORIES)[number]["label"];

type PricingUnit = "session" | "hour" | "day" | "fixed";

const PRICING_UNITS: { label: string; value: PricingUnit }[] = [
  { label: "/ session", value: "session" },
  { label: "/ hour", value: "hour" },
  { label: "/ day", value: "day" },
  { label: "fixed", value: "fixed" },
];

export function CreateServiceScreen() {
  const { goBack } = useAppNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pricingUnit, setPricingUnit] = useState<PricingUnit>("session");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isActive, setIsActive] = useState(true);
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleSubmit = () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError(true);
      valid = false;
    }
    if (!price.trim()) {
      setPriceError(true);
      valid = false;
    }
    if (!valid) return;

    // Build the new service object
    const newService = {
      id: Date.now().toString(),
      title: title.trim(),
      price:
        pricingUnit === "fixed"
          ? `$${price}`
          : `$${price} ${PRICING_UNITS.find((u) => u.value === pricingUnit)?.label}`,
      status: isActive ? "active" : "paused",
      category: selectedCategory,
      description: description.trim(),
      applications: [],
    };

    console.log("New service:", newService);
    goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenHeader headerTitle="New Service" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SERVICE DETAILS</Text>

          <View style={styles.card}>
            {/* Title */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Title</Text>
              <TextInput
                style={[styles.input, titleError && styles.inputError]}
                placeholder="e.g. House cleaning"
                placeholderTextColor="#bbb"
                value={title}
                onChangeText={(t) => {
                  setTitle(t);
                  if (t.trim()) setTitleError(false);
                }}
                returnKeyType="next"
              />
              {titleError && (
                <Text style={styles.errorText}>Please enter a title</Text>
              )}
            </View>

            <View style={styles.fieldDivider} />

            {/* Description */}
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="What does this service include?"
                placeholderTextColor="#bbb"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CATEGORY</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.label;
              return (
                <TouchableOpacity
                  key={cat.label}
                  style={[styles.categoryChip, active && styles.categoryActive]}
                  onPress={() => setSelectedCategory(active ? null : cat.label)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={16}
                    color={active ? "#185FA5" : "#888"}
                  />
                  <Text
                    style={[
                      styles.categoryLabel,
                      active && styles.categoryLabelActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PRICING</Text>
          <View style={styles.card}>
            <View style={styles.priceRow}>
              <View style={styles.priceInputWrap}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={[styles.priceInput, priceError && styles.inputError]}
                  placeholder="0"
                  placeholderTextColor="#bbb"
                  keyboardType="decimal-pad"
                  value={price}
                  onChangeText={(t) => {
                    setPrice(t);
                    if (t.trim()) setPriceError(false);
                  }}
                />
              </View>
              <View style={styles.unitRow}>
                {PRICING_UNITS.map((u) => (
                  <TouchableOpacity
                    key={u.value}
                    style={[
                      styles.unitChip,
                      pricingUnit === u.value && styles.unitChipActive,
                    ]}
                    onPress={() => setPricingUnit(u.value)}
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
            {priceError && (
              <Text style={[styles.errorText, { marginTop: 4 }]}>
                Please enter a price
              </Text>
            )}
          </View>
        </View>

        {/* Status toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AVAILABILITY</Text>
          <View style={[styles.card, styles.toggleRow]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleTitle}>
                {isActive ? "Active" : "Paused"}
              </Text>
              <Text style={styles.toggleSub}>
                {isActive
                  ? "Visible to others and accepting applications"
                  : "Hidden from listings, no new applications"}
              </Text>
            </View>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: "#e0e0e0", true: "#cce3f8" }}
              thumbColor={isActive ? "#185FA5" : "#aaa"}
            />
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
          <Text style={styles.submitText}>Create Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={goBack}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    padding: 14,
  },

  fieldWrap: {
    gap: 6,
  },
  fieldDivider: {
    height: 0.5,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#888",
  },
  input: {
    fontSize: 14,
    color: "#1a1a1a",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  inputError: {
    borderBottomColor: "#ff4d4f",
  },
  textArea: {
    minHeight: 64,
    borderBottomWidth: 0,
  },
  errorText: {
    fontSize: 11,
    color: "#ff4d4f",
    marginTop: 2,
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  categoryActive: {
    borderColor: "#185FA5",
    backgroundColor: "#e7f5ff",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  categoryLabelActive: {
    color: "#185FA5",
  },

  priceRow: {
    gap: 12,
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
