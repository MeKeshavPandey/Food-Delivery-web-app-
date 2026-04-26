import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 mt-20" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MdRestaurantMenu className="text-3xl text-primary" />
              <span className="text-2xl font-display font-bold text-white">
                FoodExpress
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your favorite food delivery service. We deliver delicious meals from the best restaurants right to your doorstep. Fast, fresh, and always on time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-gray-400">
              <li>+91 9876543210</li>
              <li>contact@foodexpress.com</li>
              <li>
                123 Food Street<br />
                Mumbai, India 400001
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center text-gray-400 text-sm">
          <p>&copy; 2024 FoodExpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
