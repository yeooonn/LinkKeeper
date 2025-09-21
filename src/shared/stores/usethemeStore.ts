import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeState = {
  isDark: boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      theme: "light",
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          return {
            theme: newTheme,
            isDark: newTheme === "dark",
          };
        }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
