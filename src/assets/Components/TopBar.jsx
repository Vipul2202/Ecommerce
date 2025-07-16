import React from "react";
import logo from "../../../src/img/logo.jpg";

const TopBar = () => {
  return (
    <div className="w-full bg-black border-b border h-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

          {/* Logo Section */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <a href="/" className="block w-20">
              <img
                draggable="false"
                src={logo}
                alt="CarSaloon Logo"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          {/* Info Section - Horizontal with gap */}
          <div className="w-full flex flex-wrap lg:flex-nowrap justify-center lg:justify-end items-center gap-12 text-white text-sm">
            
            {/* Opening Hour */}
            <div className="flex items-center gap-2">
              <i className="far fa-clock text-xl" />
              <div className="leading-tight">
                <h3 className="font-semibold text-white">Opening Hour</h3>
                <p>Mon – Fri, 7:00 – 5:00</p>
                <p>Sat–Sun, Appointment Only</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex items-center gap-2">
              <i className="fa fa-phone-alt text-xl" />
              <div className="leading-tight">
                <h3 className="font-semibold text-white">Call Us</h3>
                <p>0430 170 164</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-center gap-2">
              <i className="far fa-envelope text-xl" />
              <div className="leading-tight">
                <h3 className="font-semibold text-white">Email Us</h3>
                <p>info@carsaloon.com.au</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
