import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Percent } from 'lucide-react';

interface FinancialCalculatorsProps {
  onApplyProduct: (productType: string, amount: number, tenure: string) => void;
}

export const FinancialCalculators: React.FC<FinancialCalculatorsProps> = ({
  onApplyProduct
}) => {
  const [activeTab, setActiveTab] = useState<'fd' | 'loan'>('fd');

  // FD State
  const [fdAmount, setFdAmount] = useState<number>(200000);
  const [fdTenureDays, setFdTenureDays] = useState<number>(444);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);
  const [payoutFrequency, setPayoutFrequency] = useState<'cumulative' | 'monthly' | 'quarterly'>('cumulative');

  // Map tenure days to interest rate
  const fdRate = useMemo(() => {
    let base = 7.00;
    if (fdTenureDays <= 14) base = 4.25;
    else if (fdTenureDays <= 45) base = 4.75;
    else if (fdTenureDays <= 90) base = 5.50;
    else if (fdTenureDays <= 180) base = 6.50;
    else if (fdTenureDays <= 364) base = 7.25;
    else if (fdTenureDays <= 400) base = 8.25;
    else if (fdTenureDays === 444) base = 8.75; // Special 444-day slab
    else if (fdTenureDays <= 730) base = 8.10;
    else if (fdTenureDays <= 1095) base = 7.75;
    else base = 7.50;

    return isSeniorCitizen ? base + 0.50 : base;
  }, [fdTenureDays, isSeniorCitizen]);

  // FD Calculation (Quarterly compounding for cumulative)
  const fdResult = useMemo(() => {
    const years = fdTenureDays / 365;
    const r = fdRate / 100;
    
    if (payoutFrequency === 'cumulative') {
      // Compounded quarterly: A = P * (1 + r/4)^(4*t)
      const n = 4;
      const maturity = fdAmount * Math.pow(1 + r / n, n * years);
      const interest = maturity - fdAmount;
      return {
        principal: fdAmount,
        interest: Math.round(interest),
        maturity: Math.round(maturity),
        periodicPayout: 0
      };
    } else if (payoutFrequency === 'monthly') {
      // Simple monthly payout: (P * r) / 12
      const monthlyPayout = (fdAmount * r) / 12;
      const totalInterest = monthlyPayout * (years * 12);
      return {
        principal: fdAmount,
        interest: Math.round(totalInterest),
        maturity: Math.round(fdAmount),
        periodicPayout: Math.round(monthlyPayout)
      };
    } else {
      // Quarterly payout: (P * r) / 4
      const quarterlyPayout = (fdAmount * r) / 4;
      const totalInterest = quarterlyPayout * (years * 4);
      return {
        principal: fdAmount,
        interest: Math.round(totalInterest),
        maturity: Math.round(fdAmount),
        periodicPayout: Math.round(quarterlyPayout)
      };
    }
  }, [fdAmount, fdTenureDays, fdRate, payoutFrequency]);

  // Loan State
  const [loanProduct, setLoanProduct] = useState<'msme' | 'mahila' | 'kisan' | 'gold' | 'home'>('msme');
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(36);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(10.50);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Sync default rates based on loan product
  const handleProductChange = (type: 'msme' | 'mahila' | 'kisan' | 'gold' | 'home') => {
    setLoanProduct(type);
    if (type === 'msme') {
      setLoanInterestRate(10.50);
      setLoanAmount(500000);
      setLoanTenureMonths(36);
    } else if (type === 'mahila') {
      setLoanInterestRate(11.25);
      setLoanAmount(80000);
      setLoanTenureMonths(24);
    } else if (type === 'kisan') {
      setLoanInterestRate(8.50);
      setLoanAmount(300000);
      setLoanTenureMonths(36);
    } else if (type === 'gold') {
      setLoanInterestRate(9.20);
      setLoanAmount(150000);
      setLoanTenureMonths(12);
    } else {
      setLoanInterestRate(8.65);
      setLoanAmount(1500000);
      setLoanTenureMonths(120);
    }
  };

  // Loan EMI Calculation
  const loanResult = useMemo(() => {
    const P = loanAmount;
    const r = loanInterestRate / 12 / 100;
    const n = loanTenureMonths;

    if (r === 0) {
      const emi = P / n;
      return {
        emi: Math.round(emi),
        totalInterest: 0,
        totalPayment: P
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [loanAmount, loanInterestRate, loanTenureMonths]);

  // Amortization schedule (Annual summary)
  const amortizationSchedule = useMemo(() => {
    const schedule: Array<{ year: number; principalPaid: number; interestPaid: number; balance: number }> = [];
    let balance = loanAmount;
    const monthlyRate = loanInterestRate / 12 / 100;
    const emi = loanResult.emi;
    const totalYears = Math.ceil(loanTenureMonths / 12);

    for (let yr = 1; yr <= totalYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      const monthsInThisYear = Math.min(12, loanTenureMonths - (yr - 1) * 12);

      for (let m = 0; m < monthsInThisYear; m++) {
        const interest = balance * monthlyRate;
        const principal = Math.min(balance, emi - interest);
        yrInterest += interest;
        yrPrincipal += principal;
        balance = Math.max(0, balance - principal);
      }

      schedule.push({
        year: yr,
        principalPaid: Math.round(yrPrincipal),
        interestPaid: Math.round(yrInterest),
        balance: Math.round(balance)
      });
    }

    return schedule;
  }, [loanAmount, loanInterestRate, loanTenureMonths, loanResult.emi]);

  return (
    <section id="calculators" className="py-14 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            Interactive Financial Planning
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            Transparent Calculators for Deposits &amp; Loans
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Test custom investment horizons, calculate exact maturity returns with compounding, or calibrate monthly EMIs to your enterprise cash flows.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('fd')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'fd'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Fixed Deposit (FD) Return Calculator
          </button>
          <button
            onClick={() => setActiveTab('loan')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'loan'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Loan EMI &amp; Amortization Calculator
          </button>
        </div>

        {/* FIXED DEPOSIT CALCULATOR */}
        {activeTab === 'fd' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
              
              {/* Deposit Amount Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="fd-amount-input" className="text-sm font-medium text-slate-700">
                    Deposit Principal Amount
                  </label>
                  <div className="flex items-center gap-1 font-mono tabular-nums font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-md text-base border border-emerald-200">
                    <span>₹</span>
                    <input
                      id="fd-amount-input"
                      type="number"
                      min={10000}
                      max={5000000}
                      step={10000}
                      value={fdAmount}
                      onChange={(e) => setFdAmount(Number(e.target.value))}
                      className="w-28 bg-transparent text-right focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={2500000}
                  step={10000}
                  value={fdAmount}
                  onChange={(e) => setFdAmount(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                  <span>₹10,000</span>
                  <span>₹10 Lakhs</span>
                  <span>₹25 Lakhs</span>
                </div>
              </div>

              {/* Tenure Selection & Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="fd-tenure-slider" className="text-sm font-medium text-slate-700">
                    Investment Tenure: <span className="font-semibold text-slate-900">{fdTenureDays} Days ({ (fdTenureDays / 365).toFixed(1) } Years)</span>
                  </label>
                  {fdTenureDays === 444 && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      ★ Special 8.75% Slab
                    </span>
                  )}
                </div>

                {/* Preset tenure buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {[
                    { label: '1 Year (365D)', days: 365 },
                    { label: '444 Days (Special)', days: 444 },
                    { label: '2 Years (730D)', days: 730 },
                    { label: '5 Yrs (Tax Saver)', days: 1826 },
                  ].map((preset) => (
                    <button
                      key={preset.days}
                      onClick={() => setFdTenureDays(preset.days)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors border cursor-pointer ${
                        fdTenureDays === preset.days
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  id="fd-tenure-slider"
                  type="range"
                  min={30}
                  max={1826}
                  step={1}
                  value={fdTenureDays}
                  onChange={(e) => setFdTenureDays(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                  <span>30 Days</span>
                  <span>444 Days</span>
                  <span>5 Years (1826D)</span>
                </div>
              </div>

              {/* Senior Citizen Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-sm font-medium text-slate-900 block">Senior Citizen Depositor</span>
                  <span className="text-xs text-slate-500">Additional +0.50% interest rate benefit across all tenures</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSeniorCitizen(!isSeniorCitizen)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    isSeniorCitizen ? 'bg-emerald-800' : 'bg-slate-300'
                  }`}
                  aria-pressed={isSeniorCitizen}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isSeniorCitizen ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Payout Options */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700 block mb-2">Interest Payout Frequency</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cumulative', label: 'Cumulative (At Maturity)' },
                    { id: 'monthly', label: 'Monthly Credit' },
                    { id: 'quarterly', label: 'Quarterly Credit' }
                  ].map((payout) => (
                    <button
                      key={payout.id}
                      onClick={() => setPayoutFrequency(payout.id as any)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg text-center border cursor-pointer ${
                        payoutFrequency === payout.id
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {payout.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Output Summary Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicable Yield</span>
                  <div className="text-right">
                    <span className="font-heading font-extrabold text-2xl text-emerald-800 font-mono tabular-nums">
                      {fdRate.toFixed(2)}%
                    </span>
                    <span className="text-xs text-slate-500 block">per annum</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Invested Principal</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      ₹{fdResult.principal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Total Estimated Interest</span>
                    <span className="font-mono tabular-nums font-semibold text-emerald-700">
                      +₹{fdResult.interest.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {payoutFrequency !== 'cumulative' && (
                    <div className="flex justify-between items-center text-sm bg-slate-50 p-2.5 rounded-md">
                      <span className="text-slate-700">
                        {payoutFrequency === 'monthly' ? 'Monthly' : 'Quarterly'} Payout
                      </span>
                      <span className="font-mono tabular-nums font-bold text-slate-900">
                        ₹{fdResult.periodicPayout.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {/* Ratio bar */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Principal ({Math.round((fdResult.principal / (fdResult.principal + fdResult.interest)) * 100)}%)</span>
                      <span>Interest ({Math.round((fdResult.interest / (fdResult.principal + fdResult.interest)) * 100)}%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-slate-700 h-full"
                        style={{ width: `${(fdResult.principal / (fdResult.principal + fdResult.interest)) * 100}%` }}
                      />
                      <div 
                        className="bg-emerald-600 h-full"
                        style={{ width: `${(fdResult.interest / (fdResult.principal + fdResult.interest)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Total Maturity Value */}
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500 uppercase font-medium block">
                      {payoutFrequency === 'cumulative' ? 'Total Maturity Value' : 'Principal Returned at Maturity'}
                    </span>
                    <span className="font-heading font-extrabold text-3xl text-slate-900 font-mono tabular-nums block mt-1">
                      ₹{fdResult.maturity.toLocaleString('en-IN')}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">
                      Includes quarterly compounding on cumulative option. Subject to applicable TDS as per IT rules.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => onApplyProduct('Fixed Deposit', fdAmount, `${fdTenureDays} Days`)}
                  className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Book This Fixed Deposit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* LOAN EMI CALCULATOR */}
        {activeTab === 'loan' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
              
              {/* Product selector buttons */}
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-2">
                  Select Credit Product
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'msme', label: 'MSME Pragati (10.5%)' },
                    { id: 'mahila', label: 'Mahila Micro-Credit (11.25%)' },
                    { id: 'kisan', label: 'Kisan Samriddhi (8.5%)' },
                    { id: 'gold', label: 'Swarna Gold Loan (9.2%)' },
                    { id: 'home', label: 'Griha Nirman Home (8.65%)' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleProductChange(p.id as any)}
                      className={`px-3 py-2 text-xs font-medium rounded-md text-center border cursor-pointer ${
                        loanProduct === p.id
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Amount Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="loan-amount-input" className="text-sm font-medium text-slate-700">Required Loan Amount</label>
                  <div className="flex items-center gap-1 font-mono tabular-nums font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-md text-base border border-slate-200">
                    <span>₹</span>
                    <input
                      id="loan-amount-input"
                      type="number"
                      min={20000}
                      max={5000000}
                      step={25000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-28 bg-transparent text-right focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={20000}
                  max={3000000}
                  step={20000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                  <span>₹20,000</span>
                  <span>₹15 Lakhs</span>
                  <span>₹30 Lakhs</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="loan-rate-slider" className="text-sm font-medium text-slate-700">Interest Rate (% p.a.)</label>
                  <span className="font-mono tabular-nums font-bold text-emerald-800 text-base">
                    {loanInterestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  id="loan-rate-slider"
                  type="range"
                  min={7.5}
                  max={18.0}
                  step={0.25}
                  value={loanInterestRate}
                  onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                  <span>7.5%</span>
                  <span>12.0%</span>
                  <span>18.0%</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="loan-tenure-slider" className="text-sm font-medium text-slate-700">
                    Repayment Tenure: <span className="font-semibold text-slate-900">{loanTenureMonths} Months ({(loanTenureMonths / 12).toFixed(1)} Yrs)</span>
                  </label>
                </div>
                <input
                  id="loan-tenure-slider"
                  type="range"
                  min={6}
                  max={120}
                  step={6}
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                  <span>6 Months</span>
                  <span>60 Months (5 Yrs)</span>
                  <span>120 Months (10 Yrs)</span>
                </div>
              </div>

            </div>

            {/* Loan EMI Result Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="pb-4 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Calculated Monthly EMI</span>
                  <span className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-800 font-mono tabular-nums block mt-1">
                    ₹{loanResult.emi.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">for {loanTenureMonths} consecutive months</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Principal Loan Amount</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      ₹{loanAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Total Interest Payable</span>
                    <span className="font-mono tabular-nums font-semibold text-amber-700">
                      ₹{loanResult.totalInterest.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100 font-semibold">
                    <span className="text-slate-900">Total Repayment Amount</span>
                    <span className="font-mono tabular-nums text-slate-900">
                      ₹{loanResult.totalPayment.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Amortization schedule toggle */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAmortization(!showAmortization)}
                      className="text-xs font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{showAmortization ? 'Hide Amortization Schedule' : 'View Year-by-Year Amortization'}</span>
                      {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {showAmortization && (
                      <div className="mt-3 max-h-48 overflow-y-auto border border-slate-200 rounded-lg text-xs font-mono">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 sticky top-0">
                            <tr>
                              <th className="p-2">Yr</th>
                              <th className="p-2">Principal</th>
                              <th className="p-2">Interest</th>
                              <th className="p-2">Balance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {amortizationSchedule.map((row) => (
                              <tr key={row.year} className="hover:bg-slate-50">
                                <td className="p-2 font-semibold">{row.year}</td>
                                <td className="p-2 text-slate-700">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                                <td className="p-2 text-amber-700">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                                <td className="p-2 text-slate-900">₹{row.balance.toLocaleString('en-IN')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => onApplyProduct('Loan', loanAmount, `${loanTenureMonths} Months`)}
                  className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Apply with These Terms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
