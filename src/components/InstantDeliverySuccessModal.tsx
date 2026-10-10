import React, { useState } from 'react';
import { Order } from '../types/store';
import {
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Printer,
  ShieldCheck,
  Phone,
  Zap,
  X
} from 'lucide-react';
import { STORE_PHONE } from '../data/initialData';

interface InstantDeliverySuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InstantDeliverySuccessModal: React.FC<InstantDeliverySuccessModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const creds = order.deliveredCredentials;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = `
🎮 متجر برايفت | بيانات الحساب المشتراة
====================================
رقم الطلب: ${order.orderNumber}
الحساب: ${order.accountTitle}
اللعبة / المنصة: ${order.gameName}
التاريخ: ${order.createdAt}
المبلغ: ${order.amount} ر.س

🔐 بيانات تسجيل الدخول:
البريد الإلكتروني: ${creds.loginEmail}
كلمة المرور: ${creds.loginPassword}
${creds.activisionId ? `معرف أكتفجن: ${creds.activisionId}\n` : ''}${creds.eaId ? `معرف EA: ${creds.eaId}\n` : ''}
الأكواد الاحتياطية (Backup Codes):
${creds.backupCodes.join(' - ')}

🛡️ الضمان: ${creds.warrantyDays} يوماً
رقم الدعم الفني: ${STORE_PHONE}
====================================
`.trim();

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const orderWhatsAppUrl = `https://wa.me/966536670021?text=${encodeURIComponent(
    `السلام عليكم، استفسار بخصوص طلبي في متجر برايفت:\nرقم الطلب: ${order.orderNumber}\nالحساب: ${order.accountTitle}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141b16]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#e6e9e4] rounded-3xl shadow-2xl overflow-hidden my-6 print:m-0 print:border-none print:shadow-none print:w-full">
        {/* Banner */}
        <div className="p-6 bg-gradient-to-r from-[#edf5ef] via-[#f7faf8] to-[#edf5ef] border-b border-[#d8e5dc] text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 text-[#88928b] hover:text-[#1f2421] rounded-xl hover:bg-white/80 transition-colors print:hidden cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white border border-[#d8e5dc] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-[#1c4532]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#1f2421] mb-1">
            تم استلام طلبك وتسليم الحساب بنجاح!
          </h2>
          <p className="text-xs sm:text-sm text-[#1c4532] font-medium">
            نظام التسليم التلقائي في متجر برايفت أفرغ لك بيانات الحساب التالية فورياً
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className="bg-white px-3.5 py-1.5 rounded-xl text-[#4a554e] border border-[#d8e5dc] font-mono shadow-2xs">
              رقم الطلب: <strong className="text-[#1c4532]">{order.orderNumber}</strong>
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl text-[#4a554e] border border-[#d8e5dc] shadow-2xs">
              العميل: <strong className="text-[#1f2421]">{order.customerName}</strong>
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl text-[#4a554e] border border-[#d8e5dc] font-mono shadow-2xs">
              المبلغ: <strong className="text-[#1f2421]">{order.amount} ر.س</strong>
            </span>
          </div>
        </div>

        {/* Credentials Delivery Vault */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Copy All & Print Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
            <button
              onClick={handleCopyAll}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                copiedAll
                  ? 'bg-[#153828] text-white font-black'
                  : 'bg-[#1c4532] hover:bg-[#153828] text-white shadow-xs'
              }`}
            >
              {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? 'تم نسخ جميع البيانات!' : 'نسخ جميع البيانات بنقرة واحدة'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#f4f6f3] hover:bg-[#eaece8] text-[#35433a] border border-[#e2e6df] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#657068]" />
              <span>طباعة / حفظ الفاتورة</span>
            </button>
          </div>

          {/* Credentials Display Box */}
          <div className="rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e6e9e4] pb-3">
              <span className="text-xs font-bold text-[#1c4532] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#1c4532]" />
                <span>بيانات تسجيل الدخول للحساب الرقمي</span>
              </span>
              <span className="text-[11px] text-[#717c74] font-mono">
                جاهز للاستخدام الفوري
              </span>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#556058] block">
                البريد الإلكتروني (Login Email):
              </label>
              <div className="flex items-center gap-2 bg-white border border-[#e2e6df] rounded-xl p-2.5">
                <span className="font-mono text-xs sm:text-sm text-[#1f2421] select-all break-all flex-1 text-left" dir="ltr">
                  {creds.loginEmail}
                </span>
                <button
                  onClick={() => copyToClipboard(creds.loginEmail, 'email')}
                  className="px-2.5 py-1 text-xs bg-[#edf5ef] hover:bg-[#e1ede4] text-[#1c4532] rounded-lg transition-colors flex items-center gap-1 shrink-0 font-bold cursor-pointer"
                  title="نسخ البريد"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-[#1c4532]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'email' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#556058] block">
                كلمة المرور (Password):
              </label>
              <div className="flex items-center gap-2 bg-white border border-[#e2e6df] rounded-xl p-2.5">
                <span className="font-mono text-xs sm:text-sm text-[#1f2421] select-all flex-1 text-left" dir="ltr">
                  {showPassword ? creds.loginPassword : '••••••••••••••••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-[#717c74] hover:text-[#1f2421] rounded transition-colors cursor-pointer"
                  title={showPassword ? 'إخفاء' : 'إظهار'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard(creds.loginPassword, 'password')}
                  className="px-2.5 py-1 text-xs bg-[#edf5ef] hover:bg-[#e1ede4] text-[#1c4532] rounded-lg transition-colors flex items-center gap-1 shrink-0 font-bold cursor-pointer"
                  title="نسخ كلمة المرور"
                >
                  {copiedField === 'password' ? <Check className="w-3.5 h-3.5 text-[#1c4532]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'password' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            {/* Platform ID if available */}
            {(creds.activisionId || creds.eaId) && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#556058] block">
                  {creds.activisionId ? 'معرف أكتفجن (Activision ID):' : 'معرف حساب EA:'}
                </label>
                <div className="flex items-center gap-2 bg-white border border-[#e2e6df] rounded-xl p-2.5">
                  <span className="font-mono text-xs sm:text-sm text-[#1f2421] flex-1 text-left" dir="ltr">
                    {creds.activisionId || creds.eaId}
                  </span>
                  <button
                    onClick={() => copyToClipboard(creds.activisionId || creds.eaId || '', 'id')}
                    className="px-2.5 py-1 text-xs bg-[#edf5ef] hover:bg-[#e1ede4] text-[#1c4532] rounded-lg transition-colors flex items-center gap-1 shrink-0 font-bold cursor-pointer"
                  >
                    {copiedField === 'id' ? <Check className="w-3.5 h-3.5 text-[#1c4532]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'id' ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Backup Codes */}
            {creds.backupCodes && creds.backupCodes.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#556058]">
                    أكواد الأمان الاحتياطية (لتجاوز التحقق أول مرة):
                  </label>
                  <button
                    onClick={() => copyToClipboard(creds.backupCodes.join(' '), 'codes')}
                    className="text-[11px] text-[#1c4532] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === 'codes' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>نسخ كل الأكواد</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {creds.backupCodes.map((code, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#e2e6df] rounded-lg p-2 text-center font-mono text-xs text-[#1c4532] font-bold select-all shadow-2xs"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] space-y-2.5">
            <h3 className="text-xs font-bold text-[#1f2421]">
              خطوات تسجيل الدخول وتأمين الحساب:
            </h3>
            <ol className="text-xs text-[#525d56] space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>قم بتسجيل الدخول إلى الحساب باستخدام البريد وكلمة المرور الموضحة أعلاه.</li>
              <li>إذا طلب منك رمز تحقق مؤقت، استخدم أحد أكواد الأمان الاحتياطية المرفقة أعلاه.</li>
              <li>انتقل إلى إعدادات الأمان، وقم بتغيير كلمة المرور وتفعيل رقم جوالك الشخصي.</li>
            </ol>
          </div>

          {/* WhatsApp Support Box */}
          <div className="p-4 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#1c4532] shrink-0" />
              <span className="text-[#354f3e]">
                هل تحتاج مساعدة في تسجيل الدخول؟ الدعم الفني متواجد عبر الواتساب على مدار الساعة.
              </span>
            </div>
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#1c4532] hover:bg-[#153828] text-white rounded-xl font-bold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
            >
              محادثة الدعم الفني 💬
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#e6e9e4] bg-[#fafbfa] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#636e67]">
            <ShieldCheck className="w-4 h-4 text-[#1c4532]" />
            <span>ضمان {creds.warrantyDays} يوماً ساري من هذه اللحظة</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            إغلاق وتم الحفظ
          </button>
        </div>
      </div>
    </div>
  );
};
