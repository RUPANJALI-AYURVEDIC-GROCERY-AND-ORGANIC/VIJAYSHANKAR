import React from 'react';
import { TESTIMONIALS } from '../data/bankData';
import { Quote, ArrowRight, ShieldCheck } from 'lucide-react';

export const SocialImpact: React.FC = () => {
  return (
    <section className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            Social Impact &amp; Inclusion Track Record
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Real Impact Across Bharat's Grassroot Economies
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Measurable transformation powered by priority sector lending, doorstep financial literacy, and fair institutional trust.
          </p>
        </div>

        {/* Quantified Rigor Grid (Proof adjacent to claims) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-800 font-mono tabular-nums block">
              ₹16,400+ Cr
            </span>
            <span className="text-xs font-semibold text-slate-900 block mt-1">Priority Credit Disbursed</span>
            <span className="text-xs text-slate-500 block mt-0.5">Focusing on MSME, agriculture &amp; education</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 font-mono tabular-nums block">
              74%
            </span>
            <span className="text-xs font-semibold text-slate-900 block mt-1">Women Micro-Entrepreneurs</span>
            <span className="text-xs text-slate-500 block mt-0.5">Financed through self-help joint liability groups</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-800 font-mono tabular-nums block">
              4.8 Million+
            </span>
            <span className="text-xs font-semibold text-slate-900 block mt-1">Households Empowered</span>
            <span className="text-xs text-slate-500 block mt-0.5">Across unbanked and semi-urban panchayats</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 font-mono tabular-nums block">
              99.2%
            </span>
            <span className="text-xs font-semibold text-slate-900 block mt-1">Digital Uptime</span>
            <span className="text-xs text-slate-500 block mt-0.5">UPI and IMPS switch transaction reliability</span>
          </div>
        </div>

        {/* Attributable Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div 
              key={item.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-emerald-800/20 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="font-heading font-bold text-sm text-slate-900 block">
                  {item.name}
                </span>
                <span className="text-xs text-slate-600 block">
                  {item.role} · {item.enterprise}
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  {item.location}
                </span>

                <div className="mt-3 p-2 bg-slate-50 rounded border border-slate-100 text-[11px] text-emerald-900 font-medium font-mono">
                  ★ {item.outcomeMetric}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
