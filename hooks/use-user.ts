// src/hooks/useUser.ts
import { supabase } from "@/integrations/supabase/supabase";
import { userService } from "@/services/user.service";
import { UpdateUserProfile } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_QUERY_KEY = ["user", "profile"];

// fetch profile
export const useUserProfile = () => {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: userService.getProfile,
    enabled: !!session?.user, // ← only fetches once session is ready
  });
};

// update profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: UpdateUserProfile) =>
      userService.updateProfile(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};

// upload avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uri: string) => userService.uploadAvatar(uri),
    onSuccess: (avatarUrl) => {
      // update profile with new avatar url
      userService.updateProfile({ avatar_url: avatarUrl });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};
