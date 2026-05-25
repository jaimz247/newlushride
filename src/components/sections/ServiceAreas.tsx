import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';

const locations = [
  {
    id: 'ikoyi',
    name: 'Ikoyi',
    x: 65,
    y: 35,
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
    name: 'Lekki',
    x: 75,
    y: 65,
    desc: 'The dynamic pulse of lifestyle & contemporary culture.',
  }
];

export default function ServiceAreas() {
  const [activePin, setActivePin] = useState<string | null>(null);

  return (
    <section className="py-32 bg-theme transition-colors duration-500 overflow-hidden relative">
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

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
          {/* Stylized dark map background */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80" 
              alt="Lagos Map View" 
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
          </div>

          {/* Map Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 mix-blend-overlay" />

          {/* Interactive Pins */}
          {locations.map((loc) => (
            <div 
              key={loc.id} 
              className="absolute z-20 group"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -100%)' }}
              onMouseEnter={() => setActivePin(loc.id)}
              onMouseLeave={() => setActivePin(null)}
            >
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  className="w-10 h-10 flex items-center justify-center cursor-pointer relative"
                >
                  <MapPin className={`w-8 h-8 transition-colors duration-300 ${activePin === loc.id ? 'text-lush-yellow drop-shadow-[0_0_8px_rgba(249,211,0,0.8)]' : 'text-white/60 group-hover:text-white'}`} weight="fill" />
                  
                  {/* Ping effect */}
                  <span className={`absolute inset-0 rounded-full border border-lush-yellow/50 animate-ping opacity-0 ${activePin === loc.id ? '!opacity-100' : ''}`} />
                </motion.div>
                
                <AnimatePresence>
                  {activePin === loc.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#111]/95 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-2xl pointer-events-none z-30"
                    >
                      <h4 className="text-white font-display text-sm mb-1">{loc.name}</h4>
                      <p className="text-muted-1 text-[10px] lowercase opacity-80 leading-snug">{loc.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
