import { useState, useEffect } from 'react';
import { Logo } from "../ui/Logo";
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Circle, History, Search, Shield, Car, MapPin } from 'lucide-react';
import FadeImage from '../ui/FadeImage';
import TripHistory from '../ui/TripHistory';

import { useI18n } from '../../lib/i18n';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Search database mapping fleet vehicles and service area hubs
  const searchPool = [
    {
      type: 'vehicle',
      id: 'luxury',
      name: 'Lush Luxury',
      subtitle: 'Lexus RX 350 / Premium SUV',
      keywords: ['lexus', 'rx', '350', 'suv', 'luxury', 'car', 'vehicle'],
    },
    {
      type: 'vehicle',
      id: 'executive',
      name: 'Lush Executive',
      subtitle: 'Range Rover SE / Prestige Class',
      keywords: ['range rover', 'se', 'prestige', 'rover', 'executive', 'car', 'vehicle'],
    },
    {
      type: 'vehicle',
      id: 'royale',
      name: 'Lush Royale',
      subtitle: 'Toyota Land Cruiser Prado / Armored Suite',
      keywords: ['toyota', 'land cruiser', 'prado', 'armored', 'bulletproof', 'b6', 'royale', 'car', 'vehicle', 'security'],
    },
    {
      type: 'area',
      id: 'ikoyi',
      name: 'Ikoyi',
      subtitle: 'Corporate elegance & luxury living',
      keywords: ['ikoyi', 'island', 'lagos', 'services', 'coverage'],
    },
    {
      type: 'area',
      id: 'vi',
      name: 'Victoria Island (VI)',
      subtitle: 'Heart of commerce & fine dining',
      keywords: ['vi', 'victoria island', 'island', 'lagos', 'services', 'coverage'],
    },
    {
      type: 'area',
      id: 'lekki',
      name: 'Lekki Phase 1',
      subtitle: 'Lifestyle & contemporary culture',
      keywords: ['lekki', 'phase 1', 'island', 'lagos', 'services', 'coverage'],
    },
    {
      type: 'area',
      id: 'ikeja',
      name: 'Ikeja GRA',
      subtitle: 'Mainland hub of business and tranquility',
      keywords: ['ikeja', 'gra', 'mainland', 'lagos', 'services', 'coverage'],
    },
    {
      type: 'area',
      id: 'yaba',
      name: 'Yaba',
      subtitle: 'Tech ecosystem and innovation',
      keywords: ['yaba', 'mainland', 'lagos', 'services', 'coverage'],
    }
  ];

  const filteredResults = searchQuery.trim() === '' 
    ? [] 
    : searchPool.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(k => k.includes(searchQuery.toLowerCase()))
      );

  const handleSelectResult = (item: typeof searchPool[0]) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedIndex(0);

    if (item.type === 'vehicle') {
      window.dispatchEvent(new CustomEvent('open-vehicle-quickview', { 
        detail: { name: item.name } 
      }));
    } else if (item.type === 'area') {
      window.dispatchEvent(new CustomEvent('open-service-area', { 
        detail: { name: item.name } 
      }));
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!searchOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === 'Enter') {
        if (filteredResults[selectedIndex]) {
          handleSelectResult(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, filteredResults, selectedIndex]);
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncQueueCount, setSyncQueueCount] = useState(0);

  useEffect(() => {
    const checkQueue = () => {
      const queue = JSON.parse(localStorage.getItem('offlineBookingQueue') || '[]');
      setSyncQueueCount(queue.length);
    };
    checkQueue();

    const handleOnline = () => {
      setIsOnline(true);
      checkQueue();
    };
    const handleOffline = () => {
      setIsOnline(false);
      checkQueue();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(checkQueue, 2000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the closest anchor tag
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL without jumping
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    const sections = ['about', 'services', 'fleet', 'hubs', 'partner'];
    const sectionElements = sections.map(id => document.getElementById(id));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    sectionElements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-white/5 ${
        isScrolled ? 'bg-theme/95 backdrop-blur-md py-3' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer text-white hover:text-lush-yellow transition-colors">
            <Logo className="w-20 md:w-28 object-contain" />
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'about', label: t('nav.about') },
              { id: 'services', label: t('nav.services') },
              { id: 'fleet', label: t('nav.fleet') },
              { id: 'hubs', label: t('nav.hubs') },
              { id: 'partner', label: t('nav.partner') },
            ].map(link => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                className={`text-[10px] uppercase tracking-widest font-medium transition-colors ${activeSection === link.id ? 'text-lush-yellow' : 'text-white/60 hover:text-white'}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action & Menu Toggle */}
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium">
              {!isOnline ? (
                <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded" role="status" aria-label={`Offline status${syncQueueCount > 0 ? `, ${syncQueueCount} pending` : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold">
                    Offline {syncQueueCount > 0 && `(${syncQueueCount} Pending)`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded" role="status" aria-label="Online status">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold">Online</span>
                </div>
              )}
              
              <button onClick={() => setLang('EN')} aria-label="Switch to English" className={`${lang === 'EN' ? 'text-white' : 'text-white/40 hover:text-white/80'} transition-colors ml-2`}>EN</button>
              <span className="text-white/20" aria-hidden="true">/</span>
              <button onClick={() => setLang('FR')} aria-label="Switch to French" className={`${lang === 'FR' ? 'text-white' : 'text-white/40 hover:text-white/80'} transition-colors`}>FR</button>
            </div>
            
            <button 
              onClick={() => setDashboardOpen(true)}
              className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group hidden sm:flex"
              aria-label="Open recent bookings dashboard"
            >
              <History size={16} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
            </button>

            {/* Search Trigger (Universal Header) */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-white/60 hover:text-lush-yellow transition-colors p-2 flex items-center gap-2 group animate-fade-in"
              aria-label="Search vehicles or service areas"
            >
              <Search size={16} className="group-hover:scale-110 transition-transform" />
              <span className="hidden xl:block text-[11px] font-medium tracking-[0.2em] uppercase">Search</span>
            </button>

            <a href="#book" className="hidden md:inline-flex px-6 py-3 bg-transparent border border-white/20 text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-charcoal transition-all">
              {t('nav.quote')}
            </a>
            <button 
              className="text-white p-2 hover:text-lush-yellow transition-colors flex items-center gap-3 group"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open global menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="hidden md:block text-[11px] font-medium tracking-[0.2em] uppercase">Menu</span>
              <Menu size={24} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.9}
            style={{ touchAction: 'none' }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > window.innerWidth / 3 || velocity.x > 300) {
                setMobileMenuOpen(false);
              }
            }}
            className="fixed inset-0 z-[100] bg-theme/90 backdrop-blur-xl md:backdrop-blur-none transition-colors duration-500 flex flex-col md:flex-row"
          >
            {/* Left Decorative Side (Hidden on mobile) */}
            <div className="hidden md:flex flex-1 relative bg-black border-r border-white/5">
              <FadeImage 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=60&fm=webp" 
                alt="Menu Decor" 
                wrapperClassName="absolute inset-0"
                className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
              <div className="relative z-30 p-12 mt-auto">
                <Logo className="w-24 md:w-36 object-contain mb-6" />
                <p className="text-muted-1 font-light max-w-sm text-sm">
                  Lagos' finest premium chauffeur service. Absolute comfort, uncompromising privacy, and precision scheduling for the elite.
                </p>
              </div>
            </div>

            {/* Right Menu Side */}
            <div className="flex-1 flex flex-col pt-24 px-8 md:px-24 pb-12 overflow-y-auto w-full md:w-auto">
              <div className="flex justify-between items-center mb-16 md:absolute md:top-8 md:right-12 z-20">
                 <span className="md:hidden text-white font-display text-xl">LushRide.</span>
                 <button 
                  className="text-white p-2 hover:text-lush-yellow transition-colors flex items-center gap-3 group ml-auto"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="hidden md:block text-[11px] font-medium tracking-[0.2em] uppercase">Close</span>
                  <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
             
              <div className="flex flex-col gap-6 md:gap-8 mt-auto md:mt-24">
                {[
                  { num: '01', title: t('nav.about'), id: 'about' },
                  { num: '02', title: t('nav.services'), id: 'services' },
                  { num: '03', title: t('nav.fleet'), id: 'fleet' },
                  { num: '04', title: t('nav.hubs'), id: 'hubs' },
                  { num: '05', title: t('nav.partner'), id: 'partner' },
                ].map((item, index) => (
                  <motion.a 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={() => setMobileMenuOpen(false)} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-4xl md:text-6xl font-display transition-colors tracking-tight flex items-center group ${activeSection === item.id ? 'text-lush-yellow' : 'text-white hover:text-lush-yellow'}`}
                  >
                    <span className={`text-sm font-light mr-6 w-8 hidden md:block ${activeSection === item.id ? 'text-lush-yellow/50' : 'text-muted-1'}`}>{item.num}</span> {item.title}
                  </motion.a>
                ))}
                
                <motion.a 
                  href="#book" 
                  onClick={() => setMobileMenuOpen(false)} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 md:mt-12 inline-block px-12 py-4 border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-charcoal transition-all w-fit"
                >
                  Request a Quote
                </motion.a>
              </div>

              <div className="mt-auto pt-16 grid grid-cols-2 gap-8 md:hidden border-t border-white/10">
                 <div>
                    <h4 className="text-[10px] font-display text-muted-1 uppercase tracking-widest mb-3">Settings</h4>
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => { setDashboardOpen(true); setMobileMenuOpen(false); }}
                        className="text-white text-xs flex items-center gap-2 text-left"
                      >
                        <History size={14} /> Trip History
                      </button>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-display text-muted-1 uppercase tracking-widest mb-3">Contact</h4>
                    <p className="text-xs text-white mb-1">Info@lushride.com</p>
                    <p className="text-xs text-white">+234 703 740 4784</p>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dashboardOpen && <TripHistory onClose={() => setDashboardOpen(false)} />}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-start pt-24 px-6 md:px-12"
          >
            {/* Close Button */}
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="absolute top-6 right-6 md:top-8 md:right-12 text-white/50 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-lush-yellow z-30 animate-fade-in"
              aria-label="Close search"
            >
              <X size={28} />
            </button>

            {/* Main Search Container */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250, delay: 0.1 }}
              className="w-full max-w-2xl bg-[#0a0a0a]/80 border border-white/5 rounded-2xl p-6 md:p-8 mt-4 md:mt-12 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Luxury Glow */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-lush-yellow/40 to-transparent" />
              
              <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
                <Search className="text-lush-yellow shrink-0" size={24} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search vehicles, armor specs, or service hubs..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSelectedIndex(0); }}
                  className="w-full bg-transparent text-white placeholder-white/30 text-lg md:text-xl font-display focus:outline-none"
                  aria-label="Search site content"
                />
              </div>

              {/* Suggestions when query is empty */}
              {searchQuery.trim() === '' ? (
                <div>
                  <h4 className="text-[10px] text-muted-1 uppercase tracking-widest font-semibold mb-4">Suggested Searches</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'Armored Land Cruiser', icon: Shield, type: 'vehicle' },
                      { name: 'Range Rover SE', icon: Car, type: 'vehicle' },
                      { name: 'Ikoyi Coverage', icon: MapPin, type: 'area' },
                      { name: 'Lekki Phase 1', icon: MapPin, type: 'area' }
                    ].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(suggestion.name)}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 text-left text-white/80 hover:text-white transition-all text-sm group"
                      >
                        <suggestion.icon size={16} className="text-white/40 group-hover:text-lush-yellow transition-colors" />
                        <span className="font-light">{suggestion.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Matching Results */
                <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredResults.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <div className="text-[10px] text-lush-yellow uppercase tracking-widest font-semibold mb-2">
                        Matching Results ({filteredResults.length})
                      </div>
                      
                      {filteredResults.map((item, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectResult(item)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                              isSelected 
                                ? 'bg-lush-yellow text-black font-medium' 
                                : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {item.type === 'vehicle' ? (
                                item.keywords.includes('armored') ? (
                                  <Shield size={18} className={isSelected ? 'text-black' : 'text-lush-yellow'} />
                                ) : (
                                  <Car size={18} className={isSelected ? 'text-black' : 'text-lush-yellow'} />
                                )
                              ) : (
                                <MapPin size={18} className={isSelected ? 'text-black' : 'text-lush-yellow'} />
                              )}
                              <div>
                                <div className="text-sm font-semibold">{item.name}</div>
                                <div className={`text-xs font-light ${isSelected ? 'text-black/80' : 'text-white/50'}`}>
                                  {item.subtitle}
                                </div>
                              </div>
                            </div>
                            <span className={`text-[9px] uppercase tracking-wider ${isSelected ? 'bg-black/20 text-black px-2 py-0.5 rounded' : 'text-white/30'}`}>
                              {item.type === 'vehicle' ? 'Fleet' : 'Location'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-white/40 font-light">
                      No results found for "<span className="text-white/60 font-medium">{searchQuery}</span>". 
                      <p className="text-xs mt-2 text-white/30">Try searching for "Armored", "Range Rover", or "Lekki".</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
