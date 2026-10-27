import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoanInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  initialAmount?: number;
  initialTenure?: string;
}

export const LoanInquiryModal: React.FC<LoanInquiryModalProps> = ({
  isOpen,
  onClose,
  productName,
  initialAmount = 500000,
  initialTenure = '36 Months'
}) => {
  if (!isOpen) return null;

  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [businessType, setBusinessType] = useState('Retail Trader / Shopkeeper');
  const [submitted, setSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `RUPA-LN-${Math.floor(100000 + Math.random() * 900000)}`;
    setLeadRef(ref);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loan-inquiry-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <span id="loan-inquiry-title" className="font-heading font-bold text-base text-white">
              Express Loan Application
            </span>
            <span className="text-[11px] text-emerald-400 block -mt-0.5">
              48-Hour In-Principle Sanction Available
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                  Application Logged Successfully
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-900 mt-1">
                  Reference: {leadRef}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  A Rupanjali Bank Relationship Manager from your city branch will contact you within 2 working hours.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Product:</span>
                  <span className="font-bold text-slate-900">{productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Requested Amount:</span>
                  <span className="text-slate-900">₹{initialAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tenure:</span>
                  <span className="text-slate-900">{initialTenure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="text-slate-900">{applicantName} ({phone})</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                >
                  Return to Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-lg text-xs text-emerald-900">
                <span className="font-bold block">{productName}</span>
                <span className="text-slate-600">
                  Requested Principal: ₹{initialAmount.toLocaleString('en-IN')} · Tenure: {initialTenure}
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Applicant Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra Verma"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Mobile Contact Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">City / Town</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varanasi, Lucknow"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Business / Occupation Sector</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                >
                  <option value="Retail Trader / Shopkeeper">Retail Trader / Grocery / Shopkeeper</option>
                  <option value="Handloom / Handicraft Artisan">Handloom / Handicraft Artisan</option>
                  <option value="Agricultural Farmer / Dairy">Agricultural Farmer / Dairy Owner</option>
                  <option value="Manufacturing / Light Fabrication">Manufacturing / Light Fabrication</option>
                  <option value="Self-Employed Professional">Self-Employed Professional / Salaried</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Submit Loan Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
