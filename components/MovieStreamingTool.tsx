import React, { useState, useEffect } from 'react';
import { Play, Star, Info, Cast, Wifi, ShieldAlert } from 'lucide-react';
import { Button } from './ui/Button';
import { InterceptModal } from './InterceptModal';
import { SimulationStatus } from '../types';

export const MovieStreamingTool: React.FC = () => {
  const [status, setStatus] = useState<SimulationStatus>(SimulationStatus.IDLE);
  const [bufferPercent, setBufferPercent] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const movies = [
    { title: "Wicked", rating: "4.8", quality: "4K UHD", year: "2024", img: "https://picsum.photos/seed/wicked/300/450" },
    { title: "Moana 2", rating: "4.7", quality: "HD Cam", year: "2024", img: "https://picsum.photos/seed/moana/300/450" },
    { title: "Sonic the Hedgehog 3", rating: "4.9", quality: "1080p", year: "2024", img: "https://picsum.photos/seed/sonic/300/450" },
    { title: "Mufasa: The Lion King", rating: "4.6", quality: "WEBRip", year: "2024", img: "https://picsum.photos/seed/mufasa/300/450" },
    { title: "Nosferatu", rating: "4.5", quality: "4K HDR", year: "2024", img: "https://picsum.photos/seed/nosferatu/300/450" },
  ];

  const startStream = () => {
    setStatus(SimulationStatus.PROCESSING);
    setBufferPercent(0);
  };

  useEffect(() => {
    let interval: number;
    if (status === SimulationStatus.PROCESSING) {
      const texts = [
        "Resolving magnet link...",
        "Connecting to peers (24/50)...",
        "Bypassing geo-restrictions...",
        "Buffering stream...",
      ];
      
      let step = 0;
      
      interval = window.setInterval(() => {
        setBufferPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus(SimulationStatus.INTERCEPTED);
            return 100;
          }
          
          // Update text based on progress roughly
          if (prev < 20) setLoadingText(texts[0]);
          else if (prev < 40) setLoadingText(texts[1]);
          else if (prev < 60) setLoadingText(texts[2]);
          else setLoadingText(texts[3]);

          return prev + (Math.random() * 15);
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [status]);

  const reset = () => {
    setStatus(SimulationStatus.IDLE);
    setBufferPercent(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#141414] rounded-lg border border-slate-800 shadow-2xl overflow-hidden relative font-sans text-white">
      {/* Fake App Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center space-x-2 text-red-600 font-bold tracking-tighter text-xl">
          <Play fill="currentColor" size={24} />
          <span>POPCORN<span className="text-white">FLIX</span></span>
        </div>
        <div className="flex space-x-6 text-sm font-medium text-slate-400">
          <span className="text-white border-b-2 border-red-600 pb-4 -mb-4">Movies</span>
          <span className="hover:text-white cursor-pointer">TV Shows</span>
          <span className="hover:text-white cursor-pointer">Anime</span>
          <span className="hover:text-white cursor-pointer">VPN: Off</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gladiator2/1200/600')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase tracking-wider mb-3 inline-block">
            #1 Trending
          </span>
          <h1 className="text-5xl font-black mb-2 leading-tight">GLADIATOR II</h1>
          <div className="flex items-center space-x-3 text-sm text-gray-300 mb-4">
            <span className="text-green-400 font-bold">98% Match</span>
            <span>2024</span>
            <span className="border border-gray-500 px-1 rounded text-xs">R</span>
            <span>2h 28m</span>
            <span className="bg-gray-800 px-1 rounded text-xs text-gray-200 border border-gray-600">4K Ultra HD</span>
          </div>
          <p className="text-gray-300 mb-6 line-clamp-2">
            Decades after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors.
          </p>
          <div className="flex space-x-3">
            <button 
              onClick={startStream}
              disabled={status !== SimulationStatus.IDLE}
              className="bg-white text-black px-8 py-2.5 rounded font-bold flex items-center hover:bg-gray-200 transition-colors"
            >
              <Play fill="black" size={20} className="mr-2" />
              Watch Free
            </button>
            <button className="bg-gray-600/60 backdrop-blur-sm text-white px-6 py-2.5 rounded font-bold flex items-center hover:bg-gray-600/80 transition-colors">
              <Info size={20} className="mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Trending Grid */}
      <div className="p-8">
        <h3 className="text-lg font-bold mb-4 text-gray-200">Popular on PirateNet</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {movies.map((movie, i) => (
            <div 
              key={i} 
              className="group relative aspect-[2/3] bg-gray-800 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 ring-2 ring-transparent hover:ring-red-600"
              onClick={startStream}
            >
              <img src={movie.img} alt={movie.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              
              {/* Quality Badge */}
              <div className="absolute top-2 right-2 bg-black/80 text-xs px-1.5 py-0.5 rounded text-red-500 font-bold border border-red-500/30">
                {movie.quality}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                 <div className="flex items-center space-x-2 mb-1">
                   <div className="bg-white rounded-full p-1.5">
                     <Play fill="black" size={12} className="text-black" />
                   </div>
                   <span className="font-bold text-xs">Play Now</span>
                 </div>
                 <h4 className="font-bold leading-tight text-sm">{movie.title}</h4>
                 <div className="flex justify-between items-center mt-1">
                   <span className="text-xs text-green-400">{movie.rating} Match</span>
                   <span className="text-xs text-gray-400">{movie.year}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streaming Simulation Overlay */}
      {status === SimulationStatus.PROCESSING && (
        <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center font-mono">
           <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-8"></div>
           <div className="text-red-500 font-bold text-xl mb-2 animate-pulse">{loadingText}</div>
           <div className="w-64 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${bufferPercent}%` }}></div>
           </div>
           <div className="mt-4 flex items-center space-x-2 text-gray-500 text-xs">
              <Wifi size={14} />
              <span>P2P Swarm: 142 seeds / 508 peers</span>
           </div>
        </div>
      )}

      <InterceptModal 
        isOpen={status === SimulationStatus.INTERCEPTED}
        onClose={reset}
        title="Unlawful Public Performance"
        hook="Streaming unlicensed copyrighted movies violates the copyright holder's exclusive rights."
        analysis="Whether via a 'free' streaming site or a torrent stream, accessing this content without payment or license creates a digital copy that infringes on federal law. The act of streaming can constitute an unauthorized public performance or reproduction depending on the technology used."
      />
    </div>
  );
};