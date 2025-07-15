import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Washing Services", href: "/washing" },
    { label: "Detailing Services", href: "/detailing" },
    { label: "Ultra Premium Services", href: "/ultrapremium" },
    { label: "Extras", href: "/extras" },
    { label: "Contact", href: "/contact" },
  ];

  // Close sidebar when clicking outside or when resizing to desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <nav className="bg-orange-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">CS Car Saloon</div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 items-center font-medium">
          {navItems.map((item, index) =>
            item.href.startsWith("/") ? (
              <Link to={item.href} key={index} className="hover:text-black">
                {item.label}
              </Link>
            ) : (
              <a href={item.href} key={index} className="hover:text-black">
                {item.label}
              </a>
            )
          )}
          <Link
  to="/booking"
  className="relative ml-4 px-4 py-2 rounded-full bg-white text-black overflow-hidden group "
>
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Book Now
  </span>
  <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
</Link>

        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden focus:outline-none z-50"
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
      )}

      {/* Sidebar (Right Slide-In) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col gap-5">
          <button
            className="self-end text-gray-500 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          {navItems.map((item, index) =>
            item.href.startsWith("/") ? (
              <Link
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-orange-500"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-orange-500"
              >
                {item.label}
              </a>
            )
          )}
          <Link
            to="/booking"
            onClick={() => setIsOpen(false)}
            className="mt-3 text-center bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
