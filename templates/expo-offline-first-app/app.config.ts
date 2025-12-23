module.exports = {
  expo: {
    name: process.env.APP_NAME || "Expo Offline First App",
    slug: process.env.APP_SLUG || "expo-offline-first-app",
    version: "1.0.0",
    orientation: "default",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    scheme: process.env.APP_PACKAGE || "com.famisoft.APP_SLUG",
    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.APP_PACKAGE || "com.famisoft.APP_SLUG",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: process.env.APP_PACKAGE || "com.famisoft.APP_SLUG",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-asset",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#ffffff",
          image: "./assets/splash-icon.png",
        },
      ],
      "expo-sqlite",
    ],
  },
};
