import React, { useState } from 'react';
import { Key, Loader2, DollarSign } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const PasswordShareTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [loadingText, setLoadingText] = useState('Verifying credentials...');

  const handleShare = () => {
    setStatus(SimulationStatus.PROCESSING);
    let step = 0;
    const interval = setInterval(() => {
        step++;
        if (step === 1) setLoadingText('Connecting to resale marketplace...');
        if (step === 2) {
            clearInterval(interval);
            setStatus(SimulationStatus.INTERCEPTED);
        }
    }, 800);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setLoadingText('Verifying credentials...');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-xl border border-slate-800 shadow-2xl p-8 relative overflow-hidden">
      <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
        <div className="bg-green-500/20 p-2 rounded-lg">
            <Key className="text-green-500" size={24} />
        </div>
        <h3 className="text-xl font-bold text-white uppercase tracking-tight">SplitStream: Credential Resale</h3>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6 text-left">
        <p className="text-sm text-blue-200 leading-relaxed font-medium">
          Enter your credentials below to sell a "slot" on your account to a stranger and split your monthly bill.
        </p>
      </div>

      <div className="space-y-6">
        <div className="text-left">
            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">Account Username (Admin)</label>
            <input 
              type="text" 
              defaultValue="brosen_tech_wizard" 
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow font-mono" 
            />
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
            <div>
                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">Service Cost</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">$</span>
                    <input type="text" value="19.99" readOnly className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 pl-7 text-white font-mono" />
                </div>
            </div>
            <div>
                 <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">Resale Profit</label>
                 <div className="relative">
                    <span className="absolute left-3 top-3 text-green-500">$</span>
                    <input type="text" value="10.00" readOnly className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 pl-7 text-green-400 font-bold font-mono" />
                </div>
            </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded border border-slate-700 text-left">
            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">Marketplace Match (Buyer)</label>
            <input type="email" value="stranger_492@anon-mail.com" readOnly className="w-full bg-slate-900 border border-slate-800 rounded-md p-3 text-slate-500 cursor-not-allowed font-mono" />
        </div>

        <Button 
            fullWidth 
            onClick={handleShare}
            disabled={status !== SimulationStatus.IDLE}
            className={`flex items-center justify-center space-x-2 py-4 text-lg uppercase tracking-wider ${status === SimulationStatus.PROCESSING ? 'opacity-80' : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20'}`}
        >
            {status === SimulationStatus.PROCESSING ? (
                <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>{loadingText}</span>
                </>
            ) : (
                <>
                    <DollarSign size={18} />
                    <span>Activate Resale</span>
                </>
            )}
        </Button>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Action Intercepted"
        hook="Selling account access violates both Terms of Service and potentially federal hacking laws."
        analysis="<strong>Topic: CFAA</strong><br><br>By sharing your password for streaming services, you risk violating the Computer Fraud and Abuse Act (CFAA, 18 U.S.C. § 1030), which prohibits accessing a computer without authorization or exceeding authorized access. Even though you may not intend to exceed your authorization, courts have made clear that authorization is tied to permission, not intent. In U.S. v. Morris, 928 F.2d 504 (2d Cir. 1991), the court decided that unauthorized technical access was illegal, even without malicious intent. In U.S. v. Nosal, 676 F.3d 854 (9th Cir. 2012), employees who used others’ credentials to access data they were not privy to were found to have exceeded authorized access. While sharing passwords may feel normal or harmless online, CFAA liability is built on the premise of authorized access. In practice, though, the government is not likely to prosecute everyday users, as they tend to focus on large-scale fraud."
      />
    </div>
  );
};