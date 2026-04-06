import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
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


export default FullScreenBlock;