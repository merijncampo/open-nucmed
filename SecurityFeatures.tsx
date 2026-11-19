import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, Smartphone, Fingerprint, RefreshCw, AlertTriangle, Key } from 'lucide-react';

// --- PRIVACY BLUR COMPONENT ---
export const PrivacyShield: React.FC = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  if (!isBlurred) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/50 backdrop-blur-xl flex flex-col items-center justify-center text-white">
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl text-center max-w-md mx-4">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
           <EyeOff size={40} />
        </div>
        <h2 className="text-2xl font-black font-jakarta mb-2">Privacy Modus Actief</h2>
        <p className="text-slate-400 mb-6">
          De inhoud is verborgen omdat u naar een ander venster bent gewisseld. Dit beschermt uw medische gegevens.
        </p>
        <button className="px-6 py-2 bg-slate-800 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-700">
          Klik om terug te keren
        </button>
      </div>
    </div>
  );
};

// --- IDLE TIMER COMPONENT ---
interface IdleTimerProps {
  timeout?: number; // minutes
  onIdle: () => void;
}

export const IdleTimer: React.FC<IdleTimerProps> = ({ timeout = 5, onIdle }) => {
  useEffect(() => {
    let timer: number;
    
    const resetTimer = () => {
      clearTimeout(timer);
      timer = window.setTimeout(onIdle, timeout * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    resetTimer(); // Init

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [timeout, onIdle]);

  return null;
};

// --- 2FA LOGIN MODAL ---
interface TwoFactorModalProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1); // 1: Creds, 2: SMS, 3: Bio/Success
  const [isLoading, setIsLoading] = useState(false);
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setStep(2);
    }, 1500);
  };

  const handleSmsChange = (idx: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newCode = [...smsCode];
    newCode[idx] = val;
    setSmsCode(newCode);
    
    // Auto focus next
    if (val && idx < 5) {
        const nextInput = document.getElementById(`sms-${idx + 1}`);
        nextInput?.focus();
    }
  };

  const handleVerifySms = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setStep(3);
      }, 1500);
  };

  const handleBioSuccess = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          onComplete();
      }, 1500);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-slate-900/5 relative">
        
        {/* Security Banner */}
        <div className="bg-slate-900 px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
                <Shield size={16} className="text-green-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Secure Gateway</span>
            </div>
            <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors">
                <Key size={16} />
            </button>
        </div>

        <div className="p-8 pt-10">
            {step === 1 && (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                            <Lock size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 font-jakarta">Authenticatie</h3>
                        <p className="text-slate-500 text-sm">Log in met uw DigiD gegevens.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gebruikersnaam / BSN</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="123456789" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Wachtwoord</label>
                        <input type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••••••" />
                    </div>

                    <button disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-70">
                        {isLoading ? <RefreshCw className="animate-spin" /> : 'Verder naar Stap 2'}
                    </button>
                </form>
            )}

            {step === 2 && (
                 <div className="space-y-6">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                            <Smartphone size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 font-jakarta">2FA Verificatie</h3>
                        <p className="text-slate-500 text-sm">Vul de 6-cijferige code in die naar uw telefoon (**67) is verstuurd.</p>
                    </div>

                    <div className="flex justify-between gap-2">
                        {smsCode.map((digit, idx) => (
                            <input 
                                key={idx}
                                id={`sms-${idx}`}
                                type="text" 
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleSmsChange(idx, e.target.value)}
                                className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                            />
                        ))}
                    </div>

                    <button onClick={handleVerifySms} disabled={isLoading || smsCode.includes('')} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50 mt-8">
                         {isLoading ? <RefreshCw className="animate-spin" /> : 'Verifiëren'}
                    </button>
                 </div>
            )}

            {step === 3 && (
                 <div className="space-y-6 text-center">
                    <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <Fingerprint size={48} className="animate-pulse" />
                        <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 font-jakarta">Biometrische Controle</h3>
                    <p className="text-slate-500 text-sm mb-8">Bevestig uw identiteit om toegang te krijgen tot het medisch dossier.</p>

                    <button onClick={handleBioSuccess} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg shadow-green-500/30">
                        {isLoading ? <RefreshCw className="animate-spin" /> : 'Scan Vingerafdruk / FaceID'}
                    </button>
                 </div>
            )}
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 px-8 py-3 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-bold">
            <span className="flex items-center gap-1"><Lock size={10} /> AES-256 Encrypted</span>
            <span>Sessie ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};