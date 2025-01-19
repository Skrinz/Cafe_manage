import React, { useState } from "react";
import EditProductModal from "../Modals/EditProductModal"; // Assuming you have an EditProductModal for editing products
import ErrorMessage from "../../util/ErrorMessage";
import SuccessMessage from "../../util/SuccessMessage";

const ProductTable = ({ products, onUpdate, error, success }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      {/* Error and Success Messages */}
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-amber-300">ID</th>
            <th className="text-left py-3 px-4 text-amber-300">Product Name</th>
            <th className="text-left py-3 px-4 text-amber-300">Quantity</th>
            <th className="text-left py-3 px-4 text-amber-300">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleRowClick(product)}
            >
              <td className="py-3 px-4">{product.id}</td>
              <td className="py-3 px-4">{product.product_name}</td>
              <td className="py-3 px-4">{product.product_quantity}</td>
              <td className="py-3 px-4">{product.product_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <EditProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default ProductTable;
