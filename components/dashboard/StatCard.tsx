import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function StatCard({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View className="bg-card rounded-2xl p-4 w-[48%] border border-borderSubtle">
      <Ionicons name={icon} size={20} color="#2D8CFF" />
      <Text className="text-textSecondary text-xs mt-2">{label}</Text>
      <Text className="text-textPrimary text-xl font-bold mt-1">{value}</Text>
    </View>
  );
}
