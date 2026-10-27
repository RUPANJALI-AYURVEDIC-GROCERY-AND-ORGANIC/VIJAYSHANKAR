import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, PhoneCall, ShieldCheck, ArrowRight, Bot, User, Sparkles } from 'lucide-react';

interface CustomerSupportChatProps {
  onOpenAccount: () => void;
  onOpenRates: () => void;
  onOpenNetBanking: () => void;
  onOpenDoorstep: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    type: 'account' | 'rates' | 'netbanking' | 'doorstep';
  };
}

export const CustomerSupportChat: React.FC<CustomerSupportChatProps> = ({
  onOpenAccount,
  onOpenRates,
  onOpenNetBanking,
  onOpenDoorstep
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Namaste! Welcome to Rupanjali Small Finance Bank Virtual Helpdesk. How can I assist you with your banking needs today?',
      timestamp: 'Just now'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Highest FD interest rate',
    'Open zero-balance account',
    'Freeze my debit card',
    'MSME loan requirements',
    'Doorstep banking service'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Knowledge base query resolver
  const getBotResponse = (query: string): { text: string; action?: { label: string; type: 'account' | 'rates' | 'netbanking' | 'doorstep' } } => {
    const q = query.toLowerCase();

    if (q.includes('fd') || q.includes('fixed deposit') || q.includes('interest rate') || q.includes('rate') || q.includes('yield')) {
      return {
        text: 'Our flagship "Rupanjali Samriddhi" 444-Day Fixed Deposit offers an industry-leading 8.75% p.a. for general depositors and 9.25% p.a. for Senior Citizens. Interest is compounded quarterly. All deposits are DICGC insured up to ₹5,00,000.',
        action: { label: 'Explore Rates & Calculate Return', type: 'rates' }
      };
    }

    if (q.includes('open') || q.includes('account') || q.includes('savings') || q.includes('zero balance') || q.includes('kyc')) {
      return {
        text: 'You can open our Samriddhi Zero-Balance Savings Account in under 5 minutes using 100% paperless Video KYC. You only need your Aadhaar (with registered mobile) and PAN card. No minimum balance penalty applies.',
        action: { label: 'Start Instant Video KYC', type: 'account' }
      };
    }

    if (q.includes('card') || q.includes('freeze') || q.includes('block') || q.includes('debit') || q.includes('atm')) {
      return {
        text: 'You can instantly freeze or unfreeze your RuPay Platinum debit card inside our NetBanking portal under "RuPay Card Controls". You can also adjust your daily ATM limit and disable international or online usage anytime.',
        action: { label: 'Manage RuPay Card in NetBanking', type: 'netbanking' }
      };
    }

    if (q.includes('loan') || q.includes('msme') || q.includes('credit') || q.includes('borrow') || q.includes('business')) {
      return {
        text: 'We offer MSME Pragati Business Loans (up to ₹50 Lakhs with 48-hr in-principle sanction), Mahila Samarth Micro-Credit for women artisans, Kisan Samriddhi Agri-Credit, and Swarna Instant Gold Loans at competitive rates from 7.50% to 11.25%.',
        action: { label: 'View Loan Options & Calculator', type: 'rates' }
      };
    }

    if (q.includes('doorstep') || q.includes('senior') || q.includes('home') || q.includes('pickup') || q.includes('delivery')) {
      return {
        text: 'As per RBI guidelines, we provide free doorstep banking for Senior Citizens (60+) and Persons with Disabilities. Services include cash delivery/pickup up to ₹20,000, cheque pickup, and Digital Life Certificate verification.',
        action: { label: 'Schedule Doorstep Visit', type: 'doorstep' }
      };
    }

    if (q.includes('link') || q.includes('qr') || q.includes('whatsapp') || q.includes('collect') || q.includes('share link')) {
      return {
        text: 'You can generate dynamic UPI QR codes and broadcast payment requests across WhatsApp, Telegram, SMS, and Email using our UPI & Send Link Hub. Supports custom amounts, VPA, and instant voice soundbox alerts.',
        action: { label: 'Open UPI & Send Link Hub', type: 'netbanking' }
      };
    }

    if (q.includes('transfer') || q.includes('upi') || q.includes('imps') || q.includes('neft') || q.includes('send money')) {
      return {
        text: 'Digital fund transfers via UPI, 24x7 instant IMPS, and NEFT through Rupanjali NetBanking are 100% free with zero transaction charges. You can also generate shareable UPI payment links for WhatsApp and all platforms.',
        action: { label: 'Open NetBanking Simulator', type: 'netbanking' }
      };
    }

    if (q.includes('head office') || q.includes('address') || q.includes('h.o.') || q.includes('delhi office')) {
      return {
        text: 'Corporate Head Office (H.O.): H-65, SF, D-Block, Mohan Garden, Gurudwara Road, West Delhi, Delhi Pin 110059. Phone: +91 11 25338100. 24x7 Toll-Free: 1800-209-7872.',
        action: { label: 'View in Branch Locator', type: 'rates' }
      };
    }

    if (q.includes('deoria') || q.includes('bhikhampur')) {
      return {
        text: 'Deoria Branch: Bhikhampur Road, Near Overbridge, Deoria, Uttar Pradesh - Pin 274001. IFSC: RUPA0001011. Phone: +91 5568 224190. Facilities: 24x7 ATM, Cash Recycler CDM, Safe Lockers & Doorstep Banking.',
        action: { label: 'View in Branch Locator', type: 'rates' }
      };
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('number') || q.includes('helpline') || q.includes('toll free')) {
      return {
        text: 'Direct Customer Care: +91 9455112788 | Email: rupanjali690@gmail.com | 24x7 Toll-Free: 1800-209-7872. Head Office: H-65, SF, D-Block, Mohan Garden, Gurudwara Road, West Delhi, Delhi - 110059.',
        action: { label: 'Explore Rates & Contact', type: 'rates' }
      };
    }

    if (q.includes('branch') || q.includes('ifsc') || q.includes('location')) {
      return {
        text: 'Corporate Head Office is at H-65, SF, D-Block, Mohan Garden, Gurudwara Road, West Delhi, Delhi - 110059. Phone: +91 9455112788 | Email: rupanjali690@gmail.com. You can also search all branches in the Branch Locator.',
        action: { label: 'Search Branch Locator', type: 'rates' }
      };
    }

    return {
      text: 'Thank you for reaching out. We offer high-yield fixed deposits up to 8.75% (9.25% for seniors), zero-balance savings, MSME credit, and 24x7 NetBanking. For assistance, contact +91 9455112788 or email rupanjali690@gmail.com.',
      action: { label: 'Open Digital Account', type: 'account' }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate natural response latency
    setTimeout(() => {
      const resp = getBotResponse(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        action: resp.action
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 300);
  };

  const handleActionClick = (actionType?: 'account' | 'rates' | 'netbanking' | 'doorstep') => {
    if (actionType === 'account') onOpenAccount();
    else if (actionType === 'rates') onOpenRates();
    else if (actionType === 'netbanking') onOpenNetBanking();
    else if (actionType === 'doorstep') onOpenDoorstep();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 group"
            aria-label="Open Customer Support Chat"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-amber-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-800" />
            </div>
            <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
              Customer Support
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Interface Drawer / Window */}
      {isOpen && (
        <div 
          className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 max-h-[85vh] sm:max-h-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-labelledby="support-chat-title"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-amber-300 flex items-center justify-center font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span id="support-chat-title" className="font-heading font-bold text-sm text-white block">
                  Rupanjali Banking Helpdesk
                </span>
                <span className="text-[11px] text-emerald-400 block -mt-0.5">
                  24x7 Instant Banking Guidance
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Notice Strip */}
          <div className="bg-slate-100 px-4 py-2 text-[11px] text-slate-600 border-b border-slate-200 flex items-center justify-between shrink-0">
            <span>Call: <a href="tel:9455112788" className="font-semibold text-emerald-800 font-mono">+91 9455112788</a></span>
            <a href="mailto:rupanjali690@gmail.com" className="text-slate-500 hover:text-emerald-800">rupanjali690@gmail.com</a>
          </div>

          {/* Chat Stream */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    R
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-xl p-3 shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleActionClick(msg.action?.type)}
                        className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Queries Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 shrink-0 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask a question about rates, loans, KYC..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
