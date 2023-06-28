import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPurchases } from '../../../../redux/adminSlice';
import Purchases from '../Purchases/Purchases';
import styles from './PurchasesList.module.css'

const PurchasesList = ()=>{
    const dispatch = useDispatch()

  useEffect(() =>{
      dispatch(getAllPurchases())
  }, [])

  const {allPurchases}  = useSelector((state) => state.admin)

  return(
    <div className={`max-h-screen overflow-auto bg-white border border-black rounded-lg ${styles.purchaseList}`}>
      <table className={`w-full ${styles.table}`}>
        <thead>
          <tr className=''>
            <th className='p-4'>Purchase</th>
            <th className='p-4 text-center'>User</th>
            <th className='p-4 text-center'>Status</th>
            <th className='p-4 text-center'>Address</th>
            <th className='p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPurchases?.map((purchase) => (
            <Purchases key={purchase.purchaseId} purchase={purchase} />
          ))}
        </tbody>
      </table>
    
    </div>
  )
}

export default PurchasesList;