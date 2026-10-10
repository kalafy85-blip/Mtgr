import React from 'react';
import { ShieldCheck, Zap, Phone, CheckCircle2, ArrowDown } from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP_URL } from '../data/initialData';

interface HeroProps {
  onBrowseClick: () => void;
  onOpenLookup: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseClick, onOpenLookup }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#e6e9e4] bg-gradient-to-b from-[#f4f7f4]/80 via-[#fbfbfa] to-[#f8faf8] py-16 md:py-24">
      {/* Soft, restful organic ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#e4ede6]/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#efece4]/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Calm unboxed kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#5a655e] mb-5 bg-[#edf5ef] px-3.5 py-1.5 rounded-full border border-[#d8e5dc]">
            <Zap className="w-3.5 h-3.5 text-[#1c4532]" />
            <span className="font-bold text-[#1c4532]">تسليم فوري وتلقائي</span>
            <span aria-hidden="true" className="text-[#b2c2b7]">·</span>
            <span>أبل باي وتحويل بنكي</span>
            <span aria-hidden="true" className="text-[#b2c2b7]">·</span>
            <span>ضمان ذهبي شامل</span>
          </div>

          {/* Calm & Modern Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1f2421] leading-[1.25] tracking-tight mb-4 text-balance">
            مرحباً بك في متجر <span className="text-[#1c4532]">برايفت</span>
          </h1>

          {/* Calm Body Text */}
          <p className="text-base sm:text-lg text-[#555f58] leading-relaxed mb-8 max-w-xl">
            مساحتك الهادئة والموثوقة لحسابات كود وفيفا 26 و 27. تصفح بكل راحة واستلم بيانات حسابك فورياً على شاشتك بعد إتمام الدفع مع كامل الضمانات.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onBrowseClick}
              className="px-6 py-3.5 text-xs font-bold text-[#f5f8f5] bg-[#1c4532] hover:bg-[#153828] rounded-2xl transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4" />
              <span>تصفح الحسابات المتاحة</span>
            </button>

            <a
              href={STORE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-xs font-bold text-[#2a382f] bg-white hover:bg-[#f6f8f5] border border-[#e1e5de] rounded-2xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#1c4532]" />
              <span>واتساب الدعم: {STORE_PHONE}</span>
            </a>

            <button
              onClick={onOpenLookup}
              className="px-4 py-3.5 text-xs font-semibold text-[#68726b] hover:text-[#1f2421] transition-colors cursor-pointer"
            >
              استعلام عن طلب سابق ←
            </button>
          </div>

          {/* Reassurance points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#e6e9e4] text-xs text-[#525d56] font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1c4532] shrink-0" />
              <span>تسليم فوري على الشاشة</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1c4532] shrink-0" />
              <span>ضمان شامل حتى 90 يوماً</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-[#1c4532] shrink-0" />
              <span>Apple Pay وتحويل بنكي</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
