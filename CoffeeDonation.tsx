
import React from 'react';
import { Coffee } from 'lucide-react';
import { PageView } from '../types';

interface CoffeeDonationProps {
    onNavigate: (page: PageView) => void;
}

export const CoffeeDonation: React.FC<CoffeeDonationProps> = ({ onNavigate }) => {
    const handleDonateClick = () => {
        onNavigate(PageView.DONATION);
        // Ensure immediate feedback if needed, although App.tsx handles this now.
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <button 
            onClick={handleDonateClick}
            className="fixed bottom-6 right-6 z-50 group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            title="Steun ons werk"
            aria-label="Doneer een kopje koffie"
        >
            <div className="relative flex items-center justify-center w-14 h-14 bg-slate-900 rounded-2xl shadow-lg border border-slate-700 overflow-visible">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[#6FAEF7] rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>

                {/* Steam Animation Container */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex justify-center gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="w-[2px] h-2 bg-white/60 rounded-full animate-steam-subtle delay-75"></span>
                    <span className="w-[2px] h-3 bg-white/60 rounded-full animate-steam-subtle delay-150"></span>
                    <span className="w-[2px] h-2 bg-white/60 rounded-full animate-steam-subtle delay-300"></span>
                </div>

                {/* Icon */}
                <Coffee className="text-white w-6 h-6 relative z-10 group-hover:text-[#6FAEF7] transition-colors duration-300" strokeWidth={2.5} />

                {/* Tooltip Label */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-slate-900 text-xs font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-xl border border-slate-100 whitespace-nowrap font-jakarta">
                    Trakteer ons ☕
                    {/* Tiny arrow pointing right */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white transform rotate-45 border-t border-r border-slate-100"></div>
                </div>
            </div>
        </button>
    );
};
