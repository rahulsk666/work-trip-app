import { Stack } from "expo-router";

export default function TripLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="start" />
      <Stack.Screen name="stop" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
