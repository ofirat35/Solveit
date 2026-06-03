import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../helpers/queryKeys";
import { CategoryService } from "../services/CategoryService";

export const useCategories = ({
  selectedCategoryId,
}: {
  selectedCategoryId: number;
}) => {
  const { data: categories } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => CategoryService.getCategories(),
  });

  const { data: subcategories } = useQuery({
    queryKey: queryKeys.categories.subcategories(selectedCategoryId),
    queryFn: () =>
      CategoryService.getSubcategoriesByCategoryId(selectedCategoryId),
    enabled: !!selectedCategoryId,
  });

  return {
    categories,
    subcategories,
  };
};
