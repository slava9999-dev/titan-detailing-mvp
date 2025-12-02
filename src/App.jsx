import React, { useState } from 'react';
import { businessConfig } from './config/business';
import { LoyaltyCard } from './components/LoyaltyCard';
import { ServiceCard } from './components/ServiceCard';
import { CheckoutButton } from './components/CheckoutButton';
import { BookingModal } from './components/BookingModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsModal } from './components/SettingsModal';
import { Settings, Bell } from 'lucide-react';

function App() {
  const { theme, hero, services } = businessConfig;
  const [selectedItems, setSelectedItems] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleItem = (item) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(i => i.id === item.id);
      if (isSelected) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} pb-24 font-sans selection:bg-blue-500/30`}>
      <div className="max-w-md mx-auto min-h-screen relative">
        
        {/* Header */}
        <header className="p-6 pb-2 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
              Добро пожаловать
            </p>
            <h1 className="text-2xl font-bold">{hero.title}</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="p-4 space-y-6">
          {/* Loyalty Card */}
          <LoyaltyCard />

          {/* Services Grid */}
          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-bold">Выберите услуги</h2>
              <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded-md">
                {services.length} доступно
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {services.map(item => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.some(i => i.id === item.id)}
                  onToggle={toggleItem}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Sticky Checkout Button */}
        <CheckoutButton 
          selectedItems={selectedItems} 
          onCheckout={() => setIsBookingOpen(true)}
        />

        {/* Modals */}
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)}
          selectedItems={selectedItems}
        />
        
        <NotificationsModal 
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />

        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        
      </div>
    </div>
  );
}

export default App;
