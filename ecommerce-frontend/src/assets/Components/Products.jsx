import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import Lottie from 'react-lottie';
import noDataImage from '../../../src/img/no-data.png';
import { toast } from 'react-toastify';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ label: "All Categories", value: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
     const res = await axios.get("http://localhost:9006/user/get-categories", {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      const fetched = res.data?.data || [];
      setCategories(fetched);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch products
  const fetchProducts = async (categoryId = null) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `http://localhost:9006/user/get-products?category=${categoryId}`
        : `http://localhost:9006/user/get-products`;

      const res = await axios.get(url);
      setProducts(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory?.value || null);
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
  if (!user) {
    toast.warning("You need to login first to add items to the cart.");
    navigate("/", { state: { openLogin: true } });
    return;
  }

    toast.success(`Added ${product.name} to cart`);
    console.log("Add to cart:", product);
  };

  const handleProductClick = (product) => {
    navigate(`/car-details/${product._id}`);
  };

  const categoryOptions = [
    { label: "All Categories", value: null },
    ...categories.map((cat) => ({ label: cat.name, value: cat._id })),
  ];

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">All Products</h2>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Filter by Category</label>
          <Select
            options={categoryOptions}
            value={categoryOptions.find((opt) => opt.value === selectedCategory?.value)}
            onChange={setSelectedCategory}
            placeholder="Select category..."
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <img src={noDataImage} alt="No Data" className="w-64 mt-4" />
            <p className="text-lg text-gray-600 mt-2">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={product?.image}
                  alt={product.name}
                  className="h-40 w-full object-cover cursor-pointer"
                  onClick={() => handleProductClick(product)}
                />
                <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-700 mt-1">{product.description}</p>
                <p className="text-lg font-bold mt-2">₹{product.price}</p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
