import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Linking,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface UpdateConfig {
    update_mode: "NONE" | "WARNING" | "FORCE";
    warning_message?: string | null;
    force_message?: string | null;
    latest_version?: string | null;
    apk_url?: string | null;
}


interface UpdateModalProps {
    visible: boolean;
    config: UpdateConfig;
    currentVersion: string;
    onDismissWarning?: () => void;
    APP_COLORS: any;
}

export default function UpdateModal({
    visible,
    config,
    currentVersion,
    onDismissWarning,
    APP_COLORS,
}: UpdateModalProps) {
    const isForce = config.update_mode === "FORCE";

    const message = isForce
        ? config.force_message ?? "Please update the app."
        : config.warning_message ?? "A new update is available.";

    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 32,
                }}
            >
                <View
                    style={{
                        backgroundColor: APP_COLORS.cardElevated,
                        borderRadius: 16,
                        padding: 24,
                        width: "100%",
                        gap: 8,
                    }}
                >
                    {/* Icon */}

                    <Ionicons
                        name={
                            isForce
                                ? "warning-outline"
                                : "information-circle-outline"
                        }
                        size={48}
                        color={
                            isForce
                                ? APP_COLORS.error
                                : APP_COLORS.warningDark
                        }
                    />

                    {/* Title */}

                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: APP_COLORS.textPrimary,
                        }}
                    >
                        {isForce
                            ? "Update Required"
                            : "Update Available"}
                    </Text>

                    {/* Message */}

                    <Text
                        style={{
                            fontSize: 15,
                            color: APP_COLORS.textMuted,
                            lineHeight: 22,
                        }}
                    >
                        {message}
                    </Text>

                    {/* Version Info */}

                    <Text
                        style={{
                            fontSize: 12,
                            color: APP_COLORS.textMuted,
                        }}
                    >
                        Your version: {currentVersion}
                        {" — "}
                        Latest: {config.latest_version}
                    </Text>

                    {/* Download Button */}

                    {!!config.apk_url && (
                        <TouchableOpacity
                            onPress={() =>
                                Linking.openURL(config.apk_url!)
                            }
                            style={{
                                marginTop: 12,
                                backgroundColor: APP_COLORS.primary,
                                borderRadius: 10,
                                padding: 14,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: APP_COLORS.textPrimary,
                                    fontWeight: "bold",
                                }}
                            >
                                Download Update
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Continue Button (WARNING ONLY) */}

                    {!isForce && (
                        <TouchableOpacity
                            onPress={onDismissWarning}
                            style={{
                                padding: 14,
                                alignItems: "center",
                                backgroundColor:
                                    APP_COLORS.textMutedShadow,
                                borderRadius: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: APP_COLORS.textSecondary,
                                }}
                            >
                                Continue Anyway
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
}