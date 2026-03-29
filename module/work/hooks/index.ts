import { useUserQuery } from "@/module/profile/hooks";
import { PostgrestError } from "@supabase/supabase-js";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner-native";
import { workApi } from "../api/work.api";
import { workKeys } from "../constants/work.key";
import { WorkCreate, WorkEnd } from "../schemas/work.schema";

// use trip queries
export const useWorkPaginatedQuery = (
  tripId: string | undefined,
  pageSize?: number,
) => {
  const { data: user } = useUserQuery();
  return useInfiniteQuery({
    queryKey: workKeys.getByPagination(tripId),
    queryFn: ({ pageParam }) =>
      workApi.getByPagination(
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

export const useWorkByTripQuery = ({ tripId }: { tripId?: string }) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: workKeys.getByAll(tripId),
    queryFn: () => workApi.getAll(user!.id, tripId as string),
    enabled: !!tripId && !!user?.id,
  });
};

export const useWorkByLimitQuery = ({
  tripId,
  limit = 2,
}: {
  tripId: string;
  limit: number;
}) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: workKeys.getByLimit(tripId),
    queryFn: () => workApi.getByLimit(user!.id, tripId as string, limit),
    enabled: !!tripId && !!user?.id,
  });
};

export const useWorkByIdQuery = (id: string) => {
  const { data: user } = useUserQuery();
  return useQuery({
    queryKey: workKeys.getById(id),
    queryFn: () => workApi.getById(id),
    enabled: !!id && !!user?.id,
  });
};

export const useLatestWorkQuery = (tripId: string | undefined) => {
  const { data: user } = useUserQuery();

  return useQuery({
    queryKey: workKeys.latest(tripId),
    queryFn: () => workApi.getLatestWork(user!.id, tripId as string),
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

    onError: (err: PostgrestError | Error) => {
      if ("code" in err && err?.code === "23505") {
        toast.error("A Work has already been started for today");
        return;
      }
      toast.error("Failed to start work. Please try again");
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
      await qc.refetchQueries({ queryKey: workKeys.all });
    },

    onError: () => toast.error("Failed to start work. Please try again"),
  });
};
