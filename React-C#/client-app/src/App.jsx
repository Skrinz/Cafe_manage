import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Cashier from "./Components/Cashier/Cashier";
import PrivateRoute from "./Components/util/PrivateRoute";
import Transaction from "./Components/Dashboard/Transactions/Transaction_Main";
import Employee from "./Components/Dashboard/Employees/Employee_Main";
import Product from "./Components/Dashboard/Products/Products_Main";

// 404 Page Component
const NotFound = () => (
  <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900">
    <i className="fa-solid fa-ban text-8xl mb-6 text-red-600"></i>
    <h1 className="font-extrabold text-6xl text-gray-200">
      404: Page Not Found
    </h1>
  </div>
);

// add a modal for succesful login
// and modal for logout
//optimize the how rendering of data in admin page
//optimize so that the app will be able to accomodate different screen sizes

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="/cashier"
          element={
            <PrivateRoute>
              <Cashier />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-transaction"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-employee"
          element={
            <PrivateRoute>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
