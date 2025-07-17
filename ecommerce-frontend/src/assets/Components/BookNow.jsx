import React, { useState } from "react";

const BookNow = () => {
  const [formData, setFormData] = useState({
    carType: "",
    registration: "",
    services: [],
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const servicesList = [
    "Outside Only", "Mini Detail", "Ceramic Coating", "Paintless Dent Removal", "Head Light Restoration",
    "Inside and Outside", "Interior Detail", "Interior Protection Pack", "Stage 3 Paint Correction", "Leather Clean/Seats Steam Clean",
    "Premium Wash", "Full Detail", "Windows Tinting", "Buff and Polish", "Dog Hair Removal"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((service) => service !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">

      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Book Now</h1>
        <nav className="text-gray-600">
          <span className="text-orange-500">Home</span>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </nav>
      </div>


      <div className="flex justify-center items-center flex-1 px-4 py-10 bg-black">
        <div className="w-full max-w-4xl bg-black text-white">
          <div className="bg-orange-600 text-center py-2 rounded mb-6 text-white font-semibold">
            Book A Service
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="carType" className="block mb-1 font-medium text-white">Choose Car Type</label>
                <select
                  name="carType"
                  id="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="p-2 text-black rounded w-full"
                >
                  <option value="">--Select--</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                </select>
              </div>

              <div>
                <label htmlFor="registration" className="block mb-1 font-medium text-white">Vehicle Registration</label>
                <input
                  type="text"
                  id="registration"
                  name="registration"
                  placeholder="Enter Vehicle Registration"
                  value={formData.registration}
                  onChange={handleChange}
                  className="p-2 text-black rounded w-full"
                />
              </div>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
              {servicesList.map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={service}
                    onChange={handleServiceChange}
                    className="accent-orange-500"
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label htmlFor="firstName" className="block mb-1 font-medium text-white">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-2 text-black rounded w-full"
              />
              </div>
<div>
    <label htmlFor="firstName" className="block mb-1 font-medium text-white">Clock</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="p-2 text-black rounded w-full"
              />
              </div>
            </div>

            {/* Name */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label htmlFor="firstName" className="block mb-1 font-medium text-white">First Name</label>
    <input
      type="text"
      id="firstName"
      name="firstName"
      placeholder="First Name"
      value={formData.firstName}
      onChange={handleChange}
      className="p-2 text-black rounded w-full"
    />
  </div>
  <div>
    <label htmlFor="lastName" className="block mb-1 font-medium text-white">Last Name</label>
    <input
      type="text"
      id="lastName"
      name="lastName"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={handleChange}
      className="p-2 text-black rounded w-full"
    />
  </div>
</div>


            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label htmlFor="firstName" className="block mb-1 font-medium text-white">Email</label>
          
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 text-black rounded w-full"
              />
                  </div>
                  <div>
                     <label htmlFor="firstName" className="block mb-1 font-medium text-white">Phone Number</label>
                
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 text-black rounded w-full"
              />
               </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default BookNow;
