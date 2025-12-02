import React from 'react';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { config } from '../config/business';
import { useCart } from '../context/CartContext';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const { theme } = config;
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'catalog', icon: Grid, label: 'Меню' },
    // { id: 'profile', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-900/90 backdrop-blur-lg border-t border-stone-800 pb-safe pt-2 px-6 z-40">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-white' : 'text-stone-500'
              }`}
            >
              <Icon 
                className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} 
                style={{ color: isActive ? theme.primary : undefined }}
              />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'cart' ? 'text-white' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <ShoppingBag 
              className={`w-6 h-6 ${activeTab === 'cart' ? 'scale-110' : ''} transition-transform`}
              style={{ color: activeTab === 'cart' ? theme.primary : undefined }}
            />
            {cartCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold border border-stone-900"
              >
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Корзина</span>
        </button>
      </div>
    </div>
  );
};
