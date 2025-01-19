import React from "react";

const ProductList = ({ products, logout }) => {
  return (
    <div className="bg-gray-800 rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Product List</h2>
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {products.length === 0 ? (
          <div className="text-center text-gray-400">
            No products to be displayed
          </div>
        ) : (
          <table className="w-full">
            <thead className="text-left bg-gray-700 sticky top-0">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-700">
                  <td className="p-3">{product.id}</td>
                  <td className="p-3">{product.product_name}</td>
                  <td className="p-3">{product.product_quantity}</td>
                  <td className="p-3">
                    Php {product.product_price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
