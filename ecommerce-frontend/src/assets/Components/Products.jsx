import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const BASE_URL = 'http://localhost:9006';

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/get-categories`);
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch products based on search & category
  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('limit', 1000);
      if (searchTerm) queryParams.append('search', searchTerm);
      if (categoryId) queryParams.append('category', categoryId);

      const response = await axios.get(`${BASE_URL}/user/get-products?${queryParams.toString()}`);
      setProducts(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Load categories on first render
  useEffect(() => {
    fetchCategories();

    const queryParams = new URLSearchParams(location.search);
    const catId = queryParams.get('category');
    if (catId) {
      setCategoryId(catId);
    }
  }, [location.search]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, categoryId]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="mx-auto bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-4 animate-pulse">
        Luxury Car Products
      </h1>

      {/* Category Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          className="text-black px-4 py-2 rounded-lg w-72"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Cars..."
          className="px-4 py-2 rounded-md text-black w-80"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentItems.map((car) => (
          <div
            key={car._id}
            className="bg-orange-700 p-4 rounded-2xl shadow-2xl border border-yellow-400 flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"
              onClick={() => navigate(`/car/${car._id}`)}
            />
            <h2 className="text-xl font-bold">{car.name}</h2>
            <p className="text-yellow-300 font-semibold">₹{car.price}</p>

            <div className="flex gap-2 mt-4">
              <button className="bg-black hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-full">
                Add to Cart
              </button>
              <button className="bg-white text-black hover:text-yellow-900 font-bold py-1 px-3 rounded-full border border-yellow-600">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-orange-700 text-black font-bold'
                : 'bg-orange-900 text-white hover:bg-yellow-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
