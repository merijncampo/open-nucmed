
import React, { useState, useMemo, useCallback } from 'react';
import { 
    Monitor, Search, User, Calendar, Database, Maximize2, Settings, Layers, 
    Crosshair, Zap, Activity, Filter, Grid, Move, ZoomIn, Contrast, 
    ChevronRight, ChevronLeft, Info, FileText, LayoutGrid, Layout
} from 'lucide-react';

interface Case {
    id: string;
    patientName: string;
    birthDate: string;
    scanType: string;
    isotope: string;
    indication: string;
    findings: string;
    diagnosis: string;
    modality: 'PET/CT' | 'SPECT/CT' | 'SPECT';
}

const CASES: Case[] = [
    {
        id: '1',
        patientName: 'P. van Dam',
        birthDate: '12-05-1958',
        scanType: 'PET/CT Whole Body',
        isotope: 'F-18 FDG (350 MBq)',
        indication: 'Stadiëring Bronchuscarcinoom linksboven.',
        findings: 'Intens verhoogde uptake in de linker bovenkwab (SUVmax 14.2). Geen verdachte lymfeklieren mediastinaal.',
        diagnosis: 'T2aN0M0 Bronchuscarcinoom.',
        modality: 'PET/CT'
    },
    {
        id: '2',
        patientName: 'M. de Groot',
        birthDate: '03-11-1964',
        scanType: 'Skeletscintigrafie (Bone SPECT)',
        isotope: '99mTc-HDP (700 MBq)',
        indication: 'Rugpijn, voorgeschiedenis Mammacarcinoom.',
        findings: 'Hotspot in de wervelboog van L4. SPECT/CT toont sclerotische laesie passend bij metastase.',
        diagnosis: 'Osteoblastaire botmetastase L4.',
        modality: 'SPECT/CT'
    },
    {
        id: '3',
        patientName: 'J. Hendriks',
        birthDate: '22-08-1972',
        scanType: 'Myocard Perfusie (Stress/Rust)',
        isotope: '99mTc-Tetrofosmin (400/800 MBq)',
        indication: 'Typische AP klachten bij inspanning.',
        findings: 'Reversibel defect inferolateraal. Rustbeelden tonen volledige normalisatie.',
        diagnosis: 'Ischemie in het stroomgebied van de RCA.',
        modality: 'SPECT'
    }
];

// Internal Tooltip Component for consistent medical UI
interface TooltipProps {
    content: string;
    children: React.ReactNode;
    side?: 'bottom' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, side = 'bottom' }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div 
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`absolute z-50 px-2 py-1.5 bg-[#252525] border border-slate-700 text-slate-200 text-[9px] font-bold uppercase tracking-wider rounded shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150 ${
                    side === 'right' 
                    ? 'left-full ml-2 top-1/2 -translate-y-1/2' 
                    : 'bottom-full mb-2 left-1/2 -translate-x-1/2'
                }`}>
                    {content}
                    {side === 'bottom' && <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700"></div>}
                    {side === 'right' && <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-700"></div>}
                </div>
            )}
        </div>
    );
};

