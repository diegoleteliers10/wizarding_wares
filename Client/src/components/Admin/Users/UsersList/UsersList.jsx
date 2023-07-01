import styles from './UsersList.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../redux/adminSlice';
import Users from '../Users/Users';


const UserList = () => {

  const dispatch = useDispatch()


  useEffect(() =>{
    dispatch(getAllUsers())
    console.log(users)
  }, [])

  const users  = useSelector((state) => state.admin.allUsers)
  const {filterRole, filterActive, sort2} =useSelector(state=> state.admin)

  return (
    <div className={`max-h-screen overflow-auto bg-white border border-black rounded-lg ${styles.productList}`}>
      <table className={`w-full ${styles.table}`}>
        <thead>
          <tr>
            <th className='p-4'>User</th>
            <th className='p-4 text-center'>Email</th>
            <th className='p-4 text-center'>Role</th>
            <th className='p-4 text-center'>Status</th>
            <th className='p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <Users key={user.userId} user={user} />
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default UserList;