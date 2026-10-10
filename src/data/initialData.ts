import { AccountItem, Order, Customer } from '../types/store';

export interface StoreAnnouncement {
  enabled: boolean;
  text: string;
  type: 'info' | 'success' | 'alert';
}

export const INITIAL_ANNOUNCEMENT: StoreAnnouncement = {
  enabled: false,
  text: '',
  type: 'info'
};

// EMPTY: No dummy accounts or pre-filled offers. The owner adds his own accounts!
export const INITIAL_ACCOUNTS: AccountItem[] = [];

// EMPTY: No fake orders
export const INITIAL_ORDERS: Order[] = [];

// EMPTY: No fake customers
export const INITIAL_CUSTOMERS: Customer[] = [];

export const STORE_PHONE = '0536670021';
export const STORE_PHONE_INTL = '966536670021';
export const STORE_WHATSAPP_URL = 'https://wa.me/966536670021?text=' + encodeURIComponent('السلام عليكم، استفسار بخصوص متجر برايفت');

export const STORE_BANK_INFO = {
  bankName: 'مصرف الراجحي (Al Rajhi Bank)',
  accountHolder: 'متجر برايفت - محمد العتيبي',
  iban: 'SA4580000492608010182901',
  accountNumber: '492608010182901'
};
