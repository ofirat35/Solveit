import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeys } from "../../helpers/queryKeys";
import { OrderService } from "../../services/OrderService";

export const useMyOrders = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.orders.myOrders,
      queryFn: ({ pageParam = 1 }) => OrderService.getMyOrders(pageParam, 10),
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.flatMap((p) => p.data).length;
        return totalFetched < lastPage.totalEntities
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
    });

  const orders = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  );

  return {
    orders,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
