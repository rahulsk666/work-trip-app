import { APP_COLORS } from "@/lib/consts";
import { formatTime } from "@/lib/formatTime";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Receipt } from "../schemas/receipt.schema";

interface ReceiptCardProps {
  receipt: Receipt;
  index?: number;
}

const ReceiptCard = ({ receipt, index }: ReceiptCardProps) => {
  return (
    <TouchableOpacity
      className="bg-card m-1 gap-2 flex-row rounded-lg justify-between items-center"
      activeOpacity={1}
      onPress={() =>
        router.navigate({
          pathname: "/(receipt)/[id]",
          params: { id: receipt.id, index: index },
        })
      }
    >
      <View className="flex-1 flex-row gap-5" style={{ gap: 20 }}>
        <Image
          source={{
            uri: receipt.image_url ? receipt.image_url : "",
          }}
          width={100}
          height={100}
          resizeMode="contain"
          className="rounded-lg"
        />
        <View
          className="flex-col gap-2 justify-center"
          style={{ flex: 1, flexShrink: 1 }}
        >
          <Text
            className="text-lg font-bold text-textPrimary"
            numberOfLines={2}
            style={{ flexShrink: 1 }}
          >
            {receipt.description}
          </Text>
          <Text className="text-textSecondary font-bold">TIME</Text>
          <Text className="text-textSecondary font-bold">
            {receipt.created_at && formatTime(receipt?.created_at)}
          </Text>
        </View>
      </View>

      <View className="flex-col gap-2 p-4">
        <Text className="text-textSecondary font-bold">AMOUNT</Text>
        <Text
          className="text-textSecondary font-bold rounded-lg text-center p-1"
          style={{
            backgroundColor: APP_COLORS.warningShadow,
            color: APP_COLORS.warningDark,
            textAlign: "center",
          }}
        >
          {receipt.amount}$
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReceiptCard;
