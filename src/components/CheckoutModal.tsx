import React, { useState } from 'react';
import { AccountItem, Order, PaymentMethod } from '../types/store';
import {
  X,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Phone,
  Copy,
  Check,
  Building2,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { STORE_PHONE, STORE_WHATSAPP_URL, STORE_BANK_INFO } from '../data/initialData';

interface CheckoutModalProps {
  account: AccountItem | null;
  onClose: () => void;
  onPaymentSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  account,
  onClose,
  onPaymentSuccess,
}) => {
  if (!account) return null;

  // Checkout flow state: 'form' -> 'processing' -> done
  const [step, setStep] = useState<'form' | 'processing'>('form');

  // Customer inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('05');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('apple_pay');

  // Bank transfer helper state
  const [transferSenderName, setTransferSenderName] = useState('');
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);

  const [formError, setFormError] = useState('');
  const [processStage, setProcessStage] = useState(0);

  const handleCopyIban = () => {
    navigator.clipboard.writeText(STORE_BANK_INFO.iban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleCopyAcc = () => {
    navigator.clipboard.writeText(STORE_BANK_INFO.accountNumber);
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim() || customerName.trim().length < 3) {
      setFormError('يرجى إدخال اسمك الكامل.');
      return;
    }
    if (!customerPhone.startsWith('05') || customerPhone.length < 10) {
      setFormError('يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 (10 أرقام).');
      return;
    }
    if (!customerEmail.includes('@') || !customerEmail.includes('.')) {
      setFormError('يرجى إدخال بريد إلكتروني صالح لاستلام نسخة الفاتورة وبيانات الحساب.');
      return;
    }

    triggerAutomatedDelivery();
  };

  const triggerAutomatedDelivery = () => {
    setStep('processing');
    setProcessStage(1);

    setTimeout(() => {
      setProcessStage(2);
    }, 900);

    setTimeout(() => {
      setProcessStage(3);
    }, 1800);

    setTimeout(() => {
      const orderNumber = 'PVT-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder: Order = {
        id: 'ord-' + Date.now(),
        orderNumber,
        customerName: customerName.trim() || 'عميل متجر برايفت',
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        accountId: account.id,
        accountTitle: account.title,
        game: account.game,
        gameName: account.gameName,
        platform: account.platform,
        amount: account.price,
        paymentMethod,
        status: 'delivered',
        deliveredCredentials: { ...account.credentials },
        createdAt: new Date().toISOString()
      };

      onPaymentSuccess(newOrder);
    }, 2700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141b16]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white border border-[#e6e9e4] rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e6e9e4] bg-[#fafbfa]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center text-[#1c4532]">
              <Zap className="w-5 h-5 fill-[#1c4532]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1f2421]">
                إتمام الطلب والتسليم الفوري
              </h2>
              <p className="text-xs text-[#636e67]">
                متجر برايفت · الدفع الآمن والتسليم الآلي المباشر
              </p>
            </div>
          </div>
          {step === 'form' && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#88928b] hover:text-[#1f2421] rounded-xl hover:bg-[#eef2ed] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* PROCESSING SCREEN */}
        {step === 'processing' ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#e2ece5] animate-ping opacity-30" />
              <div className="w-20 h-20 rounded-full bg-[#edf5ef] border-2 border-[#1c4532] flex items-center justify-center text-[#1c4532]">
                <Zap className="w-10 h-10 animate-bounce fill-[#1c4532]" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#1f2421]">
                {processStage === 1 && 'جاري معالجة الدفع بأمان...'}
                {processStage === 2 && 'تم التحقق بنجاح! جاري فك تشفير الحساب...'}
                {processStage >= 3 && 'اكتمل التجهيز! تسليم البيانات فورياً الآن...'}
              </h3>
              <p className="text-xs text-[#636e67]">
                يرجى الانتظار ثانية واحدة، يتم تحضير البريد وكلمة المرور في خزنتك
              </p>
            </div>

            {/* Stages indicator */}
            <div className="space-y-2.5 max-w-sm mx-auto text-xs text-right">
              <div className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                processStage >= 1 ? 'bg-[#edf5ef] border-[#d8e5dc] text-[#1c4532] font-semibold' : 'bg-[#fafbfa] border-[#e6e9e4] text-[#88928b]'
              }`}>
                <span>1. إتمام عملية الدفع</span>
                {processStage >= 1 && <CheckCircle2 className="w-4 h-4 text-[#1c4532]" />}
              </div>
              <div className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                processStage >= 2 ? 'bg-[#edf5ef] border-[#d8e5dc] text-[#1c4532] font-semibold' : 'bg-[#fafbfa] border-[#e6e9e4] text-[#88928b]'
              }`}>
                <span>2. حجز الحساب من المخزون الآلي</span>
                {processStage >= 2 && <CheckCircle2 className="w-4 h-4 text-[#1c4532]" />}
              </div>
              <div className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                processStage >= 3 ? 'bg-[#edf5ef] border-[#d8e5dc] text-[#1c4532] font-semibold' : 'bg-[#fafbfa] border-[#e6e9e4] text-[#88928b]'
              }`}>
                <span>3. إنشاء الفاتورة وإظهار البيانات</span>
                {processStage >= 3 && <CheckCircle2 className="w-4 h-4 text-[#1c4532]" />}
              </div>
            </div>
          </div>
        ) : (
          /* FORM SCREEN */
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6">
            {/* Account Mini-Recap */}
            <div className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#1c4532] block">
                  {account.gameName} · {account.platformName}
                </span>
                <h4 className="text-sm font-bold text-[#1f2421] line-clamp-1">
                  {account.title}
                </h4>
              </div>
              <div className="text-left shrink-0 mr-3">
                <span className="text-lg font-black text-[#1f2421] font-mono tabular-nums">
                  {account.price}
                </span>
                <span className="text-xs font-bold text-[#1c4532] mr-1">ر.س</span>
              </div>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-[#fdf2f2] border border-[#f5c6c6] text-[#b91c1c] text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Customer Contact Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#1f2421] uppercase tracking-wider">
                بيانات المستلم (لاستلام بيانات الحساب والفاتورة):
              </h4>

              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  الاسم الكامل:
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: خالد العتيبي"
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] focus:outline-none focus:border-[#1c4532] focus:bg-white focus:ring-1 focus:ring-[#1c4532] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                    رقم الجوال (سعودي يبدأ بـ 05):
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    maxLength={10}
                    className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono text-right focus:outline-none focus:border-[#1c4532] focus:bg-white focus:ring-1 focus:ring-[#1c4532] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                    البريد الإلكتروني (لاستلام نسخة الحساب):
                  </label>
                  <input
                    type="email"
                    required
                    dir="ltr"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] text-right focus:outline-none focus:border-[#1c4532] focus:bg-white focus:ring-1 focus:ring-[#1c4532] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#1f2421] uppercase tracking-wider">
                طريقة الدفع المختارة:
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* Apple Pay Button */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#1c4532] bg-[#edf5ef] text-[#1c4532] shadow-xs ring-1 ring-[#1c4532]'
                      : 'border-[#e2e6df] bg-white text-[#525d56] hover:bg-[#fafbfa]'
                  }`}
                >
                  <div className="flex items-center gap-1 font-black text-sm">
                    <span>Apple Pay</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#657068]">
                    دفع آلي فوري بنقرة واحدة
                  </span>
                </button>

                {/* Bank Transfer / WhatsApp */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#1c4532] bg-[#edf5ef] text-[#1c4532] shadow-xs ring-1 ring-[#1c4532]'
                      : 'border-[#e2e6df] bg-white text-[#525d56] hover:bg-[#fafbfa]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1f2421]">
                    <Building2 className="w-4 h-4 text-[#1c4532]" />
                    <span>تحويل بنكي / واتساب</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#657068]">
                    الراجحي وتأكيد فوري
                  </span>
                </button>
              </div>
            </div>

            {/* Apple Pay Details */}
            {paymentMethod === 'apple_pay' && (
              <div className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#657068]">الخدمة:</span>
                  <span className="font-bold text-[#1f2421]">Apple Pay Gateway</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#657068]">المبلغ الإجمالي:</span>
                  <span className="font-bold text-[#1c4532] font-mono text-sm">
                    {account.price} ر.س
                  </span>
                </div>
                <p className="text-[11px] text-[#657068] leading-relaxed pt-2 border-t border-[#edf0ec]">
                  عند النقر على "إتمام الدفع عبر Apple Pay" سيتم التحقق فورياً وإظهار بيانات الحساب كاملة على شاشتك تلقائياً.
                </p>
              </div>
            )}

            {/* Bank Transfer Details */}
            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#1c4532] block">
                    بيانات الحساب البنكي للتحويل:
                  </span>
                  <p className="text-xs text-[#485f4e]">
                    يرجى تحويل مبلغ <strong className="text-[#1c4532]">{account.price} ر.س</strong> إلى الحساب التالي:
                  </p>
                </div>

                <div className="space-y-2.5 text-xs bg-white p-3.5 rounded-xl border border-[#d8e5dc]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#657068]">البنك:</span>
                    <span className="font-bold text-[#1f2421]">{STORE_BANK_INFO.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#657068]">اسم المستفيد:</span>
                    <span className="font-bold text-[#1f2421]">{STORE_BANK_INFO.accountHolder}</span>
                  </div>

                  {/* IBAN Copy */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#edf0ec]">
                    <div className="text-right">
                      <span className="text-[11px] text-[#657068] block">رقم الآيبان (IBAN):</span>
                      <span className="font-mono text-xs font-bold text-[#1f2421] dir-ltr select-all">
                        {STORE_BANK_INFO.iban}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyIban}
                      className="px-2.5 py-1 text-xs font-semibold text-[#1c4532] bg-[#edf5ef] hover:bg-[#e1ede4] rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedIban ? <Check className="w-3.5 h-3.5 text-[#1c4532]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIban ? 'تم النسخ' : 'نسخ الآيبان'}</span>
                    </button>
                  </div>

                  {/* Account Number Copy */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#edf0ec]">
                    <div className="text-right">
                      <span className="text-[11px] text-[#657068] block">رقم الحساب:</span>
                      <span className="font-mono text-xs font-bold text-[#1f2421] dir-ltr select-all">
                        {STORE_BANK_INFO.accountNumber}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAcc}
                      className="px-2.5 py-1 text-xs font-semibold text-[#1c4532] bg-[#edf5ef] hover:bg-[#e1ede4] rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedAcc ? <Check className="w-3.5 h-3.5 text-[#1c4532]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAcc ? 'تم النسخ' : 'نسخ الحساب'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                    اسم المحوّل (لتأكيد الحوالة):
                  </label>
                  <input
                    type="text"
                    value={transferSenderName}
                    onChange={(e) => setTransferSenderName(e.target.value)}
                    placeholder="الاسم الذي تم التحويل منه..."
                    className="w-full bg-white border border-[#d8e5dc] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] focus:outline-none focus:border-[#1c4532]"
                  />
                </div>

                {/* Direct WhatsApp Contact Button */}
                <a
                  href={`https://wa.me/966536670021?text=${encodeURIComponent(`السلام عليكم، قمت بتحويل ${account.price} ر.س بخصوص حساب ${account.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#ffffff] hover:bg-[#f6faf7] border border-[#c5d8cb] text-[#1c4532] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#1c4532]" />
                  <span>إرسال إيصال التحويل عبر الواتساب مباشرة ({STORE_PHONE})</span>
                </a>
              </div>
            )}

            {/* Guarantees note */}
            <div className="flex items-center gap-2 text-xs text-[#636e67]">
              <ShieldCheck className="w-4 h-4 text-[#1c4532] shrink-0" />
              <span>تسليم فوري ومضمون مع كفالة ذهبية شاملة لمدة {account.credentials.warrantyDays} يوماً.</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#edf0ec] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 text-xs font-semibold text-[#636e67] hover:text-[#1f2421] transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="px-7 py-3 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-2xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>
                  {paymentMethod === 'apple_pay'
                    ? `إتمام الدفع عبر Apple Pay (${account.price} ر.س)`
                    : `تأكيد التحويل واستلام الحساب فورياً (${account.price} ر.س)`}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
