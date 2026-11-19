
import React, { useState, useMemo } from 'react';
import { 
  Briefcase, MapPin, ExternalLink, Clock, Building2, Search, 
  ArrowRight, Filter, Users, Cpu, Zap, Heart, CheckCircle2, 
  Bell, Mail, ChevronRight, Award, GraduationCap
} from 'lucide-react';

// Uitgebreide mock-data voor vacatures
const ENHANCED_VACANCIES = [
  {
    id: 1,
    title: "Klinisch Fysicus (Sectiehoofd)",
    hospital: "Nederlands Kanker Instituut (AVL)",
    location: "Amsterdam",
    type: "Fulltime",
    category: "Fysica",
    salary: "FWG 75/80",
    experience: "Senior",
    posted: "1 dag geleden",
    description: "Leid de transitie naar gepersonaliseerde dosimetrie voor Lu-177 en Ac-225 therapieën.",
    tags: ["Theranostics", "R&D", "Management"]
  },
  {
    id: 2,
    title: "MBB'er PET/CT & SPECT",
    hospital: "Erasmus MC",
    location: "Rotterdam",
    type: "Fulltime / Parttime",
    category: "MBB",
    salary: "FWG 50/55",
    experience: "Medior",
    posted: "3 dagen geleden",
    description: "Werken op een volledig digitale afdeling met de nieuwste Vision 600 systemen.",
    tags: ["Academisch", "Digitale PET", "Opleiding"]
  },
  {
    id: 3,
    title: "Radiofarmaceutisch Analist",
    hospital: "UMC Utrecht",
    location: "Utrecht",
    type: "Fulltime",
    category: "Farmacie",
    salary: "FWG 45/50",
    experience: "Junior/Medior",
    posted: "1 week geleden",
    description: "Verantwoordelijk voor de bereiding van klinische tracers onder GMP-condities.",
    tags: ["GMP", "Hotlab", "QC"]
  },
  {
    id: 4,
    title: "AIOS Nucleaire Geneeskunde",
    hospital: "Radboudumc",
    location: "Nijmegen",
    type: "Fulltime",
    category: "Arts",
    salary: "CAO UMC",
    experience: "Junior",
    posted: "2 weken geleden",
    description: "Specialiseer je in een multidisciplinaire setting met sterke focus op oncologie.",
    tags: ["Opleiding", "Wetenschap", "Kliniek"]
  }
];

export const VacanciesPage: React.FC = () => {
    const [filterCategory, setFilterCategory] = useState<string>('Alle');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = useMemo(() => {
        return ENHANCED_VACANCIES.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                job.hospital.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCat = filterCategory === 'Alle' || job.category === filterCategory;
            return matchesSearch && matchesCat;
        });
    }, [searchTerm, filterCategory]);

    return (
        <div className="pt-20 min-h-screen bg-white font-jakarta">

            {/* Professional Hero Section */}
            <div className="bg-slate-900 text-white pt-32 pb-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 animate-fade-in-up">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 w-fit">
                        <Award size={14} className="text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">Carrière in de Moleculaire Zorg</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 font-jakarta tracking-tighter leading-[0.9]">
                       Bouw mee aan de <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">toekomst van zorg.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">
                        De nucleaire geneeskunde is het snelst groeiende medische specialisme. Wij zoeken pioniers die technologie willen inzetten voor een betere patiëntenzorg.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 -mt-16 relative z-20">
                
                {/* Search & Filter Bar - Apple Style */}
                <div className="bg-white rounded-[2.5rem] p-4 md:p-6 shadow-2xl border border-slate-100 flex flex-col lg:flex-row gap-6 items-center mb-16">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Zoek op functie of ziekenhuis..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
                        {['Alle', 'MBB', 'Fysica', 'Arts', 'Farmacie'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filterCategory === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Vacancy List */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-2xl font-black text-slate-900 font-jakarta">Openstaande Posities</h2>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{filteredJobs.length} resultaten</span>
                        </div>

                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 group cursor-pointer relative overflow-hidden">
                                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0 shadow-inner">
                                            <Briefcase size={28} />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">{job.category}</span>
                                                <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-md border border-slate-100">{job.salary}</span>
                                            </div>
                                            <h4 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-jakarta leading-tight">{job.title}</h4>
                                            <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed line-clamp-2">{job.description}</p>
                                            
                                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                <span className="flex items-center gap-1.5"><Building2 size={14} className="text-slate-300" /> {job.hospital}</span>
                                                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-300" /> {job.location}</span>
                                                <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-300" /> {job.type}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start md:items-end gap-6 shrink-0 w-full md:w-auto">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{job.posted}</span>
                                            <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all group-hover:bg-blue-600 shadow-xl shadow-slate-900/10 group-hover:shadow-blue-600/20 flex items-center justify-center gap-2">
                                                Bekijk Vacature <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-slate-200">
                                <Search size={48} className="mx-auto text-slate-200 mb-6" />
                                <h4 className="text-xl font-black text-slate-900 mb-2">Geen directe matches</h4>
                                <p className="text-slate-400 font-medium">Probeer een andere filter of meld je aan voor de Talent Pool.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Information */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Why NG Section */}
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-black text-slate-900 mb-8 font-jakarta">Waarom werken in de NG?</h3>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0"><Cpu size={20}/></div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-900">Cutting-Edge Tech</h5>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-1">Werk met de nieuwste digitale PET-scanners en geavanceerde AI reconstructie.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0"><Zap size={20}/></div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-900">Theranostics-revolutie</h5>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-1">Sta aan de wieg van de behandeling van de toekomst met Lu-177 en radioliganden.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center shrink-0"><Heart size={20}/></div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-900">Patiëntcontact</h5>
                                        <p className="text-xs text-slate-500 leading-relaxed mt-1">In de NG heb je de tijd voor de patiënt, van intake tot de nazorg na therapie.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Alerts Box */}
                        <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -mr-16 -mt-16"></div>
                            <Bell className="mb-6 text-blue-200" size={32} />
                            <h3 className="text-xl font-black mb-4 font-jakarta">Talent Pool</h3>
                            <p className="text-blue-100 text-sm leading-relaxed mb-8 font-medium">
                                Geen passende vacature gevonden? Meld je aan en ontvang een seintje zodra er een nieuwe kans is in jouw regio.
                            </p>
                            <form className="space-y-4">
                                <input type="email" placeholder="jouw@email.nl" className="w-full bg-blue-500/30 border border-blue-400/30 rounded-xl px-4 py-3 text-sm placeholder:text-blue-200 outline-none focus:bg-blue-500/50 transition-all" />
                                <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                    Aanmelden <Mail size={16} />
                                </button>
                            </form>
                        </div>

                        {/* External Links */}
                        <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
                             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <GraduationCap size={16} /> Opleiding & Registers
                             </h4>
                             <div className="space-y-4">
                                 <a href="#" className="flex items-center justify-between text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors p-2 hover:bg-white rounded-lg group">
                                     NVNG Vacaturebank <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                                 </a>
                                 <a href="#" className="flex items-center justify-between text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors p-2 hover:bg-white rounded-lg group">
                                     Beroepsvereniging MBB'ers <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                                 </a>
                                 <a href="#" className="flex items-center justify-between text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors p-2 hover:bg-white rounded-lg group">
                                     Federatie Medisch Specialisten <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                                 </a>
                             </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Scientific Footer Bar */}
            <div className="bg-white border-t border-slate-100 py-12 text-center mt-20">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.4em] mb-4">
                    Architecten van de Moleculaire Toekomst.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Alle vacatures geverifieerd via officiële ziekenhuiskanalen.
                </div>
            </div>
        </div>
    );
};
