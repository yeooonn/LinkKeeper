"use client";
// pages/auth/callback.tsx
import { useEffect } from "react";
import { createClient } from "@/shared/utils/supabase/client";
import { useRouter } from "next/navigation";
import { SignIn } from "@/features/sign-in/model/signIn.service";
import { toast } from "react-toastify";
import { useAuthStore } from "@/shared/stores/useUserStore";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error);
        return;
      }

      if (data?.user) {
        const requestData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
          profileImage: data.user.user_metadata.avatar_url || null,
        };

        const response = await SignIn(requestData);

        if (response?.message === "success") {
          toast.success("로그인되었습니다.");
          router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`);
          const userData = response.data;
          setUser(userData);
        }

        if (response?.error) {
          toast.error("다시 시도해 주세요.");
        }
      }
    };

    handleAuth();
  }, [router]);

  return <p>로그인 중입니다...</p>;
}
