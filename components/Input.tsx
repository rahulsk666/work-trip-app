import React from "react";
import { Text, TextInput, View } from "react-native";

interface InputProps {
  label: string;
  value: any;
  disabled?: boolean;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
}

const Input = ({
  label,
  value,
  onChange,
  disabled = false,
  onBlur,
  error,
}: InputProps) => {
  return (
    <View className="flex pt-1 border border-borderSubtle bg-slate-800 rounded-lg gap-0 ${}">
      <Text className="text-textMuted text-base px-3 mt-2">{label}</Text>
      <TextInput
        className="text-textPrimary text-lg px-3"
        value={value}
        editable={!disabled}
        onChangeText={onChange}
        onBlur={onBlur}
      />
      {error && <Text className="text-sm text-danger px-3 mb-2">{error}</Text>}
    </View>
  );
};

export default Input;
