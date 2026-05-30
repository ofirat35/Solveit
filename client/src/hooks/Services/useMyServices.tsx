import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ServiceProviderService } from "../../services/ServiceProviderService";

export const useMyServices = () => {
  const {
    data: myServices,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["myServices"],
    queryFn: ({ pageParam = 1 }) =>
      ServiceProviderService.getMyServices(pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((p) => p.data).length;
      return totalFetched < lastPage.totalEntities
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  const services = useMemo(
    () => myServices?.pages.flatMap((p) => p.data) ?? [],
    [myServices?.pages],
  );

  return {
    isLoading,
    services,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
