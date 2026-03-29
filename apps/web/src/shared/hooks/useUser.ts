import { useAuthStore } from "@/shared/stores/useUserStore";

export const useUser = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  return { user, loading };
};
