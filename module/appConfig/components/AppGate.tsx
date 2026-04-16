// components/AppGate.tsx
import UpdateModal from "@/components/UpdateModal";
import { APP_COLORS } from "@/lib/consts";
import { getAppVersion, isVersionBelow } from "@/lib/version";
import { useAppConfigQuery } from "@/module/appConfig/hooks";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FullScreenProps {
    title: string;
    message: string | null;
    buttonLabel?: string;
    onPress?: () => void;
    iconName: "warning-outline" | "construct-outline";
    iconColor: string;
    currentVersion?: string;
    minVersion?: string;
    showButton?: boolean;
}

const FullScreenBlock = ({
    title,
    message,
    buttonLabel,
    onPress,
    iconName,
    iconColor,
    currentVersion,
    minVersion,
    showButton = true,
}: FullScreenProps) => (
    <SafeAreaView
        style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            backgroundColor: APP_COLORS.background,
        }}
    >
        <Ionicons name={iconName} size={64} color={iconColor} />
        <Text
            style={{
                fontSize: 24,
                fontWeight: "bold",
                color: APP_COLORS.textPrimary,
                marginTop: 16,
                textAlign: "center",
            }}
        >
            {title}
        </Text>
        <Text
            style={{
                fontSize: 15,
                color: APP_COLORS.textMuted,
                marginTop: 12,
                textAlign: "center",
                lineHeight: 24,
            }}
        >
            {message}
        </Text>
        {currentVersion && minVersion && (
            <Text
                style={{ fontSize: 12, color: APP_COLORS.textMuted, marginTop: 8 }}
            >
                Your version: {currentVersion} — Required: {minVersion}
            </Text>
        )}
        {showButton && buttonLabel && onPress && (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    marginTop: 28,
                    backgroundColor: APP_COLORS.primary,
                    borderRadius: 12,
                    paddingVertical: 14,
                    paddingHorizontal: 32,
                }}
            >
                <Text
                    style={{
                        color: APP_COLORS.textPrimary,
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    {buttonLabel}
                </Text>
            </TouchableOpacity>
        )}
    </SafeAreaView>
);

const AppGate = ({ children }: { children: React.ReactNode }) => {
    const { data: config, isLoading } = useAppConfigQuery();
    const [warningDismissed, setWarningDismissed] = useState(false);

    if (isLoading) return null;
    if (!config || !config.is_active) return <>{children}</>;

    const currentVersion = getAppVersion();

    // ── Maintenance mode ──────────────────────────────────────
    if (config.maintenance_mode) {
        return (
            <FullScreenBlock
                title="Under Maintenance"
                message={config.maintenance_message}
                iconName="construct-outline"
                iconColor={APP_COLORS.warningDark}
                showButton={false}
            />
        );
    }

    // ── Force update ──────────────────────────────────────────
    if (
        config.update_mode === "FORCE" &&
        isVersionBelow(currentVersion, config.min_supported_version)
    ) {
        return (
            <FullScreenBlock
                title="Update Required"
                message={config.force_message}
                buttonLabel="Download Update"
                onPress={() => Linking.openURL(config.apk_url!)}
                iconName="warning-outline"
                iconColor={APP_COLORS.dangerDark}
                currentVersion={currentVersion}
                minVersion={config.min_supported_version}
                showButton={!!config.apk_url}
            />
        );
    }

    // ── Warning ───────────────────────────────────────────────
    if (
        config.update_mode === "WARNING" &&
        isVersionBelow(currentVersion, config.latest_version) &&
        !warningDismissed
    ) {
        return (
            <>
                {children}
                <UpdateModal
                    visible={true}
                    config={config}
                    currentVersion={currentVersion}
                    APP_COLORS={APP_COLORS}
                    onDismissWarning={() =>
                        setWarningDismissed(true)
                    }
                />

            </>
        );
    }

    // ── All good ──────────────────────────────────────────────
    return <>{children}</>;
};

export default AppGate;