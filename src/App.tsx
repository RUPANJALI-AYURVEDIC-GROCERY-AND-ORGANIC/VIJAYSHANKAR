/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FinancialCalculators } from './components/FinancialCalculators';
import { CoreCapabilities } from './components/CoreCapabilities';
import { RatesBoard } from './components/RatesBoard';
import { BranchLocator } from './components/BranchLocator';
import { SocialImpact } from './components/SocialImpact';
import { FAQs } from './components/FAQs';
import { UpiPaymentHub } from './components/UpiPaymentHub';
import { Footer } from './components/Footer';
import { NetBankingModal } from './components/NetBankingModal';
import { DigitalAccountModal } from './components/DigitalAccountModal';
import { LoanInquiryModal } from './components/LoanInquiryModal';
import { DoorstepModal } from './components/DoorstepModal';
import { CustomerSupportChat } from './components/CustomerSupportChat';

import { INITIAL_USER_ACCOUNT, INITIAL_TRANSACTIONS } from './data/bankData';
import { UserAccount, Transaction } from './types/bank';
import { ShieldCheck, Smartphone, Lock, ArrowRight, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

export default function App() {
  // Global Banking State
  const [userAccount, setUserAccount] = useState<UserAccount>(INITIAL_USER_ACCOUNT);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Modal Visibility States
  const [isNetBankingOpen, setIsNetBankingOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDoorstepModalOpen, setIsDoorstepModalOpen] = useState(false);
  const [loanInquiryData, setLoanInquiryData] = useState<{
    isOpen: boolean;
    productName: string;
    amount?: number;
    tenure?: string;
  }>({
    isOpen: false,
    productName: 'MSME Pragati Business Credit'
  });

  // Smooth scroll handler
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for transfers in NetBanking
  const handleTransferSuccess = (newTx: Transaction, updatedBalance: number) => {
    setTransactions((prev) => [newTx, ...prev]);
    setUserAccount((prev) => ({
      ...prev,
      balance: updatedBalance
    }));
  };

  // Handler for booking new FD in NetBanking
  const handleBookFdSuccess = (newFd: any, updatedBalance: number) => {
    setUserAccount((prev) => ({
      ...prev,
      balance: updatedBalance,
      activeFixedDeposits: [newFd, ...prev.activeFixedDeposits]
    }));
  };

  // Handler for updating Card settings in NetBanking
  const handleUpdateCardSettings = (newCardSettings: any) => {
    setUserAccount((prev) => ({
      ...prev,
      virtualCard: {
        ...prev.virtualCard,
        ...newCardSettings
      }
    }));
  };

  // Handler for creating a new digital account via onboarding modal
  const handleAccountCreated = (newAcc: any) => {
    setUserAccount((prev) => ({
      ...prev,
      accountNumber: newAcc.accountNumber,
      customerId: newAcc.customerId,
      accountHolder: newAcc.name,
      balance: 10000.00, // Initial welcome bonus mock credit
      virtualCard: {
        ...prev.virtualCard,
        cardHolder: newAcc.name.toUpperCase()
      }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-800 selection:text-white">
      
      {/* 3-Zone Navigation Bar */}
      <Navbar
        onOpenNetBanking={() => setIsNetBankingOpen(true)}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section with 2-column split, 4-column KPI strip */}
        <HeroSection
          onOpenAccount={() => setIsAccountModalOpen(true)}
          onExploreRates={() => handleNavigateSection('deposits')}
          onOpenCalculators={() => handleNavigateSection('calculators')}
        />

        {/* Digital Banking Feature Spotlight Bar */}
        <section id="digital-banking" className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Next-Gen Omnichannel Experience</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Seamless Banking at Your Fingertips &amp; Doorstep
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Experience instant UPI payments, 24x7 IMPS transfers, paperless video KYC account opening, and certified doorstep assistance for senior citizens.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    256-Bit SSL Secured
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Biometric Micro-ATM Network
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Instant RuPay Platinum Activation
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => setIsNetBankingOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Launch NetBanking Demo</span>
                </button>
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Open Video KYC Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* UPI Payments & Multi-Platform Payment Link Hub */}
        <section id="upi-payments" className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UpiPaymentHub
              userAccount={userAccount}
              onExecuteTransfer={handleTransferSuccess}
            />
          </div>
        </section>

        {/* Core Pillars / Bento Grid */}
        <CoreCapabilities
          onSelectProduct={(productName) =>
            setLoanInquiryData({
              isOpen: true,
              productName,
              amount: 500000,
              tenure: '36 Months'
            })
          }
          onOpenAccount={() => setIsAccountModalOpen(true)}
        />

        {/* Interactive Calculators (FD Compounding & Loan EMI Amortization) */}
        <FinancialCalculators
          onApplyProduct={(productType, amount, tenure) =>
            setLoanInquiryData({
              isOpen: true,
              productName: productType,
              amount,
              tenure
            })
          }
        />

        {/* 2026 Official Rate Board */}
        <RatesBoard
          onOpenAccount={() => setIsAccountModalOpen(true)}
          onOpenCalculator={() => handleNavigateSection('calculators')}
        />

        {/* Social Impact & Inclusion Proof */}
        <SocialImpact />

        {/* Pan-India Branch & Micro-ATM Locator */}
        <BranchLocator
          onRequestDoorstep={() => setIsDoorstepModalOpen(true)}
        />

        {/* FAQs Component */}
        <FAQs
          onOpenAccount={() => setIsAccountModalOpen(true)}
          onOpenRates={() => handleNavigateSection('deposits')}
          onOpenNetBanking={() => setIsNetBankingOpen(true)}
        />
      </main>

      {/* Institutional Compliance Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenAccount={() => setIsAccountModalOpen(true)}
      />

      {/* Interactive NetBanking Simulation Portal Modal */}
      <NetBankingModal
        isOpen={isNetBankingOpen}
        onClose={() => setIsNetBankingOpen(false)}
        userAccount={userAccount}
        transactions={transactions}
        onTransferSuccess={handleTransferSuccess}
        onBookFdSuccess={handleBookFdSuccess}
        onUpdateCardSettings={handleUpdateCardSettings}
      />

      {/* Digital Account KYC Onboarding Modal */}
      <DigitalAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onAccountCreated={handleAccountCreated}
      />

      {/* Loan Application / Express Inquiry Modal */}
      <LoanInquiryModal
        isOpen={loanInquiryData.isOpen}
        onClose={() => setLoanInquiryData((prev) => ({ ...prev, isOpen: false }))}
        productName={loanInquiryData.productName}
        initialAmount={loanInquiryData.amount}
        initialTenure={loanInquiryData.tenure}
      />

      {/* Doorstep Banking Request Modal */}
      <DoorstepModal
        isOpen={isDoorstepModalOpen}
        onClose={() => setIsDoorstepModalOpen(false)}
      />

      {/* Floating Customer Support Chat Interface */}
      <CustomerSupportChat
        onOpenAccount={() => setIsAccountModalOpen(true)}
        onOpenRates={() => handleNavigateSection('deposits')}
        onOpenNetBanking={() => setIsNetBankingOpen(true)}
        onOpenDoorstep={() => setIsDoorstepModalOpen(true)}
      />

    </div>
  );
}
