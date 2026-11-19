
import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { 
  ArrowUpRight, Monitor, Database, Activity, Beaker, ShieldCheck, 
  BookOpen, Microscope, FileText, Truck, Building2, Package, Globe, 
  Brain, Zap, Scan, Layers, GraduationCap, ChevronRight, Atom, CheckCircle2, Award
} from 'lucide-react';

interface AcademyDashboardProps {
  onNavigate: (page: PageView) => void;
}

// Custom Hook for Gamification State
const useStudentProgress = () => {
    const [progress, setProgress] = useState<Record<string, number>>({});
    
    useEffect(() => {
        try {
            const stored = localStorage.getItem('ng_student_progress');
            if (stored) {
                setProgress(JSON.parse(stored));
            } else {
                // Initialize default dummy data to demonstrate Gamification
                const initial = { 
                    [PageView.ANATOMY]: 100, 
                    [PageView.DOSIMETRY_PHYSICS]: 60,
                    [PageView.SCAN_TECHNIQUE]: 25
                };
                localStorage.setItem('ng_student_progress', JSON.stringify(initial));
                setProgress(initial);
            }
        } catch (e) {
            console.error("Local storage not accessible", e);
        }
    }, []);

    // Helper function to render a progress bar
    const renderProgressBar = (moduleId: string) => {
        const percent = progress[moduleId] || 0;
        if (percent === 0) return null;
        
        const isComplete = percent === 100;
        return (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                 <div 
                    className={`h-full transition-all duration-1000 ease-out ${isComplete ? 'bg-emerald-400' : 'bg-blue-500'}`} 
                    style={{ width: `${percent}%` }}
                 />
            </div>
        );
    };

    const hasAnyProgress = Object.keys(progress).length > 0;
    
    // Quick overall score calc
    const totalModules = 6; // 3 fundamental + 3 clinical
    const overallScore = Math.round(Object.values(progress).reduce((a, b) => a + b, 0) / totalModules);

    return { progress, renderProgressBar, hasAnyProgress, overallScore };
};

