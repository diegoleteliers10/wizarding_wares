import { Link } from 'react-router-dom';
import styles from '../ProductList/ProductList.module.css';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const Product = ({ product }) => {
  return (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.isActive === true ? 'Active' : 'Inactive'}</td>
      <td>{product.price}</td>
      <td>
        {product.categoryId === 1
          ? 'Clothing'
          : product.categoryId === 2
          ? 'Wands'
          : product.categoryId === 3
          ? 'Quidditch'
          : product.categoryId === 4
          ? 'Candy'
          : product.categoryId === 5
          ? 'Miscellaneous'
          : 'Books'}
      </td>
      <td>{product.stock}</td>
      <td>
        <Link to="/editProduct">
          <button className={styles.button}>
            <FiEdit />
          </button>
        </Link>
        <button className={styles.button}>
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};

export default Product;