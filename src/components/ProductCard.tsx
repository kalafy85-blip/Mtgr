import React from 'react';
import { AccountItem } from '../types/store';
import { Zap, Eye } from 'lucide-react';

interface ProductCardProps {
  account: AccountItem;
  onSelect: (account: AccountItem) => void;
  onInstantBuy: (account: AccountItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  account,
  onSelect,
  onInstantBuy,
}) => {
  return (
    <article className="group flex flex-col bg-white rounded-3xl border border-[#e6e9e4] hover:border-[#b9cebe] transition-all duration-300 overflow-hidden shadow-[0_2px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-[#f2f4f1] overflow-hidden">
        <img
          src={account.image}
          alt={account.title}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121c15]/50 via-transparent to-transparent" />

        {/* Quiet badge */}
        {account.badge && (
          <div className="absolute top-3.5 right-3.5">
            <span className="bg-white/95 backdrop-blur-md border border-[#e2e6df] text-[#1c4532] text-xs px-3 py-1 rounded-full font-bold shadow-xs">
              {account.badge}
            </span>
          </div>
        )}

        {/* Instant delivery indicator */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1.5 font-semibold text-[#a5e0b9]">
            <Zap className="w-3.5 h-3.5 fill-[#a5e0b9]" />
            <span>تسليم آلي فوري</span>
          </span>
          <span className="font-mono text-[#e4ede6] text-[11px] bg-[#121c15]/65 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            المتاح: {account.stockCount}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center gap-2 text-xs text-[#636e67] mb-2.5">
          <span className="font-bold text-[#1c4532]">{account.gameName}</span>
          <span aria-hidden="true" className="text-[#ccd4ce]">·</span>
          <span>{account.platformName}</span>
          <span aria-hidden="true" className="text-[#ccd4ce]">·</span>
          <span>ضمان {account.credentials.warrantyDays} يوم</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#1f2421] mb-2.5 leading-snug line-clamp-2 group-hover:text-[#1c4532] transition-colors">
          {account.title}
        </h3>

        {/* Key Features Preview */}
        <ul className="space-y-1.5 mb-5 text-xs text-[#525d56] flex-1">
          {account.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-[#1c4532] text-xs shrink-0 mt-0.5 font-bold">•</span>
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Pricing and Action Strip */}
        <div className="pt-4 border-t border-[#edf0ec] mt-auto">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-xs text-[#6e7871] ml-1">السعر:</span>
              <span className="text-2xl font-black text-[#1f2421] font-mono tabular-nums">
                {account.price}
              </span>
              <span className="text-xs font-bold text-[#1c4532] mr-1">ر.س</span>
            </div>
            {account.originalPrice && (
              <span className="text-xs text-[#9aa29c] line-through font-mono tabular-nums">
                {account.originalPrice} ر.س
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onSelect(account)}
              className="px-3 py-2.5 text-xs font-bold text-[#35433a] bg-[#f4f6f3] hover:bg-[#eaece8] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>التفاصيل</span>
            </button>

            <button
              onClick={() => onInstantBuy(account)}
              className="px-3 py-2.5 text-xs font-bold text-[#f5f8f5] bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-[#f5f8f5]" />
              <span>شراء الآن</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
