"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaCheckCircle, FaInfo } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { MdError } from "react-icons/md";

const Alert = ({
  message,
  type = "info",
  isVisible = false,
  duration = 5000,
  onClose,
}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const alertStyles = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  const iconStyles = {
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
  };

  const icons = {
    info: <FaInfo size={22} />,
    success: <FaCheckCircle size={22} />,
    warning: <IoWarning size={22} />,
    error: <MdError size={22} />,
  };

  const alertElement = (
    <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full">
      <div
        className={`transform transition-all duration-300 ease-in-out ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <div
          className={`flex items-center gap-2 p-4 rounded-lg border-l-4 shadow-lg ${alertStyles[type]}`}
        >
          <div className={`flex-shrink-0 ${iconStyles[type]}`}>
            {icons[type]}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 focus:outline-none"
          >
            <span className="sr-only">بستن</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(alertElement, document.body);
};

export default Alert;
