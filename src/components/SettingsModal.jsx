import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Moon, Globe, HelpCircle } from 'lucide-react';
import { config } from '../config/business';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { theme } = config;

  const menuItems = [
    { icon: Moon, label: 'Тема оформления', value: 'Темная' },
    { icon: Globe, label: 'Язык', value: 'Русский' },
    { icon: HelpCircle, label: 'Поддержка', value: '' },
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
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed bottom-0 left-0 right-0 ${theme.card} border-t border-slate-800 rounded-t-3xl z-50 p-6 pb-10`}
          >
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-6 h-6" /> Настройки
              </h3>
              <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {menuItems.map((item, idx) => (
                <button 
                  key={idx}
                  className="w-full flex items-center justify-between p-4 bg-slate-950/50 rounded-xl active:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3 text-white">
                    <item.icon className="w-5 h-5 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-sm text-slate-500">{item.value}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-600">Версия приложения 1.0.0 (MVP)</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
