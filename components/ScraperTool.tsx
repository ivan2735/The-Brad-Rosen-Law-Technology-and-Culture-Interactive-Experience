import React, { useState, useEffect } from 'react';
import { Database, CheckSquare, Clipboard } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const ScraperTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (status === SimulationStatus.PROCESSING) {
        const sequence = [
            "Analyzing target curation structure...",
            "Extracting creative ranking weights...",
            "Mapping selection methodology...",
            "Formatting for blog layout...",
            "Publishing stolen creative arrangement..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setLogs(prev => [...prev, sequence[i]]);
                i++;
            } else {
                clearInterval(interval);
                setStatus(SimulationStatus.INTERCEPTED);
            }
        }, 500);
        return () => clearInterval(interval);
    }
  }, [status]);

  const startScrape = () => {
    setLogs([]);
    setStatus(SimulationStatus.PROCESSING);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setLogs([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
       <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-400">
             <Database size={18} />
             <span className="font-bold tracking-tight uppercase">"Top" List Generator</span>
          </div>
          <div className="flex space-x-1.5">
             <div className="w-3 h-3 rounded-full bg-slate-600"></div>
             <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          </div>
       </div>

       <div className="p-6 space-y-6 text-left font-sans">
          <p className="text-slate-400 text-sm leading-relaxed">
            Search for custom, curated opinion lists based on creative weighting of factual metrics to republish on your monetized blog.
          </p>

          <div className="space-y-2">
             <label className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Target Source URL</label>
             <input type="text" defaultValue="https://curated-trends.com/hipster-city-rankings-2025" className="w-full bg-black border border-slate-700 p-3 text-white rounded focus:border-blue-500 focus:outline-none font-mono" />
          </div>

          <div className="flex items-center space-x-3 p-4 border border-slate-700 rounded bg-slate-800/50">
             <CheckSquare className="text-blue-500" size={20} />
             <span className="text-sm text-slate-300">Extract Original Creative Arrangement</span>
          </div>

          {status !== SimulationStatus.IDLE && (
              <div className="bg-black p-4 rounded border border-slate-800 h-40 overflow-hidden flex flex-col-reverse shadow-inner font-mono">
                 {logs.map((log, i) => (
                     <div key={i} className="text-xs text-green-500">
                        <span className="text-slate-600 mr-2">{`>`}</span>
                        {log}
                     </div>
                 ))}
              </div>
          )}

          <Button fullWidth onClick={startScrape} disabled={status !== SimulationStatus.IDLE} className="flex items-center justify-center gap-2 py-4 shadow-xl shadow-blue-900/10 uppercase tracking-widest font-bold">
             <Clipboard size={18} />
             <span>{status === SimulationStatus.PROCESSING ? 'Mirroring...' : 'Copy Curated Ranking'}</span>
          </Button>
       </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Copyright Violation"
        hook="Copying specific arrangements of facts can violate copyright law under 17 U.S.C. § 102."
        analysis="<strong>Topic: Digital Copyright</strong><br><br>By copying and sharing specific arrangements of facts, you may be infringing copyright under 17 U.S.C. § 102. U.S. copyright law exists to promote the progress of science and the arts by granting creators exclusive rights to their original works for a limited time (U.S. Const. art. I, § 8, cl. 8). In Feist v. Rural Telephone, 499 U.S. 340 (1991), the Supreme Court found that originality is required for protection; creative judgment in organizing data can be copyrighted. Copying another source’s curated ranking, even when the facts themselves are publicly available and uncopyrightable, can violate copyright, especially if you plan to share this list as your own original creation. While using other peoples’ lists may feel legal because the data from which it is derived is publicly available, copyright law protects the expression of these facts, illustrating a critical threshold."
      />
    </div>
  );
};