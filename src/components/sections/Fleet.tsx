import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, X, Info, ChevronLeft, ChevronRight, MessageCircle, Shield, History, Star, ArrowLeftRight } from 'lucide-react';
import FadeImage from '../ui/FadeImage';
import { toast } from 'sonner';

const fleet = [
  {
    name: 'Lush Luxury',
    subtitle: 'Lexus RX 350 / Premium SUV Edition',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '3.5L V6 dual VVT-i',
      efficiency: '22 MPG Combined',
      capacity: '5 Passengers'
    },
    comfortFeatures: [
      'Dual-zone executive climate control',
      'Semi-aniline active heated/ventilated seats',
      'Mark Levinson 15-speaker premium spatial audio',
      'Premium sound-isolating double acoustic glass'
    ],
    safetyFeatures: [
      'Lexus Safety System+ luxury suite',
      'Dual active radar dynamic cruise tracking',
      'Pre-collision brake mitigation & pedestrian eye',
      'Intuitive rear and surround sonar park radars'
    ],
    overview: 'The Lush Luxury tier features carefully maintained Lexus RX 350 models from the premium SUV era. Known for their timeless reliability, quiet cabins, and soft leather seating, they offer an elite-class experience at an accessible entry-point.',
    safety: 'Lexus Safety System, Blind Spot Monitor, Intuitive Parking Assist',
    history: 'Direct manufacturer acquisitions, undergoes standard 120-point mechanical check daily.'
  },
  {
    name: 'Lush Executive',
    subtitle: 'Range Rover SE / Prestige Class',
    images: [
      'https://images.unsplash.com/photo-1608508491873-a80974b8826d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '3.0L Supercharged V6 MHEV',
      efficiency: '20 MPG Combined',
      capacity: '5 Passengers'
    },
    comfortFeatures: [
      'Four-zone ionized active clean cabin air',
      'Hot stone cabin customized massage seating',
      '1700W Meridian™ premium surround theater',
      'Adaptive variable air suspension overrides'
    ],
    safetyFeatures: [
      'All-Terrain Progress Control (ATPC) heavy weather',
      '3D panoramic immersive surround camera',
      'Tinted executive private viewing shades',
      'Lane keeping automatic steering guidance'
    ],
    overview: 'Representing true metropolitan prestige, our Lush Executive tier presents Range Rover SE models. Perfectly suited for senior executives and diplomats looking for high-status, comfortable transits inside and out of Lagos.',
    safety: 'Adaptive Cruise Control with Steering Assist, 3D Surround View, Lane Keep Assist',
    history: 'Exclusively dealer-maintained, strictly chauffeur-driven, meticulous exterior conditioning.'
  },
  {
    name: 'Lush Royale',
    subtitle: 'Toyota Land Cruiser Prado / Armored Suite',
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      engine: '2.8L Turbo Diesel / Hybrid Max',
      efficiency: '23 MPG Combined',
      capacity: '7 Passengers'
    },
    comfortFeatures: [
      'Reclining rear power captain executive chairs',
      'Integrated cooler box cooling center suite',
      'Dual rear-seat HD entertainment media screens',
      'Dynamic premium comfort KDSS suspension tuning'
    ],
    safetyFeatures: [
      'Tactical B6-level high armoring cage options',
      'Emergency run-flat heavy tire systems',
      'Infrared high-resolution night sight vision',
      'PA siren and external emergency integrations'
    ],
    overview: 'The sovereign standard of transit. Our Lush Royale tier showcases absolute modern masterpieces, including robust Toyota Land Cruiser Prado editions. Complete with state-of-the-art climate control, premier security, public-safety specifications, and optional B6-level armor protection.',
    safety: 'Toyota Safety Sense 3.0, Proactive Driving Assist, B6 Armoring options available',
    history: 'Brand-new elite fleet acquisitions, direct-from-factory bespoke setups, daily detailed and security cleared.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, scale: 0.95, y: 35 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0, 
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
  }
};

