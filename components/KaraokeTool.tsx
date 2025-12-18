import React, { useState, useEffect } from 'react';
import { Upload, MicOff, Music } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const KaraokeTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [progress, setProgress] = useState(0);
  
  const startSimulation = () => {
    setStatus(SimulationStatus.PROCESSING);
    setProgress(0);
  };

  useEffect(() => {
    let interval: number;
    if (status === SimulationStatus.PROCESSING) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            setStatus(SimulationStatus.INTERCEPTED);
            return 99;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [status]);

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden relative">
      <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-pink-400 font-bold uppercase tracking-tight">
          <Music size={20} />
          <span>VocalRemover Pro</span>
        </div>
      </div>

      <div className="p-8 space-y-8 text-left font-sans text-slate-100">
        <p className="text-slate-400 text-sm">
           Upload a song to strip vocals and upload the instrumental to your YouTube karaoke channel.
        </p>

        <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center bg-slate-800/50">
             <div className="mx-auto w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <Upload size={24} className="text-slate-400" />
             </div>
             <p className="text-slate-300 font-medium">track_01_master.mp3</p>
             <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">4.2 MB • 320kbps</p>
        </div>

        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700">
             <div className="flex items-center space-x-3 text-left">
                 <MicOff size={20} className="text-slate-400" />
                 <span className="text-slate-300 font-medium">Remove Vocals</span>
             </div>
             <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
             </div>
        </div>

        {status === SimulationStatus.PROCESSING && (
           <div className="h-16 flex items-center justify-center space-x-1">
              {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-pink-500 animate-pulse" 
                    style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.05}s`
                    }} 
                  />
              ))}
           </div>
        )}
          
        <Button 
          fullWidth 
          onClick={startSimulation}
          disabled={status !== SimulationStatus.IDLE}
          className="uppercase tracking-widest py-4 font-bold"
        >
          {status === SimulationStatus.PROCESSING ? `Processing ${Math.round(progress)}%` : 'Generate Instrumental'}
        </Button>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Unauthorized Derivative Work"
        hook="Creating an instrumental without permission creates an unauthorized derivative work."
        analysis="<strong>Topic: Copyright</strong><br><br>By removing vocals from a song, you are reproducing the copyrighted sound recording and creating a derivative work under 17 U.S.C. §§ 103 and 106. U.S. copyright law exists to promote the progress of science and the arts by giving creators exclusive rights to their original works for a limited time (U.S. Const. art. I, § 8, cl. 8). Making a karaoke track counts as a derivative work. Only the copyright owner can authorize this. Even if your intent is harmless, the law treats substantial copying that substitutes for licensed versions as infringement. Furthermore, the law finds that karaoke tracks are generally illegal because they are not distinguishable enough from the original track, per Bridgeport v. Dimension Films 410 F.3d 792 (6th Cir. 2005)."
      />
    </div>
  );
};