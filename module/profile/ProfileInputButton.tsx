import React from "react";
import { Text, TextInput, View } from "react-native";

interface ProfileInputButtonProps {
  label: string;
  value: any;
  editable?: boolean;
  onChange: (text: string) => void;
}

const ProfileInputButton = ({
  label,
  value,
  onChange,
  editable = true,
}: ProfileInputButtonProps) => {
  return (
    <View className="flex pt-1 border border-borderSubtle bg-slate-800 rounded-lg gap-0 ${}">
      <Text className="text-textMuted text-base px-3 mt-2">{label}</Text>
      <TextInput
        className="text-textPrimary text-lg px-3"
        value={value}
        editable={editable}
        onChangeText={onChange}
      />
    </View>
  );
};

export default ProfileInputButton;
