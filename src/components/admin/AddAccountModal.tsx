import React, { useState } from 'react';
import { AccountItem, PlatformType } from '../../types/store';
import { X, Plus, Zap, AlertCircle } from 'lucide-react';
import codDefaultImg from '../../assets/images/cod_operator_account_1791626558218.jpg';
import fcDefaultImg from '../../assets/images/fc26_football_account_1791626570225.jpg';

interface AddAccountModalProps {
  onClose: () => void;
  onAddAccount: (account: AccountItem) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  onClose,
  onAddAccount,
}) => {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [game, setGame] = useState<'cod' | 'fifa26' | 'fifa27'>('cod');
  const [platform, setPlatform] = useState<PlatformType>('ps5');
  const [price, setPrice] = useState<number>(299);
  const [originalPrice, setOriginalPrice] = useState<number>(399);
  const [stockCount, setStockCount] = useState<number>(3);
  const [badge, setBadge] = useState('جديد');

  // Credentials
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [backupCodesStr, setBackupCodesStr] = useState('884910, 991024, 331092, 440192');
  const [gameId, setGameId] = useState('');
  const [warrantyDays, setWarrantyDays] = useState(90);

  // Features
  const [feature1, setFeature1] = useState('بريد أساسي كامل معلومات الإنشاء (OGE)');
  const [feature2, setFeature2] = useState('ضمان ذهبي شامل واستبدال فوري');
  const [feature3, setFeature3] = useState('تسليم آلي فوري خلال ثوانٍ معدودة');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('يرجى إدخال عنوان الحساب');
      return;
    }
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('يرجى إدخال بيانات التسليم الآلي (البريد وكلمة المرور)');
      return;
    }

    const platformLabels: Record<PlatformType, string> = {
      all: 'جميع المنصات',
      ps5: 'بلايستيشن 5 (PS5)',
      xbox: 'إكس بوكس (Xbox Series)',
      pc: 'بي سي (Steam / Battle.net)',
      multi: 'سوني 5 / إكس بوكس / بي سي'
    };

    const gameNames = {
      cod: 'كود COD',
      fifa26: 'فيفا 26 (FC 26)',
      fifa27: 'فيفا 27 (FC 27)'
    };

    const newAccount: AccountItem = {
      id: `${game}-${Date.now()}`,
      title: title.trim(),
      shortDesc: shortDesc.trim() || title.trim(),
      game,
      gameName: gameNames[game],
      platform,
      platformName: platformLabels[platform],
      price: Number(price) || 199,
      originalPrice: Number(originalPrice) || undefined,
      image: game === 'cod' ? codDefaultImg : fcDefaultImg,
      badge: badge.trim() || undefined,
      inStock: stockCount > 0,
      stockCount: Number(stockCount) || 1,
      createdAt: new Date().toISOString().substring(0, 10),
      features: [feature1, feature2, feature3].filter(Boolean),
      specs: [
        { label: 'الضمان', value: `${warrantyDays} يوماً` },
        { label: 'طريقة التسليم', value: 'آلي وفوري' },
        { label: 'البريد الأساسي', value: 'متضمن (OGE)' },
        { label: 'المنصة', value: platformLabels[platform] }
      ],
      credentials: {
        loginEmail: loginEmail.trim(),
        loginPassword: loginPassword.trim(),
        backupCodes: backupCodesStr
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
        activisionId: game === 'cod' ? gameId.trim() || undefined : undefined,
        eaId: game.startsWith('fifa') ? gameId.trim() || undefined : undefined,
        warrantyDays: Number(warrantyDays) || 90,
        instructions: ['قم بتسجيل الدخول وتغيير كلمة المرور والبريد إلى بريدك الشخصي فوراً.']
      }
    };

    onAddAccount(newAccount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141b16]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#e6e9e4] rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e6e9e4] bg-[#fafbfa]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center text-[#1c4532]">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1f2421]">
                إضافة حساب جديد إلى المتجر
              </h2>
              <p className="text-xs text-[#636e67]">
                املأ مواصفات الحساب وبيانات التسليم التلقائي
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
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-2xl bg-[#fdf2f2] border border-[#f5c6c6] text-[#b91c1c] text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#1f2421] uppercase tracking-wider">
              1. معلومات الحساب والعرض
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                عنوان الحساب في المتجر:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: حساب كود BO6 ماستر برستيج + تمويه أوريون كامل"
                className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] focus:outline-none focus:border-[#1c4532] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  نوع اللعبة:
                </label>
                <select
                  value={game}
                  onChange={(e) => setGame(e.target.value as any)}
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] focus:outline-none focus:border-[#1c4532]"
                >
                  <option value="cod">كود (Call of Duty BO6 / MW3)</option>
                  <option value="fifa26">فيفا 26 (FC 26)</option>
                  <option value="fifa27">فيفا 27 (FC 27)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  المنصة:
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] focus:outline-none focus:border-[#1c4532]"
                >
                  <option value="ps5">بلايستيشن 5 (PS5)</option>
                  <option value="xbox">إكس بوكس (Xbox Series)</option>
                  <option value="pc">بي سي (PC Steam/Battle.net)</option>
                  <option value="multi">مشترك (سوني / إكس بوكس / بي سي)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  السعر (ر.س):
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  السعر قبل الخصم (اختياري):
                </label>
                <input
                  type="number"
                  min={1}
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  الكمية المتوفرة:
                </label>
                <input
                  type="number"
                  min={1}
                  value={stockCount}
                  onChange={(e) => setStockCount(Number(e.target.value))}
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                شارة مميزة (Badge):
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="مثال: الأكثر طلباً، عرض خاص، VIP"
                className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] focus:outline-none focus:border-[#1c4532]"
              />
            </div>
          </div>

          {/* Section 2: Automated Delivery Credentials */}
          <div className="space-y-4 pt-4 border-t border-[#edf0ec]">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#1c4532]" />
              <h3 className="text-xs font-bold text-[#1f2421] uppercase tracking-wider">
                2. بيانات التسليم الآلي الفوري (تظهر للمشتري مباشرة بعد الدفع)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  البريد الإلكتروني لتسجيل الدخول:
                </label>
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="account@domain.com"
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  كلمة المرور (Password):
                </label>
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="SecurePassword123!"
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                أكواد الأمان الاحتياطية (مفصولة بفواصل):
              </label>
              <input
                type="text"
                dir="ltr"
                value={backupCodesStr}
                onChange={(e) => setBackupCodesStr(e.target.value)}
                placeholder="123456, 789012, 345678"
                className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  معرف أكتفجن أو EA (اختياري):
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  placeholder="Gamertag#1234"
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#48534c] mb-1.5">
                  مدة الضمان (بالأيام):
                </label>
                <input
                  type="number"
                  min={1}
                  value={warrantyDays}
                  onChange={(e) => setWarrantyDays(Number(e.target.value))}
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-2.5 text-xs text-[#1f2421] font-mono focus:outline-none focus:border-[#1c4532]"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#edf0ec] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-[#556058] hover:text-[#1f2421] transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة الحساب ونشره في المتجر</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
