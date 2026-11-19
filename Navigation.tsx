import React, { useState } from 'react';
import { PageView } from './types.ts';
import { Menu, X, User, Lock, ChevronRight, ShieldCheck, LayoutDashboard, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, isLoggedIn, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginStep, setLoginStep] = useState(1);

  const navItems = [
    { id: PageView.HOME, label: 'Home' },
    { id: PageView.PROCEDURES, label: 'Onderzoeken' },
    { id: PageView.THERAPY, label: 'Therapie' },
    { id: PageView.PHYSICS, label: 'Fysica' },
    { id: PageView.FAQ, label: 'Info' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
        onNavigate(PageView.DASHBOARD);
    } else {
        setIsLoginModalOpen(true);
        setLoginStep(1);
    }
  };

  const performLogin = () => {
      onLogin();
      setIsLoginModalOpen(false);
      onNavigate(PageView.DASHBOARD);
  }

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-[#F8FAFC]/90 backdrop-blur-xl transition-all duration-300 border-b border-slate-200/60 shadow-sm supports-[backdrop-filter]:bg-[#F8FAFC]/60">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Area */}
        <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick(PageView.HOME)}>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30 mr-3 ring-2 ring-white ring-offset-2 ring-offset-[#F8FAFC] transition-transform group-hover:scale-105">
             N<span className="text-blue-200">+</span>
          </div>
          <div>
            <span className="font-jakarta text-xl font-bold tracking-tight text-slate-900 block leading-none group-hover:text-blue-600 transition-colors">
              Nucleaire
            </span>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-jakarta">
              Geneeskunde
            </span>
          </div>
        </div>

        {/* Desktop Minimal Menu */}
        <div className="hidden lg:flex items-center justify-between flex-1 ml-16">
          <div className="flex space-x-1 text-sm font-medium text-slate-500 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2 rounded-full font-jakarta transition-all duration-300 ${
                  currentPage === item.id 
                    ? 'bg-slate-900 text-white font-bold shadow-md' 
                    : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
             {/* Portal Button */}
             {isLoggedIn ? (
                 <div className="flex items-center gap-2">
                     <button 
                        onClick={() => handleNavClick(PageView.DASHBOARD)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            currentPage === PageView.DASHBOARD ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
                        }`}
                     >
                        <LayoutDashboard size={16} />
                        <span>Mijn Dossier</span>
                     </button>
                     <button onClick={onLogout} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors" title="Uitloggen">
                        <LogOut size={20} />
                     </button>
                 </div>
             ) : (
                <button 
                    onClick={handleLoginClick}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5"
                >
                    <User size={16} />
                    <span>Inloggen</span>
                </button>
             )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
            <button 
                onClick={handleLoginClick}
                className="mr-4 p-2 bg-white border border-slate-200 text-slate-900 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
             >
                <User size={20} />
             </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-t border-slate-100 p-6 md:hidden h-screen z-50">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-2xl font-bold font-jakarta ${
                  currentPage === item.id ? 'text-blue-600' : 'text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-8 border-t border-slate-100">
               <button onClick={handleLoginClick} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
                   <User size={20} /> {isLoggedIn ? 'Naar Dashboard' : 'Inloggen Mijn Dossier'}
               </button>
            </div>
          </div>
        </div>
      )}
    </nav>

    {/* Login Simulation Modal */}
    {isLoginModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-slate-900/5 transform transition-all scale-100">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 ring-4 ring-blue-50/50">
                                <Lock size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 font-jakarta">Beveiligde Omgeving</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">DigiD Authenticatie</p>
                            </div>
                        </div>
                        <button onClick={() => setIsLoginModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {loginStep === 1 ? (
                        <div className="space-y-4">
                            <p className="text-slate-600 mb-8 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="font-bold text-slate-900 block mb-1">Welkom bij Mijn Dossier.</span>
                                Log in om uw afspraken te bekijken, voorbereidingsinstructies te lezen en uw beelden in te zien.
                            </p>
                            <button onClick={() => setLoginStep(2)} className="w-full bg-[#FF7F00] hover:bg-[#E67200] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-orange-500/20 hover:translate-y-[-2px]">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                                    <span className="text-[#FF7F00] font-black text-xs font-sans">D</span>
                                </div>
                                Inloggen met DigiD
                            </button>
                             <button className="w-full bg-white border-2 border-slate-100 hover:border-slate-300 text-slate-700 py-4 rounded-xl font-bold transition-all">
                                Inloggen met ZorgDomein
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50">
                                <ShieldCheck size={32} />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Succesvol Geverifieerd</h4>
                            <p className="text-slate-500 text-sm mb-8">
                                U wordt nu doorgestuurd naar uw persoonlijke omgeving.
                            </p>
                            <button onClick={performLogin} className="w-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-900/30">
                                Ga verder naar Dashboard
                            </button>
                        </div>
                    )}
                </div>
                <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1"><Lock size={10} /> SSL 256-bit Encrypted</span>
                    <span>AVG Compliant</span>
                </div>
            </div>
        </div>
    )}
    </>
  );
};