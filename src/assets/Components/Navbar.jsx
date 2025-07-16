import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import GoogleLogo from "../../img/images.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const sidebarRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Washing Services", href: "/washing" },
    { label: "Detailing Services", href: "/detailing" },
    { label: "Ultra Premium Services", href: "/ultrapremium" },
    { label: "Extras", href: "/extras" },
    { label: "Contact", href: "/contact" },
  ];

  // Close sidebar when clicking outside or resizing
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
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (forgotMode) {
      if (!form.email) {
        alert("Please enter your email to reset password.");
        return;
      }
      alert(`Reset password link sent to ${form.email}`);
      setShowModal(false);
      setForgotMode(false);
      return;
    }

    if (!isLogin) {
      if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
        alert("All fields are required");
        return;
      }
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    } else {
      if (!form.email || !form.password) {
        alert("Email and Password are required");
        return;
      }
    }

    alert("Form submitted successfully!");
    setShowModal(false);
  };


  return (
    <>
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
              className="relative ml-4 px-4 py-2 rounded-full bg-white text-black overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Book Now
              </span>
              <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="relative ml-4 px-4 py-2 rounded-full bg-white text-black overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Register
              </span>
              <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </button>
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
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
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

      {/* Register/Login Modal */}
      {showModal && (
        <>
          {/* Prevent body scroll */}
          <style>{`body { overflow: hidden; }`}</style>

          <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>

          <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
              <button
                className="absolute top-3 right-3 text-gray-600"
                onClick={() => {
                  setShowModal(false);
                  setForgotMode(false);
                  setShowPassword(false);
                }}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center">
                {forgotMode ? "Forgot Password" : isLogin ? "Login" : "Register"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Forgot Password UI */}
                {forgotMode ? (
                  <>
                    <input
                      name="email"
                      placeholder="Enter your email"
                      className="w-full border p-2 rounded"
                      onChange={handleFormChange}
                    />
                    <button
                      type="submit"
                      className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                    >
                      Send Reset Link
                    </button>
                    <div className="text-center text-sm text-blue-600 hover:underline mt-2">
                      <button type="button" onClick={() => setForgotMode(false)}>
                        Back to Login
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Registration extra fields */}
                    {!isLogin && (
                      <>
                        <input
                          name="name"
                          placeholder="Full Name"
                          className="w-full border p-2 rounded"
                          onChange={handleFormChange}
                        />
                        <input
                          name="phone"
                          placeholder="Phone Number"
                          className="w-full border p-2 rounded"
                          onChange={handleFormChange}
                        />
                      </>
                    )}

                    <input
                      name="email"
                      placeholder="Email"
                      className="w-full border p-2 rounded"
                      onChange={handleFormChange}
                    />

                    {/* Password with toggle */}
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full border p-2 rounded pr-10"
                        onChange={handleFormChange}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-xl"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "👁️" : "🙈"}
                      </button>
                    </div>

                    {/* Confirm password if registering */}
                    {!isLogin && (
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          className="w-full border p-2 rounded pr-10"
                          onChange={handleFormChange}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-xl"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "👁️" : "🙈"}
                        </button>
                      </div>
                    )}

                    {/* Forgot password link */}
                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          className="text-blue-600 text-sm hover:underline"
                          onClick={() => setForgotMode(true)}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                    >
                      {isLogin ? "Login" : "Register"}
                    </button>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setShowPassword(false);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        {isLogin ? "Register" : "Login"}
                      </button>
                    </div>

                    {/* Centered circular social icons */}
                    <div className="mt-6 flex justify-center items-center gap-6">
                      <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-lg">
                        <img src={GoogleLogo} alt="Google" className="w-6 h-6" />
                      </button>
                      <button className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
                        <FaFacebook size={20} />
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </>
      )}


    </>
  );
};

export default Navbar;
