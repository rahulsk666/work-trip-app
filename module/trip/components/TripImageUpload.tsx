import { IconSymbol } from "@/components/ui/icon-symbol";
import { useImageUpload } from "@/hooks/useImageUpload";
import { APP_COLORS } from "@/lib/consts";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface TripImageUploadProps {
  path: string;
}

const TripImageUpload = ({ path }: TripImageUploadProps) => {
  const { preview, uploading, pickAndUpload } = useImageUpload({
    bucket: "trip_dashboard",
    path: path,
    onUpload: (url) => {},
    onError: () => {},
  });
  return (
    <TouchableOpacity
      onPress={pickAndUpload}
      className="bg-cardElevated border-textMuted rounded-lg p-3 justify-center items-center flex-1"
      style={{
        height: 150,
        borderStyle: "dotted",
        borderColor: APP_COLORS.textMuted,
        borderWidth: 2,
      }}
      activeOpacity={1}
    >
      {!uploading && preview && (
        <Image
          source={{ uri: preview }}
          style={{ width: "100%", height: "100%" }}
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
