import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface OwnerAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const OWNER_CORRECT_CODE = '053667002112345';

// Helper to convert Arabic numerals (٠-٩) to Western (0-9)
export const normalizeToLatinDigits = (str: string): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[٠-٩]/g, (char) => String(arabicDigits.indexOf(char)));
};

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = normalizeToLatinDigits(passcode.trim());

    if (cleanCode === OWNER_CORRECT_CODE) {
      setError('');
      onSuccess();
    } else {
      setError('رمز الدخول غير صحيح! هذا القسم مخصص لصاحب المتجر فقط.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141b16]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white border border-[#e6e9e4] rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e6e9e4] bg-[#fafbfa]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center text-[#1c4532]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1f2421]">
                تسجيل دخول صاحب المتجر
              </h2>
              <p className="text-xs text-[#636e67]">
                أدخل رمز الأمان الخاص بك لفتح قائمة التحكم
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#88928b] hover:text-[#1f2421] rounded-xl hover:bg-[#eef2ed] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-[#fdf2f2] border border-[#f5c6c6] text-[#b91c1c] text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#35433a] mb-1.5">
              رمز الدخول السري (Passcode):
            </label>
            <div className="relative">
              <input
                type={showCode ? 'text' : 'password'}
                required
                autoFocus
                dir="ltr"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                placeholder="أدخل رمز صاحب المتجر..."
                className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl pl-10 pr-10 py-3 text-sm text-[#1f2421] font-mono tracking-wider focus:outline-none focus:border-[#1c4532] focus:bg-white focus:ring-1 focus:ring-[#1c4532] transition-colors"
              />
              <KeyRound className="w-4 h-4 text-[#88928b] absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="p-1 text-[#88928b] hover:text-[#1f2421] absolute right-3 top-3 transition-colors cursor-pointer"
                title={showCode ? 'إخفاء' : 'إظهار'}
              >
                {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#717c74] mt-1.5">
              يمكنك كتابة الرمز بالأرقام الإنجليزية أو العربية.
            </p>
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-bold text-[#556058] hover:text-[#1f2421] bg-[#f4f6f3] hover:bg-[#eaece8] rounded-xl transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-[2] py-2.5 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>فتح قائمة صاحب المتجر</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
