import Loading from "@/components/Loading";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useRequestLocation } from "@/hooks/useRequestLocation";
import { getLocalDateTime } from "@/lib/date";
import TripFormUI from "@/module/trip/components/TripFormUI";
import {
  useEditTripMutation,
  useInsertVehiclePhotosMutation,
  useLatestTripQuery,
  useTripEndForm,
} from "@/module/trip/hooks";
import { VehiclePhoto } from "@/module/trip/schemas/trip.schema";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";

const StopTripForm = () => {
  const { t } = useTranslation();
  const { location, displayCurrentAddress, requestLocation } =
    useRequestLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useTripEndForm();
  const { data: todayTrip } = useLatestTripQuery();
  const { mutateAsync: editTrip, isPending: isEditing } = useEditTripMutation();
  const { mutateAsync: insertVehiclePhotos } = useInsertVehiclePhotosMutation();

  const isLoading = isSubmitting || isEditing;

  const dashboardImage = useImageUpload({ bucket: "trip_dashboard" });
  const frontImage = useImageUpload({ bucket: "trip_dashboard" });
  const backImage = useImageUpload({ bucket: "trip_dashboard" });
  const leftImage = useImageUpload({ bucket: "trip_dashboard" });
  const rightImage = useImageUpload({ bucket: "trip_dashboard" });

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    if (!todayTrip) return toast.error("No active trip found");

    if (!location) {
      toast.info(t("errors.getting_your_location_please_try_again_in_a_moment"));
      requestLocation(); //retry
      return;
    }
    if (data.end_km && todayTrip.start_km) {
      if (Number(data.end_km) <= todayTrip.start_km) {
        return toast.error(
          `End KM must be greater than Start KM (${todayTrip.start_km} km)`,
        );
      }
    }
    if (!dashboardImage.asset) return toast.error(t("errors.dashboard_image_required"));
    if (!frontImage.asset) return toast.error(t("errors.front_image_required"));
    if (!backImage.asset) return toast.error(t("errors.back_image_required"));
    if (!leftImage.asset) return toast.error(t("errors.left_image_required"));
    if (!rightImage.asset) return toast.error(t("errors.right_image_required"));

    setIsSubmitting(true);
    try {
      const [endUrl, frontUrl, backUrl, leftUrl, rightUrl] = await Promise.all([
        dashboardImage.upload(`${todayTrip.id}/end-image`),
        frontImage.upload(`${todayTrip.id}/end-front`),
        backImage.upload(`${todayTrip.id}/end-back`),
        leftImage.upload(`${todayTrip.id}/end-left`),
        rightImage.upload(`${todayTrip.id}/end-right`),
      ]);

      const vehiclePhotos = [
        { trip_id: todayTrip.id, photo_type: "END_FRONT", photo_url: frontUrl },
        { trip_id: todayTrip.id, photo_type: "END_BACK", photo_url: backUrl },
        { trip_id: todayTrip.id, photo_type: "END_LEFT", photo_url: leftUrl },
        { trip_id: todayTrip.id, photo_type: "END_RIGHT", photo_url: rightUrl },
      ].filter((p) => p.photo_url);

      if (vehiclePhotos.length > 0) {
        await insertVehiclePhotos(vehiclePhotos as VehiclePhoto[]);
      }

      await editTrip({
        id: todayTrip.id,
        data: {
          ...data,
          status: "ENDED",
          end_time: getLocalDateTime(),
          end_location: `POINT(${location.coords.longitude} ${location.coords.latitude})`,
          end_image: endUrl,
        },
      });

      toast.success(t("trip_form.trip_ended_successfully"));
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error(t("errors.something_went_wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <Loading showBackground={false} label={t("trip_form.stopping_trip")} />}
      <TripFormUI
        mode="stop"
        trip={todayTrip}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        location={location}
        displayCurrentAddress={displayCurrentAddress}
        requestLocation={requestLocation}
        dashboardImage={dashboardImage}
        frontImage={frontImage}
        backImage={backImage}
        leftImage={leftImage}
        rightImage={rightImage}
      />
    </>
  );
};

export default StopTripForm;
