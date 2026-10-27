/**
 * Data structures and types for Rupanjali Small Finance Bank
 */

export interface DepositRate {
  tenure: string;
  tenureDaysMin: number;
  tenureDaysMax: number;
  regularRate: number;
  seniorRate: number;
  isSpecial?: boolean;
  highlightText?: string;
}

export interface SavingsSlab {
  balanceRange: string;
  rate: number;
  description: string;
}

export interface LoanProduct {
  id: string;
  name: string;
  tagline: string;
  minAmount: number;
  maxAmount: number;
  interestRateMin: number;
  interestRateMax: number;
  maxTenureMonths: number;
  processingFee: string;
  features: string[];
  eligibleAudience: string;
}

export interface BankBranch {
  id: string;
  name: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  phone: string;
  email: string;
  ifsc: string;
  micr: string;
  workingHours: string;
  hasAtm: boolean;
  hasCdm: boolean;
  hasLockers: boolean;
  hasDoorstep: boolean;
}

export interface Transaction {
  id: string;
  refNo: string;
  date: string;
  title: string;
  recipientOrSender: string;
  category: 'transfer' | 'interest' | 'deposit' | 'bill' | 'shopping' | 'atm';
  type: 'credit' | 'debit';
  amount: number;
  balanceAfter: number;
  channel: 'UPI' | 'IMPS' | 'NEFT' | 'ATM' | 'INTERNAL';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface UserAccount {
  accountNumber: string;
  accountHolder: string;
  customerId: string;
  accountType: 'Savings' | 'Current';
  balance: number;
  ifsc: string;
  branch: string;
  virtualCard: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    isFrozen: boolean;
    onlinePaymentsEnabled: boolean;
    internationalEnabled: boolean;
    dailyLimit: number;
  };
  activeFixedDeposits: Array<{
    id: string;
    fdNumber: string;
    principal: number;
    interestRate: number;
    tenureMonths: number;
    bookingDate: string;
    maturityDate: string;
    maturityAmount: number;
    status: 'Active' | 'Matured';
  }>;
}

export interface TestimonialStory {
  id: string;
  name: string;
  role: string;
  enterprise: string;
  location: string;
  quote: string;
  loanType: string;
  outcomeMetric: string;
}
