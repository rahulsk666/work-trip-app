import Avatar from "@/components/Avatar";
import { useImageUpload } from "@/hooks/useImageUpload";
import ProfileForm from "@/module/profile/components/ProfileForm";
import { useEditUserMutation, useUserQuery } from "@/module/profile/hooks";
import { User, UserEdit } from "@/module/profile/schemas/user.schema";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const EditProfile = () => {
  const { data: user } = useUserQuery();
  const updateMutation = useEditUserMutation();
  const { preview, uploading, pickAndUpload } = useImageUpload({
    bucket: "avatars",
    path: user?.id,
    onUpload: (url) => {
      updateMutation.mutate(
        { avatar_url: url },
        {
          onSuccess: () => {
            toast.success("Profile Picture Updated");
          },
        },
      );
    },
    onError: () => {},
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="my-10">
        <Avatar
          uri={preview ?? user?.avatar_url}
          showEditButton={true}
          uploading={uploading}
          onPress={pickAndUpload}
        />
      </View>
      <ProfileForm
        user={user as User}
        onSubmit={(data) => {
          updateMutation.mutate(data as UserEdit, {
            onSuccess: () => {
              toast.success("Profile Updated Successfully");
              router.navigate("/(tabs)/profile");
            },
          });
        }}
        isSubmitting={updateMutation.isPending}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
