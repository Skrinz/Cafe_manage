import React, { useState, useEffect } from "react";
import ErrorMessage from "../../util/ErrorMessage";

const EditProductModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    productName: product?.product_name || "",
    productQuantity: product?.product_quantity || "",
    productPrice: product?.product_price || "",
  });

  // Update formData whenever product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        product_name: product.product_name || "",
        product_quantity: product.product_quantity || "",
        product_price: product.product_price || "",
      });
    }
  }, [product, isOpen]);

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
    if (
      !formData.product_name ||
      !formData.product_quantity ||
      !formData.product_price
    ) {
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
        <h2 className="text-2xl text-white mb-6">Update Product</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.product_name || ""} // Ensure productName is not undefined
              onChange={(e) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              value={formData.product_quantity || ""} // Ensure productQuantity is not undefined
              onChange={(e) =>
                setFormData({ ...formData, product_quantity: e.target.value })
              }
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Price</label>
            <input
              type="number"
              value={formData.product_price || ""} // Ensure productPrice is not undefined
              onChange={(e) =>
                setFormData({ ...formData, product_price: e.target.value })
              }
              className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
            />
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
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
