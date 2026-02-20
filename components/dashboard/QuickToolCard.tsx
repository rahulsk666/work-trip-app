import { APP_COLORS } from "@/lib/consts";
import { withOpacity } from "@/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function QuickToolCard({
  icon,
  label,
  danger,
  color = APP_COLORS.primary,
}: {
  icon: any;
  label: string;
  danger?: boolean;
  color?: string;
}) {
  return (
    <View className="bg-card rounded-2xl p-4 w-[30%] items-center border border-borderSubtle">
      <View
        className={`w-[40px] h-[40px] flex items-center justify-center rounded-full`}
        style={{
          backgroundColor: withOpacity(color, 0.1),
        }}
      >
        <MaterialCommunityIcons name={icon} size={20} color={color} />
      </View>
      <Text className="text-textSecondary text-xs font-semibold mt-2 text-center">
        {label}
      </Text>
    </View>
  );
}