// Logische groepering van de modules verplaatst naar buiten voor performance
const FUNDAMENTAL_MODULES = [
  {
    id: PageView.ANATOMY,
    icon: Brain,
    title: "Functionele Anatomie",
    description: "Biodistributie patronen en fysiologische uptake.",
    color: "text-pink-500",
    bg: "bg-pink-50"
  },
  {
    id: PageView.PHYSIOLOGY,
    icon: Activity,
    title: "Medische Fysiologie",
    description: "Celmetabolisme en biologische transportmechanismen.",
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    id: PageView.DOSIMETRY_PHYSICS,
    icon: Atom,
    title: "Dosimetrie & Fysica",
    description: "Vervalmodellen, stralingsbescherming en MIRD-calculaties.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  }
];

const CLINICAL_MODULES = [
  {
    id: PageView.HOTLAB,
    icon: Beaker,
    title: "Radiofarmacie",
    description: "GMP-productie, labeling en kwaliteitscontrole (QC).",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    id: PageView.SCAN_TECHNIQUE,
    icon: Scan,
    title: "Scantechniek",
    description: "Acquisitie-protocollen voor SPECT/CT en PET/CT.",
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    id: PageView.DIAGNOSTIC_ATLAS,
    icon: Layers,
    title: "Diagnostic Atlas",
    description: "Database van pathologieën en casuïstiek.",
    color: "text-cyan-500",
    bg: "bg-cyan-50"
  }
];

const SUPPLIERS = [
  { 
    name: "NRG (Petten)", 
    role: "Productie Mo-99 & Lu-177", 
    contact: "nrg.eu"
  },
  { 
    name: "Curium", 
    role: "SPECT Isotopen Distributie", 
    contact: "curium.com"
  },
  { 
    name: "BV Cyclotron VU", 
    role: "PET Tracers (F-18, Zr-89)", 
    contact: "cyclotron.nl"
  }
];

export const AcademyDashboard: React.FC<AcademyDashboardProps> = ({ onNavigate }) => {
  const { progress, renderProgressBar, hasAnyProgress, overallScore } = useStudentProgress();

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 px-4 md:px-8 max-w-[1500px] mx-auto min-h-screen bg-white font-jakarta animate-fade-in-up">
      
      {/* Academy Header */}
      <header className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between border-b border-slate-100 pb-12">
        <div className="max-w-4xl">
          {hasAnyProgress && (
              <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold flex w-max items-center gap-2 border border-blue-100 mb-6">
                  <Award size={16} /> {overallScore}% Algemene Voortgang
              </span>
          )}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-[0.9]">
            Student<br/>Leerplein<span className="text-blue-500">.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
            {hasAnyProgress 
                ? "Welkom terug, ga verder waar je was gebleven. Bekijk hieronder je referentiekader."
                : "Centrale hub voor nucleaire educatie. Van fundamentele fysica tot geavanceerde klinische simulaties."}
          </p>
        </div>
      </header>

      {/* SECTION 1: DE BASIS (Fundamentals) */}
      <section className="mb-16">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
            <div className="w-8 h-px bg-slate-300"></div> I. Fundamentele Wetenschappen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FUNDAMENTAL_MODULES.map((mod) => (
                <button 
                    key={mod.id}
                    onClick={() => onNavigate(mod.id)}
                    className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all text-left relative overflow-hidden"
                >
                    {renderProgressBar(mod.id)}
                    <h3 className="text-xl font-black text-slate-900 mb-2 font-jakarta flex items-center justify-between">
                        {mod.title}
                        {progress[mod.id] === 100 && <CheckCircle2 size={16} className="text-emerald-500" />}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{mod.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 group-hover:text-blue-500 transition-colors uppercase tracking-widest">
                            {progress[mod.id] > 0 && progress[mod.id] < 100 ? 'Hervatten' : 'Start Module'} <ArrowUpRight size={14} />
                        </div>
                        {progress[mod.id] > 0 && progress[mod.id] < 100 && (
                            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{progress[mod.id]}%</span>
                        )}
                    </div>
                </button>
            ))}
        </div>
      </section>

      {/* SECTION 2: DE KLINIEK (Practice) */}
      <section className="mb-16">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
            <div className="w-8 h-px bg-slate-300"></div> II. Klinische Toepassing & Techniek
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINICAL_MODULES.map((mod) => (
                <button 
                    key={mod.id}
                    onClick={() => onNavigate(mod.id)}
                    className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all text-left relative overflow-hidden"
                >
                    {renderProgressBar(mod.id)}
                    <h3 className="text-xl font-black text-slate-900 mb-2 font-jakarta flex items-center justify-between">
                        {mod.title}
                        {progress[mod.id] === 100 && <CheckCircle2 size={16} className="text-emerald-500" />}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{mod.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 group-hover:text-blue-500 transition-colors uppercase tracking-widest">
                            {progress[mod.id] > 0 && progress[mod.id] < 100 ? 'Hervatten' : 'Start Module'} <ArrowUpRight size={14} />
                        </div>
                        {progress[mod.id] > 0 && progress[mod.id] < 100 && (
                            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{progress[mod.id]}%</span>
                        )}
                    </div>
                </button>
            ))}
        </div>
      </section>

      {/* SECTION 3: SIMULATIE & TRAINING (Hero Feature) */}
      <section className="mb-24">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
            <div className="w-8 h-px bg-slate-300"></div> III. Praktijksimulatie
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PACS Simulator Card - Main Feature */}
            <button
                onClick={() => onNavigate(PageView.PACS_SIMULATOR)}
                className="lg:col-span-8 bg-slate-900 p-10 md:p-12 rounded-[3rem] text-left relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/10 transition-all"
            >
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mb-8">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Monitor size={12} /> Interactive
                         </div>
                         <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">PACS Workstation Simulator</h3>
                         <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
                             Oefen met het beoordelen van PET/CT en SPECT scans in een realistische digitale omgeving. Inclusief fusion-tools, window-leveling en SUV-metingen.
                         </p>
                    </div>
                    <div className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm group-hover:gap-5 transition-all">
                        Start Simulatie <ArrowUpRight />
                    </div>
                </div>
            </button>

            {/* Assessment / Quiz Card */}
            <button
                onClick={() => onNavigate(PageView.QUIZ)}
                className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-left hover:border-blue-100 hover:shadow-lg transition-all relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Kennisvalidatie</h3>
                        <p className="text-slate-500 font-medium">Toets uw kennis met 50+ examenvragen gebaseerd op de stof.</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scorebehoud lokaal</span>
                        <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>
            </button>
        </div>
      </section>

      {/* Footer Info / Suppliers */}
      <footer className="border-t border-slate-100 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                  <h4 className="font-black text-slate-900 mb-6">Logistieke mogelijkheden</h4>
                  <div className="space-y-4">
                      {SUPPLIERS.map((sup, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div>
                                  <span className="block font-bold text-slate-900 text-sm">{sup.name}</span>
                                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">{sup.role}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                  <div className="relative z-10">
                      <h4 className="font-black text-xl mb-4">Onderwijs Disclaimer</h4>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                          <CheckCircle2 size={14} /> Geautoriseerde Toegang
                      </div>
                  </div>
              </div>
          </div>
      </footer>

    </div>
  );
};
