import React, { useState, useEffect } from "react";
import Header from "../Header";
import TransactionTable from "./TransactionTable";
import { getTransactions } from "../../API/TransactionApi";
import ErrorMessage from "../../util/ErrorMessage";

const Transaction_Main = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch transactions from the API when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transactions");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header with navigation buttons */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-4xl mx-auto p-6">
        {/* Error Message */}
        <ErrorMessage message={error} />

        {/* Transaction table */}
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Transaction_Main;
