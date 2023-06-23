import React, { useState } from 'react';
import { FiUser, FiGrid, FiGift, FiPlus } from "react-icons/fi";
import { IoStorefrontSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { displayProductList, displayCreate, displayUsers } from '../../../redux/adminSlice';
import { Link } from 'react-router-dom';


const SideBar = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState('products');

  const listHandler = (event) => {
    dispatch(displayProductList());
    const id = event.currentTarget.id;
    setActiveButton(id);
  };
  const userListHandler = (event) => {
    dispatch(displayUsers());

  };

  const createProductHandler = (event) => {
    dispatch(displayCreate());
    setActiveButton('create');
  };

  return (
    <div className="border rounded py-4 px-3 bg-gray-100 flex flex-col items-center justify-start h-screen w-1/6">
      <div className="mt-4">
        <h4>Admin Panel</h4>
      </div>
      <div className="flex flex-col justify-center space-y-4 my-4">
        <button 
          className={`bg-gray-100 rounded-full hover:bg-gray-400 ${
            activeButton === 'users' ? 'underline' : ''
          }`}
          onClick={(event) => userListHandler(event)}
          id='users'
          >
          <div className="flex items-center justify-center py-2 px-4">
            <FiUser className="mr-2" /> Users
          </div>
        </button>
        <button
          className={`bg-gray-100 rounded-full hover:bg-gray-400 ${
            activeButton === 'products' ? 'underline' : ''
          }`}
          onClick={(event) => listHandler(event)}
          id='products'
        >
          <div className="flex items-center justify-center py-2 px-4">
            <FiGrid className="mr-2" /> Products
          </div>
        </button>
        <button 
          className={`bg-gray-100 rounded-full hover:bg-gray-400 ${
            activeButton === 'orders' ? 'underline' : ''
          }`}
          onClick={(event) => listHandler(event)}
          id='orders'
          >
          <div className="flex items-center justify-center py-2 px-4">
            <FiGift className="mr-2" /> Orders
          </div>
        </button>
        <button
          className='text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple rounded-full'
          onClick={(event) => createProductHandler(event)}
        >
          <div className="flex items-center justify-center py-2 px-4">
            <FiPlus className="mr-2" /> Create product
          </div>
        </button>
        <Link to="/" className='text-white bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:shadow-outline-blue rounded-full'>
          <div className="flex items-center justify-center py-2 px-4">
            <IoStorefrontSharp className="mr-2" /> Go To Store
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
