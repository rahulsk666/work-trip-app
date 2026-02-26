import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";

interface LanguageItemProps {
  language: string;
  country: string;
  handleLanguage: (value: string) => void;
  active?: boolean;
}

const LanguageItem = ({
  language,
  country,
  handleLanguage,
  active,
}: LanguageItemProps) => {
  return (
    <View className="flex flex-row justify-center items-center gap-6 rounded-lg">
      <TouchableOpacity
        onPress={() => handleLanguage(language)}
        activeOpacity={1}
        className="flex flex-row justify-center items-center gap-3 py-1"
      >
        <CountryFlag isoCode={country} size={15} />
        <Text className="text-textPrimary font-semibold text-lg w-8">
          {language}
        </Text>
      </TouchableOpacity>
      <View style={{ width: 16 }}>
        {active && <Ionicons name="checkmark" size={15} color={"#fff"} />}
      </View>
    </View>
  );
};

export default LanguageItem;
