import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPurchases, editStatus } from '../../../../redux/adminSlice';
import { useState, useEffect } from 'react';
import PopUp from '../../PopUp/PopUp';
import PopUpDetail from '../../PopUpDetail/PopUpDetail';

const Purchases = ({ purchase })=> {
    const dispatch = useDispatch();
    const {allPurchases, refresh} = useSelector((state) => state.admin)

    const [statusValue, setStatusValue] = useState(purchase.status.name)
    //   ESTADOS POP UP
  const [popUp, setPopUp] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')

  //   ESTADOS POP UP DETAIL
  const [popUpDetail, setPopUpDetail] = useState(false)
  const [popUpDetailMessage, setPopUpDetailMessage] = useState('')

  const handlePopUpDetail = ()=>{
    setPopUpDetail(true);
    setPopUpDetailMessage(`Detail purchase ${purchase.purchaseId}`)
  }

  const handleStatus = async (event) => {
    setStatusValue(event.target.value)
    setPopUpMessage(`Change purchase status to "${event.target.value}"?`)
    setPopUp(true)
    //dispatch(editStatus([event.target.value, purchase.purchaseId]))
    //dispatch(displayEditPurchase())
  }

  const handleConfirm = async () => {
    const purchaseId = purchase.purchaseId;
    const newStatus = statusValue;
    await dispatch(editStatus([newStatus, purchaseId]));
    setPopUp(false);    
  };

  
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
    {popUpDetail === true && (
      <PopUpDetail trigger={popUpDetail} setTrigger={setPopUpDetail} products={purchase.products} purchaseId={purchase.purchaseId}>
        <h3>{popUpDetailMessage}</h3>
      </PopUpDetail>
    )}
    <tr 
    key={purchase.purchaseId} 
    className={purchase.statusStatusId === 4 ? 'text-gray-400' : ''}
    >
      <td>
        <button className='underline text-purple-600 hover:text-purple-700 text-left' onClick={handlePopUpDetail}>
          {purchase.purchaseId}
          </button> <br /> 
      <span className='ml-4'>Products: {purchase.products.length}</span> 
      </td>
      <td className='text-center'> {purchase.user.name}</td>
      <td className='text-center'>
      <select name="status" id="status" value={statusValue} className='bg-white' onChange={handleStatus}>
        <option value="En preparación">Confirmed</option>
        <option value="En camino">Shipment</option>
        <option value="Entregado">Delivered</option>
        <option value="Cancelado">Cancelled</option>
      </select>
      </td>
      <td className='text-center'
        // className={purchase.isActive === false ? 'text-center' :`text-center font-medium`}
      >
        {purchasePlace && purchasePlace.street} {purchasePlace && purchasePlace.number}
      </td>
      
    </tr>
    </>
  )
}
export default Purchases;