import { CategoryListModel } from "../models/Categories/CategoryListModel";
import { SubcategoryListModel } from "../models/Categories/SubcategoryListModel";
import { api } from "./api";

export const CategoryService: ICategoryService = {
  async getCategories(): Promise<CategoryListModel[]> {
    try {
      var result = await api.get<CategoryListModel[]>(
        `/categories/getCategories`,
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async getCategoriesWithSubcategories(): Promise<CategoryListModel[]> {
    try {
      var result = await api.get<CategoryListModel[]>(
        `/categories/getCategoriesWithSubcategories`,
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async getSubcategoriesByCategoryId(
    categoryId: number,
  ): Promise<SubcategoryListModel[]> {
    try {
      var result = await api.get<SubcategoryListModel[]>(
        `/categories/getSubcategoriesByCategoryId/${categoryId}`,
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
};

interface ICategoryService {
  getCategories(): Promise<CategoryListModel[]>;
  getCategoriesWithSubcategories(): Promise<CategoryListModel[]>;
  getSubcategoriesByCategoryId(
    categoryId: number,
  ): Promise<SubcategoryListModel[]>;
}
