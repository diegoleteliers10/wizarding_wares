import { FiTrash2, FiEdit } from 'react-icons/fi';
import {FaUndoAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { displayEditUser, getAllUsers, setEditState, deleteUser } from '../../../../redux/adminSlice';
import { useState, useEffect } from 'react';
import PopUp from '../../PopUp/PopUp';

const Users = ({ user }) => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.admin.allUsers)
  const {refresh} = useSelector((state)=> state.admin)

//   ESTADOS POP UP
  const [popUp, setPopUp] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')

  const handleEdit = async () => {
    dispatch(setEditState(user))
    dispatch(displayEditUser())
  }

  const handleDelete = () => {
    if(user.isActive) setPopUpMessage(`Are you sure you want to delete "${user.name}"?`)
    if(!user.isActive) setPopUpMessage(`Are you sure you want to re-activate "${user.name}"?`)    
    setPopUp(true);
    //dispatch(deleteUser(user.userId))
  };

  const handleConfirm = async () => {
    const userId = user.userId;
    await dispatch(deleteUser(userId));
    setPopUp(false);
    //await dispatch(getallUsers());
    
  };

  let roleClass = ''; 

  if (user.role.name === 'admin') {
    roleClass = 'text-blue-700 bg-blue-100';
  } else if (user.role.name === 'user') {
    roleClass = 'text-red-700 bg-red-100';
  }

  useEffect(()=>{
    dispatch(getAllUsers());
  }, [refresh]);


  return (
    <>
    {popUp === true && (
      <PopUp trigger={popUp} setTrigger={setPopUp} handleConfirm={handleConfirm}>
        <h3>{popUpMessage}</h3>
      </PopUp>
    )}
    <tr key={user.userId} className={user.isActive === false ? 'text-gray-400' : ''}>
      <td>{user.name}</td>
      <td className='text-center'> {user.email}</td>
      <td className='text-center'>
      <span className={user.isActive === false ? '' : `inline-flex px-2 text-xs font-medium leading-5 rounded-full ${roleClass}`}>
        {user.role.name}
      </span>
      </td>
      <td className={user.isActive === false ? 'text-center' :`text-center font-medium`}>{user.isActive === true ? 'Active' : 'Inactive'}</td>
      <td className='revert'>
        <button className='button' onClick={() => handleEdit(user)}>
          <FiEdit />
        </button>
        <button value={user.userId} onClick={handleDelete} className={user.isActive === false ? 'text-lime-500' : 'button'}>
          { user.isActive 
          ? <FiTrash2 />
          : <FaUndoAlt className='text-purple-600 hover:text-purple-800' title='Re-activate user'/>
          }
        </button>
      </td>
    </tr>
  </>
  );
};

export default Users;