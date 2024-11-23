export interface ICategory {
  id: string;
  name: string;
  type: string;
}

export type ICategoryMutation = Omit<ICategory, 'id'>

export interface CategoriesList {
  [id: string]: ICategoryMutation
}