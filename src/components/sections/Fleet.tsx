import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Info, ChevronLeft, ChevronRight, MessageCircle, Shield, History, Star } from 'lucide-react';
import FadeImage from '../ui/FadeImage';
import { toast } from 'sonner';

const fleet = [
  {
    name: 'Luxury',
    subtitle: 'Lexus RX 350 F-Sport (2025)',
    images: ['/lexus1.jpg', '/lexus2.jpg', '/interior.jpg'],
    specs: {
      engine: '2.4L Turbo 4-Cylinder',
      efficiency: '24 MPG Combined',
      capacity: '5 Passengers'
    },
    overview: 'The Lexus RX 350 F-Sport brings together agile handling, bold styling, and intuitive technology. Perfect for executive transfers, offering a quiet, refined interior and advanced suspension for a smooth ride in the city.',
    safety: 'Lexus Safety System+ 3.0, Pre-Collision System, Lane Departure Alert',
    history: 'Direct from manufacturer, pristine condition, full dealer service history.'
  },
  {
    name: 'Executive',
    subtitle: 'Range Rover SE (2026)',
    images: ['/range 2.jpg', '/range 1.jpg', '/range 3.jpg', '/Range interior.jpg'],
    specs: {
      engine: '3.0L Inline-6 MHEV',
      efficiency: '21 MPG Combined',
      capacity: '5 Passengers'
    },
    overview: 'The Range Rover SE represents the pinnacle of luxury SUVs. Unmatched off-road capability fused with exceptional on-road refinement. Enjoy the spacious cabin crafted with premium materials for maximum comfort.',
    safety: '3D Surround Camera, Adaptive Cruise Control with Steering Assist, Blind Spot Assist',
    history: 'Brand new 2026 model, strictly chauffeur-driven, daily detailed.'
  },
  {
    name: 'Royal',
    subtitle: 'Toyota Land Cruiser Prado (2025)',
    images: ['/Toyota land cruiser.jpg', '/Toyota land cruiser2.jpg', '/Toyota-RAV4 2026.jpg', '/Toyota-RAV4-2026 2.jpg'],
    specs: {
      engine: '2.4L i-FORCE MAX Hybrid',
      efficiency: '23 MPG Combined',
      capacity: '7 Passengers'
    },
    overview: 'Commanding presence with legendary reliability. The Land Cruiser Prado offers unmatched durability and dominant stance, making it ideal for commanding the roads with absolute peace of mind.',
    safety: 'Toyota Safety Sense 3.0, Proactive Driving Assist, B6 Armoring options available',
    history: 'Exclusively procured for our royal tier clients, rigorously maintained.'
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

function VehicleCarousel({ images, alt }: { images: string[], alt: string }) {
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
    <div className="relative w-full h-full group overflow-hidden bg-[#111]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative"
        >
          <FadeImage src={images[currentIndex]} alt={`${alt} - ${currentIndex + 1}`} className="w-full h-full object-cover animate-kenburns" />
        </motion.div>
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20">
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-lush-yellow' : 'bg-white/40'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Fleet() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [expandedVehicle, setExpandedVehicle] = useState<typeof fleet[0] | null>(null);

  return (
    <section id="fleet" className="bg-theme transition-colors duration-500 py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-white leading-tight">
              Exclusive Fleet, Tailored<br/> for Every Journey
            </h2>
            <p className="text-lg text-muted-2 font-light leading-relaxed mb-8">
              Discover the distinguished vehicle classes of LushRide. From Business Class sophistication to Luxe prestige, every ride in Lagos combines absolute comfort, style, and performance — ensuring you travel in true VIP fashion.
            </p>
            <button
               onClick={() => setSelectedTier('General Inquiry')}
               className="px-8 py-3 border border-white/30 text-lush-yellow text-xs tracking-[0.2em] uppercase hover:border-lush-yellow hover:bg-lush-yellow/10 transition-colors rounded-sm"
            >
              Request a Quote
            </button>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {fleet.map((tier) => (
            <motion.div 
              key={tier.name}
              variants={itemVariants}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-xl flex flex-col p-6 hover:border-lush-yellow/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lush-yellow/10 transition-all duration-500"
            >
              <div className="aspect-[16/10] w-full overflow-hidden mb-6 rounded-lg relative cursor-pointer" onClick={() => setExpandedVehicle(tier)}>
                 <VehicleCarousel images={tier.images} alt={tier.name} />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-2xl text-white">{tier.name}</h3>
                  <button onClick={() => setExpandedVehicle(tier)} className="text-white/60 hover:text-white transition-colors">
                    <Info size={18} />
                  </button>
                </div>
                <p className="text-sm font-light text-lush-yellow mb-4 leading-relaxed">{tier.subtitle}</p>
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelectedTier(tier.name)}
                    className="inline-flex items-center justify-center py-2.5 bg-white text-black text-[10px] tracking-widest uppercase font-semibold rounded-md hover:bg-lush-yellow transition-colors w-full"
                  >
                    Book Now
                  </button>
                  <a 
                    href={`https://wa.me/2347037404784?text=${encodeURIComponent(`Hello, I'd like to ask a question regarding the ${tier.name} tier (${tier.subtitle}).`)}`}
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center justify-center py-2.5 bg-[#111] border border-white/10 text-white text-[10px] tracking-widest uppercase font-semibold rounded-md hover:border-white/30 transition-colors w-full"
                  >
                    <MessageCircle size={14} className="mr-1.5" /> Concierge
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-3xl flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setExpandedVehicle(null)}
                className="absolute top-4 right-4 bg-black/50 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-30"
              >
                <X size={18} />
              </button>

              {/* Left Side: Image Slider */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                <VehicleCarousel images={expandedVehicle.images} alt={expandedVehicle.name} />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                <span className="text-lush-yellow text-xs tracking-widest uppercase font-semibold mb-2">{expandedVehicle.name} Class</span>
                <h3 className="text-3xl font-display text-white mb-6">{expandedVehicle.subtitle}</h3>
                
                <p className="text-muted-1 font-light leading-relaxed mb-8">{expandedVehicle.overview}</p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="flex items-center text-white text-sm font-semibold mb-2"><Star size={16} className="mr-2 text-lush-yellow" /> Technical Specifications</h4>
                    <ul className="text-sm font-light text-muted-1 space-y-1">
                      <li>• {expandedVehicle.specs.engine}</li>
                      <li>• {expandedVehicle.specs.efficiency}</li>
                      <li>• {expandedVehicle.specs.capacity}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center text-white text-sm font-semibold mb-2"><History size={16} className="mr-2 text-lush-yellow" /> Vehicle History</h4>
                    <p className="text-sm font-light text-muted-1">{expandedVehicle.history}</p>
                  </div>
                  <div>
                    <h4 className="flex items-center text-white text-sm font-semibold mb-2"><Shield size={16} className="mr-2 text-lush-yellow" /> Safety Features</h4>
                    <p className="text-sm font-light text-muted-1">{expandedVehicle.safety}</p>
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
                    <option value="Luxury">Luxury (Lexus RX 350)</option>
                    <option value="Executive">Executive (Range Rover SE)</option>
                    <option value="Royal">Royal (Toyota Prado / Armored)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
