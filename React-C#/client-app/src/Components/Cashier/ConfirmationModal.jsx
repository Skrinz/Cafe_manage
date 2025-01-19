import React from "react";

const ConfirmationModal = ({ isVisible, message, onCancel, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h3 className="text-xl font-bold text-center text-gray-200 mb-4">
          Confirm Transaction
        </h3>
        <p className="text-gray-200 mb-6">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="w-1/3 py-2 bg-red-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-1/3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
