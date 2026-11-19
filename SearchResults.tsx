
import React, { useState, useMemo } from 'react';
import { PageView, FAQItem } from '../types.ts';
import { Search, ArrowRight, FileText, Activity, Scan, Briefcase, Phone, HelpCircle, Filter } from 'lucide-react';
import { CONTACT_INFO } from '../data/constants.ts';

interface SearchResultsProps {
  searchTerm: string;
  onNavigate: (page: PageView) => void;
  onOpenNews?: (id: string) => void;
  procedures: any[];
  therapies: any[];
  news: any[];
  vacancies?: any[];
  faqs?: FAQItem[];
}

const Highlight = ({ text = '', terms }: { text?: string, terms: string[] }) => {
    if (!text || terms.length === 0) return <>{text}</>;
    
    // Only highlight words > 2 chars to prevent massive highlighting of short common letters
    const safeTerms = terms.filter(t => t.length > 2).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (safeTerms.length === 0) return <>{text}</>;

    const regex = new RegExp(`(${safeTerms.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return (
        <>
            {parts.map((part, i) => 
                regex.test(part) ? (
                    <mark key={i} className="bg-yellow-200 text-slate-900 rounded-[3px] px-0.5 font-bold shadow-sm">{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
};

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchTerm, 
  onNavigate, 
  onOpenNews, 
  procedures, 
  therapies, 
  news,
  vacancies = [],
  faqs = []
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const exactTerm = searchTerm.toLowerCase().trim();
  const searchTerms = exactTerm.split(/\s+/).filter(t => t.length > 0);

  const allResults = useMemo(() => {
      if (searchTerms.length === 0) return [];

      const calculateScore = (title: string = '', desc: string = '', fullText: string = '', keywords: string[] = []) => {
          let score = 0;
          const t = title.toLowerCase();
          const d = desc.toLowerCase();
          const f = fullText.toLowerCase();

          // Exact phrase match gives huge boost
          if (t.includes(exactTerm)) score += 100;
          else if (d.includes(exactTerm)) score += 50;
          else if (f.includes(exactTerm)) score += 20;

          // Keyword match
          if (keywords.some(kw => exactTerm.includes(kw.toLowerCase()) || kw.toLowerCase().includes(exactTerm))) score += 80;

          // Individual term match
          let termsFound = 0;
          searchTerms.forEach(term => {
              if (t.includes(term)) { score += 30; termsFound++; }
              else if (d.includes(term)) { score += 10; termsFound++; }
              else if (f.includes(term)) { score += 5; termsFound++; }
              else if (keywords.some(kw => kw.toLowerCase().includes(term))) { score += 15; termsFound++; }
          });

          // Synergy boost: if all typed words are found spread across the document
          if (termsFound >= searchTerms.length && searchTerms.length > 1) {
              score += 20;
          }

          return score;
      };

      let results: any[] = [];

      // Combine and score Procedures
      procedures.forEach(cat => {
          cat.items.forEach((item: any) => {
              const fullText = `${item.indication} ${item.method} ${item.tracer} ${item.preparation} ${item.aftercare}`;
              const score = calculateScore(item.title, item.desc, fullText);
              if (score > 0) results.push({ ...item, type: 'Onderzoek', category: cat.category, icon: Scan, score, title: item.title, desc: item.desc });
          });
      });

      // Combine and score Therapies
      therapies.forEach(item => {
          const fullText = `${item.mechanism} ${item.sideEffects} ${item.isotope}`;
          const score = calculateScore(item.name, item.desc, fullText);
          if (score > 0) results.push({ ...item, type: 'Therapie', title: item.name, desc: item.desc, icon: Activity, score });
      });

      // Combine and score News
      news.forEach(item => {
          const score = calculateScore(item.title, item.summary, item.fullContent);
          if (score > 0) results.push({ ...item, type: 'Nieuws', title: item.title, desc: item.summary, id: item.id, icon: FileText, score });
      });

      // Combine and score Vacancies
      vacancies.forEach(item => {
          const fullText = `${item.hospital} ${item.location}`;
          const score = calculateScore(item.title, fullText, '', item.tags);
          if (score > 0) results.push({ ...item, type: 'Vacature', title: item.title, desc: `${item.hospital} - ${item.location}`, icon: Briefcase, score });
      });

      // Combine and score FAQs
      faqs.forEach(item => {
          const score = calculateScore(item.question, item.answer, '');
          if (score > 0) results.push({ ...item, type: 'FAQ', title: item.question, desc: item.answer, icon: HelpCircle, score });
      });

      // Support / Contact
      const isContactSearch = CONTACT_INFO.keywords.some(kw => exactTerm.includes(kw) || searchTerms.some(t => kw.includes(t)));
      if (isContactSearch) {
          results.push({
              type: 'Contact',
              title: 'Klantenservice & Contact',
              desc: 'Heeft u vragen over afspraken of locaties? Bekijk onze contactpagina.',
              icon: Phone,
              score: 1000 // Force to top
          });
      }

      // Sort by descending score
      return results.sort((a, b) => b.score - a.score);
  }, [searchTerm, procedures, therapies, news, vacancies, faqs]);

  if (!exactTerm) return null;

  const filters = Array.from(new Set(allResults.map(r => r.type)));
  const filteredResults = activeFilter ? allResults.filter(r => r.type === activeFilter) : allResults;
  
  const totalResultsCount = allResults.length;

  const handleResultClick = (result: any) => {
      if (result.type === 'Onderzoek') onNavigate(PageView.PROCEDURES);
      else if (result.type === 'Therapie') onNavigate(PageView.THERAPY);
      else if (result.type === 'Nieuws') onOpenNews && onOpenNews(result.id);
      else if (result.type === 'Vacature') onNavigate(PageView.VACANCIES);
      else if (result.type === 'Contact') onNavigate(PageView.CONTACT);
      else if (result.type === 'FAQ') onNavigate(PageView.FAQ);
  };

  const suggestions = ["PET Scan", "Schildklier", "Prostaat", "Therapie", "Parkeren"];

  return (
    <div className="pt-32 min-h-screen bg-[#FDFDFD] px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-jakarta">
                Zoekresultaten
            </h1>
            <p className="text-xl text-slate-500 font-medium">
                {totalResultsCount === 0 
                    ? `Geen resultaten gevonden voor "${searchTerm}"` 
                    : `${totalResultsCount} resultaten gevonden voor "${searchTerm}"`}
            </p>
        </div>

        {totalResultsCount > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8 animate-fade-in-up-delay-1">
                {/* Advanced Filters Sidebar */}
                <div className="lg:w-64 shrink-0">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-2 sticky top-32">
                        <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold px-2">
                           <Filter size={18}/> Filters
                        </div>
                        <button 
                            onClick={() => setActiveFilter(null)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors ${activeFilter === null ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            Alle resultaten ({totalResultsCount})
                        </button>
                        {filters.map(filterType => {
                            const count = allResults.filter(r => r.type === filterType).length;
                            return (
                                <button 
                                    key={filterType}
                                    onClick={() => setActiveFilter(filterType)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-bold flex justify-between items-center transition-colors ${activeFilter === filterType ? 'bg-[#6FAEF7] text-white shadow-md shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    <span>{filterType}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeFilter === filterType ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>{count}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 space-y-4">
                    {filteredResults.map((item: any, idx: number) => (
                        <div 
                            key={`${item.type}-${idx}`} 
                            onClick={() => handleResultClick(item)} 
                            className={`bg-white p-6 rounded-3xl border border-slate-100 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row items-start gap-4 hover:shadow-xl hover:shadow-slate-200/50 ${
                                item.type === 'Contact' ? 'hover:border-[#6FAEF7] bg-blue-50/20' : 
                                'hover:border-slate-300'
                            }`}
                        >
                            <div className={`p-4 rounded-2xl shrink-0 transition-colors ${
                                item.type === 'Contact' ? 'bg-[#6FAEF7] text-white shadow-lg shadow-blue-500/30' : 
                                item.type === 'Onderzoek' ? 'bg-blue-50 text-[#6FAEF7] group-hover:bg-[#6FAEF7] group-hover:text-white' :
                                item.type === 'Therapie' ? 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white' :
                                item.type === 'FAQ' ? 'bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white' :
                                item.type === 'Vacature' ? 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' : 
                                'bg-slate-50 text-slate-500 group-hover:bg-slate-800 group-hover:text-white'
                            }`}>
                                <item.icon size={24} />
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${
                                        item.type === 'Contact' ? 'bg-[#6FAEF7] text-white' : 
                                        item.type === 'Onderzoek' ? 'bg-blue-50 text-blue-700' :
                                        item.type === 'Therapie' ? 'bg-orange-50 text-orange-700' :
                                        item.type === 'FAQ' ? 'bg-purple-50 text-purple-700' :
                                        item.type === 'Vacature' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-700'
                                    }`}>
                                        {item.type}
                                    </span>
                                    {item.category && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.category}</span>}
                                    {item.date && <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.date}</span>}
                                    <span className="text-[10px] text-slate-300 font-medium ml-auto hidden sm:block">Relevance Score: {item.score}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 group-hover:text-[#6FAEF7] transition-colors font-jakarta leading-tight">
                                    <Highlight text={item.title} terms={searchTerms} />
                                </h3>
                                <p className="text-slate-500 text-sm md:text-base font-medium line-clamp-2 leading-relaxed">
                                    <Highlight text={item.desc} terms={searchTerms} />
                                </p>
                            </div>
                            <div className="self-center md:self-stretch flex items-center text-slate-300 group-hover:text-[#6FAEF7] transition-colors pl-4">
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                    
                    {filteredResults.length === 0 && (
                        <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-100">
                           <p className="text-slate-500 font-bold">Geen resultaten gevonden in deze categorie.</p>
                           <button onClick={() => setActiveFilter(null)} className="mt-4 text-[#6FAEF7] font-bold hover:underline">Verwijder filter</button>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-slate-100 shadow-sm animate-in zoom-in-95 duration-300">
                <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Search className="text-slate-300" size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 font-jakarta">Oeps, we hebben dat niet kunnen vinden.</h3>
                <p className="text-slate-500 mb-12 max-w-md mx-auto text-lg leading-relaxed">
                    Controleer de spelling of probeer een algemenere zoekterm in te voeren. Onze module zoekt in onderzoeken, theorie en nieuws.
                </p>
                
                <div className="max-w-xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 block">Populaire Module Suggesties</span>
                    <div className="flex flex-wrap justify-center gap-3">
                        {suggestions.map(s => (
                            <button 
                                key={s} 
                                onClick={() => onNavigate(PageView.PROCEDURES)}
                                className="px-5 py-2.5 bg-white hover:bg-white hover:text-[#6FAEF7] text-slate-600 rounded-xl font-bold text-sm transition-all border border-slate-200 hover:border-[#6FAEF7] hover:shadow-md"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
