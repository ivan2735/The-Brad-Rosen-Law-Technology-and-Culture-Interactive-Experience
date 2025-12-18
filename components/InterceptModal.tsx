import React, { useEffect, useState } from 'react';
import { X, ShieldAlert, Gavel, Scale } from 'lucide-react';

interface InterceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hook: string;
  analysis: string;
}

export const InterceptModal: React.FC<InterceptModalProps> = ({ isOpen, onClose, title, hook, analysis }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-red-950/60 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-2xl bg-[#0f172a] shadow-2xl rounded-lg border border-red-900/50 flex flex-col max-h-[90vh] transform transition-all duration-300 ${
          showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="bg-red-950/30 px-6 py-4 border-b border-red-900/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3 text-red-500">
            <ShieldAlert size={24} className="animate-pulse" />
            <span className="font-mono font-bold uppercase tracking-wider text-sm">Action Intercepted</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          
          {/* Main Title */}
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
             <Gavel className="text-red-600" size={32} />
             {title}
          </h2>

          {/* The Hook */}
          <div className="bg-red-500/10 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
             <p className="text-xl font-bold text-red-200 leading-relaxed text-left">
               {hook}
             </p>
          </div>

          {/* Legal Analysis */}
          <div className="space-y-3">
             <div className="flex items-center space-x-2 text-tech-accent mb-2">
                <Scale size={18} />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">Legal Analysis</span>
             </div>
             <div className="bg-slate-900/80 rounded-lg p-6 border border-slate-700/50 shadow-inner">
                <div 
                  className="font-mono text-sm text-slate-300 leading-7 text-left"
                  dangerouslySetInnerHTML={{ __html: analysis }}
                />
             </div>
          </div>
          
        </div>

        {/* Footer */}
        <div className="bg-slate-900/50 px-6 py-4 flex justify-end border-t border-slate-800 flex-shrink-0 rounded-b-lg">
          <button 
            onClick={onClose}
            className="bg-red-600 text-white px-8 py-2.5 rounded font-bold uppercase tracking-wide hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/20 text-sm"
          >
            Acknowledge & Reset
          </button>
        </div>
      </div>
    </div>
  );
};