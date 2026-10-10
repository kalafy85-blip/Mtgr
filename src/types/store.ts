export type GameCategory = 'all' | 'cod' | 'fifa26' | 'fifa27';

export type PlatformType = 'all' | 'ps5' | 'xbox' | 'pc' | 'multi';

export interface AccountCredentials {
  loginEmail: string;
  loginPassword: string;
  backupCodes: string[];
  activisionId?: string;
  eaId?: string;
  mailAccessUrl?: string;
  instructions: string[];
  warrantyDays: number;
}

export interface AccountItem {
  id: string;
  title: string;
  shortDesc: string;
  game: 'cod' | 'fifa26' | 'fifa27';
  gameName: string;
  platform: PlatformType;
  platformName: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  stockCount: number;
  badge?: string;
  credentials: AccountCredentials;
  createdAt: string;
}

export type PaymentMethod = 'apple_pay' | 'bank_transfer';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  accountId: string;
  accountTitle: string;
  game: 'cod' | 'fifa26' | 'fifa27';
  gameName: string;
  platform: PlatformType;
  amount: number;
  paymentMethod: PaymentMethod;
  status: 'delivered' | 'completed' | 'processing' | 'refunded';
  createdAt: string;
  deliveredCredentials: AccountCredentials;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}
