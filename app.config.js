export default {
  expo: {
    name: "TripOps",
    slug: "tripops",
    owner: "tripops",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#90B8F8",
    },
    scheme: "tripops",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tripops.app",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#90B8F8",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.tripops.app",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
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
        projectId: "59183f6f-8af5-4362-b44c-abd1a020cd16",
      },
    },
    updates: {
      url: "https://u.expo.dev/59183f6f-8af5-4362-b44c-abd1a020cd16",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
