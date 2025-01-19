import axios from "axios";

const API_URL = "http://localhost:5222/api/products";

// Function to fetch the products data from the backend
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    const data = JSON.parse(JSON.stringify(response.data));
    return data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

// Function to add a new product to the backend
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// Function to update an existing product in the backend
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Function to delete a product from the backend
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};
