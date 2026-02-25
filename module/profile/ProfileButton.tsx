import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileButtonProps {
  text: string;
  mutedText: string;
  onPress: () => void;
}

const ProfileButton = ({ text, mutedText, onPress }: ProfileButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      className="px-3 py-3 flex-row justify-between border border-borderSubtle rounded-lg"
    >
      <View className="flex-col gap-1">
        <Text className="text-textPrimary text-xl">{text}</Text>
        <Text className="text-textMuted text-xs">{mutedText}</Text>
      </View>
      <View className="items-center justify-center">
        <IconSymbol name="chevron.right" size={20} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileButton;
