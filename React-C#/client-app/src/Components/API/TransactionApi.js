import axios from "axios";

const API_URL = "http://localhost:5222/api/transactions";

// Function to create a new transaction
export const createTransaction = async (transaction) => {
  try {
    const response = await axios.post(API_URL, transaction);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
