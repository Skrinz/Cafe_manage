import React, { useState, useEffect } from "react";
import Header from "../Header";
import EmployeeTable from "./EmployeeTable";
import AddEmployeeModal from "../Modals/AddEmployeeModal";
import DeleteEmployeeModal from "../Modals/DeleteEmployeeModal";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../../API/UsersApi";

const Employee_Main = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const data = await getUsers();
      setEmployees(data);
    } catch (err) {
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee) => {
    try {
      setSuccess(null);
      // Call the createUser API
      const createdEmployee = await createUser(newEmployee);

      // Update the employees state with the newly created employee
      setEmployees((prev) => [...prev, createdEmployee]);

      // Show success message and reset the form
      setSuccess("Employee added successfully.");
      setError(null);
      setIsAddModalOpen(false);
    } catch (error) {
      // Handle error case
      console.error("Error adding employee:", error);
      setError("Failed to add employee. Please try again.");
      setSuccess(null);
    }
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = async (employeeId) => {
    try {
      setSuccess(null);

      // Call the deleteUser API first
      await deleteUser(employeeId);

      // After successful deletion, fetch the updated list
      await fetchEmployees();

      setSuccess(`Employee with ID "${employeeId}" deleted successfully.`);
      closeDeleteModal();
    } catch (error) {
      setError(`Failed to delete employee with ID "${employeeId}".`);
      // Refresh the employee list in case of error to ensure consistent state
      await fetchEmployees();
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      setSuccess(null);

      // Call the update API
      await updateUser(updatedEmployee.id, updatedEmployee);

      // Fetch fresh data after update
      await fetchEmployees();

      // Provide success feedback
      setSuccess("Employee updated successfully.");
      setError(null);
    } catch (error) {
      setError("Failed to update employee. Please try again.");
      setSuccess(null);
      // Refresh the employee list in case of error
      await fetchEmployees();
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
              Add Employee
            </button>
            <button
              onClick={openDeleteModal}
              className="w-40 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              Delete Employee
            </button>
          </div>

          <div className="w-2/3">
            <EmployeeTable
              employees={employees}
              onUpdate={handleUpdateEmployee}
              error={error}
              success={success}
            />
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddEmployeeModal
          onCancel={closeAddModal}
          onSubmit={handleAddEmployee}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteEmployeeModal
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Employee_Main;
