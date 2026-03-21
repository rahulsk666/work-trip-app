import Button from "@/components/Button";
import Input from "@/components/Input";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useUserQuery } from "@/module/profile/hooks";
import TripImageUpload from "@/module/trip/components/TripImageUpload";
import VehicleStatusCard from "@/module/trip/components/VehicleStatusCard";
import {
  useCreateTripMutation,
  useEditTripMutation,
  useTripCreateForm,
} from "@/module/trip/hooks";
import { Vehicle } from "@/module/vehicle/schemas/vehicle.schema";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { toast } from "sonner-native";

const StartTripForm = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<
    string | null
  >(null);
  const { handleSubmit, control } = useTripCreateForm();
  const { data: user } = useUserQuery();
  const { mutateAsync: createTrip, isPending } = useCreateTripMutation();
  const { mutateAsync: editTrip } = useEditTripMutation();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const dashboardImage1 = useImageUpload({
    bucket: "trip_dashboard",
  });

  useEffect(() => {
    requestLocation();
  }, []);

  async function requestLocation() {
    try {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        toast.error("Please enable location services in your device settings");
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.error("Location permission is required to start a trip");
        return;
      }

      const accurate = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(accurate);

      // if (accurate) {
      const { latitude, longitude } = accurate.coords;
      console.log(latitude, longitude);

      //provide lat and long to get the the actual address
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(response);
      //loop on the responce to get the actual result
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
      // }
    } catch (err: any) {
      if (location) return; // silently ignore if we already have a location

      if (err?.message?.includes("Current location is unavailable")) {
        toast.error("GPS unavailable. Please tap Refresh to try again.");
      } else {
        toast.error(
          "Unable to get location. Please check your device settings.",
        );
      }
    }
  }

  const onSubmit = async (data: any) => {
    try {
      if (!vehicle) {
        toast.error("Vehicle required");
        return;
      }
      if (!location) {
        toast.error("Location permission is required to start a trip");
        return;
      }
      if (!dashboardImage1.asset) {
        toast.error("Dashboard Image required");
        return;
      }

      const trip = await createTrip({
        ...data,
        user_id: user?.id,
        vehicle_id: vehicle.id,
        trip_date: new Date().toISOString(),
        start_time: new Date().toISOString(),
        start_location: `POINT(${location.coords.longitude} ${location.coords.latitude})`,
      });

      let startUrl;
      if (dashboardImage1.asset) {
        startUrl = await dashboardImage1.upload(`${trip.id}/start-image`);
      }

      // // 3️⃣ Save URLs
      await editTrip({
        id: trip.id,
        data: {
          start_image: startUrl,
        },
      });
      toast.success("Trip started successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to start trip");
    }
  };

  return (
    <View className="m-2 mx-4 p-2 rounded-lg">
      <Controller
        name="vehicle_id"
        control={control}
        render={({ field, fieldState }) => (
          <VehicleStatusCard
            vehicle={vehicle}
            onChange={(vId, v) => {
              field.onChange(vId);
              setVehicle(v);
            }}
            locationShared={location !== null}
            error={fieldState.error?.message}
          />
        )}
      />

      <View className="gap-2">
        <Text className="text-textSecondary text-base mt-2">
          Odometer Reading *
        </Text>

        <Controller
          name="start_km"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              value={field.value?.toString() ?? ""}
              onChange={(val) => field.onChange(val ? Number(val) : undefined)}
              type="numeric"
              error={fieldState.error?.message}
            />
          )}
        />
      </View>
      <View>
        <Text className="text-textSecondary text-base mt-2">
          Dashboard Photo *
        </Text>
        <View className="justify-center flex-row items-center gap-2 mt-2">
          <TripImageUpload
            pickImage={dashboardImage1.pickImage}
            uploading={dashboardImage1.uploading}
            preview={dashboardImage1.preview}
          />
        </View>
        <Text className="text-textMuted mt-2">
          Photo must clearly show the odometer reading
        </Text>
      </View>
      <View>
        <View className="flex-row justify-between">
          <Text className="text-textSecondary text-base mt-5">
            Starting Location
          </Text>
          <TouchableOpacity onPress={requestLocation}>
            <Text className="text-primary font-bold">Refresh</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderRadius: 16,
            overflow: "hidden",
            height: 180,
            width: "100%",
            marginTop: 8,
          }}
          className="h-52 w-full mt-2"
        >
          {location ? (
            <View className="flex-1">
              <MapView
                style={{ width: "100%", height: "100%" }}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                showsUserLocation
                showsMyLocationButton
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Start Location"
                />
              </MapView>
              <View
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: 0,
                  right: 0,
                  padding: 6,
                }}
              >
                <Text className="text-sm text-textMuted font-bold">
                  {displayCurrentAddress}
                </Text>
                <Text className="text-xs text-textMuted font-bold">
                  {`Lat: ${location.coords.latitude.toFixed(4)}, Lng: ${location.coords.longitude.toFixed(4)}`}
                </Text>
              </View>
            </View>
          ) : (
            <Image
              source={require("@/assets/map-fallback.png")}
              alt="map-image"
              className="rounded-xl"
              style={{ width: "100%", height: 150 }}
            />
          )}
        </View>
      </View>
      <View className="items-center mt-6">
        <Button
          text={"Start Trip"}
          classname="w-full m-2"
          onPress={handleSubmit((data) => onSubmit(data))}
          disabled={isPending}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
};

export default StartTripForm;
