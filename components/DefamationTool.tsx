import React, { useState } from 'react';
import { Globe, Shield } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const DefamationTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [loadingText, setLoadingText] = useState('Masking IP...');

  const handlePost = () => {
    setStatus(SimulationStatus.PROCESSING);
    setTimeout(() => setLoadingText('Posting to server...'), 800);
    setTimeout(() => {
        setStatus(SimulationStatus.INTERCEPTED);
    }, 1500);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setLoadingText('Masking IP...');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-xl border border-slate-800 shadow-2xl p-6 relative font-sans text-left">
      <div className="flex items-center space-x-3 mb-6">
         <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center text-red-500">
            <Globe size={20} />
         </div>
         <div>
            <h3 className="font-bold text-white uppercase tracking-tight">BurnerBoard</h3>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Anonymous Local Gossip</p>
         </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-4 mb-4 border border-slate-700">
         <textarea 
            readOnly 
            className="w-full bg-transparent text-slate-300 resize-none h-24 focus:outline-none text-left"
            defaultValue="Brad Rosen stole money from the charity fund last year. Everyone knows he's a thief, even if he wasn't caught."
         />
      </div>

      <div className="flex items-center justify-between">
         <div className="flex items-center text-green-500 text-xs font-mono space-x-2">
            <Shield size={14} />
            <span className="uppercase tracking-widest font-bold">VPN: ACTIVE (Panama)</span>
         </div>
         <Button 
            onClick={handlePost} 
            disabled={status !== SimulationStatus.IDLE}
            variant="danger"
            className="uppercase tracking-widest font-bold"
         >
            {status === SimulationStatus.PROCESSING ? loadingText : 'Post Anonymously'}
         </Button>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Liability Intercepted"
        hook="Anonymity does not shield you from liability for false statements of fact."
        analysis="<strong>Topic: Free Speech</strong><br><br>By commenting a false statement presented as a fact to a third party and causing reputational harm, you may be committing defamation (Restatement (Second) of Torts § 558). While you may think you are posting anonymously, you are not immune to the legal consequences that come with defamatory statements. Courts have routinely allowed subpoenas to reveal the identity of anonymous speakers online when plausible claims exist Doe v. Ciolli, 611 F. Supp. 2d 216 (D. Conn. 2009). Furthermore, while Section 230 of the Communications Decency Act protects the platform from being punished for hosting their users’ content, the users themselves are not protected. Remember: free speech doctrine protects opinion and satire, not defamatory assertions presented as the truth."
      />
    </div>
  );
};