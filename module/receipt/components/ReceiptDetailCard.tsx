import { APP_COLORS } from "@/lib/consts";
import { formatDate } from "@/lib/fomatDate";
import React from "react";
import { Image, Text, View } from "react-native";
import { Receipt } from "../schemas/receipt.schema";

interface ReceiptDetailCardProps {
  receipt: Receipt;
  index?: string;
}

const ReceiptDetailCard = ({ receipt, index }: ReceiptDetailCardProps) => {
  const formattedIndex = String(Number(index) + 1).padStart(3, "0");
  return (
    <View>
      <View className="flex-col justify-start p-4">
        <Text className="text-3xl text-textMuted font-bold">
          {receipt.created_at ? formatDate(receipt?.created_at) : ""}
        </Text>
        <Text className="text-primary text-5xl font-bold">
          #{formattedIndex}
        </Text>
      </View>
      <View>
        <Image
          source={
            receipt
              ? { uri: receipt.image_url }
              : require("@/assets/map-fallback.png")
          }
          height={400}
          className="rounded-xl w-full"
        />
      </View>
      <View
        className="bg-card rounded-xl flex-col p-4 gap-6"
        style={{ marginTop: 20 }}
      >
        <View>
          <Text className="text-textSecondary font-bold">RECEIPT INFO</Text>
        </View>
        <View className="flex-col gap-2">
          <Text className="text-textMuted font-bold">AMOUNT</Text>
          <Text
            className="font-bold text-5xl"
            style={{ color: APP_COLORS.warningDark }}
          >
            ${receipt.amount}
          </Text>
        </View>
        <View className="flex-col gap-2">
          <Text className="text-textMuted font-bold">Description</Text>
          <Text className="font-bold text-textPrimary">
            {receipt.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReceiptDetailCard;
