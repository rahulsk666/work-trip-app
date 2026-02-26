import Avatar from "@/components/Avatar";
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
  // const [editUser, setEditUser] = useState<User | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="my-10">
        <Avatar uri={user?.avatar_url} showEditButton={true} />
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
