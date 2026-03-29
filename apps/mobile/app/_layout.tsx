import "../global.css";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { subscribeAuthStateChange, useAuthStore } from "../lib/auth-store";

const queryClient = new QueryClient();

export default function RootLayout() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    void init();
  }, [init]);

  useEffect(() => subscribeAuthStateChange(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider
        style={
          Platform.OS === "web"
            ? { flex: 1, minHeight: "100%", height: "100%" }
            : undefined
        }
      >
        <SafeAreaView
          className="flex-1"
          edges={[]}
          style={
            Platform.OS === "web"
              ? ({
                  flex: 1,
                  minHeight: "100vh",
                } as import("react-native").StyleProp<object>)
              : undefined
          }
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: Platform.OS === "web" ? { flex: 1 } : undefined,
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
