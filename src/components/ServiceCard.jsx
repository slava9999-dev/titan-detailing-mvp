import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { businessConfig } from '../config/business';

export const ServiceCard = ({ item, isSelected, onToggle }) => {
  const { theme } = businessConfig;

  const triggerHaptic = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    } else if (navigator.vibrate) {
      navigator.vibrate(10); // Web fallback
    }
  };

  const handleClick = () => {
    triggerHaptic();
    onToggle(item);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? `border-blue-500 bg-blue-500/10` 
          : `${theme.cardBg} border-slate-800`
      }`}
    >
      {item.isPopular && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg shadow-sm z-10">
          🔥 ХИТ
        </div>
      )}
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h4 className={`font-semibold text-lg mb-1 ${theme.text}`}>{item.title}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
          <div className="mt-3 font-bold text-blue-500">
            {item.price} ₽
          </div>
        </div>
        
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center transition-colors
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}
        `}>
          {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </div>
    </motion.div>
  );
};
