import { IconSymbol } from "@/components/ui/icon-symbol";
import { APP_COLORS } from "@/lib/consts";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface TripImageUploadProps {
  pickImage?: () => void;
  uploading?: boolean;
  preview?: string | null;
}

const TripImageUpload = ({
  pickImage,
  uploading,
  preview,
}: TripImageUploadProps) => {
  return (
    <TouchableOpacity
      onPress={pickImage}
      className="bg-cardElevated border-textMuted rounded-xl p-3 justify-center items-center flex-1"
      style={{
        height: 150,
        borderStyle: preview ? "solid" : "dashed",
        borderColor: preview ? APP_COLORS.primary : APP_COLORS.textMuted,
        borderWidth: 2,
        boxShadow: preview ? `0 0 6px ${APP_COLORS.primary}` : "none",
      }}
      activeOpacity={1}
    >
      {!uploading && preview && (
        <Image
          source={{ uri: preview }}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg"
          resizeMode="cover"
        />
      )}

      {/* 📸 Default */}
      {!uploading && !preview && (
        <View className="items-center">
          <IconSymbol
            name="camera.fill"
            size={28}
            color={APP_COLORS.textMuted}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TripImageUpload;
