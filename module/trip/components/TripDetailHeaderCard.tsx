import { useDuration } from "@/hooks/useDuration";
import { calculateTotalReceiptAmount } from "@/lib/calculateReceipt";
import { calculateTotalWorkTime } from "@/lib/calculateWork";
import { formatDate } from "@/lib/fomatDate";
import { formatTime } from "@/lib/formatTime";
import { useReceiptByTripQuery } from "@/module/receipt/hooks";
import { useWorkByTripQuery } from "@/module/work/hooks";
import React from "react";
import { Text, View } from "react-native";
import { Trip } from "../schemas/trip.schema";
import { TripDetailTab } from "./TripDetailTabSwitcher";

interface TripDetailHeaderCardProps {
  trip?: Trip;
  activeTab: TripDetailTab;
}

const TripDetailHeaderCard = ({
  trip,
  activeTab,
}: TripDetailHeaderCardProps) => {
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );
  const { data: works } = useWorkByTripQuery({ tripId: trip?.id });
  const totalWorkHours = calculateTotalWorkTime(works ?? []);
  const { data: receipts } = useReceiptByTripQuery({ tripId: trip?.id });
  const totalReceiptAmount = calculateTotalReceiptAmount(receipts ?? []);

  return (
    <View className="flex-col items-center bg-cardElevated p-2 rounded-xl gap-2">
      <View>
        <Text className="text-textPrimary font-bold">
          {trip ? formatDate(trip?.trip_date) : ""}
        </Text>
      </View>
      <View>
        <Text
          className="text-textPrimary font-bold text-5xl"
          style={{ fontSize: 48, lineHeight: 52 }}
        >
          {trip ? duration?.short : "00h 00m"}
        </Text>
      </View>
      <View className="flex-row justify-between" style={{ gap: 40 }}>
        {activeTab === "Work" ? (
          <View className="flex-col items-center justify-center">
            <Text className="text-textPrimary">Work Time</Text>
            <Text className="text-textPrimary">
              {totalWorkHours?.formatted}
            </Text>
          </View>
        ) : (
          <View className="flex-col items-center justify-center">
            <Text className="text-textPrimary">Total Receipt</Text>
            <Text className="text-textPrimary">
              $ {totalReceiptAmount.formatted}
            </Text>
          </View>
        )}
        <View className="flex-col items-center justify-center">
          <Text className="text-textPrimary">Trip Start Time</Text>
          <Text className="text-textPrimary">
            {trip ? formatTime(trip?.start_time) : "00:00 AM"}
          </Text>
        </View>
        <View className="flex-col items-center justify-center">
          <Text className="text-textPrimary">Trip End Time</Text>
          <Text className="text-textPrimary">
            {trip && trip?.end_time ? formatTime(trip?.end_time) : "00:00 AM"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TripDetailHeaderCard;
