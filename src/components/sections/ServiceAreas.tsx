import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ZoomIn, ZoomOut, Navigation } from 'lucide-react';
import FadeImage from '../ui/FadeImage';

const locations = [
  {
    id: 'ikoyi',
    name: 'Ikoyi',
    x: 65,
    y: 40,
    desc: 'The center of corporate elegance & luxury living.',
  },
  {
    id: 'vi',
    name: 'Victoria Island',
    x: 45,
    y: 50,
    desc: 'The vibrant heart of commerce & fine dining.',
  },
  {
    id: 'lekki',
    name: 'Lekki Phase 1',
    x: 75,
    y: 65,
    desc: 'The dynamic pulse of lifestyle & contemporary culture.',
  },
  {
    id: 'ikeja',
    name: 'Ikeja GRA',
    x: 35,
    y: 20,
    desc: 'The mainland hub of business and tranquility.',
  },
  {
    id: 'yaba',
    name: 'Yaba',
    x: 40,
    y: 35,
    desc: 'The bustling ecosystem of tech and innovation.',
  }
];

export default function ServiceAreas() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [interactionOrigin, setInteractionOrigin] = useState({ x: 50, y: 50 });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.5, 1));

  const handlePinFocus = (loc: typeof locations[0]) => {
    setActivePin(loc.id);
    if (zoomScale === 1) {
      setInteractionOrigin({ x: loc.x, y: loc.y });
    }
  };

  const handlePinSelect = (loc: typeof locations[0]) => {
    setSelectedLocation(loc);
    // When selecting, slightly zoom in to focus context
    if (zoomScale < 1.5) {
      setInteractionOrigin({ x: loc.x, y: loc.y });
      setZoomScale(1.5);
    }
  };

  useEffect(() => {
    const handleOpenServiceArea = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || !customEvent.detail.name) return;
      const found = locations.find(l => 
        l.name.toLowerCase().includes(customEvent.detail.name.toLowerCase()) || 
        l.id.toLowerCase() === customEvent.detail.name.toLowerCase()
      );
      if (found) {
        setSelectedLocation(found);
        setZoomScale(1.5);
        setInteractionOrigin({ x: found.x, y: found.y });
        
        // Scroll to the coverage section
        const element = document.getElementById('coverage');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    window.addEventListener('open-service-area', handleOpenServiceArea);
    return () => window.removeEventListener('open-service-area', handleOpenServiceArea);
  }, []);

  // Determine roughly from city center (assume x: 50, y: 50)
  const calculateDistance = (loc: typeof locations[0]) => {
    const dist = Math.sqrt(Math.pow(loc.x - 50, 2) + Math.pow(loc.y - 50, 2));
    const km = Math.max(1.5, (dist / 100) * 45).toFixed(1);
    const mins = Math.round(Number(km) * 2.5 + 15);
    return { km, mins };
  };

  return (
    <section id="coverage" className="py-32 bg-theme transition-colors duration-500 overflow-hidden relative">
      <Helmet>
        <title>ServiceAreas | LushRide</title>
        <meta name="description" content="Explore the ServiceAreas section of LushRide's premium chauffeur services." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-white leading-tight">
            Our Coverage
          </h2>
          <p className="text-lg text-muted-2 font-light leading-relaxed max-w-2xl mx-auto">
            Interactive map of our primary service hubs across Lagos.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <button 
              onClick={handleZoomIn}
              className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded text-white hover:bg-white/10 transition-colors focus:ring-2 focus:ring-lush-yellow outline-none"
              aria-label="Zoom In map"
            >
              <ZoomIn size={20} />
            </button>
            <button 
              onClick={handleZoomOut}
              className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded text-white hover:bg-white/10 transition-colors focus:ring-2 focus:ring-lush-yellow outline-none"
              aria-label="Zoom Out map"
            >
              <ZoomOut size={20} />
            </button>
          </div>
          
          <motion.div 
            ref={mapContainerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[21/9] bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/5 shadow-2xl cursor-grab active:cursor-grabbing"
            role="region"
            aria-label="Interactive map of service areas"
          >
            <motion.div 
              ref={mapRef}
              drag
              dragConstraints={mapContainerRef}
              dragElastic={0.2}
              className="absolute inset-0 w-full h-full transform-gpu"
              animate={{ 
                scale: zoomScale, 
                transformOrigin: `${interactionOrigin.x}% ${interactionOrigin.y}%` 
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1.2 }}
            >
              <FadeImage 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=60&fm=webp" 
                alt="Lagos Map View" 
                wrapperClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale pointer-events-none"
              />
              <div className="absolute inset-0 flex flex-col pointer-events-none z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
              </div>

              {/* Map Grid overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 mix-blend-overlay pointer-events-none" />

              {/* Interactive Pins */}
              {locations.map((loc) => (
                <button
                  key={loc.id} 
                  className="absolute z-20 group focus:outline-none rounded-full"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: `translate(-50%, -100%) scale(${1/zoomScale})` }}
                  onMouseEnter={() => handlePinFocus(loc)}
                  onMouseLeave={() => setActivePin(null)}
                  onClick={() => handlePinSelect(loc)}
                  onFocus={() => handlePinFocus(loc)}
                  onBlur={() => setActivePin(null)}
                  aria-label={`Select ${loc.name} service area`}
                  aria-expanded={selectedLocation?.id === loc.id}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePinSelect(loc);
                    }
                  }}
                >
                  <div className="relative pointer-events-none flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={selectedLocation?.id === loc.id ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={selectedLocation?.id === loc.id ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 flex items-center justify-center cursor-pointer relative"
                    >
                      <MapPin className={`w-8 h-8 transition-colors duration-300 relative z-10 ${selectedLocation?.id === loc.id || activePin === loc.id ? 'text-lush-yellow drop-shadow-[0_0_8px_rgba(249,211,0,0.8)]' : 'text-white/60 group-hover:text-white'}`} fill="currentColor" />
                      
                      {/* Subtle pulsing background ring, larger when active */}
                      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lush-yellow/20 mix-blend-screen transition-all duration-500 ease-in-out ${selectedLocation?.id === loc.id || activePin === loc.id ? 'w-16 h-16 animate-ping' : 'w-8 h-8 opacity-0'}`} />
                    </motion.div>
                    
                    {/* Focus ring for accessibility */}
                    <span className="absolute inset-[-4px] rounded-full ring-2 ring-lush-yellow opacity-0 group-focus-visible:opacity-100 transition-opacity" />
                    
                    <AnimatePresence>
                      {activePin === loc.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#111]/95 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-2xl z-30 pointer-events-auto"
                        >
                          <h4 className="text-white font-display text-sm mb-1">{loc.name}</h4>
                          <p className="text-muted-1 text-[10px] lowercase opacity-80 leading-snug">{loc.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Detailed Information Drawer */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full sm:w-80 bg-[#111]/95 backdrop-blur-xl border-l border-white/10 z-40 p-4 max-[480px]:p-4 sm:p-8 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-xl max-[480px]:text-lg font-display text-white">{selectedLocation.name}</h3>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Close details"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="mb-6 flex gap-3 max-[480px]:gap-2 bg-white/5 border border-white/10 rounded-md p-3 sm:p-4 items-center">
                  <Navigation className="text-lush-yellow shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">From City Center</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      ~{calculateDistance(selectedLocation).mins} mins <span className="text-white/40 font-normal max-[480px]:block">({calculateDistance(selectedLocation).km} km)</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-1 font-light leading-relaxed mb-6">
                  {selectedLocation.desc}
                </p>
                
                <h4 className="text-xs uppercase tracking-widest text-lush-yellow mb-3">Available Services</h4>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm text-white font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-lush-yellow mr-3" /> Airport Transfers
                  </li>
                  <li className="flex items-center text-sm text-white font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-lush-yellow mr-3" /> Hourly Executive Hire
                  </li>
                  <li className="flex items-center text-sm text-white font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-lush-yellow mr-3" /> Event Chauffeur
                  </li>
                </ul>

                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="w-full bg-white text-black py-3 rounded text-sm font-semibold hover:bg-lush-yellow transition-colors mt-auto"
                >
                  Book Ride in {selectedLocation.name}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
