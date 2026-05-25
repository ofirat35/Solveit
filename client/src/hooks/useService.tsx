import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { keycloakService } from "../helpers/Auth/keycloak";

export const useService = () => {
  const userId = useMemo(() => keycloakService.getCurrentUserId()!, []);
  const queryClient = useQueryClient();

  // const { data: category } = useQuery({
  //   queryKey: ["subcategories", userId],
  //   queryFn: () => CategoryService.getCategories(),
  // });

  // return {
  //   categories,
  //   isLoading,
  // };
};
