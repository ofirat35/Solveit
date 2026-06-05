import { CategoryListModel } from "../models/Categories/CategoryListModel";
import { SubcategoryListModel } from "../models/Categories/SubcategoryListModel";
import { api } from "./api";

export const CategoryService: ICategoryService = {
  async getCategories(): Promise<CategoryListModel[]> {
    var result = await api.get<CategoryListModel[]>(
      `/categories/getCategories`,
    );
    return result!;
  },
  async getCategoriesWithSubcategories(): Promise<CategoryListModel[]> {
    var result = await api.get<CategoryListModel[]>(
      `/categories/getCategoriesWithSubcategories`,
    );
    return result!;
  },
  async getSubcategoriesByCategoryId(
    categoryId: number,
  ): Promise<SubcategoryListModel[]> {
    var result = await api.get<SubcategoryListModel[]>(
      `/categories/getSubcategoriesByCategoryId/${categoryId}`,
    );
    return result!;
  },
};

interface ICategoryService {
  getCategories(): Promise<CategoryListModel[]>;
  getCategoriesWithSubcategories(): Promise<CategoryListModel[]>;
  getSubcategoriesByCategoryId(
    categoryId: number,
  ): Promise<SubcategoryListModel[]>;
}
