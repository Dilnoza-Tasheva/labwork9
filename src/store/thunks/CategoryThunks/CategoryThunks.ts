import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesList, ICategory, ICategoryMutation } from '../../../types';
import axiosApi from '../../../axiosApi.ts';

export const createCategory = createAsyncThunk<void, ICategoryMutation>(
  'categories/createCategory',
  async (category) => {
      await axiosApi.post('categories.json', { ...category });
  }
);

export const fetchAllCategories = createAsyncThunk<ICategory[], void>(
  'categories/fetchAllCategories',
  async () => {
    const response = await axiosApi<CategoriesList | null>('categories.json');
    const categoriesList = response.data;

    if (categoriesList === null) {
      return [];
    }

    const categories = Object.keys(categoriesList).map((id) => ({
      ...categoriesList[id],
      id,
    }));

    return categories;
  }
);

export const deleteOneCategory = createAsyncThunk<void, string>(
  'categories/deleteOneCategory',
  async (categoryId) => {
    await axiosApi.delete(`categories/${categoryId}.json`);
  }
);

export const getOneCategoryById = createAsyncThunk<ICategoryMutation | null, string>(
  'pizzas/getOnePizzaById',
  async (categoryId) => {
    const response = await axiosApi<ICategoryMutation | null>(`pizzas/${categoryId}.json`);
    if (!response.data) return null;
    return response.data;
  }
);

export const editCategory = createAsyncThunk<void, {categoryId: string; category: ICategoryMutation}>(
  'categories/editCategory',
    async({categoryId, category}) => {
    await axiosApi.put(`categories/${categoryId}.json`, {...category});
  }
);