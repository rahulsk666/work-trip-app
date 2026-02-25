import { useUpdateProfile, useUserProfile } from "@/hooks/use-user";
import Avatar from "@/module/profile/Avatar";
import ProfileInputButton from "@/module/profile/ProfileInputButton";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const EditProfile = () => {
  const { data: user } = useUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile(form, {
      onSuccess: () => {
        toast.success("Profile Updated Successfully");
        router.navigate("/(tabs)/profile");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="my-10">
        <Avatar showEditButton={true} />
      </View>
      <View className="flex-1 mx-6 mt-10 mb-6 gap-6">
        <ProfileInputButton
          label="Name"
          value={form.name}
          onChange={(value) => handleChange("name", value)}
        />
        <ProfileInputButton
          label="Email"
          value={form.email}
          editable={false}
          onChange={(value) => handleChange("email", value)}
        />
        <ProfileInputButton
          label="Phone Number"
          value={form.phone}
          onChange={(value) => handleChange("phone", value)}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSave}
        disabled={isPending}
        className="mx-6 mb-6 bg-primary rounded-lg items-center justify-center py-3"
      >
        <Text className="text-white text-lg font-medium">
          {isPending ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;
