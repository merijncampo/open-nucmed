import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, AlignRight, Sun, Moon, ChevronRight, Shield, ArrowRight } from 'lucide-react';

interface NavigationProps {
  toggleHighContrast: () => void;
  isHighContrast: boolean;
  onSearch: (term: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const PATIENT_PATHS = [
    '/wat-is-ng', 
    '/onderzoeken', 
    '/therapie', 
    '/voorbereiding', 
    '/veiligheid', 
    '/praktisch'
];

const ACADEMY_PATHS = [
    '/academie', 
    '/academie/anatomie', 
    '/academie/atlas', 
    '/academie/fysiologie', 
    '/academie/hotlab', 
    '/academie/scantechniek', 
    '/academie/dosimetrie', 
    '/academie/pacs'
];

export const Navigation: React.FC<NavigationProps> = ({ 
    toggleHighContrast, 
    isHighContrast, 
    onSearch,
    isLoggedIn,
    onLogin,
    onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false); 
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [logoActive, setLogoActive] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 100);
    }
  }, [isSearchOpen]);

  // Auto-expand menus based on current React-Router path
  useEffect(() => {
    const currentPath = location.pathname;
    if (PATIENT_PATHS.includes(currentPath)) {
        setIsPatientOpen(true);
        setIsAcademyOpen(false);
    } else if (ACADEMY_PATHS.includes(currentPath)) {
        setIsAcademyOpen(true);
        setIsPatientOpen(false);
    } else {
        setIsPatientOpen(false);
        setIsAcademyOpen(false);
    }
    // Automatically close mobile menu & search overlay upon navigation
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (localSearchTerm.trim()) {
          onSearch(localSearchTerm);
          setIsSearchOpen(false);
          setLocalSearchTerm('');
      }
  };

  const handleLogoClick = () => {
    handleNavClick('/');
    setLogoActive(true);
    setTimeout(() => setLogoActive(false), 150);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-300 ease-in-out ${scrolled ? 'py-4 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* Logo - Animated on Click */}
        <div className="flex items-start gap-1 cursor-pointer select-none z-[60]" onClick={handleLogoClick}>
           <span className={`font-black text-3xl md:text-4xl font-jakarta leading-none tracking-tighter transition-colors ${logoActive ? 'text-[#6FAEF7] duration-0' : 'text-slate-900 duration-[2000ms] ease-out'}`}>N</span>
           <span className="text-[#6FAEF7] text-2xl md:text-3xl font-black leading-none -mt-1 md:-mt-1.5">+</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-2 md:gap-6 z-[60]">
            <button 
                onClick={() => handleNavClick('/security-center')} 
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
                    isActive('/security-center') 
                    ? 'text-emerald-600 scale-110' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title="Security Center"
            >
                <Shield size={20} />
            </button>

            <button 
                onClick={toggleHighContrast} 
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 ease-in-out" 
                title="Contrast Modus"
            >
                {isHighContrast ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
                onClick={() => { setIsSearchOpen(!isSearchOpen); if(isMenuOpen) setIsMenuOpen(false); }} 
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${isSearchOpen ? 'text-[#6FAEF7] scale-110' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                title="Zoeken"
            >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'text-slate-900 scale-110' : 'text-slate-800 hover:bg-slate-50 hover:shadow-sm'}`}
                title="Menu"
            >
                 {isMenuOpen ? <X size={22} /> : <AlignRight size={24} />}
            </button>
        </div>

        {/* SEARCH OVERLAY */}
        {isSearchOpen && (
            <div className="absolute top-20 left-0 right-0 px-4 md:px-0 z-[55] animate-in fade-in slide-in-from-top-4 duration-200 ease-in-out">
                <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-[2rem] border border-slate-100 p-6 relative">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            value={localSearchTerm}
                            onChange={(e) => setLocalSearchTerm(e.target.value)}
                            placeholder="Waar bent u naar op zoek?"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-lg font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <button 
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </form>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {['PET Scan', 'Parkeren', 'Ervaringen', 'MRI', 'Kosten'].map(tag => (
                            <button 
                                key={tag}
                                onClick={() => { onSearch(tag); setIsSearchOpen(false); }}
                                className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 text-xs font-semibold rounded-xl border border-slate-200/60 hover:border-blue-200 transition-colors duration-300 ease-in-out shadow-sm"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Backdrop Click to Close */}
                <div className="fixed inset-0 min-h-screen top-32 z-[-1] bg-slate-900/10 backdrop-blur-sm transition-opacity" onClick={() => setIsSearchOpen(false)}></div>
            </div>
        )}

        {/* Dropdown Menu - Premium Outline */}
        {isMenuOpen && (
            <div className="fixed md:absolute top-24 right-4 left-4 md:left-auto md:w-[360px] bg-white shadow-2xl border border-slate-100 rounded-3xl p-6 overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-200 ease-out z-[70] max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="flex flex-col space-y-1.5 transition-all">
                    
                    {/* Home Button */}
                    <button 
                        onClick={() => handleNavClick('/')} 
                        className={`flex items-center justify-between w-full p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 ease-in-out ${isActive('/') ? 'text-slate-900 bg-slate-50/80 font-bold' : 'text-slate-700 font-semibold'}`}
                    >
                        <span>Home</span>
                        {isActive('/') && <div className="w-1.5 h-1.5 rounded-full bg-[#6FAEF7]"></div>}
                    </button>

                    {/* Patiënten Info Dropdown */}
                    <div className="space-y-1">
                        <button onClick={() => setIsPatientOpen(!isPatientOpen)} className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 font-semibold text-slate-800">
                            <span>Patiënten Info</span>
                            <ChevronDown size={18} className={`transition-transform duration-300 ease-in-out ${isPatientOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
                        </button>
                        {isPatientOpen && (
                            <div className="ml-4 space-y-1 pb-2 border-l-2 border-slate-100 pl-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                {[
                                    {path: '/wat-is-ng', label: 'Wat is NG?'},
                                    {path: '/onderzoeken', label: 'Onderzoeken'},
                                    {path: '/therapie', label: 'Therapieën'},
                                    {path: '/voorbereiding', label: 'Voorbereiding'},
                                    {path: '/veiligheid', label: 'Veiligheid'},
                                    {path: '/praktisch', label: 'Praktische Info'}
                                ].map((item) => (
                                    <button 
                                        key={item.path}
                                        onClick={() => handleNavClick(item.path)} 
                                        className={`block w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all duration-200 ${isActive(item.path) ? 'text-slate-900 bg-slate-50 font-bold' : 'text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-50'}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* NG Academie Dropdown */}
                    <div className="space-y-1 pt-2">
                         <button onClick={() => setIsAcademyOpen(!isAcademyOpen)} className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-emerald-50/50 transition-all duration-300 font-semibold text-emerald-950">
                            <span>NG Academie</span>
                            <ChevronDown size={18} className={`transition-transform duration-300 ease-in-out ${isAcademyOpen ? 'rotate-180 text-emerald-500' : 'text-slate-400'}`} />
                        </button>
                        {isAcademyOpen && (
                            <div className="ml-4 space-y-1 pb-2 border-l-2 border-emerald-100/50 pl-3 animate-in fade-in slide-in-from-top-1 duration-200">
                                {[
                                    {path: '/academie', label: 'Leerplein Dashboard'},
                                    {path: '/academie/anatomie', label: 'Anatomie Atlas'},
                                    {path: '/academie/atlas', label: 'Diagnostic Atlas'},
                                    {path: '/academie/fysiologie', label: 'Fysiologie'},
                                    {path: '/academie/hotlab', label: 'Radiofarmacie'},
                                    {path: '/academie/scantechniek', label: 'Scantechniek'},
                                    {path: '/academie/dosimetrie', label: 'Dosimetrie & Fysica'},
                                    {path: '/academie/pacs', label: 'PACS Simulator'}
                                ].map((item, idx) => (
                                    <button 
                                        key={item.path}
                                        onClick={() => handleNavClick(item.path)} 
                                        className={`block w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all duration-200 ${idx === 0 ? 'border-b-2 border-emerald-500/10 mb-2' : ''} ${isActive(item.path) ? 'text-emerald-950 bg-emerald-50/60 font-bold' : 'text-slate-500 font-semibold hover:text-emerald-800 hover:bg-emerald-50/30'}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-100 my-3"></div>

                    {[
                        {path: '/locaties', label: 'Locaties'},
                        {path: '/vacatures', label: 'Vacatures'},
                        {path: '/over-ons', label: 'Over Ons'},
                        {path: '/contact', label: 'Contact'}
                    ].map(item => (
                        <button 
                            key={item.path}
                            onClick={() => handleNavClick(item.path)} 
                            className={`flex items-center justify-between w-full p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 ease-in-out ${isActive(item.path) ? 'text-slate-900 bg-slate-50/80 font-bold' : 'text-slate-700 font-semibold'}`}
                        >
                            <span>{item.label}</span>
                            {isActive(item.path) ? <div className="w-1.5 h-1.5 rounded-full bg-[#6FAEF7]"></div> : <ChevronRight size={16} className="text-slate-300" />}
                        </button>
                    ))}

                    <div className="mt-4 rounded-2xl overflow-hidden h-32 relative shadow-sm border border-slate-100 group cursor-pointer" onClick={() => handleNavClick('/contact')}>
                        <img 
                            src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80" 
                            alt="Contact Team" 
                            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-5">
                             <div>
                                <span className="text-white text-xs font-black uppercase tracking-widest block mb-1">Hulp nodig?</span>
                                <span className="text-slate-300 text-[11px] font-medium">Ons medisch team staat klaar</span>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        )}
      </div>
    </nav>
    </>
  );
};
