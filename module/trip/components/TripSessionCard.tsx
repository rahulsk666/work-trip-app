import StatusBadge from "@/components/StatusBadge";
import StatusDot from "@/components/StatusDot";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAddress } from "@/hooks/useAddress";
import { useDuration } from "@/hooks/useDuration";
import { APP_COLORS } from "@/lib/consts";
import { formatTime } from "@/lib/formatTime";
import { decimalToDMS } from "@/lib/location";
import { useLatestWorkQuery } from "@/module/work/hooks";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useLatestTripQuery } from "../hooks";
import TripCountDown from "./TripCountdown";

const TripSessionCard = () => {
  const { t } = useTranslation();
  const { data: trip } = useLatestTripQuery();
  const { data: work } = useLatestWorkQuery(trip?.id);
  const duration = useDuration(
    trip?.start_time ?? "",
    trip?.end_time,
    trip?.trip_date,
  );
  const { coords } = useAddress(trip?.current_location);

  return (
    <>
      <View
        className="m-2 p-2 bg-darkCharcoal rounded-xl"
        style={{ backgroundColor: APP_COLORS.darkCharcoal, maxHeight: "60%" }}
      >
        <View className="p-2 flex-row justify-between items-center">
          <View className="flex-row gap-3 items-center">
            <StatusDot
              active
              color={trip?.end_time ? APP_COLORS.danger : APP_COLORS.success}
            />
            <Text className="text-lg font-bold text-textPrimary">
              {trip?.end_time ? t("trip_track.session_stopped") : t("trip_track.session_active")}
            </Text>
          </View>
          <View>
            <Text className="text-textPrimary text-sm">
              {t("trip_track.date")}: {trip?.trip_date}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: APP_COLORS.cardElevated,
            marginTop: 4,
          }}
        />
        <TripCountDown duration={duration} />
        <View className="p-2 justify-center items-center">
          <Text className="text-textSecondary font-bold">
            {t("trip_track.started_at")} {formatTime(trip?.start_time as string)}
          </Text>
        </View>
        <View style={{ height: 120 }}>
          <Image
            source={require("@/assets/map-fallback.png")}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              opacity: 0.5,
              borderRadius: 10,
              position: "relative",
            }}
          />
          {/* Dark overlay shade */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: APP_COLORS.darkCharcoal, // ← adjust opacity here
              opacity: 0.5,
              borderRadius: 10,
            }}
          />
          <View
            className="flex-row justify-center items-center"
            style={{
              position: "absolute",
              top: 42,
              left: 30,
              gap: 10,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderRadius: 100,
                borderColor: APP_COLORS.primary,
                padding: 5,
              }}
            >
              <IconSymbol
                name="location.viewfinder"
                size={30}
                color={APP_COLORS.primary}
              />
            </View>
            <View className="flex-col items-start">
              <Text className="text-primary text-xl font-bold">
                {t("trip_track.current_location")}
              </Text>
              <Text className="text-textPrimary">
                {coords && coords.latitude && coords.longitude
                  ? `${decimalToDMS(coords.latitude.toFixed(5), "lat")}, ${decimalToDMS(coords.longitude.toFixed(5), "lng")}`
                  : t("common.fetching_address")}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="p-2 justify-center items-center rounded-xl bg-danger/60"
          style={{
            borderWidth: 1,
            borderColor:
              trip?.end_time || work?.status === "STARTED"
                ? APP_COLORS.textMuted
                : APP_COLORS.danger,
            marginTop: 20,
            backgroundColor:
              trip?.end_time || work?.status === "STARTED"
                ? APP_COLORS.darkCharcoal
                : APP_COLORS.dangerShadow,
          }}
          activeOpacity={0.9}
          disabled={!!trip?.end_time || work?.status === "STARTED"}
          onPress={() => router.replace("/(trip)/stop")}
        >
          <Text
            className={`text-xl font-bold ${trip?.end_time || work?.status === "STARTED" ? "text-textMuted" : "text-danger"}`}
          >
            {t("trip_track.trip_stopped")}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-start items-center gap-3 m-2 p-2">
        <StatusBadge
          label={coords ? t("trip_track.gps_locked") : t("trip_track.gps_disconnected")}
          logoType="icon"
          iconName={coords ? "lock-closed" : "lock-open"}
          color={coords ? APP_COLORS.successDark : APP_COLORS.danger}
          textColor={APP_COLORS.textSecondary}
          borderColor={APP_COLORS.textSecondary}
        />
        <StatusBadge
          label={trip ? t("trip_track.data_synced") : t("common.offline")}
          logoType="icon"
          iconName={trip ? "cloud-done" : "cloud-offline"}
          color={trip ? APP_COLORS.primaryDark : APP_COLORS.textMuted}
          textColor={trip ? APP_COLORS.textSecondary : APP_COLORS.textMuted}
          borderColor={trip ? APP_COLORS.textSecondary : APP_COLORS.textMuted}
          classname="text-xl"
        />
      </View>
    </>
  );
};

export default TripSessionCard;
