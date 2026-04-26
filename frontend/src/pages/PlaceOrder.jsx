import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare order items
      let orderItems = [];
      foodList.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item };
          itemInfo.quantity = cartItems[item._id];
          itemInfo.foodId = item._id;
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 40, // Including delivery fee
      };

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Navigate to verify page
        navigate('/verify?success=true&orderId=' + response.data.orderId);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Place order error:', error);
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = getTotalCartAmount();
  const deliveryFee = 40;

  // Redirect if cart is empty
  if (totalAmount === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">
                Delivery Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                  type="text"
                  placeholder="First name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                  type="text"
                  placeholder="Last name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Email address"
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="street"
                  onChange={onChangeHandler}
                  value={data.street}
                  type="text"
                  placeholder="Street address"
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={data.city}
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={data.state}
                  type="text"
                  placeholder="State"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="zipcode"
                  onChange={onChangeHandler}
                  value={data.zipcode}
                  type="text"
                  placeholder="Zip code"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="country"
                  onChange={onChangeHandler}
                  value={data.country}
                  type="text"
                  placeholder="Country"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <input
                  required
                  name="phone"
                  onChange={onChangeHandler}
                  value={data.phone}
                  type="tel"
                  placeholder="Phone"
                  className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-card sticky top-24">
              <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
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

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-primary">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked
                      readOnly
                      className="text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all btn-ripple disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="loader border-white border-t-transparent w-5 h-5 mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
