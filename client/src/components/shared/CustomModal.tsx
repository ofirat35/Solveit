import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

const { width } = Dimensions.get("window");
type ModalVariant = "default" | "danger" | "success";

type CustomModalProps = {
  children?: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  subtitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: ModalVariant;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const variantColors: Record<ModalVariant, string> = {
  default: "#111",
  danger: "#E05252",
  success: "#3aaa6e",
};

export const CustomModal = ({
  children,
  visible,
  onDismiss,
  title,
  subtitle,
  onConfirm,
  onCancel,
  variant = "default",
  loading = false,
  style,
}: CustomModalProps) => {
  const confirmColor = variantColors[variant];
  const { t } = useTranslation();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.container, style]}
      >
        {(title || subtitle) && (
          <View style={styles.header}>
            {title && (
              <Text style={[styles.title, { color: confirmColor }]}>
                {t(title)}
              </Text>
            )}
            {subtitle && <Text style={styles.subtitle}>{t(subtitle)}</Text>}
            <TouchableOpacity style={styles.closeBtn} onPress={onDismiss}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {(title || subtitle) && <View style={styles.divider} />}

        <View style={styles.body}>{children}</View>

        {(onConfirm || onCancel) && (
          <>
            <View style={styles.divider} />
            <View style={styles.footer}>
              {onCancel && (
                <TouchableOpacity
                  style={[styles.btn, styles.cancelBtn]}
                  onPress={onCancel}
                  disabled={loading}
                >
                  <Text style={styles.cancelBtnText}>{t("common.cancel")}</Text>
                </TouchableOpacity>
              )}
              {onConfirm && (
                <TouchableOpacity
                  style={[
                    styles.btn,
                    styles.confirmBtn,
                    { backgroundColor: confirmColor },
                    loading && styles.btnDisabled,
                  ]}
                  onPress={onConfirm}
                  disabled={loading}
                >
                  <Text style={styles.confirmBtnText}>
                    {loading ? `${t("Loading")}...` : t("common.confirm")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: width * 0.1,
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: "column",
    gap: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    paddingRight: 32,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 4,
  },
  closeBtnText: {
    fontSize: 16,
    color: "#aaa",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "transparent",
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  confirmBtn: {
    backgroundColor: "#111",
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  btnDisabled: {
    opacity: 0.5,
  },
});
