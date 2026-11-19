import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, ArrowRight, RefreshCw, Brain, Lightbulb } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Wat is de halfwaardetijd van Technetium-99m?",
    options: ["110 minuten", "6 uur", "68 minuten", "8 dagen"],
    correctIdx: 1,
    explanation: "Technetium-99m heeft een halfwaardetijd van 6 uur, wat het ideaal maakt voor diagnostiek: lang genoeg voor een scan, kort genoeg voor lage stralingsbelasting."
  },
  {
    id: 2,
    question: "Welk deeltje wordt gebruikt bij een PET-scan?",
    options: ["Alpha-deeltje", "Beta-min deeltje", "Positron", "Neutron"],
    correctIdx: 2,
    explanation: "PET staat voor Positron Emissie Tomografie. Een positron botst met een elektron (annihilatie) en zendt twee gamma-fotonen uit."
  },
  {
    id: 3,
    question: "Welke isotoop wordt voornamelijk gebruikt voor schildkliertherapie?",
    options: ["Jodium-131", "Fluor-18", "Lutetium-177", "Gallium-68"],
    correctIdx: 0,
    explanation: "Jodium-131 zendt beta-straling uit die schildkliercellen lokaal vernietigt. Fluor, Lutetium en Gallium hebben andere toepassingen."
  },
  {
    id: 4,
    question: "Wat betekent het ALARA-principe?",
    options: ["As Long As Radioactivity Allows", "All Levels Are Radiation Approved", "As Low As Reasonably Achievable", "Anti Low Alpha Radiation Area"],
    correctIdx: 2,
    explanation: "ALARA is de gouden regel in stralingsbescherming: de blootstelling zo laag houden als redelijkerwijs mogelijk is."
  },
  {
    id: 5,
    question: "Wat is het doel van Theranostics?",
    options: ["Alleen diagnose stellen", "Combinatie van diagnose en therapie met dezelfde biomarker", "Het meten van thermische straling", "MRI scans verbeteren"],
    correctIdx: 1,
    explanation: "Theranostics combineert diagnostiek (zien waar de ziekte zit) en therapie (de ziekte behandelen) met vergelijkbare moleculen."
  }
];

export const KnowledgeQuiz: React.FC = () => {
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === QUESTIONS[currentQIdx].correctIdx) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIdx < QUESTIONS.length - 1) {
      setCurrentQIdx(currentQIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 pt-28">
        <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-blue-100">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 font-jakarta">Quiz Voltooid!</h2>
          <p className="text-slate-500 mb-8">Je hebt je kennis over nucleaire geneeskunde getest.</p>
          
          <div className="text-6xl font-black text-blue-600 mb-2 font-jakarta">{score} / {QUESTIONS.length}</div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">Score</p>

          <button 
            onClick={restartQuiz}
            className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all hover:scale-105"
          >
            <RefreshCw className="mr-2 w-5 h-5" /> Opnieuw Proberen
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentQIdx];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 pt-28">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
            <Brain size={32} />
        </div>
        <div>
            <h1 className="text-3xl font-black text-slate-900 font-jakarta">Kennis Quiz</h1>
            <p className="text-slate-500">Test je kennis over isotopen en fysica.</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
          style={{ width: `${((currentQIdx + 1) / QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-widest">Vraag {currentQIdx + 1} van {QUESTIONS.length}</span>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Fysica</span>
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-8 font-jakarta leading-tight">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let stateClass = "border-slate-200 hover:border-blue-400 hover:bg-slate-50";
            if (isAnswered) {
              if (idx === currentQuestion.correctIdx) stateClass = "border-green-500 bg-green-50 text-green-900 ring-1 ring-green-500";
              else if (idx === selectedOption) stateClass = "border-red-500 bg-red-50 text-red-900";
              else stateClass = "border-slate-100 opacity-50";
            } else if (selectedOption === idx) {
              stateClass = "border-blue-500 bg-blue-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-5 rounded-xl border-2 font-bold transition-all duration-200 flex justify-between items-center ${stateClass}`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctIdx && <CheckCircle2 className="text-green-600" size={20} />}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIdx && <XCircle className="text-red-500" size={20} />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
                <div className="flex items-start gap-3">
                    <Lightbulb className="text-yellow-500 shrink-0 mt-1" size={20} />
                    <div>
                        <span className="font-bold text-slate-900 block mb-1">Uitleg</span>
                        <p className="text-slate-600 text-sm leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                </div>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-blue-500/30"
            >
              {currentQIdx < QUESTIONS.length - 1 ? "Volgende Vraag" : "Bekijk Resultaten"} <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};