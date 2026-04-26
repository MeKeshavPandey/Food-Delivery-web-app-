import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 40;

  const handleCheckout = () => {
    if (!token) {
      alert('Please login to proceed to checkout');
      return;
    }
    navigate('/order');
  };

  if (totalAmount === 0) {
    return (
      <div className="min-h-screen py-12 page-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <FaShoppingCart className="text-8xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-semibold transition-all btn-ripple"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {foodList.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <img
                        src={`${url}/uploads/${item.image}`}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop';
                        }}
                      />

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-lg text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-1 mb-2">
                          {item.description}
                        </p>
                        <p className="text-primary font-bold text-xl">₹{item.price}</p>
                      </div>

                      {/* Quantity */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-gray-600 text-sm">Qty: {cartItems[item._id]}</span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="text-primary font-bold text-xl">
                          ₹{item.price * cartItems[item._id]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-card sticky top-24">
              <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">
                Cart Totals
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">₹{deliveryFee}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount + deliveryFee}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg mt-6 transition-all btn-ripple"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-lg mt-3 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
