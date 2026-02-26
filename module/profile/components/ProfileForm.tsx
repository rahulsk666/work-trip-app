import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { useUserForm } from "../hooks";
import { User, UserEdit } from "../schemas/user.schema";

interface ProfileFormProps {
  user: User | null;
  onSubmit: (data: UserEdit) => void;
  isSubmitting: boolean;
}

const ProfileForm = ({ user, onSubmit, isSubmitting }: ProfileFormProps) => {
  const { handleSubmit, control, reset } = useUserForm(user as UserEdit);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
      });
      setEmail(user.email);
    }
  }, [user, reset]);
  return (
    <View className="flex-1">
      <View className="flex-1 mx-6 mt-10 mb-6 gap-6">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input {...field} label="Name" error={fieldState.error?.message} />
          )}
        />

        <Input value={email} editable={false} label="Email" />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Phone Number"
              error={fieldState.error?.message}
            />
          )}
        />
      </View>
      <Button
        text="Save"
        onPress={handleSubmit((data) => onSubmit(data))}
        disabled={isSubmitting}
      />
    </View>
  );
};

export default ProfileForm;
