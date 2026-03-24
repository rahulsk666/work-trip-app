import { APP_COLORS } from "@/lib/consts";
import { Stack } from "expo-router";

export default function ReceiptLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Receipt",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: APP_COLORS.cardElevated,
        },
        headerTintColor: APP_COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="receipt" />
    </Stack>
  );
}
