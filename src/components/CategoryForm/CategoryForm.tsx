import { ICategoryMutation } from '../../types';
import { useEffect, useState } from 'react';

interface Props {
  addNewCategory: (category: ICategoryMutation) => void;
  existingCategory?: ICategoryMutation;
}

const initialStateForm = {
  name: "",
  type: "",
};

const CategoryForm: React.FC<Props> = ({ addNewCategory, existingCategory = initialStateForm}) => {
  const [newCategory, setNewCategory] = useState<ICategoryMutation>(existingCategory || {name: '', type: ''});

  useEffect(() => {
    if (existingCategory) {
      setNewCategory(existingCategory);
    }
  }, [existingCategory]);

  const onChangeClick = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewCategory((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const key in newCategory) {
      if (!newCategory[key as keyof typeof newCategory]) {
        return alert('Заполните все поля');
      }
    }
    addNewCategory({...newCategory});
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChangeClick}
            value={newCategory.name}
            className="form-control"
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="type">Type: </label>
          <select
            name="type"
            id="type"
            onChange={onChangeClick}
            value={newCategory.type}
            className="form-select"
          >
            <option value="" disabled>Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success" type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;