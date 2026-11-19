
import React from 'react';
import { LucideIcon } from 'lucide-react';

export enum PageView {
  HOME = 'HOME',
  WHAT_IS_NG = 'WHAT_IS_NG',
  PROCEDURES = 'PROCEDURES',
  THERAPY = 'THERAPY',
  PREPARATION = 'PREPARATION',
  SAFETY = 'SAFETY',
  PRACTICAL = 'PRACTICAL',
  FAQ = 'FAQ',
  PHYSICS = 'PHYSICS',
  QUIZ = 'QUIZ',
  CONTACT = 'CONTACT',
  ANATOMY = 'ANATOMY',
  DIAGNOSTIC_ATLAS = 'DIAGNOSTIC_ATLAS',
  HOTLAB = 'HOTLAB',
  HOSPITALS = 'HOSPITALS',
  SEARCH_RESULTS = 'SEARCH_RESULTS',
  DASHBOARD = 'DASHBOARD',
  DONATION = 'DONATION',
  VACANCIES = 'VACANCIES',
  ACADEMY = 'ACADEMY',
  ABOUT_US = 'ABOUT_US',
  NEWS_DETAIL = 'NEWS_DETAIL',
  SECURITY_CENTER = 'SECURITY_CENTER',
  PACS_SIMULATOR = 'PACS_SIMULATOR',
  PHYSIOLOGY = 'PHYSIOLOGY',
  TRACERS = 'TRACERS',
  SCAN_TECHNIQUE = 'SCAN_TECHNIQUE',
  DOSIMETRY_PHYSICS = 'DOSIMETRY_PHYSICS'
}

export interface Case {
  id: string;
  patientName: string;
  birthDate: string;
  scanType: string;
  isotope: string;
  indication: string;
  findings: string;
  diagnosis: string;
  modality: 'PET/CT' | 'SPECT/CT' | 'SPECT';
}

export interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'Academic' | 'Clinical';
  address: string;
  website: string;
  province: string;
  routeNumber: string;
  floor: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  fullContent?: string;
  sources?: string[];
}

export interface ProcedureCategory {
  category: string;
  icon: LucideIcon;
  items: ProcedureDetail[];
}

export interface ProcedureDetail {
  title: string;
  desc: string;
  indication: string;
  method: string;
  tracer: string;
  duration: string;
  preparation: string;
  aftercare: string;
  source?: string;
}

export interface TherapyItem {
  name: string;
  isotope: string;
  desc: string;
  mechanism: string;
  admission: string;
  sideEffects: string;
  source?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface IsotopeData {
  time: number;
  activity: number;
}
