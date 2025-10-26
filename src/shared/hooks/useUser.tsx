import { useEffect, useState } from "react";
import { createClient } from "@/shared/utils/supabase/client";
import { UserInterface } from "@/entites/user/model/types";

export const useUser = () => {
  const supabase = createClient();
  const [user, setUser] = useState<UserInterface>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
          profileImage: data.user.user_metadata.avatar_url || null,
        };

        setUser(userData);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
