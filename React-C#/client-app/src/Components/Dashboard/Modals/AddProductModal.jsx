import React, { useState } from "react";
import ErrorMessage from "../../util/ErrorMessage";

const AddProductModal = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_quantity: "",
    product_price: "",
  });

  const [errors, setErrors] = useState({
    product_name: "",
    product_quantity: "",
    product_price: "",
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product_name.trim()) {
      newErrors.product_name = "Product name is required";
    }

    if (
      !formData.product_quantity ||
      isNaN(formData.product_quantity) ||
      formData.product_quantity <= 0
    ) {
      newErrors.product_quantity = "Please enter a valid product quantity";
    }

    if (
      !formData.product_price ||
      isNaN(formData.product_price) ||
      formData.product_price <= 0
    ) {
      newErrors.product_price = "Please enter a valid product price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { product_name, product_quantity, product_price } = formData;
      onSubmit({ product_name, product_quantity, product_price });
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Add Product
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-cyan-400 mb-2">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <ErrorMessage message={errors.product_name} />
          </div>

          <div className="mb-4">
            <label className="block text-cyan-400 mb-2">Product Quantity</label>
            <input
              type="number"
              name="product_quantity"
              value={formData.product_quantity}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <ErrorMessage message={errors.product_quantity} />
          </div>

          <div className="mb-6">
            <label className="block text-cyan-400 mb-2">Product Price</label>
            <input
              type="number"
              name="product_price"
              value={formData.product_price}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <ErrorMessage message={errors.product_price} />
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
