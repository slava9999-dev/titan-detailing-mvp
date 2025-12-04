export const businessConfig = {
  name: "Titan Detailing",
  telegramAdmin: import.meta.env.VITE_TELEGRAM_ADMIN || "vyacheslav_admin", 
  currency: "₽",

  workingHours: {
    start: 10, // 10:00
    end: 20    // 20:00
  },

  theme: {
    bg: "bg-slate-900", 
    text: "text-slate-50",
    accent: "bg-blue-600", 
    cardBg: "bg-slate-800",
    border: "border-slate-700"
  },

  hero: {
    title: "Премиум уход за вашим авто",
    subtitle: "Керамика, полировка и деликатная мойка. Запись в 2 клика.",
    emoji: "🏎️"
  },

  loyalty: {
    title: "Titan Club",
    discount: "15%",
    description: "Скидка на керамическое покрытие при повторном визите."
  },

  services: [
    {
      id: 1,
      title: "Комплекс 'Премиум'",
      price: 2500,
      description: "Трехфазная мойка, уборка салона, чернение резины.",
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
      isPopular: true
    },
    {
      id: 2,
      title: "Керамика кузова",
      price: 15000,
      description: "Защита ЛКП, гидрофобный эффект, глубокий блеск.",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Химчистка салона",
      price: 8000,
      description: "Глубокая очистка кожи и текстиля, удаление запахов.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800"
    }
  ]
};
