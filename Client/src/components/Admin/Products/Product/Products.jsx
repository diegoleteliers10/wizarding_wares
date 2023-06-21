import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, displayEditProduct, getProducts, setEditState } from '../../../../redux/adminSlice';
import { useState, useEffect } from 'react';
import PopUp from '../../PopUp/PopUp';

const Product = ({ product }) => {

  const dispatch = useDispatch();

  const products = useSelector((state) => state.admin.products)
  const editState = useSelector((state) => state.admin.edit)

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

  const handleConfirmDelete = () => {
    const productId = product.productId;
    dispatch(deleteProduct(productId));
    dispatch(getProducts());
    setPopUp(false);
  };

  useEffect(()=>{
    //cuando se despacha una accion actualizo componente
  }, [dispatch])

  let category;
  let categoryClass = ''; 
  
  if (product.categoryCategoryId === 1) {
    category = 'Books';
    categoryClass = 'text-blue-700 bg-blue-100';
  } else if (product.categoryCategoryId === 2) {
    category = 'Wands';
    categoryClass = 'text-red-700 bg-red-100';
  } else if (product.categoryCategoryId === 3) {
    category = 'Clothing';
    categoryClass = 'text-purple-700 bg-purple-100';
  } else if (product.categoryCategoryId === 4) {
    category = 'Candy';
    categoryClass = 'text-yellow-700 bg-yellow-100';
  } else if (product.categoryCategoryId === 5) {
    category = 'Quidditch';
    categoryClass = 'text-orange-700 bg-orange-100';
  } else if (product.categoryCategoryId === 6) {
    category = 'Miscellaneous';
    categoryClass = 'text-gray-700 bg-gray-100';
  }

  return (
    <tr key={product.id}>
      {
        popUp === true && (
          <PopUp trigger={popUp} setTrigger={setPopUp} handleConfirm={handleConfirmDelete}>
            <h3>{popUpMessage}</h3>
            <p className='font-xl'>The item will no longer be visible in the store but can be re-activated in the future</p>
          </PopUp>
        )
      }
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
  );
};

export default Product;