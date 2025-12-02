import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { config } from '../config/business';

export const WaitlistForm = () => {
  const { theme } = config;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic to send data would go here
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="p-6 bg-stone-900/50 border border-stone-800 rounded-2xl text-center"
      >
        <h3 className="text-xl font-bold text-white mb-2">Спасибо!</h3>
        <p className="text-stone-400">Мы свяжемся с вами, когда появится свободное место.</p>
      </motion.div>
    );
  }

  return (
    <div className="p-6 bg-stone-900/50 border border-stone-800 rounded-2xl">
      <h3 className="text-xl font-bold text-white mb-2">Лист ожидания</h3>
      <p className="text-stone-400 mb-4 text-sm">Оставьте заявку, и мы сообщим вам о свободных датах.</p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="email" 
          placeholder="Ваш email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button 
          type="submit"
          className="p-3 rounded-xl text-white transition-transform active:scale-95"
          style={{ backgroundColor: theme.primary }}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
