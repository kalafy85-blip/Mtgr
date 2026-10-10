import React, { useState } from 'react';
import { AccountItem, Order, Customer } from '../../types/store';
import { StoreAnnouncement, STORE_PHONE, STORE_WHATSAPP_URL } from '../../data/initialData';
import {
  UserCog,
  ShoppingBag,
  Database,
  Users,
  Plus,
  Search,
  CheckCircle2,
  Phone,
  Trash2,
  Eye,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Package,
  Megaphone,
  Download,
  RefreshCw
} from 'lucide-react';
import { AddAccountModal } from './AddAccountModal';

interface AdminDashboardProps {
  accounts: AccountItem[];
  orders: Order[];
  customers: Customer[];
  announcement: StoreAnnouncement;
  onUpdateAnnouncement: (announcement: StoreAnnouncement) => void;
  onBackToStore: () => void;
  onLockOwnerPanel: () => void;
  onAddAccount: (account: AccountItem) => void;
  onDeleteAccount: (accountId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onViewOrderCredentials: (order: Order) => void;
  onResetData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  accounts,
  orders,
  customers,
  announcement,
  onUpdateAnnouncement,
  onBackToStore,
  onLockOwnerPanel,
  onAddAccount,
  onDeleteAccount,
  onUpdateOrderStatus,
  onViewOrderCredentials,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'announcement' | 'orders' | 'customers' | 'overview'>('inventory');
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  // Announcement edit state
  const [annEnabled, setAnnEnabled] = useState(announcement.enabled);
  const [annText, setAnnText] = useState(announcement.text);
  const [annType, setAnnType] = useState<StoreAnnouncement['type']>(announcement.type);
  const [annSavedAlert, setAnnSavedAlert] = useState(false);

  // Search states
  const [inventorySearch, setInventorySearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | Order['status']>('all');
  const [customerSearch, setCustomerSearch] = useState('');

  // Calculations
  const totalRevenue = orders.reduce((sum, ord) => (ord.status !== 'refunded' ? sum + ord.amount : sum), 0);
  const totalCompletedOrders = orders.filter((o) => o.status === 'delivered' || o.status === 'completed').length;
  const totalAvailableStock = accounts.reduce((sum, acc) => sum + (acc.stockCount || 0), 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Filtered lists
  const filteredAccounts = accounts.filter((acc) => {
    return (
      acc.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      acc.gameName.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      acc.platformName.toLowerCase().includes(inventorySearch.toLowerCase())
    );
  });

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customerPhone.includes(orderSearch) ||
      ord.accountTitle.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus = orderStatusFilter === 'all' || ord.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCustomers = customers.filter((cust) => {
    return (
      cust.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      cust.phone.includes(customerSearch) ||
      cust.email.toLowerCase().includes(customerSearch.toLowerCase())
    );
  });

  // Save announcement
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement({
      enabled: annEnabled,
      text: annText.trim(),
      type: annType
    });
    setAnnSavedAlert(true);
    setTimeout(() => setAnnSavedAlert(false), 2500);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Order Number,Customer Name,Phone,Account,Game,Amount SAR,Status,Date'];
    const rows = orders.map(
      (o) =>
        `"${o.orderNumber}","${o.customerName}","${o.customerPhone}","${o.accountTitle}","${o.gameName}",${o.amount},"${o.status}","${o.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `private_store_orders_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#1f2421] pb-16">
      {/* Top Bar for Owner */}
      <div className="bg-white border-b border-[#e6e9e4] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#edf5ef] text-[#1c4532] border border-[#d8e5dc] flex items-center justify-center font-bold">
                <UserCog className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-sm font-bold text-[#1f2421]">
                  قائمة صاحب المتجر | متجر برايفت
                </h1>
                <span className="text-[11px] text-[#636e67] font-medium">
                  التحكم الكامل بعرض الحسابات · الإعلانات · الطلبات · العملاء
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onBackToStore}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#35433a] bg-[#f4f6f3] hover:bg-[#eaece8] rounded-xl border border-[#e2e6df] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>معاينة متجر العملاء</span>
              </button>

              <button
                onClick={onLockOwnerPanel}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#b91c1c] bg-[#fdf2f2] hover:bg-[#fde8e8] rounded-xl border border-[#f5c6c6] transition-colors cursor-pointer"
                title="قفل القائمة بالرمز السري"
              >
                <span>قفل القائمة (خروج)</span>
              </button>
            </div>
          </div>

          {/* Owner Menu Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-t border-[#edf0ec] py-2.5 scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-[#1c4532] text-white shadow-xs'
                  : 'text-[#556058] hover:text-[#1f2421] hover:bg-[#f4f6f3]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>الحسابات المعروضة ({accounts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('announcement')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'announcement'
                  ? 'bg-[#1c4532] text-white shadow-xs'
                  : 'text-[#556058] hover:text-[#1f2421] hover:bg-[#f4f6f3]'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>إعلان المتجر {annEnabled ? '(مفعل)' : '(معطل)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#1c4532] text-white shadow-xs'
                  : 'text-[#556058] hover:text-[#1f2421] hover:bg-[#f4f6f3]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>إدارة الطلبات ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-[#1c4532] text-white shadow-xs'
                  : 'text-[#556058] hover:text-[#1f2421] hover:bg-[#f4f6f3]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>سجل العملاء ({customers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#1c4532] text-white shadow-xs'
                  : 'text-[#556058] hover:text-[#1f2421] hover:bg-[#f4f6f3]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>المبيعات والتقارير</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TAB 1: INVENTORY & DISPLAYED ACCOUNTS */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div>
                <h2 className="text-base font-extrabold text-[#1f2421]">
                  قائمة الحسابات المعروضة في المتجر للعملاء
                </h2>
                <p className="text-xs text-[#636e67]">
                  يمكنك إضافة حساب جديد، تعديل الأسعار، ومراقبة المخزون المتاح للتسليم الفوري
                </p>
              </div>

              <button
                onClick={() => setShowAddAccountModal(true)}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة حساب جديد لعرضه</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="ابحث بالحساب المعروض أو اللعبة (كود، فيفا 26، فيفا 27)..."
                className="w-full bg-white border border-[#e2e6df] rounded-xl pl-4 pr-10 py-2.5 text-xs text-[#1f2421] placeholder-[#88928b] focus:outline-none focus:border-[#1c4532] focus:ring-1 focus:ring-[#1c4532] shadow-2xs"
              />
              <Search className="w-4 h-4 text-[#88928b] absolute right-3.5 top-3" />
            </div>

            {/* Accounts Grid in Admin */}
            {filteredAccounts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-[#e6e9e4] space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="w-14 h-14 rounded-2xl bg-[#edf5ef] text-[#1c4532] border border-[#d8e5dc] flex items-center justify-center mx-auto">
                  <Database className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#1f2421]">
                    لا توجد أي حسابات معروضة حالياً
                  </h3>
                  <p className="text-xs text-[#636e67] max-w-sm mx-auto leading-relaxed">
                    المتجر فارغ تماماً. اضغط على الزر أدناه لإضافة أول حساب وتعيين بيانات تسليمه وسعره.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddAccountModal(true)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة حساب جديد الآن</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-5 rounded-3xl bg-white border border-[#e6e9e4] flex flex-col justify-between space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#b9cebe] transition-colors"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1c4532] bg-[#edf5ef] px-2.5 py-0.5 rounded-lg border border-[#d8e5dc]">
                          {acc.gameName}
                        </span>
                        <span className="text-[11px] text-[#636e67]">
                          {acc.platformName}
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-[#1f2421] line-clamp-2">
                        {acc.title}
                      </h3>

                      <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] text-[11px] text-[#4a554e] space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-[#636e67]">الكمية بالمخزون:</span>
                          <span className="font-mono font-bold text-[#1f2421]">{acc.stockCount} حساب</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#636e67]">بريد الدخول:</span>
                          <span className="font-mono text-[#1c4532] font-semibold truncate max-w-[170px]" dir="ltr">
                            {acc.credentials.loginEmail}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#636e67]">الضمان:</span>
                          <span>{acc.credentials.warrantyDays} يوم</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#edf0ec] flex items-center justify-between">
                      <div>
                        <span className="text-base font-extrabold text-[#1f2421] font-mono tabular-nums">
                          {acc.price}
                        </span>
                        <span className="text-xs text-[#1c4532] font-bold mr-1">ر.س</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onDeleteAccount(acc.id)}
                          className="p-1.5 text-[#88928b] hover:text-[#b91c1c] hover:bg-[#fdf2f2] rounded-lg transition-colors cursor-pointer"
                          title="حذف الحساب من المتجر"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STORE ANNOUNCEMENT */}
        {activeTab === 'announcement' && (
          <div className="max-w-2xl bg-white p-7 rounded-3xl border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Megaphone className="w-5 h-5 text-[#1c4532]" />
                <h2 className="text-base font-extrabold text-[#1f2421]">
                  إدارة إعلان المتجر (أنت فقط من يضيف ويتحكم بالإعلان)
                </h2>
              </div>
              <p className="text-xs text-[#636e67] leading-relaxed">
                حسب رغبتك، المتجر لا يعرض أي إعلانات افتراضية. يمكنك هنا كتابة وتفعيل إعلانك الخاص (مثل كود خصم، تنبيه عن حسابات جديدة، أو أوقات الدعم) أو إغلاقه بالكامل ليتصفح العميل المتجر بكل هدوء.
              </p>
            </div>

            {annSavedAlert && (
              <div className="p-3.5 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] text-[#1c4532] text-xs flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تم تحديث إعدادات الإعلان بنجاح!</span>
              </div>
            )}

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              {/* Toggle Enable */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4]">
                <div>
                  <label className="text-xs font-bold text-[#1f2421] block">
                    عرض الإعلان في أعلى صفحة المتجر للعملاء
                  </label>
                  <span className="text-[11px] text-[#636e67]">
                    {annEnabled ? 'الإعلان ظاهر حالياً للعملاء' : 'الإعلان معطل ولن يظهر أي شيء للعميل'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={annEnabled}
                  onChange={(e) => setAnnEnabled(e.target.checked)}
                  className="w-5 h-5 accent-[#1c4532] rounded cursor-pointer"
                />
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-xs font-bold text-[#35433a] mb-1.5">
                  نص الإعلان الذي ترغب بإظهاره للعميل:
                </label>
                <textarea
                  rows={3}
                  value={annText}
                  onChange={(e) => setAnnText(e.target.value)}
                  placeholder="مثال: مرحباً بكم في متجر برايفت! جميع الحسابات تسلم فورياً بعد الدفع مع ضمان ذهبي 90 يوماً."
                  className="w-full bg-[#fafbfa] border border-[#e2e6df] rounded-xl p-3 text-xs text-[#1f2421] placeholder-[#88928b] focus:outline-none focus:border-[#1c4532] focus:bg-white"
                />
              </div>

              {/* Type Selector */}
              <div>
                <label className="block text-xs font-bold text-[#35433a] mb-1.5">
                  نوع الإعلان ومظهره:
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setAnnType('info')}
                    className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                      annType === 'info'
                        ? 'border-[#2563eb] bg-[#eff6ff] text-[#1e40af] font-bold'
                        : 'border-[#e2e6df] bg-white text-[#556058]'
                    }`}
                  >
                    أزرق (إخباري)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnnType('success')}
                    className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                      annType === 'success'
                        ? 'border-[#1c4532] bg-[#edf5ef] text-[#1c4532] font-bold'
                        : 'border-[#e2e6df] bg-white text-[#556058]'
                    }`}
                  >
                    أخضر (عروض وترويج)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnnType('alert')}
                    className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                      annType === 'alert'
                        ? 'border-[#d97706] bg-[#fffbeb] text-[#92400e] font-bold'
                        : 'border-[#e2e6df] bg-white text-[#556058]'
                    }`}
                  >
                    ذهبي (تنبيه هام)
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] space-y-1.5">
                <span className="text-[11px] font-bold text-[#636e67] block">
                  معاينة حية: كيف يظهر الإعلان حالياً للعملاء في أعلى المتجر:
                </span>
                {annEnabled && annText.trim() ? (
                  <div className={`p-2.5 rounded-xl text-xs font-bold text-center border ${
                    annType === 'success'
                      ? 'bg-[#edf5ef] text-[#1c4532] border-[#d8e5dc]'
                      : annType === 'alert'
                      ? 'bg-[#fffbeb] text-[#92400e] border-[#fde68a]'
                      : 'bg-[#eff6ff] text-[#1e40af] border-[#bfdbfe]'
                  }`}>
                    {annText.trim()}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl text-xs text-[#88928b] text-center bg-white border border-[#e2e6df] border-dashed">
                    الإعلان معطل حالياً - لا يظهر أي إعلان للعملاء في المتجر
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>نشر الإعلان لمتجر العملاء فوراً</span>
                </button>

                {annEnabled && (
                  <button
                    type="button"
                    onClick={() => {
                      setAnnEnabled(false);
                      onUpdateAnnouncement({
                        enabled: false,
                        text: annText,
                        type: annType
                      });
                      setAnnSavedAlert(true);
                      setTimeout(() => setAnnSavedAlert(false), 2000);
                    }}
                    className="py-3 px-4 text-xs font-bold text-[#b91c1c] bg-[#fdf2f2] hover:bg-[#fde8e8] rounded-xl border border-[#f5c6c6] transition-colors cursor-pointer"
                  >
                    إيقاف الإعلان
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <div>
                <h2 className="text-base font-extrabold text-[#1f2421]">إدارة طلبات العملاء</h2>
                <p className="text-xs text-[#636e67]">
                  متابعة الطلبات وتفاصيل تسليم الحسابات الفورية للعملاء
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 text-xs font-semibold text-[#35433a] bg-[#f4f6f3] hover:bg-[#eaece8] rounded-xl border border-[#e2e6df] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تصدير تقرير CSV</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="ابحث برقم الطلب، اسم العميل، الجوال، أو الحساب..."
                  className="w-full bg-white border border-[#e2e6df] rounded-xl pl-4 pr-10 py-2.5 text-xs text-[#1f2421] placeholder-[#88928b] focus:outline-none focus:border-[#1c4532] focus:ring-1 focus:ring-[#1c4532] shadow-2xs"
                />
                <Search className="w-4 h-4 text-[#88928b] absolute right-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                <button
                  onClick={() => setOrderStatusFilter('all')}
                  className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap font-medium cursor-pointer ${
                    orderStatusFilter === 'all'
                      ? 'bg-[#1c4532] text-white font-bold'
                      : 'bg-white text-[#556058] hover:bg-[#fafbfa] border border-[#e2e6df]'
                  }`}
                >
                  الكل ({orders.length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('delivered')}
                  className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap font-medium cursor-pointer ${
                    orderStatusFilter === 'delivered'
                      ? 'bg-[#1c4532] text-white font-bold'
                      : 'bg-white text-[#556058] hover:bg-[#fafbfa] border border-[#e2e6df]'
                  }`}
                >
                  تم التسليم آلياً
                </button>
                <button
                  onClick={() => setOrderStatusFilter('refunded')}
                  className={`px-3 py-2 rounded-xl transition-colors whitespace-nowrap font-medium cursor-pointer ${
                    orderStatusFilter === 'refunded'
                      ? 'bg-[#b91c1c] text-white font-bold'
                      : 'bg-white text-[#556058] hover:bg-[#fafbfa] border border-[#e2e6df]'
                  }`}
                >
                  مسترجع
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-3xl border border-[#e6e9e4] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#fafbfa] border-b border-[#e6e9e4] text-[#636e67] font-bold">
                  <tr>
                    <th className="p-4">رقم الطلب</th>
                    <th className="p-4">العميل والتواصل</th>
                    <th className="p-4">الحساب المشترى</th>
                    <th className="p-4">المبلغ</th>
                    <th className="p-4">طريقة الدفع</th>
                    <th className="p-4">التاريخ</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf0ec]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-[#88928b]">
                        لا توجد طلبات تطابق معايير البحث.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#fafbfa] transition-colors">
                        <td className="p-4 font-mono font-bold text-[#1c4532]">
                          {ord.orderNumber}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-[#1f2421]">{ord.customerName}</div>
                          <div className="text-[11px] text-[#636e67] font-mono dir-ltr text-right">
                            {ord.customerPhone}
                          </div>
                        </td>
                        <td className="p-4 max-w-xs">
                          <div className="font-semibold text-[#1f2421] line-clamp-1">
                            {ord.accountTitle}
                          </div>
                          <span className="text-[10px] text-[#636e67]">
                            {ord.gameName} · {ord.platform}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-[#1f2421] tabular-nums whitespace-nowrap">
                          {ord.amount} ر.س
                        </td>
                        <td className="p-4 text-[11px] text-[#1f2421] font-bold whitespace-nowrap">
                          {ord.paymentMethod === 'apple_pay' ? ' Apple Pay' : 'تحويل بنكي (واتساب)'}
                        </td>
                        <td className="p-4 text-[#636e67] font-mono text-[11px] whitespace-nowrap">
                          {ord.createdAt.substring(0, 10)}
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                            className="bg-[#fafbfa] border border-[#e2e6df] rounded-lg px-2.5 py-1 text-[11px] text-[#1f2421] focus:outline-none focus:border-[#1c4532] font-medium"
                          >
                            <option value="delivered">تم التسليم آلياً</option>
                            <option value="completed">مكتمل</option>
                            <option value="refunded">مسترجع</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => onViewOrderCredentials(ord)}
                              className="p-1.5 bg-[#edf5ef] hover:bg-[#e1ede4] text-[#1c4532] rounded-lg transition-colors font-bold cursor-pointer"
                              title="عرض بيانات الحساب المسلّمة للعميل"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <a
                              href={`https://wa.me/966${ord.customerPhone.replace(/^0+/, '')}?text=${encodeURIComponent(
                                `مرحباً ${ord.customerName}، معك خدمة عملاء متجر برايفت بخصوص طلبك ${ord.orderNumber}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-[#f4f6f3] hover:bg-[#eaece8] text-[#556058] hover:text-[#1c4532] rounded-lg transition-colors"
                              title="محادثة العميل عبر الواتساب"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMERS CRM */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <h2 className="text-base font-extrabold text-[#1f2421]">سجل العملاء (CRM)</h2>
              <p className="text-xs text-[#636e67]">
                قائمة عملائك ومتابعة إجمالي مشترياتهم والتواصل المباشر معهم
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="ابحث باسم العميل، رقم الجوال، أو البريد الإلكتروني..."
                className="w-full bg-white border border-[#e2e6df] rounded-xl pl-4 pr-10 py-2.5 text-xs text-[#1f2421] placeholder-[#88928b] focus:outline-none focus:border-[#1c4532] focus:ring-1 focus:ring-[#1c4532] shadow-2xs"
              />
              <Search className="w-4 h-4 text-[#88928b] absolute right-3.5 top-3" />
            </div>

            <div className="overflow-x-auto rounded-3xl border border-[#e6e9e4] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#fafbfa] border-b border-[#e6e9e4] text-[#636e67] font-bold">
                  <tr>
                    <th className="p-4">اسم العميل</th>
                    <th className="p-4">رقم الجوال</th>
                    <th className="p-4">البريد الإلكتروني</th>
                    <th className="p-4">الطلبات</th>
                    <th className="p-4">إجمالي المشتريات</th>
                    <th className="p-4">آخر طلب</th>
                    <th className="p-4 text-center">محادثة واتساب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf0ec]">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-[#88928b]">
                        لا يوجد عملاء يطابقون البحث.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-[#fafbfa] transition-colors">
                        <td className="p-4 font-bold text-[#1f2421]">{cust.name}</td>
                        <td className="p-4 font-mono text-[#4a554e] dir-ltr text-right">
                          {cust.phone}
                        </td>
                        <td className="p-4 text-[#636e67] font-mono" dir="ltr">
                          {cust.email}
                        </td>
                        <td className="p-4 font-mono font-bold text-[#1f2421] tabular-nums">
                          {cust.totalOrders}
                        </td>
                        <td className="p-4 font-mono font-bold text-[#1c4532] tabular-nums">
                          {cust.totalSpent} ر.س
                        </td>
                        <td className="p-4 text-[#636e67] font-mono text-[11px]">
                          {cust.lastOrderDate}
                        </td>
                        <td className="p-4 text-center">
                          <a
                            href={`https://wa.me/966${cust.phone.replace(/^0+/, '')}?text=${encodeURIComponent(
                              `مرحباً ${cust.name}، معك متجر برايفت لحسابات كود وفيفا`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#edf5ef] hover:bg-[#e1ede4] text-[#1c4532] border border-[#d8e5dc] rounded-xl transition-colors text-xs font-bold"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#1c4532]" />
                            <span>مراسلة واتساب</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: OVERVIEW & REPORTS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
                <span className="text-xs text-[#636e67] flex items-center justify-between">
                  <span>إجمالي المبيعات المحققة</span>
                  <DollarSign className="w-4 h-4 text-[#1c4532]" />
                </span>
                <div className="text-2xl font-black text-[#1f2421] font-mono tabular-nums">
                  {totalRevenue.toLocaleString()} <span className="text-xs text-[#1c4532] font-bold">ر.س</span>
                </div>
                <span className="text-[11px] text-[#1c4532] font-bold block">
                  ↑ تسليم فوري وتلقائي 100%
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
                <span className="text-xs text-[#636e67] flex items-center justify-between">
                  <span>إجمالي الطلبات المنفذة</span>
                  <ShoppingBag className="w-4 h-4 text-[#1c4532]" />
                </span>
                <div className="text-2xl font-black text-[#1f2421] font-mono tabular-nums">
                  {orders.length} <span className="text-xs text-[#636e67] font-normal">طلب</span>
                </div>
                <span className="text-[11px] text-[#636e67] block">
                  {totalCompletedOrders} طلب تم تسليمه بنجاح
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
                <span className="text-xs text-[#636e67] flex items-center justify-between">
                  <span>الحسابات المتوفرة بالمخزون</span>
                  <Package className="w-4 h-4 text-[#1c4532]" />
                </span>
                <div className="text-2xl font-black text-[#1f2421] font-mono tabular-nums">
                  {totalAvailableStock} <span className="text-xs text-[#636e67] font-normal">حساب جاهز</span>
                </div>
                <span className="text-[11px] text-[#636e67] block">
                  جاهزة للتسليم الفوري
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-2">
                <span className="text-xs text-[#636e67] flex items-center justify-between">
                  <span>متوسط قيمة السلة (AOV)</span>
                  <TrendingUp className="w-4 h-4 text-[#1c4532]" />
                </span>
                <div className="text-2xl font-black text-[#1f2421] font-mono tabular-nums">
                  {avgOrderValue} <span className="text-xs text-[#1c4532] font-bold">ر.س</span>
                </div>
                <span className="text-[11px] text-[#636e67] block">
                  إجمالي العملاء: {customers.length}
                </span>
              </div>
            </div>

            {/* Quick Actions & Reset */}
            <div className="p-6 rounded-3xl bg-white border border-[#e6e9e4] shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
              <h3 className="text-sm font-bold text-[#1f2421]">إجراءات النظام</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onResetData}
                  className="px-4 py-2.5 text-xs font-bold text-[#556058] hover:text-[#1f2421] bg-[#f4f6f3] hover:bg-[#eaece8] border border-[#e2e6df] rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#1c4532]" />
                  <span>إعادة تعيين البيانات الافتراضية التجريبية</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <AddAccountModal
          onClose={() => setShowAddAccountModal(false)}
          onAddAccount={onAddAccount}
        />
      )}
    </div>
  );
};
