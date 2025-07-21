import React, { useState } from "react";
import axios from "axios";

const BookNow = () => {
  const [formData, setFormData] = useState({
    car_type: "",
    vechile_registration: "",
    services: [],
    booking_date: "",
    booking_time: "",
    first_Name: "",
    last_Name: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeStr = formData.time;

    if (!timeStr) {
      return;
    }

    const [hour, minute] = timeStr.split(":").map(Number);
    const totalMinutes = hour * 60 + minute;

    const minMinutes = 7 * 60;
    const maxMinutes = 17 * 60;

    if (totalMinutes < minMinutes || totalMinutes > maxMinutes) {
      return;
    }

    try {
      setIsLoading(true);
      const payload = [formData];
      const response = await axios.post("http://localhost:9006/user/create-booking", payload);

      if (response.status === 200 || response.status === 201) {
        setFormData({
          car_type: "",
          vechile_registration: "",
          services: [],
          booking_date: "",
          booking_time: "",
          first_Name: "",
          last_Name: "",
          email: "",
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Success</h2>
            <p>Your booking has been successfully submitted!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-[#00a0db] text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="loader border-4 border-white border-t-[#00a0db] rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00a0db] mb-4">Book Now</h1>
        <nav className="text-gray-600">
          <span className="text-[#00a0db]">Home</span>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </nav>
      </div>

      <div className="flex justify-center items-center flex-1 px-4 py-10 bg-black">
        <div className="w-full max-w-4xl bg-black text-white">
          <div className="bg-[#00a0db] text-center py-2 rounded mb-6 text-white font-semibold">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
              {servicesList.map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={service}
                    onChange={handleServiceChange}
                    className="accent-[#00a0db]"
                    checked={formData.services.includes(service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block mb-1 font-medium text-white">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="p-2 text-black rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="time" className="block mb-1 font-medium text-white">Clock</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="p-2 text-black rounded w-full"
                  min="07:00"
                  max="17:00"
                />
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-white">Email</label>
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
                <label htmlFor="phone" className="block mb-1 font-medium text-white">Phone Number</label>
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

            <div className="text-center">
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-[#00a0db] hover:text-white transition"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
