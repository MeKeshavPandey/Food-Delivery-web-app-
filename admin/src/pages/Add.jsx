import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });
  const [loading, setLoading] = useState(false);

  const categories = ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'];

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding food:', error);
      toast.error(error.response?.data?.message || 'Failed to add food item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-display font-bold text-gray-800 mb-8">Add New Food Item</h1>

      <form onSubmit={onSubmitHandler} className="max-w-2xl bg-white rounded-xl shadow-md p-8">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all bg-gray-50"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center">
                <FaCloudUploadAlt className="text-5xl text-gray-400 mb-2" />
                <p className="text-gray-500">Click to upload image</p>
              </div>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
          />
        </div>

        {/* Product Name */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter product name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Product Description */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Product Description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="4"
            placeholder="Write content here"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        {/* Category and Price */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Category</label>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Price (₹)</label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Enter price"
              required
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="loader border-white border-t-transparent w-5 h-5 mr-2"></div>
              Adding...
            </span>
          ) : (
            'Add Food Item'
          )}
        </button>
      </form>
    </div>
  );
};

export default Add;
