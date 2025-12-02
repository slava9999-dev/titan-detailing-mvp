import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Gift, Info } from 'lucide-react';
import { config } from '../config/business';

export const NotificationsModal = ({ isOpen, onClose }) => {
  const { theme } = config;

  // Demo notifications
  const notifications = [
    { id: 1, title: 'Скидка 20% на химчистку', text: 'Только до конца недели!', icon: Gift, color: 'text-pink-500' },
    { id: 2, title: 'Напоминание', text: 'Пора обновить "Антидождь"', icon: Info, color: 'text-blue-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`fixed top-20 left-4 right-4 ${theme.card} border border-slate-800 rounded-2xl z-50 p-5 shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5" /> Уведомления
              </h3>
              <button onClick={onClose} className="p-1 bg-slate-800 rounded-full text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="bg-slate-950/50 p-3 rounded-xl flex gap-3 items-start">
                  <div className={`p-2 bg-slate-900 rounded-lg ${n.color}`}>
                    <n.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{n.title}</h4>
                    <p className="text-xs text-slate-400">{n.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
