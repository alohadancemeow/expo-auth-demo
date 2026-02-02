import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

import Constants from "expo-constants";

// const getBaseUrl = () => {
//     const debuggerHost = Constants.expoConfig?.hostUri;
//     const localhost = debuggerHost?.split(":")[0];

//     if (!localhost) {
//         return "http://localhost:3000/api/auth";
//     }

//     return `http://${localhost}:3000/api/auth`;
// };

// console.log("Auth Client Base URL:", getBaseUrl());

const baseUrl = process.env.EXPO_PUBLIC_BETTER_AUTH_URL;
console.log("Auth Client Base URL:", baseUrl);

export const authClient = createAuthClient({
    baseURL: `${baseUrl}/api/auth`,
    plugins: [
        expoClient({
            scheme: "myapp",
            storagePrefix: "myapp",
            storage: SecureStore,
        }),
    ],
});
