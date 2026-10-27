import { DepositRate, SavingsSlab, LoanProduct, BankBranch, TestimonialStory, UserAccount, Transaction } from '../types/bank';

export const DEPOSIT_RATES: DepositRate[] = [
  { tenure: '7 Days to 14 Days', tenureDaysMin: 7, tenureDaysMax: 14, regularRate: 4.25, seniorRate: 4.75 },
  { tenure: '15 Days to 45 Days', tenureDaysMin: 15, tenureDaysMax: 45, regularRate: 4.75, seniorRate: 5.25 },
  { tenure: '46 Days to 90 Days', tenureDaysMin: 46, tenureDaysMax: 90, regularRate: 5.50, seniorRate: 6.00 },
  { tenure: '91 Days to 180 Days', tenureDaysMin: 91, tenureDaysMax: 180, regularRate: 6.50, seniorRate: 7.00 },
  { tenure: '181 Days to 364 Days', tenureDaysMin: 181, tenureDaysMax: 364, regularRate: 7.25, seniorRate: 7.75 },
  { tenure: '1 Year to 400 Days', tenureDaysMin: 365, tenureDaysMax: 400, regularRate: 8.25, seniorRate: 8.75 },
  { 
    tenure: '444 Days (Rupanjali Samriddhi)', 
    tenureDaysMin: 444, 
    tenureDaysMax: 444, 
    regularRate: 8.75, 
    seniorRate: 9.25, 
    isSpecial: true,
    highlightText: 'Highest Yield' 
  },
  { tenure: '15 Months to 2 Years', tenureDaysMin: 455, tenureDaysMax: 730, regularRate: 8.10, seniorRate: 8.60 },
  { tenure: '2 Years 1 Day to 3 Years', tenureDaysMin: 731, tenureDaysMax: 1095, regularRate: 7.75, seniorRate: 8.25 },
  { tenure: '3 Years 1 Day to 5 Years', tenureDaysMin: 1096, tenureDaysMax: 1825, regularRate: 7.50, seniorRate: 8.00 },
  { 
    tenure: '5 Years (Tax Saver u/s 80C)', 
    tenureDaysMin: 1826, 
    tenureDaysMax: 1826, 
    regularRate: 7.75, 
    seniorRate: 8.25,
    highlightText: 'Tax Benefit'
  },
];

