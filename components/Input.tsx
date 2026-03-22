import React from "react";
import { Text, TextInput, View } from "react-native";

interface InputProps {
  label?: string;
  value: any;
  disabled?: boolean;
  onChange?: (text: any) => void;
  onBlur?: () => void;
  error?: string;
  type?: "default" | "numeric" | "email-address" | "phone-pad";
  suffix?: string;
}

const Input = ({
  label,
  value,
  onChange,
  disabled = false,
  onBlur,
  error,
  type = "default",
  suffix,
}: InputProps) => {
  return (
    <View className="flex pt-1 border border-borderSubtle bg-slate-800 rounded-lg gap-0 ${}">
      {label && (
        <Text className="text-textMuted text-base px-3 mt-2">{label}</Text>
      )}
      <View className="flex-row items-center">
        <TextInput
          className="text-textPrimary text-lg px-3 flex-1"
          value={value}
          editable={!disabled}
          onChangeText={onChange}
          onBlur={onBlur}
          keyboardType={type}
        />
        {suffix && (
          <Text className="text-textMuted text-base pr-3">{suffix}</Text>
        )}
      </View>
      {error && <Text className="text-sm text-danger px-3 mb-2">{error}</Text>}
    </View>
  );
};

export default Input;
