import React, { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SuccessMessage({
  isVisible = false,
  duration = 3000,
  onClose,
}) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);

    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-auto"></div>
      <div className="bg-white shadow-lg rounded-lg p-6 mx-4 max-w-md w-full transform transition-all duration-300 ease-in-out z-10 pointer-events-auto">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Feedback Submitted
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Thank you for your valuable feedback!
            </p>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            onClick={() => {
              setShow(false);
              if (onClose) onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
