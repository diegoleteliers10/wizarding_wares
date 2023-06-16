import data from '../../../../assets/data.json';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const ProductList = () => {
  return (
    <div className={`max-h-screen overflow-auto ${styles.productList}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Estado</th>
            <th>Precio</th>
            <th>Categoria</th> 
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.isActive === true ? 'Activo' : 'Inhabilitado'}</td>
              <td>{product.price}</td>
              <td>{product.Category}</td>
              <td>{product.stock}</td>
              <td>
                <Link to='/editProduct'>
                  <button className={styles.button}><FiEdit /></button> {/* Use the CSS module class */}
                </Link>
                <button className={styles.button}><FiTrash2 /></button> {/* Use the CSS module class */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;