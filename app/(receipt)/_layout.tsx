import { APP_COLORS } from "@/lib/consts";
import { Stack } from "expo-router";

export default function ReceiptLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Receipt",
        headerStyle: { backgroundColor: APP_COLORS.cardElevated },
      }}
    >
      <Stack.Screen name="receipt" />
    </Stack>
  );
}
