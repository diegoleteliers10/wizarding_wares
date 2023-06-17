import Product from '../Product/Products';
import styles from './ProductList.module.css';
import data from '../../../../assets/data.json'

const ProductListContainer = () => {

  return (
    <div className={`max-h-screen overflow-auto ${styles.productList}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Status</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListContainer;