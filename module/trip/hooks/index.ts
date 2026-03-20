import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { tripApi } from "../api/trip.api";
import { tripKeys } from "../constants/trip.key";
import {
  TripCreate,
  tripCreateSchema,
  TripEdit,
  tripEditSchema,
} from "../schemas/trip.schema";

// use trip queries
export const useTripQuery = () =>
  useQuery({
    queryKey: tripKeys.getAll(),
    queryFn: () => tripApi.getAll(),
  });

export const useTripByIdQuery = (id: string) =>
  useQuery({
    queryKey: tripKeys.getById(id),
    queryFn: () => tripApi.getById(id),
    enabled: !id,
  });

// user mutations

export const useCreateTripMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: TripCreate) => tripApi.create(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tripKeys.all });
      toast.success("Trip started successfully 🚗");
    },

    onError: () => toast.error("Failed to start trip. Please try again"),
  });
};
export const useEditUserMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TripEdit }) =>
      tripApi.edit(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tripKeys.all });
      toast.success("Trip started successfully 🚗");
    },

    onError: () => toast.error("Failed to start trip. Please try again"),
  });
};

// form hook

export const useTripCreateForm = () =>
  useForm({
    resolver: zodResolver(tripCreateSchema),
    defaultValues: {
      vehicle_id: "",
      trip_date: "",
      start_time: "",
      start_km: "",
      start_location: "",
    },
  });

export const useTripEditForm = (defaultValues?: TripEdit) =>
  useForm({
    resolver: zodResolver(tripEditSchema),
    defaultValues: defaultValues as TripEdit,
  });
