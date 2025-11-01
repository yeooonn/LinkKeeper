"use client";
// pages/auth/callback.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "@/features/sign-in/model/signIn.service";
import { toast } from "react-toastify";
import { useAuthStore } from "@/shared/stores/useUserStore";

export default function AuthCallback() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleAuth = async () => {
      if (user) {
        const response = await SignIn(user);

        if (response?.message === "success") {
          toast.success("로그인되었습니다.");
          router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`);
        }

        if (response?.error) {
          toast.error("다시 시도해 주세요.");
        }
      }
    };

    handleAuth();
  }, [user, router]);

  return <p>로그인 중입니다...</p>;
}
