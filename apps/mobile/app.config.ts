import type { ExpoConfig } from "expo/config";
import { config as loadEnv } from "dotenv";
import { resolve } from "path";
import appJson from "./app.json";

loadEnv({ path: resolve(__dirname, "../../.env") });

const expo = appJson.expo as ExpoConfig;

export default {
  expo: {
    ...expo,
    plugins: [
      ...(expo.plugins ?? []),
      "expo-web-browser",
      "@react-native-community/datetimepicker",
    ],
    extra: {
      supabaseUrl:
        process.env.NEXT_PUBLIC_SUPABASE_URL ??
        process.env.EXPO_PUBLIC_SUPABASE_URL ??
        "",
      supabaseAnonKey:
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
        "",
    },
  },
};
