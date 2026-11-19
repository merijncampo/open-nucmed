import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation.tsx';
import { Footer } from './Footer.tsx';
import { CoffeeDonation } from './CoffeeDonation.tsx';
import { LegalModal } from './LegalModal.tsx';
import { PageView } from '../types.ts';

/**
 * Layout Component: Bundles the router Outlet with global shell elements (Nav, Footer, Modals).
 * Enables seamless transition to React-Router while maintaining current aesthetics.
 */
export const Layout = ({
    isHighContrast,
    toggleHighContrast,
    isLoggedIn,
    onLogin,
    onLogout
}: {
    isHighContrast: boolean;
    toggleHighContrast: () => void;
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [legalModalOpen, setLegalModalOpen] = useState(false);
    const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

    // Ensure we start at the top when navigating
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    const handleSearch = (term: string) => {
        navigate('/zoeken', { state: { searchTerm: term } });
    };

    const handleOpenLegal = (type: 'privacy' | 'terms' | 'cookies') => {
        setLegalType(type);
        setLegalModalOpen(true);
    };

    // Legacy handler to ease transition for the un-refactored Footer & Donations
    const handleLegacyNavigate = (page: PageView) => {
        switch(page) {
            case PageView.HOME: navigate('/'); break;
            case PageView.PROCEDURES: navigate('/onderzoeken'); break;
            case PageView.THERAPY: navigate('/therapie'); break;
            case PageView.ACADEMY: navigate('/academie'); break;
            case PageView.PHYSICS: navigate('/academie/dosimetrie'); break;
            case PageView.CONTACT: navigate('/contact'); break;
            default: navigate('/'); break;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <LegalModal 
                isOpen={legalModalOpen} 
                onClose={() => setLegalModalOpen(false)} 
                type={legalType} 
            />
            
            <Navigation 
                isHighContrast={isHighContrast}
                toggleHighContrast={toggleHighContrast}
                onSearch={handleSearch}
                isLoggedIn={isLoggedIn}
                onLogin={onLogin}
                onLogout={onLogout}
            />
            
            <main className="flex-grow pt-24 md:pt-28">
               <Outlet />
            </main>

            <Footer onNavigate={handleLegacyNavigate} onOpenLegal={handleOpenLegal} />
            <CoffeeDonation onNavigate={handleLegacyNavigate} />
        </div>
    );
};
