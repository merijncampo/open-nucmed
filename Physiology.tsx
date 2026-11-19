import React from 'react';
import { Activity, Beaker, Hexagon, Network } from 'lucide-react';
import { SEO } from './SEO';

export const Physiology = () => {
    return (
        <div className="pt-28 px-6 max-w-7xl mx-auto min-h-screen pb-20 animate-fade-in-up">
            <SEO title="Fysiologie & Celmetabolisme" description="Gedetailleerde analyse van biologische processen in de nucleaire geneeskunde." />
            
            <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center border border-blue-100 shadow-sm">
                    <Activity size={32} />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-jakarta">Fysiologie<span className="text-blue-500">.</span></h1>
                    <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">NG Academie // Celmetabolisme</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-black text-slate-900 mb-6 font-jakarta">Functie Boven Anatomie</h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
                            Binnen de nucleaire geneeskunde maken we gebruik van de normale fysiologie van het menselijk lichaam. Door radioactieve isotopen te binden aan biologisch actieve moleculen (tracers), kunnen we celprocessen non-invasief in beeld brengen.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-slate-600 border-l-4 border-l-blue-500">
                            "Waar radiologie de structuur toont, toont de nucleaire geneeskunde de biologische activiteit. Wij zien de ziekte vaak voordat een anatomische verandering zichtbaar is."
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-blue-300 transition-colors">
                             <Hexagon className="text-blue-500 mb-4" size={28} />
                             <h3 className="font-bold text-slate-900 mb-2">Glucose Metabolisme</h3>
                             <p className="text-sm text-slate-500 leading-relaxed list-disc">
                                <strong>FDG:</strong> Kankercellen hebben een verhoogde behoefte aan glucose (Warburg-effect). FDG lift hierop mee maar wordt gelockt in de cel, waardoor we tumoren kunnen lokaliseren.
                             </p>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-emerald-300 transition-colors">
                             <Network className="text-emerald-500 mb-4" size={28} />
                             <h3 className="font-bold text-slate-900 mb-2">Receptor Expressie</h3>
                             <p className="text-sm text-slate-500 leading-relaxed list-disc">
                                <strong>PSMA/Somatostatine:</strong> Aan specifieke eiwitten (peptiden) op het buitenoppervlak van cellen binden radioliganden die als een 'sleutel in het slot' passen.
                             </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                     <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2"><Beaker size={14}/> Celbiologie Diepte-module</h4>
                          <h3 className="text-xl font-bold font-jakarta mb-4">Metabolische Pathways & Kinetiek</h3>
                          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                              De volledige module over compartimentele modellering en tracer-kinetiek is momenteel in ontwikkeling voor iteratie 2.6 van het leerplein.
                          </p>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                               <div className="bg-blue-500 h-2 rounded-full w-[45%] animate-pulse"></div>
                          </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
