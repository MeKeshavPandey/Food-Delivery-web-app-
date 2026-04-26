import React from 'react';
import { MdRestaurantMenu } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MdRestaurantMenu className="text-3xl text-primary" />
            <div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FoodExpress
              </span>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">admin@foodexpress.com</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
