import React from 'react';
import { FiUser, FiGrid, FiGift } from "react-icons/fi";

const SideBar = () => {

  return (
    <div className="border rounded py-4 px-3 bg-gray-100 flex flex-col items-center justify-start h-screen w-1/6">
      <div className="mt-4">
        <h4>Panel de Admin</h4>
      </div>
      <div className="flex flex-col justify-center space-y-4 my-4">
        <button className="bg-gray-100 rounded-full hover:bg-gray-400">
          <div className="flex items-center justify-center py-2 px-4">
            <FiUser className="mr-2" /> Usuarios
          </div>
        </button>
        <button className="bg-gray-100 rounded-full hover:bg-gray-400">
          <div className="flex items-center justify-center py-2 px-4">
            <FiGrid className="mr-2" /> Productos
          </div>
        </button>
        <button className="bg-gray-100 rounded-full hover:bg-gray-400">
          <div className="flex items-center justify-center py-2 px-4">
            <FiGift className="mr-2" /> Pedidos
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideBar;




