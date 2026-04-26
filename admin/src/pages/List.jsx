import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching food list');
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error('Failed to fetch food items');
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await axios.delete(`${url}/api/food/${foodId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing food:', error);
      toast.error('Failed to delete food item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-96">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-display font-bold text-gray-800 mb-8">All Food Items</h1>

      {list.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No food items found. Add some items to get started!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {list.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={`${url}/uploads/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary">₹{item.price}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeFood(item._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {list.map((item) => (
              <div key={item._id} className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`${url}/uploads/${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full">
                        {item.category}
                      </span>
                      <span className="font-bold text-primary">₹{item.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFood(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
