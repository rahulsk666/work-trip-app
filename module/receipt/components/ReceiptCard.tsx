import { APP_COLORS } from "@/lib/consts";
import { formatTime } from "@/lib/formatTime";
import { Ionicons } from "@expo/vector-icons";
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
          params: { id: receipt.id },
        })
      }
    >
      <View className="flex-1 flex-row gap-5" style={{ gap: 20 }}>
        <View className="items-center overflow-hidden">
          <Image
            source={{
              uri: receipt.image_url ? receipt.image_url : "",
            }}
            width={100}
            height={100}
            resizeMode="cover"
            style={{ borderRadius: 8 }}
          />
        </View>
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
      <View className="flex-col justify-between items-center gap-2">
        <View
          className="flex-row items-center justify-center p-1 rounded-lg"
          style={{
            backgroundColor:
              receipt.status === "PENDING"
                ? APP_COLORS.warningShadow
                : receipt.status === "VERIFIED"
                  ? APP_COLORS.successShadow
                  : APP_COLORS.dangerShadow,
            gap: 3,
            paddingHorizontal: 9,
            marginVertical: 6,
          }}
        >
          <Ionicons
            name="checkmark-circle"
            size={12}
            color={
              receipt.status === "PENDING"
                ? APP_COLORS.warningDark
                : receipt.status === "VERIFIED"
                  ? APP_COLORS.successDark
                  : APP_COLORS.dangerDark
            }
          />
          <Text
            className="text-sm font-semibold"
            style={{
              color:
                receipt.status === "PENDING"
                  ? APP_COLORS.warningDark
                  : receipt.status === "VERIFIED"
                    ? APP_COLORS.successDark
                    : APP_COLORS.dangerDark,
            }}
          >
            {receipt.status === "PENDING"
              ? "Pending"
              : receipt.status === "VERIFIED"
                ? "Verified"
                : "Rejected"}
          </Text>
        </View>
        <View className="flex-col gap-2 p-2 px-4">
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
      </View>
    </TouchableOpacity>
  );
};

export default ReceiptCard;
