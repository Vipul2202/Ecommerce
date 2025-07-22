import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftCircle } from 'react-feather';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:9006';

  const fetchCarDetail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get-product/${id}`);
      setCar(response.data?.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetail();
  }, [id]);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!car) return <div className="text-white p-6">Car not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-700 hover:text-orange-500"
        >
          <ArrowLeftCircle /> <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">{car.name}</h1>
      </div>

      {/* Single image */}
      {car.image && (
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-60 object-cover rounded-xl border-2 border-orange-700 mb-6"
        />
      )}

      {/* Details */}
      <p className="text-lg">{car.description}</p>
      <p className="text-orange-700 text-2xl font-semibold my-4">₹{car.price}</p>
      <div className="flex gap-4 mt-4">
        <button className="bg-orange-700 hover:bg-orange-800 px-6 py-2 rounded-xl">Buy Now</button>
        <button className="bg-black border border-orange-700 px-6 py-2 rounded-xl">Add to Cart</button>
      </div>
    </div>
  );
};

export default CarDetailPage;
