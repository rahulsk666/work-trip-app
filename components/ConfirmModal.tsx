import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "success";
  icon?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const VARIANT_COLORS = {
  danger: APP_COLORS.danger,
  warning: APP_COLORS.warning,
  success: APP_COLORS.successDark,
};

const ConfirmModal = ({
  visible,
  title,
  description,
  confirmText,
  cancelText,
  isLoading = false,
  variant = "danger",
  icon,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const { t } = useTranslation();
  const color = VARIANT_COLORS[variant];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onCancel} disabled={isLoading}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Modal Content */}
      <View style={styles.wrapper} pointerEvents="box-none">
        <View style={styles.container}>
          {/* Icon */}
          {icon && (
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: withOpacity(color, 0.15) },
              ]}
            >
              {icon}
            </View>
          )}

          {/* Text */}
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={isLoading}
            >
              <Text style={styles.cancelText}>{cancelText ?? t("common.cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                isLoading && styles.disabledButton,
              ]}
              onPress={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={APP_COLORS.white} />
              ) : (
                <Text style={styles.confirmText}>{confirmText ?? t("common.confirm")}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  container: {
    width: "100%",
    backgroundColor: APP_COLORS.card,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    color: APP_COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: APP_COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    width: "100%",
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: APP_COLORS.dangerDark,
  },
  confirmButton: {
    backgroundColor: APP_COLORS.successDark,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelText: {
    color: APP_COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 15,
  },
  confirmText: {
    color: APP_COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 15,
  },
});

export default ConfirmModal;
