import React, { useState } from "react";
import ErrorMessage from "../../util/ErrorMessage";

const AddEmployeeModal = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { username, password, role } = formData;
      onSubmit({ username, password, role });
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Add Employee
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-cyan-400 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <ErrorMessage message={errors.username} />
          </div>

          <div className="mb-4">
            <label className="block text-cyan-400 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <ErrorMessage message={errors.password} />
          </div>

          <div className="mb-6">
            <label className="block text-cyan-400 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <ErrorMessage message={errors.confirmPassword} />
          </div>

          <div className="mb-6 flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <span className="text-cyan-400">Admin</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="employee"
                checked={formData.role === "employee"}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <span className="text-cyan-400">Employee</span>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onCancel}
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
