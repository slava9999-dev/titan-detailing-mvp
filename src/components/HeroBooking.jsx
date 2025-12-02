import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { config } from '../config/business';

export const HeroBooking = ({ onBookingClick }) => {
  const { texts, theme } = config;

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-b-3xl shadow-2xl">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-amber-500 uppercase bg-amber-500/10 rounded-full backdrop-blur-md border border-amber-500/20">
            {config.type === 'restaurant' ? 'Ресторан & Бар' : 'Премиум Услуги'}
          </span>
          <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
            {texts.heroTitle}
          </h1>
          <p className="text-stone-300 mb-6 text-lg">
            {texts.heroSubtitle}
          </p>

          <motion.button 
            onClick={onBookingClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-6 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
            style={{ backgroundColor: theme.primary }}
          >
            <Calendar className="w-5 h-5" />
            {texts.ctaButton}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
