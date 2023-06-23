import Product from '../Product/Products';
import styles from './ProductList.module.css';
import data from '../../../../assets/data.json'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../redux/adminSlice';
import { filterCategory } from '../../../../redux/userSlice';


const ProductListContainer = () => {

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getProducts())
  }, [])

  const products = useSelector((state) => state.admin.products)
  const search = useSelector((state) => state.admin.search)
  
  useEffect(() =>{
    if(filterCategory){
      //console.log(products)
    }
  }, [filterCategory])

  return (
    <div className={`max-h-screen overflow-auto bg-white ${styles.productList}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Category</th>
            <th className='text-center'>Stock</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </tbody>
      </table>
      {
        (!products.length && (filterCategory || search)) && 
        <div className='noProductos flex items-center justify-center'>
            <h1>No hay productos disponibles con esos criterios</h1>
        </div>
        }
    </div>
  );
};

export default ProductListContainer;