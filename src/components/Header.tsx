import React from 'react';
import { Gamepad2, Phone, Search, Lock, Store } from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP_URL } from '../data/initialData';
import { GameCategory } from '../types/store';

interface HeaderProps {
  currentCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  isAdminView: boolean;
  onToggleAdminView: () => void;
  onOpenOrderLookup: () => void;
  orderCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  isAdminView,
  onToggleAdminView,
  onOpenOrderLookup,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbfbfa]/90 backdrop-blur-md border-b border-[#e6e9e4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onSelectCategory('all');
              }}
              className="flex items-center gap-3 text-right focus:outline-none group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#1c4532] text-[#f4f8f5] flex items-center justify-center shadow-xs group-hover:bg-[#153828] transition-all">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[#1f2421] block leading-tight">
                  متجر برايفت
                </span>
                <span className="text-[11px] text-[#636e67] font-semibold tracking-wider block">
                  PRIVATE STORE
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Restful typography) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#5a645e]">
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onSelectCategory('all');
              }}
              className={`hover:text-[#1f2421] transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer ${
                !isAdminView && currentCategory === 'all'
                  ? 'text-[#1c4532] font-bold border-b-2 border-[#1c4532]'
                  : ''
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onSelectCategory('cod');
              }}
              className={`hover:text-[#1f2421] transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer ${
                !isAdminView && currentCategory === 'cod'
                  ? 'text-[#1c4532] font-bold border-b-2 border-[#1c4532]'
                  : ''
              }`}
            >
              كود (COD)
            </button>
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onSelectCategory('fifa26');
              }}
              className={`hover:text-[#1f2421] transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer ${
                !isAdminView && currentCategory === 'fifa26'
                  ? 'text-[#1c4532] font-bold border-b-2 border-[#1c4532]'
                  : ''
              }`}
            >
              فيفا 26 (FC 26)
            </button>
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onSelectCategory('fifa27');
              }}
              className={`hover:text-[#1f2421] transition-colors whitespace-nowrap shrink-0 py-1.5 cursor-pointer ${
                !isAdminView && currentCategory === 'fifa27'
                  ? 'text-[#1c4532] font-bold border-b-2 border-[#1c4532]'
                  : ''
              }`}
            >
              فيفا 27 (FC 27)
            </button>
            <button
              onClick={onOpenOrderLookup}
              className="hover:text-[#1f2421] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1.5 text-[#636e67] cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#88928b]" />
              <span>استعلام عن طلب</span>
            </button>
          </nav>

          {/* Zone 3: Actions (Clean, warm, peaceful) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* WhatsApp Link */}
            <a
              href={STORE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1c4532] bg-[#edf5ef] hover:bg-[#e2ede5] rounded-xl transition-colors whitespace-nowrap shrink-0 border border-[#d8e5dc]"
              title="تواصل مباشرة عبر الواتساب"
            >
              <Phone className="w-3.5 h-3.5 text-[#1c4532]" />
              <span className="font-mono tabular-nums dir-ltr">{STORE_PHONE}</span>
            </a>

            {/* Quick Order Lookup button (mobile) */}
            <button
              onClick={onOpenOrderLookup}
              className="lg:hidden p-2 text-[#5a645e] bg-[#f2f1ec] border border-[#e2e1db] rounded-xl hover:text-[#1f2421]"
              title="استعلام عن طلبك"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Owner Section Switch Button */}
            <button
              onClick={onToggleAdminView}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isAdminView
                  ? 'bg-[#1c4532] text-white shadow-xs hover:bg-[#153828]'
                  : 'bg-white text-[#2a382f] border border-[#e1e5de] hover:bg-[#f6f8f5] shadow-xs'
              }`}
              title="لوحة تحكم خاصة بصاحب المتجر"
            >
              {isAdminView ? (
                <>
                  <Store className="w-4 h-4" />
                  <span>الرجوع للمتجر</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#1c4532]" />
                  <span>لوحة صاحب المتجر</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
