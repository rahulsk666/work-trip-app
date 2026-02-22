import Avatar from "@/module/profile/Avatar";
import ProfileInputButton from "@/module/profile/profile-input-button";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="my-10">
        <Avatar showEditButton={true} />
      </View>
      <View className="flex-1 mx-6 mt-10 mb-6 gap-6">
        <ProfileInputButton
          label="Name"
          value={""}
          onChange={(value) => console.log(value)}
        />
        <ProfileInputButton
          label="Email"
          value={""}
          onChange={(value) => console.log(value)}
        />
        <ProfileInputButton
          label="Phone Number"
          value={""}
          onChange={(value) => console.log(value)}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => console.log("save")}
        className="mx-6 mb-6 bg-primary rounded-lg items-center justify-center py-3"
      >
        <Text className="text-white text-lg font-medium">Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;
