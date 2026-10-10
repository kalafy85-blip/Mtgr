import React from 'react';
import { Gamepad2, Phone } from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP_URL } from '../data/initialData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#e6e9e4] pt-12 pb-8 text-xs text-[#5a655e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#1c4532] text-white flex items-center justify-center shadow-xs">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-[#1f2421]">متجر برايفت</span>
            </div>
            <p className="text-xs text-[#636e67] leading-relaxed">
              شراء حسابات كود (Call of Duty) وحسابات فيفا 26 و 27 بنظام تسليم آلي فوري وضمان ذهبي شامل.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#1f2421] uppercase tracking-wider">
              أقسام المتجر
            </h4>
            <ul className="space-y-2 text-xs text-[#555f58]">
              <li>
                <a href="#catalog-section" className="hover:text-[#1c4532] transition-colors">
                  حسابات كود (BO6 & Warzone)
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#1c4532] transition-colors">
                  حسابات فيفا 26 (FC 26)
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#1c4532] transition-colors">
                  حسابات فيفا 27 (FC 27)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#1f2421] uppercase tracking-wider">
              تواصل وخدمة العملاء
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`tel:${STORE_PHONE}`}
                  className="flex items-center gap-2 text-[#1f2421] hover:text-[#1c4532] transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1c4532]" />
                  <span className="font-mono tabular-nums dir-ltr">{STORE_PHONE}</span>
                  <span className="text-[11px] text-[#88928b]">(اتصال مباشر)</span>
                </a>
              </li>
              <li>
                <a
                  href={STORE_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#1f2421] hover:text-[#1c4532] transition-colors font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1c4532]" />
                  <span>دعم فني عبر الواتساب على مدار الساعة</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Electronic Delivery Info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#1f2421] uppercase tracking-wider">
              بوابات الدفع والتسليم
            </h4>
            <p className="text-xs text-[#636e67] leading-relaxed">
              يدعم المتجر الدفع الفوري عبر أبل باي (Apple Pay) والتحويل البنكي المباشر مع استلام فوري.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 bg-[#fafbfa] border border-[#e6e9e4] rounded-xl text-[11px] font-bold text-[#1f2421]">
                Apple Pay
              </span>
              <span className="px-3 py-1 bg-[#fafbfa] border border-[#e6e9e4] rounded-xl text-[11px] font-bold text-[#1f2421]">
                تحويل بنكي
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#edf0ec] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#717c74]">
          <p>© {new Date().getFullYear()} متجر برايفت | جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span>تسليم آلي فوري</span>
            <span>·</span>
            <span>ضمان ذهبي 90 يوماً</span>
            <span>·</span>
            <span>رقم المتجر: {STORE_PHONE}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
