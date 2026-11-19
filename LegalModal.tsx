import React from 'react';
import { X, Shield, FileText, Cookie } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'cookies' | null;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacybeleid',
          icon: Shield,
          color: 'text-green-600',
          bg: 'bg-green-50',
          text: (
            <div className="space-y-4 text-slate-600">
              <p><strong>Laatst bijgewerkt: 1 Januari 2025</strong></p>
              <p>Bij Nucleaire Geneeskunde Info respecteren wij uw privacy. Dit beleid beschrijft hoe wij omgaan met gegevens.</p>
              <h4 className="font-bold text-slate-900 mt-4">1. Gegevensverzameling</h4>
              <p>Wij verzamelen geen persoonlijk identificeerbare informatie (PII) tenzij u deze vrijwillig verstrekt via het contactformulier. Analytische gegevens worden geanonimiseerd verwerkt.</p>
              <h4 className="font-bold text-slate-900 mt-4">2. Medische Disclaimer</h4>
              <p>Informatie op deze app is puur educatief. Er worden geen medische diagnoses gesteld. Raadpleeg altijd uw behandelend specialist.</p>
              <h4 className="font-bold text-slate-900 mt-4">3. Beveiliging</h4>
              <p>Wij maken gebruik van SSL-encryptie om de veiligheid van uw verbinding te waarborgen.</p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Algemene Voorwaarden',
          icon: FileText,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          text: (
            <div className="space-y-4 text-slate-600">
              <p><strong>Toepasselijkheid</strong></p>
              <p>Door gebruik te maken van deze applicatie gaat u akkoord met deze voorwaarden.</p>
              <h4 className="font-bold text-slate-900 mt-4">1. Intellectueel Eigendom</h4>
              <p>Alle content, inclusief teksten, illustraties en code, is eigendom van Nucleaire Geneeskunde Info of haar licentiegevers.</p>
              <h4 className="font-bold text-slate-900 mt-4">2. Aansprakelijkheid</h4>
              <p>Wij zijn niet aansprakelijk voor enige directe of indirecte schade die voortvloeit uit het gebruik van de informatie op deze app.</p>
            </div>
          )
        };
      case 'cookies':
        return {
          title: 'Cookieverklaring',
          icon: Cookie,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          text: (
            <div className="space-y-4 text-slate-600">
              <p>Wij gebruiken functionele cookies om de website goed te laten werken (bijvoorbeeld uw voorkeur voor hoog contrast).</p>
              <h4 className="font-bold text-slate-900 mt-4">1. Soorten Cookies</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Functioneel:</strong> Noodzakelijk voor de werking.</li>
                <li><strong>Analytisch:</strong> Geanonimiseerde statistieken (Google Analytics).</li>
              </ul>
              <h4 className="font-bold text-slate-900 mt-4">2. Beheer</h4>
              <p>U kunt cookies uitschakelen via uw browserinstellingen, maar dit kan de werking van de app beïnvloeden.</p>
            </div>
          )
        };
      default:
        return { title: '', icon: X, color: '', bg: '', text: null };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${content.bg} ${content.color} rounded-2xl flex items-center justify-center`}>
              <content.icon size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-jakarta">{content.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto font-medium leading-relaxed">
          {content.text}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
          >
            Ik begrijp het
          </button>
        </div>
      </div>
    </div>
  );
};