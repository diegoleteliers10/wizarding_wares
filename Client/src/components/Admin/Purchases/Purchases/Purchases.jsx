import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPurchases } from '../../../../redux/adminSlice';
import { useState, useEffect } from 'react';
import PopUp from '../../PopUp/PopUp';

const Purchases = ({ purchase })=> {
    const dispatch = useDispatch();
    const {allPurchases, refresh} = useSelector((state) => state.admin)

    //   ESTADOS POP UP
  const [popUp, setPopUp] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')

  const handleEdit = async () => {
    //dispatch(setEditPurchase(purchase))
    //dispatch(displayEditPurchase())
  }

  
  const purchasePlace = purchase.user.addresses.find((address) => address.User_Address.addressAddressId === purchase.addressAddressId)

  //console.log(purchasePlace && purchasePlace.street)

  useEffect(()=>{
    dispatch(getAllPurchases());
  }, [refresh]);

  return(
    <>
    {popUp === true && (
      <PopUp trigger={popUp} setTrigger={setPopUp} handleConfirm={handleConfirm}>
        <h3>{popUpMessage}</h3>
      </PopUp>
    )}
    <tr key={purchase.purchaseId} className={purchase.statusStatusId === "0ed5db51-11ae-49d8-a99c-adddafcdedfa" ? 'text-gray-400' : ''}>
      <td><span>{purchase.purchaseId}</span> <span>Products: {purchase.products.length}</span> </td>
      <td className='text-center'> {purchase.user.name}</td>
      <td className='text-center'>
      <span 
        // className={user.isActive === false ? '' : `inline-flex px-2 text-xs font-medium leading-5 rounded-full ${roleClass}`}
        >
        {purchase.status.name}
      </span>
      </td>
      <td 
        // className={purchase.isActive === false ? 'text-center' :`text-center font-medium`}
      >
        {purchasePlace && purchasePlace.street} {purchasePlace && purchasePlace.number}
      </td>
      <td className='revert'>
        <button className='button' onClick={() => handleEdit(purchase)}>
          <FiEdit />
        </button>
        {/* <button value={purchase.userId} onClick={handleDelete} className={user.isActive === false ? 'text-lime-500' : 'button'}>
          { purchase.isActive 
          ? <FiTrash2 />
          : <FaUndoAlt className='text-purple-600 hover:text-purple-800' title='Re-activate user'/>
          }
        </button> */}
      </td>
    </tr>
    </>
  )
}
export default Purchases;