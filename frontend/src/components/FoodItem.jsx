import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group card-hover">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={`${url}/uploads/${image}`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
          }}
        />
        
        {/* Add to Cart Buttons */}
        {!cartItems[id] ? (
          <button
            onClick={() => addToCart(id)}
            className="absolute bottom-8 right-4 bg-white text-primary font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all btn-ripple flex items-center gap-2"
          >
            <FaPlus className="text-sm" /> Add to Cart
          </button>
        ) : (
          <div className="absolute bottom-8 right-4 bg-white rounded-full flex items-center gap-3 px-3 py-2 shadow-lg">
            <button
              onClick={() => removeFromCart(id)}
              className="text-primary hover:text-red-500 transition-colors"
            >
              <FaMinus />
            </button>
            <span className="font-semibold">{cartItems[id]}</span>
            <button
              onClick={() => addToCart(id)}
              className="text-primary hover:text-green-500 transition-colors"
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg text-gray-800">{name}</h3>
          <div className="flex text-yellow-400 text-sm">
            ⭐⭐⭐⭐⭐
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">₹{price}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Fast Delivery
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
