import { useUserQuery } from "@/module/profile/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostgrestError } from "@supabase/supabase-js";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { receiptApi } from "../api/receipt.api";
import { receiptKeys } from "../constants/receipt.key";
import {
  ReceiptCreate,
  receiptCreateSchema,
  ReceiptEdit,
} from "../schemas/receipt.schema";

// use receipt queries
export const useReceiptPaginatedQuery = (
  tripId: string | undefined,
  pageSize?: number,
) => {
  const { data: user } = useUserQuery();
  return useInfiniteQuery({
    queryKey: receiptKeys.getByPagination(tripId),
    queryFn: ({ pageParam }) =>
      receiptApi.getByPagination(
        user!.id,
        tripId as string,
        pageParam as number,
        pageSize,
      ),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: !!user?.id && !!tripId,
  });
};

export const useReceiptByIdQuery = (id: string) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: receiptKeys.getById(id),
    queryFn: () => receiptApi.getById(id),
    enabled: !!id && !!user?.id,
  });
};

export const useLatestReceiptQuery = (tripId: string | undefined) => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: receiptKeys.latest(tripId),
    queryFn: () => receiptApi.getLatestWork(user!.id, tripId as string),
    enabled: !!user?.id && !!tripId,
  });
};

export const useReceiptByTripQuery = ({ tripId }: { tripId?: string }) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: receiptKeys.getByAll(tripId),
    queryFn: () => receiptApi.getAll(user!.id, tripId as string),
    enabled: !!tripId && !!user?.id,
  });
};

// receipt mutations

export const useCreateReceiptMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ReceiptCreate) => receiptApi.create(data),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: receiptKeys.all });
    },

    onError: (err: PostgrestError | Error) => {
      console.log(err);
      toast.error("Failed to add receipt. Please try again");
    },
  });
};

export const useEditReceiptMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReceiptEdit }) =>
      receiptApi.edit(id, data),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: [receiptKeys.all],
      });
      await qc.refetchQueries({ queryKey: receiptKeys.all });
    },

    onError: () => toast.error("Failed to start receipt. Please try again"),
  });
};

// form hook

export const useReceiptCreateForm = () =>
  useForm({
    resolver: zodResolver(receiptCreateSchema),
    defaultValues: {
      amount: "",
      description: "",
      image_url: "",
      status: "PENDING",
    },
  });
