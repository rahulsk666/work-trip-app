import { Stack } from "expo-router";

export default function AccidentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="accident" />
    </Stack>
  );
}
