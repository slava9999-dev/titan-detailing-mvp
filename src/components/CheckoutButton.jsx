import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { businessConfig } from '../config/business';

export const CheckoutButton = ({ selectedItems, onCheckout }) => {
  const { theme } = businessConfig;
  
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const count = selectedItems.length;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-4 right-4 z-40"
        >
          <button
            onClick={onCheckout}
            className={`w-full py-4 px-6 rounded-2xl shadow-xl shadow-blue-900/30 flex items-center justify-between ${theme.accent} text-white font-bold text-lg active:scale-95 transition-transform`}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                {count}
              </div>
              <span>Оформить</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{total} ₽</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
