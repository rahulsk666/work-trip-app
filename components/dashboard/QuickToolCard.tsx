import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function QuickToolCard({
  icon,
  label,
  danger,
}: {
  icon: any;
  label: string;
  danger?: boolean;
}) {
  return (
    <View className="bg-card rounded-2xl p-4 w-[30%] items-center border border-borderSubtle">
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={danger ? "#EF4444" : "#27B1FF"}
      />
      <Text className="text-textSecondary text-xs mt-2 text-center">
        {label}
      </Text>
    </View>
  );
}
