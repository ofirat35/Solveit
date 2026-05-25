import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { keycloakService } from "../helpers/Auth/keycloak";
import { CategoryService } from "../services/CategoryService";

export const useCategories = ({
  selectedCategoryId,
}: {
  selectedCategoryId: number;
}) => {
  const userId = useMemo(() => keycloakService.getCurrentUserId()!, []);
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
  });

  const { data: subcategories } = useQuery({
    queryKey: ["subcategories", selectedCategoryId],
    queryFn: () =>
      CategoryService.getSubcategoriesByCategoryId(selectedCategoryId),
    enabled: !!selectedCategoryId,
  });

  return {
    categories,
    subcategories,
  };
};
