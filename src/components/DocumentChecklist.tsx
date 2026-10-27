import React, { useState } from 'react';
import { 
  CheckSquare, Square, ShieldCheck, FileText, Smartphone, 
  PenTool, Sun, MapPin, AlertCircle, ArrowRight, CheckCircle2 
} from 'lucide-react';

interface DocumentChecklistProps {
  onReadyToProceed: () => void;
  isCompact?: boolean;
}

interface ChecklistItem {
  id: string;
  title: string;
  mandatory: boolean;
  description: string;
  rbiRule: string;
  icon: React.ElementType;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'pan',
    title: 'Physical Original PAN Card',
    mandatory: true,
    description: 'Keep your original plastic PAN card in hand. Must be shown to the bank verification officer on camera.',
    rbiRule: 'RBI Rule: Scans, photocopies, or e-PAN on another mobile screen are not accepted.',
    icon: FileText
  },
  {
    id: 'aadhaar',
    title: 'Aadhaar Linked Mobile Number',
    mandatory: true,
    description: 'Active SIM capable of receiving the 6-digit statutory UIDAI verification OTP instantly.',
    rbiRule: 'e-KYC authentication is completed via direct encrypted UIDAI API gateway.',
    icon: Smartphone
  },
  {
    id: 'pen-paper',
    title: 'Blank White Paper & Blue/Black Pen',
    mandatory: true,
    description: 'You will sign on clean blank paper live in front of the camera for signature matching against your PAN.',
    rbiRule: 'Signatures on printed forms or lined paper may require re-verification.',
    icon: PenTool
  },
  {
    id: 'environment',
    title: 'Well-Lit & Quiet Room',
    mandatory: true,
    description: 'Sit in an area with good front lighting. Ensure face is clearly visible without sunglasses, caps, or masks.',
    rbiRule: 'Facial match score must meet statutory 85%+ biometric threshold.',
    icon: Sun
  },
  {
    id: 'permissions',
    title: 'Camera, Microphone & Location Enabled',
    mandatory: true,
    description: 'Allow browser access to device camera, microphone, and GPS location when prompted.',
    rbiRule: 'RBI Statutory Requirement: Video KYC session must originate within Indian sovereign borders.',
    icon: MapPin
  }
];

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  onReadyToProceed,
  isCompact = false
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    pan: true,
    aadhaar: true,
    'pen-paper': true,
    environment: false,
    permissions: true
  });

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectAll = () => {
    const allChecked = CHECKLIST_ITEMS.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setCheckedItems(allChecked);
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const isFullyReady = completedCount === CHECKLIST_ITEMS.length;

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
      
      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>RBI Video KYC Pre-Flight Checklist</span>
          </div>
          <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
            Document &amp; Environment Preparation
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Ensure you have these 5 items ready to avoid call disconnection or re-verification delays.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {completedCount} of {CHECKLIST_ITEMS.length} Ready
          </span>
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2 py-1 cursor-pointer"
          >
            Check All
          </button>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="p-4 sm:p-5 space-y-3">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = !!checkedItems[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3 sm:p-3.5 rounded-lg border transition-colors cursor-pointer select-none flex items-start gap-3 ${
                isChecked
                  ? 'bg-white border-emerald-300 shadow-2xs'
                  : 'bg-white/70 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="mt-0.5 text-emerald-700 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 fill-emerald-100 text-emerald-800" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs sm:text-sm font-semibold block ${isChecked ? 'text-slate-900' : 'text-slate-700'}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Mandatory
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.description}
                </p>

                {!isCompact && (
                  <span className="text-[11px] text-amber-800/90 block mt-1 font-mono">
                    • {item.rbiRule}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-white p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Average verification duration: <strong>3 to 4 minutes</strong></span>
        </div>

        <button
          type="button"
          onClick={onReadyToProceed}
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
        >
          <span>{isFullyReady ? "I'm Ready - Continue to Application" : 'Proceed to Application Form'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
