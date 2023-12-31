import { FiTrash2, FiEdit } from 'react-icons/fi';
import {FaUndoAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { displayEditUser, getAllUsers, setEditState, deleteUser, finalDeleteUser } from '../../../../redux/adminSlice';
import { useState, useEffect } from 'react';
import PopUp from '../../PopUp/PopUp';
import {toast, Toaster} from 'react-hot-toast'

const Users = ({ user }) => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.admin.allUsers)
  const {refresh, filterRole, sort2, filterActive} = useSelector((state)=> state.admin)

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

  const handleFinalDelete =()=>{
    dispatch(finalDeleteUser(user.userId))
    toast.success('Usuario eliminado con exito')
  }

  const handleConfirm = async () => {
    const userId = user.userId;
    await dispatch(deleteUser(userId));
    setPopUp(false);
    //si es para eliminar al usuario que aparezca un toast con usuario eliminado con exito
    if(user.isActive) toast.success('Usuario desactivado con exito')
    if(!user.isActive) toast.success('Usuario re-activado con exito')
    //await dispatch(getallUsers());
    
  };

  let roleClass = ''; 
  let role = ''

  //depende de como se traiga la propiedad del role
  // cambia con search y getAllUsers
  if (!user.role || !user.role.name) {    
    role = user.roleRoleId;
  } else {
    role = user.role.name;
  }
  
  if (role === 'admin' ) {
    roleClass = 'text-blue-700 bg-blue-100';
  } else if (role === 'user') {
    roleClass = 'text-red-700 bg-red-100';
  }

  useEffect(()=>{
    if(!filterRole && filterActive === '' && sort2 === '') dispatch(getAllUsers())
  }, [refresh]);


  return (
    <>

    {popUp === true && (
      <PopUp trigger={popUp} setTrigger={setPopUp} handleConfirm={handleConfirm}>
        <h3>{popUpMessage}</h3>
        {
          user.isActive === true &&
          <div className='mt-2 w-1/2 mx-auto'>
            <p>You can also permanently delete the user and all their information. This action <b>cannot</b> de undone </p>
            <button className="bg-red-500 hover:bg-red-600 font-medium rounded-lg border-none px-4 py-2.5 text-sm text-white ease-in-out transition-colors" onClick={handleFinalDelete}>Delete permanently</button>
          </div>
        }
      </PopUp>
    )}
    <Toaster/>
    <tr key={user.userId} className={user.isActive === false ? 'text-gray-400' : ''}>
      <td>{user.name}</td>
      <td className='text-center'> {user.email}</td>
      <td className='text-center'>
      <span className={user.isActive === false ? '' : `inline-flex px-2 text-xs font-medium leading-5 rounded-full ${roleClass}`}>
        {role}
      </span>
      </td>
      <td className={user.isActive === false ? 'text-center' :`text-center font-medium`}>{user.isActive === true ? 'Active' : 'Inactive'}</td>
      <td className='revert'>
        <button className='button' onClick={() => handleEdit(user)}>
          <FiEdit />
        </button>
        <button value={user.userId} onClick={handleDelete} className={user.isActive === false ? 'text-lime-500' : 'button'}>
          { user.isActive 
          ? <FiTrash2/>
          : <FaUndoAlt className='text-purple-600 hover:text-purple-800' title='Re-activate user'/>
          }
        </button>
      </td>
    </tr>
  </>
  );
};

export default Users;