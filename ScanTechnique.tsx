import React from 'react';
import { Zap, Hexagon, Layers, Maximize } from 'lucide-react';
import { SEO } from './SEO';

export const ScanTechnique = () => {
    return (
        <div className="pt-28 px-6 max-w-7xl mx-auto min-h-screen pb-20 animate-fade-in-up">
            <SEO title="Scantechniek & Acquisitie" description="Optimalisatie van acquisitie-protocollen voor SPECT en PET beeldvorming." />
            
            <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center border border-purple-100 shadow-sm">
                    <Zap size={32} />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-jakarta">Scantechniek<span className="text-purple-500">.</span></h1>
                    <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">NG Academie // Acquisitie protocollen</p>
                </div>
            </div>

            <div className="bg-slate-900 text-white rounded-[3rem] overflow-hidden mb-12 shadow-xl border border-slate-800">
                <div className="p-10 md:p-16 lg:p-20 relative">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                     <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Maximize size={14} /> Beeldvormende Apparatuur
                     </span>
                     <h2 className="text-3xl md:text-5xl font-black font-jakarta mb-6 leading-tight max-w-3xl">Van Gamma-Foton tot Digitale Pixel</h2>
                     <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mb-8">
                         Leer de fysieke principes, collimatorkeuze en reconstructie-algoritmes begrepen om de hoogste resolutie te combineren met de laagst acceptabele stralingsdosis.
                     </p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                             <Hexagon className="text-purple-400 mb-4" size={24} />
                             <h4 className="font-bold mb-2">Gammacamera (SPECT)</h4>
                             <p className="text-xs text-slate-400 leading-relaxed">NaI(Tl) kristallen of CZT solid-state detectoren voor single-photon acquisitie. Vereist fysische collimatie.</p>
                         </div>
                         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                             <Layers className="text-blue-400 mb-4" size={24} />
                             <h4 className="font-bold mb-2">Geïntegreerde ToF PET</h4>
                             <p className="text-xs text-slate-400 leading-relaxed">Detectie van 511 keV annihilatie-fotonen in coïncidentie. Gebruik van Time-of-Flight verhoogt resolutie.</p>
                         </div>
                         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md opacity-50 relative">
                             <div className="absolute inset-0 flex items-center justify-center p-4">
                                 <span className="bg-black/80 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">Module Loading...</span>
                             </div>
                             <h4 className="font-bold mb-2">Reconstructie</h4>
                             <p className="text-xs text-slate-400 leading-relaxed">Iteratieve OSEM, attenuatiecorrectie (CT) en PSF integratie. Wordt later toegevoegd aan het portaal.</p>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
