export default {
  expo: {
    name: "work-trip-app",
    slug: "work-trip-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#90B8F8",
    },
    scheme: "work-trip-app",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anandureghu.worktripapp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#90B8F8",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.anandureghu.worktripapp",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
      ],
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#90B8F8",
          dark: { backgroundColor: "#000000" },
        },
      ],
      "expo-secure-store",
      "expo-localization",
      [
        "expo-location",
        {
          locationWhenInUsePermission:
            "Allow ${PRODUCT_NAME} to use your location to track trip start and end points.",
        },
      ],
      "@react-native-google-signin/google-signin",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "085e552a-06fa-4d40-9ba4-f95378f5f5ba",
      },
    },
    updates: {
      url: "https://u.expo.dev/7b549ece-a96e-4fdb-9cc8-0218808af265",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
