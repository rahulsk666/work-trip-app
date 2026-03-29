import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useUserQuery } from "@/module/profile/hooks";
import ImageUpload from "@/module/trip/components/ImageUpload";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { toast } from "sonner-native";
import {
  useCreateReceiptMutation,
  useEditReceiptMutation,
  useReceiptCreateForm,
} from "../hooks";

const ReceiptForm = ({ tripId }: { tripId?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: user } = useUserQuery();
  const { handleSubmit, control } = useReceiptCreateForm();
  const { mutateAsync: createReceipt, isPending: isCreating } =
    useCreateReceiptMutation();
  const { mutateAsync: editReceipt, isPending: isEditing } =
    useEditReceiptMutation();
  const receiptImage = useImageUpload({ bucket: "receipts" });
  const isLoading = isCreating || isEditing || isSubmitting;

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    if (!receiptImage.asset) return toast.error("Receipt image required");

    setIsSubmitting(true);
    try {
      const receipt = await createReceipt({
        ...data,
        trip_id: tripId,
        user_id: user?.id,
      });

      const receiptImageUrl = await receiptImage.upload(`${receipt.id}`);

      await editReceipt({
        id: receipt.id,
        data: { image_url: receiptImageUrl },
      });

      toast.success("Receipt Added successfully");
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Loading showBackground={false} label="Adding Receipt..." />
      )}
      <View>
        {/* Dashboard photo */}
        <View>
          <Text className="text-textSecondary text-base mt-2">
            Receipt Photo *
          </Text>
          <View className="justify-center flex-row items-center gap-2 mt-2">
            <ImageUpload
              name={"Receipt Image"}
              pickImageCamera={receiptImage.pickImageCamera}
              uploading={receiptImage.uploading}
              preview={receiptImage.preview}
            />
          </View>
          <Text className="text-textMuted mt-2">
            Take clear photo of the Receipt
          </Text>
        </View>
        {/* Amount */}
        <View className="gap-2">
          <Text className="text-textSecondary text-base mt-2">Amount *</Text>
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
                error={fieldState.error?.message}
                prefix="$"
              />
            )}
          />
        </View>
        {/* Description */}
        <View className="gap-2">
          <Text className="text-textSecondary text-base mt-2">
            Description *
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
                numberOfLines={2}
              />
            )}
          />
        </View>
        <View className="items-center mt-4">
          <Button
            text={isLoading ? "Adding receipt..." : "Add Receipt"}
            classname="w-full m-2"
            onPress={handleSubmit(
              (data) => onSubmit(data),
              (error) => {
                console.log(error);
                toast.error("Please fill in all required fields");
              },
            )}
            disabled={isLoading}
            style={{ width: "100%" }}
          />
        </View>
      </View>
    </>
  );
};

export default ReceiptForm;
