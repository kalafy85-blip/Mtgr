import React from 'react';
import { Zap, ShieldCheck, Building2, Headphones } from 'lucide-react';
import { STORE_PHONE } from '../data/initialData';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-white border-b border-[#e6e9e4] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#fafbfa] border border-[#e8ece6] transition-all hover:border-[#d0dbcf]">
            <div className="w-10 h-10 rounded-xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#1c4532]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1f2421] mb-1">تسليم آلي فوري</h2>
              <p className="text-xs text-[#5f6962] leading-relaxed">
                تظهر لك بيانات الحساب (الإيميل، الباسورد، وأكواد الأمان) فور إتمام الدفع على الشاشة مباشرة.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#fafbfa] border border-[#e8ece6] transition-all hover:border-[#d0dbcf]">
            <div className="w-10 h-10 rounded-xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#1c4532]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1f2421] mb-1">ضمان ذهبي 90 يوماً</h2>
              <p className="text-xs text-[#5f6962] leading-relaxed">
                جميع الحسابات نظامية ومحصنة مع ضمان استبدال فوري أو استرداد في حال أي خلل فني.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#fafbfa] border border-[#e8ece6] transition-all hover:border-[#d0dbcf]">
            <div className="w-10 h-10 rounded-xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#1c4532]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1f2421] mb-1">Apple Pay وتحويل بنكي</h2>
              <p className="text-xs text-[#5f6962] leading-relaxed">
                دفع سلس وفوري عبر أبل باي أو تحويل بنكي مباشر مع تواصل فوري عبر الواتساب.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#fafbfa] border border-[#e8ece6] transition-all hover:border-[#d0dbcf]">
            <div className="w-10 h-10 rounded-xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-[#1c4532]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1f2421] mb-1">دعم متواصل</h2>
              <p className="text-xs text-[#5f6962] leading-relaxed">
                متواجدون دائماً لخدمتك والرد على استفساراتك عبر الواتساب: <span className="font-mono text-[#1c4532] font-semibold">{STORE_PHONE}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
