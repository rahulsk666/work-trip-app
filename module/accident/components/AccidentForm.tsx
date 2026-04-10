import AppMapView from "@/components/AppMapView";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useRequestLocation } from "@/hooks/useRequestLocation";
import { useUserQuery } from "@/module/profile/hooks";
import ImageUpload from "@/module/trip/components/ImageUpload";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import {
  useAccidentCreateForm,
  useCreateAccidentMutation,
  useEditAccidentMutation,
} from "../hooks";

interface AccidentFormProps {
  tripId?: string;
}

const AccidentForm = ({ tripId }: AccidentFormProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { location, displayCurrentAddress, requestLocation } =
    useRequestLocation();
  const { handleSubmit, control } = useAccidentCreateForm();
  const { data: user } = useUserQuery();
  const { mutateAsync: createAccident, isPending: isCreating } =
    useCreateAccidentMutation();
  const { mutateAsync: editAccident, isPending: isEditing } =
    useEditAccidentMutation();

  const accidentImage1 = useImageUpload({ bucket: "accidents" });
  const accidentImage2 = useImageUpload({ bucket: "accidents" });
  const accidentImage3 = useImageUpload({ bucket: "accidents" });

  const isLoading = isCreating || isEditing || isSubmitting;

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    if (!accidentImage1.asset)
      return toast.error(t("errors.accident_image_required"));
    if (!location) {
      toast.error(t("errors.location_services_disabled"));
    }

    setIsSubmitting(true);
    try {
      const accident = await createAccident({
        ...data,
        trip_id: tripId,
        user_id: user?.id,
        location: `POINT(${location?.coords.longitude} ${location?.coords.latitude})`,
      });
      const accidentImage1Url = await accidentImage1.upload(
        `${accident.id}/accidentimage1`,
      );
      if (accidentImage2.asset) {
        await accidentImage1.upload(`${accident.id}/accidentimage2`);
      }

      if (accidentImage3.asset) {
        await accidentImage1.upload(`${accident.id}/accidentimage3`);
      }

      await editAccident({
        id: accident.id,
        data: { photo_url: accidentImage1Url },
      });

      toast.success(t("errors.accident_reported_successfully"));
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error(t("errors.something_went_wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  if (isLoading) {
    return <Loading label={t("errors.reporting_accident")} showBackground={false} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 16, // ✅ accounts for nav bar
        }}
        keyboardShouldPersistTaps="handled"
        className="gap-2"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <AppMapView
            mode={{
              type: "live",
              location,
              requestLocation,
              displayCurrentAddress,
            }}
            label={t("accident_form.accident_location")}
            markerTitle={t("errors.current_location")}
            height={180}
          />
        </View>

        <View>
          <Text className="text-textSecondary text-base mt-2">
            {`${t("accident_form.accident_image")} *`}
          </Text>
          <View className="justify-center flex-row items-center gap-2 mt-2">
            <ImageUpload
              name={t("accident_form.accident_image")}
              pickImageCamera={accidentImage1.pickImage}
              uploading={accidentImage1.uploading}
              preview={accidentImage1.preview}
            />
            <ImageUpload
              name={t("accident_form.accident_image")}
              pickImageCamera={accidentImage2.pickImage}
              uploading={accidentImage2.uploading}
              preview={accidentImage2.preview}
            />
            <ImageUpload
              name={t("accident_form.accident_image")}
              pickImageCamera={accidentImage3.pickImage}
              uploading={accidentImage3.uploading}
              preview={accidentImage3.preview}
            />
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-textSecondary text-base mt-2">
            {t("accident_form.description")}
          </Text>
          <Controller
            name={"description"}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                value={field.value?.toString() ?? ""}
                type="default"
                error={fieldState.error?.message}
                multiline
                numberOfLines={5}
                onSubmitEditing={Keyboard.dismiss}
              />
            )}
          />
        </View>
        <View className="items-center" style={{ marginTop: 10 }}>
          <Button
            text={isLoading ? t("accident_form.reporting_accident") : t("accident_form.report_accident")}
            classname="w-full m-2"
            onPress={handleSubmit(
              (data) => onSubmit(data),
              (error) => {
                console.log(error);
                toast.error(t("errors.fill_required_fields"));
              },
            )}
            disabled={isLoading}
            style={{ width: "100%" }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AccidentForm;
