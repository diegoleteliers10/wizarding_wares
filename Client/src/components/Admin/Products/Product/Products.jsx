import { Link } from 'react-router-dom';
import styles from '../ProductList/ProductList.module.css';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, displayEditProduct, getProducts, setEditState } from '../../../../redux/adminSlice';
import { useState } from 'react';

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const products = useSelector((state) => state.admin.products)
  const editState = useSelector((state) => state.admin.edit)

  const [edit, setEdit] = useState(product)

  const handleEdit = async (product) => {
    await dispatch(setEditState(product))
    await dispatch(displayEditProduct())
  }


  const handleDelete = async () => {
    const productId = product.productId
    console.log(productId);
    console.log(products);
    await dispatch(deleteProduct(productId));
    await dispatch(getProducts())
  };

  let category 
  if (product.categoryCategoryId === 1) {
    category = 'Books';
  } else if (product.categoryCategoryId === 2) {
    category = 'Wands';
  } else if (product.categoryCategoryId === 3) {
    category = 'Clothing';
  } else if (product.categoryCategoryId === 4) {
    category = 'Candy';
  } else if (product.categoryCategoryId === 5) {
    category = 'Quidditch';
  } else if (product.categoryCategoryId === 6){
    category = 'Miscellaneous';
  }

  return (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.isActive === true ? 'Active' : 'Inactive'}</td>
      <td>{product.price}</td>
      <td>{category}</td>
      <td>{product.stock}</td>
      <td>
        <button className={styles.button} onClick={() => handleEdit(product)}>
          <FiEdit />
        </button>
        <button value={product.productId} onClick={handleDelete} className={styles.button}>
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};
export default Product;