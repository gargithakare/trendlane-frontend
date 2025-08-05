import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <motion.div
        className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}; 