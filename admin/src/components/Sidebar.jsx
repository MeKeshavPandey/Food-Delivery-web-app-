import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaListUl, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-display font-bold text-gray-800 mb-6">Menu</h2>
        
        <nav className="space-y-2">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <FaPlus />
            <span className="font-medium">Add Items</span>
          </NavLink>

          <NavLink
            to="/list"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <FaListUl />
            <span className="font-medium">List Items</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <FaClipboardList />
            <span className="font-medium">Orders</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
