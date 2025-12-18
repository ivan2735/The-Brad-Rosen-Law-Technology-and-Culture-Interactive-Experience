import React, { useRef, useState } from 'react';
import { Landing } from './components/Landing';
import { PasswordShareTool } from './components/PasswordShareTool';
import { ScraperTool } from './components/ScraperTool';
import { KaraokeTool } from './components/KaraokeTool';
import { MemeTool } from './components/MemeTool';
import { ThreatTool } from './components/ThreatTool';
import { DefamationTool } from './components/DefamationTool';
import { LocationTool } from './components/LocationTool';
import { UnlockTool } from './components/UnlockTool';
import { NetNeutralityTool } from './components/NetNeutralityTool';
import { Footer } from './components/Footer';
import { Key, Database, Music, Image as ImageIcon, MessageCircleWarning, UserX, MapPin, Smartphone, Zap, Gavel } from 'lucide-react';

const SyllabusOverlay = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] bg-white text-black font-serif p-8 overflow-auto animate-in fade-in duration-300">
    <div className="max-w-3xl mx-auto border border-black p-12 shadow-none min-h-[80vh] flex flex-col text-left">
      <h1 className="text-3xl font-bold text-center mb-2">Yale Law, Technology, & Culture</h1>
      <h2 className="text-xl text-center mb-8 border-b border-black pb-4">Fall 2025 Syllabus</h2>
      
      <div className="space-y-6 text-lg leading-relaxed flex-1">
        <p><strong>Instructor:</strong> Brad Rosen</p>
        <p><strong>Course Description:</strong> This course explores the complex interaction between law, technology, and culture.</p>
        
        <div className="py-24 text-center">
           <p className="mb-4 text-sm text-gray-500 uppercase tracking-widest font-sans font-bold">Project Access</p>
           <a 
             href="https://youtu.be/dQw4w9WgXcQ?si=mtHWznQPHjgw6Vn4" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-blue-700 underline hover:text-blue-900 font-bold text-2xl"
           >
             [REAL FINAL PROJECT]
           </a>
        </div>
      </div>
      
      <button 
        onClick={onClose}
        className="mt-12 text-sm text-gray-500 underline hover:text-black block mx-auto font-sans"
      >
        Return to Experience
      </button>
    </div>
  </div>
);

type TabId = 'password' | 'scraper' | 'karaoke' | 'meme' | 'threat' | 'defamation' | 'location' | 'unlock' | 'net';

const App: React.FC = () => {
  const toolsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>('password');
  const [showSyllabus, setShowSyllabus] = useState(false);

  const scrollToTools = () => {
    toolsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { id: 'password', label: 'Password Sharing', icon: Key },
    { id: 'scraper', label: '"Top" List Generator', icon: Database },
    { id: 'karaoke', label: 'Karaoke Maker', icon: Music },
    { id: 'meme', label: 'Meme Generator', icon: ImageIcon },
    { id: 'threat', label: 'Message Threat', icon: MessageCircleWarning },
    { id: 'defamation', label: 'Defamation Sim', icon: UserX },
    { id: 'location', label: 'Location Tracker', icon: MapPin },
    { id: 'unlock', label: 'Phone Unlock', icon: Smartphone },
    { id: 'net', label: 'ISP Paid Priority Access', icon: Zap },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-red-500/30">
      
      {showSyllabus && <SyllabusOverlay onClose={() => setShowSyllabus(false)} />}

      <Landing onStart={scrollToTools} />

      <main ref={toolsRef} className="max-w-6xl mx-auto px-6 py-12 md:py-24 min-h-[800px]">
        
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-400 font-sans tracking-tight">Select a Simulation Module</h2>
            {/* auto-rows-fr forces cards to the same height */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-fr">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabId)}
                        className={`
                            group relative flex flex-col justify-between items-center p-6 rounded-2xl transition-all duration-300
                            backdrop-blur-md overflow-hidden shadow-lg h-full
                            ${isActive 
                            ? 'bg-white/20 border border-white/50 scale-105 ring-2 ring-white shadow-white/10' 
                            : 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:shadow-xl'
                            }
                        `}
                        >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="flex-1 flex items-center justify-center w-full">
                           <Icon size={32} className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider text-center text-white transition-colors duration-300 mt-4 leading-tight`}>{tab.label}</span>
                        </button>
                    );
                })}

                <button
                    onClick={() => setShowSyllabus(true)}
                    className="group relative flex flex-col justify-between items-center p-6 rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/20 bg-white/10 shadow-lg hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:shadow-xl hover:brightness-110 h-full"
                >
                     <div className="flex-1 flex items-center justify-center w-full">
                        <Gavel size={32} className="text-slate-300 group-hover:text-white transition-colors duration-300" />
                     </div>
                     <span className="text-[10px] leading-tight font-bold uppercase tracking-wider text-center text-white transition-colors duration-300 mt-4">
                        Made for Brad Rosen<br/>Yale Law, Technology, & Culture
                     </span>
                </button>
            </div>
        </div>

        <div className="bg-slate-900/50 p-6 md:p-12 rounded-3xl border border-slate-800 min-h-[600px] flex items-center justify-center relative backdrop-blur-sm shadow-2xl">
             <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'password' && <PasswordShareTool />}
                {activeTab === 'scraper' && <ScraperTool />}
                {activeTab === 'karaoke' && <KaraokeTool />}
                {activeTab === 'meme' && <MemeTool />}
                {activeTab === 'threat' && <ThreatTool />}
                {activeTab === 'defamation' && <DefamationTool />}
                {activeTab === 'location' && <LocationTool />}
                {activeTab === 'unlock' && <UnlockTool />}
                {activeTab === 'net' && <NetNeutralityTool />}
             </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;