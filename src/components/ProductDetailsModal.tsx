import React from 'react';
import { AccountItem } from '../types/store';
import { X, Zap, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP_URL } from '../data/initialData';

interface ProductDetailsModalProps {
  account: AccountItem | null;
  onClose: () => void;
  onBuyNow: (account: AccountItem) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  account,
  onClose,
  onBuyNow,
}) => {
  if (!account) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141b16]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#e6e9e4] rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#e6e9e4] bg-[#fafbfa]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#1c4532] bg-[#edf5ef] px-3 py-1 rounded-full border border-[#d8e5dc]">
              {account.gameName}
            </span>
            <span className="text-xs font-medium text-[#657068]">
              {account.platformName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#88928b] hover:text-[#1f2421] rounded-xl hover:bg-[#eef2ed] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Main Title */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1f2421] leading-snug">
              {account.title}
            </h2>
            <p className="text-sm text-[#555f58] leading-relaxed">
              {account.shortDesc}
            </p>
          </div>

          {/* Instant Delivery Notice Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-start gap-3.5">
            <Zap className="w-5 h-5 text-[#1c4532] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#1c4532] mb-1">
                نظام التسليم الفوري التلقائي
              </h3>
              <p className="text-xs text-[#354f3e] leading-relaxed">
                بمجرد إتمام الدفع بنجاح عبر بوابات الدفع الإلكترونية، ستظهر لك بيانات تسجيل الدخول كاملة (البريد، الباسورد، وأكواد الأمان) على هذه الشاشة مباشرة مع إمكانية النسخ والتحميل.
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div>
            <h3 className="text-sm font-bold text-[#1f2421] mb-3">
              المواصفات الفنية وتفاصيل الحساب:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {account.specs.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#fafbfa] border border-[#e6e9e4] flex items-center justify-between"
                >
                  <span className="text-[#657068]">{sp.label}</span>
                  <span className="font-bold text-[#1f2421] font-mono">{sp.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Checklist */}
          <div>
            <h3 className="text-sm font-bold text-[#1f2421] mb-3">
              المميزات المضمنة في هذا الحساب:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {account.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#48534c]">
                  <CheckCircle2 className="w-4 h-4 text-[#1c4532] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Warranty Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1f2421]">
              <ShieldCheck className="w-4 h-4 text-[#1c4532]" />
              <span>ضمان ذهبي شامل لمدة {account.credentials.warrantyDays} يوماً</span>
            </div>
            <p className="text-xs text-[#636e67] leading-relaxed">
              الحساب مجهز بالبريد الأساسي ويمكنك تغيير كلمة المرور والبريد فور استلامه. الدعم الفني متواجد لمساعدتك عبر الواتساب على مدار الساعة.
            </p>
          </div>
        </div>

        {/* Modal footer / Price & Action */}
        <div className="p-6 border-t border-[#e6e9e4] bg-[#fafbfa] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#636e67]">السعر النهائي:</span>
            <span className="text-2xl sm:text-3xl font-black text-[#1f2421] font-mono tabular-nums">
              {account.price}
            </span>
            <span className="text-xs font-bold text-[#1c4532]">ر.س</span>
            {account.originalPrice && (
              <span className="text-xs text-[#9aa29c] line-through font-mono mr-2">
                {account.originalPrice} ر.س
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={STORE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-[#1c4532] bg-[#edf5ef] hover:bg-[#e1ede4] border border-[#d8e5dc] rounded-2xl transition-colors shrink-0"
              title="استفسار سريع عن هذا الحساب عبر الواتساب"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                onClose();
                onBuyNow(account);
              }}
              className="flex-1 sm:flex-initial px-6 py-3.5 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>متابعة الشراء والتسليم الفوري</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
