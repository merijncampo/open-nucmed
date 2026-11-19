import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { PageView } from './types.ts';
import { PROCEDURE_CATEGORIES, THERAPY_LIST, NEWS_ITEMS, VACANCIES, FAQ_LIST } from './data/constants.ts';
import { Layout } from './components/Layout.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Loader2, Zap, FileSearch, Activity } from 'lucide-react';

// Eagerly loaded components
import { HomePage } from './components/pages/HomePage.tsx';
import { WhatIsNGPage } from './components/pages/WhatIsNGPage.tsx';
import { ProceduresPage } from './components/pages/ProceduresPage.tsx';
import { TherapyPage } from './components/pages/TherapyPage.tsx';
import { PreparationPage } from './components/pages/PreparationPage.tsx';
import { SafetyPage } from './components/pages/SafetyPage.tsx';
import { PracticalInfoPage } from './components/pages/PracticalInfoPage.tsx';
import { FAQPage } from './components/pages/FAQPage.tsx';
import { DonationPage } from './components/pages/DonationPage.tsx';
import { AboutUsPage } from './components/pages/AboutUsPage.tsx';
import { NewsDetailPage } from './components/pages/NewsDetailPage.tsx';
import { KnowledgeQuiz } from './components/KnowledgeQuiz.tsx';
import { ContactForm } from './components/ContactForm.tsx';
import { VacanciesPage } from './components/VacanciesPage.tsx';
import { SecurityCenter } from './components/SecurityCenter.tsx';

// Lazy Loaded Components (Heavy/Interactive)
const HospitalMap = React.lazy(() => import('./components/HospitalMap.tsx')); 
const DecaySimulator = React.lazy(() => import('./components/DecaySimulator.tsx').then(m => ({ default: m.DecaySimulator })));
const AnatomyViewer = React.lazy(() => import('./components/AnatomyViewer.tsx').then(m => ({ default: m.AnatomyViewer })));
const HotlabPage = React.lazy(() => import('./components/HotlabPage.tsx').then(m => ({ default: m.HotlabPage })));
const AcademyDashboard = React.lazy(() => import('./components/AcademyDashboard.tsx').then(m => ({ default: m.AcademyDashboard })));
const PacsSimulator = React.lazy(() => import('./components/PacsSimulator.tsx').then(m => ({ default: m.PacsSimulator })));
const SearchResults = React.lazy(() => import('./components/SearchResults.tsx').then(m => ({ default: m.SearchResults })));

const DiagnosticAtlas = React.lazy(() => import('./components/DiagnosticAtlas.tsx').then(m => ({ default: m.DiagnosticAtlas })));
const Physiology = React.lazy(() => import('./components/Physiology.tsx').then(m => ({ default: m.Physiology })));
const ScanTechnique = React.lazy(() => import('./components/ScanTechnique.tsx').then(m => ({ default: m.ScanTechnique })));

// Loading Fallback
const PageLoadingFallback = ({ title = "Laden...", subtitle = "Even geduld a.u.b." }) => (
    <div className="pt-28 px-6 max-w-7xl mx-auto min-h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center max-w-md">
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                    <Loader2 className="animate-spin text-[#6FAEF7] w-10 h-10" />
                </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 font-jakarta">{title}</h2>
            <p className="text-slate-500 font-medium">{subtitle}</p>
        </div>
    </div>
);

// Generic Placeholder for Academic Sections
const AcademicSectionPlaceholder = ({ title, icon: Icon, description }: { title: string, icon: any, description: string }) => (
    <div className="pt-32 px-6 max-w-5xl mx-auto min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center border border-emerald-100 shadow-sm">
                <Icon size={32} />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-jakarta">{title}</h1>
                <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">NG Academie // Curriculum Module</p>
            </div>
        </div>
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
            <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">
                {description}
            </p>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex items-start gap-4">
                <Loader2 className="animate-spin text-emerald-500 mt-1" size={20} />
                <div>
                    <h4 className="font-bold text-slate-900">Module in ontwikkeling</h4>
                    <p className="text-sm text-slate-500">Onze medische redactie werkt momenteel aan de gedetailleerde inhoud van deze specialistische module conform de NVNG richtlijnen 2025.</p>
                </div>
            </div>
        </div>
    </div>
);

