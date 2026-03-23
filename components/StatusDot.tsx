import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default function StatusDot({
  active = true,
  color,
}: {
  active?: boolean;
  color: string;
}) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.3,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [active]);

  return (
    <View
      style={{
        width: 10,
        height: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 1,
      }}
    >
      <Animated.View
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 4,
          elevation: 3,
          opacity: pulse,
        }}
      />
    </View>
  );
}
