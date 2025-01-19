import React from "react";

// Function to format the date in MM/DD/YYYY format
const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Function to format the price to have commas and two decimal places
const formatPrice = (price) => {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const TransactionTable = ({ transactions }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-amber-300">
              Transaction ID
            </th>
            <th className="text-left py-3 px-4 text-amber-300">Total Price</th>
            <th className="text-left py-3 px-4 text-amber-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-gray-700 hover:bg-gray-700"
            >
              <td className="py-3 px-4 ">{transaction.id}</td>
              <td className="py-3 px-4 ">{`Php ${formatPrice(
                transaction.total_price
              )}`}</td>
              <td className="py-3 px-4">
                {formatDate(transaction.transaction_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