export const SAVINGS_SLABS: SavingsSlab[] = [
  { balanceRange: 'Up to ₹1,00,000', rate: 4.00, description: 'Calculated on daily end-of-day balances' },
  { balanceRange: 'Above ₹1,00,000 up to ₹5,00,000', rate: 6.00, description: 'High return on liquid emergency funds' },
  { balanceRange: 'Above ₹5,00,000 up to ₹25,00,000', rate: 7.25, description: 'Accelerated interest for growing savings' },
  { balanceRange: 'Above ₹25,00,000 up to ₹5 Crores', rate: 7.75, description: 'Premium tiered yield for business & HNIs' },
];

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'msme-pragati',
    name: 'Rupanjali Pragati MSME Business Loan',
    tagline: 'Collateral-free working capital and equipment financing for local enterprises',
    minAmount: 50000,
    maxAmount: 5000000,
    interestRateMin: 10.25,
    interestRateMax: 14.50,
    maxTenureMonths: 60,
    processingFee: '1.0% + GST',
    features: [
      'In-principle digital sanction within 48 hours',
      'Flexible overdraft or term loan repayment options',
      'No property collateral required up to ₹10 Lakhs',
      'Minimal GST and bank statement documentation'
    ],
    eligibleAudience: 'Proprietorships, partnerships, retailers, traders, and small workshops with 1+ year in business'
  },
  {
    id: 'mahila-samarth',
    name: 'Rupanjali Mahila Samarth Micro-Credit',
    tagline: 'Dedicated low-barrier growth finance for women artisans and group enterprises',
    minAmount: 20000,
    maxAmount: 200000,
    interestRateMin: 11.25,
    interestRateMax: 13.50,
    maxTenureMonths: 36,
    processingFee: 'Nil for loans up to ₹50,000',
    features: [
      'Joint-Liability Group (JLG) and individual business tracks',
      'Weekly or monthly doorstep cash collection option',
      'Free life insurance cover during tenure',
      'Skill training and financial literacy workshops included'
    ],
    eligibleAudience: 'Self-employed women, handloom weavers, dairy owners, tailoring units, and home entrepreneurs'
  },
  {
    id: 'kisan-samriddhi',
    name: 'Rupanjali Kisan Samriddhi Agri Credit',
    tagline: 'Comprehensive crop cycle financing, solar pump credit, and allied farm machinery',
    minAmount: 30000,
    maxAmount: 2500000,
    interestRateMin: 7.50,
    interestRateMax: 11.00,
    maxTenureMonths: 84,
    processingFee: '0.50% of sanctioned amount',
    features: [
      'Aligned with crop harvest cycles (bullet repayment after harvest)',
      'Subsidized interest support on prompt repayment',
      'Finance for dairy cattle, drip irrigation, and cold storage',
      'Doorstep farm verification by dedicated agri-officers'
    ],
    eligibleAudience: 'Farmers, tenant cultivators, dairy farmers, and agricultural commodity dealers'
  },
  {
    id: 'swarna-gold',
    name: 'Rupanjali Swarna Instant Gold Loan',
    tagline: 'Instant liquidity against gold jewelry with zero income documentation',
    minAmount: 15000,
    maxAmount: 2000000,
    interestRateMin: 9.20,
    interestRateMax: 12.00,
    maxTenureMonths: 24,
    processingFee: 'Flat ₹500',
    features: [
      'Up to 75% loan-to-value as per RBI statutory norms',
      'Instant disbursal in branch in under 25 minutes',
      'Safe high-security vaulted storage with full transit insurance',
      'Pay interest only; principal repayable at maturity option'
    ],
    eligibleAudience: 'Any Indian citizen aged 18+ with valid gold ornaments and basic KYC'
  },
  {
    id: 'griha-nirman',
    name: 'Affordable Griha Nirman Housing Loan',
    tagline: 'Empowering home ownership, plot construction, and structural renovation',
    minAmount: 200000,
    maxAmount: 4000000,
    interestRateMin: 8.65,
    interestRateMax: 10.75,
    maxTenureMonths: 240,
    processingFee: '0.75% of loan amount',
    features: [
      'Assistance with property legal title search and documentation',
      'Flexible informal income appraisal for self-employed individuals',
      'Up to 20 years tenure for manageable EMIs',
      'Transparent sanction with zero hidden foreclosure penalties'
    ],
    eligibleAudience: 'Salaried employees and self-employed micro-business owners seeking their first home'
  }
];

