import React from 'react';
import { Landmark, ShieldCheck, PhoneCall, AlertTriangle, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenAccount }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white tracking-tight block">
                  Rupanjali Small Finance Bank
                </span>
                <span className="text-[11px] text-emerald-400 block -mt-1 font-medium">
                  RBI Scheduled Commercial Bank
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering households, micro-entrepreneurs, and farmers across India with high-yield deposits, fair credit, and modern digital banking.
            </p>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 text-[11px] space-y-1">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider block">Head Office (H.O.)</span>
              <p className="text-slate-300 leading-relaxed">
                H-65, SF, D-Block, Mohan Garden, Gurudwara Road, West Delhi, Delhi - 110059
              </p>
              <div className="pt-1 text-slate-400 space-y-0.5">
                <div>Contact: <a href="tel:9455112788" className="text-emerald-400 hover:underline font-mono">+91 9455112788</a></div>
                <div>Email: <a href="mailto:rupanjali690@gmail.com" className="text-emerald-400 hover:underline">rupanjali690@gmail.com</a></div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>DICGC Depositor Insurance Protection</span>
              </div>
              <p className="text-slate-400">
                All deposits with Rupanjali Small Finance Bank are insured up to ₹5,00,000 for both principal and interest per depositor under the DICGC Act 1961.
              </p>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Retail &amp; MSME Products
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('deposits')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Rupanjali Samriddhi 444D FD (8.75%)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('deposits')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Senior Citizen Super Yield (9.25%)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('deposits')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Tiered Savings Accounts (7.75%)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('loans')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  MSME Pragati Business Credit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('loans')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Mahila Samarth Micro-Credit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('loans')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Swarna Instant Gold Loans
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Customer Support &amp; Contact
            </span>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2 text-white">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:9455112788" className="hover:text-emerald-400 font-mono font-semibold">+91 9455112788</a>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 block -mt-1">Toll-Free: 1800-209-7872</span>
              </li>
              <li>
                <a href="mailto:rupanjali690@gmail.com" className="hover:text-emerald-400 text-slate-300">
                  Email: rupanjali690@gmail.com
                </a>
              </li>
              <li>
                <button onClick={() => onNavigateSection('branches')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Branch &amp; Micro-ATM Network
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('faqs')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
              <li>
                <span className="block text-[11px] text-amber-400 pt-1">
                  National Cyber Crime Helpline: 1930
                </span>
              </li>
              <li>
                <span>Report Fraud: fraud@rupanjalibank.com</span>
              </li>
              <li>
                <span>Doorstep Banking: 1800-209-7873</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Regulatory Disclosures */}
          <div>
            <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-3">
              Governance &amp; Statutory
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span>RBI Banking License: SFB/2021/04</span>
              </li>
              <li>
                <span>Schedule II Commercial Bank</span>
              </li>
              <li>
                <span>Banking Ombudsman Scheme</span>
              </li>
              <li>
                <span>Fair Lending Practices Code</span>
              </li>
              <li>
                <span>Schedule of Service Charges</span>
              </li>
              <li>
                <span>Citizen's Charter &amp; Privacy Policy</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & cautionary statement */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Rupanjali Small Finance Bank Limited. All Rights Reserved. Head Office: H-65, SF, D-Block, Mohan Garden, Gurudwara Road, West Delhi, Delhi - 110059.
          </p>
          <div className="flex items-center gap-4">
            <span>CIN: U65191DL2021PLC148902</span>
            <span>·</span>
            <span>256-Bit SSL Secured</span>
            <span>·</span>
            <span>ISO/IEC 27001 Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
