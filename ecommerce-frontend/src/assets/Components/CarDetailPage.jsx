// src/CarDetailPage.jsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { carData } from './data'
// import { carData } from '../../assets/Components/Productdata' // Adjust the import path as necessary
import { carData } from './Productdata'
import { ArrowLeftCircle } from 'react-feather'

const CarDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = carData.find((car) => car.id === parseInt(id))

  if (!car) return <div className="text-white">Car not found.</div>

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

      {/* Image gallery */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {car.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`car-img-${index}`}
            className="w-full h-60 object-cover rounded-xl border-2 border-orange-700"
          />
        ))}
      </div>

      {/* Details */}
      <p className="text-lg">{car.description}</p>
      <p className="text-orange-700 text-2xl font-semibold my-4">{car.price}</p>
      <div className="flex gap-4 mt-4">
        <button className="bg-orange-700 hover:bg-orange-800 px-6 py-2 rounded-xl">Buy Now</button>
        <button className="bg-black border border-orange-700 px-6 py-2 rounded-xl">Add to Cart</button>
      </div>
    </div>
  )
}

export default CarDetailPage
