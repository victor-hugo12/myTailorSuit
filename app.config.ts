export default {
  expo: {
    name: "myTailorSuit",
    slug: "myTailorSuit",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/IconoApp.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    scheme: "mytailorsuit",

    splash: {
      image: "./assets/IconoApp.png",
      resizeMode: "contain",
      backgroundColor: "#1A2332",
    },

    ios: {
      supportsTablet: true,
    },

    android: {
      package: "com.victorhugo911.myTailorSuit",
      googleServicesFile: "./google-services.json",

      adaptiveIcon: {
        foregroundImage: "./assets/IconoApp.png",
        backgroundColor: "#1A2332",
      },

      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    web: {
      favicon: "./assets/favicon.png",
    },

    plugins: ["expo-router", "@react-native-firebase/app"],
  },
};
