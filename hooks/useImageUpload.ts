import { supabase } from "@/integrations/supabase/supabase";
import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { toast } from "sonner-native";

interface useImageUploadProps {
  bucket: string;
  /** File path within the bucket e.g. "user-id".Extension is default. Defaults to timestamp-based name */
  path?: string;
  onUpload?: (uri: string) => void;
  onError?: (error: Error) => void;
}

interface useImageUploadResponse {
  preview: string | null;
  uploading: boolean;
  pickAndUpload: () => Promise<void>;
  pickImage: () => void;
  pickImageCamera: () => void;
  upload: (path: string) => Promise<string>;
  asset: ImagePicker.ImagePickerAsset | null;
  reset: () => void;
}

export const useImageUpload = ({
  bucket,
  path,
  onUpload,
  onError,
}: useImageUploadProps): useImageUploadResponse => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [asset, setAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickAndUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") throw new Error("Permission denied");

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled || !result.assets[0]) return;

      const asset = result.assets[0];
      if (!asset.base64) throw new Error("Failed to read image");

      setUploading(true);
      setPreview(asset.uri);

      const ext = asset.uri.split(".").pop() ?? "jpg";
      const filePath = path ? `${path}.${ext}` : `${Date.now()}.${ext}`;
      const contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, decode(asset.base64), {
          contentType,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      const cacheBustedUrl = `${data.publicUrl}?t=${Date.now()}`;
      onUpload?.(cacheBustedUrl);
    } catch (err) {
      setPreview(null);
      onError?.(err as Error);
    } finally {
      setUploading(false);
    }
  };
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") throw new Error("Permission denied");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled || !result.assets[0]) return;

    const selected = result.assets[0];

    setAsset(selected);
    setPreview(selected.uri);
  };

  const pickImageCamera = async () => {
    const enabled = await ImagePicker.requestCameraPermissionsAsync();
    if (!enabled) {
      toast.error("Please enable Camera permissions in your device settings");
      return;
    }
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    if (status !== "granted") {
      toast.error("Please enable Camera permissions in your device settings");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled || !result.assets[0]) return;

    const selected = result.assets[0];

    setAsset(selected);
    setPreview(selected.uri);
  };

  // 🚀 Upload AFTER trip created
  const upload = async (path: string) => {
    if (!asset || !asset.base64) {
      throw new Error("No image selected");
    }

    try {
      setUploading(true);

      const ext = asset.uri.split(".").pop() ?? "jpg";
      const filePath = `${path}.${ext}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, decode(asset.base64), {
          contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
          upsert: true,
        });

      if (error) throw error;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return `${data.publicUrl}?t=${Date.now()}`;
    } finally {
      setUploading(false);
    }
  };

  const reset = () => setPreview(null);

  return {
    preview,
    uploading,
    pickAndUpload,
    reset,
    pickImage,
    pickImageCamera,
    upload,
    asset,
  };
};
