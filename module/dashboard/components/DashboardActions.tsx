import ConfirmModal from "@/components/ConfirmModal";
import { useDuration } from "@/hooks/useDuration";
import { useRequestLocation } from "@/hooks/useRequestLoaction";
import { APP_COLORS } from "@/lib/consts";
import { getLocalDateTime } from "@/lib/date";
import { useUserQuery } from "@/module/profile/hooks";
import { useLatestTripQuery } from "@/module/trip/hooks";
import {
  useCreateWorkMutation,
  useEndWorkMutation,
  useLatestWorkQuery,
} from "@/module/work/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

const DashboardActions = () => {
  const [modal, setModal] = useState<{
    title: string;
    visible: boolean;
    onConfirm: () => void;
  }>({
    title: "",
    visible: false,
    onConfirm: () => {},
  });
  const { data: user } = useUserQuery();
  const { data: trip } = useLatestTripQuery();
  const { data: work } = useLatestWorkQuery(trip?.id);
  const { mutateAsync: createWork } = useCreateWorkMutation();
  const { mutateAsync: endWork } = useEndWorkMutation();
  const { location, requestLocation } = useRequestLocation();
  const duration = useDuration(
    work?.start_time ?? "",
    work?.end_time,
    trip?.trip_date,
  );

  const handleWorkCreate = () => {
    requestLocation();
    setModal({
      title: "Start Work ?",
      visible: true,
      onConfirm: async () => {
        closeModal();

        if (!location) {
          toast.error("Please enable location services");
          return;
        }
        if (!trip?.id) {
          toast.error("No active trip found");
          return;
        }
        if (!user?.id) {
          toast.error("Please try again.");
          return;
        }

        await createWork({
          user_id: user.id,
          location: `POINT(${location.coords.longitude} ${location.coords.latitude})`,
          status: "STARTED",
          start_time: getLocalDateTime(),
          trip_id: trip.id,
        });
      },
    });
  };

  const closeModal = () =>
    setModal({ title: "", visible: false, onConfirm: () => {} });

  const handleWorkEdit = async (id: string) => {
    setModal({
      title: "Stop Work ?",
      visible: true,
      onConfirm: async () => {
        closeModal();
        await endWork({
          id,
          data: { end_time: getLocalDateTime(), status: "ENDED" },
        });
      },
    });
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <View className="flex-row gap-3" style={{ marginVertical: 20 }}>
      {trip && !trip?.end_time ? (
        <View className="flex-1 flex-row gap-3">
          {work && work.status === "STARTED" ? (
            <TouchableOpacity
              className="flex-1 p-2 m-1 flex-row items-center justify-center rounded-2xl"
              style={{
                backgroundColor: APP_COLORS.dangerShadow,
                borderWidth: 1,
                borderColor: APP_COLORS.dangerDark,
                gap: 12,
              }}
              onPress={() => handleWorkEdit(work?.id)}
              disabled={!!work.end_time}
            >
              <Ionicons
                name="stop-circle"
                size={34}
                color={APP_COLORS.dangerDark}
              />
              <Text
                className="text-xl"
                style={{ color: APP_COLORS.dangerDark, fontWeight: 900 }}
              >
                Stop {"\n"}Work
              </Text>
              {duration && (
                <Text
                  className="text-3xl font-bold"
                  style={{ color: APP_COLORS.dangerDark }}
                >
                  {duration?.formatted}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-1 p-5 m-1 items-center justify-center flex-row gap-2 rounded-2xl"
              style={{ backgroundColor: APP_COLORS.successButton }}
              onPress={handleWorkCreate}
            >
              <Ionicons
                name="play-circle"
                size={34}
                color={APP_COLORS.successText}
              />
              <Text
                className="text-3xl font-bold"
                style={{ color: APP_COLORS.successText }}
              >
                Start Work
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : !trip?.end_time ? (
        <TouchableOpacity
          className="bg-primary flex-1 flex-row p-5 m-1 gap-2 items-center justify-center rounded-2xl"
          onPress={() => router.navigate("/(trip)/start")}
        >
          <Ionicons name="play" size={30} color={APP_COLORS.textPrimary} />
          <Text className="text-textPrimary text-3xl font-bold">
            Start Trip
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <ConfirmModal
        visible={modal.visible}
        title={modal.title}
        onCancel={closeModal}
        onConfirm={modal.onConfirm}
      />
    </View>
  );
};

export default DashboardActions;
