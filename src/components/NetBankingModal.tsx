import React, { useState } from 'react';
import { UserAccount, Transaction } from '../types/bank';
import { 
  X, Lock, ShieldCheck, ArrowRight, ArrowDownLeft, ArrowUpRight, 
  Send, CreditCard, PiggyBank, History, CheckCircle2, AlertCircle, Eye, EyeOff, RefreshCw, QrCode
} from 'lucide-react';
import { UpiPaymentHub } from './UpiPaymentHub';

interface NetBankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAccount: UserAccount;
  transactions: Transaction[];
  onTransferSuccess: (newTx: Transaction, updatedBalance: number) => void;
  onBookFdSuccess: (newFd: any, updatedBalance: number) => void;
  onUpdateCardSettings: (newCardState: any) => void;
}

export const NetBankingModal: React.FC<NetBankingModalProps> = ({
  isOpen,
  onClose,
  userAccount,
  transactions,
  onTransferSuccess,
  onBookFdSuccess,
  onUpdateCardSettings
}) => {
  if (!isOpen) return null;

  const [activeNav, setActiveNav] = useState<'overview' | 'transfer' | 'upi-collect' | 'deposits' | 'cards' | 'history'>('overview');

  // Transfer form state
  const [transferMode, setTransferMode] = useState<'UPI' | 'IMPS' | 'NEFT'>('IMPS');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
  const [beneficiaryIfsc, setBeneficiaryIfsc] = useState('');
  const [transferAmount, setTransferAmount] = useState<number | ''>('');
  const [transferPurpose, setTransferPurpose] = useState('');
  const [transferError, setTransferError] = useState<string | null>(null);
  const [transferSuccessReceipt, setTransferSuccessReceipt] = useState<Transaction | null>(null);

  // New FD Booking State inside NetBanking
  const [newFdPrincipal, setNewFdPrincipal] = useState<number>(50000);
  const [newFdTenure, setNewFdTenure] = useState<number>(444);
  const [newFdSuccessMsg, setNewFdSuccessMsg] = useState<string | null>(null);

  // Card Controls
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);

  // Quick transfer handler
  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError(null);

    const amount = Number(transferAmount);
    if (!amount || amount <= 0) {
      setTransferError('Please enter a valid transfer amount.');
      return;
    }
    if (amount > userAccount.balance) {
      setTransferError(`Insufficient account balance (Available: ₹${userAccount.balance.toLocaleString('en-IN')}).`);
      return;
    }
    if (!beneficiaryName.trim()) {
      setTransferError('Please enter recipient / beneficiary name.');
      return;
    }
    if (!beneficiaryAccount.trim()) {
      setTransferError('Please enter recipient Account Number or UPI ID.');
      return;
    }

    const refNumber = `RUPA${Date.now().toString().slice(-8)}${Math.floor(1000 + Math.random() * 9000)}`;
    const newBal = Number((userAccount.balance - amount).toFixed(2));

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      refNo: refNumber,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      title: `${transferMode} Transfer to ${beneficiaryName}`,
      recipientOrSender: beneficiaryAccount,
      category: 'transfer',
      type: 'debit',
      amount: amount,
      balanceAfter: newBal,
      channel: transferMode,
      status: 'Completed'
    };

    onTransferSuccess(newTx, newBal);
    setTransferSuccessReceipt(newTx);
    setTransferAmount('');
    setBeneficiaryName('');
    setBeneficiaryAccount('');
    setBeneficiaryIfsc('');
    setTransferPurpose('');
  };

  // Instant FD Booking handler
  const handleBookFdInsideNetBanking = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFdPrincipal > userAccount.balance) {
      alert(`Insufficient balance to book FD. Available: ₹${userAccount.balance.toLocaleString('en-IN')}`);
      return;
    }

    const rate = newFdTenure === 444 ? 8.75 : 8.10;
    const years = newFdTenure / 365;
    const maturity = Math.round(newFdPrincipal * Math.pow(1 + (rate / 400), 4 * years));
    const newBal = Number((userAccount.balance - newFdPrincipal).toFixed(2));

    const newFd = {
      id: `fd-${Date.now()}`,
      fdNumber: `FD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      principal: newFdPrincipal,
      interestRate: rate,
      tenureMonths: Math.round(newFdTenure / 30),
      bookingDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      maturityDate: new Date(Date.now() + newFdTenure * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      maturityAmount: maturity,
      status: 'Active' as const
    };

    onBookFdSuccess(newFd, newBal);
    setNewFdSuccessMsg(`Fixed Deposit booked successfully! Certificate #${newFd.fdNumber} created.`);
    setTimeout(() => setNewFdSuccessMsg(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="netbanking-title"
      >
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-amber-300 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span id="netbanking-title" className="font-heading font-bold text-base sm:text-lg text-white">
                  Rupanjali NetBanking
                </span>
                <span className="text-xs text-emerald-400 font-mono">256-Bit SSL Encrypted</span>
              </div>
              <span className="text-xs text-slate-400">
                Customer: {userAccount.accountHolder} · ID: {userAccount.customerId}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inner Sub-Navigation Strip */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: PiggyBank },
            { id: 'transfer', label: 'Instant Fund Transfer', icon: Send },
            { id: 'upi-collect', label: 'UPI & Send Link', icon: QrCode },
            { id: 'deposits', label: 'Fixed Deposits', icon: History },
            { id: 'cards', label: 'RuPay Card Controls', icon: CreditCard },
            { id: 'history', label: 'Account Statement', icon: RefreshCw },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button
                key={nav.id}
                onClick={() => {
                  setActiveNav(nav.id as any);
                  setTransferSuccessReceipt(null);
                }}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeNav === nav.id
                    ? 'border-emerald-800 text-emerald-900 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content Container */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          
          {/* TAB 1: OVERVIEW */}
          {activeNav === 'overview' && (
            <div className="space-y-6">
              
              {/* Account Balance Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Savings Account Balance
                  </span>
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-800 font-mono tabular-nums block mt-2">
                    ₹{userAccount.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <div className="mt-2 text-xs text-slate-500 font-mono flex items-center justify-between">
                    <span>A/c: {userAccount.accountNumber}</span>
                    <span>IFSC: {userAccount.ifsc}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => setActiveNav('transfer')}
                      className="w-full py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer text-center"
                    >
                      Send Money
                    </button>
                    <button
                      onClick={() => setActiveNav('deposits')}
                      className="w-full py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer text-center"
                    >
                      Open FD
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Active Term Deposits
                  </span>
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 font-mono tabular-nums block mt-2">
                    ₹{userAccount.activeFixedDeposits.reduce((acc, fd) => acc + fd.principal, 0).toLocaleString('en-IN')}
                  </span>
                  <div className="mt-2 text-xs text-slate-500 font-mono flex items-center justify-between">
                    <span>{userAccount.activeFixedDeposits.length} Active Deposits</span>
                    <span className="text-emerald-700 font-semibold">Yields up to 8.75%</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveNav('deposits')}
                      className="w-full py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer text-center"
                    >
                      Manage Deposits
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    RuPay Platinum Card
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      •••• •••• •••• {userAccount.virtualCard.cardNumber.slice(-4)}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      userAccount.virtualCard.isFrozen ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {userAccount.virtualCard.isFrozen ? 'Frozen' : 'Active'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 font-mono">
                    Daily Limit: ₹{userAccount.virtualCard.dailyLimit.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveNav('cards')}
                      className="w-full py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer text-center"
                    >
                      Card Controls
                    </button>
                  </div>
                </div>

              </div>

              {/* Recent Transactions Snippet */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-base text-slate-900">
                    Recent Account Transactions
                  </h3>
                  <button
                    onClick={() => setActiveNav('history')}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                  >
                    View All Statements →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {transactions.slice(0, 4).map((tx) => (
                    <div key={tx.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          tx.type === 'credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-900 block">{tx.title}</span>
                          <span className="text-xs text-slate-500 font-mono">{tx.date} · {tx.channel} · Ref: {tx.refNo}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-mono font-bold tabular-nums block ${
                          tx.type === 'credit' ? 'text-emerald-700' : 'text-slate-900'
                        }`}>
                          {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Bal: ₹{tx.balanceAfter.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INSTANT FUND TRANSFER */}
          {activeNav === 'transfer' && (
            <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
              
              {transferSuccessReceipt ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                      Transaction Successful
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mt-1">
                      ₹{transferSuccessReceipt.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Transferred to <strong className="text-slate-900">{transferSuccessReceipt.recipientOrSender}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg text-xs font-mono text-left space-y-2 border border-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-500">UTR / Ref Number:</span>
                      <span className="font-bold text-slate-900">{transferSuccessReceipt.refNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment Channel:</span>
                      <span className="text-slate-900">{transferSuccessReceipt.channel} (24x7 Settlement)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Timestamp:</span>
                      <span className="text-slate-900">{transferSuccessReceipt.date}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-500">Remaining Balance:</span>
                      <span className="font-bold text-emerald-800">
                        ₹{transferSuccessReceipt.balanceAfter.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setTransferSuccessReceipt(null)}
                      className="w-full py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Make Another Transfer
                    </button>
                    <button
                      onClick={() => setActiveNav('history')}
                      className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    >
                      View in Passbook
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleExecuteTransfer} className="space-y-5">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900">
                      Transfer Funds (IMPS / UPI / NEFT)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      24x7 instant credit to any commercial bank account or VPA across India.
                    </p>
                  </div>

                  {transferError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{transferError}</span>
                    </div>
                  )}

                  {/* Mode Selector */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5 uppercase tracking-wider">
                      Transfer Protocol
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'IMPS', label: 'IMPS (Instant 24x7)' },
                        { id: 'UPI', label: 'UPI (VPA / QR)' },
                        { id: 'NEFT', label: 'NEFT (Batch Settlement)' }
                      ].map((mode) => (
                        <button
                          type="button"
                          key={mode.id}
                          onClick={() => setTransferMode(mode.id as any)}
                          className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                            transferMode === mode.id
                              ? 'border-emerald-800 bg-emerald-50 text-emerald-900'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Beneficiary Details */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Beneficiary Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar Yadav"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        {transferMode === 'UPI' ? 'UPI Virtual ID (VPA)' : 'Beneficiary Account Number'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={transferMode === 'UPI' ? 'name@okhdfcbank or merchant@upi' : 'Enter 9 to 18 digit bank account number'}
                        value={beneficiaryAccount}
                        onChange={(e) => setBeneficiaryAccount(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                      />
                    </div>

                    {transferMode !== 'UPI' && (
                      <div>
                        <label className="text-xs font-medium text-slate-700 block mb-1">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SBIN0001234 or HDFC0000001"
                          value={beneficiaryIfsc}
                          onChange={(e) => setBeneficiaryIfsc(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono uppercase"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-medium text-slate-700">Amount (₹)</label>
                        <span className="text-xs text-slate-500 font-mono">
                          Avail: ₹{userAccount.balance.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <input
                        type="number"
                        required
                        min={1}
                        max={userAccount.balance}
                        placeholder="Enter amount to transfer"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">
                        Remarks / Purpose (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Raw material invoice payment"
                        value={transferPurpose}
                        onChange={(e) => setTransferPurpose(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Authorize &amp; Transfer ₹{transferAmount ? Number(transferAmount).toLocaleString('en-IN') : '0'}</span>
                  </button>
                </form>
              )}

            </div>
          )}

          {/* TAB: UPI & SEND LINK */}
          {activeNav === 'upi-collect' && (
            <div className="space-y-6">
              <UpiPaymentHub
                userAccount={userAccount}
                onExecuteTransfer={onTransferSuccess}
              />
            </div>
          )}

          {/* TAB 3: FIXED DEPOSITS */}
          {activeNav === 'deposits' && (
            <div className="space-y-6">
              
              {newFdSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{newFdSuccessMsg}</span>
                </div>
              )}

              {/* Instant FD Booking Form */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
                  Book Instant Term Deposit from Savings Balance
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Lock in rates up to 8.75% p.a. Zero branch visit required.
                </p>

                <form onSubmit={handleBookFdInsideNetBanking} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Deposit Principal</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-500">₹</span>
                      <input
                        type="number"
                        min={10000}
                        max={userAccount.balance}
                        step={5000}
                        value={newFdPrincipal}
                        onChange={(e) => setNewFdPrincipal(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Tenure</label>
                    <select
                      value={newFdTenure}
                      onChange={(e) => setNewFdTenure(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    >
                      <option value={444}>444 Days Special (8.75% p.a.)</option>
                      <option value={365}>1 Year (8.25% p.a.)</option>
                      <option value={730}>2 Years (8.10% p.a.)</option>
                      <option value={1826}>5 Years Tax Saver (7.75% p.a.)</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Create Fixed Deposit
                    </button>
                  </div>
                </form>
              </div>

              {/* Active FD List */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <h3 className="font-heading font-bold text-base text-slate-900 mb-4">
                  Active Term Deposit Portfolio
                </h3>
                <div className="space-y-3">
                  {userAccount.activeFixedDeposits.map((fd) => (
                    <div key={fd.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-slate-900">{fd.fdNumber}</span>
                          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            {fd.interestRate}% p.a.
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 mt-1 block">
                          Booked on: {fd.bookingDate} · Matures on: {fd.maturityDate} ({fd.tenureMonths} Months)
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-500 block">Maturity Value</span>
                        <span className="font-heading font-extrabold text-lg text-emerald-800 font-mono tabular-nums">
                          ₹{fd.maturityAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 block font-mono">
                          Principal: ₹{fd.principal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: RUPAY CARD CONTROLS */}
          {activeNav === 'cards' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Card Graphical Rendering */}
              <div className="w-full aspect-[1.586/1] max-w-md mx-auto rounded-2xl p-6 text-white bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 shadow-xl border border-emerald-700/50 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-300 block">Rupanjali Bank</span>
                    <span className="font-heading font-bold text-base tracking-tight">Platinum Debit</span>
                  </div>
                  <span className="font-bold tracking-widest text-sm text-amber-300">RuPay</span>
                </div>

                {/* EMV Chip simulation */}
                <div className="w-11 h-8 rounded bg-gradient-to-r from-amber-200 to-amber-400 border border-amber-500/60 flex items-center justify-center">
                  <div className="w-8 h-5 border border-amber-700/40 rounded-xs" />
                </div>

                <div>
                  <div className="font-mono text-lg sm:text-xl tracking-wider mb-2 flex items-center justify-between">
                    <span>
                      {showCardDetails 
                        ? userAccount.virtualCard.cardNumber 
                        : `•••• •••• •••• ${userAccount.virtualCard.cardNumber.slice(-4)}`
                      }
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowCardDetails(!showCardDetails)}
                      className="text-emerald-300 hover:text-white cursor-pointer"
                      aria-label="Toggle card details"
                    >
                      {showCardDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex justify-between items-end text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Card Holder</span>
                      <span className="font-semibold text-white">{userAccount.virtualCard.cardHolder}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Valid Thru</span>
                      <span className="font-semibold">{userAccount.virtualCard.expiryDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">CVV</span>
                      <span className="font-semibold">{showCardDetails ? userAccount.virtualCard.cvv : '•••'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Controls Panel */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Security &amp; Usage Controls
                </h3>

                {/* Freeze Toggle */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <span className="text-sm font-medium text-slate-900 block">Instant Card Freeze</span>
                    <span className="text-xs text-slate-500">Temporarily lock your card for all transactions</span>
                  </div>
                  <button
                    onClick={() => onUpdateCardSettings({ isFrozen: !userAccount.virtualCard.isFrozen })}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      userAccount.virtualCard.isFrozen 
                        ? 'bg-rose-800 text-white' 
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {userAccount.virtualCard.isFrozen ? 'Card is Frozen (Click to Unfreeze)' : 'Freeze Card'}
                  </button>
                </div>

                {/* E-Commerce toggle */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <span className="text-sm font-medium text-slate-900 block">Online / E-Commerce Payments</span>
                    <span className="text-xs text-slate-500">Enable domestic merchant checkouts</span>
                  </div>
                  <button
                    onClick={() => onUpdateCardSettings({ onlinePaymentsEnabled: !userAccount.virtualCard.onlinePaymentsEnabled })}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      userAccount.virtualCard.onlinePaymentsEnabled ? 'bg-emerald-800' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      userAccount.virtualCard.onlinePaymentsEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* International toggle */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <span className="text-sm font-medium text-slate-900 block">International Usage</span>
                    <span className="text-xs text-slate-500">Cross-border transactions (Disabled by default as per RBI mandate)</span>
                  </div>
                  <button
                    onClick={() => onUpdateCardSettings({ internationalEnabled: !userAccount.virtualCard.internationalEnabled })}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      userAccount.virtualCard.internationalEnabled ? 'bg-emerald-800' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      userAccount.virtualCard.internationalEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Daily ATM Limit Slider */}
                <div className="py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-900">Daily ATM Withdrawal Limit</span>
                    <span className="font-mono text-xs font-bold text-slate-900">
                      ₹{userAccount.virtualCard.dailyLimit.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={100000}
                    step={5000}
                    value={userAccount.virtualCard.dailyLimit}
                    onChange={(e) => onUpdateCardSettings({ dailyLimit: Number(e.target.value) })}
                    className="w-full accent-emerald-800 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 5: STATEMENTS */}
          {activeNav === 'history' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    Account Passbook &amp; Statement
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Account: {userAccount.accountNumber} · Showing {transactions.length} transactions
                  </span>
                </div>
                <button
                  onClick={() => alert('Statement downloaded as encrypted PDF for FY 2026-27.')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Download PDF Statement
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-3">Date &amp; Time</th>
                      <th className="py-3 px-3">Transaction Description</th>
                      <th className="py-3 px-3">Channel / UTR</th>
                      <th className="py-3 px-3 text-right">Amount (₹)</th>
                      <th className="py-3 px-3 text-right">Balance (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">{tx.date}</td>
                        <td className="py-3 px-3 text-slate-900">
                          <span className="font-medium block">{tx.title}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{tx.recipientOrSender}</span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                          {tx.channel} · {tx.refNo}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold whitespace-nowrap">
                          <span className={tx.type === 'credit' ? 'text-emerald-700' : 'text-slate-900'}>
                            {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-slate-700 whitespace-nowrap">
                          ₹{tx.balanceAfter.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Never share OTP, CVV, or NetBanking password with anyone, including bank representatives.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close Session
          </button>
        </div>

      </div>
    </div>
  );
};
