import React, { useState } from 'react';
import { User, ArrowUp } from 'lucide-react';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const ThreatTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [input, setInput] = useState('');
  
  const THREAT_MSG = "I am going to kill you and your family tonight.";

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextCharIndex = input.length;
    if (nextCharIndex < THREAT_MSG.length) {
        setInput(THREAT_MSG.slice(0, nextCharIndex + 1));
    }
  };

  const handleSend = () => {
     setStatus(SimulationStatus.INTERCEPTED);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setInput('');
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden relative h-[600px] flex flex-col font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-10"></div>
      
      <div className="bg-slate-900 pt-10 pb-4 px-6 border-b border-slate-800 flex flex-col items-center">
         <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-2 text-slate-100">
            <User className="text-slate-400" />
         </div>
         <span className="text-slate-200 font-medium tracking-tight">Ex-Partner</span>
      </div>

      <div className="flex-1 bg-black p-4 space-y-4 overflow-y-auto text-left">
         <div className="bg-slate-800 text-slate-300 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm self-start">
            Please stop texting me.
         </div>
         <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm ml-auto">
            You can't ignore me forever.
         </div>
      </div>

      <div className="bg-slate-900 p-4 pb-8">
         <div className="flex items-center space-x-2 bg-slate-800 rounded-full px-4 py-2 border border-slate-700">
            <input 
                type="text" 
                value={input}
                onChange={handleType}
                placeholder="Type your message here..." 
                className="bg-transparent flex-1 text-white focus:outline-none"
            />
            <button 
                onClick={handleSend}
                disabled={input.length === 0}
                className="bg-blue-500 rounded-full p-1.5 text-white disabled:opacity-50"
            >
                <ArrowUp size={16} strokeWidth={3} />
            </button>
         </div>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Unprotected Speech"
        hook="True threats are not protected free speech."
        analysis="<strong>Topic: Free Speech</strong><br><br>By sending a true threats, this specific act is no longer considered as or protected under free speech. The First Amendment takes pride in protecting a wide range of speech, but 'true threats' are a notable exception. In Watts v. United States (1969), the Supreme Court distinguished between political hyperbole (hyperbole does not constitute as a threat) and legitimate, true threats. More recently, in Elonis v. United States (2015) and Counterman v. Colorado (2023), the Court clarified the mental state required for a true threat, ruling that it must be proven that the speaker acted intentionally and recklessly, respectively, with regard to the threatening nature of their speech—not just that a reasonable person would feel threatened. However, specific threats of violence sent directly to a target—like the one depicted here—rarely qualify as protected hyperbole and is therefore illegal/can lead to criminal prosecution."
      />
    </div>
  );
};