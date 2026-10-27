import React from 'react';
import { ShieldCheck, ArrowRight, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenAccount: () => void;
  onExploreRates: () => void;
  onOpenCalculators: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAccount,
  onExploreRates,
  onOpenCalculators
}) => {
  return (
    <section id="top" className="relative pt-8 pb-12 md:pt-14 md:pb-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Proposition & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Trust Kicker: unboxed text, no pills */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-4 tracking-wide uppercase">
              <span>RBI Scheduled Commercial Bank</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>DICGC Insured up to ₹5,00,000</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.15] mb-5 text-balance">
              Banking Built for Every Aspiration &amp; Enterprise.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Grow your wealth with high-yield fixed deposits up to <strong className="font-semibold text-slate-900">8.75% p.a.</strong> (9.25% for Senior Citizens) and scale your venture with fast, collateral-light MSME &amp; micro-credit.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero balance digital savings account</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Free RuPay Platinum contactless card</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Doorstep banking for senior citizens</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>48-hr in-principle MSME loan approval</span>
              </div>
            </div>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAccount}
                className="px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg shadow-sm transition-all duration-150 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 whitespace-nowrap"
              >
                <span>Open Instant Digital Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreRates}
                className="px-5 py-3 text-sm font-semibold text-slate-700 hover:text-emerald-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 whitespace-nowrap"
              >
                View 2026 Deposit Rates
              </button>
            </div>

            {/* Digital KYC note */}
            <p className="text-xs text-slate-500 mt-4">
              Instant activation via Aadhaar OTP &amp; Video KYC · 100% paperless onboarding
            </p>
          </div>

          {/* Right Column: Editorial Hero Visual Anchor */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="w-full h-full min-h-[360px] lg:min-h-[460px] rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 bg-slate-100">
              <img
                src="/src/assets/images/hero_bank_family_1793106310640.jpg"
                alt="Smiling Indian entrepreneurs and family supported by Rupanjali Small Finance Bank"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Subtle contrast scrim at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent p-6 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium text-emerald-300 tracking-wide block uppercase">
                      Featured Deposit
                    </span>
                    <span className="font-heading font-bold text-xl sm:text-2xl text-white">
                      Rupanjali Samriddhi 444D
                    </span>
                    <p className="text-xs text-slate-200 mt-0.5">
                      8.75% p.a. for General · 9.25% p.a. for Senior Citizens
                    </p>
                  </div>
                  <button
                    onClick={onOpenCalculators}
                    className="px-3 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    Calculate Return
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <span className="block font-heading font-extrabold text-2xl lg:text-3xl text-emerald-800 font-mono tabular-nums">
              8.75%
            </span>
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
              Fixed Deposit Rate
            </span>
            <span className="block text-xs text-slate-600 mt-0.5">
              Up to 9.25% for Senior Citizens
            </span>
          </div>

          <div>
            <span className="block font-heading font-extrabold text-2xl lg:text-3xl text-slate-900 font-mono tabular-nums">
              7.75%
            </span>
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
              Savings Interest Slabs
            </span>
            <span className="block text-xs text-slate-600 mt-0.5">
              Calculated on daily balances
            </span>
          </div>

          <div>
            <span className="block font-heading font-extrabold text-2xl lg:text-3xl text-emerald-800 font-mono tabular-nums">
              48 Hours
            </span>
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
              MSME Loan Sanction
            </span>
            <span className="block text-xs text-slate-600 mt-0.5">
              Fast-track digital appraisal
            </span>
          </div>

          <div>
            <span className="block font-heading font-extrabold text-2xl lg:text-3xl text-slate-900 font-mono tabular-nums">
              910+
            </span>
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
              Banking Outlets
            </span>
            <span className="block text-xs text-slate-600 mt-0.5">
              Across 18 states &amp; UTs
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
