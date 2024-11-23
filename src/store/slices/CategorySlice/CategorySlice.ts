import { ICategory, ICategoryMutation } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCategory,
  deleteOneCategory, editCategory,
  fetchAllCategories,
  getOneCategoryById
} from '../../thunks/CategoryThunks/CategoryThunks.ts';
import { RootState } from '../../../app/store.ts';

interface CategoryState {
  categories: ICategory[];
  oneCategory: ICategoryMutation | null;
  isCreateLoading: boolean;
  isFetchLoading: boolean;
  isDeleteLoading: boolean | string;
  isEditLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  oneCategory: null,
  isCreateLoading: false,
  isFetchLoading: false,
  isDeleteLoading: false,
  isEditLoading: false,
};

export const selectFetchCategoriesLoading = (state: RootState) => state.categories.isFetchLoading;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectOneCategory = (state: RootState) => state.categories.oneCategory;

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isFetchLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOneCategory.pending, (state, {meta}) => {
        state.isDeleteLoading = meta.arg;
      })
      .addCase(deleteOneCategory.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOneCategory.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(getOneCategoryById.pending, (state) => {
        state.isFetchLoading = true;
        state.oneCategory = null;
      })
      .addCase(getOneCategoryById.fulfilled, (state, action: PayloadAction<ICategoryMutation | null>) => {
        state.isFetchLoading = false;
        state.oneCategory = action.payload;
      })
      .addCase(getOneCategoryById.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(editCategory.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.isEditLoading = false;
        state.oneCategory = null;
      })
      .addCase(editCategory.rejected, (state) => {
        state.isEditLoading = false;
      })
    ;
  }
});

export const categoriesReducer = categorySlice.reducer;