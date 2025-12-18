import React, { useState } from 'react';
import { Crosshair, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const LocationTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);

  const handleLocate = () => {
    setStatus(SimulationStatus.PROCESSING);
    setTimeout(() => {
        setStatus(SimulationStatus.INTERCEPTED);
    }, 1500);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden relative font-sans text-left">
      <div className="h-80 bg-[#1a1d24] relative overflow-hidden text-left">
         <div className="absolute inset-0 opacity-20" style={{ 
             backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
             backgroundSize: '40px 40px'
         }}></div>
         
         {status === SimulationStatus.PROCESSING && (
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 border border-green-500/50 rounded-full animate-ping"></div>
                 <div className="absolute w-full h-1 bg-green-500/50 top-1/2 -translate-y-1/2 animate-spin"></div>
             </div>
         )}
         
         <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-green-500 border border-green-900 font-bold uppercase tracking-widest">
            SATELLITE LINK: STABLE
         </div>
      </div>

      <div className="p-6 bg-slate-900 border-t border-slate-800">
         <div className="flex space-x-4 text-left">
            <div className="flex-1">
                <label className="text-xs text-slate-500 font-bold uppercase mb-1 block tracking-widest">Target Phone Number</label>
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded p-2 focus-within:border-green-500/50 transition-colors">
                    <Search className="text-slate-500 mr-2" size={18} />
                    <input type="tel" placeholder="(555) 019-2834" className="bg-transparent w-full text-white focus:outline-none font-mono" />
                </div>
            </div>
            <div className="flex items-end">
                <Button onClick={handleLocate} disabled={status !== SimulationStatus.IDLE} className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
                    <Crosshair size={18} /> <span>Locate Target</span>
                </Button>
            </div>
         </div>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Privacy Violation"
        hook="By hacking into the GPS system of one’s phone, you risk violating the privacy of their reasonable expectation of privacy."
        analysis="<strong>Topic: Privacy</strong><br><br>By hacking into the GPS system of one’s phone, you risk violating the privacy of their reasonable expectation of privacy. Under the Fourth Amendment, accessing a phone’s location data without permission can break several laws. If the Government accesses a phone’s location data without a warrant, it constitutes an unlawful search under the Fourth Amendment United States v. Jones, 565 U.S. 400 (2012); Carpenter v. United States, 138 S. Ct. 2206 (2018). If you, as a private citizen, access someone’s location without permission, you risk violating the Computer Fraud and Abuse Act. You also risk violating federal electronic surveillance laws under the ECPA. After all, courts have maintained that modern cellphones contain the “privacies of life” per Riley v. California, 573 U.S. 373 (2014), and that a prolonged or precise digital tracking crosses legal boundaries."
      />
    </div>
  );
};