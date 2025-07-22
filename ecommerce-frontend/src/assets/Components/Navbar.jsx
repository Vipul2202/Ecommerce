import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import GoogleLogo from "../../img/images.png";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
const location = useLocation();
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
        setIsSidebarOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [showModal]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
useEffect(() => {
  if (location.state?.openRegister) {
    setShowModal(true);
    setIsLogin(false); // ⬅️ Show register modal
    window.history.replaceState({}, document.title); // Clear state to prevent reopening
  }
}, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (forgotMode) {
  if (!form.email) {
    toast.error("Please enter your email to reset password.");
    return;
  }

  setLoading(true); // start loading

  try {
    await axios.post(import.meta.env.VITE_API_FORGOT_PASSWORD, {
      email: form.email,
    });
    toast.success(`Reset link sent to ${form.email}`);
    setShowModal(false);
    setForgotMode(false);
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to send reset email.");
  } finally {
    setLoading(false); // stop loading
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
        const res = await axios.post(import.meta.env.VITE_API_REGISTER, {
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
        const res = await axios.post(import.meta.env.VITE_API_LOGIN, {
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
          <div className="hidden lg:flex justify-between items-center w-full font-medium">
            <div className="flex gap-24 items-center">
              {navItems.map((item, index) => (
                <Link to={item.href} key={index} className="hover:text-black">
                  {item.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:text-black focus:outline-none"
                >
                  Services
                  <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg flex flex-col z-50">
                    <Link to="/washing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Washing Services</Link>
                    <Link to="/detailing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Detailing Services</Link>
                    <Link to="/ultrapremium" className="block px-4 py-2 hover:bg-gray-100">Ultra Premium Services</Link>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <Link to="/booking" className="relative px-4 py-2 rounded-full bg-white text-black overflow-hidden group">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Book Now</span>
                <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
              </Link>
              {user ? (
                <div className="relative" ref={profileRef}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  />
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-3 z-50">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm truncate w-40" title={user.email}>{user.email}</p>
                      <button
                        onClick={handleLogout}
                        className="mt-2 bg-[#00a0db] text-white w-full rounded py-1 hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="relative px-4 py-2 rounded-full bg-white text-black overflow-hidden group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Register</span>
                  <span className="absolute inset-0 bg-black z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                </button>
              )}
            </div>
          </div>

          <button className="lg:hidden focus:outline-none z-50" onClick={() => setIsSidebarOpen(true)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-5 flex flex-col gap-5">
            <button className="self-end text-gray-500 hover:text-black" onClick={() => setIsSidebarOpen(false)}>✕</button>
            {navItems.map((item, index) => (
              <Link key={index} to={item.href} onClick={() => setIsSidebarOpen(false)} className="hover:text-[#00a0db]">{item.label}</Link>
            ))}
            <div className="relative group">
              <button className="hover:text-black">Services</button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded-xl shadow-lg hidden group-hover:block z-50">
                <Link to="/washing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Washing Services</Link>
                <Link to="/detailing" className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-300">Detailing Services</Link>
                <Link to="/ultrapremium" className="block px-4 py-2 hover:bg-gray-100">Ultra Premium Services</Link>
              </div>
            </div>
            <Link
              to="/booking"
              onClick={() => setIsSidebarOpen(false)}
              className="mt-3 text-center bg-[#00a0db] text-white py-2 rounded-full hover:bg-[#00a0db]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Login/Register Modal */}
    {showModal && (
  <>
    <style>{`body { overflow: hidden; }`}</style>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm relative">
        <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black">×</button>
        <h2 className="text-2xl font-bold mb-6 text-center">
          {forgotMode ? "Reset Password" : isLogin ? "Login" : "Register"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !forgotMode && (
            <>
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring" />
              <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring" />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring" />
          {!forgotMode && (
            <>
            <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleFormChange}
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring pr-10"
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 text-xl"
  >
    {showPassword ? "👁️" : "🙈"}
  </span>
</div>

              {!isLogin && (
                <div className="relative">
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleFormChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring pr-10" />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 text-xl">👁️</span>
                </div>
              )}
            </>
          )}
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 flex justify-center items-center gap-2">
  {loading ? (
    <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  ) : (
    forgotMode ? "Send Reset Link" : isLogin ? "Login" : "Register"
  )}
</button>

        </form>

        <div className="text-center text-sm mt-3">
          {forgotMode ? (
            <p>
              Remember your password?{" "}
              <button onClick={() => setForgotMode(false)} className="text-blue-600 font-medium hover:underline">
                Back to Login
              </button>
            </p>
          ) : isLogin ? (
            <>
              <p>
                Forgot Password?{" "}
                <button onClick={() => setForgotMode(true)} className="text-blue-600 font-medium hover:underline">
                  Click here
                </button>
              </p>
              <p className="mt-2">
                Don't have an account?{" "}
                <button onClick={() => setIsLogin(false)} className="text-blue-600 font-medium hover:underline">
                  Register
                </button>
              </p>
            </>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-blue-600 font-medium hover:underline">
                Login
              </button>
            </p>
          )}
        </div>

        {/* Social Login */}
        <div className="mt-6 text-center">
            <p className="text-black text-sm mb-2">or Login with</p>
          <div className="flex justify-center gap-4">
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition">
              <img src={GoogleLogo} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100 transition">
              <FaFacebook className="text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)}

    </>
  );
};

export default Navbar;
