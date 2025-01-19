import React, { useState, useEffect } from "react";
import ProductList from "./Productlist";
import CartList from "./Cartlist";
import InputSection from "./InputSections";
import { getProducts } from "../API/ProductApi";
import ErrorMessage from "../util/ErrorMessage";
import { useNavigate } from "react-router-dom";
import DateTime from "../util/DateTime";
import ConfirmationModal from "./ConfirmationModal";
import { createTransaction } from "../API/TransactionApi";

const Cashier = () => {
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const productsList = await getProducts();
      console.log("Products:", productsList);
      setProducts(productsList);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const handleAddToCart = () => {
    if (productId && quantity) {
      const product = products.find((prod) => prod.id === parseInt(productId));
      if (product) {
        if (parseInt(quantity) > product.product_quantity) {
          setError("Quantity exceeds available stock.");
          return;
        }
        if (parseInt(quantity) <= 0) {
          setError("Quantity must be greater than 0.");
          return;
        }

        const newItem = {
          id: product.id,
          name: product.product_name,
          quantity: parseInt(quantity),
          price: product.product_price,
        };

        setCart((prevCart) => [...prevCart, newItem]);
        setProductId("");
        setQuantity("");
        setError(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompleteTransaction = () => {
    if (cart.length === 0) {
      setError(
        "The cart is empty. Please add items before completing the transaction."
      );
      return;
    }
    setError(null);
    setShowModal(true);
  };

  const confirmTransaction = async () => {
    try {
      const transactionDate = new Date().toISOString();
      await createTransaction({ totalPrice, transactionDate, cart });

      setCart([]);
      setTotalPrice(0);
      setProductId("");
      setQuantity("");
      setSearchQuery("");
      setError(null);

      fetchProducts();
      setShowModal(false);
    } catch (err) {
      console.error("Error completing transaction:", err);
      setError("Failed to complete the transaction.");
    }
  };

  const cancelTransaction = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div className="text-center text-gray-200">Loading products...</div>;
  }

  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-200 flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <ProductList products={filteredProducts} logout={handleLogout} />

        <div className="bg-gray-800 rounded-lg flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">Cashier</h2>
            <DateTime />
          </div>

          <div className="flex-1 flex flex-col p-4 gap-4">
            <ErrorMessage message={error} />

            <CartList
              products={products}
              cart={cart}
              setCart={setCart}
              setError={setError}
            />

            <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
              <span>Total Price</span>
              <span>Php {totalPrice.toFixed(2)}</span>
            </div>

            <InputSection
              productId={productId}
              searchQuery={searchQuery}
              quantity={quantity}
              setProductId={setProductId}
              setSearchQuery={setSearchQuery}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
            />

            <button
              onClick={handleCompleteTransaction}
              className="w-full py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Complete Transaction
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isVisible={showModal}
        message="Are you sure you want to complete this transaction?"
        onCancel={cancelTransaction}
        onConfirm={confirmTransaction}
      />
    </div>
  );
};

export default Cashier;
