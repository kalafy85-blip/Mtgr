import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { STORE_PHONE } from '../data/initialData';

export const FaqAndHowItWorks: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيف يعمل نظام التسليم الفوري التلقائي في متجر برايفت؟',
      a: 'النظام مبرمج آلياً ومرتبط بالخزنة الرقمية. بمجرد إتمام الدفع عبر Apple Pay أو تأكيد التحويل البنكي عبر الواتساب، يقوم النظام بفك تشفير بيانات الحساب وعرضها فوراً على شاشتك في غضون ثانية واحدة مع البريد الإلكتروني، كلمة المرور، ورموز الأمان، وإمكانية نسخها وتحميلها بنقرة واحدة.'
    },
    {
      q: 'هل يمكنني تغيير جميع بيانات الحساب (الإيميل، الباسورد، الربط)؟',
      a: 'نعم بالتأكيد! جميع الحسابات المعروضة في متجر برايفت تسلّم بكامل الصلاحيات، وتأتي مع البريد الإلكتروني الأساسي أو إمكانية نقل الملكية إلى بريدك الشخصي فوراً وتفعيل المصادقة الثنائية على رقم جوالك الخاص.'
    },
    {
      q: 'ما هو الضمان المقدم على حسابات كود وفيفا 26 و 27؟',
      a: 'نقدم ضماناً ذهبياً شاملاً لمدة تصل إلى 90 يوماً من تاريخ الشراء. في حال واجهت أي مشكلة فنية أو عدم مطابقة للمواصفات، يتم استبدال الحساب فوراً بحساب بديل أو استرجاع المبلغ بالكامل.'
    },
    {
      q: 'هل كوينز فيفا 26 و 27 مضمونة من الباند؟',
      a: 'نعم، حسابات فيفا 26 و 27 المتوفرة تم تجميع الكوينز فيها بطرق نظامية وآمنة عبر تجارة الويب آب والمكافآت، ولم تخضع لأي عقوبات أو إنذارات. كما أن سوق الانتقالات فيها مفعل ومفتوح 100%.'
    },
    {
      q: 'كيف أتواصل معكم إذا احتجت مساعدة في تسجيل الدخول؟',
      a: `فريق الدعم الفني متواجد على مدار 24 ساعة عبر الواتساب على الرقم المباشر: ${STORE_PHONE}. يسعدنا إرشادك خطوة بخطوة حتى تتأكد من جاهزية حسابك واللعب به مباشرة.`
    }
  ];

  return (
    <section className="py-16 border-t border-[#e6e9e4] bg-[#f8faf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: How It Works */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#1c4532] uppercase tracking-widest block mb-1.5">
              آلية العمل والتسليم
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f2421] mb-2">
              3 خطوات بسيطة لامتلاك حسابك في ثوانٍ
            </h2>
            <p className="text-xs sm:text-sm text-[#5a655e]">
              تجربة شراء رقمية مباشرة وسلسة وفورية دون الحاجة للانتظار
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-7 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_14px_rgba(0,0,0,0.02)] relative">
              <span className="text-3xl font-black text-[#e8eee9] absolute top-5 left-5 font-mono">
                01
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center mb-4 text-[#1c4532] font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-[#1f2421] mb-2">اختر حسابك المفضل</h3>
              <p className="text-xs text-[#5a655e] leading-relaxed">
                تصفح قائمة حسابات كود المعززة بالتمويهات أو حسابات فيفا 26 و 27 الغنية بالكوينز والأساطير واطلع على المواصفات.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_14px_rgba(0,0,0,0.02)] relative">
              <span className="text-3xl font-black text-[#e8eee9] absolute top-5 left-5 font-mono">
                02
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center mb-4 text-[#1c4532] font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-[#1f2421] mb-2">ادفع عبر Apple Pay أو تحويل</h3>
              <p className="text-xs text-[#5a655e] leading-relaxed">
                ادفع بنقرة واحدة عبر Apple Pay أو اختر التحويل البنكي لحساب الراجحي مع تواصل فوري عبر الواتساب.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_14px_rgba(0,0,0,0.02)] relative">
              <span className="text-3xl font-black text-[#e8eee9] absolute top-5 left-5 font-mono">
                03
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center mb-4 text-[#1c4532] font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-[#1f2421] mb-2">استلم بيانات الحساب فوراً</h3>
              <p className="text-xs text-[#5a655e] leading-relaxed">
                تظهر لك بيانات الحساب وأكواد الأمان على الشاشة مباشرة مع إمكانية نسخها فورياً وحفظ الفاتورة.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#1c4532] uppercase tracking-widest block mb-1">
              الأسئلة الشائعة
            </span>
            <h2 className="text-2xl font-extrabold text-[#1f2421]">
              كل ما تحتاج لمعرفته حول الضمان والتسليم
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#e6e9e4] overflow-hidden transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1f2421] hover:text-[#1c4532] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-7 h-7 rounded-lg bg-[#fafbfa] border border-[#e6e9e4] flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#1c4532]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#88928b]" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#525d56] leading-relaxed border-t border-[#edf0ec]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