// HOC to transition un-refactored components smoothly
const LegacyWrapper = ({ children }: { children: React.ReactElement }) => {
    const navigate = useNavigate();
    
    const handleLegacyNavigate = (page: PageView) => {
        const routes: Record<string, string> = {
            [PageView.HOME]: '/',
            [PageView.WHAT_IS_NG]: '/wat-is-ng',
            [PageView.PROCEDURES]: '/onderzoeken',
            [PageView.THERAPY]: '/therapie',
            [PageView.PREPARATION]: '/voorbereiding',
            [PageView.SAFETY]: '/veiligheid',
            [PageView.PRACTICAL]: '/praktisch',
            [PageView.DONATION]: '/donatie',
            [PageView.ABOUT_US]: '/over-ons',
            [PageView.ACADEMY]: '/academie',
            [PageView.PACS_SIMULATOR]: '/academie/pacs',
            [PageView.ANATOMY]: '/academie/anatomie',
            [PageView.PHYSICS]: '/academie/dosimetrie',
            [PageView.CONTACT]: '/contact',
            [PageView.HOSPITALS]: '/locaties',
            [PageView.VACANCIES]: '/vacatures',
            [PageView.FAQ]: '/faq',
            [PageView.QUIZ]: '/quiz',
            [PageView.SEARCH_RESULTS]: '/zoeken',
            [PageView.NEWS_DETAIL]: '/nieuws/1'
        };
        const path = routes[page];
        if (path) {
            navigate(path);
        } else {
            console.warn('Fallback to home. Unmapped route:', page);
            navigate('/');
        }
    };

    const handleOpenNews = (id: string) => navigate(`/nieuws/${id}`);

    return React.cloneElement(children, { 
        onNavigate: handleLegacyNavigate, 
        onOpenNews: handleOpenNews 
    });
};

const SearchWrapper = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchTerm = location.state?.searchTerm || '';
    
    // Map PageView enums to routes
    const handleNavigate = (page: PageView) => {
        const routes: Record<string, string> = {
            [PageView.HOME]: '/',
            [PageView.PROCEDURES]: '/onderzoeken',
            [PageView.THERAPY]: '/therapie',
            [PageView.PREPARATION]: '/voorbereiding',
            [PageView.SAFETY]: '/veiligheid',
            [PageView.PRACTICAL]: '/praktisch',
            [PageView.ACADEMY]: '/academie',
            [PageView.PHYSICS]: '/academie/dosimetrie',
            [PageView.NEWS_DETAIL]: '/nieuws/1',
            [PageView.DONATION]: '/donatie',
            [PageView.ABOUT_US]: '/over-ons',
            [PageView.CONTACT]: '/contact',
            [PageView.VACANCIES]: '/vacatures',
            [PageView.HOSPITALS]: '/locaties',
            [PageView.FAQ]: '/faq',
            [PageView.QUIZ]: '/quiz'
        };
        const path = routes[page];
        if (path) navigate(path);
    };

    return (
        <LegacyWrapper>
            <SearchResults 
                searchTerm={searchTerm} 
                procedures={PROCEDURE_CATEGORIES}
                therapies={THERAPY_LIST}
                news={NEWS_ITEMS}
                vacancies={VACANCIES}
                faqs={FAQ_LIST}
                onNavigate={handleNavigate}
                onOpenNews={(id) => navigate(`/nieuws/${id}`)}
            />
        </LegacyWrapper>
    );
};

const NewsWrapper = () => {
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const article = NEWS_ITEMS.find(n => n.id === id) || NEWS_ITEMS[0];
    const navigate = useNavigate();
    
    return <NewsDetailPage article={article} onBack={() => navigate('/')} />;
};

