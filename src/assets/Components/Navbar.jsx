import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Washing Services", href: "#wash" },
    { label: "Detailing Services", href: "#detail" },
    { label: "Ultra Premium Services", href: "/ultrapremium" },
  { label: "Extras", href: "/extras" }, 
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full bg-orange-500 shadow-md sticky top-0 z-50 text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-col lg:flex-row justify-between items-center gap-4">

        {/* Mobile Toggle */}
        <div className="w-full flex justify-end lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Nav Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:justify-between`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 text-sm font-medium text-white">
            {navItems.map((item, index) =>
              item.href.startsWith("/") ? (
                <Link
                  key={index}
                  to={item.href}
                  className="py-2 px-3 rounded hover:text-black transition"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="py-2 px-3 rounded hover:text-black transition"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-3 lg:mt-0 lg:ml-6 flex justify-center lg:justify-end">
            <Link
              to="/booking"
              className="relative inline-block bg-white hover:bg-black text-black hover:text-white font-semibold py-2 px-5 rounded-full transition duration-200"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
