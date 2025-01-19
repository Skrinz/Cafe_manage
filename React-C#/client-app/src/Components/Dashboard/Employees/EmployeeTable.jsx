import React, { useState } from "react";
import EditEmployeeModal from "../Modals/EditEmployeeModal";
import ErrorMessage from "../../util/ErrorMessage";
import SuccessMessage from "../../util/SuccessMessage";

const EmployeeTable = ({ employees, onUpdate, error, success }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loggedInUserId = localStorage.getItem("userId");

  const filteredEmployees = employees.filter(
    (employee) => employee.id !== parseInt(loggedInUserId)
  );

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      {/* Error and Success Messages */}
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-amber-300">ID</th>
            <th className="text-left py-3 px-4 text-amber-300">Name</th>
            <th className="text-left py-3 px-4 text-amber-300">Password</th>
            <th className="text-left py-3 px-4 text-amber-300">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleRowClick(employee)}
            >
              <td className="py-3 px-4">{employee.id}</td>
              <td className="py-3 px-4">{employee.username}</td>
              <td className="py-3 px-4">{employee.password}</td>
              <td className="py-3 px-4">{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <EditEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          employee={selectedEmployee}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
