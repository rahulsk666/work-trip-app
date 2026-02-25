import { IconSymbol } from "@/components/ui/icon-symbol";
import { UserProfile } from "@/types/user.types";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface AvatarProps {
  user?: UserProfile | null;
  showEditButton?: boolean;
  onEditPress?: () => void;
}

const Avatar = ({ user, showEditButton = false, onEditPress }: AvatarProps) => {
  return (
    <View className="gap-3 items-center">
      <View className="relative">
        <Image
          source={
            user?.avatar_url
              ? { uri: user.avatar_url }
              : require("@/assets/default-avatar.png")
          }
          alt="Avatar"
          style={{ width: 150, height: 150, borderRadius: 75 }}
        />
        {showEditButton && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 2,
              right: 0,
              borderRadius: "50%",
            }}
            activeOpacity={0.8}
            onPress={onEditPress}
            className="absolute bottom-[2px] right-[0px] rounded-full items-center justify-center"
          >
            <IconSymbol
              name="pencil.tip"
              size={28}
              color="#fff"
              style={{
                backgroundColor: "#162635",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#0B1620",
                padding: 6,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Avatar;
