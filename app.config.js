import 'dotenv/config';

export default {
  expo: {
    name: "TourSmartDemo",
    slug: "TourSmartDemo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      GOOGLE_MAPS_APIKEY: process.env.GOOGLE_MAPS_APIKEY
    }
  }
};
