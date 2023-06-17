import React from 'react';
import { FiUser, FiGrid, FiGift } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { displayProductList, displayCreate } from '../../../redux/productSlice';

const SideBar = () => {

  const dispatch = useDispatch()

  const productListHandler =  (event) => {
    dispatch(displayProductList()) 
  }
  const createProductHandler =  (event) => {
    dispatch(displayCreate()) 
  }

  return (
    <div className="border rounded py-4 px-3 bg-gray-100 flex flex-col items-center justify-start h-screen w-1/6">
      <div className="mt-4">
        <h4>Admin Panel</h4>
      </div>
      <div className="flex flex-col justify-center space-y-4 my-4">
        <button className="bg-gray-100 rounded-full hover:bg-gray-400">
          <div className="flex items-center justify-center py-2 px-4">
            <FiUser className="mr-2" /> Users
          </div>
        </button>
        <button className="bg-gray-100 rounded-full hover:bg-gray-400" onClick={(event) => productListHandler(event)}>
          <div className="flex items-center justify-center py-2 px-4">
            <FiGrid className="mr-2" /> Products
          </div>
        </button>
        <button className="bg-gray-100 rounded-full hover:bg-gray-400">
          <div className="flex items-center justify-center py-2 px-4">
            <FiGift className="mr-2" /> Orders
          </div>
        </button>
        <button className="bg-gray-100 rounded-full hover:bg-gray-400" onClick={(event) => createProductHandler(event)}>
          <div className="flex items-center justify-center py-2 px-4">
            <FiGift className="mr-2" /> create product
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideBar;




