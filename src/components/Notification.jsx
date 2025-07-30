import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notification({ message, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 shadow-lg rounded-xl px-6 py-4 flex items-center gap-4 max-w-sm"
      >
        <div className="text-sm text-gray-800 font-medium">
          {message}
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
