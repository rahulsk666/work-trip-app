import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useUserQuery } from "@/module/profile/hooks";
import ImageUpload from "@/module/trip/components/ImageUpload";
import { router } from "expo-router";
import React, { useState } from "react";
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
  useCreateReceiptMutation,
  useEditReceiptMutation,
  useReceiptCreateForm,
} from "../hooks";

const ReceiptForm = ({ tripId }: { tripId?: string }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: user } = useUserQuery();
  const { handleSubmit, control } = useReceiptCreateForm();
  const { mutateAsync: createReceipt, isPending: isCreating } =
    useCreateReceiptMutation();
  const { mutateAsync: editReceipt, isPending: isEditing } =
    useEditReceiptMutation();
  const receiptImage = useImageUpload({ bucket: "receipts" });
  const isLoading = isCreating || isEditing || isSubmitting;

  const err = (msg?: string) => msg ? t(msg) : undefined;

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    if (!receiptImage.asset) return toast.error(t("errors.receipt_image_required"));

    setIsSubmitting(true);
    try {
      const receipt = await createReceipt({
        ...data,
        trip_id: tripId,
        user_id: user?.id,
        status: "PENDING",
      });

      const receiptImageUrl = await receiptImage.upload(`${receipt.id}`);

      await editReceipt({
        id: receipt.id,
        data: { image_url: receiptImageUrl },
      });

      toast.success(t("receipt_form.receipt_added_successfully"));
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
      {isLoading && (
        <Loading showBackground={false} label={t("receipt_form.adding_receipt")} />
      )}
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
          {/* Dashboard photo */}
          <View>
            <Text className="text-textSecondary text-base mt-2">
              {`${t("receipt_form.receipt_image")} *`}
            </Text>
            <View className="justify-center flex-row items-center gap-2 mt-2">
              <ImageUpload
                name={t("receipt_form.receipt_image")}
                pickImageCamera={receiptImage.pickImageCamera}
                uploading={receiptImage.uploading}
                preview={receiptImage.preview}
              />
            </View>
            <Text className="text-textMuted mt-2">
              {t("receipt_form.receipt_image_note")}
            </Text>
          </View>
          {/* Amount */}
          <View className="gap-2">
            <Text className="text-textSecondary text-base mt-2">{`${t("common.amount")} *`}</Text>
            <Controller
              name={"amount"}
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  value={field.value?.toString() ?? ""}
                  onChange={(val) =>
                    field.onChange(val ? Number(val) : undefined)
                  }
                  type="number-pad"
                  error={err(fieldState.error?.message)}
                  prefix="$"
                  onSubmitEditing={Keyboard.dismiss}
                />
              )}
            />
          </View>
          {/* Description */}
          <View className="gap-2">
            <Text className="text-textSecondary text-base mt-2">
              {`${t("common.description")} *`}
            </Text>
            <Controller
              name={"description"}
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  value={field.value?.toString() ?? ""}
                  type="default"
                  error={err(fieldState.error?.message)}
                  multiline
                  numberOfLines={2}
                  onSubmitEditing={Keyboard.dismiss}
                />
              )}
            />
          </View>
          <View className="items-center mt-4">
            <Button
              text={isLoading ? t("receipt_form.adding_receipt") : t("receipt_form.add_receipt")}
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
    </>
  );
};

export default ReceiptForm;
