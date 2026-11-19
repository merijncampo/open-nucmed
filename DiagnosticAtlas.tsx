import React from 'react';
import { FileSearch, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { SEO } from './SEO';

export const DiagnosticAtlas = () => {
    return (
        <div className="pt-28 px-6 max-w-7xl mx-auto min-h-screen pb-20 animate-fade-in-up">
            <SEO title="Diagnostic Atlas" description="Interactieve database van nucleaire ziektebeelden en pathologie." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <FileSearch size={14} /> Casuïstiek Database
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 font-jakarta tracking-tight mb-6">
                        Diagnostic<br/>Atlas<span className="text-blue-500">.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl mb-8">
                        Binnenkort beschikbaar: de meest complete, onafhankelijke database van pathologische ziektebeelden en zeldzame casuïstiek, geverifieerd door klinische specialisten.
                    </p>
                    <div className="flex items-center gap-6 text-sm font-bold text-slate-400">
                        <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /> NVNG Geverifieerd</span>
                        <span className="flex items-center gap-2"><UserCheck size={18} className="text-blue-500" /> Peer Reviewed</span>
                    </div>
                </div>
                <div className="relative rounded-[3rem] overflow-hidden aspect-square border border-slate-200 bg-slate-900 group">
                     {/* Premium Banner Effect via skeleton.png */}
                     <img 
                        src="/skeleton.png" 
                        alt="Medical Scan Skeleton Preview" 
                        className="w-full h-full object-cover object-center opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 right-10">
                         <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                             <h4 className="text-white font-black font-jakarta mb-2">Alpha Release Q4 2026</h4>
                             <div className="w-full bg-white/20 rounded-full h-1.5 mb-4">
                                 <div className="bg-blue-400 h-1.5 rounded-full w-[65%]"></div>
                             </div>
                             <p className="text-slate-300 text-sm font-medium leading-relaxed">
                                Onze medische redactie bouwt momenteel de 3D DICOM viewer in deze module voor the studenten leerplein.
                             </p>
                         </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Oncologie (PET)', 'Cardiologie (SPECT)', 'Skelet & Benigne'].map((cat, i) => (
                     <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm opacity-50 grayscale">
                          <h4 className="font-bold text-slate-900 mb-2">{cat}</h4>
                          <p className="text-xs text-slate-500 mb-6">Database in opbouw. Inclusief gesegmenteerde scans en medische rapportages.</p>
                          <div className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                             In ontwikkeling <ArrowRight size={14} className="ml-2" />
                          </div>
                     </div>
                ))}
            </div>
        </div>
    );
};
