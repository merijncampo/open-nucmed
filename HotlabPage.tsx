
import React, { useState } from 'react';
import { Atom, FlaskConical, Zap, Repeat, ShieldAlert, ArrowDown, Database, Microscope, Syringe, Droplet, ArrowRight, Pipette, Timer, CheckCircle } from 'lucide-react';

export const HotlabPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'generator' | 'cyclotron'>('generator');

    return (
        <div className="pt-24 min-h-screen bg-white font-sans">
            <header className="max-w-7xl mx-auto px-6 py-12 border-b border-slate-100 animate-fade-in-up">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Radiofarmacie</span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Het Hotlab.</h1>
                <p className="text-xl text-slate-500 mt-4 max-w-2xl font-medium">GMP-gecertificeerde productie en kwaliteitscontrole van medische isotopen.</p>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 animate-fade-in-up-delay-1">
                
                {/* QC Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">Radiochemische Zuiverheid</h3>
                        <p className="text-sm text-slate-500">Via Instant Thin Layer Chromatography (ITLC) controleren we of de isotoop correct gebonden is aan het farmacon.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <ShieldAlert size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">Stralingshygiëne</h3>
                        <p className="text-sm text-slate-500">Personeel werkt met loden afscherming, pincetten en automatische injectiesystemen conform ALARA-richtlijnen.</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                            <Droplet size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">LAL & Steriliteit</h3>
                        <p className="text-sm text-slate-500">Elke batch wordt gecontroleerd op de afwezigheid van endotoxinen (LAL-test) en bacteriële contaminatie.</p>
                    </div>
                </div>

            {/* Main Interactive Section */}
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 animate-fade-in-up-delay-2">
                <div className="flex border-b border-slate-100">
                    <button 
                        onClick={() => setActiveSection('generator')}
                        className={`flex-1 py-6 text-sm md:text-base font-black uppercase tracking-wider transition-all duration-300 ${activeSection === 'generator' ? 'bg-slate-50 text-purple-600 border-b-4 border-purple-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'}`}
                    >
                        De Generator ("De Koe")
                    </button>
                    <button 
                        onClick={() => setActiveSection('cyclotron')}
                        className={`flex-1 py-6 text-sm md:text-base font-black uppercase tracking-wider transition-all duration-300 ${activeSection === 'cyclotron' ? 'bg-slate-50 text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'}`}
                    >
                        Het Cyclotron
                    </button>
                </div>

                    <div className="p-8 md:p-16">
                        {activeSection === 'generator' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <span className="text-purple-600 font-extrabold text-xs uppercase tracking-widest mb-2 block">Technetium-99m Elutie</span>
                                    <h2 className="text-4xl font-black text-slate-900 mb-6 font-jakarta">Isotoop Extractie</h2>
                                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                        Ziekenhuizen gebruiken een <strong>Molybdeen-Technetium generator</strong> om dagelijks vers Tc-99m (T½ = 6 uur) te verkrijgen. Het melken van de generator is een steriele handeling binnen een lood-afgeschermde omgeving.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4 text-purple-600 font-bold border border-purple-100">1</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Moederisotoop (Mo-99)</h4>
                                                <p className="text-sm text-slate-500">Molybdeen-99 (T½ = 66 uur) is geadsorbeerd aan een aluminiumoxide kolom.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4 text-purple-600 font-bold border border-purple-100">2</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Dochterisotoop (Tc-99m)</h4>
                                                <p className="text-sm text-slate-500">Door verval ontstaat Technetium-99m, dat minder sterk bindt aan de kolom.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="bg-white p-2 rounded-lg shadow-sm mr-4 text-purple-600 font-bold border border-purple-100">3</div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Elutie</h4>
                                                <p className="text-sm text-slate-500">Zoutoplossing (NaCl) spoelt het Technetium van de kolom in een vacuümvial (eluaat).</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[500px] w-full bg-slate-900 rounded-[2.5rem] border-8 border-white shadow-2xl relative overflow-hidden flex flex-col items-center py-12 select-none">
                                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-24 h-16 bg-white/10 rounded-t-xl border border-white/20 relative backdrop-blur-sm">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-blue-300">NaCl 0.9%</span>
                                            </div>
                                        </div>
                                        <div className="w-2 h-12 bg-slate-700 relative overflow-hidden">
                                            <div className="w-full h-full bg-blue-400 animate-[moveDown_1.5s_linear_infinite] opacity-50"></div>
                                        </div>
                                    </div>

                                    <div className="relative z-20 w-32 h-64 bg-slate-800 rounded-3xl border-2 border-slate-600 shadow-inner overflow-hidden flex flex-col items-center justify-center">
                                        <div className="absolute inset-x-4 top-1/3 h-1/3 border-y-2 border-dashed border-slate-600/50 flex items-center justify-center">
                                            <span className="text-slate-300 font-bold text-xs bg-slate-900 px-2 py-1 rounded text-center">Mo-99<br/>Matrix</span>
                                        </div>
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-purple-600 opacity-80 blur-[2px] animate-[flowGradient_3s_linear_infinite]"></div>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center mt-[-2px]">
                                        <div className="w-2 h-12 bg-slate-700 relative overflow-hidden">
                                            <div className="w-full h-full bg-purple-500 animate-[moveDown_1.5s_linear_infinite]"></div>
                                        </div>
                                        <div className="w-40 h-32 bg-slate-200 rounded-2xl relative shadow-lg border-b-8 border-r-8 border-slate-300 flex items-center justify-center overflow-hidden">
                                            <div className="w-16 h-20 bg-white/80 border border-slate-300 rounded-lg relative overflow-hidden flex items-end justify-center pb-2">
                                                <div className="w-full bg-purple-500/80 animate-[fillUp_10s_ease-in-out_infinite]" style={{height: '0%'}}></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-[10px] font-bold text-slate-600 z-10">Tc-99m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <style>{`
                                        @keyframes moveDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
                                        @keyframes flowGradient { 0% { background-position: 0% 0%; } 100% { background-position: 0% 100%; } }
                                        @keyframes fillUp { 0% { height: 0%; } 50% { height: 80%; } 90% { height: 80%; } 100% { height: 0%; } }
                                    `}</style>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <span className="text-blue-600 font-extrabold text-xs uppercase tracking-widest mb-2 block">Ultra-kortlevende Isotopen & PET</span>
                                    <h2 className="text-4xl font-black text-slate-900 mb-6 font-jakarta">In-situ Productie</h2>
                                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                        Voor isotopen zoals <strong>Koolstof-11</strong> (20 min) of <strong>Zuurstof-15</strong> (2 min!) is een cyclotron on-site noodzakelijk. Het transport moet via snelle pneumatische postsytemen (buizenpost) verlopen.
                                    </p>
                                    
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 flex items-center gap-2"><Timer size={14}/> Klinische Halfwaardetijden</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-slate-700">Fluor-18 (PET Standaard)</span>
                                                <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded">110 min</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-slate-700">Koolstof-11 (Neuro-imaging)</span>
                                                <span className="text-xs font-mono bg-orange-100 text-orange-700 px-2 py-0.5 rounded">20 min</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-bold text-slate-700">Zuurstof-15 (Perfusie)</span>
                                                <span className="text-xs font-mono bg-red-100 text-red-700 px-2 py-0.5 rounded">2 min</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative h-[400px] bg-slate-900 rounded-3xl p-8 flex items-center justify-center overflow-hidden">
                                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black"></div>
                                     <div className="w-[200px] h-[200px] border border-blue-500/30 rounded-full absolute animate-spin-slow"></div>
                                     <div className="absolute w-[300px] h-[300px] animate-spin">
                                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(96,165,250,0.8)]"></div>
                                     </div>
                                     <div className="relative z-10 text-center">
                                         <Zap size={32} className="text-yellow-400 mx-auto mb-2" />
                                         <h4 className="text-white font-bold text-lg">Deeltjesversneller</h4>
                                         <p className="text-blue-200 text-xs">Versnelling van protonen tot ca. 18 MeV.</p>
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <div className="text-center py-12">
                <p className="text-xs text-slate-400 italic">“Dit is geen medisch advies. Raadpleeg altijd een arts.”</p>
            </div>
        </div>
    );
};
