import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

function resolveCredentials(): { url: string; key: string } {
  const extra = Constants.expoConfig?.extra as
    | { supabaseUrl?: string; supabaseAnonKey?: string }
    | undefined;

  const url =
    process.env.EXPO_PUBLIC_SUPABASE_URL ?? extra?.supabaseUrl ?? "";
  const key =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? extra?.supabaseAnonKey ?? "";

  return { url, key };
}

const { url: supabaseUrl, key: supabaseAnonKey } = resolveCredentials();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const authStorage =
  Platform.OS === "web"
    ? {
        getItem: async (key: string) => {
          if (typeof localStorage === "undefined") return null;
          return localStorage.getItem(key);
        },
        setItem: async (key: string, value: string) => {
          localStorage.setItem(key, value);
        },
        removeItem: async (key: string) => {
          localStorage.removeItem(key);
        },
      }
    : {
        getItem: (key: string) => SecureStore.getItemAsync(key),
        setItem: (key: string, value: string) =>
          SecureStore.setItemAsync(key, value),
        removeItem: (key: string) => SecureStore.deleteItemAsync(key),
      };

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_* in the repo root .env or EXPO_PUBLIC_* in apps/mobile/.env.",
    );
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: authStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        flowType: "pkce",
      },
    });
  }
  return client;
}
