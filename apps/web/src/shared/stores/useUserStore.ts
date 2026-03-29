import { create } from "zustand";
import { createClient } from "../utils/supabase/client";

// 로그인한 user 정보
interface AuthState {
  user: {
    id: string;
    email?: string | undefined;
    name?: string;
    profileImage: string | undefined;
  } | null;
  setUser: (user: AuthState["user"]) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
  loading?: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user) {
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
        profileImage: data.user.user_metadata.avatar_url || null,
      };
      set({ user: userData, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },

  clearUser: () => set({ user: null }),
}));
