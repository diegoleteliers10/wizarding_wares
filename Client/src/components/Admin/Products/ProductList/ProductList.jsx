import Product from '../Product/Products';
import styles from './ProductList.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../redux/adminSlice';

const ProductListContainer = () => {

  const dispatch = useDispatch()

  useEffect(() =>{
    if(!filterCategory && filterStock === '' && sort === ''){
      // si no hay filtro, pide todos los productos
      dispatch(getProducts())
    }
  }, [])


  const search = useSelector((state) => state.admin.search)

  const {products, filterCategory, filterStock, sort} = useSelector((state) => state.admin)

  
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
        (!products.length && (filterCategory || search || filterStock)) && 
        <div className='noProductos flex items-center justify-center'>
            <h3 className='my-8'>No hay productos disponibles con esos criterios</h3>
        </div>
        }
    </div>
  );
};

export default ProductListContainer;