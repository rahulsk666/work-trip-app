import { APP_COLORS } from "@/lib/consts";
import { formatDate } from "@/lib/fomatDate";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { Receipt } from "../schemas/receipt.schema";

interface ReceiptDetailCardProps {
  receipt: Receipt;
}

const ReceiptDetailCard = ({ receipt }: ReceiptDetailCardProps) => {
  const { t } = useTranslation();
  return (
    <View>
      <View className="flex-col justify-start p-4">
        <Text className="text-3xl text-textMuted font-bold">
          {receipt.created_at ? formatDate(receipt?.created_at) : ""}
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
        <View className="flex-row justify-between">
          <Text className="text-textSecondary font-bold">{t("receipt_detail.receipt_info")}</Text>
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
              paddingHorizontal: 10,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={
                receipt.status === "PENDING"
                  ? APP_COLORS.warningDark
                  : receipt.status === "VERIFIED"
                    ? APP_COLORS.successDark
                    : APP_COLORS.dangerDark
              }
            />
            <Text
              className="text-lg font-bold"
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
                ? t("common.pending")
                : receipt.status === "VERIFIED"
                  ? t("common.verified")
                  : t("common.rejected")}
            </Text>
          </View>
        </View>
        <View className="flex-col gap-2">
          <Text className="text-textMuted font-bold">{t("common.amount")}</Text>
          <Text
            className="font-bold"
            style={{
              color: APP_COLORS.warningDark,
              fontSize: 48,
              lineHeight: 50,
            }}
          >
            ${receipt.amount}
          </Text>
        </View>
        <View className="flex-col gap-2">
          <Text className="text-textMuted font-bold">{t("common.description")}</Text>
          <Text className="font-bold text-textPrimary">
            {receipt.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReceiptDetailCard;
