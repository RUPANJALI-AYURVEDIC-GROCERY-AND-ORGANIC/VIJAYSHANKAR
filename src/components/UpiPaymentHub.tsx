import React, { useState, useMemo } from 'react';
import { 
  QrCode, Share2, Copy, Check, Send, Smartphone, MessageCircle, 
  Mail, ExternalLink, ArrowRight, Volume2, ShieldCheck, RefreshCw, Download
} from 'lucide-react';
import { UserAccount, Transaction } from '../types/bank';

interface UpiPaymentHubProps {
  userAccount: UserAccount;
  onExecuteTransfer?: (newTx: Transaction, updatedBalance: number) => void;
}

export const UpiPaymentHub: React.FC<UpiPaymentHubProps> = ({
  userAccount,
  onExecuteTransfer
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'create-link' | 'pay-upi' | 'soundbox'>('create-link');

  // Link Generation State
  const [payeeUpiId, setPayeeUpiId] = useState('9455112788@rupanjali');
  const [payeeName, setPayeeName] = useState('Rupanjali Small Finance Bank');
  const [requestAmount, setRequestAmount] = useState<number | ''>(500);
  const [transactionNote, setTransactionNote] = useState('Invoice Payment');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedUpiId, setCopiedUpiId] = useState(false);
  const [soundboxPlaying, setSoundboxPlaying] = useState(false);

  // Pay UPI State
  const [targetVpa, setTargetVpa] = useState('');
  const [sendAmount, setSendAmount] = useState<number | ''>('');
  const [payNote, setPayNote] = useState('');
  const [paySuccess, setPaySuccess] = useState<Transaction | null>(null);
  const [payError, setPayError] = useState<string | null>(null);

  // Computed UPI Deep Link (Standard NPCI UPI Intent specification)
  const upiIntentUri = useMemo(() => {
    const params = new URLSearchParams();
    params.set('pa', payeeUpiId);
    params.set('pn', payeeName);
    if (requestAmount) {
      params.set('am', requestAmount.toString());
    }
    params.set('cu', 'INR');
    if (transactionNote) {
      params.set('tn', transactionNote);
    }
    return `upi://pay?${params.toString()}`;
  }, [payeeUpiId, payeeName, requestAmount, transactionNote]);

  // Share text for social messaging platforms
  const shareMessage = useMemo(() => {
    const amtStr = requestAmount ? `₹${Number(requestAmount).toLocaleString('en-IN')}` : 'amount';
    return `Payment request of ${amtStr} from ${payeeName} (Rupanjali Small Finance Bank).
UPI ID: ${payeeUpiId}
Note: ${transactionNote || 'Direct UPI Transfer'}
Pay directly using Google Pay, PhonePe, Paytm, or BHIM via this link:
${upiIntentUri}`;
  }, [requestAmount, payeeName, payeeUpiId, transactionNote, upiIntentUri]);

  // Copy Handlers
  const handleCopyLink = () => {
    navigator.clipboard.writeText(upiIntentUri);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(payeeUpiId);
    setCopiedUpiId(true);
    setTimeout(() => setCopiedUpiId(false), 2000);
  };

  // Native Web Share API (All mobile platforms)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `UPI Payment Request from ${payeeName}`,
          text: shareMessage,
          url: upiIntentUri
        });
      } catch (err) {
        // User cancelled or browser fallback
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // Platform specific share URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(upiIntentUri)}&text=${encodeURIComponent(`Payment request of ₹${requestAmount || ''} via Rupanjali Bank UPI`)}`;
  const smsUrl = `sms:?body=${encodeURIComponent(shareMessage)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(`UPI Payment Request - ₹${requestAmount || ''} (${payeeName})`)}&body=${encodeURIComponent(shareMessage)}`;

  // Soundbox Audio Simulator
  const handlePlaySoundbox = () => {
    setSoundboxPlaying(true);
    if ('speechSynthesis' in window) {
      const amt = requestAmount || 500;
      const utterance = new SpeechSynthesisUtterance(`Rupanjali Bank par ${amt} rupaye prapt hue. Payment received successfully.`);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setSoundboxPlaying(false), 3000);
  };

  // Direct UPI Transfer execution
  const handleExecuteUpiPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPayError(null);

    const amt = Number(sendAmount);
    if (!amt || amt <= 0) {
      setPayError('Please enter a valid amount.');
      return;
    }
    if (amt > userAccount.balance) {
      setPayError(`Insufficient account balance (Available: ₹${userAccount.balance.toLocaleString('en-IN')}).`);
      return;
    }
    if (!targetVpa.trim() || !targetVpa.includes('@')) {
      setPayError('Please enter a valid UPI Virtual Payment Address (e.g. name@upi, mobile@paytm).');
      return;
    }

    const refNum = `RUPAUPI${Date.now().toString().slice(-8)}${Math.floor(100 + Math.random() * 900)}`;
    const newBal = Number((userAccount.balance - amt).toFixed(2));

    const newTx: Transaction = {
      id: `tx-upi-${Date.now()}`,
      refNo: refNum,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      title: `UPI Payment to ${targetVpa}`,
      recipientOrSender: targetVpa,
      category: 'transfer',
      type: 'debit',
      amount: amt,
      balanceAfter: newBal,
      channel: 'UPI',
      status: 'Completed'
    };

    if (onExecuteTransfer) {
      onExecuteTransfer(newTx, newBal);
    }
    setPaySuccess(newTx);
    setSendAmount('');
    setTargetVpa('');
    setPayNote('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Sub-Header Tabs */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Smartphone className="w-4 h-4" />
              <span>NPCI Certified UPI 2.0 Gateway</span>
            </div>
            <h3 className="font-heading font-bold text-2xl text-white">
              UPI Payments &amp; Shareable Payment Links
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Generate dynamic QR codes and broadcast payment links across WhatsApp, Telegram, SMS, and email with instant settlement.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">Default VPA:</span>
            <span className="text-emerald-400 font-bold">{payeeUpiId}</span>
            <button
              onClick={handleCopyUpiId}
              className="text-slate-400 hover:text-white p-0.5 cursor-pointer ml-1"
              title="Copy VPA"
            >
              {copiedUpiId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2">
          <button
            onClick={() => { setActiveSubTab('create-link'); setPaySuccess(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'create-link'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Create &amp; Share Payment Link
          </button>
          <button
            onClick={() => { setActiveSubTab('pay-upi'); setPaySuccess(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'pay-upi'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Direct UPI Pay (VPA)
          </button>
          <button
            onClick={() => setActiveSubTab('soundbox')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'soundbox'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Merchant Soundbox &amp; POS Demo
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 bg-slate-50">
        
        {/* SUBTAB 1: CREATE & SHARE PAYMENT LINK */}
        {activeSubTab === 'create-link' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-heading font-bold text-base text-slate-900 mb-1">
                Configure Payment Request Details
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Personalize the recipient VPA, invoice amount, and remarks. The generated link works across all 50+ UPI apps.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Recipient VPA / UPI ID
                </label>
                <input
                  type="text"
                  required
                  value={payeeUpiId}
                  onChange={(e) => setPayeeUpiId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  placeholder="e.g. 9455112788@rupanjali"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Payee Name / Merchant
                  </label>
                  <input
                    type="text"
                    required
                    value={payeeName}
                    onChange={(e) => setPayeeName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Request Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      min={1}
                      max={200000}
                      value={requestAmount}
                      onChange={(e) => setRequestAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono font-bold text-slate-900"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Amount Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[200, 500, 1000, 2500, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setRequestAmount(amt)}
                    className={`px-3 py-1 text-xs font-mono font-semibold rounded-md border cursor-pointer transition-colors ${
                      requestAmount === amt
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Payment Purpose / Note
                </label>
                <input
                  type="text"
                  value={transactionNote}
                  onChange={(e) => setTransactionNote(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  placeholder="e.g. Handloom Order #2026, Crop Payment"
                />
              </div>

              {/* Generated UPI Intent String Preview */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  NPCI UPI Intent URI:
                </span>
                <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 break-all select-all flex items-center justify-between gap-2">
                  <span className="truncate">{upiIntentUri}</span>
                  <button
                    onClick={handleCopyLink}
                    className="text-emerald-800 hover:text-emerald-950 shrink-0 font-bold p-1 cursor-pointer"
                    title="Copy URI"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Live QR Code & Multi-Platform Sharing Actions */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center justify-between space-y-6">
              
              {/* Dynamic QR Code Card with Rupanjali Emblem */}
              <div className="w-full text-center">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-3">
                  Scan &amp; Pay via Any UPI App
                </span>

                <div className="relative inline-block p-4 bg-white rounded-2xl border-2 border-slate-900 shadow-sm mx-auto">
                  {/* Clean SVG QR Code Representation */}
                  <svg
                    className="w-44 h-44 sm:w-48 sm:h-48"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background */}
                    <rect width="100" height="100" fill="white" />
                    
                    {/* Corner 1 (Top-Left) */}
                    <rect x="6" y="6" width="26" height="26" fill="#0f172a" />
                    <rect x="10" y="10" width="18" height="18" fill="white" />
                    <rect x="14" y="14" width="10" height="10" fill="#047857" />

                    {/* Corner 2 (Top-Right) */}
                    <rect x="68" y="6" width="26" height="26" fill="#0f172a" />
                    <rect x="72" y="10" width="18" height="18" fill="white" />
                    <rect x="76" y="14" width="10" height="10" fill="#047857" />

                    {/* Corner 3 (Bottom-Left) */}
                    <rect x="6" y="68" width="26" height="26" fill="#0f172a" />
                    <rect x="10" y="72" width="18" height="18" fill="white" />
                    <rect x="14" y="76" width="10" height="10" fill="#047857" />

                    {/* Dynamic Data Blocks */}
                    <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
                    <rect x="46" y="8" width="6" height="6" fill="#0f172a" />
                    <rect x="56" y="8" width="6" height="6" fill="#0f172a" />

                    <rect x="36" y="18" width="6" height="6" fill="#0f172a" />
                    <rect x="48" y="18" width="12" height="6" fill="#0f172a" />

                    <rect x="8" y="38" width="6" height="6" fill="#0f172a" />
                    <rect x="18" y="38" width="6" height="6" fill="#0f172a" />
                    <rect x="28" y="38" width="6" height="6" fill="#0f172a" />
                    <rect x="38" y="38" width="6" height="6" fill="#0f172a" />
                    <rect x="48" y="38" width="8" height="8" fill="#047857" />
                    <rect x="68" y="38" width="6" height="6" fill="#0f172a" />
                    <rect x="78" y="38" width="14" height="6" fill="#0f172a" />

                    <rect x="8" y="48" width="12" height="6" fill="#0f172a" />
                    <rect x="26" y="48" width="6" height="6" fill="#0f172a" />
                    <rect x="68" y="48" width="8" height="6" fill="#0f172a" />
                    <rect x="82" y="48" width="10" height="6" fill="#0f172a" />

                    <rect x="8" y="58" width="6" height="6" fill="#0f172a" />
                    <rect x="20" y="58" width="8" height="6" fill="#0f172a" />
                    <rect x="36" y="58" width="16" height="6" fill="#0f172a" />
                    <rect x="58" y="58" width="6" height="6" fill="#0f172a" />
                    <rect x="72" y="58" width="8" height="6" fill="#0f172a" />
                    <rect x="86" y="58" width="6" height="6" fill="#0f172a" />

                    <rect x="38" y="68" width="8" height="6" fill="#0f172a" />
                    <rect x="52" y="68" width="6" height="6" fill="#0f172a" />
                    <rect x="66" y="68" width="14" height="6" fill="#0f172a" />
                    <rect x="86" y="68" width="6" height="6" fill="#0f172a" />

                    <rect x="38" y="78" width="12" height="6" fill="#0f172a" />
                    <rect x="56" y="78" width="6" height="6" fill="#0f172a" />
                    <rect x="68" y="78" width="8" height="6" fill="#0f172a" />
                    <rect x="82" y="78" width="10" height="6" fill="#0f172a" />

                    <rect x="38" y="88" width="6" height="6" fill="#0f172a" />
                    <rect x="48" y="88" width="10" height="6" fill="#0f172a" />
                    <rect x="64" y="88" width="6" height="6" fill="#0f172a" />
                    <rect x="76" y="88" width="16" height="6" fill="#0f172a" />

                    {/* Central Brand Emblem */}
                    <circle cx="50" cy="50" r="10" fill="#064e3b" stroke="white" strokeWidth="2" />
                    <text x="50" y="54" fontSize="10" fontWeight="bold" fill="#f59e0b" textAnchor="middle">R</text>
                  </svg>
                </div>

                <div className="mt-3">
                  <span className="font-heading font-extrabold text-2xl text-slate-900 font-mono tabular-nums block">
                    ₹{requestAmount ? Number(requestAmount).toLocaleString('en-IN') : '0.00'}
                  </span>
                  <span className="text-xs text-slate-500 font-mono block mt-0.5">
                    {payeeUpiId}
                  </span>
                </div>
              </div>

              {/* Multi-Platform Share Links */}
              <div className="w-full space-y-2.5">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block text-center">
                  Share Payment Request On All Platforms
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Telegram */}
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </a>

                  {/* SMS */}
                  <a
                    href={smsUrl}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Direct SMS</span>
                  </a>

                  {/* Email */}
                  <a
                    href={emailUrl}
                    className="p-2.5 rounded-lg bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Invoice</span>
                  </a>
                </div>

                {/* Primary Multi-Share & Copy Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleNativeShare}
                    className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Share2 className="w-4 h-4 text-amber-300" />
                    <span>Share via Apps</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Payment Link'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SUBTAB 2: DIRECT UPI PAY (VPA SIMULATOR) */}
        {activeSubTab === 'pay-upi' && (
          <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
            {paySuccess ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                    UPI Payment Successful
                  </span>
                  <h4 className="font-heading font-bold text-2xl text-slate-900 mt-1">
                    ₹{paySuccess.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Paid to <strong className="text-slate-900">{paySuccess.recipientOrSender}</strong>
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">NPCI Ref / UTR:</span>
                    <span className="font-bold text-slate-900">{paySuccess.refNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timestamp:</span>
                    <span className="text-slate-900">{paySuccess.date}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Updated Balance:</span>
                    <span className="font-bold text-emerald-800">
                      ₹{paySuccess.balanceAfter.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setPaySuccess(null)}
                    className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                  >
                    Make Another UPI Payment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleExecuteUpiPayment} className="space-y-4">
                <div>
                  <h4 className="font-heading font-bold text-lg text-slate-900">
                    Instant UPI Pay via Virtual Payment Address
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Zero transaction fee, immediate 24x7 debit from your Rupanjali Savings Account.
                  </p>
                </div>

                {payError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
                    {payError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Target UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. merchant@upi, 9876543210@paytm, store@okhdfcbank"
                    value={targetVpa}
                    onChange={(e) => setTargetVpa(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Amount to Transfer (₹)
                    </label>
                    <span className="text-xs text-slate-500 font-mono">
                      Avail: ₹{userAccount.balance.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={userAccount.balance}
                    required
                    placeholder="Enter amount"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono font-bold text-slate-900 text-base"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Payment Note / Remarks (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grocery purchase, Medicine bill"
                    value={payNote}
                    onChange={(e) => setPayNote(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Authorize &amp; Pay via UPI ₹{sendAmount ? Number(sendAmount).toLocaleString('en-IN') : '0'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* SUBTAB 3: SOUNDBOX & MERCHANT POS */}
        {activeSubTab === 'soundbox' && (
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                  Retail Merchant Solution
                </span>
                <h4 className="font-heading font-bold text-xl text-slate-900">
                  Rupanjali Dhwani Smart Soundbox Demo
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Instant dual-language voice confirmation for shopkeepers, vegetable vendors, and local enterprises upon receiving payments.
                </p>
              </div>

              <button
                onClick={handlePlaySoundbox}
                disabled={soundboxPlaying}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>{soundboxPlaying ? 'Playing Alert...' : 'Simulate Voice Alert'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-700 flex items-center justify-center text-amber-300 shrink-0 font-bold">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-amber-400 font-mono uppercase block">Audio Voice Prompt</span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">
                  "Rupanjali Bank par ₹{requestAmount || 500} prapt hue. Payment of ₹{requestAmount || 500} received successfully."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 font-mono">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">MDR Charges</span>
                <span className="font-bold text-emerald-800 text-sm">0% Free for UPI</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Settlement Cycle</span>
                <span className="font-bold text-slate-900 text-sm">Instant T+0 Credit</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Languages</span>
                <span className="font-bold text-slate-900 text-sm">Hindi, English &amp; Regional</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
