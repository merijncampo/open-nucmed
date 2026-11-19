import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Applicatie fout opgevangen:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 font-jakarta">
          <div className="bg-white max-w-md w-full p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldAlert size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-2">Module tijdelijk onbereikbaar</h1>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
              Er is een verbindingsfout of weergavefout opgetreden bij het inladen van deze medische module.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#6FAEF7] transition-colors shadow-lg shadow-slate-900/10"
            >
              <RefreshCw size={18} /> Herlaad Portaal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
