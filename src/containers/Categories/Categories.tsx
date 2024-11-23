import Modal from '../../components/UI/Modal/Modal.tsx';
import { useCallback, useEffect, useState } from 'react';
import CategoryForm from '../../components/CategoryForm/CategoryForm.tsx';
import { ICategory, ICategoryMutation } from '../../types';
import {
  createCategory, deleteOneCategory, editCategory,
  fetchAllCategories,
} from '../../store/thunks/CategoryThunks/CategoryThunks.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCategories, selectFetchCategoriesLoading } from '../../store/slices/CategorySlice/CategorySlice.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const Categories = () => {
  const dispatch = useAppDispatch();
  const categories: ICategory[] = useAppSelector(selectCategories);
  const isFetchLoading = useAppSelector(selectFetchCategoriesLoading);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);

  const fetchCategories = useCallback(async() => {
    await dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  const addNewCategory = async (category: ICategoryMutation) => {
    await dispatch(createCategory(category));
    setModal(false);
    await fetchCategories();
  };

  const updateCategory = async (updatedCategory: ICategoryMutation) => {
    if (editingCategory) {
      await dispatch(editCategory({ categoryId: editingCategory.id, category: updatedCategory }));
      setModal(false);
      setEditingCategory(null);
      setIsEdit(false);
      await fetchCategories();
    }
  };

  const deleteCategory = async(categoryId: string) => {
    await dispatch(deleteOneCategory(categoryId));
    dispatch(fetchAllCategories());
  };

  const showEditModal = (category: ICategory) => {
    setEditingCategory(category);
    setIsEdit(true);
    setModal(true);
  };

  const closeModalWindow = () => {
    setModal(false);
    setIsEdit(false);
    setEditingCategory(null);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5>Categories</h5>
        <button className="btn btn-primary" onClick={() => setModal(true)}>Add Category</button>
      </div>

      {isFetchLoading ? (
        <Spinner/>
      ) : (
        <ul className="list-group mt-3">
          {categories.map((category) => (
            <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{category.name}</strong> - {category.type}
              </div>
              <div>
                <button onClick={() => showEditModal(category)} className="btn btn-sm btn-outline-success me-2">Edit</button>
                <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-outline-danger">Delete</button>
              </div>
            </li>
          ))}

        </ul>
      )}

      <Modal
        show={modal}
        title={isEdit ? 'Edit Category' : 'Add Category'}
        closeModal={closeModalWindow}
        defaultModalButton={false}
      >
        <CategoryForm
          addNewCategory={isEdit ? updateCategory :addNewCategory}
          existingCategory={isEdit && editingCategory ? editingCategory : undefined}/>
      </Modal>
    </>
  );
};

export default Categories;