import Product from '../Product/Products';
import styles from './ProductList.module.css';
import data from '../../../../assets/data.json'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../redux/adminSlice';


const ProductListContainer = () => {

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getProducts())
  }, [])

  const products = useSelector((state) => state.admin.products)

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
          {products?.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListContainer;