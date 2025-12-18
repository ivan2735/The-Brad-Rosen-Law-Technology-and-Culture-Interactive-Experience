import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Video, Lock, Radio } from 'lucide-react';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const StreamTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: number;
    if (status === SimulationStatus.PROCESSING) {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
        if (seconds >= 2) {
           // Intercept after approx 2-3 seconds
           setStatus(SimulationStatus.INTERCEPTED);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, seconds]);

  const handleRecord = () => {
    if (status === SimulationStatus.IDLE) {
      setStatus(SimulationStatus.PROCESSING);
      setSeconds(0);
    }
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black rounded-lg border border-slate-800 shadow-2xl overflow-hidden relative group">
      {/* Video Player Header */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
         <div className="bg-red-600/20 text-red-500 px-2 py-1 rounded flex items-center space-x-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-red-500/30">
            <Radio size={12} className="animate-pulse" />
            <span>Live Stream</span>
         </div>
         <div className="text-slate-400 text-xs font-mono bg-black/50 px-2 py-1 rounded">
            HD 1080p • DRM PROTECTED
         </div>
      </div>

      {/* Main Video Area (Fake) */}
      <div className="aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/stream/800/450')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity"></div>
        <div className="z-10 bg-black/40 p-4 rounded-full border border-white/10 backdrop-blur-sm">
            <Play fill="white" className="text-white w-12 h-12 ml-1" />
        </div>
        
        {/* Fake Loading/Buffering Ring if needed, or just static for simplicity */}
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-900 p-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-6">
           <button className="text-slate-400 hover:text-white"><Pause size={20} /></button>
           <div className="h-1 w-32 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-red-600"></div>
           </div>
           <span className="text-xs text-slate-500 font-mono">LIVE</span>
        </div>

        <div className="flex items-center space-x-4">
             {status === SimulationStatus.PROCESSING && (
                 <div className="flex items-center space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-red-500 font-mono font-bold">{formatTime(seconds)}</span>
                 </div>
             )}

             <button 
                onClick={handleRecord}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
                    status === SimulationStatus.PROCESSING 
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20'
                }`}
                disabled={status !== SimulationStatus.IDLE}
             >
                {status === SimulationStatus.PROCESSING ? (
                    <>
                       <Square size={16} fill="currentColor" />
                       <span>Stop Rec</span>
                    </>
                ) : (
                    <>
                       <div className="w-4 h-4 rounded-full bg-white border-4 border-red-600"></div>
                       <span>REC Stream</span>
                    </>
                )}
             </button>
        </div>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="DMCA Violation Detected"
        hook="Recording this stream circumvents Digital Rights Management (DRM) protections."
        analysis="Under the Digital Millennium Copyright Act (DMCA), circumventing access controls—breaking the 'digital lock'—is a violation of federal law, regardless of whether you distribute the file."
      />
    </div>
  );
};