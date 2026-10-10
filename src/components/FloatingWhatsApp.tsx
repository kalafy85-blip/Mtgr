import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP_URL } from '../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-40 print:hidden flex items-center gap-2">
      <a
        href={STORE_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-4 py-3 bg-[#1c4532] hover:bg-[#153828] text-white rounded-full shadow-[0_4px_20px_rgba(28,69,50,0.25)] transition-all hover:scale-103 cursor-pointer"
        title="تواصل معنا عبر الواتساب: 0536670021"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-bold hidden sm:inline">
          دعم واتساب: <span className="font-mono dir-ltr">{STORE_PHONE}</span>
        </span>
      </a>
    </div>
  );
};
