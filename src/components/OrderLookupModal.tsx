import React, { useState } from 'react';
import { Order } from '../types/store';
import { Search, X, Eye, AlertCircle } from 'lucide-react';

interface OrderLookupModalProps {
  orders: Order[];
  onClose: () => void;
  onViewOrderCredentials: (order: Order) => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  orders,
  onClose,
  onViewOrderCredentials,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);

  const trimmed = searchTerm.trim().toLowerCase();
  const matchedOrders = orders.filter((o) => {
    if (!trimmed) return false;
    return (
      o.orderNumber.toLowerCase().includes(trimmed) ||
      o.customerPhone.includes(trimmed) ||
      o.customerEmail.toLowerCase().includes(trimmed)
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141b16]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white border border-[#e6e9e4] rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e6e9e4] bg-[#fafbfa]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#edf5ef] border border-[#d8e5dc] flex items-center justify-center">
              <Search className="w-5 h-5 text-[#1c4532]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1f2421]">
                استعلام عن طلب سابق واسترجاع الحساب
              </h2>
              <p className="text-xs text-[#636e67]">
                ابحث برقم الطلب (مثال: PVT-88491) أو برقم الجوال
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

        {/* Search Bar Form */}
        <div className="p-6 sm:p-8 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearched(false);
              }}
              placeholder="أدخل رقم الطلب أو رقم الجوال..."
              className="flex-1 bg-[#fafbfa] border border-[#e2e6df] rounded-xl px-4 py-3 text-xs text-[#1f2421] focus:outline-none focus:border-[#1c4532] focus:bg-white focus:ring-1 focus:ring-[#1c4532] transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>بحث</span>
            </button>
          </form>

          {/* Results Area */}
          <div className="space-y-3 pt-2">
            {searched && matchedOrders.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] space-y-2">
                <AlertCircle className="w-8 h-8 text-[#88928b] mx-auto" />
                <h4 className="text-sm font-bold text-[#1f2421]">لم يتم العثور على أي طلب</h4>
                <p className="text-xs text-[#636e67]">
                  تأكد من كتابة رقم الطلب بالشكل الصحيح أو رقم الجوال المستخدم وقت الشراء.
                </p>
              </div>
            ) : matchedOrders.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1c4532] block">
                  تم العثور على {matchedOrders.length} طلب:
                </span>
                {matchedOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e6e9e4] hover:border-[#b9cebe] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-[#1c4532] bg-[#edf5ef] px-2.5 py-0.5 rounded-md border border-[#d8e5dc]">
                          {ord.orderNumber}
                        </span>
                        <span className="text-xs font-bold text-[#1f2421]">{ord.accountTitle}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#636e67]">
                        <span>المبلغ: {ord.amount} ر.س</span>
                        <span>·</span>
                        <span>التاريخ: {ord.createdAt.substring(0, 10)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onViewOrderCredentials(ord);
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#1c4532] hover:bg-[#153828] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>عرض بيانات الحساب</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
