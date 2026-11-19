
import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { IsotopeData } from '../types';
import { Calculator, ShieldAlert, FileText, Activity } from 'lucide-react';

export const DecaySimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verval' | 'dosimetrie'>('verval');
  
  // Verval State
  const [initialActivity, setInitialActivity] = useState<number>(100);
  const [selectedIsotope, setSelectedIsotope] = useState<string>('Technetium-99m');

  // Calculator State
  const [calcStartActivity, setCalcStartActivity] = useState<string>('500');
  const [calcTimeElapsed, setCalcTimeElapsed] = useState<string>('2');

  // Dosimetrie State (Inverse Square Law)
  const [doseRate1, setDoseRate1] = useState<string>('100');
  const [dist1, setDist1] = useState<string>('1');
  const [dist2, setDist2] = useState<string>('2');

  const isotopes = useMemo(() => [
    { name: 'Technetium-99m', t12: 6.01, label: '6 uur', energy: '140 keV', ref: 'Ref: NIST Radionuclide Data' },
    { name: 'Fluor-18', t12: 1.83, label: '110 min', energy: '511 keV', ref: 'Ref: IAEA Nuclear Data' },
    { name: 'Jodium-123', t12: 13.2, label: '13.2 uur', energy: '159 keV', ref: 'Ref: ICRP Publication 107' },
    { name: 'Lutetium-177', t12: 160.8, label: '6.7 dagen', energy: '208 keV', ref: 'Ref: NNDC Brookhaven' },
  ], []);

  const currentIso = useMemo(() => {
    return isotopes.find(i => i.name === selectedIsotope) || isotopes[0];
  }, [selectedIsotope, isotopes]);

  // PERFORMANCE: Bereken grafiekdata alleen als isotoop of activiteit verandert
  const chartData = useMemo(() => {
    const data: IsotopeData[] = [];
    const maxTime = Math.max(24, currentIso.t12 * 5);
    for (let i = 0; i <= 50; i++) {
      const time = (maxTime / 50) * i;
      const activity = initialActivity * Math.pow(0.5, time / currentIso.t12);
      data.push({ time: parseFloat(time.toFixed(1)), activity: parseFloat(activity.toFixed(1)) });
    }
    return data;
  }, [currentIso, initialActivity]);

  const calcResult = useMemo(() => {
    const A0 = parseFloat(calcStartActivity);
    const t = parseFloat(calcTimeElapsed);
    return isNaN(A0) || isNaN(t) ? 0 : A0 * Math.pow(0.5, t / currentIso.t12);
  }, [calcStartActivity, calcTimeElapsed, currentIso]);

  const doseResult = useMemo(() => {
    const D1 = parseFloat(doseRate1);
    const r1 = parseFloat(dist1);
    const r2 = parseFloat(dist2);
    if (isNaN(D1) || isNaN(r1) || isNaN(r2) || r2 === 0) return null;
    return D1 * Math.pow(r1 / r2, 2);
  }, [doseRate1, dist1, dist2]);

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 font-sans bg-white min-h-screen">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-100 pb-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Activity size={24} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Decay Simulator</h1>
                <p className="text-slate-500 font-medium mt-1">Interactieve isotoop verval & dosimetrie berekeningen.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Calculator size={14} className="text-blue-500" /> Computationele Simulator v3.1
            </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 animate-fade-in-up-delay-1">
        
        {/* Toggle Tabs */}
        <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-fit">
          <button 
            onClick={() => setActiveTab('verval')} 
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'verval' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Verval Profiel
          </button>
          <button 
            onClick={() => setActiveTab('dosimetrie')} 
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dosimetrie' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Dosimetrie & Afstand
          </button>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selecteer Isotoop</label>
            <select 
              value={selectedIsotope} 
              onChange={(e) => setSelectedIsotope(e.target.value)} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {isotopes.map(iso => <option key={iso.name} value={iso.name}>{iso.name} (T½ {iso.t12}u)</option>)}
            </select>
            <p className="text-[10px] text-slate-400 font-medium italic pl-1 flex items-center gap-1"><FileText size={10} /> {currentIso.ref} - {currentIso.energy}</p>
          </div>
          
          <div className="space-y-4 flex flex-col justify-center">
            <div className="flex justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Activiteit (Relatief %)</span>
              <span className="font-mono font-bold text-blue-600">{initialActivity}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5"
              value={initialActivity} 
              onChange={(e) => setInitialActivity(Number(e.target.value))} 
              className="w-full h-1.5 bg-slate-100 rounded-lg accent-blue-600 cursor-pointer" 
            />
          </div>
        </div>

        {/* Dynamic Content Area */}
        {activeTab === 'verval' ? (
            <div className="flex flex-col gap-8 animate-fade-in">
                <div className="h-[350px] bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative">
                  <div className="absolute top-8 right-8 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 z-10 hidden sm:block">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Tijdspanne (Uren) vs Activiteit</span>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" tick={{fontSize: 10, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                      <YAxis tick={{fontSize: 10, fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} 
                        itemStyle={{ color: '#2563EB', fontWeight: 'bold' }}
                        labelStyle={{ color: '#64748b', fontSize: '12px' }}
                      />
                      <ReferenceLine x={currentIso.t12} stroke="#f59e0b" strokeDasharray="5 5" label={{ position: 'top', value: 'T½', fill: '#f59e0b', fontSize: 10, fontWeight: 'bold' }} />
                      <Area type="monotone" dataKey="activity" stroke="#2563EB" fill="#efeefd" strokeWidth={3} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Activiteit T(0) [MBq]</label>
                            <input 
                                type="number" 
                                value={calcStartActivity} 
                                onChange={(e) => setCalcStartActivity(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono font-bold outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Verstreken Tijd (Uur)</label>
                            <input 
                                type="number" 
                                value={calcTimeElapsed} 
                                onChange={(e) => setCalcTimeElapsed(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono font-bold outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>
                    
                    <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-lg text-white flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10">
                            <Calculator size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-blue-200 font-bold text-xs uppercase tracking-widest">Resterende Activiteit T(t)</h4>
                              <div className="hidden md:block text-[10px] font-mono font-bold text-white tracking-[0.2em] bg-black/10 px-3 py-1.5 rounded-lg">A(t) = A₀ · 0.5^(t/T½)</div>
                            </div>
                            <div className="text-6xl md:text-7xl font-black font-mono tracking-tighter">
                                {calcResult.toFixed(1)} <span className="text-2xl md:text-3xl text-blue-300">MBq</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-blue-500/30">
                                <p className="text-sm text-blue-100 font-medium flex items-center gap-2">
                                    <ShieldAlert size={16} /> Gebaseerd op exponentiële vervalformule
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col gap-8 animate-fade-in">
                <div className="bg-blue-50 p-6 md:p-10 rounded-[2.5rem] border border-blue-100 relative group overflow-hidden">
                    <div className="absolute top-4 right-8 text-blue-100 group-hover:text-blue-200 transition-all duration-700">
                        <ShieldAlert size={64} />
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-lg shrink-0">
                            <ShieldAlert size={32} />
                        </div>
                        <div className="max-w-xl">
                            <h4 className="font-black text-slate-900 text-2xl font-jakarta mb-3 tracking-tight">Inverse Kwadratenwet</h4>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                De stralingsintensiteit neemt kwadratisch af met de afstand. Dit is de hoeksteen van het ALARA-principe (As Low As Reasonably Achievable).
                            </p>
                            <span className="text-[10px] font-mono font-bold text-blue-400 mt-4 block uppercase tracking-widest">Ref: ICRP-60 Standards</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Dosis-rate op d₁</label>
                            <div className="relative">
                                <input type="number" value={doseRate1} onChange={(e) => setDoseRate1(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-mono font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[10px] font-bold">µSv/h</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Afstand 1 (d₁)</label>
                                <div className="relative">
                                    <input type="number" value={dist1} onChange={(e) => setDist1(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-mono font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[10px] font-bold">m</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Afstand 2 (d₂)</label>
                                <div className="relative">
                                    <input type="number" value={dist2} onChange={(e) => setDist2(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-mono font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-[10px] font-bold">m</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-lg flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
                        <div className="relative z-10 text-center">
                            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Nieuwe Dosis-Rate op d₂</span>
                            <div className="mb-2">
                                <span className="text-6xl md:text-7xl font-black text-blue-500 font-mono tracking-tighter">
                                    {doseResult ? doseResult.toFixed(2) : '0.00'}
                                </span>
                            </div>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">µSv/h</span>
                            <div className="mt-8 pt-6 border-t border-slate-800">
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                    Berekend via: (D₁ * d₁²) / d₂²
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-100 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">“Deze berekeningen zijn gebaseerd op puntbron-modellen conform stralingsbeschermingsrichtlijnen.”</p>
      </div>
    </div>
  );
};
