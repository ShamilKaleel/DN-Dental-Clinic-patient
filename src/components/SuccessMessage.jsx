import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessMessage({
  isVisible = false,
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    let closeTimer;

    if (isVisible) {
      // Set timeout for closing
      closeTimer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
    }

    return () => {
      clearTimeout(closeTimer);
    };
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <>
      {isVisible && (
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 h-16 w-16" />
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>

          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We appreciate your
            input and will use it to improve our services.
          </p>

          <p className="text-sm text-gray-500">
            This message will close automatically
          </p>
        </motion.div>
      )}
    </>
  );
}