export const App = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
        <div className={`min-h-screen bg-white font-sans text-slate-900 selection:bg-[#6FAEF7] selection:text-white flex flex-col ${isHighContrast ? 'grayscale contrast-125' : ''}`}>
            <ErrorBoundary>
                <Routes>
                    <Route element={
                        <Layout 
                            isHighContrast={isHighContrast}
                            toggleHighContrast={() => setIsHighContrast(!isHighContrast)}
                            isLoggedIn={isLoggedIn}
                            onLogin={() => setIsLoggedIn(true)}
                            onLogout={() => setIsLoggedIn(false)}
                        />
                    }>
                        {/* Core Routes */}
                        <Route path="/" element={<LegacyWrapper><HomePage onNavigate={() => {}} onOpenNews={() => {}} /></LegacyWrapper>} />
                        <Route path="/wat-is-ng" element={<LegacyWrapper><WhatIsNGPage onNavigate={() => {}} /></LegacyWrapper>} />
                        <Route path="/onderzoeken" element={<ProceduresPage />} />
                        <Route path="/therapie" element={<TherapyPage />} />
                        <Route path="/voorbereiding" element={<PreparationPage />} />
                        <Route path="/veiligheid" element={<SafetyPage />} />
                        <Route path="/praktisch" element={<LegacyWrapper><PracticalInfoPage onNavigate={() => {}} /></LegacyWrapper>} />
                        
                        {/* Utility / Info Routes */}
                        <Route path="/donatie" element={<DonationPage />} />
                        <Route path="/over-ons" element={<LegacyWrapper><AboutUsPage onNavigate={() => {}} /></LegacyWrapper>} />
                        <Route path="/contact" element={<ContactForm />} />
                        <Route path="/vacatures" element={<VacanciesPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/locaties" element={
                            <div className="pt-28 px-6 max-w-7xl mx-auto min-h-screen pb-20">
                                <Suspense fallback={<PageLoadingFallback />}><HospitalMap /></Suspense>
                            </div>
                        } />
                        <Route path="/quiz" element={<KnowledgeQuiz />} />
                        <Route path="/security-center" element={<SecurityCenter />} />
                        <Route path="/zoeken" element={<Suspense fallback={<PageLoadingFallback />}><SearchWrapper /></Suspense>} />
                        <Route path="/nieuws/:id" element={<NewsWrapper />} />
                        
                        {/* Academy Routes */}
                        <Route path="/academie" element={
                            <Suspense fallback={<PageLoadingFallback />}>
                                <LegacyWrapper><AcademyDashboard onNavigate={() => {}} /></LegacyWrapper>
                            </Suspense>
                        } />
                        <Route path="/academie/pacs" element={<Suspense fallback={<PageLoadingFallback />}><PacsSimulator /></Suspense>} />
                        <Route path="/academie/anatomie" element={<Suspense fallback={<PageLoadingFallback />}><AnatomyViewer /></Suspense>} />
                        <Route path="/academie/hotlab" element={<Suspense fallback={<PageLoadingFallback />}><HotlabPage /></Suspense>} />
                        <Route path="/academie/dosimetrie" element={
                            <div className="pt-28 px-6 max-w-4xl mx-auto min-h-screen pb-20">
                                <h1 className="text-3xl font-black text-slate-900 mb-8 font-jakarta">Dosimetrie & Fysica</h1>
                                <Suspense fallback={<PageLoadingFallback />}><DecaySimulator /></Suspense>
                            </div>
                        } />
                        <Route path="/academie/atlas" element={<Suspense fallback={<PageLoadingFallback />}><DiagnosticAtlas /></Suspense>} />
                        <Route path="/academie/fysiologie" element={<Suspense fallback={<PageLoadingFallback />}><Physiology /></Suspense>} />
                        <Route path="/academie/scantechniek" element={<Suspense fallback={<PageLoadingFallback />}><ScanTechnique /></Suspense>} />
                        
                        {/* Fallback */}
                        <Route path="*" element={<LegacyWrapper><HomePage onNavigate={() => {}} onOpenNews={() => {}} /></LegacyWrapper>} />
                    </Route>
                </Routes>
            </ErrorBoundary>
        </div>
    </BrowserRouter>
  );
};
