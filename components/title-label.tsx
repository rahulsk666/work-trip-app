import React from "react";
import { Text } from "react-native";

const TitleLabel = ({ title }: { title: string }) => {
  return <Text className="text-textMuted font-bold uppercase">{title}</Text>;
};

export default TitleLabel;
