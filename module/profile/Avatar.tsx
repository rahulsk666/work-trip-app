import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface AvatarProps {
  showEditButton?: boolean;
}

const Avatar = ({ showEditButton = false }: AvatarProps) => {
  const user = {
    image: "https://i.pravatar.cc/300",
    name: "Alex",
    date: "Oct 24, Tuesday",
    hours: "6h 12m",
    miles: "45.2 mi",
    duration: "03:15:20",
    location: "I-5 Southbound, Mile 42",
  };
  return (
    <View className="gap-3 items-center">
      <View className="relative">
        <Image
          source={{ uri: user.image }}
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
            onPress={() => console.log("edit avatar")}
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
