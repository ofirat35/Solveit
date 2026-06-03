import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../helpers/queryKeys";
import { ServiceProviderService } from "../services/ServiceProviderService";
import { UserService } from "../services/UserService";

export function useUserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: queryKeys.users.getById(userId),
    queryFn: () => UserService.getUserById(userId),
  });

  const {
    data: infiniteServicesData,
    fetchNextPage,
    hasNextPage,
    isLoading: isServicesLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.services.userServices(userId),
    queryFn: async ({ pageParam = 1 }) => {
      const services = await ServiceProviderService.getUserServices(
        userId,
        pageParam,
        10,
      );
      return services;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((p) => p.data).length;
      return totalFetched < lastPage.totalEntities
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: !!user?.isServiceProvider, // Only execute if user profile loads and is a provider
  });

  const flattenedServices = useMemo(
    () => infiniteServicesData?.pages.flatMap((page) => page.data) || [],
    [infiniteServicesData?.pages],
  );
  const totalServices = useMemo(() => {
    if (!infiniteServicesData?.pages) return 0;
    const firstPage = infiniteServicesData.pages[0];
    return firstPage?.totalEntities ?? 0;
  }, [infiniteServicesData?.pages]);

  return {
    services: flattenedServices,
    totalServices,
    isLoading: isUserLoading || isServicesLoading,
    isUserError,
    user,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
