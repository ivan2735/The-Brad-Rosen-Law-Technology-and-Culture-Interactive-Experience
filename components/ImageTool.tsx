import React, { useState } from 'react';
import { Download, Search, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const ImageTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);

  const handleDownload = () => {
    setStatus(SimulationStatus.PROCESSING);
    // Faster timeout for this one, 1.5s
    setTimeout(() => {
        setStatus(SimulationStatus.INTERCEPTED);
    }, 1500);
  };

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
  };

  const images = [
    'https://picsum.photos/seed/1/300/200',
    'https://picsum.photos/seed/2/300/200',
    'https://picsum.photos/seed/3/300/200',
    'https://picsum.photos/seed/4/300/200',
    'https://picsum.photos/seed/5/300/200',
    'https://picsum.photos/seed/6/300/200',
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden relative">
      {/* Fake Browser Header */}
      <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center space-x-4">
        <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-1.5 text-sm text-slate-600 flex items-center shadow-sm">
            <Search size={14} className="mr-2 text-slate-400" />
            <span>cool wallpaper designs 4k</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 bg-slate-50">
         {/* Fake Search Filters */}
         <div className="flex space-x-4 mb-6 text-sm text-slate-500 border-b border-slate-200 pb-2">
            <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2 -mb-2.5">Images</span>
            <span className="cursor-pointer hover:text-slate-800">News</span>
            <span className="cursor-pointer hover:text-slate-800">Videos</span>
            <span className="cursor-pointer hover:text-slate-800">Shopping</span>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {images.map((src, i) => (
                <div key={i} className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-200 shadow-sm cursor-pointer">
                    <img src={src} alt="Result" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-white p-1.5 rounded shadow">
                            <ImageIcon size={14} className="text-slate-700" />
                         </div>
                    </div>
                </div>
            ))}
         </div>

         <div className="flex justify-end pt-4 border-t border-slate-200">
            <Button 
                onClick={handleDownload} 
                disabled={status !== SimulationStatus.IDLE}
                className={`flex items-center space-x-2 ${status === SimulationStatus.PROCESSING ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
                {status === SimulationStatus.PROCESSING ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Zipping Files...</span>
                    </>
                ) : (
                    <>
                        <Download size={18} />
                        <span>Download All Results</span>
                    </>
                )}
            </Button>
         </div>
      </div>

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Publicly Accessible ≠ Public Domain"
        hook="Search engine results are not licenses. Just because an image appears in Google Images does not mean it is in the public domain."
        analysis="Downloading and using these assets for your own projects without verifying the license is copyright infringement. Copyright protection exists from the moment of creation, and search engines merely index content; they do not grant rights to use it."
      />
    </div>
  );
};