import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const NetNeutralityTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [speed, setSpeed] = useState(15);
  const [isPaid, setIsPaid] = useState(false);

  const handleBoost = () => {
    setStatus(SimulationStatus.PROCESSING);
    
    let currentSpeed = 15;
    const interval = setInterval(() => {
        currentSpeed += 15;
        setSpeed(currentSpeed);
        if (currentSpeed >= 150) {
            clearInterval(interval);
            setStatus(SimulationStatus.INTERCEPTED);
        }
    }, 100);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setSpeed(15);
    setIsPaid(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#111] rounded-xl border border-slate-800 shadow-2xl p-8 text-center relative overflow-hidden font-sans text-left">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
      
      <div className="mb-8 text-center">
         <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">ISP Paid Priority Access</h3>
         <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Network Relationship Panel</p>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8 text-sm text-orange-200 leading-relaxed font-medium text-left">
        Activate exclusive deal with ISP to throttle competitor traffic and boost ours.
      </div>

      <div className="relative w-64 h-32 mx-auto mb-8 overflow-hidden">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 border-[20px] border-slate-800 rounded-full border-b-transparent border-l-transparent transform rotate-45"></div>
         <div 
            className="absolute bottom-0 left-1/2 w-32 h-2 bg-red-600 origin-left transition-transform duration-100 ease-out"
            style={{ transform: `rotate(${Math.min(180, (speed / 200) * 180)}deg)` }}
         ></div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl font-bold text-white mb-8">
            {speed} <span className="text-sm text-slate-500 uppercase tracking-tighter">Mbps</span>
         </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 flex items-center justify-between mb-6 shadow-inner">
          <div className="text-left">
              <span className="block text-white font-bold uppercase text-sm tracking-wide">Enable ISP Peering Bypass</span>
              <span className="text-xs text-slate-500 font-mono tracking-tight">Redirect traffic through private "Fast Lanes".</span>
          </div>
          <div 
             onClick={() => status === SimulationStatus.IDLE && setIsPaid(!isPaid)}
             className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${isPaid ? 'bg-orange-500' : 'bg-slate-700'}`}
          >
              <div className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${isPaid ? 'translate-x-6' : ''}`}></div>
          </div>
      </div>

      <Button fullWidth onClick={handleBoost} disabled={!isPaid || status !== SimulationStatus.IDLE} className={`${isPaid ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-slate-700 text-slate-400'} flex items-center justify-center gap-2 py-4 shadow-xl shadow-orange-900/10 transition-all font-black uppercase tracking-widest text-base`}>
          <div className="flex items-center space-x-2">
             <Zap fill="currentColor" size={20} /> 
             <span>Pay $15.00 for Priority Lane</span>
          </div>
      </Button>
      
      {!isPaid && <p className="text-xs text-slate-500 mt-4 italic font-medium text-center">Authorize peering transaction to initiate priority routing.</p>}

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Net Neutrality Overview"
        hook="Know your rights! Internet service providers must treat all data equally, without blocking or throttling content."
        analysis="<strong>Topic: Net Neutrality</strong><br><br>Know your rights! Net Neutrality is the theory that internet service providers must treat all data equally, without blocking or throttling content for specific users for payment. Net Neutrality used to be protected federally under a Title II classification, but in Mozilla v. FCC, 940 f.3d 1 (D.C. Cir. 2019), the courts decided to repeal this federal classification and instead left it up to the states to enact their own net neutrality protections, meaning your rights now depend on where you live. Some states, like California, New York, ect. Have restored net neutrality rules, while others have not. Before paying for prioritization tools, please confirm whether or not net neutrality is protected in your state; do not let service providers violate your rights!"
      />
    </div>
  );
};