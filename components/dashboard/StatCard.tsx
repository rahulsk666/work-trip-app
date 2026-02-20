import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function StatCard({
  icon,
  label,
  value,
  color = APP_COLORS.primary,
}: {
  icon: any;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <View className="bg-card rounded-2xl p-4 w-[48%] border border-borderSubtle">
      <View className="flex-row items-center gap-2">
        <View
          className={`w-[30px] h-[30px] flex items-center justify-center rounded-md`}
          style={{
            backgroundColor: withOpacity(color, 0.1),
          }}
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text className="text-textSecondary text-sm uppercase font-semibold">
          {label}
        </Text>
      </View>
      <Text className="text-textPrimary text-3xl font-bold mt-3">{value}</Text>
    </View>
  );
}
