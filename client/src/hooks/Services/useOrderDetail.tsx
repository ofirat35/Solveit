import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { t } from "i18next";
import { Alert } from "react-native";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { OrderStatusEnum } from "../../helpers/enums/OrderStatusEnum";
import { queryKeys } from "../../helpers/queryKeys";
import { PaginatedItemsViewModel } from "../../models/PaginatedItemsViewModel";
import { OrderListModel } from "../../models/Services/OrderListModel";
import { ServiceListModel } from "../../models/Services/ServiceListModel";
import { OrderService } from "../../services/OrderService";

export const useOrderDetail = (orderId: string) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.orders.details(orderId),
    queryFn: () => OrderService.getOrderById(orderId),
  });
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: ({ status }: { status: OrderStatusEnum }) =>
      OrderService.updateOrderStatus(orderId, status),
    onSuccess: (data, { status }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.details(orderId),
      });

      queryClient.setQueryData<
        InfiniteData<PaginatedItemsViewModel<OrderListModel>, unknown>
      >(queryKeys.orders.myOrders, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((order) =>
              order.id === orderId ? { ...order, orderStatus: status } : order,
            ),
          })),
        };
      });

      queryClient.setQueryData<
        InfiniteData<PaginatedItemsViewModel<ServiceListModel>, unknown>
      >(
        queryKeys.services.userServices(
          keycloakService.getCurrentUserId() ?? "",
        ),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((service) => {
                if (service.orders?.some((o) => o.id === orderId)) {
                  const updatedOrders = service.orders.map((o) =>
                    o.id === orderId ? { ...o, orderStatus: status } : o,
                  );

                  return { ...service, orders: updatedOrders };
                }

                return service;
              }),
            })),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.services.userServices(
          keycloakService.getCurrentUserId() ?? "",
        ),
      });
      Alert.alert(t("common.success"), t("orders.statusUpdatedSuccess"));
    },
    onError: () => {
      Alert.alert(t("common.error"), t("orders.statusUpdateFailed"));
    },
  });

  return { order: data, isLoading, isError, updateStatus, isUpdatingStatus };
};
