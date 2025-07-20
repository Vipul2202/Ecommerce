import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { carData } from './Productdata';

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCars = carData.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredCars.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <div className="mx-auto  bg-black text-white p-6">
      <h1 className="text-3xl m font-bold text-center mb-8 text-white animate-pulse">
        Luxury Car Products
      </h1>
      <div className="mb-6 flex justify-center ">
        <input
          type="text"
          placeholder="Search Cars..."
          className="px-4 py-2 rounded-md text-black w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentItems.map((car) => (
          <div
            key={car.id}
            className="bg-orange-700 p-4 rounded-2xl shadow-2xl border border-yellow-400 flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <img
              src={car.images[0]}
              alt={car.name}
              className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"
              onClick={() => navigate(`/car/${car.id}`)}
            />
            <h2 className="text-xl font-bold">{car.name}</h2>
            <p className="text-yellow-300 font-semibold">{car.price}</p>

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
