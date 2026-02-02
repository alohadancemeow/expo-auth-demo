import { createAuthClient } from "better-auth/react" // make sure to import from react since we are in expo
import { expoClient } from "@better-auth/expo/client"
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    expoClient({
      scheme: "expo-auth-demo",
      storage: SecureStore,
    }),
  ],
}); 