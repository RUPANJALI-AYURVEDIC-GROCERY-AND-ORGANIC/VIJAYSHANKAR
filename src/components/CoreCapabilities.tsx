import React from 'react';
import { ArrowUpRight, ShieldCheck, Check } from 'lucide-react';

interface CoreCapabilitiesProps {
  onSelectProduct: (productName: string) => void;
  onOpenAccount: () => void;
}

export const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({
  onSelectProduct,
  onOpenAccount
}) => {
  return (
    <section id="loans" className="py-14 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            Pillars of Financial Inclusion
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Tailored Credit &amp; Wealth Solutions for India's Growth Engines
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Built for neighborhood merchants, women artisans, agricultural traders, and conscious savers seeking superior returns with maximum regulatory safety.
          </p>
        </div>

        {/* Asymmetric Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Micro-Enterprise & Women Empowerment (Featured Col Span 7) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group">
            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                01. Mahila Samarth &amp; Artisan Credit
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                Empowering Women Micro-Entrepreneurs Across Rural &amp; Semi-Urban Belts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Tailored collateral-light financing for self-help groups, textile weavers, and micro-enterprises with flexible doorstep collection, financial literacy support, and zero processing fee up to ₹50,000.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Doorstep cash deposit &amp; collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Complimentary life insurance cover</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Transparent 11.25% fixed interest</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>No penal charges for early closure</span>
                </div>
              </div>

              <button
                onClick={() => onSelectProduct('Mahila Samarth Micro-Credit')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1"
              >
                <span>Learn about Mahila Credit Scheme</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-64 sm:h-72 w-full overflow-hidden bg-slate-200 border-t border-slate-200">
              <img
                src="/src/assets/images/micro_entrepreneur_craft_1793106311687.jpg"
                alt="Empowered Indian female micro-artisan weaving authentic textiles"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 2: RuPay Platinum & High-Yield Savings (Col Span 5) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group">
            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                02. Digital Banking &amp; Deposits
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3">
                RuPay Platinum Contactless &amp; Up to 7.75% Savings Interest
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Experience high-yield daily balance compounding, zero annual maintenance fee for active accounts, and airport lounge access with the RuPay Platinum card.
              </p>

              <div className="space-y-2 text-xs text-slate-300 mb-6 font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Savings Slab: &gt; ₹5L - ₹25L</span>
                  <span className="text-amber-400 font-bold">7.25% p.a.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Savings Slab: &gt; ₹25L - ₹5Cr</span>
                  <span className="text-amber-400 font-bold">7.75% p.a.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Card Daily ATM Limit</span>
                  <span className="text-white">₹75,000 / Day</span>
                </div>
              </div>

              <button
                onClick={onOpenAccount}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer py-1"
              >
                <span>Apply for Digital Savings Account</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-56 w-full overflow-hidden bg-slate-950 border-t border-slate-800">
              <img
                src="/src/assets/images/digital_banking_card_1793106311988.jpg"
                alt="Rupanjali Bank RuPay Platinum Contactless Debit Card"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 3: Agri Prosperity & Kisan Credit (Col Span 6) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group">
            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                03. Kisan &amp; Agro Logistics Credit
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-2">
                Empowering Wholesale Mandis, Dairy &amp; Allied Farms
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Structured bullet repayment aligning with post-harvest cash inflows, subsidized rates starting at 7.50%, and credit lines for cold storage and solar irrigation.
              </p>
              <button
                onClick={() => onSelectProduct('Kisan Samriddhi Agri Credit')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer py-1"
              >
                <span>Explore Agri Credit Lines</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="h-52 w-full overflow-hidden bg-slate-200 border-t border-slate-200">
              <img
                src="/src/assets/images/agri_trader_market_1793106312188.jpg"
                alt="Farmers and mandi traders reviewing digital payment statements"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 4: MSME Pragati & Working Capital (Col Span 6) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                04. MSME Pragati Business Credit
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                Fast Working Capital for Retailers, Wholesalers &amp; Workshops
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                From stocking inventory for festival seasons to purchasing machinery, get sanctions up to ₹50 Lakhs with minimum paperwork and speedy digital processing.
              </p>

              <div className="space-y-3 text-xs text-slate-700 mb-6">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="font-semibold text-slate-900 block">Digital Application in 5 Minutes</strong>
                    <span>Upload 6 months bank statement and GST returns.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="font-semibold text-slate-900 block">48-Hour In-Principle Sanction</strong>
                    <span>Dedicated Relationship Manager visits your establishment.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="font-semibold text-slate-900 block">Direct Credit to Current Account</strong>
                    <span>Overdraft or drop-line term facility activated instantly.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => onSelectProduct('MSME Pragati Business Loan')}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-center"
              >
                Apply for MSME Working Capital
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
