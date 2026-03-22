import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function QuickToolCard({
  icon,
  label,
  danger,
  color = APP_COLORS.primary,
  disabled,
  onPress,
}: {
  icon: any;
  label: string;
  danger?: boolean;
  color?: string;
  disabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      className="rounded-2xl p-4 items-center border border-borderSubtle"
      style={{
        width: "30%",
        height: "100%",
        backgroundColor: disabled ? APP_COLORS.background : APP_COLORS.card,
      }}
      disabled={disabled}
      activeOpacity={1}
      onPress={onPress}
    >
      <View
        className={`flex items-center justify-center rounded-full`}
        style={{
          backgroundColor: withOpacity(color, 0.1),
          width: 40,
          height: 40,
        }}
      >
        <MaterialCommunityIcons name={icon} size={20} color={color} />
      </View>
      <Text className="text-textSecondary text-xs font-semibold mt-2 text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