export const BANK_BRANCHES: BankBranch[] = [
  {
    id: 'br-001',
    name: 'Varanasi Main & Heritage Branch',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    pincode: '221002',
    address: 'Plot 42, Sigra-Rathyatra Road, Opposite Kuber Complex, Sigra, Varanasi',
    phone: '+91 542 2228410',
    email: 'varanasi.branch@rupanjalibank.com',
    ifsc: 'RUPA0001001',
    micr: '221884002',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM (2nd & 4th Sat Holiday)',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-002',
    name: 'Lucknow Hazratganj Zonal Center',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    pincode: '226001',
    address: 'Ground Floor, Naval Kishore Road, Near Mayfair Cinema, Hazratganj, Lucknow',
    phone: '+91 522 2614902',
    email: 'lucknow.branch@rupanjalibank.com',
    ifsc: 'RUPA0001002',
    micr: '226884003',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM (2nd & 4th Sat Holiday)',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-003',
    name: 'Kanpur Collectorganj Commercial Hub',
    state: 'Uttar Pradesh',
    city: 'Kanpur',
    pincode: '208001',
    address: 'Shop 18-20, Nayaganj Market Road, Collectorganj, Kanpur',
    phone: '+91 512 2337190',
    email: 'kanpur.branch@rupanjalibank.com',
    ifsc: 'RUPA0001003',
    micr: '208884004',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM',
    hasAtm: true,
    hasCdm: true,
    hasLockers: false,
    hasDoorstep: true
  },
  {
    id: 'br-004',
    name: 'Patna Frazer Road Branch',
    state: 'Bihar',
    city: 'Patna',
    pincode: '800001',
    address: 'Grand Plaza, Ground Floor, Frazer Road, Near Dak Bungalow Crossing, Patna',
    phone: '+91 612 2209144',
    email: 'patna.branch@rupanjalibank.com',
    ifsc: 'RUPA0001004',
    micr: '800884005',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-005',
    name: 'Gaya Bodh-Gaya Rural & Agri Center',
    state: 'Bihar',
    city: 'Gaya',
    pincode: '823001',
    address: 'Near Tower Chowk, GB Road, Gaya, Bihar',
    phone: '+91 631 2420811',
    email: 'gaya.branch@rupanjalibank.com',
    ifsc: 'RUPA0001005',
    micr: '823884006',
    workingHours: 'Mon - Sat: 9:00 AM - 4:00 PM',
    hasAtm: true,
    hasCdm: false,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-006',
    name: 'Indore Rajwada Business Branch',
    state: 'Madhya Pradesh',
    city: 'Indore',
    pincode: '452002',
    address: 'Cloth Market Chamber, Near Subhash Chowk, Rajwada, Indore',
    phone: '+91 731 2548810',
    email: 'indore.branch@rupanjalibank.com',
    ifsc: 'RUPA0001006',
    micr: '452884007',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-007',
    name: 'Bhopal MP Nagar Center',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    pincode: '462011',
    address: 'Zone II, Maharana Pratap Nagar, Near Sargam Talkies, Bhopal',
    phone: '+91 755 2571200',
    email: 'bhopal.branch@rupanjalibank.com',
    ifsc: 'RUPA0001007',
    micr: '462884008',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-008',
    name: 'Jaipur Johari Bazar Branch',
    state: 'Rajasthan',
    city: 'Jaipur',
    pincode: '302003',
    address: 'Shop 84, Johari Bazar, Heritage Walled City, Jaipur',
    phone: '+91 141 2569940',
    email: 'jaipur.branch@rupanjalibank.com',
    ifsc: 'RUPA0001008',
    micr: '302884009',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-009',
    name: 'Corporate Head Office & Central Branch',
    state: 'Delhi',
    city: 'West Delhi',
    pincode: '110059',
    address: 'H-65, SF, D-Block, Mohan Garden, Gurudwara Road, West Delhi, Delhi',
    phone: '+91 9455112788',
    email: 'rupanjali690@gmail.com',
    ifsc: 'RUPA0001009',
    micr: '110884059',
    workingHours: 'Mon - Sat: 9:30 AM - 5:00 PM (2nd & 4th Sat Holiday)',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-010',
    name: 'Pune Shivaji Nagar SME Branch',
    state: 'Maharashtra',
    city: 'Pune',
    pincode: '411005',
    address: 'F.C. Road, Opp Ferguson College Gate, Shivaji Nagar, Pune',
    phone: '+91 20 25531020',
    email: 'pune.branch@rupanjalibank.com',
    ifsc: 'RUPA0001010',
    micr: '411884011',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  },
  {
    id: 'br-011',
    name: 'Deoria Bhikhampur Road Branch',
    state: 'Uttar Pradesh',
    city: 'Deoria',
    pincode: '274001',
    address: 'Bhikhampur Road, Near Overbridge, Deoria, Uttar Pradesh',
    phone: '+91 9455112788',
    email: 'rupanjali690@gmail.com',
    ifsc: 'RUPA0001011',
    micr: '274884001',
    workingHours: 'Mon - Sat: 9:30 AM - 4:30 PM (2nd & 4th Sat Holiday)',
    hasAtm: true,
    hasCdm: true,
    hasLockers: true,
    hasDoorstep: true
  }
];

