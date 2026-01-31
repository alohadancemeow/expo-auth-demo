import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Constants from "expo-constants";

function getBaseURL() {
  const extra = Constants.expoConfig?.extra as { AUTH_BASE_URL?: string } | undefined;
  if (extra?.AUTH_BASE_URL) {
    return extra.AUTH_BASE_URL;
  }
  // 🌐 Expo Web
  if (Platform.OS === "web") {
    return "http://localhost:8081";
  }

  // 📱 Expo Go (real device)
  const host = Constants.expoConfig?.hostUri?.split(":").shift();

  if (!host) {
    throw new Error(
      "Cannot determine Expo dev host. Set expo.extra.AUTH_BASE_URL in app.json to your auth server URL."
    );
  }

  return `http://${host}:8081`;
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),

  plugins: [
    expoClient({
      scheme: "myapp",
      storage: SecureStore,
      storagePrefix: "myapp",
    }),
  ],
});
