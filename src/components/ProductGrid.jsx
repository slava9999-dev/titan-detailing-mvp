import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';
import { config } from '../config/business';
import { useCart } from '../context/CartContext';

export const ProductGrid = () => {
  const { addToCart } = useCart();
  const { products, theme } = config;

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Меню</h2>
        <ShoppingBag className="w-6 h-6 text-stone-400" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-2xl overflow-hidden flex"
          >
            <div className="w-1/3 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-stone-100 mb-1">{product.name}</h3>
                <p className="text-xs text-stone-400 line-clamp-2 mb-3">{product.description}</p>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-amber-500 text-lg">
                  {product.price > 0 ? `${product.price} ₽` : 'По запросу'}
                </span>
                
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-colors active:scale-90"
                  style={{ color: theme.primary }}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
