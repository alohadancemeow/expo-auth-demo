import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081",
  plugins: [
    expoClient({
      scheme: "myapp",
      storagePrefix: "withbetterauth",
      storage: SecureStore, // Uses SecureStore to persist tokens
    }),
  ],
});
