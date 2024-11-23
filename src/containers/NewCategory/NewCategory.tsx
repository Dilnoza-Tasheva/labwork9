// import CategoryForm from '../../components/CategoryForm/CategoryForm.tsx';
// import { useAppDispatch } from '../../app/hooks.ts';
// import { useNavigate } from 'react-router-dom';
// import { ICategoryMutation } from '../../types';
// import { createCategory } from '../../store/thunks/CategoryThunks/CategoryThunks.ts';
//
//
// const NewCategory = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//
//   const addNewCategory = async (category: ICategoryMutation) => {
//     await dispatch(createCategory(category));
//     navigate('/');
//   };
//
//   return (
//     <>
//       <CategoryForm addNewCategory={addNewCategory}/>
//     </>
//   );
// };
//
// export default NewCategory;