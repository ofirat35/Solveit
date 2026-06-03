import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { queryKeys } from "../../helpers/queryKeys";
import { ServiceProviderService } from "../../services/ServiceProviderService";
import { UserService } from "../../services/UserService";

export function useServiceDetail({ serviceId }: { serviceId: number }) {
  const { t } = useTranslation();
  const queryclient = useQueryClient();
  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.services.getById(serviceId),
    queryFn: () => ServiceProviderService.getServiceById(serviceId),
  });

  const { data: userImageData } = useQuery({
    queryKey: queryKeys.users.images(service?.providerId ?? ""),
    queryFn: () => {
      return service?.providerId
        ? UserService.getUserImage(service.providerId)
        : undefined;
    },
    enabled: !!service?.providerId,
  });

  const { mutate: applyForService, isPending: isApplying } = useMutation({
    mutationFn: () => ServiceProviderService.applyForService(serviceId),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: queryKeys.orders.myOrders });
      Alert.alert(
        t("common.success", "Success"),
        t(
          "providerDetail.applySuccess",
          "Your application has been submitted successfully!",
        ),
      );
    },
    onError: (err) => {
      Alert.alert(
        t("common.error", "Error"),
        err.message ||
          t("providerDetail.applyError", "Failed to submit application."),
      );
    },
  });
  return {
    service,
    isLoading,
    error,
    userImageData,
    applyForService,
    isApplying,
  };
}
