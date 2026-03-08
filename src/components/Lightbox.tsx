import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

const Lightbox = ({ isOpen, onClose, imageUrl, alt }: LightboxProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <X size={32} />
          </button>

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <motion.img
              src={imageUrl}
              alt={alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
            {/* Transparent overlay to block direct image interaction */}
            <div className="absolute inset-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
