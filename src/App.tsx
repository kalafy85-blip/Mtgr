import React, { useState, useEffect, useMemo } from 'react';
import {
  AccountItem,
  Order,
  Customer,
  GameCategory,
  PlatformType
} from './types/store';
import {
  INITIAL_ACCOUNTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_ANNOUNCEMENT,
  StoreAnnouncement,
  STORE_PHONE,
  STORE_WHATSAPP_URL
} from './data/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { InstantDeliverySuccessModal } from './components/InstantDeliverySuccessModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { FaqAndHowItWorks } from './components/FaqAndHowItWorks';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { OwnerAuthModal } from './components/admin/OwnerAuthModal';
import { Search, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

const STORAGE_ACCOUNTS_KEY = 'private_store_accounts_v3_clean';
const STORAGE_ORDERS_KEY = 'private_store_orders_v3_clean';
const STORAGE_CUSTOMERS_KEY = 'private_store_customers_v3_clean';
const STORAGE_ANNOUNCEMENT_KEY = 'private_store_announcement_v3_clean';

export default function App() {
  // Persistence state
  const [accounts, setAccounts] = useState<AccountItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOMERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  // Announcement created only by owner (disabled by default)
  const [announcement, setAnnouncement] = useState<StoreAnnouncement>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ANNOUNCEMENT_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
    } catch {
      return INITIAL_ANNOUNCEMENT;
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CUSTOMERS_KEY, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ANNOUNCEMENT_KEY, JSON.stringify(announcement));
  }, [announcement]);

  // View Mode: Storefront vs Owner Panel
  const [isAdminView, setIsAdminView] = useState(false);
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(false);
  const [showOwnerAuthModal, setShowOwnerAuthModal] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');

  // Modals state
  const [detailsAccount, setDetailsAccount] = useState<AccountItem | null>(null);
  const [checkoutAccount, setCheckoutAccount] = useState<AccountItem | null>(null);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const [showOrderLookup, setShowOrderLookup] = useState(false);

  // Filtered & Sorted accounts
  const displayedAccounts = useMemo(() => {
    return accounts
      .filter((acc) => {
        // Category filter
        if (selectedCategory !== 'all' && acc.game !== selectedCategory) {
          return false;
        }
        // Platform filter
        if (selectedPlatform !== 'all' && acc.platform !== 'multi' && acc.platform !== selectedPlatform) {
          return false;
        }
        // Search term
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = acc.title.toLowerCase().includes(q);
          const matchGame = acc.gameName.toLowerCase().includes(q);
          const matchDesc = acc.shortDesc.toLowerCase().includes(q);
          const matchFeature = acc.features.some((f) => f.toLowerCase().includes(q));
          if (!matchTitle && !matchGame && !matchDesc && !matchFeature) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return 0;
      });
  }, [accounts, selectedCategory, selectedPlatform, searchQuery, sortBy]);

  // Checkout Success handler
  const handlePaymentSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === newOrder.accountId) {
          const newCount = Math.max(0, acc.stockCount - 1);
          return {
            ...acc,
            stockCount: newCount,
            inStock: newCount > 0
          };
        }
        return acc;
      })
    );

    setCustomers((prev) => {
      const existing = prev.find((c) => c.phone === newOrder.customerPhone);
      if (existing) {
        return prev.map((c) =>
          c.phone === newOrder.customerPhone
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + newOrder.amount,
                lastOrderDate: newOrder.createdAt.substring(0, 10)
              }
            : c
        );
      } else {
        const newCust: Customer = {
          id: 'cust-' + Date.now(),
          name: newOrder.customerName,
          phone: newOrder.customerPhone,
          email: newOrder.customerEmail,
          totalOrders: 1,
          totalSpent: newOrder.amount,
          lastOrderDate: newOrder.createdAt.substring(0, 10)
        };
        return [newCust, ...prev];
      }
    });

    setCheckoutAccount(null);
    setSuccessOrder(newOrder);
  };

  // Admin Actions
  const handleAddAccount = (newAcc: AccountItem) => {
    setAccounts((prev) => [newAcc, ...prev]);
  };

  const handleDeleteAccount = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا الحساب؟')) {
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleResetData = () => {
    if (confirm('هل تود إعادة تعيين كافة البيانات إلى بيانات البدء الافتراضية؟')) {
      setAccounts(INITIAL_ACCOUNTS);
      setOrders(INITIAL_ORDERS);
      setCustomers(INITIAL_CUSTOMERS);
      setAnnouncement(INITIAL_ANNOUNCEMENT);
      localStorage.removeItem(STORAGE_ACCOUNTS_KEY);
      localStorage.removeItem(STORAGE_ORDERS_KEY);
      localStorage.removeItem(STORAGE_CUSTOMERS_KEY);
      localStorage.removeItem(STORAGE_ANNOUNCEMENT_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#1f2421] flex flex-col selection:bg-[#d6e8dc] selection:text-[#163828] font-sans">
      {/* Optional Store Announcement (ONLY shown if the owner explicitly configured and enabled one) */}
      {!isAdminView && announcement.enabled && announcement.text && (
        <aside aria-label="تنبيه المتجر" className={`py-2.5 px-4 text-xs font-semibold text-center border-b transition-colors flex items-center justify-center gap-2 ${
          announcement.type === 'success'
            ? 'bg-[#edf5ef] text-[#1c4532] border-[#d8e5dc]'
            : announcement.type === 'alert'
            ? 'bg-[#fffbeb] text-[#92400e] border-[#fde68a]'
            : 'bg-[#eff6ff] text-[#1e40af] border-[#bfdbfe]'
        }`}>
          {announcement.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#1c4532] shrink-0" />}
          {announcement.type === 'alert' && <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0" />}
          {announcement.type === 'info' && <Info className="w-4 h-4 text-[#2563eb] shrink-0" />}
          <span>{announcement.text}</span>
        </aside>
      )}

      {/* Top Header */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (isAdminView) setIsAdminView(false);
        }}
        isAdminView={isAdminView}
        onToggleAdminView={() => {
          if (isAdminView) {
            setIsAdminView(false);
          } else if (isOwnerAuthenticated) {
            setIsAdminView(true);
          } else {
            setShowOwnerAuthModal(true);
          }
        }}
        onOpenOrderLookup={() => setShowOrderLookup(true)}
        orderCount={orders.length}
      />

      {/* Main View: Storefront vs Owner Console */}
      {isAdminView ? (
        <AdminDashboard
          accounts={accounts}
          orders={orders}
          customers={customers}
          announcement={announcement}
          onUpdateAnnouncement={setAnnouncement}
          onBackToStore={() => setIsAdminView(false)}
          onLockOwnerPanel={() => {
            setIsOwnerAuthenticated(false);
            setIsAdminView(false);
          }}
          onAddAccount={handleAddAccount}
          onDeleteAccount={handleDeleteAccount}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onViewOrderCredentials={(ord) => setSuccessOrder(ord)}
          onResetData={handleResetData}
        />
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onBrowseClick={() => {
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenLookup={() => setShowOrderLookup(true)}
          />

          {/* Guarantees and Trust Bar */}
          <TrustBar />

          {/* Store Catalog Section */}
          <section id="catalog-section" className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Catalog Header & Search */}
            <div className="space-y-6 mb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#1c4532] uppercase tracking-widest block mb-1">
                    حسابات جاهزة للتسليم الفوري
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f2421]">
                    تصفح حسابات كود وفيفا 26 و 27
                  </h2>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن تمويه، كوينز، سكنات، رانك..."
                    className="w-full bg-white border border-[#e2e6df] rounded-2xl pl-4 pr-10 py-3 text-xs text-[#1f2421] placeholder-[#88928b] focus:outline-none focus:border-[#1c4532] focus:ring-1 focus:ring-[#1c4532] transition-colors shadow-2xs"
                  />
                  <Search className="w-4 h-4 text-[#88928b] absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Segmented Filter Bar (Warm, relaxing pill container) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#e6e9e4]">
                {/* Game Tabs */}
                <div className="flex items-center gap-1.5 p-1.5 bg-[#f3f2ec] border border-[#e4e2d8] rounded-2xl text-xs overflow-x-auto shadow-2xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#1c4532] text-white shadow-xs'
                        : 'text-[#5a655e] hover:text-[#1f2421] hover:bg-white/60'
                    }`}
                  >
                    جميع الحسابات ({accounts.length})
                  </button>

                  <button
                    onClick={() => setSelectedCategory('cod')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      selectedCategory === 'cod'
                        ? 'bg-[#1c4532] text-white shadow-xs'
                        : 'text-[#5a655e] hover:text-[#1f2421] hover:bg-white/60'
                    }`}
                  >
                    <span>كود (Call of Duty)</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('fifa26')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      selectedCategory === 'fifa26'
                        ? 'bg-[#1c4532] text-white shadow-xs'
                        : 'text-[#5a655e] hover:text-[#1f2421] hover:bg-white/60'
                    }`}
                  >
                    <span>فيفا 26 (FC 26)</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('fifa27')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      selectedCategory === 'fifa27'
                        ? 'bg-[#1c4532] text-white shadow-xs'
                        : 'text-[#5a655e] hover:text-[#1f2421] hover:bg-white/60'
                    }`}
                  >
                    <span>فيفا 27 (FC 27)</span>
                  </button>
                </div>

                {/* Sub-filters: Platform & Sort */}
                <div className="flex items-center gap-2.5 text-xs">
                  {/* Platform dropdown */}
                  <div className="flex items-center gap-1.5 bg-white border border-[#e2e6df] rounded-xl px-3 py-2 shadow-2xs">
                    <span className="text-[#636e67]">المنصة:</span>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value as any)}
                      className="bg-transparent text-[#1f2421] font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="all">الكل</option>
                      <option value="ps5">بلايستيشن 5</option>
                      <option value="xbox">إكس بوكس</option>
                      <option value="pc">بي سي (PC)</option>
                    </select>
                  </div>

                  {/* Sort by price */}
                  <div className="flex items-center gap-1.5 bg-white border border-[#e2e6df] rounded-xl px-3 py-2 shadow-2xs">
                    <span className="text-[#636e67]">الترتيب:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-[#1f2421] font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="featured">المميز أولاً</option>
                      <option value="price_asc">الأقل سعراً</option>
                      <option value="price_desc">الأعلى سعراً</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {accounts.length === 0 ? (
              <div className="py-20 px-6 sm:px-12 text-center rounded-3xl bg-white border border-[#e6e9e4] space-y-5 shadow-[0_2px_16px_rgba(0,0,0,0.02)] max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center mx-auto text-[#1c4532]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-[#1f2421]">
                    المتجر جاهز ومعد بالكامل
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a655e] max-w-md mx-auto leading-relaxed">
                    لم تتم إضافة أي حسابات أو عروض حتى الآن. صاحب المتجر يقوم بإضافة الحسابات يدوياً وتحديد أسعارها وبيانات تسليمها الآلي من خلال لوحة التحكم الخاصة به.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      if (isOwnerAuthenticated) {
                        setIsAdminView(true);
                      } else {
                        setShowOwnerAuthModal(true);
                      }
                    }}
                    className="px-6 py-3 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-2xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
                  >
                    <span>دخول صاحب المتجر لإضافة أول حساب</span>
                    <span>🔒</span>
                  </button>

                  <a
                    href={STORE_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 text-xs font-bold text-[#2a382f] bg-[#fbfbfa] hover:bg-[#f4f6f3] border border-[#e2e6df] rounded-2xl transition-colors cursor-pointer"
                  >
                    تواصل مع المتجر عبر الواتساب ({STORE_PHONE})
                  </a>
                </div>
              </div>
            ) : displayedAccounts.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-white border border-[#e6e9e4] space-y-3 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
                <p className="text-sm text-[#5a655e]">
                  لا توجد حسابات تطابق خيارات الفلترة المحددة حالياً.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedPlatform('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#1c4532] rounded-xl hover:bg-[#153828] transition-colors shadow-xs cursor-pointer"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedAccounts.map((account) => (
                  <ProductCard
                    key={account.id}
                    account={account}
                    onSelect={(acc) => setDetailsAccount(acc)}
                    onInstantBuy={(acc) => setCheckoutAccount(acc)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* How It Works & FAQ Section */}
          <FaqAndHowItWorks />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Modals */}
      {/* 1. Account Details Modal */}
      {detailsAccount && (
        <ProductDetailsModal
          account={detailsAccount}
          onClose={() => setDetailsAccount(null)}
          onBuyNow={(acc) => {
            setDetailsAccount(null);
            setCheckoutAccount(acc);
          }}
        />
      )}

      {/* 2. Checkout & Payment Simulation Modal */}
      {checkoutAccount && (
        <CheckoutModal
          account={checkoutAccount}
          onClose={() => setCheckoutAccount(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* 3. Instant Automatic Delivery Screen */}
      {successOrder && (
        <InstantDeliverySuccessModal
          order={successOrder}
          onClose={() => setSuccessOrder(null)}
        />
      )}

      {/* 4. Order Tracking & Lookup Modal */}
      {showOrderLookup && (
        <OrderLookupModal
          orders={orders}
          onClose={() => setShowOrderLookup(false)}
          onViewOrderCredentials={(ord) => {
            setShowOrderLookup(false);
            setSuccessOrder(ord);
          }}
        />
      )}

      {/* 5. Owner Auth Passcode Modal */}
      {showOwnerAuthModal && (
        <OwnerAuthModal
          onClose={() => setShowOwnerAuthModal(false)}
          onSuccess={() => {
            setIsOwnerAuthenticated(true);
            setShowOwnerAuthModal(false);
            setIsAdminView(true);
          }}
        />
      )}
    </div>
  );
}
