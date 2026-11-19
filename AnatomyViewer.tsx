
import React, { useState } from 'react';
import { ChevronRight, Info, Search, ShieldCheck, Target, Activity, Zap, Beaker, Globe, Microscope, FileText } from 'lucide-react';

interface BodyPart {
  id: string;
  name: string;
  description: string;
  isotopes: { name: string; energy: string; halfLife: string }[];
  clinicalFocus: { title: string; desc: string }[];
  protocol: string;
  source: string;
  funFact: string;
}

const BODY_PARTS: BodyPart[] = [
    { 
        id: 'brain', 
        name: 'Cerebrum', 
        description: 'Neuro-imaging gericht op neurotransmitter-expressie en cellulair metabolisme in het CZS.', 
        isotopes: [
            { name: '123I-Ioflupane', energy: '159 keV', halfLife: '13.2h' },
            { name: '18F-FDG', energy: '511 keV', halfLife: '110m' },
            { name: '99mTc-HMPAO', energy: '140 keV', halfLife: '6h' }
        ], 
        clinicalFocus: [
            { title: 'Presynaptische Degeneratie', desc: 'Evaluatie van de dopaminerge integriteit (DaTSCAN) conform EANM richtlijnen.' },
            { title: 'Neurodegeneratie', desc: 'Differentiatie van dementietypen via FDG-metabolisme.' },
            { title: 'Ictale Focus', desc: 'SPECT-perfusie analyse bij refractaire epilepsie.' }
        ],
        protocol: 'Min. 6u nuchter (bij FDG), rustruimte-isolatie (45-60 min).',
        source: 'Ref: EANM Procedural Guidelines PET Brain',
        funFact: 'De hersenen verbruiken 20% van de dagelijkse glucose-inname.'
    },
    { 
        id: 'thyroid', 
        name: 'Thyreoidea', 
        description: 'Functionele evaluatie van de jodium-metabole as en hyperplasie-diagnostiek.', 
        isotopes: [
            { name: '123I', energy: '159 keV', halfLife: '13.2h' },
            { name: '99mTc-Pertech', energy: '140 keV', halfLife: '6h' }
        ], 
        clinicalFocus: [
            { title: 'Nodus Autonomie', desc: 'Identificatie van toxische adenomen vs. koude nodi.' },
            { title: 'Graves Differentiatie', desc: 'Kwantificering van diffuse uptake bij hyperthyreoïdie.' },
            { title: 'Hyperparathyreoïdie', desc: 'Lokalisatie van adenomen via MIBI-scintigrafie.' }
        ],
        protocol: 'Stop jodiumhoudende medicatie (4wk), stop schildklierhormoon (2-4wk).',
        source: 'Ref: ATA/EANM Thyroid Standards',
        funFact: 'Schildkliercellen gebruiken de NIS-pomp voor actief jodiumtransport.'
    },
    { 
        id: 'heart', 
        name: 'Myocard', 
        description: 'Assessment van myocardperfusie-reservatrie en cardiale innervatie.', 
        isotopes: [
            { name: '99mTc-Tetrofosmin', energy: '140 keV', halfLife: '6h' },
            { name: '123I-MIBG', energy: '159 keV', halfLife: '13.2h' }
        ], 
        clinicalFocus: [
            { title: 'Ischemische Cascade', desc: 'Detectie van flow-reductie tijdens stress.' },
            { title: 'Viapathie', desc: 'Onderscheid tussen hibernating myocard en infarct.' },
            { title: 'Innervatie', desc: 'Risico-stratificatie bij hartfalen via MIBG.' }
        ],
        protocol: 'Min. 24u cafeïne-vrij (blokkeert adenosine-receptoren).',
        source: 'Ref: ASNC/EANM MPI Guidelines',
        funFact: 'SPECT-MPI heeft een negatief voorspellende waarde van >95%.'
    },
    { 
        id: 'bones', 
        name: 'Skelet', 
        description: 'Scintigrafische visualisatie van osteoblastaire activiteit en minerale turnover.', 
        isotopes: [
            { name: '99mTc-HDP/MDP', energy: '140 keV', halfLife: '6h' },
            { name: '18F-NaF', energy: '511 keV', halfLife: '110m' }
        ], 
        clinicalFocus: [
            { title: 'Metastatische Screening', desc: 'Systeem-brede evaluatie van botaanmaak.' },
            { title: 'Inflammatoire Respons', desc: 'Diagnostiek naar protheseloslating en infectie.' },
            { title: 'Stress-pathologie', desc: 'Vroege detectie van micro-trabeculaire fracturen.' }
        ],
        protocol: 'Hydratatie (>1L water) post-injectie ter verlaging achtergrond.',
        source: 'Ref: NVNG Richtlijn Skeletscintigrafie',
        funFact: 'Botscans tonen activiteit weken vóór röntgenologische veranderingen.'
    }
];

