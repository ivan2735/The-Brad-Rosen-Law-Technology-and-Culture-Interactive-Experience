import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-slate-500 text-sm leading-relaxed text-center">
          <strong className="text-slate-300">Disclaimer:</strong> This is an educational project designed to illustrate common legal pitfalls. No actual files are processed, recorded, or downloaded. No laws are being broken by using this simulation.
        </p>
        <p className="mt-4 text-slate-700 text-xs font-mono text-center">
          © 2025 The Brad Rosen Law, Technology, & Culture Interactive Experience. Created by Ivan Sun and Patrick Kobramasihi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};