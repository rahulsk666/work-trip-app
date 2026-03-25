import { useUserQuery } from "@/module/profile/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { workApi } from "../api/work.api";
import { workKeys } from "../constants/work.key";
import {
  WorkCreate,
  workCreateSchema,
  WorkEnd,
  workEndSchema,
} from "../schemas/work.schema";

// use trip queries
export const useWorkPaginatedQuery = (
  tripId: string | null,
  pageSize?: number,
) => {
  const { data: user } = useUserQuery();
  return useInfiniteQuery({
    queryKey: workKeys.getAll(),
    queryFn: ({ pageParam }) =>
      workApi.getAll(user!.id, tripId as string, pageParam as number, pageSize),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: !!user?.id && !!tripId,
  });
};

export const useWorkByIdQuery = (id: string) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: workKeys.getById(id),
    queryFn: () => workKeys.getById(id),
    enabled: !!id && !!user?.id,
  });
};

export const useLatestWorkQuery = (tripId: string) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: workKeys.latest(),
    queryFn: () => workApi.getLatest(user!.id, tripId),
    enabled: !!user?.id && !!tripId,
  });
};

// trip mutations

export const useCreateWorkMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkCreate) => workApi.create(data),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: workKeys.all });
    },

    onError: (err) => {
      //   if (err?.code === "23505") {
      //     toast.error("A Work has already been started for today");
      //     return;
      //   }
      toast.error("Failed to start trip. Please try again");
    },
  });
};
export const useEndWorkMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WorkEnd }) =>
      workApi.edit(id, data),

    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: [workKeys.all],
      });
      await qc.refetchQueries({ queryKey: workKeys.today() }); // ✅ force refetch
      await qc.refetchQueries({ queryKey: workKeys.latest() });
    },

    onError: () => toast.error("Failed to start trip. Please try again"),
  });
};

// form hook

export const useWorkCreateForm = () =>
  useForm({
    resolver: zodResolver(workCreateSchema),
    defaultValues: {
      trip_id: "",
      start_time: "",
      location: "",
      notes: "",
      status: "STARTED",
    },
  });

export const useWorkEndForm = () =>
  useForm({
    resolver: zodResolver(workEndSchema),
    defaultValues: {
      end_time: "",
      location: "",
      notes: "",
      status: "ENDED",
    },
  });
