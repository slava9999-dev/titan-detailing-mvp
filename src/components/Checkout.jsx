import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { config } from '../config/business';

export const Checkout = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, total } = useCart();
  const { theme } = config;
  const [phone, setPhone] = useState('');

  const handleCheckout = () => {
    // Generate WhatsApp/Telegram message
    const orderId = Math.floor(Math.random() * 10000);
    const itemsList = cart.map(item => `- ${item.name} x${item.quantity} (${item.price * item.quantity}р)`).join('\n');
    const message = `Заказ №${orderId}\n\n${itemsList}\n\nИтого: ${total}р\nТелефон: ${phone}`;
    
    const encodedMessage = encodeURIComponent(message);
    // Using a placeholder phone number for the business
    const businessPhone = "79990000000"; 
    
    window.open(`https://wa.me/${businessPhone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 rounded-t-3xl z-50 p-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="w-12 h-1 bg-stone-700 rounded-full mx-auto mb-6" />
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Ваш заказ</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 bg-stone-800 rounded-full text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-10 text-stone-500">
                Корзина пуста
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-stone-800/50 p-3 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-stone-700 overflow-hidden">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-stone-200">{item.name}</p>
                          <p className="text-sm text-stone-500">{item.price} ₽</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-stone-900 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-stone-400">
                    <span>Сумма заказа</span>
                    <span className="text-white font-semibold">{total} ₽</span>
                  </div>
                  
                  <div className="bg-stone-800/50 p-4 rounded-xl">
                    <label className="block text-xs text-stone-500 mb-1 ml-1">Ваш телефон</label>
                    <input 
                      type="tel" 
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent border-none text-white placeholder-stone-600 focus:ring-0 p-0 text-lg font-medium"
                    />
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={!phone}
                    className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Send className="w-5 h-5" />
                    Оформить в WhatsApp
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
