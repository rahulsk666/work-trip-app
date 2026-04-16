import Loading from "@/components/Loading";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useRequestLocation } from "@/hooks/useRequestLocation";
import { getLocalDate, getLocalDateTime } from "@/lib/date";
import { useUserQuery } from "@/module/profile/hooks";
import TripFormUI from "@/module/trip/components/TripFormUI";
import {
  useCreateTripMutation,
  useEditTripMutation,
  useInsertVehiclePhotosMutation,
  useLatestTripQuery,
  useTripCreateForm,
} from "@/module/trip/hooks";
import { VehiclePhoto } from "@/module/trip/schemas/trip.schema";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";

const StartTripForm = () => {
  const { t } = useTranslation();
  const { location, displayCurrentAddress, requestLocation } =
    useRequestLocation();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useTripCreateForm();
  const { data: user } = useUserQuery();
  const { data: todayTrip } = useLatestTripQuery();
  const { mutateAsync: createTrip, isPending: isCreating } =
    useCreateTripMutation();
  const { mutateAsync: editTrip, isPending: isEditing } = useEditTripMutation();
  const { mutateAsync: insertVehiclePhotos } = useInsertVehiclePhotosMutation();

  const isLoading = isSubmitting || isCreating || isEditing;

  const dashboardImage = useImageUpload({ bucket: "trip_dashboard" });
  const frontImage = useImageUpload({ bucket: "trip_dashboard" });
  const backImage = useImageUpload({ bucket: "trip_dashboard" });
  const leftImage = useImageUpload({ bucket: "trip_dashboard" });
  const rightImage = useImageUpload({ bucket: "trip_dashboard" });

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    if (todayTrip)
      return toast.error(t("errors.a_trip_has_already_been_started_for_today"));
    if (!vehicle) return toast.error(t("errors.vehicle_required"));
    if (!location) return toast.error(t("errors.location_required_to_start_a_trip"));
    if (!dashboardImage.asset) return toast.error(t("errors.dashboard_image_required"));
    if (!frontImage.asset) return toast.error(t("errors.front_image_required"));
    if (!backImage.asset) return toast.error(t("errors.back_image_required"));
    if (!leftImage.asset) return toast.error(t("errors.left_image_required"));
    if (!rightImage.asset) return toast.error(t("errors.right_image_required"));

    setIsSubmitting(true);
    try {
      const trip = await createTrip({
        ...data,
        status: "STARTED",
        user_id: user?.id,
        vehicle_id: vehicle.id,
        trip_date: getLocalDate(),
        start_time: getLocalDateTime(),
        start_location: `POINT(${location.coords.longitude} ${location.coords.latitude})`,
      });

      const [startUrl, frontUrl, backUrl, leftUrl, rightUrl] =
        await Promise.all([
          dashboardImage.upload(`${trip.id}/start-image`),
          frontImage.asset ? frontImage.upload(`${trip.id}/front`) : null,
          backImage.asset ? backImage.upload(`${trip.id}/back`) : null,
          leftImage.asset ? leftImage.upload(`${trip.id}/left`) : null,
          rightImage.asset ? rightImage.upload(`${trip.id}/right`) : null,
        ]);

      const vehiclePhotos = [
        { trip_id: trip.id, photo_type: "START_FRONT", photo_url: frontUrl },
        { trip_id: trip.id, photo_type: "START_BACK", photo_url: backUrl },
        { trip_id: trip.id, photo_type: "START_LEFT", photo_url: leftUrl },
        { trip_id: trip.id, photo_type: "START_RIGHT", photo_url: rightUrl },
      ].filter((p) => p.photo_url);

      if (vehiclePhotos.length > 0) {
        await insertVehiclePhotos(vehiclePhotos as VehiclePhoto[]);
      }

      await editTrip({ id: trip.id, data: { start_image: startUrl } });

      toast.success(t("trip_form.trip_started_successfully"));
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
      {isLoading && <Loading showBackground={false} label={t("trip_form.starting_trip")} />}
      <TripFormUI
        mode="start"
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
        location={location}
        displayCurrentAddress={displayCurrentAddress}
        requestLocation={requestLocation}
        vehicle={vehicle}
        onVehicleChange={(_, v) => setVehicle(v)}
        dashboardImage={dashboardImage}
        frontImage={frontImage}
        backImage={backImage}
        leftImage={leftImage}
        rightImage={rightImage}
      />
    </>
  );
};

export default StartTripForm;
