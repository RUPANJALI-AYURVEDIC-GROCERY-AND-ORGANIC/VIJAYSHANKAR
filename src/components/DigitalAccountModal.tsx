import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Smartphone, FileText, UserCheck, Sparkles, ClipboardList } from 'lucide-react';
import { DocumentChecklist } from './DocumentChecklist';

interface DigitalAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountCreated: (newAccountData: any) => void;
}

export const DigitalAccountModal: React.FC<DigitalAccountModalProps> = ({
  isOpen,
  onClose,
  onAccountCreated
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);

  // Form State
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [address, setAddress] = useState('');

  const [accountType, setAccountType] = useState<'Savings' | 'Current'>('Savings');
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState('Spouse');

  // Generated Result
  const [createdAccount, setCreatedAccount] = useState<{
    accountNumber: string;
    customerId: string;
    ifsc: string;
    name: string;
  } | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  // Handlers
  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setFormError(null);
    setOtpSent(true);
    setOtp('884210'); // Auto mock fill for seamless testing
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      handleSendOtp();
      return;
    }
    if (otp.length < 4) {
      setFormError('Please enter the verification OTP.');
      return;
    }
    setFormError(null);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.replace(/\s/g, '').length !== 12) {
      setFormError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    if (pan.length !== 10) {
      setFormError('Please enter a valid 10-character PAN number (e.g. ABCDE1234F).');
      return;
    }
    setFormError(null);
    setStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accNum = `4019${Math.floor(10000000 + Math.random() * 90000000)}`;
    const custId = `CUST-${Math.floor(100000 + Math.random() * 900000)}`;
    const newAcc = {
      accountNumber: accNum,
      customerId: custId,
      ifsc: 'RUPA0001001',
      name: fullName || 'Valued Account Holder',
    };

    setCreatedAccount(newAcc);
    onAccountCreated(newAcc);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="instant-account-title"
      >
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald-700 text-amber-300 flex items-center justify-center font-bold text-xs">
              R
            </div>
            <div>
              <span id="instant-account-title" className="font-heading font-bold text-base text-white">
                Open Instant Digital Account
              </span>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                Paperless Video KYC · Zero Balance Available
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator (Clean unboxed style) */}
        {step < 4 && (
          <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium overflow-x-auto">
            <button
              type="button"
              onClick={() => setStep(0)}
              className={`hover:text-emerald-900 transition-colors cursor-pointer whitespace-nowrap ${step === 0 ? 'text-emerald-900 font-bold' : ''}`}
            >
              0. Checklist
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={() => { if (step > 1) setStep(1); }}
              className={`hover:text-emerald-900 transition-colors cursor-pointer whitespace-nowrap ${step === 1 ? 'text-emerald-900 font-bold' : ''}`}
            >
              1. Mobile Verification
            </button>
            <span className="text-slate-300">·</span>
            <span className={`whitespace-nowrap ${step === 2 ? 'text-emerald-900 font-bold' : ''}`}>2. Aadhaar &amp; PAN</span>
            <span className="text-slate-300">·</span>
            <span className={`whitespace-nowrap ${step === 3 ? 'text-emerald-900 font-bold' : ''}`}>3. Account Setup</span>
          </div>
        )}

        <div className="p-6">
          {formError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
              {formError}
            </div>
          )}

          {/* STEP 0: DOCUMENT CHECKLIST PREPARATION */}
          {step === 0 && (
            <DocumentChecklist onReadyToProceed={() => setStep(1)} />
          )}

          {/* STEP 1: MOBILE & OTP */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="flex items-center justify-between bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 text-xs text-emerald-900 mb-2">
                <span>Have physical PAN and Aadhaar in hand?</span>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                >
                  Review Checklist
                </button>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Full Name (as per Aadhaar / PAN)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vijay Shankar Tiwari"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Mobile Number (Linked with Aadhaar)
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-slate-100 border border-slate-300 rounded-lg text-sm font-mono text-slate-600">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Get OTP
                    </button>
                  )}
                </div>
              </div>

              {otpSent && (
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Enter 6-Digit OTP
                    </label>
                    <span className="text-xs text-emerald-700 font-mono">Demo OTP Auto-Filled</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono tracking-widest text-center font-bold text-lg"
                  />
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="w-1/3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Checklist
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{otpSent ? 'Verify OTP & Continue' : 'Send Verification OTP'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: AADHAAR & PAN */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  12-Digit Aadhaar Number
                </label>
                <input
                  type="text"
                  maxLength={14}
                  required
                  placeholder="xxxx xxxx xxxx"
                  value={aadhaar}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
                    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setAadhaar(formatted);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono text-base tracking-wider"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Encrypted e-KYC query routed directly to UIDAI statutory portal.
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  PAN Number (10 Characters)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  required
                  placeholder="ABCDE1234F"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono text-base uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Residential Communication Address
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House number, Street, City, State, PIN"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Verify Identity &amp; Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ACCOUNT VARIANT & NOMINEE */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
                  Select Account Variant
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setAccountType('Savings')}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      accountType === 'Savings'
                        ? 'border-emerald-700 bg-emerald-50 text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="font-semibold text-xs block">Rupanjali Samriddhi</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">High-Yield Savings (Up to 7.75%)</span>
                    <span className="text-[10px] text-emerald-800 font-medium block mt-1">Zero Balance · Free RuPay Card</span>
                  </div>

                  <div
                    onClick={() => setAccountType('Current')}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      accountType === 'Current'
                        ? 'border-emerald-700 bg-emerald-50 text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className="font-semibold text-xs block">Rupanjali Vyapar</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">MSME Current Account</span>
                    <span className="text-[10px] text-emerald-800 font-medium block mt-1">Free Unlimited Digital NEFT/RTGS</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Nominee Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunita Devi Tiwari"
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Nominee Relationship
                </label>
                <select
                  value={nomineeRelation}
                  onChange={(e) => setNomineeRelation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Sibling">Sibling</option>
                </select>
              </div>

              <div className="pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-600 mb-4">
                  <input type="checkbox" required defaultChecked id="kyc-consent" className="mt-0.5" />
                  <label htmlFor="kyc-consent">
                    I confirm that I am a tax resident of India and agree to the Bank's Terms of Service and RBI KYC guidelines.
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Account Activation</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS GENERATED CREDENTIALS */}
          {step === 4 && createdAccount && (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                  Account Active &amp; Operational
                </span>
                <h3 className="font-heading font-bold text-2xl text-slate-900 mt-1">
                  Welcome to Rupanjali Bank!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Your digital savings account is activated and ready to receive deposits &amp; UPI payments.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Holder:</span>
                  <span className="font-bold text-slate-900">{createdAccount.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Number:</span>
                  <span className="font-bold text-emerald-800 text-sm">{createdAccount.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer ID:</span>
                  <span className="text-slate-900">{createdAccount.customerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="text-slate-900">{createdAccount.ifsc}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Virtual RuPay Debit Card:</span>
                  <span className="text-emerald-700 font-semibold">Active &amp; Ready in NetBanking</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Done / Proceed to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
