import { zodResolver } from "@hookform/resolvers/zod";
import { PostgrestError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { accidentApi } from "../api/accident.api";
import { accidentKeys } from "../constants/accident.key";
import {
  AccidentCreate,
  accidentCreateSchema,
  AccidentEdit,
} from "../schemas/accident.schema";

// trip mutations

export const useCreateAccidentMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AccidentCreate) => accidentApi.create(data),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: accidentKeys.all });
    },

    onError: (err: PostgrestError | Error) => {
      console.log(err);
      toast.error("Failed to create accident history. Please try again");
    },
  });
};

export const useEditAccidentMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AccidentEdit }) =>
      accidentApi.edit(id, data),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: [accidentKeys.all],
      });
      await qc.refetchQueries({ queryKey: accidentKeys.all });
    },

    onError: () => console.error("Failed to update accident. Please try again"),
  });
};

// form hook

export const useAccidentCreateForm = () =>
  useForm({
    resolver: zodResolver(accidentCreateSchema),
    defaultValues: {
      description: "",
      location: "",
    },
  });
