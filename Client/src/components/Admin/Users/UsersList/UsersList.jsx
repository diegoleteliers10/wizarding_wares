import User from '../Users/Users';
import styles from './UsersList.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../redux/adminSlice';
import Users from '../Users/Users';


const UserList = () => {

  const dispatch = useDispatch()

  useEffect(() =>{
      dispatch(getAllUsers())
  }, [])

  const users  = useSelector((state) => state.admin.allUsers)


  return (
    <div className={`max-h-screen overflow-auto bg-white ${styles.productList}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th className='text-center'>Email</th>
            <th className='text-center'>Role</th>
            <th className='text-center'>Status</th>
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