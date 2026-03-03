import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";

interface LanguageCardProps {
  language: string;
  country: string;
  handleLanguage: (value: string) => void;
  active?: boolean;
}

const LanguageCard = ({
  language,
  country,
  handleLanguage,
  active,
}: LanguageCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => handleLanguage(language)}
      activeOpacity={1}
      className="flex-row justify-between items-center p-4 rounded-xl border border-borderSubtle"
    >
      <View className="flex-row justify-center items-center gap-1">
        <CountryFlag isoCode={country} size={15} />
        <Text className="text-textPrimary font-semibold text-lg">
          {language}
        </Text>
      </View>
      <View>
        {active && (
          <Ionicons name="checkmark" size={20} color={APP_COLORS.primary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LanguageCard;
