import { create } from "zustand";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "./supabase";

export type AuthUser = {
  id: string;
  email?: string;
  name?: string;
  profileImage?: string | null;
};

function mapUser(u: SupabaseUser): AuthUser {
  return {
    id: u.id,
    email: u.email ?? undefined,
    name: (u.user_metadata?.name as string | undefined) ?? undefined,
    profileImage: (u.user_metadata?.avatar_url as string | null) ?? null,
  };
}

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  init: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  init: async () => {
    if (!isSupabaseConfigured) {
      set({ user: null, loading: false });
      return;
    }
    const {
      data: { session },
    } = await getSupabase().auth.getSession();
    set({
      user: session?.user ? mapUser(session.user) : null,
      loading: false,
    });
  },
  signOut: async () => {
    if (!isSupabaseConfigured) return;
    await getSupabase().auth.signOut();
    set({ user: null });
  },
}));

export function subscribeAuthStateChange(): () => void {
  if (!isSupabaseConfigured) {
    return () => {};
  }
  const { data } = getSupabase().auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({
      user: session?.user ? mapUser(session.user) : null,
    });
  });
  return () => data.subscription.unsubscribe();
}
