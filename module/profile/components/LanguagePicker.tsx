import React, { useState } from "react";
import { FlatList } from "react-native";
import LanguageItem from "./LanguageItem";

const flags = [
  { language: "English", country: "us" },
  { language: "German", country: "ge" },
  { language: "Japanese", country: "jp" },
];

const LanguagePicker = () => {
  const [language, setLanguage] = useState("English");
  const handleLanguage = (value: string) => {
    setLanguage(value);
  };
  return (
    <FlatList
      data={flags}
      keyExtractor={(item) => item.country}
      renderItem={({ item }) => (
        <LanguageItem
          language={item.language}
          country={item.country}
          handleLanguage={handleLanguage}
          active={language === item.language}
        />
      )}
    />
  );
};

export default LanguagePicker;
