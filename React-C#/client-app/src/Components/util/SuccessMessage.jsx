import React, { useEffect, useState } from "react";

const SuccessMessage = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true); // Reset visibility when a new message comes in
      const timer = setTimeout(() => {
        setVisible(false); // Hide message after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Cleanup on unmount or message change
    }
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div className="text-green-500 text-sm mt-1 mb-2 flex items-center">
      <i className="fas fa-check-circle mr-1"></i>
      {message}
    </div>
  );
};

export default SuccessMessage;