export const AnatomyViewer: React.FC = () => {
    const [selectedPart, setSelectedPart] = useState<BodyPart>(BODY_PARTS[0]);

    return (
        <div className="pt-20 md:pt-24 min-h-screen bg-white font-jakarta">
            {/* Header / Nav Rail */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-8 md:mb-16 flex items-center justify-between border-b border-slate-100 pb-8 md:pb-12">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-md">
                        {/* Fix: Lucide icons do not support responsive props like md:size. Use className for responsive dimensions. */}
                        <Microscope className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">Diagnostic Atlas</h1>
                        <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">NG Student // v2.5</p>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-12 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Globe size={14}/> EANM Sync</span>
                    <span className="flex items-center gap-2"><ShieldCheck size={14}/> Peer Reviewed</span>
                </div>
            </div>

            {/* Split Screen Hero Area -> Refactored to Premium Banner */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-16 md:mb-24 animate-fade-in-up">
                <div className="relative w-full rounded-[3.5rem] overflow-hidden border border-slate-200 shadow-lg min-h-[400px] md:min-h-[500px] flex items-center">
                    {/* Background Image */}
                    <img 
                        src="/skeleton.png" 
                        alt="Radiologische Anatomie" 
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    
                    {/* Tekst Content */}
                    <div className="relative z-10 p-8 md:p-16 lg:p-20 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6 w-max backdrop-blur-md">
                            <Activity size={14} /> Anatomie Model
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-black text-white mb-6 font-jakarta tracking-tight leading-tight">
                            Radiologische <br className="hidden md:block" />
                            <span className="text-[#6FAEF7]">Anatomie</span>.
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-lg mb-8">
                            Gedetailleerde analyse van fysiologische structuren en axiale topografie voor accuraat nucleair diagnostisch onderzoek.
                        </p>
                        <ul className="space-y-4 mb-4">
                            {[
                                "Identificatie van botstructuren",
                                "Viapathie & Orgaanperfusie",
                                "Lokalisatie van Pathologie"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-200 font-medium">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
                                        <ChevronRight size={12} strokeWidth={3} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20">
                
                {/* Horizontal Nav for Mobile / Vertical for Desktop */}
                <div className="lg:col-span-3 space-y-1 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible">
                    <span className="hidden lg:block text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10">Selectie Systeem</span>
                    <div className="flex lg:flex-col gap-2 md:gap-0 min-w-max lg:min-w-0">
                        {BODY_PARTS.map((part) => (
                            <button
                                key={part.id}
                                onClick={() => setSelectedPart(part)}
                                className={`flex items-center justify-between px-4 lg:px-0 py-3 lg:py-6 lg:border-b border-slate-50 transition-all duration-500 rounded-xl lg:rounded-none whitespace-nowrap ${
                                    selectedPart.id === part.id 
                                    ? 'bg-slate-900 lg:bg-transparent text-white lg:text-slate-900 lg:pl-6' 
                                    : 'bg-slate-50 lg:bg-transparent text-slate-400 lg:text-slate-200 lg:pl-0'
                                }`}
                            >
                                <span className={`text-sm lg:text-xl font-black transition-all ${
                                    selectedPart.id === part.id ? 'lg:scale-110' : ''
                                }`}>
                                    {part.name}
                                </span>
                                {selectedPart.id === part.id && (
                                    <div className="hidden lg:block w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Viewport */}
                <div className="lg:col-span-9 animate-fade-in-up pb-12 md:pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-20">
                        
                        {/* Technical Description & Focus */}
                        <div className="md:col-span-7 space-y-8 md:space-y-16">
                            <div className="relative">
                                <span className="hidden lg:block absolute -left-12 top-2 text-[10px] font-mono text-slate-300 rotate-90 origin-right">DATASET_REF</span>
                                <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4 md:mb-8 leading-none">{selectedPart.name}</h2>
                                <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                                    {selectedPart.description}
                                </p>
                            </div>

                            <div className="space-y-6 md:space-y-10">
                                <h4 className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] md:tracking-[0.4em] flex items-center gap-3 md:gap-4">
                                    <Target size={14} strokeWidth={3} className="text-blue-600" /> Klinische Focus
                                </h4>
                                <div className="grid grid-cols-1 gap-3 md:gap-4">
                                    {selectedPart.clinicalFocus.map((focus, i) => (
                                        <div key={i} className="p-5 md:p-8 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 transition-all group">
                                            <h5 className="font-black text-sm md:text-base text-slate-900 mb-1 flex items-center gap-2">
                                                <ChevronRight size={14} className="text-blue-500" />
                                                {focus.title}
                                            </h5>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium ml-6 leading-relaxed">{focus.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lab Data & Reference Rail */}
                        <div className="md:col-span-5 space-y-6 md:space-y-10">
                            <div className="bg-slate-900 p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-sm relative overflow-hidden">
                                <h4 className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 md:mb-10">Isotoop Specs</h4>
                                <div className="space-y-4 md:space-y-8">
                                    {selectedPart.isotopes.map((iso, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 md:pb-6">
                                            <div>
                                                <span className="block text-sm md:text-base font-black text-white">{iso.name}</span>
                                                <span className="text-[8px] md:text-[9px] text-slate-500 font-mono uppercase">Photon Spec</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-xs md:text-sm font-mono font-bold text-blue-400">{iso.energy}</span>
                                                <span className="text-[8px] md:text-[9px] text-slate-500 font-mono">T½: {iso.halfLife}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-8 md:mt-20 pt-6 md:pt-10 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 md:mb-4">
                                        <Beaker size={12} /> Protocol
                                    </div>
                                    <p className="text-[10px] md:text-xs text-slate-300 font-medium leading-relaxed italic border-l-2 border-blue-500/50 pl-4 md:pl-6">
                                        "{selectedPart.protocol}"
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100">
                                <h4 className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Bibliografie</h4>
                                <p className="text-xs md:text-sm font-black text-slate-900 mb-3">
                                    {selectedPart.source}
                                </p>
                                <p className="text-[10px] md:text-[11px] text-slate-400 leading-relaxed italic">
                                    "{selectedPart.funFact}"
                                </p>
                            </div>

                            <div className="px-4 text-center">
                                <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
                                    “Dit is geen medisch advies. Raadpleeg altijd een arts.”
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
