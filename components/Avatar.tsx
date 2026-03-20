import { IconSymbol } from "@/components/ui/icon-symbol";
import { APP_COLORS } from "@/lib/consts";
import React from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";

interface AvatarProps {
  uri?: string | null;
  showEditButton?: boolean;
  uploading?: boolean;
  onPress?: () => void;
  width?: number;
  height?: number;
}

const Avatar = ({
  uri,
  showEditButton = false,
  uploading = false,
  onPress,
  width = 55,
  height = 55,
}: AvatarProps) => {
  return (
    <View className="gap-3 items-center">
      <View className="relative">
        <Image
          source={uri ? { uri: uri } : require("@/assets/default-avatar.png")}
          alt="Avatar"
          style={{ width: width, height: height, borderRadius: 75 }}
        />
        {uploading && (
          <View className="absolute w-[150px] h-[150px] rounded-full bg-black/50 items-center justify-center">
            <ActivityIndicator color={APP_COLORS.primary} size="large" />
          </View>
        )}
        {showEditButton && !uploading && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 2,
              right: 0,
              borderRadius: "50%",
            }}
            activeOpacity={0.8}
            onPress={onPress}
            className="absolute bottom-[2px] right-[0px] rounded-full items-center justify-center"
          >
            <IconSymbol
              name="pencil.tip"
              size={28}
              color={APP_COLORS.white}
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
