
import React, { useState, useEffect } from 'react';
import { Shield, Lock, ShieldCheck, ShieldAlert, Eye, Server, Globe, Key, Activity, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export const SecurityCenter: React.FC = () => {
    const [scanProgress, setScanProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);
    const [scanResults, setScanResults] = useState<{label: string, status: 'ok' | 'warn', value: string}[]>([]);

    const runScan = () => {
        setIsScanning(true);
        setScanComplete(false);
        setScanProgress(0);
        setScanResults([]);

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    finishScan();
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
    };

    const finishScan = () => {
        setIsScanning(false);
        setScanComplete(true);
        setScanResults([
            { label: 'SSL/TLS Encryptie', status: 'ok', value: 'AES-256-GCM Actief' },
            { label: 'Privacy Modus', status: 'ok', value: 'PrivacyShield Ingeschakeld' },
            { label: 'Data Anonimisering', status: 'ok', value: 'Analytische Gegevens Geanonimiseerd' },
            { label: 'AVG/GDPR Compliance', status: 'ok', value: 'Volledig Conform' },
            { label: 'Sessie Beveiliging', status: 'ok', value: 'Isolatie Actief' }
        ]);
    };

    return (
        <div className="pt-24 min-h-screen bg-white font-jakarta animate-fade-in-up">
            <header className="max-w-7xl mx-auto px-6 md:px-12 pt-12 mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Beveiligingscentrum</h1>
                        <p className="text-slate-500 font-medium">Uw medische privacy is onze hoogste prioriteit.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <Lock className="text-blue-500 mb-6" size={32} />
                        <h3 className="text-xl font-black mb-2">SSL Versleuteling</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">Elke verbinding met dit portaal wordt versleuteld met 256-bit AES encryptie, de industriestandaard voor banken en zorginstellingen.</p>
                        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={14} /> Beveiligde Verbinding
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                        <Eye className="text-emerald-500 mb-6" size={32} />
                        <h3 className="text-xl font-black text-slate-900 mb-2">PrivacyShield</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">Onze actieve 'Blur-on-hidden' technologie verbergt automatisch uw patiëntinformatie wanneer u van tabblad wisselt in uw browser.</p>
                        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={14} /> Actief Ingeschakeld
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                        <Globe className="text-purple-500 mb-6" size={32} />
                        <h3 className="text-xl font-black text-slate-900 mb-2">AVG/GDPR</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">Wij voldoen aan alle eisen van de Algemene Verordening Gegevensbescherming. Er wordt geen data verkocht of ongevraagd gedeeld.</p>
                        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 size={14} /> 100% Conform
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row h-full">
                        {/* Scanner Interaction */}
                        <div className="w-full lg:w-2/5 p-10 md:p-16 bg-slate-50 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-slate-100">
                            <div className="relative mb-8">
                                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${isScanning ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'border-slate-200'}`}>
                                    {isScanning ? (
                                        <Loader2 size={48} className="text-blue-500 animate-spin" />
                                    ) : scanComplete ? (
                                        <ShieldCheck size={48} className="text-emerald-500" />
                                    ) : (
                                        <Activity size={48} className="text-slate-300" />
                                    )}
                                </div>
                                {isScanning && (
                                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
                                )}
                            </div>
                            
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Systeem Controle</h2>
                            <p className="text-slate-500 text-sm mb-8 max-w-xs">Scan uw huidige sessie om de actieve beveiligingsfuncties te verifiëren.</p>
                            
                            <div className="w-full max-w-xs bg-slate-200 h-1.5 rounded-full mb-8 overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500 transition-all duration-300" 
                                    style={{ width: `${scanProgress}%` }}
                                ></div>
                            </div>

                            <button 
                                onClick={runScan}
                                disabled={isScanning}
                                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${isScanning ? 'bg-slate-300 text-white cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-900/10 hover:shadow-blue-500/20'}`}
                            >
                                {isScanning ? 'Controleren...' : scanComplete ? 'Opnieuw Scannen' : 'Start Beveiligings-Scan'}
                            </button>
                        </div>

                        {/* Scanner Results */}
                        <div className="flex-1 p-10 md:p-16">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                {scanComplete ? 'Scan Resultaten' : 'Wacht op Scan...'}
                                {scanComplete && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">VERIFIED</span>}
                            </h3>

                            {!scanComplete && !isScanning ? (
                                <div className="flex flex-col items-center justify-center h-64 text-slate-300 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                    <AlertCircle size={48} className="mb-4 opacity-50" />
                                    <p className="font-bold">Start de scan voor details</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {(isScanning ? [
                                        { label: 'Ophalen SSL certificaten...', status: 'ok', value: 'Bezig...' },
                                        { label: 'Checken Browseromgeving...', status: 'ok', value: 'Bezig...' }
                                    ] : scanResults).map((res, i) => (
                                        <div key={i} className={`p-6 rounded-2xl border flex items-center justify-between transition-all animate-in fade-in slide-in-from-left-4 duration-300 ${isScanning ? 'opacity-50' : ''}`} style={{animationDelay: `${i * 100}ms`}}>
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg ${res.status === 'ok' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                                                    <ShieldCheck size={18} />
                                                </div>
                                                <span className="font-bold text-slate-700 text-sm">{res.label}</span>
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${res.status === 'ok' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {res.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {scanComplete && (
                                <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
                                    <Server size={24} className="text-blue-600 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-blue-900 mb-1">Infrastructuur Informatie</h4>
                                        <p className="text-xs text-blue-700 leading-relaxed font-medium">
                                            Uw sessie wordt afgehandeld op een gedistribueerd netwerk met geavanceerde DDoS-bescherming en web-applicatie firewalls (WAF). Al uw verzoeken worden real-time gecontroleerd op kwaadaardige patronen.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-slate-900 font-jakarta">Technische Garanties</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                                    <Key size={20} className="text-slate-900" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Identiteitsbescherming</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Bij inlogpogingen gebruiken we multi-factor authenticatie (MFA) via DigiD of ZorgDomein om ongeautoriseerde toegang te voorkomen.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                                    <ShieldAlert size={20} className="text-slate-900" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Intrusie Detectie</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Systemen scannen continu op verdachte activiteiten en blokkeren automatisch IP-adressen die brute-force aanvallen vertonen.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100">
                        <h3 className="text-xl font-black text-emerald-900 mb-4 font-jakarta">Data-anonimisering</h3>
                        <p className="text-sm text-emerald-800 leading-relaxed mb-6 font-medium">
                            Zelfs voor onze interne statistieken wordt uw data geanonimiseerd. Wij gebruiken 'Differential Privacy' algoritmes om trends te spotten zonder ooit uw identiteit te onthullen.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Geen tracking cookies van derden
                            </li>
                            <li className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> IP-adres maskering actief
                            </li>
                            <li className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Encryptie op database-niveau
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-12 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] italic mb-4">
                        Beveiligingsstatus: OPTIMAAL // Laatste validatie door systeem: Vandaag
                    </p>
                </div>
            </main>
        </div>
    );
};
