import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { displayEditUser, getAllUsers, setEditState } from '../../../../redux/adminSlice';
import { useState, useEffect } from 'react';
import PopUp from '../../PopUp/PopUp';

const Users = ({ user }) => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.admin.allUsers)
//   const editState = useSelector((state) => state.admin.edit)
//   const [refresh, setRefresh] = useState(false)

//   const [edit, setEdit] = useState(user)

//   ESTADOS POP UP
  const [popUp, setPopUp] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')

  const handleEdit = async () => {
    dispatch(setEditState(user))
    dispatch(displayEditUser())
  }

  const handleDelete = () => {
    setPopUpMessage(`Are you sure you want to delete "${user.name}"?`)
    setPopUp(true);
  };

  const handleConfirm = async () => {
    const userId = user.userId;
    // await dispatch(deleteUser(userId));
    setPopUp(false);
    // await dispatch(getallUsers());
    
  };

  useEffect(()=>{
      //cuando se despacha la accion getusers se actualiza el componente
    //   if (refresh) {
        dispatch(getAllUsers());
        // setRefresh(false);
    //   }
  }, []);


  return (
    <>
    {popUp === true && (
      <PopUp trigger={popUp} setTrigger={setPopUp} handleConfirm={handleConfirm}>
        <h3>{popUpMessage}</h3>
        <p className='font-xl'>This user and his information will be deleted!</p>
      </PopUp>
    )}
    <tr key={user.userId} className={user.isActive === false ? 'text-gray-400' : ''}>
      <td>{user.name}</td>
      <td className='text-center'> {user.email}</td>
      <td className='text-center '>{user.role.name}
      </td>
      <td className={user.isActive === false ? '' :`inline-flex px-2 text-xs font-medium leading-5 rounded-full`}>{user.isActive === true ? 'Active' : 'Inactive'}</td>
      <td className='flex-center'>
        <button className='button' onClick={() => handleEdit(user)}>
          <FiEdit />
        </button>
        <button value={user.userId} onClick={user.isActive === true ? handleDelete : undefined} className={user.isActive === false ? 'pointer-events-none opacity-30' : 'button'}>
          <FiTrash2 />
        </button>
      </td>
    </tr>
  </>
  );
};

export default Users;