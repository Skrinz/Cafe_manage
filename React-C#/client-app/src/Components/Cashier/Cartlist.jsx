import React from "react";

const CartList = ({ products, cart, setCart, setError }) => {
  const handleQuantityChange = (e, itemId) => {
    const updatedQuantity = e.target.value;

    // If the input is empty, reset the quantity to 0
    if (updatedQuantity === "") {
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: "" } : item
      );
      setCart(updatedCart);
      return;
    }

    // Check for invalid or zero quantity
    if (updatedQuantity === "0" || updatedQuantity < 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    // Check for non-whole number quantity
    if (updatedQuantity.includes(".")) {
      setError("Quantity must be a whole number.");
      return;
    }

    // Parse the input to a number
    const parsedQuantity = parseInt(updatedQuantity);

    // If the input is invalid (NaN) or less than 1, don't update the cart
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return;
    }

    // Find the corresponding product in the products list to get the stock quantity
    const product = products.find((prod) => prod.id === itemId);

    // Check if the quantity exceeds available stock
    if (parsedQuantity > product.product_quantity) {
      setError("Quantity exceeds available stock.");
      return;
    }

    // Otherwise, update the cart with the valid quantity
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: parsedQuantity } : item
    );
    setCart(updatedCart);
    setError(null); // Clear any previous error
  };

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full">
        <thead className="text-left bg-gray-700 sticky top-0">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="p-3">{item.name}</td>
              <td className="p-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                  className="w-16 text-center bg-gray-700 text-white border border-gray-600 rounded"
                />
              </td>
              <td className="p-3">
                Php {(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
