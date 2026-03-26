import { APP_COLORS } from "@/lib/consts";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { Text, View } from "react-native";
import StatusDot from "./StatusDot";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface StatusBadgeProps {
  label?: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  shadowColor?: string;
  logoType?: "dot" | "icon";
  iconName?: IoniconName;
  classname?: string;
}

const StatusBadge = ({
  label,
  color,
  textColor,
  borderColor,
  backgroundColor,
  shadowColor,
  logoType = "dot",
  iconName,
  classname,
}: StatusBadgeProps) => {
  return (
    <View
      className={`flex-row gap-2 rounded-3xl justify-center items-center px-4 py-1 ${classname}`}
      style={{
        borderWidth: 1,
        borderColor: borderColor ? borderColor : APP_COLORS.textMuted,
        backgroundColor: backgroundColor ? backgroundColor : "",

        // Glow / shadow effect
        shadowColor: shadowColor ? shadowColor : APP_COLORS.textMuted,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 1,
      }}
    >
      {logoType === "dot" && (
        <StatusDot active color={color ? color : APP_COLORS.textMuted} />
      )}
      {logoType === "icon" && (
        <Ionicons name={iconName ?? "cloud-done"} size={16} color={color} />
      )}
      <Text
        className="font-semibold"
        style={{ color: textColor ? textColor : APP_COLORS.textMuted }}
      >
        {label ?? "Status"}
      </Text>
    </View>
  );
};

export default StatusBadge;
