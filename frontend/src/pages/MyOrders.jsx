import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { FaBox, FaShippingFast, FaCheckCircle } from 'react-icons/fa';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Food Processing':
        return <FaBox className="text-orange-500" />;
      case 'Out for Delivery':
        return <FaShippingFast className="text-blue-500" />;
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Food Processing':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <FaBox className="text-8xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-8">
              When you place an order, it will appear here
            </p>
            <a
              href="/"
              className="inline-block bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-semibold transition-all btn-ripple"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-card p-6">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono text-primary font-semibold">{order._id}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-primary">₹{order.amount}</p>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="font-semibold text-sm">{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={`${url}/uploads/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-primary">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">Delivery Address</p>
                  <p className="text-sm text-gray-600">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{order.address.street}</p>
                  <p className="text-sm text-gray-600">
                    {order.address.city}, {order.address.state} {order.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-600">{order.address.phone}</p>
                </div>

                {/* Track Order Button */}
                <button
                  onClick={() => fetchOrders()}
                  className="mt-4 w-full md:w-auto bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-all btn-ripple"
                >
                  Track Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
