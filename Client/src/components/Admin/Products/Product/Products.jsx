import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, displayEditProduct, getProducts, setEditState } from '../../../../redux/adminSlice';
import { useState, useEffect } from 'react';
import PopUp from '../../PopUp/PopUp';

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const products = useSelector((state) => state.admin.products)
  const editState = useSelector((state) => state.admin.edit)
  const [refresh, setRefresh] = useState(false)

  const [edit, setEdit] = useState(product)

  //ESTADOS POP UP
  const [popUp, setPopUp] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')


  const handleEdit = async (product) => {
    await dispatch(setEditState(product))
    await dispatch(displayEditProduct())
  }

  const handleDelete = () => {
    setPopUpMessage(`Are you sure you want to delete "${product.name}"?`)
    setPopUp(true);
  };

  const handleConfirm = async () => {
    const productId = product.productId;
    await dispatch(deleteProduct(productId));
    setPopUp(false);
    await dispatch(getProducts());
    
  };

  useEffect(()=>{
      //cuando se despacha la accion getProducts se actualiza el componente
      if (refresh) {
        dispatch(getProducts());
        setRefresh(false);
      }
  }, [refresh, dispatch]);

  let category;
  let categoryClass = ''; 
  
  if (product.categoryCategoryId === 1) {
    category = 'Libros';
    categoryClass = 'text-blue-700 bg-blue-100';
  } else if (product.categoryCategoryId === 2) {
    category = 'Varitas';
    categoryClass = 'text-red-700 bg-red-100';
  } else if (product.categoryCategoryId === 3) {
    category = 'Indumentaria';
    categoryClass = 'text-purple-700 bg-purple-100';
  } else if (product.categoryCategoryId === 4) {
    category = 'Golosinas';
    categoryClass = 'text-yellow-700 bg-yellow-100';
  } else if (product.categoryCategoryId === 5) {
    category = 'Quidditch';
    categoryClass = 'text-orange-700 bg-orange-100';
  } else if (product.categoryCategoryId === 6) {
    category = 'Misceláneas';
    categoryClass = 'text-gray-700 bg-gray-100';
  }

  return (
    <>
    {popUp === true && (
      <PopUp trigger={popUp} setTrigger={setPopUp} handleConfirm={handleConfirm}>
        <h3>{popUpMessage}</h3>
        <p className='font-xl'>The item will no longer be visible in the store but can be re-activated in the future</p>
      </PopUp>
    )}
    <tr key={product.id} className={product.isActive === false ? 'text-gray-400' : ''}>
      <td>{product.name}</td>
      <td className='text-center'>{product.isActive === true ? 'Active' : 'Inactive'}</td>
      <td className='text-center'>$ {product.price}</td>
      <td className='text-center'>
        <span className={product.isActive === false ? '' :`inline-flex px-2 text-xs font-medium leading-5 rounded-full ${categoryClass}`}>
          {category}
        </span>
      </td>
      <td className='text-center'>{product.stock}</td>
      <td className='flex-center'>
        <button className='button' onClick={() => handleEdit(product)}>
          <FiEdit />
        </button>
        <button value={product.productId} onClick={handleDelete} className='button'>
          <FiTrash2 />
        </button>
      </td>
    </tr>
  </>
  );
};

export default Product;