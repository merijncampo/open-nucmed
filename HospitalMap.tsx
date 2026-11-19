
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Hospital } from '../types';
import { Navigation, MapPin, Info, Search, Filter, Globe, Building2, Stethoscope, ChevronRight, Database, Map as MapIcon, Layers, CheckCircle2, Locate, Compass, ArrowUpRight } from 'lucide-react';

// --- LEAFLET ICONS ---
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Larger icon for the selected hospital
const activeIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: shadowUrl,
    iconSize: [35, 55],
    iconAnchor: [17, 55],
    popupAnchor: [1, -45],
    shadowSize: [41, 41]
});

// --- DATA ---
const HOSPITALS: Hospital[] = [
  // --- Academisch (UMC's) ---
  { id: 'amc', name: 'Amsterdam UMC (Locatie AMC)', lat: 52.2952, lng: 4.9596, type: 'Academic', address: 'Meibergdreef 9, Amsterdam', website: 'https://www.amsterdamumc.nl', province: 'Noord-Holland', routeNumber: 'Route 35', floor: 'Begane Grond' },
  { id: 'vumc', name: 'Amsterdam UMC (Locatie VUmc)', lat: 52.3336, lng: 4.8656, type: 'Academic', address: 'De Boelelaan 1117, Amsterdam', website: 'https://www.amsterdamumc.nl', province: 'Noord-Holland', routeNumber: 'PK 0 Zuid', floor: 'Verdieping 0' },
  { id: 'erasmus', name: 'Erasmus MC', lat: 51.9115, lng: 4.4745, type: 'Academic', address: 'Doctor Molewaterplein 40, Rotterdam', website: 'https://www.erasmusmc.nl', province: 'Zuid-Holland', routeNumber: 'Route Ca-4', floor: '4e Verdieping' },
  { id: 'lumc', name: 'LUMC', lat: 52.1664, lng: 4.4824, type: 'Academic', address: 'Albinusdreef 2, Leiden', website: 'https://www.lumc.nl', province: 'Zuid-Holland', routeNumber: 'Route 120', floor: '1e Verdieping' },
  { id: 'umcu', name: 'UMC Utrecht', lat: 52.0863, lng: 5.1764, type: 'Academic', address: 'Heidelberglaan 100, Utrecht', website: 'https://www.umcutrecht.nl', province: 'Utrecht', routeNumber: 'Route L', floor: '2e Verdieping' },
  { id: 'radboud', name: 'Radboudumc', lat: 51.8239, lng: 5.8617, type: 'Academic', address: 'Geert Grooteplein Zuid 10, Nijmegen', website: 'https://www.radboudumc.nl', province: 'Gelderland', routeNumber: 'Route 730', floor: 'Begane Grond' },
  { id: 'umcg', name: 'UMC Groningen', lat: 53.2215, lng: 6.5746, type: 'Academic', address: 'Hanzeplein 1, Groningen', website: 'https://www.umcg.nl', province: 'Groningen', routeNumber: 'Fonteinstraat 12', floor: 'Begane Grond' },
  { id: 'mumc', name: 'Maastricht UMC+', lat: 50.8368, lng: 5.7142, type: 'Academic', address: 'P. Debyelaan 25, Maastricht', website: 'https://www.mumc.nl', province: 'Limburg', routeNumber: 'Niveau 1', floor: '1e Verdieping' },
  { id: 'avl', name: 'Antoni van Leeuwenhoek (AVL)', lat: 52.3486, lng: 4.8272, type: 'Academic', address: 'Plesmanlaan 121, Amsterdam', website: 'https://www.avl.nl', province: 'Noord-Holland', routeNumber: 'Route 2', floor: 'Begane Grond' },
  { id: 'prinses_maxima', name: 'Prinses Máxima Centrum', lat: 52.0870, lng: 5.1780, type: 'Academic', address: 'Heidelberglaan 25, Utrecht', website: 'https://www.prinsesmaximacentrum.nl', province: 'Utrecht', routeNumber: 'Radiologie', floor: 'Begane Grond' },

  // --- Noord-Holland ---
  { id: 'nwz_alkmaar', name: 'Noordwest Ziekenhuisgroep', lat: 52.6288, lng: 4.7397, type: 'Clinical', address: 'Wilhelminalaan 12, Alkmaar', website: 'https://www.nwz.nl', province: 'Noord-Holland', routeNumber: '022', floor: 'Begane Grond' },
  { id: 'olvg_oost', name: 'OLVG (Locatie Oost)', lat: 52.3596, lng: 4.9200, type: 'Clinical', address: 'Oosterpark 9, Amsterdam', website: 'https://www.olvg.nl', province: 'Noord-Holland', routeNumber: 'Route 3', floor: '1e Verdieping' },
  { id: 'olvg_west', name: 'OLVG (Locatie West)', lat: 52.3725, lng: 4.8465, type: 'Clinical', address: 'Jan Tooropstraat 164, Amsterdam', website: 'https://www.olvg.nl', province: 'Noord-Holland', routeNumber: 'Route 12', floor: 'Begane Grond' },
  { id: 'spaarne_hoofddorp', name: 'Spaarne Gasthuis (Hoofddorp)', lat: 52.2965, lng: 4.6830, type: 'Clinical', address: 'Spaarnepoort 1, Hoofddorp', website: 'https://www.spaarnegasthuis.nl', province: 'Noord-Holland', routeNumber: 'Vleugel C', floor: 'Begane Grond' },
  { id: 'spaarne_haarlem', name: 'Spaarne Gasthuis (Haarlem)', lat: 52.3640, lng: 4.6435, type: 'Clinical', address: 'Boerhaavelaan 22, Haarlem', website: 'https://www.spaarnegasthuis.nl', province: 'Noord-Holland', routeNumber: 'Route 15', floor: 'Begane Grond' },
  { id: 'dijklander_hoorn', name: 'Dijklander Ziekenhuis (Hoorn)', lat: 52.6424, lng: 5.0478, type: 'Clinical', address: 'Maelsonstraat 3, Hoorn', website: 'https://www.dijklander.nl', province: 'Noord-Holland', routeNumber: 'Route 45', floor: '1e Verdieping' },
  { id: 'tergooi', name: 'Tergooi MC', lat: 52.2088, lng: 5.1867, type: 'Clinical', address: 'Laan van Tergooi 2, Hilversum', website: 'https://www.tergooi.nl', province: 'Noord-Holland', routeNumber: 'A0', floor: 'Begane Grond' },
  { id: 'rkz', name: 'Rode Kruis Ziekenhuis', lat: 52.4789, lng: 4.6578, type: 'Clinical', address: 'Vondellaan 13, Beverwijk', website: 'https://www.rkz.nl', province: 'Noord-Holland', routeNumber: 'Route 30', floor: 'Begane Grond' },

  // --- Zuid-Holland ---
  { id: 'haga', name: 'HagaZiekenhuis (Den Haag)', lat: 52.0573, lng: 4.2628, type: 'Clinical', address: 'Els Borst-Eilersplein 275, Den Haag', website: 'https://www.hagaziekenhuis.nl', province: 'Zuid-Holland', routeNumber: 'Route B', floor: '1e Verdieping' },
  { id: 'hmc_westeinde', name: 'HMC Westeinde', lat: 52.0739, lng: 4.2986, type: 'Clinical', address: 'Lijnbaan 32, Den Haag', website: 'https://www.haaglandenmc.nl', province: 'Zuid-Holland', routeNumber: 'Route Rood', floor: 'Begane Grond' },
  { id: 'reinier', name: 'Reinier de Graaf Gasthuis', lat: 52.0028, lng: 4.3339, type: 'Clinical', address: 'Reinier de Graafweg 5, Delft', website: 'https://www.reinierdegraaf.nl', province: 'Zuid-Holland', routeNumber: 'Gang C', floor: 'Begane Grond' },
  { id: 'franciscus', name: 'Franciscus Gasthuis', lat: 51.9472, lng: 4.4678, type: 'Clinical', address: 'Kleiweg 500, Rotterdam', website: 'https://www.franciscus.nl', province: 'Zuid-Holland', routeNumber: 'Plein 2', floor: '1e Verdieping' },
  { id: 'maasstad', name: 'Maasstad Ziekenhuis', lat: 51.8744, lng: 4.5222, type: 'Clinical', address: 'Maasstadweg 21, Rotterdam', website: 'https://www.maasstadziekenhuis.nl', province: 'Zuid-Holland', routeNumber: 'Route 60', floor: 'Begane Grond' },
  { id: 'ikazia', name: 'Ikazia Ziekenhuis', lat: 51.8844, lng: 4.4922, type: 'Clinical', address: 'Montessoriweg 1, Rotterdam', website: 'https://www.ikazia.nl', province: 'Zuid-Holland', routeNumber: 'Route 18', floor: 'Begane Grond' },
  { id: 'albert_schweitzer', name: 'Albert Schweitzer Ziekenhuis', lat: 51.8028, lng: 4.6528, type: 'Clinical', address: 'Albert Schweitzerplaats 25, Dordrecht', website: 'https://www.asz.nl', province: 'Zuid-Holland', routeNumber: 'Afdeling E', floor: 'Begane Grond' },
  { id: 'groene_hart', name: 'Groene Hart Ziekenhuis', lat: 52.0167, lng: 4.6958, type: 'Clinical', address: 'Bleulandweg 10, Gouda', website: 'https://www.ghz.nl', province: 'Zuid-Holland', routeNumber: 'Route 42', floor: 'Begane Grond' },
  { id: 'alrijne', name: 'Alrijne Ziekenhuis', lat: 52.1625, lng: 4.5139, type: 'Clinical', address: 'Simon Smitweg 1, Leiderdorp', website: 'https://www.alrijne.nl', province: 'Zuid-Holland', routeNumber: 'Route 22', floor: 'Begane Grond' },

  // --- Utrecht ---
  { id: 'antonius_nieuwegein', name: 'St. Antonius Ziekenhuis', lat: 52.0292, lng: 5.0717, type: 'Clinical', address: 'Koekoekslaan 1, Nieuwegein', website: 'https://www.antoniusziekenhuis.nl', province: 'Utrecht', routeNumber: 'Route 52', floor: '1e Verdieping' },
  { id: 'diak', name: 'Diakonessenhuis Utrecht', lat: 52.0792, lng: 5.1389, type: 'Clinical', address: 'Bosboomstraat 1, Utrecht', website: 'https://www.diakonessenhuis.nl', province: 'Utrecht', routeNumber: 'Route 112', floor: 'Begane Grond' },
  { id: 'meander', name: 'Meander Medisch Centrum', lat: 52.1728, lng: 5.3789, type: 'Clinical', address: 'Maatweg 3, Amersfoort', website: 'https://www.meandermc.nl', province: 'Utrecht', routeNumber: 'Laan 8', floor: 'Begane Grond' },

  // --- Gelderland ---
  { id: 'rijnstate', name: 'Rijnstate Arnhem', lat: 51.9975, lng: 5.9039, type: 'Clinical', address: 'Wagnerlaan 55, Arnhem', website: 'https://www.rijnstate.nl', province: 'Gelderland', routeNumber: 'Route 40', floor: 'Begane Grond' },
  { id: 'gelderse_vallei', name: 'Ziekenhuis Gelderse Vallei', lat: 52.0194, lng: 5.6514, type: 'Clinical', address: 'Willy Brandtlaan 10, Ede', website: 'https://www.geldersevallei.nl', province: 'Gelderland', routeNumber: 'Vleugel B', floor: 'Begane Grond' },
  { id: 'cwz', name: 'Canisius Wilhelmina Ziekenhuis', lat: 51.8153, lng: 5.8336, type: 'Clinical', address: 'Weg door Jonkerbos 100, Nijmegen', website: 'https://www.cwz.nl', province: 'Gelderland', routeNumber: 'B12', floor: 'Begane Grond' },
  { id: 'slingeland', name: 'Slingeland Ziekenhuis', lat: 51.9667, lng: 6.3000, type: 'Clinical', address: 'Kruisbergseweg 25, Doetinchem', website: 'https://www.slingeland.nl', province: 'Gelderland', routeNumber: 'Route 66', floor: 'Begane Grond' },

  // --- Overijssel ---
  { id: 'isala', name: 'Isala Zwolle', lat: 52.5167, lng: 6.1261, type: 'Clinical', address: 'Dokter van Heesweg 2, Zwolle', website: 'https://www.isala.nl', province: 'Overijssel', routeNumber: 'V3.2', floor: 'Verdieping 3' },
  { id: 'mst', name: 'Medisch Spectrum Twente', lat: 52.2178, lng: 6.8925, type: 'Clinical', address: 'Koningsplein 1, Enschede', website: 'https://www.mst.nl', province: 'Overijssel', routeNumber: 'C12', floor: 'Begane Grond' },
  { id: 'zgt', name: 'ZGT Almelo', lat: 52.3667, lng: 6.6667, type: 'Clinical', address: 'Zilvermeeuw 1, Almelo', website: 'https://www.zgt.nl', province: 'Overijssel', routeNumber: 'Route 0.4', floor: 'Begane Grond' },
  { id: 'deventer', name: 'Deventer Ziekenhuis', lat: 52.2750, lng: 6.1889, type: 'Clinical', address: 'Nico Bolkesteinlaan 75, Deventer', website: 'https://www.dz.nl', province: 'Overijssel', routeNumber: 'Route 150', floor: '1e Verdieping' },

  // --- Noord-Brabant ---
  { id: 'catharina', name: 'Catharina Ziekenhuis', lat: 51.4646, lng: 5.4747, type: 'Clinical', address: 'Michelangelolaan 2, Eindhoven', website: 'https://www.catharinaziekenhuis.nl', province: 'Noord-Brabant', routeNumber: 'Route 112', floor: '1e Verdieping' },
  { id: 'mmc', name: 'Máxima Medisch Centrum', lat: 51.4089, lng: 5.4083, type: 'Clinical', address: 'De Run 4600, Veldhoven', website: 'https://www.mmc.nl', province: 'Noord-Brabant', routeNumber: 'Route 60', floor: 'Begane Grond' },
  { id: 'etz', name: 'Elisabeth-TweeSteden (ETZ)', lat: 51.5375, lng: 5.0931, type: 'Clinical', address: 'Hilvarenbeekseweg 60, Tilburg', website: 'https://www.etz.nl', province: 'Noord-Brabant', routeNumber: 'Route 25', floor: 'Begane Grond' },
  { id: 'amphia', name: 'Amphia Ziekenhuis', lat: 51.5833, lng: 4.8097, type: 'Clinical', address: 'Molengracht 21, Breda', website: 'https://www.amphia.nl', province: 'Noord-Brabant', routeNumber: 'Bouwdeel 3', floor: 'Begane Grond' },
  { id: 'jbz', name: 'Jeroen Bosch Ziekenhuis', lat: 51.6889, lng: 5.2847, type: 'Clinical', address: 'Henri Dunantstraat 1, Den Bosch', website: 'https://www.jbz.nl', province: 'Noord-Brabant', routeNumber: 'Gebouw B', floor: 'Begane Grond' },
  { id: 'bravis', name: 'Bravis Ziekenhuis', lat: 51.5333, lng: 4.4500, type: 'Clinical', address: 'Boerhaaveplein 1, Bergen op Zoom', website: 'https://www.bravis.nl', province: 'Noord-Brabant', routeNumber: 'Route 42', floor: 'Begane Grond' },
  { id: 'bernhoven', name: 'Bernhoven', lat: 51.6667, lng: 5.6167, type: 'Clinical', address: 'Nistelrodeseweg 10, Uden', website: 'https://www.bernhoven.nl', province: 'Noord-Brabant', routeNumber: 'Route 030', floor: 'Begane Grond' },

  // --- Limburg ---
  { id: 'zuyderland', name: 'Zuyderland Medisch Centrum', lat: 50.8753, lng: 5.9614, type: 'Clinical', address: 'Henri Dunantstraat 5, Heerlen', website: 'https://www.zuyderland.nl', province: 'Limburg', routeNumber: 'West 02', floor: 'Begane Grond' },
  { id: 'viecuri', name: 'VieCuri Medisch Centrum', lat: 51.3789, lng: 6.1667, type: 'Clinical', address: 'Tegelseweg 210, Venlo', website: 'https://www.viecuri.nl', province: 'Limburg', routeNumber: 'Route 22', floor: 'Begane Grond' },
  { id: 'laurentius', name: 'Laurentius Ziekenhuis', lat: 51.1967, lng: 5.9967, type: 'Clinical', address: 'Monseigneur Driessenstraat 6, Roermond', website: 'https://www.laurentiusziekenhuis.nl', province: 'Limburg', routeNumber: 'Route 1.4', floor: '1e Verdieping' },

  // --- Noord-Nederland ---
  { id: 'martini', name: 'Martini Ziekenhuis', lat: 53.1944, lng: 6.5611, type: 'Clinical', address: 'Van Swietenplein 1, Groningen', website: 'https://www.martiniziekenhuis.nl', province: 'Groningen', routeNumber: 'Route 0.6', floor: 'Begane Grond' },
  { id: 'mcl', name: 'Medisch Centrum Leeuwarden', lat: 53.1897, lng: 5.8039, type: 'Clinical', address: 'Henri Dunantweg 2, Leeuwarden', website: 'https://www.mcl.nl', province: 'Friesland', routeNumber: 'Route 40', floor: 'Begane Grond' },
  { id: 'nij_smellinghe', name: 'Nij Smellinghe', lat: 53.1083, lng: 6.0833, type: 'Clinical', address: 'Compagnonsplein 1, Drachten', website: 'https://www.nijsmellinghe.nl', province: 'Friesland', routeNumber: 'Route 10', floor: 'Begane Grond' },
  { id: 'treant_emmen', name: 'Treant (Locatie Scheper)', lat: 52.7833, lng: 6.9000, type: 'Clinical', address: 'Boermarkeweg 60, Emmen', website: 'https://www.treant.nl', province: 'Drenthe', routeNumber: 'Route 32', floor: 'Begane Grond' },

  // --- Zeeland ---
  { id: 'adrz', name: 'Adrz (Locatie Goes)', lat: 51.4967, lng: 3.8967, type: 'Clinical', address: "'s-Gravenpolderseweg 114, Goes", website: 'https://www.adrz.nl', province: 'Zeeland', routeNumber: 'Route 40', floor: 'Begane Grond' },
  { id: 'zorgsaam', name: 'ZorgSaam Ziekenhuis', lat: 51.3167, lng: 3.8333, type: 'Clinical', address: 'Wielingenlaan 2, Terneuzen', website: 'https://www.zorgsaam.org', province: 'Zeeland', routeNumber: 'Route 70', floor: 'Begane Grond' },

  // --- Flevoland ---
  { id: 'st_jansdal', name: 'St Jansdal (Lelystad)', lat: 52.5083, lng: 5.4750, type: 'Clinical', address: 'Ziekenhuisweg 100, Lelystad', website: 'https://www.stjansdal.nl', province: 'Flevoland', routeNumber: 'Route 0.22', floor: 'Begane Grond' }
];

