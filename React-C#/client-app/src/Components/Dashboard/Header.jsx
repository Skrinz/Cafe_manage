import { useNavigate, useLocation } from "react-router-dom";
import DateTime from "../util/DateTime";

const NavButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-yellow-500 text-black" // Active button with yellow background and black text
        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    }`}
  >
    {label}
  </button>
);

const Header = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location (URL)

  const handleNavigation = (tab) => {
    // Only set the tab active if it's a different tab or it's not the current path
    if (activeTab !== tab && location.pathname !== `/${tab}`) {
      setActiveTab(tab);
      navigate(`/${tab}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 border-b border-gray-700 p-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Left-side navigation buttons */}
        <div className="flex gap-4">
          <NavButton
            label="Products"
            isActive={activeTab === "products"}
            onClick={() => handleNavigation("admin-product")}
          />
          <NavButton
            label="Transactions"
            isActive={activeTab === "transactions"}
            onClick={() => handleNavigation("admin-transaction")}
          />
          <NavButton
            label="Employees"
            isActive={activeTab === "employees"}
            onClick={() => handleNavigation("admin-employee")}
          />
        </div>

        {/* Centered DateTime */}
        <div className="flex-grow flex justify-center">
          <DateTime />
        </div>

        {/* Right-side Logout button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-gray-300 py-2 px-4 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
