import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function StatCard({
  icon,
  label,
  value,
  color = APP_COLORS.primary,
  disableShadow = false,
}: {
  icon: any;
  label: string;
  value: string;
  color?: string;
  disableShadow?: boolean;
}) {
  return (
    <View
      className={`${disableShadow ? "bg-background" : "bg-card"} rounded-2xl p-4 border border-borderSubtle`}
      style={{ width: "48%" }}
    >
      <View className="flex-row items-center gap-2">
        <View
          className={`flex items-center justify-center rounded-md`}
          style={{
            backgroundColor: withOpacity(color, 0.1),
            width: 30,
            height: 30,
          }}
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text
          className={`${disableShadow ? "text-textMuted" : "text-textSecondary"} text-sm uppercase font-semibold`}
        >
          {label}
        </Text>
      </View>
      <Text
        className={`${disableShadow ? "text-textMuted" : "text-textPrimary"} text-3xl font-bold mt-3`}
      >
        {value}
      </Text>
    </View>
  );
}
