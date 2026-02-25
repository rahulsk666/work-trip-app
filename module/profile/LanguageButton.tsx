import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";

interface LanguageButtonProps {
  language: string;
  country: string;
  handleLanguage: (value: string) => void;
  active?: boolean;
}

const LanguageButton = ({
  language,
  country,
  handleLanguage,
  active,
}: LanguageButtonProps) => {
  return (
    <View className="flex flex-row justify-center items-center gap-6 rounded-lg">
      <TouchableOpacity
        onPress={() => handleLanguage(language)}
        activeOpacity={1}
        className="flex flex-row justify-center items-center gap-6 py-1"
      >
        <Text className="text-textPrimary font-semibold text-lg">
          {language}
        </Text>
        <CountryFlag isoCode={country} size={15} />
      </TouchableOpacity>
      <View style={{ width: 16 }}>
        {active && <Ionicons name="checkmark" size={15} color={"#fff"} />}
      </View>
    </View>
  );
};

export default LanguageButton;
