import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, CheckCircle, Send } from 'lucide-react';
import { businessConfig } from '../config/business';

export const BookingModal = ({ isOpen, onClose, selectedItems }) => {
  const { theme, telegramAdmin, name: appName, workingHours } = businessConfig;
  
  const timeSlots = Array.from(
    { length: (workingHours?.end || 20) - (workingHours?.start || 10) + 1 },
    (_, i) => `${(workingHours?.start || 10) + i}:00`
  );
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      // Optional: reset fields
    }
  }, [isOpen]);

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const isValid = date && time && name && phone.length > 5;

  const handleConfirm = () => {
    if (!isValid) return;

    // Rich Text Message for Telegram
    const message = `
⚡️ *НОВАЯ ЗАПИСЬ | ${appName}*

👤 *Клиент:* ${name}
📞 *Связь:* ${phone}

🗓 *Дата:* ${date}
⏰ *Время:* ${time}

🛠 *Услуги:*
${selectedItems.map(i => `— ${i.title} (${i.price}₽)`).join('\n')}

💰 *ИТОГО: ${total} ₽*
    `.trim();

    // Telegram URL
    const url = `https://t.me/${telegramAdmin}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content - Center Popup */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden`}
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Запись на визит
                </h2>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Дата визита
                  </label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Время
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                          time === slot 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400' 
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-transparent hover:border-slate-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                   <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Ваши данные
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 p-3 text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                    <input 
                      type="tel" 
                      placeholder="Телефон"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 p-3 text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="p-5 border-t border-slate-800 bg-slate-900/50">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-slate-400">Услуг выбрано: {selectedItems.length}</span>
                  <span className="text-xl font-bold text-white">{total} ₽</span>
                </div>
                
                <button
                  onClick={handleConfirm}
                  disabled={!isValid}
                  className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                    isValid 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Подтвердить запись
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
