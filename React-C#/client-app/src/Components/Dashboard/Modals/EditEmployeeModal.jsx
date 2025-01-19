import React, { useState, useEffect } from "react";
import ErrorMessage from "../../util/ErrorMessage";

const EditEmployeeModal = ({ isOpen, onClose, employee, onUpdate }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: employee?.username || "",
    password: employee?.password || "",
    role: employee?.role || "admin",
  });

  // Update formData whenever employee prop changes
  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        username: employee.username || "",
        password: employee.password || "",
        role: employee.role || "admin",
      });
    }
  }, [employee, isOpen]);

  // Reset error message when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdate = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!formData.username || !formData.password || !formData.role) {
      setError("All fields are required.");
      return;
    }

    setError(null); // Clear error if fields are valid
    onUpdate(formData); // Call the onUpdate function with the updated data
    onClose(); // Close the modal after the update
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-96">
        <h2 className="text-2xl text-white mb-6">Update Employee</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.username || ""} // Ensure username is not undefined
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="text"
              value={formData.password || ""} // Ensure password is not undefined
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Role</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-300">Admin</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="employee"
                  checked={formData.role === "employee"}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-300">Employee</span>
              </label>
            </div>
          </div>
          <ErrorMessage message={error} /> {/* Show the error message */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
