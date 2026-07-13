import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useI18n } from '../../lib/i18n';
import FadeImage from '../ui/FadeImage';
import { AlertTriangle, MapPin, CloudSun, Mic, CheckCircle2, X, Bell } from 'lucide-react';
import PriceChart from '../ui/PriceChart';

import { speechManager } from '../../lib/speech';

const ParticleExplosion = () => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (i * 360) / particles.length;
        const delay = Math.random() * 0.2;
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((angle * Math.PI) / 180) * 60,
              y: Math.sin((angle * Math.PI) / 180) * 60,
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="absolute w-1.5 h-1.5 rounded-full bg-lush-yellow"
          />
        );
      })}
    </div>
  );
};

const VoiceInput = ({ value, onChange, placeholder, label, required = true }: { value: string, onChange: (v: string) => void, placeholder: string, label: string, required?: boolean }) => {
  const [isListening, setIsListening] = useState(false);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);

  useEffect(() => {
    return () => {
      if (isListening) {
        speechManager.stop();
      }
    };
  }, [isListening]);

  const toggleListen = () => {
    if (isListening) {
      speechManager.stop();
      setIsListening(false);
      setAudioData(null);
      return;
    }

    if (!speechManager.isSupported) {
      toast.error("Enhanced voice input is not supported in your browser.");
      return;
    }

    setIsListening(true);
    setAudioData(null);
    toast.success("Listening... Speak now", { 
      duration: 2000, 
      icon: <Mic className="text-lush-yellow animate-pulse" size={16} /> 
    });

    speechManager.start(
      (transcript, isFinal) => {
        onChange(transcript);
        if (isFinal) {
           toast.success("Location recognized & refined.");
           setIsListening(false);
        }
      },
      (errType) => {
        setIsListening(false);
        setAudioData(null);
        if (errType === 'permission_denied') {
          toast.error("Microphone access denied. Please check site permissions.");
        } else if (errType === 'enhanced_voice_not_supported') {
          toast.error("Enhanced voice input is not supported in your browser.");
        } else if (errType !== 'start_error') {
          toast.error("Could not quite catch that. Please try again.");
        }
      },
      () => {
        setIsListening(false);
        setAudioData(null);
      },
      (data) => {
        setAudioData(data);
      }
    );
  };

  const labelId = label.replace(/[^a-zA-Z]/g, '').toLowerCase() + '-input';

  return (
    <div className="relative group">
      <label htmlFor={labelId} className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <input 
          id={labelId}
          type="text" 
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isListening ? "Listening..." : placeholder} 
          className={`w-full bg-transparent border-b pb-3 pr-10 text-sm outline-none transition-all duration-300 placeholder:transition-opacity ${
            isListening 
              ? 'border-lush-yellow text-lush-yellow placeholder:text-lush-yellow/50 shadow-[0_1px_10px_rgba(249,211,0,0.05)] bg-lush-yellow/[0.03] pl-3 -ml-3 rounded-t' 
              : 'border-white/20 text-white focus:border-lush-yellow placeholder:text-white/30'
          }`}
        />
        {speechManager.isSupported && (
          <button 
            type="button"
            onClick={toggleListen}
            title={isListening ? "Stop listening" : "Use voice input"}
            aria-label={isListening ? "Stop listening to voice input" : "Start voice input"}
            aria-pressed={isListening}
            className={`absolute right-0 bottom-2.5 p-1.5 rounded-full transition-all duration-500 flex items-center justify-center
              ${isListening 
                ? 'bg-lush-yellow text-black shadow-[0_0_15px_rgba(249,211,0,0.6)] scale-110' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <Mic size={14} className="fill-black/30" />
              </motion.div>
            ) : (
              <Mic size={15} />
            )}
          </button>
        )}
        
        {/* Animated Sound Waves */}
        <AnimatePresence>
          {isListening && (
             <motion.div 
               initial={{ opacity: 0, width: 0 }}
               animate={{ opacity: 1, width: 'auto' }}
               exit={{ opacity: 0, width: 0 }}
               className="absolute right-10 bottom-3 flex items-center gap-[2px] overflow-hidden h-4"
             >
               {Array.from({ length: 12 }).map((_, i) => {
                 let h = 4;
                 if (audioData) {
                   const val = audioData[i * 2 + 10] || 0;
                   h = 4 + (val / 255) * 12;
                 }
                 return (
                   <motion.div
                     key={i}
                     style={{ height: `${h}px` }}
                     className="w-[2px] bg-lush-yellow/60 rounded-full"
                     animate={{ height: `${h}px` }}
                     transition={{ duration: 0.1 }}
                   />
                 );
               })}
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'transfers' | 'hourly' | 'estimator'>('transfers');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();
  const [heroText, setHeroText] = useState({
    title: "Luxury in \n Motion.",
    subtitle: ""
  });

  useEffect(() => {
    // Initialise subtitle with i18n
    setHeroText(prev => ({ ...prev, subtitle: t('hero.subtitle') }));

    fetch('/api/site-config')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error("Invalid response or content type");
      })
      .then(data => {
        if (data && data.hero) {
          setHeroText({
            title: data.hero.title,
            subtitle: data.hero.subtitle
          });
        }
      })
      .catch(err => {
        console.log("Using static local fallback hero config", err);
        const cached = localStorage.getItem("lush_site_config_fallback");
        if (cached) {
          try {
            const data = JSON.parse(cached);
            if (data && data.hero) {
              setHeroText({
                title: data.hero.title,
                subtitle: data.hero.subtitle
              });
            }
          } catch (e) {}
        }
      });
  }, [t]);
  const [trafficAlert, setTrafficAlert] = useState<{ status: string, area: string, level: 'low' | 'moderate' | 'high' } | null>(null);
  const [weather, setWeather] = useState<{ temp: number, condition: string } | null>(null);
  const [estimatorData, setEstimatorData] = useState({ origin: '', destination: '', vehicleClass: '' });
  const [bookingData, setBookingData] = useState({ pickUp: '', dropOff: '', date: '', endDate: '', time: '' });
  const [estimateData, setEstimateData] = useState<{ low: number, high: number } | null>(null);
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const EXCHANGE_RATE = 1500;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recentSearches, setRecentSearches] = useState<{from: string, to: string}[]>([]);
  const [notifyPriceDrop, setNotifyPriceDrop] = useState(false);
  const [chartData, setChartData] = useState<{date: string, price: number}[]>([]);

  useEffect(() => {
    // Load recent searches
    const saved = localStorage.getItem('lush_recent_searches');
    if (saved) {
      try { setRecentSearches(JSON.parse(saved)); } catch (e) {}
    }

    // Handle offline sync
    const handleOnline = () => {
      const queue = JSON.parse(localStorage.getItem('offlineBookingQueue') || '[]');
      if (queue.length > 0) {
        toast.success(`Connection restored! Processing ${queue.length} queued requests...`);
        localStorage.removeItem('offlineBookingQueue');
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  useEffect(() => {
    // Mock data service for Live Lagos Traffic Alert
    const fetchTraffic = () => {
      const statuses = [
        { status: 'Heavy traffic on Third Mainland Bridge', area: 'Mainland -> Island', level: 'high' as const },
        { status: 'Clear flow on Lekki-Ikoyi Link Bridge', area: 'Lekki Phase 1', level: 'low' as const },
        { status: 'Moderate congestion near Eko Hotel', area: 'Victoria Island', level: 'moderate' as const },
      ];
      setTrafficAlert(statuses[Math.floor(Math.random() * statuses.length)]);
    };
    
    fetchTraffic();
    const interval = setInterval(fetchTraffic, 15000); // Simulate live updates
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mock weather service for Lagos
    setWeather({
      temp: 29,
      condition: 'Partly Cloudy',
    });
  }, []);

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (estimatorData.origin && estimatorData.destination && estimatorData.vehicleClass) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const base = estimatorData.vehicleClass === 'lush_luxury' ? 50000 : estimatorData.vehicleClass === 'lush_executive' ? 80000 : 120000;
        // Deterministic mock calculation based on length of strings
        const distanceMult = ((estimatorData.origin.length + estimatorData.destination.length) % 3) + 1;
        const low = base * distanceMult;
        const high = low * 1.3;
        setEstimateData({ low, high });

        if (notifyPriceDrop) {
          toast.success("You'll be notified of price drops for this route.");
        }

        const newSearches = [{from: estimatorData.origin, to: estimatorData.destination}, ...recentSearches.filter(s => s.from !== estimatorData.origin || s.to !== estimatorData.destination)].slice(0, 5);
        setRecentSearches(newSearches);
        localStorage.setItem('lush_recent_searches', JSON.stringify(newSearches));

        // Generate 7-day chart data
        const newChartData = [];
        for(let i=0; i<7; i++) {
          const d = new Date();
          d.setDate(d.getDate() + i);
          // Random price variation
          const dailyPrice = low + (Math.sin(i * 1.5) * 0.1 * low);
          newChartData.push({ date: d.toISOString(), price: dailyPrice });
        }
        setChartData(newChartData);

      }, 800);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!navigator.onLine) {
       const queue = JSON.parse(localStorage.getItem('offlineBookingQueue') || '[]');
       queue.push({ ...bookingData, timestamp: Date.now() });
       localStorage.setItem('offlineBookingQueue', JSON.stringify(queue));
       toast('You are offline. Request queued for when connection restores.', { icon: '📡', duration: 4000 });
       setShowConfirmation(true);
       return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);

      if (bookingData.pickUp && bookingData.dropOff) {
        const newSearches = [{from: bookingData.pickUp, to: bookingData.dropOff}, ...recentSearches.filter(s => s.from !== bookingData.pickUp || s.to !== bookingData.dropOff)].slice(0, 5);
        setRecentSearches(newSearches);
        localStorage.setItem('lush_recent_searches', JSON.stringify(newSearches));
      }
    }, 1200);
  };

  return (
    <section id="book" className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-24 overflow-hidden">
      <Helmet>
        <title>Premium Chauffeur Services in Lagos | LushRide</title>
        <meta name="description" content="Explore the Hero section of LushRide's premium chauffeur services." />
        <link rel="preload" as="image" href="https://upload.wikimedia.org/wikipedia/commons/1/17/2022_Land_Rover_Range_Rover_SE_P440e_AWD_Automatic_3.0_Front.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Sora:wght@300;400;500;600;700&display=swap" rel="preload" as="style" />
      </Helmet>
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-theme transition-colors duration-500 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ scale: { duration: 15, ease: 'easeOut' }, opacity: { duration: 1.5, ease: 'easeIn' } }}
          className="absolute inset-0"
        >
          <FadeImage
            src="https://upload.wikimedia.org/wikipedia/commons/1/17/2022_Land_Rover_Range_Rover_SE_P440e_AWD_Automatic_3.0_Front.jpg" 
            alt="Imposing Luxury Vehicle" 
            className="w-full h-full object-cover object-center w-full"
            wrapperClassName="absolute inset-0"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-[6rem] font-display leading-[1.1] mb-4 md:mb-6 text-white tracking-tight whitespace-pre-line">
            {heroText.title.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-base md:text-xl text-muted-2 font-light leading-relaxed max-w-2xl mb-8">
            {heroText.subtitle}
          </p>

          {/* Live Widgets (Weather & Traffic) - Perfectly aligned under subtitle and safe on mobile */}
          <div className="flex flex-wrap gap-3 items-center">
            <AnimatePresence mode="wait">
              {trafficAlert && (
                <motion.div 
                  key={trafficAlert.status}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 shadow-xl flex items-center gap-3 w-fit"
                >
                  <div className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${trafficAlert.level === 'high' ? 'bg-red-500' : trafficAlert.level === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${trafficAlert.level === 'high' ? 'bg-red-500' : trafficAlert.level === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1">
                      <MapPin size={9} /> {trafficAlert.area}
                    </span>
                    <span className="text-white text-xs font-medium">
                      {trafficAlert.status}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {weather && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 shadow-xl flex items-center gap-3 w-fit"
                >
                  <CloudSun size={16} className="text-lush-yellow" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 font-semibold">
                      Lagos, NG
                    </span>
                    <span className="text-white text-xs font-medium">
                      {weather.temp}°C • {weather.condition}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Elevated Booking Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)', scale: 0.98 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl no-print"
        >
          <div className="flex gap-8 border-b border-white/10 pb-4 mb-6">
            <button 
              onClick={() => { setActiveTab('transfers'); setEstimateData(null); }}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'transfers' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
              aria-expanded={activeTab === 'transfers'}
              role="tab"
            >
              Transfers
            </button>
            <button 
              onClick={() => { setActiveTab('hourly'); setEstimateData(null); }}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'hourly' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
              aria-expanded={activeTab === 'hourly'}
              role="tab"
            >
              Hourly
            </button>
            <button 
              onClick={() => { setActiveTab('estimator'); setEstimateData(null); }}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'estimator' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
              aria-expanded={activeTab === 'estimator'}
              role="tab"
            >
              Trip Estimator
            </button>
          </div>

          {(activeTab === 'transfers' || activeTab === 'estimator') && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-3 overflow-x-auto hide-scrollbars no-scrollbar mb-6"
            >
              {recentSearches.length > 0 && (
                 <>
                   <span className="text-[10px] uppercase tracking-widest text-lush-yellow/80 font-semibold shrink-0">Recent:</span>
                   {recentSearches.map((route, i) => (
                     <button
                       key={`recent-${i}`}
                       type="button"
                       onClick={() => {
                         if (activeTab === 'transfers') {
                           setBookingData({ ...bookingData, pickUp: route.from, dropOff: route.to });
                         } else {
                           setEstimatorData({ ...estimatorData, origin: route.from, destination: route.to });
                         }
                       }}
                       className="whitespace-nowrap px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-widest shrink-0"
                     >
                       {route.from.split(',')[0]} → {route.to.split(',')[0]}
                     </button>
                   ))}
                   <div className="w-px h-4 bg-white/20 mx-2 shrink-0" />
                 </>
              )}
              <span className="text-[10px] uppercase tracking-widest text-lush-yellow/80 font-semibold shrink-0">Popular:</span>
              {[
                { label: 'Airport → VI', from: 'Murtala Muhammed Airport', to: 'Victoria Island' },
                { label: 'VI → Airport', from: 'Victoria Island', to: 'Murtala Muhammed Airport' },
                { label: 'Airport → Lekki', from: 'Murtala Muhammed Airport', to: 'Lekki Phase 1' },
                { label: 'Mainland → Island', from: 'Ikeja GRA', to: 'Ikoyi' },
              ].map((route, i) => (
                <button
                  key={`pop-${i}`}
                  type="button"
                  onClick={() => {
                    if (activeTab === 'transfers') {
                      setBookingData({ ...bookingData, pickUp: route.from, dropOff: route.to });
                    } else {
                      setEstimatorData({ ...estimatorData, origin: route.from, destination: route.to });
                    }
                  }}
                  className="whitespace-nowrap px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-widest shrink-0"
                >
                  {route.label}
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === 'estimator' ? (
            <form onSubmit={handleEstimate} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <VoiceInput 
                  label="Origin *"
                  placeholder="e.g., Murtala Muhammed Airport"
                  value={estimatorData.origin}
                  onChange={(v) => setEstimatorData({ ...estimatorData, origin: v })}
                />
                <VoiceInput 
                  label="Destination *"
                  placeholder="e.g., Eko Hotel, VI"
                  value={estimatorData.destination}
                  onChange={(v) => setEstimatorData({ ...estimatorData, destination: v })}
                />
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Vehicle Class *</label>
                  <select 
                    required 
                    value={estimatorData.vehicleClass}
                    onChange={(e) => setEstimatorData({ ...estimatorData, vehicleClass: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all appearance-none [&>option]:bg-charcoal text-white/80"
                  >
                    <option value="" disabled className="text-muted-1">Choose class</option>
                    <option value="lush_luxury">Lush Luxury (2014-2018)</option>
                    <option value="lush_executive">Lush Executive (2018-2022)</option>
                    <option value="lush_royale">Lush Royale (2023-2026)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                 <label className="flex items-center gap-2 text-xs text-muted-1 cursor-pointer group hover:text-white transition-colors">
                   <input
                     type="checkbox"
                     checked={notifyPriceDrop}
                     onChange={(e) => setNotifyPriceDrop(e.target.checked)}
                     className="accent-lush-yellow opacity-70 group-hover:opacity-100"
                   />
                   <Bell size={14} className={notifyPriceDrop ? "text-lush-yellow" : ""} aria-hidden="true" />
                   Notify me of price drops for this route
                 </label>
                 <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest bg-white/5 rounded px-2 py-1">
                   <button 
                     type="button" 
                     onClick={() => setCurrency('NGN')} 
                     className={`transition-colors ${currency === 'NGN' ? 'text-lush-yellow font-bold' : 'text-muted-1 hover:text-white'}`}
                     aria-pressed={currency === 'NGN'}
                   >
                     NGN
                   </button>
                   <span className="text-white/20">/</span>
                   <button 
                     type="button" 
                     onClick={() => setCurrency('USD')} 
                     className={`transition-colors ${currency === 'USD' ? 'text-lush-yellow font-bold' : 'text-muted-1 hover:text-white'}`}
                     aria-pressed={currency === 'USD'}
                   >
                     USD
                   </button>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start justify-between mt-2 border-t border-white/10 pt-6">
                <div className="flex-1 w-full">
                  {estimateData && chartData.length > 0 ? (
                     <div className="animate-in fade-in flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                       <div>
                         <span className="block text-[10px] tracking-widest uppercase text-muted-1 mb-1">Estimated Range</span>
                         <span className="text-2xl font-display text-lush-yellow">
                           {currency === 'USD' 
                             ? `$${Math.round(estimateData.low / EXCHANGE_RATE).toLocaleString()} - $${Math.round(estimateData.high / EXCHANGE_RATE).toLocaleString()}`
                             : `₦${estimateData.low.toLocaleString()} - ₦${estimateData.high.toLocaleString()}`
                           }
                         </span>
                       </div>
                       <div className="flex-1 w-full max-w-sm">
                         <span className="block text-[10px] tracking-[0.1em] uppercase text-white/40 mb-2">
                           7-Day Projection {currency === 'USD' ? '(USD)' : '(NGN)'}
                         </span>
                         <PriceChart 
                           data={
                             currency === 'USD' 
                               ? chartData.map(d => ({ ...d, price: Math.round(d.price / EXCHANGE_RATE) })) 
                               : chartData
                           } 
                           currencySymbol={currency === 'USD' ? '$' : '₦'}
                         />
                       </div>
                     </div>
                  ) : (
                     <span className="text-sm text-muted-1 font-light">Fill details to see estimated price and projections.</span>
                  )}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-white text-black text-[11px] tracking-widest uppercase font-semibold hover:bg-lush-yellow transition-colors disabled:opacity-70 disabled:cursor-not-allowed rounded shrink-0"
                >
                  {isSubmitting ? 'Calculating...' : 'Calculate Estimate'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <VoiceInput 
                  label="Pick Up *"
                  placeholder="Address, airport, hotel..."
                  value={bookingData.pickUp}
                  onChange={(v) => setBookingData({ ...bookingData, pickUp: v })}
                />
                
                {activeTab === 'transfers' ? (
                  <VoiceInput 
                    label="Drop Off *"
                    placeholder="Address, airport, hotel..."
                    value={bookingData.dropOff}
                    onChange={(v) => setBookingData({ ...bookingData, dropOff: v })}
                  />
                ) : (
                  <div className="relative">
                    <label htmlFor="duration-select" className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Duration *</label>
                     <select id="duration-select" required defaultValue="" className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all appearance-none [&>option]:bg-charcoal text-white/80">
                      <option value="" disabled className="text-muted-1">Choose duration</option>
                      <option value="4">4 Hours (Minimum)</option>
                      <option value="8">8 Hours</option>
                      <option value="12">12 Hours</option>
                      <option value="24">Multi-day (24h+)</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col lg:flex-row items-end justify-between gap-6 border-t border-white/5 pt-6 mt-2">
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <label htmlFor="start-date" className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Start Date *</label>
                    <input 
                      id="start-date"
                      name="date"
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="end-date" className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">End Date <span className="text-white/30 tracking-normal capitalize font-normal bg-white/5 px-1 rounded ml-1">Optional</span></label>
                    <input 
                      id="end-date"
                      name="endDate"
                      type="date" 
                      value={bookingData.endDate}
                      onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                      min={bookingData.date || new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="pickup-time" className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Pickup Time *</label>
                    <input 
                      id="pickup-time"
                      name="time"
                      type="time" 
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      required
                      className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full lg:w-40 pb-3 border-b-2 border-lush-yellow text-lush-yellow text-[11px] tracking-widest uppercase font-semibold hover:text-white hover:border-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                >
                  {isSubmitting ? 'Processing' : 'Next Step →'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-xl p-8 max-w-sm w-full relative shadow-2xl flex flex-col items-center text-center"
            >
              <button 
                onClick={() => setShowConfirmation(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 rounded-full bg-lush-yellow/20 flex items-center justify-center mb-6 relative">
                <CheckCircle2 size={32} className="text-lush-yellow z-10" />
                <ParticleExplosion />
              </div>

              <h3 className="text-2xl font-display text-white mb-2 tracking-tight">Request Received</h3>
              <p className="text-sm font-light text-muted-1 mb-6 max-w-[280px]">
                Your luxurious ride is being prepared. Our concierge will contact you within 5 minutes to confirm details.
              </p>

              <div className="w-full bg-[#111] border border-white/5 rounded-lg p-5 mb-8 text-left space-y-3">
                 <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">From</span>
                    <span className="text-sm text-white font-medium text-right max-w-[150px] truncate" title={bookingData.pickUp}>{bookingData.pickUp || 'Not specified'}</span>
                 </div>
                 {activeTab === 'transfers' && (
                   <div className="flex justify-between items-start pt-2 border-t border-white/5">
                      <span className="text-[10px] uppercase tracking-widest text-white/40">To</span>
                      <span className="text-sm text-white font-medium text-right max-w-[150px] truncate" title={bookingData.dropOff}>{bookingData.dropOff || 'Not specified'}</span>
                   </div>
                 )}
                 <div className="flex justify-between items-start pt-2 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">When</span>
                    <span className="text-sm text-white font-medium text-right capitalize">
                       {bookingData.date || 'ASAP'} 
                       {bookingData.endDate ? ` to ${bookingData.endDate}` : ''}
                       {bookingData.time ? ` at ${bookingData.time}` : ''}
                    </span>
                 </div>
              </div>

              <button 
                onClick={() => {
                  setShowConfirmation(false);
                  setBookingData({ pickUp: '', dropOff: '', date: '', endDate: '', time: '' });
                }}
                className="w-full py-4 text-[10px] tracking-widest uppercase font-semibold bg-white text-charcoal rounded hover:bg-lush-yellow transition-colors"
              >
                Return to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
