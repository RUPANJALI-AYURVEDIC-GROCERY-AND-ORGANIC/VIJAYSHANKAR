import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Home, Calendar, Clock, Phone } from 'lucide-react';

interface DoorstepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoorstepModal: React.FC<DoorstepModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [serviceType, setServiceType] = useState('Cash Delivery at Residence');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [date, setDate] = useState('2026-10-28');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `DSB-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doorstep-title"
      >
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald-700 text-amber-300 flex items-center justify-center font-bold text-xs">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <span id="doorstep-title" className="font-heading font-bold text-base text-white">
                Doorstep Banking Service
              </span>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                Compliant with RBI Circular for Senior Citizens (60+) &amp; PwD
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

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                  Request Confirmed
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-900 mt-1">
                  Banking Representative Assigned
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Our certified doorstep banking associate will visit your registered address.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service Request ID:</span>
                  <span className="font-bold text-slate-900">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Requested Service:</span>
                  <span className="text-slate-900">{serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date &amp; Slot:</span>
                  <span className="text-slate-900">{date} · {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patron Contact:</span>
                  <span className="text-slate-900">{phone}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                >
                  Close Confirmation
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  Select Doorstep Banking Service
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                >
                  <option value="Cash Delivery at Residence">Cash Delivery at Residence (Up to ₹20,000)</option>
                  <option value="Cash Pickup for Deposit">Cash Pickup for Account Deposit</option>
                  <option value="Cheque / Draft Collection">Cheque &amp; Instrument Collection</option>
                  <option value="Digital Life Certificate (Jeevan Pramaan)">Digital Life Certificate (Pensioners)</option>
                  <option value="Form 15G / 15H Submission">Form 15G / 15H Tax Exemption Submission</option>
                  <option value="Deliver Account Statement &amp; Term Deposit Receipt">Physical Statement / FD Certificate Delivery</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Account holder name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Mobile Number</label>
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
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Bank Account Number (Optional if new customer)</label>
                <input
                  type="text"
                  placeholder="e.g. 401928374612"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-700 block mb-1">Complete Delivery Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No, Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit PIN"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Preferred Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Schedule Doorstep Banking Agent
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
