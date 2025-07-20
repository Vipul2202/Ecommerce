import React, { useState } from "react";

const ForgotPasswordReset = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      alert("Please fill in all fields");
      return;
    }


    alert("Password has been updated successfully.");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-[#00a0db] mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-black mb-2">new Password</label>
          <input
            type="password"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00a0db]"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <label className="block text-black mb-2">confirm Password</label>
          <input
            type="password"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00a0db]"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#00a0db] hover:bg-[#008ac0] text-white py-2 rounded transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordReset;