// Helper component to handle map movement when state changes
const MapViewUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, {
            duration: 1.5,
            easeLinearity: 0.25
        });
    }, [map, center, zoom]);
    return null;
};

// ROBUST FIX: Use ResizeObserver to invalidate map size when container changes
const MapResizeFix: React.FC = () => {
    const map = useMap();
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        containerRef.current = map.getContainer();
        if (!containerRef.current) return;

        const observer = new ResizeObserver(() => {
            map.invalidateSize();
        });

        observer.observe(containerRef.current);
        
        // Initial invalidation
        map.invalidateSize();

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
            observer.disconnect();
        };
    }, [map]);

    return null;
};

const HospitalMap: React.FC = () => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Academic' | 'Clinical'>('All');
  
  const [mapCenter, setMapCenter] = useState<[number, number]>([52.1326, 5.2913]);
  const [mapZoom, setMapZoom] = useState(7);
  const mapRef = useRef<L.Map | null>(null);

  const filteredHospitals = useMemo(() => {
      return HOSPITALS.filter(h => {
          const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                h.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                h.province.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesType = filterType === 'All' || h.type === filterType;
          return matchesSearch && matchesType;
      });
  }, [searchTerm, filterType]);

  // Group hospitals by province for the directory list
  const hospitalsByProvince = useMemo(() => {
      const grouped: Record<string, Hospital[]> = {};
      HOSPITALS.forEach(h => {
          if (!grouped[h.province]) grouped[h.province] = [];
          grouped[h.province].push(h);
      });
      
      // Sort hospitals within provinces alphabetically
      Object.keys(grouped).forEach(key => {
          grouped[key].sort((a, b) => a.name.localeCompare(b.name));
      });

      // Sort provinces alphabetically
      return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  const handleHospitalClick = useCallback((hospital: Hospital) => {
      setSelectedHospitalId(hospital.id);
      setMapCenter([hospital.lat, hospital.lng]);
      setMapZoom(14);
      
      // On mobile, scroll the map into view after selecting a hospital
      if (window.innerWidth < 1024) {
          const el = document.getElementById('map-view');
          if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      }
  }, []);

  const locateUser = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
              setMapCenter([pos.coords.latitude, pos.coords.longitude]);
              setMapZoom(11);
          });
      }
  };

  return (
    <div className="animate-fade-in-up pb-12 font-jakarta">
        {/* Intro Section */}
        <div className="mb-10 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight flex items-center gap-3">
                <MapIcon className="text-blue-500" /> Vind een Locatie
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Nucleaire geneeskunde vindt plaats in gespecialiseerde centra. Gebruik de kaart om uw afdeling te vinden en bekijk de interne routebeschrijving.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-3 py-1.5 rounded-xl">
                    <Database size={12} /> Bron: NVNG Register 2025
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 size={12} /> Offline Toegang
                </div>
            </div>
        </div>

        {/* Main Interface Container */}
        <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[85vh] lg:h-[750px] relative mb-24">
            
            {/* Sidebar / List View */}
            <div className="w-full lg:w-1/3 bg-white flex flex-col border-r border-slate-100 h-1/2 lg:h-full relative z-20">
                
                {/* Search & Filter Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 space-y-4 bg-white/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Zoek ziekenhuis of stad..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                        />
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        <button onClick={() => setFilterType('All')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${filterType === 'All' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>Alle</button>
                        <button onClick={() => setFilterType('Academic')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${filterType === 'Academic' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>Academisch</button>
                        <button onClick={() => setFilterType('Clinical')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest ${filterType === 'Clinical' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>Klinisch</button>
                    </div>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar bg-slate-50/20">
                    {filteredHospitals.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <Info size={48} className="mx-auto mb-4 opacity-10" />
                            <p className="font-bold text-slate-500">Geen locaties gevonden</p>
                            <p className="text-xs mt-2 max-w-[200px] mx-auto">Probeer een andere zoekterm of verander de filters.</p>
                        </div>
                    ) : (
                        filteredHospitals.map(hospital => (
                            <div 
                                key={hospital.id} 
                                onClick={() => handleHospitalClick(hospital)}
                                className={`p-6 rounded-[2rem] border cursor-pointer transition-all duration-500 group relative overflow-hidden ${
                                    selectedHospitalId === hospital.id 
                                    ? 'bg-white border-blue-500 shadow-xl ring-2 ring-blue-500/20 translate-x-2' 
                                    : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-lg'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h4 className={`font-black text-sm leading-tight transition-colors pr-8 ${selectedHospitalId === hospital.id ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-500'}`}>
                                        {hospital.name}
                                    </h4>
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shrink-0 ${
                                        hospital.type === 'Academic' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                                    }`}>
                                        {hospital.type === 'Academic' ? 'UMC' : 'AZ'}
                                    </span>
                                </div>
                                <div className="space-y-3 relative z-10">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <MapPin size={14} className="shrink-0 text-slate-300" />
                                        <span className="line-clamp-1 font-medium">{hospital.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 w-fit px-3 py-1.5 rounded-xl border border-blue-100/50">
                                        <Layers size={12} /> {hospital.routeNumber} <span className="text-blue-200 mx-1">|</span> {hospital.floor}
                                    </div>
                                </div>
                                {selectedHospitalId === hospital.id && (
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full blur-2xl opacity-50 -mr-8 -mt-8"></div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Map View */}
            <div id="map-view" className="w-full lg:w-2/3 h-1/2 lg:h-full relative bg-slate-50 z-10">
                <MapContainer 
                    center={mapCenter} 
                    zoom={mapZoom} 
                    scrollWheelZoom={true} 
                    className="w-full h-full"
                    zoomControl={false}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <MapResizeFix />
                    <MapViewUpdater center={mapCenter} zoom={mapZoom} />
                    
                    {filteredHospitals.map((hospital) => (
                        <Marker 
                            key={hospital.id} 
                            position={[hospital.lat, hospital.lng]} 
                            icon={selectedHospitalId === hospital.id ? activeIcon : customIcon}
                            eventHandlers={{
                                click: () => {
                                    setSelectedHospitalId(hospital.id);
                                    setMapCenter([hospital.lat, hospital.lng]);
                                    setMapZoom(14);
                                },
                            }}
                        >
                            <Popup className="font-jakarta custom-popup min-w-[280px]" closeButton={false}>
                                <div className="p-5 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.25em]">Nucleaire Geneeskunde</span>
                                    </div>
                                    <h5 className="font-black text-slate-900 mb-1 text-lg tracking-tight leading-tight">{hospital.name}</h5>
                                    <p className="text-xs text-slate-500 mb-5 font-medium">{hospital.address}</p>
                                    
                                    <div className="bg-slate-900 text-white p-4 rounded-2xl mb-5 flex flex-col items-center gap-1 shadow-lg shadow-slate-900/20">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                                            <Compass size={12} /> Interne Route
                                        </div>
                                        <span className="text-base font-black tracking-tight">{hospital.routeNumber}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{hospital.floor}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <a 
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-slate-100 text-slate-900 px-4 py-3 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest shadow-sm"
                                        >
                                            <Navigation size={14} /> Route
                                        </a>
                                        <a 
                                            href={hospital.website}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
                                        >
                                            <Globe size={14} /> Website
                                        </a>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Map Controls */}
                <div className="absolute top-6 right-6 z-[400] flex flex-col gap-2">
                    <button 
                        onClick={locateUser}
                        title="Mijn Locatie"
                        className="w-12 h-12 bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-center hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <Locate size={20} />
                    </button>
                    <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30"></div>
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest whitespace-nowrap">Academisch (UMC)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-emerald-600 rounded-full shadow-lg shadow-emerald-600/30"></div>
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest whitespace-nowrap">Algemeen (AZ)</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[400] lg:hidden">
                    <div className="bg-slate-900/90 backdrop-blur-md text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl ring-1 ring-white/20">
                        <Info size={16} className="text-blue-400" /> Gebruik kaart voor details
                    </div>
                </div>
            </div>
        </div>
        
        {/* NEW SECTION: Stylish Directory List */}
        <div className="mt-24 max-w-7xl mx-auto px-2">
            <h3 className="text-3xl font-black text-slate-900 mb-12 text-center font-jakarta tracking-tight">
                Landelijk Register <span className="text-blue-600">Nucleaire Centra</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {hospitalsByProvince.map(([province, hospitals]) => (
                    <div key={province} className="nm-flat-sm p-8 rounded-[2rem] transition-all hover:shadow-2xl duration-500">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60">
                            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                                <MapPin size={20} />
                            </div>
                            <h4 className="text-xl font-black text-slate-900">{province}</h4>
                            <span className="ml-auto text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">{hospitals.length}</span>
                        </div>
                        
                        <ul className="space-y-4">
                            {hospitals.map(h => (
                                <li key={h.id} className="group p-3 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 transition-all duration-200 cursor-default">
                                    <div className="flex justify-between items-center gap-4">
                                        <div className="flex-1">
                                            <h5 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors leading-tight mb-1">{h.name}</h5>
                                            <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-wide flex items-center gap-1">
                                                {h.address.split(',')[1]?.trim() || h.address}
                                                {h.type === 'Academic' && <span className="text-blue-400 font-black">• UMC</span>}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <a 
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(h.name + ' ' + h.address)}`} 
                                                target="_blank" 
                                                rel="noopener" 
                                                title="Route"
                                                className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                <Navigation size={14} />
                                            </a>
                                            <a 
                                                href={h.website} 
                                                target="_blank" 
                                                rel="noopener" 
                                                title="Website"
                                                className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                <ArrowUpRight size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        {/* Support Banner */}
        <div className="mt-16 p-8 bg-white rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mx-auto max-w-5xl">
            <div className="flex items-start gap-4 max-w-2xl">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shrink-0">
                    <Compass size={32} />
                </div>
                <div>
                    <h4 className="text-xl font-black text-slate-900 mb-1">Hulp nodig bij het vinden?</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Kunt u de afdeling niet vinden op de plattegrond van het ziekenhuis? De afdeling Nucleaire Geneeskunde bevindt zich vaak nabij de Radiologie of in een speciale "Hotlab" vleugel. Zoek naar de Routenummers hierboven.
                    </p>
                </div>
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-slate-900/20 hover:scale-105 transition-transform whitespace-nowrap">
                Contact Opnemen
            </button>
        </div>
    </div>
  );
};

export default HospitalMap;
