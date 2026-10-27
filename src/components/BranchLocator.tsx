import React, { useState, useMemo } from 'react';
import { BANK_BRANCHES } from '../data/bankData';
import { BankBranch } from '../types/bank';
import { MapPin, Search, Phone, Mail, Clock, Copy, Check, ShieldCheck, Home } from 'lucide-react';

interface BranchLocatorProps {
  onRequestDoorstep: () => void;
}

export const BranchLocator: React.FC<BranchLocatorProps> = ({ onRequestDoorstep }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [copiedIfsc, setCopiedIfsc] = useState<string | null>(null);

  // States list
  const states = useMemo(() => {
    const list = Array.from(new Set(BANK_BRANCHES.map((b) => b.state)));
    return ['All', ...list];
  }, []);

  // Filtered branches
  const filteredBranches = useMemo(() => {
    return BANK_BRANCHES.filter((branch) => {
      const matchesState = selectedState === 'All' || branch.state === selectedState;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        branch.name.toLowerCase().includes(query) ||
        branch.city.toLowerCase().includes(query) ||
        branch.pincode.includes(query) ||
        branch.ifsc.toLowerCase().includes(query);

      return matchesState && matchesQuery;
    });
  }, [searchQuery, selectedState]);

  const handleCopyIfsc = (ifsc: string) => {
    navigator.clipboard.writeText(ifsc);
    setCopiedIfsc(ifsc);
    setTimeout(() => setCopiedIfsc(null), 2000);
  };

  return (
    <section id="branches" className="py-14 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
              Pan-India Branch &amp; Micro-ATM Network
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
              Locate a Branch or Banking Outlet
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Access full-service branches, 24x7 Cash Recycler kiosks, and dedicated customer relationship desks across tier-1 to tier-4 locations.
            </p>
          </div>

          <button
            onClick={onRequestDoorstep}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <Home className="w-4 h-4" />
            <span>Request Doorstep Banking</span>
          </button>
        </div>

        {/* Search & State Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-8">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by City, Branch Name, Pincode, or IFSC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50/50"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All States (18 Active States)' : st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Branch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                    {branch.name}
                  </h3>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    {branch.city}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{branch.address} - PIN {branch.pincode}</span>
                </p>

                {/* IFSC & MICR Code box */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1.5 text-xs font-mono mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">IFSC Code:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900">{branch.ifsc}</span>
                      <button
                        onClick={() => handleCopyIfsc(branch.ifsc)}
                        className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                        title="Copy IFSC"
                      >
                        {copiedIfsc === branch.ifsc ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">MICR Code:</span>
                    <span className="text-slate-700">{branch.micr}</span>
                  </div>
                </div>

                {/* Operational Details */}
                <div className="space-y-1 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{branch.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>

                {/* Facility Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  {branch.hasAtm && <span className="bg-slate-100 px-2 py-0.5 rounded">24x7 ATM</span>}
                  {branch.hasCdm && <span className="bg-slate-100 px-2 py-0.5 rounded">Cash Recycler</span>}
                  {branch.hasLockers && <span className="bg-slate-100 px-2 py-0.5 rounded">Safe Lockers</span>}
                  {branch.hasDoorstep && <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">Doorstep Ready</span>}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${branch.phone}`}
                  className="font-semibold text-emerald-800 hover:text-emerald-950"
                >
                  Call Branch Desk
                </a>
                <button
                  onClick={onRequestDoorstep}
                  className="text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Book Visit →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600">No branches match your current search query "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedState('All'); }}
              className="mt-2 text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
