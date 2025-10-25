import { create } from "zustand";

// 로그인한 user 정보
interface AuthState {
  user: {
    id: string;
    email?: string | undefined;
    name?: string;
    profileImage: string | undefined;
  } | null;
  setUser: (user: AuthState["user"]) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
