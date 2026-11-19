
import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  Facebook, Twitter, Linkedin, Instagram, Youtube, Send, 
  MapPin, Phone, Mail, ChevronRight, ArrowUp, Globe, ShieldCheck 
} from 'lucide-react';

interface FooterProps {
    onNavigate: (page: PageView) => void;
    onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#2B2B2B] text-white pt-32 pb-12 font-jakarta overflow-hidden">
            {/* Slanted Top Edge Decoration */}
            <div 
                className="absolute top-0 left-1/2 w-[150vw] h-32 bg-white -translate-x-1/2 origin-center z-0"
                style={{ transform: 'translateX(-50%) translateY(-50%) skewY(-3deg)' }}
            ></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* Header Row: Logo & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12 gap-8">
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate(PageView.HOME)}>
                        <div className="flex items-center relative h-10">
                            <span className="font-black text-3xl md:text-4xl font-jakarta leading-none tracking-tighter text-white">N</span>
                            <span className="text-[#6FAEF7] text-2xl font-black leading-none ml-0.5 -mt-3">+</span>
                        </div>
                        <div className="h-8 w-px bg-white/20 mx-2 hidden sm:block"></div>
                        <span className="font-bold text-lg tracking-tight text-white/90">Nucleaire Geneeskunde Info</span>
                    </div>

                    <div className="flex items-center gap-5">
                        <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors"><Linkedin size={18} /></a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="text-white/60 hover:text-white transition-colors"><Youtube size={18} /></a>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    
                    {/* Column 1: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 text-white">Direct naar</h4>
                        <div className="grid grid-cols-2 gap-y-4">
                            <button onClick={() => onNavigate(PageView.HOME)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group text-left">
                                <ChevronRight size={14} className="text-white/20 group-hover:text-[#6FAEF7]" /> Home
                            </button>
                            <button onClick={() => onNavigate(PageView.PROCEDURES)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group text-left">
                                <ChevronRight size={14} className="text-white/20 group-hover:text-[#6FAEF7]" /> Onderzoeken
                            </button>
                            <button onClick={() => onNavigate(PageView.THERAPY)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group text-left">
                                <ChevronRight size={14} className="text-white/20 group-hover:text-[#6FAEF7]" /> Therapie
                            </button>
                            <button onClick={() => onNavigate(PageView.ACADEMY)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group text-left">
                                <ChevronRight size={14} className="text-white/20 group-hover:text-[#6FAEF7]" /> Academie
                            </button>
                            <button onClick={() => onNavigate(PageView.PHYSICS)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group text-left">
                                <ChevronRight size={14} className="text-white/20 group-hover:text-[#6FAEF7]" /> Fysica
                            </button>
                            <button onClick={() => onNavigate(PageView.CONTACT)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group text-left">
                                <ChevronRight size={14} className="text-white/20 group-hover:text-[#6FAEF7]" /> Contact
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Contact Us */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 text-white">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4">
                                <Mail size={20} className="text-white/30" />
                                <span className="text-sm text-white/60">info@nucleairegeneeskunde.nl</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Newsletter */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-8 text-white">Nieuwsbrief</h4>
                        <p className="text-sm text-white/60 mb-6 max-w-md">
                            Meld u aan voor updates over innovaties in moleculaire diagnostiek en theranostics.
                        </p>
                        {status === 'success' ? (
                            <div className="bg-emerald-500/10 border border-emerald-500/50 p-4 rounded-lg text-emerald-400 text-sm font-bold">
                                Bedankt voor uw aanmelding!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Uw email adres" 
                                    className="w-full bg-white text-slate-900 px-6 py-4 rounded-lg focus:outline-none placeholder:text-slate-400 font-medium"
                                />
                                <button 
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-[#EC754E] hover:bg-[#D9643D] text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Laden...' : 'Aanmelden'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xs text-white/40 font-medium">
                        © {currentYear}. Nucleaire Geneeskunde Nederland. All rights reserved.
                    </div>
                    
                    <div className="flex gap-6 text-xs text-white/40 font-medium">
                        <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors text-left">Privacy</button>
                        <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors text-left">Disclaimer</button>
                        <button onClick={() => onOpenLegal('cookies')} className="hover:text-white transition-colors text-left">Cookies</button>
                    </div>

                    <div className="text-xs text-white/40 font-medium">
                        Designed by <span className="text-white/60">Senior Medical Engineering</span>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button 
                onClick={scrollToTop}
                className="absolute bottom-12 right-6 md:right-12 w-10 h-10 bg-[#3498DB] hover:bg-[#2980B9] text-white flex items-center justify-center rounded-lg transition-all shadow-xl z-20 group"
                title="Terug naar boven"
            >
                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>

            {/* Scientific Disclaimer Footer Bar - Updated with requested text */}
            <div className="mt-12 bg-black/20 py-6 text-center">
                <p className="text-[11px] text-white/40 font-black uppercase tracking-[0.4em] px-6 leading-relaxed">
                    DIT IS GEEN MEDISCH ADVIES. RAADPLEEG ALTIJD EEN ARTS. INHOUD GEBASEERD OP EANM & NVNG STANDAARDEN.
                </p>
            </div>
        </footer>
    );
};
