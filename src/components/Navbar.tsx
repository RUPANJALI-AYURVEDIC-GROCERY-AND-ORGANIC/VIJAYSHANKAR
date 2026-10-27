import React, { useState } from 'react';
import { Landmark, ShieldCheck, Lock, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenNetBanking: () => void;
  onOpenAccountModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNetBanking,
  onOpenAccountModal,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro regulatory notice bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>RBI Scheduled Commercial Bank</span>
            <span className="text-slate-500">·</span>
            <span>DICGC Insured up to ₹5,00,000 per depositor</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <a href="tel:9455112788" className="hover:text-emerald-400 font-mono text-slate-300">
              Tel: +91 9455112788
            </a>
            <span className="text-slate-600">·</span>
            <a href="mailto:rupanjali690@gmail.com" className="hover:text-emerald-400 text-slate-300">
              rupanjali690@gmail.com
            </a>
            <span className="text-slate-600">·</span>
            <button 
              onClick={onOpenAccountModal} 
              className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              Instant Video KYC
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Top Navigation Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }}
          className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-heading font-bold text-xl shadow-xs group-hover:bg-emerald-900 transition-colors">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-slate-900 block whitespace-nowrap">
              Rupanjali
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-800 block -mt-1 whitespace-nowrap">
              Small Finance Bank
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button 
            onClick={() => handleNavClick('deposits')} 
            className="hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Deposits
          </button>
          <button 
            onClick={() => handleNavClick('loans')} 
            className="hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Loans &amp; Credit
          </button>
          <button 
            onClick={() => handleNavClick('calculators')} 
            className="hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Calculators
          </button>
          <button 
            onClick={() => handleNavClick('upi-payments')} 
            className="hover:text-emerald-800 text-emerald-900 font-semibold transition-colors whitespace-nowrap cursor-pointer py-1 flex items-center gap-1"
          >
            <span>UPI &amp; Send Link</span>
          </button>
          <button 
            onClick={() => handleNavClick('branches')} 
            className="hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Branch Locator
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenNetBanking}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-xs whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>NetBanking Portal</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <button 
            onClick={() => handleNavClick('deposits')} 
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Deposits &amp; Interest Rates
          </button>
          <button 
            onClick={() => handleNavClick('loans')} 
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            MSME &amp; Micro-Loans
          </button>
          <button 
            onClick={() => handleNavClick('calculators')} 
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            FD &amp; Loan EMI Calculators
          </button>
          <button 
            onClick={() => handleNavClick('upi-payments')} 
            className="block w-full text-left px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 rounded-md"
          >
            ★ UPI &amp; Send Payment Link
          </button>
          <button 
            onClick={() => handleNavClick('branches')} 
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Branch &amp; Micro-ATM Locator
          </button>
          <div className="pt-2 border-t border-slate-100">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAccountModal(); }}
              className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <span>Open Instant Account</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
