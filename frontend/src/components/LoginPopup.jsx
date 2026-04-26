import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, loadCartData, loadUserProfile } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    setError('');
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    let newUrl = url;
    if (currentState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        await loadCartData(response.data.token);
        await loadUserProfile(response.data.token);
        setShowLogin(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <form
        onSubmit={onLogin}
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl animate-slide-up relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-display font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {currentState}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4">
          {currentState === 'Sign Up' && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg mt-6 transition-all btn-ripple disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="loader border-white border-t-transparent w-5 h-5 mr-2"></div>
              Processing...
            </span>
          ) : (
            currentState === 'Sign Up' ? 'Create account' : 'Login'
          )}
        </button>

        {/* Terms & Conditions (Sign Up only) */}
        {currentState === 'Sign Up' && (
          <div className="flex items-start gap-2 mt-4 text-sm text-gray-600">
            <input type="checkbox" required className="mt-1" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

        {/* Toggle Login/Sign Up */}
        <p className="text-center mt-6 text-gray-600">
          {currentState === 'Login' ? (
            <>
              Create a new account?{' '}
              <span
                onClick={() => setCurrentState('Sign Up')}
                className="text-primary font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setCurrentState('Login')}
                className="text-primary font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
