import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../../helpers/queryKeys";
import { OrderService } from "../../services/OrderService";
import { ServiceProviderService } from "../../services/ServiceProviderService";

export const useServiceApplicants = ({ serviceId }: { serviceId: number }) => {
  const { data: service } = useQuery({
    queryKey: queryKeys.services.getById(serviceId),
    queryFn: () => ServiceProviderService.getServiceById(serviceId),
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.services.serviceApplications(serviceId),
      queryFn: async ({ pageParam = 1 }) => {
        let orders = await OrderService.GetOrdersByServiceId(
          serviceId,
          pageParam,
          10,
        );
        return orders;
      },
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.flatMap((p) => p.data).length;
        return totalFetched < lastPage.totalEntities
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
    });

  const applications = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data?.pages],
  );

  return {
    service,
    isLoading,
    applications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
