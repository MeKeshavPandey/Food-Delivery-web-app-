import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  if (success === 'true') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 page-transition">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl p-8 shadow-card text-center">
            <div className="mb-6">
              <FaCheckCircle className="text-7xl text-green-500 mx-auto animate-bounce" />
            </div>
            
            <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
              Order Placed Successfully!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your order has been confirmed. You will receive your food soon.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-mono text-primary font-semibold">{orderId}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Payment:</strong> Cash on Delivery
              </p>
              <p className="text-sm text-blue-800 mt-2">
                Please keep the exact amount ready when your order arrives.
              </p>
            </div>

            <button
              onClick={() => navigate('/orders')}
              className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all btn-ripple mb-3"
            >
              View My Orders
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 rounded-lg transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 page-transition">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl p-8 shadow-card text-center">
          <div className="mb-6">
            <FaTimesCircle className="text-7xl text-red-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
            Order Failed
          </h1>
          
          <p className="text-gray-600 mb-6">
            Something went wrong with your order. Please try again.
          </p>

          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all btn-ripple"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
