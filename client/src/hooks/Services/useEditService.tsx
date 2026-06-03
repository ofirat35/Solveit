import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { showToast } from "../../helpers/Toasts/DefaultToasts";
import { queryKeys } from "../../helpers/queryKeys";
import { ServiceUpdateFormData } from "../../helpers/schemas/services/serviceUpdateSchema";
import { PaginatedItemsViewModel } from "../../models/PaginatedItemsViewModel";
import { ServiceListModel } from "../../models/Services/ServiceListModel";
import { ServiceProviderService } from "../../services/ServiceProviderService";
import { useCategories } from "../useCategories";

export const useEditService = ({
  serviceId,
  selectedCategoryId,
}: {
  serviceId: number;
  selectedCategoryId: number | null;
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: service, isLoading: isLoadingDetails } = useQuery({
    queryKey: queryKeys.services.getById(serviceId),
    queryFn: () => ServiceProviderService.getServiceById(serviceId),
  });

  const { categories, subcategories } = useCategories({
    selectedCategoryId: selectedCategoryId || 0,
  });

  const { mutate: updateService, isPending: isUpdating } = useMutation({
    mutationFn: (formData: ServiceUpdateFormData) =>
      ServiceProviderService.updateService(formData),
    onSuccess: (data, formData) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.services.getById(serviceId),
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
                if (service.id === serviceId) {
                  let orders = service.orders || [];
                  return { ...service, orders: orders };
                }

                return service;
              }),
            })),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.services.userServices(formData.providerId),
      });

      showToast(t("editService.updateSuccess"));
    },
    onError: () => {
      showToast(t("common.errorOccurred"));
    },
  });

  return {
    service,
    isLoadingDetails,
    categories,
    subcategories,
    updateService,
    isUpdating,
  };
};
