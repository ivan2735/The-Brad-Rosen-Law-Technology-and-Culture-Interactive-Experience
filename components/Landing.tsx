import React from 'react';
import { AlertTriangle, ArrowDown } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-red-400 font-mono text-sm mb-4 animate-fade-in-up">
            <AlertTriangle size={16} />
            <span className="tracking-wide uppercase">Educational Simulation</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">
          Everything you are <br className="hidden md:block"/> about to do is <span className="text-red-600 underline decoration-red-900/50 decoration-4 underline-offset-8">illegal</span>.
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A series of experiential learning modules showcasing how the law intersects with technology and our social practices (culture). Use the tools below to see how easy it is to break the law without realizing it.
        </p>

        <div className="pt-8">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-white font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-slate-900 hover:bg-slate-200"
          >
            Start the Experience
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            <div className="absolute -inset-3 rounded-xl bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};