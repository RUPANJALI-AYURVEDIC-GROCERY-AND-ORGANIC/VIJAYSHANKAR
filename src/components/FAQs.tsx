import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'account' | 'rates' | 'netbanking' | 'doorstep';
  categoryLabel: string;
  question: string;
  answer: string;
  actionText?: string;
  actionType?: 'account' | 'rates' | 'netbanking';
}

interface FAQsProps {
  onOpenAccount: () => void;
  onOpenRates: () => void;
  onOpenNetBanking: () => void;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'account',
    categoryLabel: 'Account Opening & KYC',
    question: 'What documents are required to open an instant digital savings account?',
    answer: 'You only need your 12-digit Aadhaar number (linked with your active mobile number for OTP verification) and a valid 10-character PAN card. The entire process is 100% paperless and completed online via Video KYC in under 5 minutes without visiting a branch.',
    actionText: 'Open Instant Account Now',
    actionType: 'account'
  },
  {
    id: 'faq-2',
    category: 'account',
    categoryLabel: 'Account Opening & KYC',
    question: 'Is there a minimum balance requirement for Rupanjali Savings Accounts?',
    answer: 'No. Rupanjali Small Finance Bank offers the Samriddhi Zero-Balance Savings Account with no mandatory monthly average balance (MAB) requirement or non-maintenance penalty. You enjoy full access to free digital banking, high tiered interest, and a virtual RuPay debit card.',
    actionText: 'Apply for Zero-Balance Account',
    actionType: 'account'
  },
  {
    id: 'faq-3',
    category: 'rates',
    categoryLabel: 'Interest Rates & Deposits',
    question: 'How is the 8.75% p.a. Fixed Deposit rate calculated and compounded?',
    answer: 'The flagship 8.75% p.a. rate applies to our special 444-day "Rupanjali Samriddhi" term deposit for general citizens, and 9.25% p.a. for Senior Citizens. For cumulative FDs, interest is compounded quarterly as per RBI guidelines. You can also opt for monthly or quarterly direct interest credit into your savings account.',
    actionText: 'View Deposit Rate Card',
    actionType: 'rates'
  },
  {
    id: 'faq-4',
    category: 'rates',
    categoryLabel: 'Interest Rates & Deposits',
    question: 'Are deposits with Rupanjali Small Finance Bank safe and insured?',
    answer: 'Yes, completely. Rupanjali Small Finance Bank is a Scheduled Commercial Bank licensed by the Reserve Bank of India (RBI). All customer deposits (including savings, current, and fixed deposits) are insured up to ₹5,00,000 per depositor for both principal and interest under the Deposit Insurance and Credit Guarantee Corporation (DICGC) Act, 1961.',
    actionText: 'Calculate Term Deposit Return',
    actionType: 'rates'
  },
  {
    id: 'faq-5',
    category: 'rates',
    categoryLabel: 'Interest Rates & Deposits',
    question: 'What special benefits and interest rates are offered to Senior Citizens?',
    answer: 'Resident Indian senior citizens aged 60 years and above receive an additional +0.50% interest rate premium across all deposit tenures. For our 444-day deposit, senior citizens earn an industry-leading 9.25% p.a., along with priority branch assistance and free doorstep banking services.',
    actionText: 'Explore Senior Citizen Rates',
    actionType: 'rates'
  },
  {
    id: 'faq-6',
    category: 'netbanking',
    categoryLabel: 'NetBanking & Digital Security',
    question: 'Are online fund transfers via IMPS, NEFT, and UPI free of charge?',
    answer: 'Yes. All digital fund transfers conducted via Rupanjali NetBanking or Mobile Banking through UPI, IMPS (24x7 instant), and NEFT are completely free of charge with zero transaction processing fees.',
    actionText: 'Launch NetBanking Portal',
    actionType: 'netbanking'
  },
  {
    id: 'faq-7',
    category: 'netbanking',
    categoryLabel: 'NetBanking & Digital Security',
    question: 'How do I freeze or manage limits on my RuPay Platinum debit card?',
    answer: 'You can instantly freeze or unfreeze your debit card with a single click inside the NetBanking Portal under "RuPay Card Controls". You can also toggle online e-commerce transactions, disable international payments, and adjust your daily ATM cash withdrawal limit between ₹10,000 and ₹1,00,000.',
    actionText: 'Manage Card in NetBanking',
    actionType: 'netbanking'
  },
  {
    id: 'faq-8',
    category: 'netbanking',
    categoryLabel: 'NetBanking & Digital Security',
    question: 'What should I do immediately if I suspect fraud or lose my card?',
    answer: 'Immediately log into the NetBanking portal to activate "Instant Card Freeze". Alternatively, call our 24x7 dedicated emergency toll-free hotline at 1800-209-7872 or email fraud@rupanjalibank.com. You can also report cyber crime directly to the National Cyber Crime Portal via dial-in 1930.',
    actionText: 'Access Security Controls',
    actionType: 'netbanking'
  },
  {
    id: 'faq-9',
    category: 'doorstep',
    categoryLabel: 'Doorstep Banking & Branches',
    question: 'Who can request Doorstep Banking and what services are provided?',
    answer: 'In compliance with RBI guidelines, Doorstep Banking is available for Senior Citizens (aged 60+) and Persons with Disabilities (PwD). Services include cash delivery/pickup up to ₹20,000, cheque collection, submission of Form 15G/15H, and Digital Life Certificate (Jeevan Pramaan) verification right at your residence.',
    actionText: 'View Branch & Outlet Network',
    actionType: 'rates'
  }
];

