import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../../helpers/queryKeys";
import { ServiceProviderService } from "../../services/ServiceProviderService";

export const useServiceProviders = ({
  subcategoryId,
}: {
  subcategoryId: number;
}) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.services.serviceProvidersBySubcategory(subcategoryId),
      queryFn: ({ pageParam = 1 }) =>
        ServiceProviderService.getServicesBySubcategoryId(
          subcategoryId,
          pageParam,
          10,
        ),
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.flatMap((p) => p.data).length;
        return totalFetched < lastPage.totalEntities
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
    });

  const providers = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data?.pages],
  );

  return {
    providers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
