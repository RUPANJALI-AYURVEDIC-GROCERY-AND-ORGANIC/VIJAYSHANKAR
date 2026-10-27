import React, { useState } from 'react';
import { DEPOSIT_RATES, SAVINGS_SLABS, LOAN_PRODUCTS } from '../data/bankData';
import { ArrowRight, Download, Info, ShieldCheck } from 'lucide-react';

interface RatesBoardProps {
  onOpenAccount: () => void;
  onOpenCalculator: () => void;
}

export const RatesBoard: React.FC<RatesBoardProps> = ({
  onOpenAccount,
  onOpenCalculator
}) => {
  const [activeTab, setActiveTab] = useState<'fd' | 'savings' | 'loans'>('fd');

  return (
    <section id="deposits" className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
              Official Rate Card · Effective 2026
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
              Interest Rates &amp; Tariffs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Competitive returns benchmarked to empower household savings and enterprise capital reserves.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCalculator}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              Test Returns in Calculator
            </button>
            <button
              onClick={onOpenAccount}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
            >
              Open Deposit Online
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('fd')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'fd'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Fixed Deposit (FD) Slabs
          </button>
          <button
            onClick={() => setActiveTab('savings')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'savings'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Savings Account Interest Slabs
          </button>
          <button
            onClick={() => setActiveTab('loans')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'loans'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Lending Products &amp; Base Rates
          </button>
        </div>

        {/* Tab Content: FIXED DEPOSITS */}
        {activeTab === 'fd' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Tenure Bucket</th>
                    <th className="py-3.5 px-4 text-right">General Public (% p.a.)</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Senior Citizens (% p.a.)</th>
                    <th className="py-3.5 px-4 text-center">Feature / Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {DEPOSIT_RATES.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`transition-colors ${
                        item.isSpecial 
                          ? 'bg-amber-50/70 font-medium' 
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4 sm:px-6 text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{item.tenure}</span>
                          {item.isSpecial && (
                            <span className="text-[11px] font-semibold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                              Flagship
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">
                        {item.regularRate.toFixed(2)}%
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-mono tabular-nums font-bold text-emerald-800">
                        {item.seniorRate.toFixed(2)}%
                      </td>
                      <td className="py-3.5 px-4 text-center text-xs text-slate-500">
                        {item.highlightText || 'Quarterly Compounded'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Regulatory disclaimer notes */}
            <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-200 text-xs text-slate-500 space-y-1.5">
              <p>• Interest rates are applicable for domestic term deposits below ₹3 Crores. Rates are subject to revision as per ALCO guidelines.</p>
              <p>• Senior Citizen preferential rates (+0.50% p.a.) are applicable for Indian residents aged 60 years and above.</p>
              <p>• Deposits with Rupanjali Small Finance Bank are insured up to ₹5,00,000 per depositor by the Deposit Insurance and Credit Guarantee Corporation (DICGC).</p>
            </div>
          </div>
        )}

        {/* Tab Content: SAVINGS SLABS */}
        {activeTab === 'savings' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-heading font-semibold text-lg text-slate-900">
                Tiered Daily End-of-Day Savings Yield
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Interest is computed on daily closing ledger balances and credited directly to accounts quarterly on the 1st of January, April, July, and October.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Balance Slab</th>
                    <th className="py-3.5 px-4 text-right">Applicable Interest Rate (% p.a.)</th>
                    <th className="py-3.5 px-4 sm:px-6">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {SAVINGS_SLABS.map((slab, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900">
                        {slab.balanceRange}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-emerald-800 text-base">
                        {slab.rate.toFixed(2)}%
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-600">
                        {slab.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero balance basic savings bank deposit account (BSBDA) available across all branches.</span>
              </div>
              <button
                onClick={onOpenAccount}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                Open Savings Account
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: LENDING RATES */}
        {activeTab === 'loans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOAN_PRODUCTS.map((loan) => (
              <div key={loan.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                    {loan.eligibleAudience.split(',')[0]}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                    {loan.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {loan.tagline}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-lg space-y-2 text-xs font-mono mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Interest Rate:</span>
                      <span className="font-bold text-slate-900">{loan.interestRateMin}% - {loan.interestRateMax}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Loan Range:</span>
                      <span className="text-slate-800">₹{(loan.minAmount / 1000).toFixed(0)}k - ₹{(loan.maxAmount / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Processing Fee:</span>
                      <span className="text-slate-800">{loan.processingFee}</span>
                    </div>
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1.5 mb-6">
                    {loan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold shrink-0">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenCalculator}
                  className="w-full py-2 text-xs font-semibold text-emerald-800 hover:text-white bg-emerald-50 hover:bg-emerald-800 border border-emerald-200 hover:border-emerald-800 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Calculate EMI for this Loan
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
