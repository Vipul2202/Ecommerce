import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import GoogleLogo from "../../img/images.png";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const dropdownRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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
    { label: "Products", href: "/products" },
    { label: "Extras", href: "/extras" },
    { label: "Gallery", href: "/gallery" },
  ];

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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [showModal]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotMode) {
      if (!form.email) {
        toast.error("Please enter your email to reset password.");
        return;
      }
      try {
        await axios.post("/api/user/forgot-password", { email: form.email });
        toast.success(`Reset link sent to ${form.email}`);
        setShowModal(false);
        setForgotMode(false);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send reset email.");
      }
      return;
    }

    if (!isLogin) {
      if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
        toast.error("All fields are required");
        return;
      }
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const res = await axios.post("http://localhost:9006/user/register", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
        toast.success("Registration successful!");
        setIsLogin(true);
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed.");
      }
    } else {
      if (!form.email || !form.password) {
        toast.error("Email and Password are required");
        return;
      }

      try {
        const res = await axios.post("http://localhost:9006/user/login", {
          email: form.email,
          password: form.password,
        });
        toast.success("Login successful!");
        localStorage.setItem("token", res.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(res.data?.data?.user));
        setUser(res.data?.data?.user);
        setShowModal(false);
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-[#00a0db] text-white sticky top-0 z-50 shadow-2xl">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-between items-center w-full font-medium">
            {/* Left side: Navigation Links */}
            <div className="flex gap-24 items-center">
              {navItems.map((item, index) => (
                <Link to={item.href} key={index} className="hover:text-black">
                  {item.label}
                </Link>
              ))}
              {/* Services Dropdown */}
              <div className="relative group">
                <button className="hover:text-black">Services</button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg hidden group-hover:block z-50">
                  <Link to="/washing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Washing Services</Link>
                  <Link to="/detailing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Detailing Services</Link>
                  <Link to="/ultrapremium" className="block px-4 py-2 hover:bg-gray-100  border-gray-300">Ultra Premium Services</Link>
                </div>
              </div>
            </div>

            {/* Right side: Book Now & Profile */}
            <div className="flex items-center gap-4 ml-auto">
              <Link
                to="/booking"
                className="relative px-4 py-2 rounded-full bg-white text-black overflow-hidden group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Book Now
                </span>
                <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
              </Link>

              {user ? (
                <div className="relative group">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-3 hidden group-hover:block z-50">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="mt-2 bg-[#00a0db] text-white w-full rounded py-1 hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="relative px-4 py-2 rounded-full bg-white text-black overflow-hidden group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Register
                  </span>
                  <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                </button>
              )}
            </div>
          </div>

          {/* Hamburger Button */}
          <button
            className="lg:hidden focus:outline-none z-50"
            onClick={() => setIsOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-5 flex flex-col gap-5">
            <button className="self-end text-gray-500 hover:text-black" onClick={() => setIsOpen(false)}>
              ✕
            </button>
            {navItems.map((item, index) => (
              <Link key={index} to={item.href} onClick={() => setIsOpen(false)} className="hover:text-orange-500">
                {item.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="hover:text-black">Services</button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg hidden group-hover:block z-50">
                <Link to="/washing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Washing Services</Link>
                <Link to="/detailing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Detailing Services</Link>
                <Link to="/ultrapremium" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Ultra Premium Services</Link>
              </div>
            </div>
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

      {/* Auth Modal */}
      {showModal && (
        <>
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
                {forgotMode ? (
                  <>
                    <input name="email" placeholder="Enter your email" className="w-full border p-2 rounded" onChange={handleFormChange} />
                    <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
                      Send Reset Link
                    </button>
                    <div className="text-center text-sm text-blue-600 hover:underline mt-2">
                      <button type="button" onClick={() => setForgotMode(false)}>Back to Login</button>
                    </div>
                  </>
                ) : (
                  <>
                    {!isLogin && (
                      <>
                        <input name="name" placeholder="Full Name" className="w-full border p-2 rounded" onChange={handleFormChange} />
                        <input name="phone" placeholder="Phone Number" className="w-full border p-2 rounded" onChange={handleFormChange} />
                      </>
                    )}
                    <input name="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleFormChange} />
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full border p-2 rounded pr-10" onChange={handleFormChange} />
                      <button type="button" className="absolute right-2 top-2 text-xl" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "👁️" : "🙈"}
                      </button>
                    </div>
                    {!isLogin && (
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="w-full border p-2 rounded pr-10" onChange={handleFormChange} />
                        <button type="button" className="absolute right-2 top-2 text-xl" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? "👁️" : "🙈"}
                        </button>
                      </div>
                    )}
                    {isLogin && (
                      <div className="text-right">
                        <button type="button" className="text-blue-600 text-sm hover:underline" onClick={() => setForgotMode(true)}>Forgot Password?</button>
                      </div>
                    )}
                    <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
                      {isLogin ? "Login" : "Register"}
                    </button>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                      <button type="button" onClick={() => { setIsLogin(!isLogin); setShowPassword(false); }} className="text-blue-600 hover:underline">
                        {isLogin ? "Register" : "Login"}
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center items-center gap-6">
                      <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-lg">
                        <img src={GoogleLogo} draggable="false" alt="Google" className="w-6 h-6" />
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