export const INITIAL_USER_ACCOUNT: UserAccount = {
  accountNumber: '401928374612',
  accountHolder: 'Vijay Shankar Tiwari',
  customerId: 'CUST-884091',
  accountType: 'Savings',
  balance: 184320.50,
  ifsc: 'RUPA0001001',
  branch: 'Varanasi Main & Heritage Branch',
  virtualCard: {
    cardNumber: '5123 4567 8901 2345',
    cardHolder: 'VIJAY SHANKAR TIWARI',
    expiryDate: '09/29',
    cvv: '842',
    isFrozen: false,
    onlinePaymentsEnabled: true,
    internationalEnabled: false,
    dailyLimit: 75000,
  },
  activeFixedDeposits: [
    {
      id: 'fd-01',
      fdNumber: 'FD-2026-99120',
      principal: 200000,
      interestRate: 8.75,
      tenureMonths: 15,
      bookingDate: '12 Jan 2026',
      maturityDate: '12 Apr 2027',
      maturityAmount: 222850,
      status: 'Active'
    },
    {
      id: 'fd-02',
      fdNumber: 'FD-2025-44109',
      principal: 150000,
      interestRate: 8.50,
      tenureMonths: 24,
      bookingDate: '04 Oct 2025',
      maturityDate: '04 Oct 2027',
      maturityAmount: 177430,
      status: 'Active'
    }
  ]
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-001',
    refNo: 'RUPA261027991823',
    date: '26 Oct 2026, 04:12 PM',
    title: 'UPI Transfer to Sharma Dairy Supplies',
    recipientOrSender: 'sharma.agri@upi',
    category: 'transfer',
    type: 'debit',
    amount: 14200.00,
    balanceAfter: 184320.50,
    channel: 'UPI',
    status: 'Completed'
  },
  {
    id: 'tx-002',
    refNo: 'RUPA261025114520',
    date: '25 Oct 2026, 11:30 AM',
    title: 'Client Payment received - Handloom Export',
    recipientOrSender: 'Weaves of Kashi Exim Ltd',
    category: 'deposit',
    type: 'credit',
    amount: 68500.00,
    balanceAfter: 198520.50,
    channel: 'NEFT',
    status: 'Completed'
  },
  {
    id: 'tx-003',
    refNo: 'RUPA261020084122',
    date: '20 Oct 2026, 08:00 AM',
    title: 'Quarterly Savings Interest Credited',
    recipientOrSender: 'Rupanjali Small Finance Bank System',
    category: 'interest',
    type: 'credit',
    amount: 2842.50,
    balanceAfter: 130020.50,
    channel: 'INTERNAL',
    status: 'Completed'
  },
  {
    id: 'tx-004',
    refNo: 'RUPA261014165510',
    date: '14 Oct 2026, 04:55 PM',
    title: 'ATM Cash Withdrawal - Sigra Kiosk',
    recipientOrSender: 'ATM Varanasi Sigra #04',
    category: 'atm',
    type: 'debit',
    amount: 10000.00,
    balanceAfter: 127178.00,
    channel: 'ATM',
    status: 'Completed'
  },
  {
    id: 'tx-005',
    refNo: 'RUPA261005121008',
    date: '05 Oct 2026, 12:15 PM',
    title: 'Electricity Bill Payment - UPCL Power',
    recipientOrSender: 'UPCL Power Discom',
    category: 'bill',
    type: 'debit',
    amount: 3450.00,
    balanceAfter: 137178.00,
    channel: 'IMPS',
    status: 'Completed'
  }
];

export const TESTIMONIALS: TestimonialStory[] = [
  {
    id: 'test-01',
    name: 'Anita Devi & Meera Patel',
    role: 'Lead Weavers & SHG Founders',
    enterprise: 'Ganga Silk Handloom Cooperative',
    location: 'Varanasi, Uttar Pradesh',
    quote: 'When conventional commercial banks asked us for complex collateral deeds we did not possess, Rupanjali Bank approved our Mahila Samarth credit in just 3 days. Today 28 women in our village earn steady livelihoods.',
    loanType: 'Mahila Samarth Micro-Credit',
    outcomeMetric: 'Loom capacity expanded from 4 to 22 units in 18 months'
  },
  {
    id: 'test-02',
    name: 'Rajeshwar Verma',
    role: 'Managing Partner',
    enterprise: 'Kisan Jyoti Agro Logistics',
    location: 'Indore, Madhya Pradesh',
    quote: 'The 444-day FD at 8.75% gives our working capital surplus remarkable risk-free yields, while their MSME cash credit line ensures our grain purchase never stops even during peak mandis.',
    loanType: 'MSME Pragati & 8.75% Samriddhi FD',
    outcomeMetric: '₹3.8 Cr annual turnover handled through Rupanjali NetBanking'
  },
  {
    id: 'test-03',
    name: 'Suresh Chandra Sharma (Retd.)',
    role: 'Former High School Principal',
    enterprise: 'Senior Citizen Depositor',
    location: 'Lucknow, Uttar Pradesh',
    quote: 'Getting 9.25% annual interest on our retirement corpus with quarterly doorstep pension servicing is a blessing. The bank staff visits our home whenever we request paperwork assistance.',
    loanType: 'Senior Citizen Super Yield Deposit',
    outcomeMetric: 'Monthly interest credited directly to savings account'
  }
];