export const PacsSimulator: React.FC = () => {
    const [selectedCase, setSelectedCase] = useState<Case>(CASES[0]);
    const [activeTool, setActiveTool] = useState('window');
    const [fusionLevel, setFusionLevel] = useState(50);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const tools = useMemo(() => [
        {id: 'window', icon: Contrast, hint: 'Window/Level (Contrast)'},
        {id: 'pan', icon: Move, hint: 'Verschuiven (Pan)'},
        {id: 'zoom', icon: ZoomIn, hint: 'Zoomen'},
        {id: 'roi', icon: Crosshair, hint: 'ROI Meting (SUV)'},
        {id: 'fusion', icon: Layers, hint: 'Fusie Beheer'}
    ], []);

    const handleCaseSelect = useCallback((c: Case) => {
        setSelectedCase(c);
        setFusionLevel(50); // Reset fusion level
    }, []);

    return (
        <div className="pt-16 min-h-screen bg-black text-slate-300 font-jakarta flex flex-col overflow-hidden select-none">
            
            {/* PACS Style Header */}
            <header className="h-12 bg-[#1A1A1A] border-b border-slate-800 flex items-center justify-between px-4 shrink-0 z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Monitor size={18} className="text-[#6FAEF7]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">PACS <span className="text-white">Diagnostic Station v4.1</span></span>
                    </div>
                    <div className="h-6 w-px bg-slate-800"></div>
                    <div className="flex items-center gap-4 text-[11px] font-bold">
                        <span className="text-white">{selectedCase.patientName}</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-slate-500">{selectedCase.birthDate}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <Tooltip content="Systeem Instellingen">
                        <button className="p-2 hover:bg-slate-800 rounded text-slate-500 transition-colors"><Settings size={16} /></button>
                    </Tooltip>
                    <Tooltip content="Volledig Scherm">
                        <button className="p-2 hover:bg-slate-800 rounded text-slate-500 transition-colors"><Maximize2 size={16} /></button>
                    </Tooltip>
                </div>
            </header>

            {/* Main Workstation Layout */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Patient Browser Sidebar */}
                <aside className={`bg-[#121212] border-r border-slate-800 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-72' : 'w-12'}`}>
                    <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                        {sidebarOpen && <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Patient Browser</span>}
                        <Tooltip content={sidebarOpen ? "Verberg Lijst" : "Toon Lijst"} side="right">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded transition-colors">
                                {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                            </button>
                        </Tooltip>
                    </div>

                    {sidebarOpen && (
                        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                            <div className="relative mb-4">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                                <Tooltip content="Zoek in Worklist">
                                    <input type="text" placeholder="Zoek casus..." className="w-full bg-[#1A1A1A] border border-slate-800 rounded py-2 pl-9 pr-3 text-[11px] outline-none focus:border-blue-500 transition-colors" />
                                </Tooltip>
                            </div>
                            
                            {CASES.map((c) => (
                                <Tooltip key={c.id} content={`Laad: ${c.scanType}`} side="right">
                                    <div 
                                        onClick={() => handleCaseSelect(c)}
                                        className={`p-3 rounded-lg cursor-pointer transition-all border ${selectedCase.id === c.id ? 'bg-blue-900/20 border-blue-500' : 'bg-[#1A1A1A] border-transparent hover:border-slate-700'}`}
                                    >
                                        <h4 className={`text-xs font-bold mb-1 ${selectedCase.id === c.id ? 'text-white' : 'text-slate-300'}`}>{c.patientName}</h4>
                                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase">
                                            <span>{c.modality}</span>
                                            <span>{c.isotope.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    )}
                </aside>

                {/* Viewport & Controls */}
                <div className="flex-1 flex flex-col">
                    
                    {/* Tool Bar */}
                    <div className="h-14 bg-[#1A1A1A] border-b border-slate-800 flex items-center px-4 gap-6 shrink-0">
                        <div className="flex bg-[#121212] p-1 rounded-lg border border-slate-800">
                            {tools.map((tool) => (
                                <Tooltip key={tool.id} content={tool.hint}>
                                    <button 
                                        onClick={() => setActiveTool(tool.id)}
                                        className={`p-2 rounded transition-all ${activeTool === tool.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                                    >
                                        <tool.icon size={18} />
                                    </button>
                                </Tooltip>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex flex-col gap-1 flex-1 max-w-[200px]">
                                <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase">
                                    <span>Fusion Alpha</span>
                                    <span>{fusionLevel}%</span>
                                </div>
                                <Tooltip content="Pas transparantie CT/PET aan">
                                    <input 
                                        type="range" 
                                        min="0" max="100" 
                                        value={fusionLevel} 
                                        onChange={(e) => setFusionLevel(Number(e.target.value))}
                                        className="w-full h-1 bg-slate-800 accent-blue-500 rounded-full appearance-none cursor-pointer hover:accent-blue-400"
                                    />
                                </Tooltip>
                            </div>
                            <div className="h-8 w-px bg-slate-800"></div>
                            <div className="flex items-center gap-2">
                                <Tooltip content="Multi-Modality Layout">
                                    <button className="px-3 py-1.5 bg-[#121212] border border-slate-800 rounded text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">PET/CT MM Reading</button>
                                </Tooltip>
                                <Tooltip content="3D Volume Rendering">
                                    <button className="px-3 py-1.5 bg-[#121212] border border-slate-800 rounded text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Bone VRT</button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    {/* Simulation Grid */}
                    <div className="flex-1 bg-black grid grid-cols-2 grid-rows-2 gap-px p-px">
                        {/* AXIAL VIEW */}
                        <div className="relative group overflow-hidden bg-[#0a0a0a] border border-slate-800 cursor-crosshair">
                             <div className="absolute top-3 left-3 text-[10px] font-bold text-blue-500 uppercase tracking-widest pointer-events-none">Axial</div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                 <div className="w-48 h-48 border-2 border-slate-800 rounded-full flex items-center justify-center">
                                     <div className="w-32 h-32 bg-slate-900/30 rounded-3xl blur-2xl animate-pulse"></div>
                                 </div>
                                 <div className="absolute w-full h-[1px] bg-blue-500/20"></div>
                                 <div className="absolute h-full w-[1px] bg-blue-500/20"></div>
                             </div>
                             {/* Simulated Hotspot */}
                             {selectedCase.modality === 'PET/CT' && (
                                 <Tooltip content={`SUVmax: ${fusionLevel > 0 ? '14.2' : '---'}`}>
                                     <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-red-600 rounded-full blur-xl opacity-80 animate-pulse hover:bg-red-500 transition-colors" style={{opacity: fusionLevel/100}}></div>
                                 </Tooltip>
                             )}
                        </div>

                        {/* CORONAL VIEW */}
                        <div className="relative group overflow-hidden bg-[#0a0a0a] border border-slate-800 cursor-crosshair">
                             <div className="absolute top-3 left-3 text-[10px] font-bold text-blue-500 uppercase tracking-widest pointer-events-none">Coronal</div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                 <div className="w-40 h-64 bg-slate-900/50 rounded-b-full rounded-t-xl border border-slate-800"></div>
                             </div>
                             {/* Simulated Hotspot */}
                             {selectedCase.modality === 'PET/CT' && (
                                 <div className="absolute top-1/3 left-1/2 w-10 h-10 bg-red-600 rounded-full blur-2xl opacity-80 animate-pulse" style={{opacity: fusionLevel/100}}></div>
                             )}
                        </div>

                        {/* SAGITTAL VIEW */}
                        <div className="relative group overflow-hidden bg-[#0a0a0a] border border-slate-800 cursor-crosshair">
                             <div className="absolute top-3 left-3 text-[10px] font-bold text-blue-500 uppercase tracking-widest pointer-events-none">Sagittal</div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                 <div className="w-24 h-64 bg-slate-900/50 rounded-full border border-slate-800 skew-x-6"></div>
                             </div>
                        </div>

                        {/* MIP / VRT VIEW */}
                        <div className="relative group overflow-hidden bg-[#0a0a0a] border border-slate-800 cursor-move">
                             <div className="absolute top-3 left-3 text-[10px] font-bold text-amber-500 uppercase tracking-widest pointer-events-none">MIP / 3D</div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="relative w-40 h-72 flex flex-col items-center">
                                     {/* Skeleton Frame */}
                                     <div className="w-12 h-16 bg-slate-800/30 rounded-full mb-1"></div>
                                     <div className="w-20 h-40 bg-slate-800/30 rounded-b-[2rem] border-x border-slate-700/50"></div>
                                     <div className="flex gap-4">
                                         <div className="w-4 h-32 bg-slate-800/30 rounded-full"></div>
                                         <div className="w-4 h-32 bg-slate-800/30 rounded-full"></div>
                                     </div>
                                     {/* Activity Layers */}
                                     <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
                                        {/* Brain */}
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500/20 rounded-full blur-md"></div>
                                        {/* Heart */}
                                        <div className="absolute top-24 left-1/2 translate-x-1 w-10 h-12 bg-blue-500/10 rounded-full blur-md"></div>
                                        {/* Bladder */}
                                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-14 h-14 bg-red-600 rounded-full blur-2xl opacity-60"></div>
                                        
                                        {/* Pathological Hotspot */}
                                        {selectedCase.id === '1' && <div className="absolute top-24 left-1/2 -translate-x-6 w-6 h-6 bg-red-500 rounded-full blur-lg animate-pulse"></div>}
                                        {selectedCase.id === '2' && <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full blur-lg animate-pulse"></div>}
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Findings & Reporting Side */}
                <aside className="w-80 bg-[#121212] border-l border-slate-800 flex flex-col overflow-y-auto shrink-0 p-6 custom-scrollbar">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Info size={16} className="text-blue-500" />
                            <h3 className="text-xs font-black uppercase text-white tracking-[0.2em]">Klinische Gegevens</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#1A1A1A] rounded-xl border border-slate-800">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Scan & Isotoop</span>
                                <p className="text-xs text-slate-300 font-bold leading-relaxed">{selectedCase.scanType}</p>
                                <p className="text-[10px] text-blue-500 font-mono mt-1">{selectedCase.isotope}</p>
                            </div>
                            <div className="p-4 bg-[#1A1A1A] rounded-xl border border-slate-800">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Indicatie</span>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{selectedCase.indication}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText size={16} className="text-amber-500" />
                            <h3 className="text-xs font-black uppercase text-white tracking-[0.2em]">Verslaglegging</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Bevindingen</h4>
                                <p className="text-[11px] text-slate-300 leading-relaxed font-medium bg-[#0a0a0a] p-4 rounded-xl border border-slate-800 shadow-inner">
                                    {selectedCase.findings}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Conclusie</h4>
                                <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded-xl">
                                    <p className="text-[11px] text-emerald-400 font-bold leading-relaxed">
                                        {selectedCase.diagnosis}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-lg text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 cursor-default">
                            Validatie Succesvol
                        </div>
                    </div>
                </aside>
            </div>

            {/* Workstation Footer */}
            <footer className="h-8 bg-[#1A1A1A] border-t border-slate-800 flex items-center justify-between px-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                <div className="flex gap-4">
                    <Tooltip content="Server ID"><span>Server: NL-PACS-NODE-01</span></Tooltip>
                    <Tooltip content="Huidige Modality"><span>Modality: {selectedCase.modality}</span></Tooltip>
                    <span>Ready</span>
                </div>
                <div className="flex gap-4">
                    <span>Lossless Compression</span>
                    <span>FPS: 60</span>
                    <span className="text-emerald-500">Connected</span>
                </div>
            </footer>
        </div>
    );
};
