import React, { useState } from 'react';
import { Sparkles, Download } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const MemeTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);

  const handleGenerate = () => {
    setStatus(SimulationStatus.PROCESSING);
    setTimeout(() => {
        setStatus(SimulationStatus.INTERCEPTED);
    }, 1200);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden relative text-slate-900 font-sans">
      <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
         <h3 className="font-bold text-slate-700 flex items-center gap-2 uppercase tracking-tight">
            <Sparkles className="text-yellow-500" /> MemeMaker Ultra
         </h3>
      </div>

      <div className="grid md:grid-cols-2">
         <div className="p-6 space-y-4 border-r border-slate-200 text-left">
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Upload Copyrighted Image</label>
                <div className="h-32 bg-slate-50 rounded flex items-center justify-center border-2 border-dashed border-slate-200">
                    <span className="text-slate-400 text-sm font-medium">movie_screenshot.jpg</span>
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Text</label>
                <input 
                  type="text" 
                  defaultValue="WHEN YOU REALIZE" 
                  className="w-full bg-slate-50 border border-slate-300 p-2 rounded text-sm font-bold uppercase text-slate-900 focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm" 
                />
            </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bottom Text</label>
                <input 
                  type="text" 
                  defaultValue="IT'S COPYRIGHTED" 
                  className="w-full bg-slate-50 border border-slate-300 p-2 rounded text-sm font-bold uppercase text-slate-900 focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm" 
                />
            </div>
         </div>

         <div className="p-6 bg-slate-50 flex flex-col items-center justify-center space-y-4">
             <div className="relative aspect-square w-full bg-slate-800 rounded shadow-lg overflow-hidden border border-slate-200">
                 <img src="https://picsum.photos/seed/meme/400/400" className="opacity-80 object-cover w-full h-full" alt="meme base" />
                 {/* Standard Sans-Serif font in preview as requested */}
                 <div className="absolute top-4 left-0 right-0 text-center text-white font-sans font-black text-xl px-2 drop-shadow-lg uppercase tracking-wide">WHEN YOU REALIZE</div>
                 <div className="absolute bottom-4 left-0 right-0 text-center text-white font-sans font-black text-xl px-2 drop-shadow-lg uppercase tracking-wide">IT'S COPYRIGHTED</div>
                 {status === SimulationStatus.PROCESSING && (
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-mono z-10">
                         Rendering...
                     </div>
                 )}
             </div>
             <Button fullWidth onClick={handleGenerate} disabled={status !== SimulationStatus.IDLE} className="bg-yellow-500 hover:bg-yellow-600 text-black border-none flex items-center justify-center gap-2 font-black uppercase tracking-widest py-3">
                 <Download size={18} /> <span>Download Meme</span>
             </Button>
         </div>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Copyright Violation"
        hook="Combining copyrighted assets without a license risks infringement under 17 U.S.C. § 107."
        analysis="<strong>Topic: Fair Use</strong><br><br>By combining copyrighted images with copyrighted lyrics or quotes, you may be infringing copyright under 17 U.S.C. § 107. U.S. copyright law exists to promote the progress of science and the arts by giving creators exclusive rights to their original works for a limited time (U.S. Const. art. I, § 8, cl. 8). Within copyright law, the Fair Use doctrine exists to balance creators’ rights with public interest, allowing limited use of copyrighted material without permission. For a work to be considered Fair Use, the purpose of the use, the nature of the work, the amount used, and the effect on the work’s market is considered. For a meme to be considered Fair Use, it must add commentary, criticism, or parody in a way that transforms the original work, per Campbell v. Acuff-Rose, Inc., 510 U.S. 569 (1994). If your meme repackaged content and made use of copyrighted content without critiquing or transforming the original work in a meaningful way, it was probably infringing copyright!"
      />
    </div>
  );
};