export const FAQs: React.FC<FAQsProps> = ({
  onOpenAccount,
  onOpenRates,
  onOpenNetBanking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'account', label: 'Account Opening & KYC' },
    { id: 'rates', label: 'Interest Rates & FDs' },
    { id: 'netbanking', label: 'NetBanking & Security' },
    { id: 'doorstep', label: 'Doorstep Banking' },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleActionClick = (actionType?: 'account' | 'rates' | 'netbanking') => {
    if (actionType === 'account') onOpenAccount();
    else if (actionType === 'rates') onOpenRates();
    else if (actionType === 'netbanking') onOpenNetBanking();
  };

  return (
    <section id="faqs" className="py-14 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            Clear Answers &amp; Guidance
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Everything you need to know about opening accounts, deposit safety, yield compounding, and digital banking security.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by keywords (e.g. Video KYC, 8.75%, DICGC, NetBanking, Card Freeze)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50/50"
            />
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-slate-200 border-y border-slate-200 mb-12">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div key={faq.id} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded py-1 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-emerald-800 font-mono mt-0.5 shrink-0">
                      {faq.id.replace('faq-', 'Q')}.
                    </span>
                    <span className="font-heading font-semibold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <div className="p-1 rounded text-slate-400 group-hover:text-slate-700 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-800" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="pt-3 pb-2 pl-7 pr-4 sm:pr-8 animate-in fade-in duration-150">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>

                    {faq.actionText && (
                      <div className="mt-3">
                        <button
                          onClick={() => handleActionClick(faq.actionType)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                        >
                          <span>{faq.actionText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 mb-12">
            <p className="text-sm text-slate-600">No questions found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-2 text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
            >
              Reset Search &amp; Show All
            </button>
          </div>
        )}

        {/* Assistance Helpdesk Strip */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Have a Specific Inquiry or Need Guidance?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Our certified banking relationship team is available 24x7 to assist you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:9455112788"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-2 font-mono"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>+91 9455112788</span>
            </a>
            <a
              href="mailto:rupanjali690@gmail.com"
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
            >
              rupanjali690@gmail.com
            </a>
            <button
              onClick={onOpenAccount}
              className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              Instant Video KYC
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
