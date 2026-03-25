import "@/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "react-native-url-polyfill/auto";
import { Toaster } from "sonner-native";

import "./global.css";

import Loading from "@/components/Loading";
import { SplashScreenController } from "@/components/splash-screen-controller";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { APP_COLORS } from "@/lib/consts";
import AuthProvider from "@/providers/auth-provider";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const unstable_settings = {
  anchor: "(tabs)",
};

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
});

const queryClient = new QueryClient();

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          <Stack.Screen name="(trip)" options={{ headerShown: false }} />
          <Stack.Screen name="(track)" options={{ headerShown: false }} />
          <Stack.Screen name="(receipt)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: APP_COLORS.cardElevated, // cardElevated - slightly elevated from background
            borderWidth: 1,
            borderColor: APP_COLORS.borderSubtle, // borderSubtle
          },
          titleStyle: {
            color: APP_COLORS.textPrimary, // textPrimary
            fontWeight: "600",
          },
          descriptionStyle: {
            color: APP_COLORS.textSecondary, // textSecondary
          },
        }}
      />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <SplashScreenController />
          <RootNavigator />
          <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
