import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBox, FaShippingFast, FaCheckCircle } from 'react-icons/fa';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        toast.success('Order status updated');
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Food Processing':
        return 'bg-orange-100 text-orange-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-96">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-display font-bold text-gray-800 mb-8">Order Management</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <FaBox className="text-8xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6">
              {/* Order Header */}
              <div className="grid md:grid-cols-4 gap-4 mb-6 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="font-mono text-sm text-primary font-semibold">{order._id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer</p>
                  <p className="font-semibold text-gray-800">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{order.address.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">₹{order.amount}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment</p>
                  <p className="text-sm font-semibold text-gray-800">{order.paymentMethod}</p>
                  <p className={`text-sm ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>
                    {order.payment ? 'Paid' : 'Pending'}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <img
                        src={`${url}/uploads/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Delivery Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">{order.address.street}</p>
                  <p className="text-sm text-gray-700">
                    {order.address.city}, {order.address.state} {order.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-700">{order.address.country}</p>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">Current Status:</span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:w-auto"
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
