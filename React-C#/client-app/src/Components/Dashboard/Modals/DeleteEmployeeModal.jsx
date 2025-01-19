import React, { useState } from "react";

const DeleteEmployeeModal = ({ onCancel, onConfirm }) => {
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeId.trim()) {
      onConfirm(employeeId);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-xl text-white mb-6 text-center">
          Input ID of the employee you want to delete
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Enter employee ID"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
