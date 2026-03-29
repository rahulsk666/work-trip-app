import { Stack } from "expo-router";

export default function ReceiptLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="receipt" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
