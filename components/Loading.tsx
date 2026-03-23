import { APP_COLORS } from "@/lib/consts";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Loading = ({
  label,
  showBackground = true,
}: {
  label?: string;
  showBackground?: boolean;
}) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: showBackground ? APP_COLORS.background : "",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <ActivityIndicator size="large" color={APP_COLORS.primary} />
      <Text style={{ color: APP_COLORS.white, marginTop: 12, fontSize: 14 }}>
        {label ?? "Loading..."}
      </Text>
    </View>
  );
};

export default Loading;
