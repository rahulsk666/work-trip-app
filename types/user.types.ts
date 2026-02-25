// src/types/user.types.ts
export interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar_url: string | null;
}

export interface UpdateUserProfile {
  name?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
}
