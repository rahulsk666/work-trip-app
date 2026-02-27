import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useUserForm, useUserQuery } from "../hooks";
import { UserEdit } from "../schemas/user.schema";

interface ProfileFormProps {
  onSubmit: (data: UserEdit) => void;
  isSubmitting: boolean;
}

const ProfileForm = ({ onSubmit, isSubmitting }: ProfileFormProps) => {
  const { data: user } = useUserQuery();
  const { t } = useTranslation();
  const { handleSubmit, control, reset } = useUserForm(user as UserEdit);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
      });
    }
  }, [user, reset]);
  return (
    <View className="flex-1">
      <View className="flex-1 mx-6 mt-10 mb-6 gap-6">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label={t("edit_profile.name")}
              error={fieldState.error?.message}
            />
          )}
        />

        <Input
          value={user?.email}
          disabled={true}
          label={t("edit_profile.email")}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label={t("edit_profile.phone")}
              error={fieldState.error?.message}
            />
          )}
        />
      </View>
      <Button
        text={t("edit_profile.save")}
        onPress={handleSubmit((data) => onSubmit(data))}
        disabled={isSubmitting}
      />
    </View>
  );
};

export default ProfileForm;
