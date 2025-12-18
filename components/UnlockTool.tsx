import React, { useState } from 'react';
/* Fixed: Aliased Image as ImageIcon to match usage below */
import { Smartphone, Unlock, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const UnlockTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [log, setLog] = useState('Ready to connect.');

  const handleUnlock = () => {
    setStatus(SimulationStatus.PROCESSING);
    const logs = ["Connecting via USB...", "Handshake successful...", "Brute forcing PIN...", "Attempt 1402...", "Attempt 1403..."];
    let i = 0;
    const interval = setInterval(() => {
        if (i < logs.length) {
            setLog(logs[i]);
            i++;
        } else {
            clearInterval(interval);
            setStatus(SimulationStatus.INTERCEPTED);
        }
    }, 400);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setLog('Ready to connect.');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-200 rounded-xl border border-slate-300 shadow-xl p-8 relative font-sans text-left">
       <div className="flex space-x-8">
          <div className="w-1/3 bg-black rounded-[2rem] p-3 shadow-2xl ring-4 ring-slate-300">
              <div className="h-64 bg-slate-900 rounded-[1.5rem] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 w-24 h-4 bg-black rounded-b-xl"></div>
                  <Smartphone className="text-slate-700 w-16 h-16 mb-4" />
                  <div className="text-white font-mono text-2xl tracking-widest text-center">****</div>
                  <p className="text-slate-500 text-xs mt-2 uppercase font-bold tracking-widest text-center">Locked</p>
              </div>
          </div>

          <div className="flex-1 space-y-6">
              <div>
                  <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">iBypass Tool</h3>
                  <p className="text-slate-500 text-sm">Recover data from someone else's lost device to reveal identity and figure out who it belongs to.</p>
                  <p className="text-red-500 text-xs mt-1 font-bold uppercase tracking-widest">Warning: Unauthorized Entry</p>
              </div>

              <div className="flex space-x-4">
                 <div className="bg-white p-3 rounded shadow-sm text-center w-full">
                    <ImageIcon className="mx-auto text-blue-500 mb-1" size={20} />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Photos</span>
                 </div>
                 <div className="bg-white p-3 rounded shadow-sm text-center w-full">
                    <MessageSquare className="mx-auto text-green-500 mb-1" size={20} />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Chats</span>
                 </div>
              </div>

              <div className="bg-black rounded p-3 font-mono text-xs text-green-500 h-24 overflow-y-auto">
                 {`> ${log}`}
              </div>

              <Button fullWidth onClick={handleUnlock} disabled={status !== SimulationStatus.IDLE} className="bg-slate-800 text-white flex items-center justify-center gap-2 uppercase tracking-widest py-3 font-bold font-sans">
                  <Unlock size={18} /> <span>Bypass Lock Screen</span>
              </Button>
          </div>
       </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Access Denied"
        hook="Bypassing technical safeguards on a device you do not own violates federal privacy standards."
        analysis="<strong>Topic: Search/Seizure</strong><br><br>By breaching the lock screen and bypassing password protection, you risk violating one’s reasonable right to privacy through circumventing technical safeguards. The Supreme Court has established that modern cellphones contain the “Privacies of life” and that to access their contents, one requires lawful authorization Riley v. California, 573 U.S. 373 (2014). Without permission, you trigger the Computer Fraud and Abuse Act, which prohibits accessing a computer without authorization or by bypassing access controls U.S. v. Morris, 928 F.2d 504 (2d Cir. (1991); U.S. v. Nosal, 676 f.3d 854 (9th Cir. 2012). While passwords might seem like a minor obstacle before accessing a phone, they are the embodiment of an expectation to privacy."
      />
    </div>
  );
};