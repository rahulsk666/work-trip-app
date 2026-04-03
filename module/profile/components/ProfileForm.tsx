import Button from "@/components/Button";
import Input from "@/components/Input";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, View } from "react-native";
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
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
        />

        <Input
          value={user?.email}
          disabled={true}
          label={t("edit_profile.email")}
          onSubmitEditing={Keyboard.dismiss}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              value={field.value?.toString() ?? ""}
              label={t("edit_profile.phone")}
              error={fieldState.error?.message}
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
        />
      </View>
      <Button
        text={t("edit_profile.save")}
        onPress={handleSubmit((data) => onSubmit(data))}
        disabled={isSubmitting}
      />
      <Button
        text={t("edit_profile.cancel")}
        onPress={() => router.navigate("/profile")}
        disabled={isSubmitting}
        variant="danger"
      />
    </View>
  );
};

export default ProfileForm;
