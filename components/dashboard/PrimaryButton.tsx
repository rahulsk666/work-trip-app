import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function PrimaryButton({
  label,
  icon,
  onPress,
  danger,
  style,
}: {
  label: string;
  icon: any;
  onPress: () => void;
  danger?: boolean;
  style?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${danger ? "bg-cardElevated" : "bg-primary"} 
      rounded-2xl py-4 items-center justify-center ${style}`}
    >
      <View className="flex-row items-center">
        <Ionicons
          name={icon}
          size={18}
          color={danger ? APP_COLORS.danger : APP_COLORS.textPrimary}
        />
        <Text
          className={`ml-2 font-semibold ${
            danger ? "text-danger" : "text-white"
          }`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