function VehicleCarousel({ images, alt, sizes }: { images: string[], alt: string, sizes?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="relative w-full h-full group overflow-hidden bg-[#111]"
      role="region"
      aria-label={`${alt} Image Carousel`}
    >
      <Helmet>
        <title>Fleet | LushRide</title>
        <meta name="description" content="Explore the Fleet section of LushRide's premium chauffeur services." />
      </Helmet>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative"
        >
          <FadeImage src={images[currentIndex]} alt={`Detailed view of ${alt} showing luxury features - View ${currentIndex + 1} of ${images.length}`} className="w-full h-full object-cover animate-kenburns" sizes={sizes} />
        </motion.div>
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prev} 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-lush-yellow"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={next} 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-lush-yellow"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20" role="tablist">
            {images.map((_, idx) => (
              <button 
                key={idx}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to image ${idx + 1}`}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`w-1.5 h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-lush-yellow ${idx === currentIndex ? 'bg-lush-yellow w-3' : 'bg-white/40 hover:bg-white/60'}`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function VehicleCard({
  tier,
  onQuickView,
  onFullGallery,
  onBook,
  onCompare,
  isCompared
}: {
  tier: typeof fleet[0];
  onQuickView: () => void;
  onFullGallery: () => void;
  onBook: () => void;
  onCompare: () => void;
  isCompared: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showSpecsTooltip, setShowSpecsTooltip] = useState(false);
  
  // Custom parallax scroll effect tracking individual card position
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div 
      ref={cardRef}
      variants={itemVariants}
      whileHover={{ scale: 1.01, y: -6 }}
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-xl flex flex-col p-4 sm:p-6 hover:border-lush-yellow/30 hover:shadow-2xl hover:shadow-lush-yellow/10 transition-all duration-500 will-change-transform"
    >
      {/* Parallax Image Frame */}
      <div className="aspect-[16/10] w-full overflow-hidden mb-6 rounded-lg relative group-hover:shadow-[0_0_20px_rgba(249,211,0,0.15)] transition-shadow">
         <motion.div 
           style={{ y }}
           className="absolute -top-[15%] -bottom-[15%] left-0 right-0 h-[130%] w-full z-0"
         >
           <VehicleCarousel images={tier.images} alt={`${tier.name} class vehicle showing ${tier.subtitle}`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
         </motion.div>
         
         {/* Subtle elegant category typography overlay tag */}
         <div className="absolute top-4 left-4 z-20 pointer-events-none">
           <span className="backdrop-blur-md bg-black/60 border border-lush-yellow/30 text-lush-yellow text-[9px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
             {tier.name}
           </span>
         </div>

         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 pointer-events-none z-10">
           <button 
             onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(); }}
             className="bg-lush-yellow text-black pointer-events-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
           >
             Quick View
           </button>
           <button 
             onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFullGallery(); }}
             className="bg-charcoal/80 backdrop-blur-md pointer-events-auto px-6 py-2 rounded-full text-white text-[10px] uppercase tracking-widest font-semibold border border-white/10 hover:bg-white/20 transition-colors"
           >
             Full Gallery
           </button>
         </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-2xl text-white">{tier.name}</h3>
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickView(); }} 
            className="text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-lush-yellow rounded bg-white/5 p-1.5 hover:bg-white/10"
            aria-label={`View details for ${tier.name}`}
          >
            <Info size={16} />
          </button>
        </div>
        <p className="text-sm font-light text-lush-yellow mb-4 leading-relaxed">{tier.subtitle}</p>
        
        {/* Rapid Technical Specs Summary Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6 relative">
          <span className="text-[9px] uppercase tracking-widest bg-white/[0.03] border border-white/10 text-white/70 py-1 px-2.5 rounded">
            {tier.specs.capacity}
          </span>
          <span className="text-[9px] uppercase tracking-widest bg-white/[0.03] border border-white/10 text-white/70 py-1 px-2.5 rounded text-ellipsis overflow-hidden max-w-[120px]">
            {tier.specs.engine.split(' ')[0]} Engine
          </span>
          
          {/* Interactive Feature Tooltip Badge */}
          <div 
            className="relative"
            onMouseEnter={() => setShowSpecsTooltip(true)}
            onMouseLeave={() => setShowSpecsTooltip(false)}
            onClick={(e) => { e.stopPropagation(); setShowSpecsTooltip(!showSpecsTooltip); }}
          >
            <span className="text-[9px] uppercase tracking-widest bg-lush-yellow/10 border border-lush-yellow/30 text-lush-yellow py-1 px-2.5 rounded cursor-pointer flex items-center gap-1 hover:bg-lush-yellow/20 transition-all select-none">
              Premium specs ✦
            </span>
            
            <AnimatePresence>
              {showSpecsTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-0 mb-3 w-64 bg-[#0A0A0A]/95 backdrop-blur-xl border border-lush-yellow/30 p-4 rounded-xl shadow-2xl z-50 text-left pointer-events-none"
                >
                  <h4 className="text-[10px] uppercase tracking-widest text-lush-yellow font-semibold mb-2 pb-1 border-b border-white/10 flex justify-between items-center">
                    <span>Premium Amenities</span>
                    <span className="text-[8px] text-white/40">Guaranteed</span>
                  </h4>
                  <ul className="space-y-1.5 text-[11px] font-light text-white/90">
                    <li className="flex items-center gap-1.5">
                      <span className="text-lush-yellow text-[9px]">✦</span> Leather Upholstery (Premium Grade)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-lush-yellow text-[9px]">✦</span> Premium Sound System (Surround Audios)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-lush-yellow text-[9px]">✦</span> Adaptive Cruise Control (Assisted)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-lush-yellow text-[9px]">✦</span> 360° Safety & Active Monitoring
                    </li>
                  </ul>
                  <div className="absolute top-full left-6 -mt-1 h-2 w-2 rotate-45 border-r border-b border-lush-yellow/30 bg-[#0A0A0A]/95" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 max-[400px]:grid-cols-1 gap-2">
          <button 
            onClick={onBook}
            className="inline-flex items-center justify-center py-2.5 bg-white text-black text-[10px] tracking-widest uppercase font-semibold rounded-md hover:bg-lush-yellow transition-colors w-full"
          >
            Book Now
          </button>
          <a 
            href={`https://wa.me/2347037404784?text=${encodeURIComponent(`Hello, I'm inquiring about the premium ${tier.name} tier (${tier.subtitle}).`)}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center py-2.5 bg-[#111] border border-white/10 text-white text-[10px] tracking-widest uppercase font-semibold rounded-md hover:border-white/30 transition-colors w-full"
          >
            <MessageCircle size={14} className="mr-1.5" /> Concierge
          </a>
        </div>
        <button 
          onClick={onCompare}
          className={`mt-2 flex items-center justify-center py-2.5 w-full border border-white/10 text-[10px] tracking-widest uppercase font-semibold rounded-md transition-colors ${isCompared ? 'bg-lush-yellow text-black border-lush-yellow' : 'bg-transparent text-white/70 hover:border-white/30 hover:text-white'}`}
        >
          <ArrowLeftRight size={14} className="mr-1.5" /> 
          {isCompared ? 'Selected for Compare' : 'Compare'}
        </button>
      </div>
    </motion.div>
  );
}

export default function Fleet() {
  const [filterTier, setFilterTier] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [fleetData, setFleetData] = useState<typeof fleet>(fleet);
  const [expandedVehicle, setExpandedVehicle] = useState<typeof fleet[0] | null>(null);
  const [galleryVehicle, setGalleryVehicle] = useState<typeof fleet[0] | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-config')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error("Unable to fetch configuration");
      })
      .then(data => {
        if (data && data.fleet) {
          setFleetData(data.fleet);
        }
      })
      .catch(err => {
        console.log("Using static local fallback fleet config", err);
        const cached = localStorage.getItem("lush_site_config_fallback");
        if (cached) {
          try {
            const data = JSON.parse(cached);
            if (data && data.fleet) {
              setFleetData(data.fleet);
            }
          } catch (e) {}
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    const handleOpenQuickview = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || !customEvent.detail.name) return;
      
      const vehicleName = customEvent.detail.name.toLowerCase();
      const found = fleetData.find(f => 
        f.name.toLowerCase().includes(vehicleName) || 
        f.subtitle.toLowerCase().includes(vehicleName)
      );
      
      if (found) {
        setFilterTier('All');
        setExpandedVehicle(found);
        
        // Scroll smoothly to fleet section
        const fleetSection = document.getElementById('fleet');
        if (fleetSection) {
          fleetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('open-vehicle-quickview', handleOpenQuickview);
    return () => {
      window.removeEventListener('open-vehicle-quickview', handleOpenQuickview);
    };
  }, [fleetData]);

  const toggleCompare = (tierName: string) => {
    if (compareList.includes(tierName)) {
      setCompareList(prev => prev.filter(t => t !== tierName));
    } else {
      if (compareList.length >= 3) {
        toast('Compare limit reached', { description: 'You can only compare up to 3 vehicles.' });
        return;
      }
      setCompareList(prev => [...prev, tierName]);
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": fleetData.map((tier, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": `LushRide ${tier.name} Class - ${tier.subtitle}`,
        "description": tier.overview,
        "image": tier.images[0]
      }
    }))
  };

  return (
    <section id="fleet" className="bg-theme transition-colors duration-500 py-32 relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-white leading-tight">
                Exclusive Fleet, Tailored<br/> for Every Journey
              </h2>
              <p className="text-lg text-muted-2 font-light leading-relaxed mb-8">
                Discover the distinguished vehicle classes of LushRide. From Business Class sophistication to Luxe prestige, every ride in Lagos combines absolute comfort, style, and performance — ensuring you travel in true VIP fashion.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                   onClick={() => setSelectedTier('General Inquiry')}
                   className="px-8 py-3 border border-white/30 text-lush-yellow text-xs tracking-[0.2em] uppercase hover:border-lush-yellow hover:bg-lush-yellow/10 transition-colors rounded-sm shrink-0"
                >
                  Request a Quote
                </button>
                <div className="flex bg-white/5 p-1.5 rounded-lg border border-white/10 overflow-x-auto whitespace-nowrap max-w-full hide-scrollbars">
                  {['All', 'Luxury', 'Executive', 'Royal'].map(tier => (
                    <button
                      key={tier}
                      onClick={() => setFilterTier(tier)}
                      className={`px-5 py-2 text-[10px] uppercase tracking-widest font-semibold rounded-md transition-all ${filterTier === tier ? 'bg-lush-yellow text-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="group relative bg-[#0A0A0A] border border-white/5 rounded-xl flex flex-col p-6 animate-pulse overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none" />
                <div className="aspect-[16/10] w-full bg-white/[0.03] rounded-lg mb-6 relative overflow-hidden" />
                <div className="w-1/2 h-7 bg-white/[0.04] mb-4 rounded" />
                <div className="w-3/4 h-3 bg-white/[0.02] mb-2 rounded" />
                <div className="w-2/3 h-3 bg-white/[0.02] mb-8 rounded" />
                <div className="mt-auto grid grid-cols-2 gap-2 mb-2">
                  <div className="h-10 bg-white/[0.03] rounded-md" />
                  <div className="h-10 bg-white/[0.03] rounded-md" />
                </div>
                <div className="h-10 w-full bg-white/[0.03] rounded-md mt-2 relative overflow-hidden" />
              </div>
            ))
          ) : (
            (filterTier === 'All' ? fleetData : fleetData.filter(t => t.name === filterTier)).map((tier) => (
              <VehicleCard
                key={tier.name}
                tier={tier}
                onQuickView={() => setExpandedVehicle(tier)}
                onFullGallery={() => setGalleryVehicle(tier)}
                onBook={() => setSelectedTier(tier.name)}
                onCompare={() => toggleCompare(tier.name)}
                isCompared={compareList.includes(tier.name)}
              />
            ))
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {compareList.length > 0 && !isCompareModalOpen && !expandedVehicle && !selectedTier && !galleryVehicle && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#111]/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-full shadow-2xl flex items-center gap-6"
          >
            <span className="text-sm text-white"><span className="font-semibold text-lush-yellow">{compareList.length}</span> vehicle(s) selected</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCompareList([])}
                className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors px-3 py-2"
              >
                Clear
              </button>
              <button 
                onClick={() => setIsCompareModalOpen(true)}
                disabled={compareList.length < 2}
                className="text-[10px] uppercase tracking-widest bg-white text-black font-semibold rounded-full px-5 py-2 hover:bg-lush-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Specs
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryVehicle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl"
            onClick={() => setGalleryVehicle(null)}
          >
            <button 
              onClick={() => setGalleryVehicle(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-40 bg-white/5 rounded-full p-3 hover:bg-white/10"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>
            
            <div className="w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
               <VehicleCarousel images={galleryVehicle.images} alt={`${galleryVehicle.name} HD Gallery`} sizes="100vw" />
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-widest uppercase font-semibold">
               {galleryVehicle.name} • {galleryVehicle.images.length} High-Definition Images
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsCompareModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-3xl flex flex-col p-8 md:p-12 mb-auto mt-auto"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute top-4 right-4 bg-black/50 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-30"
              >
                <X size={18} />
              </button>

              <h2 className="text-3xl font-display text-white mb-8 border-b border-white/10 pb-4">Vehicle Comparison</h2>
              
              <div className="grid gap-6 overflow-x-auto pb-4" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(280px, 1fr))` }}>
                {compareList.map(tierName => {
                  const vehicle = fleetData.find(f => f.name === tierName);
                  if (!vehicle) return null;
                  return (
                    <div key={tierName} className="flex flex-col gap-6">
                      <div className="aspect-[16/10] bg-[#111] rounded-lg overflow-hidden relative">
                        <FadeImage src={vehicle.images[0]} alt={`${vehicle.name} class premium chauffeured vehicle comparison view`} className="w-full h-full object-cover" sizes="(max-width: 640px) 100vw, 300px" />
                      </div>
                      <div>
                        <span className="text-lush-yellow text-xs tracking-widest uppercase font-semibold">{vehicle.name} Class</span>
                        <h4 className="text-xl font-display text-white mt-1">{vehicle.subtitle}</h4>
                      </div>
                      
                      <div className="space-y-4 text-sm">
                        <div className="border-t border-white/5 pt-4">
                          <span className="text-white/40 block text-xs uppercase tracking-widest mb-1">Engine</span>
                          <span className="text-white">{vehicle.specs.engine}</span>
                        </div>
                        <div className="border-t border-white/5 pt-4">
                          <span className="text-white/40 block text-xs uppercase tracking-widest mb-1">Efficiency</span>
                          <span className="text-white">{vehicle.specs.efficiency}</span>
                        </div>
                        <div className="border-t border-white/5 pt-4">
                          <span className="text-white/40 block text-xs uppercase tracking-widest mb-1">Capacity</span>
                          <span className="text-white">{vehicle.specs.capacity}</span>
                        </div>
                        <div className="border-t border-white/5 pt-4">
                          <span className="text-white/40 block text-xs uppercase tracking-widest mb-1">Safety</span>
                          <span className="text-white/80 line-clamp-3">{vehicle.safety}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setIsCompareModalOpen(false);
                          setSelectedTier(vehicle.name);
                        }}
                        className="mt-auto inline-flex items-center justify-center py-3 bg-white text-black text-[10px] tracking-widest uppercase font-semibold rounded-md hover:bg-lush-yellow transition-colors w-full"
                      >
                        Book {vehicle.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Vehicle Details Modal */}
      <AnimatePresence>
        {expandedVehicle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setExpandedVehicle(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative shadow-3xl flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button 
                onClick={() => setExpandedVehicle(null)}
                className="absolute top-4 right-4 bg-black/50 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-lush-yellow"
                aria-label="Close vehicle details"
              >
                <X size={18} />
              </button>

              {/* Left Side: Image Slider */}
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[450px]">
                <VehicleCarousel images={expandedVehicle.images} alt={expandedVehicle.name} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col md:max-h-[85vh] overflow-y-auto">
                <span className="text-lush-yellow text-xs tracking-widest uppercase font-semibold mb-2">{expandedVehicle.name} Class</span>
                <h3 id="modal-title" className="text-3xl font-display text-white mb-6">{expandedVehicle.subtitle}</h3>
                
                <p className="text-muted-1 font-light leading-relaxed mb-6">{expandedVehicle.overview}</p>

                <div className="space-y-6 mb-8">
                  {/* Detailed Specs Banner */}
                  <div className="grid grid-cols-3 gap-2 border-y border-white/10 py-4 bg-white/[0.02] px-3 rounded-lg">
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-wider text-muted-2 block mb-1">Drivetrain</span>
                      <span className="text-[11px] font-medium text-white block truncate" title={expandedVehicle.specs.engine}>{expandedVehicle.specs.engine}</span>
                    </div>
                    <div className="text-center border-x border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-muted-2 block mb-1">Efficiency</span>
                      <span className="text-[11px] font-medium text-white block truncate" title={expandedVehicle.specs.efficiency}>{expandedVehicle.specs.efficiency}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-wider text-muted-2 block mb-1">Capacity</span>
                      <span className="text-[11px] font-medium text-white block truncate" title={expandedVehicle.specs.capacity}>{expandedVehicle.specs.capacity}</span>
                    </div>
                  </div>

                  {/* Comfort features */}
                  <div>
                    <h4 className="flex items-center text-white text-xs font-semibold uppercase tracking-wider mb-2">
                      <Star size={14} className="mr-2 text-lush-yellow" /> Comfort & Convenience Amenities
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-light text-muted-1">
                      {expandedVehicle.comfortFeatures?.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1 p-1 bg-white/[0.02] rounded border border-white/5">
                          <span className="text-lush-yellow mr-1">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Safety features */}
                  <div>
                    <h4 className="flex items-center text-white text-xs font-semibold uppercase tracking-wider mb-2">
                      <Shield size={14} className="mr-2 text-lush-yellow" /> Safety & Protective Specifications
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-light text-muted-1">
                      {expandedVehicle.safetyFeatures?.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1 p-1 bg-white/[0.02] rounded border border-white/5">
                          <span className="text-green-400 mr-1">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* History Vetting */}
                  <div className="border-t border-white/5 pt-4">
                    <h4 className="flex items-center text-white text-xs font-semibold uppercase tracking-wider mb-2">
                      <History size={14} className="mr-2 text-lush-yellow" /> Service History & Support
                    </h4>
                    <p className="text-xs font-light text-muted-2 leading-relaxed">{expandedVehicle.history}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex gap-4">
                  <button 
                    onClick={() => {
                      setSelectedTier(expandedVehicle.name);
                      setExpandedVehicle(null);
                    }}
                    className="flex-1 bg-white text-black font-semibold py-3 rounded-lg hover:bg-lush-yellow hover:text-black transition-colors"
                  >
                    Request Quote
                  </button>
                  <a 
                    href={`https://wa.me/2347037404784?text=${encodeURIComponent(`Hello, I'd like to ask a question regarding the ${expandedVehicle.name} tier (${expandedVehicle.subtitle}).`)}`}
                    className="flex-1 bg-transparent border border-white/20 text-white font-semibold py-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle size={18} /> Concierge
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedTier && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-3xl shadow-black/50"
            >
              <button 
                onClick={() => setSelectedTier(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-display text-white mb-2">Request a Quote</h3>
              <p className="text-sm text-muted-1 font-light mb-6">Our concierge team will contact you shortly to confirm your {selectedTier !== 'General Inquiry' ? <span className="text-lush-yellow font-medium">{selectedTier}</span> : 'booking'}.</p>
              
              <form className="space-y-4" onSubmit={(e) => { 
                e.preventDefault(); 
                toast.success('Your booking request has been submitted. Our concierge will contact you shortly.', {
                  style: {
                    background: '#111',
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.1)'
                  }
                });
                setSelectedTier(null); 
              }}>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Vehicle Category</label>
                  <select 
                    name="category"
                    defaultValue={selectedTier}
                    className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lush-yellow transition-colors appearance-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Lush Luxury">Lush Luxury (2014-2018)</option>
                    <option value="Lush Executive">Lush Executive (2018-2022)</option>
                    <option value="Lush Royale">Lush Royale (2023-2026)</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Your Name</label>
                    <input name="name" type="text" required className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lush-yellow transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Phone / WhatsApp</label>
                    <input name="phone" type="tel" required className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lush-yellow transition-colors" placeholder="+234..." />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Date & Time</label>
                  <input name="date" type="datetime-local" className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lush-yellow transition-colors" />
                </div>
                <button type="submit" className="w-full bg-lush-yellow text-charcoal font-semibold py-3 rounded-lg hover:bg-white transition-colors mt-6">
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
