import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useI18n } from '../../lib/i18n';
import FadeImage from '../ui/FadeImage';
import { AlertTriangle, MapPin, CloudSun } from 'lucide-react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'transfers' | 'hourly' | 'estimator'>('transfers');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();
  const [trafficAlert, setTrafficAlert] = useState<{ status: string, area: string, level: 'low' | 'moderate' | 'high' } | null>(null);
  const [weather, setWeather] = useState<{ temp: number, condition: string } | null>(null);
  const [estimatorData, setEstimatorData] = useState({ origin: '', destination: '', vehicleClass: '' });
  const [estimate, setEstimate] = useState<string | null>(null);

  useEffect(() => {
    // Mock data service for Live Lagos Traffic Alert
    const fetchTraffic = () => {
      const statuses = [
        { status: 'Heavy traffic on Third Mainland Bridge', area: 'Mainland -> Island', level: 'high' as const },
        { status: 'Clear flow on Lekki-Epe Expressway', area: 'Lekki Phase 1', level: 'low' as const },
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
        const base = estimatorData.vehicleClass === 'luxury' ? 80000 : estimatorData.vehicleClass === 'suv' ? 120000 : 50000;
        // Deterministic mock calculation based on length of strings
        const distanceMult = ((estimatorData.origin.length + estimatorData.destination.length) % 3) + 1;
        const low = base * distanceMult;
        const high = low * 1.3;
        setEstimate(`₦${low.toLocaleString()} - ₦${high.toLocaleString()}`);
      }, 800);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your transfer request has been received. Our concierge will contact you shortly.', {
        style: {
          background: '#111',
          color: '#fff',
          borderColor: 'rgba(255,255,255,0.1)'
        }
      });
    }, 1500);
  };

  return (
    <section id="book" className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-24 overflow-hidden">
      <Helmet>
        <title>Premium Chauffeur Services in Lagos | LushRide</title>
        <meta name="description" content="Explore the Hero section of LushRide's premium chauffeur services." />
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
        {/* Live Widgets Container */}
        <div className="absolute top-0 right-6 lg:right-12 flex flex-col gap-3 items-end">
          <AnimatePresence mode="wait">
            {trafficAlert && (
              <motion.div 
                key={trafficAlert.status}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
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

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-[6rem] font-display leading-[1.1] mb-4 md:mb-6 text-white tracking-tight">
            Luxury in <br/> <span className="text-white/80">Motion.</span>
          </h1>
          <p className="text-base md:text-xl text-muted-2 font-light leading-relaxed max-w-2xl">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* Elevated Booking Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl no-print"
        >
          <div className="flex gap-8 border-b border-white/10 pb-4 mb-6">
            <button 
              onClick={() => { setActiveTab('transfers'); setEstimate(null); }}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'transfers' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
            >
              Transfers
            </button>
            <button 
              onClick={() => { setActiveTab('hourly'); setEstimate(null); }}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'hourly' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
            >
              Hourly
            </button>
            <button 
              onClick={() => { setActiveTab('estimator'); setEstimate(null); }}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'estimator' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
            >
              Trip Estimator
            </button>
          </div>

          {activeTab === 'estimator' ? (
            <form onSubmit={handleEstimate} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Origin *</label>
                  <input 
                    type="text" 
                    required
                    value={estimatorData.origin}
                    onChange={(e) => setEstimatorData({ ...estimatorData, origin: e.target.value })}
                    placeholder="e.g., Murtala Muhammed Airport" 
                    className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Destination *</label>
                  <input 
                    type="text" 
                    required
                    value={estimatorData.destination}
                    onChange={(e) => setEstimatorData({ ...estimatorData, destination: e.target.value })}
                    placeholder="e.g., Eko Hotel, VI" 
                    className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Vehicle Class *</label>
                  <select 
                    required 
                    value={estimatorData.vehicleClass}
                    onChange={(e) => setEstimatorData({ ...estimatorData, vehicleClass: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all appearance-none [&>option]:bg-charcoal text-white/80"
                  >
                    <option value="" disabled className="text-muted-1">Choose class</option>
                    <option value="executive">Executive (Sedan)</option>
                    <option value="luxury">Luxury (Premium Sedan)</option>
                    <option value="suv">Premium SUV</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mt-4 border-t border-white/10 pt-6">
                <div className="mb-4 md:mb-0">
                  {estimate ? (
                     <div className="animate-in fade-in slide-in-from-bottom-2">
                       <span className="block text-[10px] tracking-widest uppercase text-muted-1 mb-1">Estimated Range</span>
                       <span className="text-2xl font-display text-lush-yellow">{estimate}</span>
                     </div>
                  ) : (
                     <span className="text-sm text-muted-1 font-light">Fill details to see estimated price.</span>
                  )}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-white text-black text-[11px] tracking-widest uppercase font-semibold hover:bg-lush-yellow transition-colors disabled:opacity-70 disabled:cursor-not-allowed rounded"
                >
                  {isSubmitting ? 'Calculating...' : 'Calculate Estimate'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Pick Up *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Address, airport, hotel..." 
                    className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30"
                  />
                </div>
                
                {activeTab === 'transfers' ? (
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Drop Off *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Address, airport, hotel..." 
                      className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Duration *</label>
                     <select required className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all appearance-none [&>option]:bg-charcoal text-white/80">
                      <option value="" disabled selected className="text-muted-1">Choose duration</option>
                      <option value="4">4 Hours (Minimum)</option>
                      <option value="8">8 Hours</option>
                      <option value="12">12 Hours</option>
                    </select>
                  </div>
                )}
                
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Pickup Date *</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
                <div className="relative">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-1 mb-2">Pickup Time *</label>
                  <input 
                    type="time" 
                    required
                    className="w-full bg-transparent border-b border-white/20 text-white pb-3 text-sm focus:border-lush-yellow outline-none transition-all placeholder:text-white/30 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full lg:w-40 pb-3 border-b-2 border-lush-yellow text-lush-yellow text-[11px] tracking-widest uppercase font-semibold hover:text-white hover:border-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-6 lg:mt-0"
              >
                {isSubmitting ? 'Processing' : 'Next Step →'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
