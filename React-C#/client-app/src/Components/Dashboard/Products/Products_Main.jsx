import React, { useState, useEffect } from "react";
import Header from "../Header";
import ProductTable from "./ProductTable";
import AddProductModal from "../Modals/AddProductModal";
import DeleteProductModal from "../Modals/DeleteProductModal";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../API/ProductApi";

const Product_Main = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      setSuccess(null);
      // Call the addProduct API
      const createdProduct = await addProduct(newProduct);

      // Update the products state with the newly created product
      setProducts((prev) => [...prev, createdProduct]);

      // Show success message and reset the form
      setSuccess("Product added successfully.");
      setError(null);
      setIsAddModalOpen(false);
    } catch (error) {
      // Handle error case
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
      setSuccess(null);
    }
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteProduct = async (productId) => {
    try {
      setSuccess(null);

      // Call the deleteProduct API first
      await deleteProduct(productId);

      // After successful deletion, fetch the updated list
      await fetchProducts();

      setSuccess(`Product with ID "${productId}" deleted successfully.`);
      closeDeleteModal();
    } catch (error) {
      setError(`Failed to delete product with ID "${productId}".`);
      // Refresh the product list in case of error to ensure consistent state
      await fetchProducts();
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      setSuccess(null);

      // Call the update API
      await updateProduct(updatedProduct.id, updatedProduct);

      // Fetch fresh data after update
      await fetchProducts();

      // Provide success feedback
      setSuccess("Product updated successfully.");
      setError(null);
    } catch (error) {
      setError("Failed to update product. Please try again.");
      setSuccess(null);
      // Refresh the product list in case of error
      await fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <button
              onClick={openAddModal}
              className="w-40 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Add Product
            </button>
            <button
              onClick={openDeleteModal}
              className="w-40 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              Delete Product
            </button>
          </div>

          <div className="w-2/3">
            <ProductTable
              products={products}
              onUpdate={handleUpdateProduct}
              error={error}
              success={success}
            />
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddProductModal onCancel={closeAddModal} onSubmit={handleAddProduct} />
      )}

      {isDeleteModalOpen && (
        <DeleteProductModal
          onCancel={closeDeleteModal}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default Product_Main;
