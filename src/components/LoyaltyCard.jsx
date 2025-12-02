import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Star } from 'lucide-react';
import { businessConfig } from '../config/business';

export const LoyaltyCard = () => {
  const { loyalty, theme, name } = businessConfig;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full mb-6"
    >
      <div className={`relative overflow-hidden rounded-2xl p-6 ${theme.accent} shadow-lg shadow-blue-900/20`}>
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-black/10 rounded-full blur-xl" />

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Карта лояльности</p>
            <h3 className="text-2xl font-bold text-white tracking-wide">{name}</h3>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </div>
        </div>

        <div className="mt-8 flex justify-between items-end">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Ваш статус</p>
            <p className="text-white font-semibold text-lg">{loyalty.title}</p>
          </div>
          <div className="text-right">
             <p className="text-white font-bold text-2xl">{loyalty.discount}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
