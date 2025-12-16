import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Constants from "expo-constants";

function getBaseURL() {
  // 🌐 Expo Web
  if (Platform.OS === "web") {
    return "http://localhost:3000";
  }

  // 📱 Expo Go (real device)
  const host = Constants.expoConfig?.hostUri?.split(":").shift();

  if (!host) {
    throw new Error("Cannot determine Expo dev host");
  }

  return `http://${host}:3000`;
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),

  plugins: [
    expoClient({
      scheme: "myapp",
      storage: SecureStore,
      storagePrefix: "auth",
    }),
  ],
});

