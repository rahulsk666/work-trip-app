import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { userApi } from "../api/user.api";
import { userKeys } from "../constants/user.key";
import { UserEdit, userEditSchema } from "../schemas/user.schema";
import { useTranslation } from "react-i18next";

// use user queries
export const useUserQuery = () =>
  useQuery({
    queryKey: userKeys.get(),
    queryFn: () => userApi.get(),
  });

// user mutations
export const useEditUserMutation = () => {
  const { t } = useTranslation();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserEdit }) =>
      userApi.edit(id, data),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: (e) => toast.error(t("errors.something_went_wrong")),
  });
};

// form hook
export const useUserForm = (defaultValues?: UserEdit) =>
  useForm({
    resolver: zodResolver(userEditSchema),
    defaultValues: defaultValues as UserEdit,
  });
