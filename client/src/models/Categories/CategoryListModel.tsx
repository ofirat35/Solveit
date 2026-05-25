import { SubcategoryListModel } from "./SubcategoryListModel";

export type CategoryListModel = {
  id: number;
  name: string;
  imageUrl: string;
  subcategories: SubcategoryListModel[];
  createdDate: string;
  updatedDate: string;
};
