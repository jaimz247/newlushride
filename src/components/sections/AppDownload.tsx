import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Play, Car } from 'lucide-react';
import FadeImage from '../ui/FadeImage';

export default function AppDownload() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-theme transition-colors duration-500">
      <Helmet>
        <title>AppDownload | LushRide</title>
        <meta name="description" content="Explore the AppDownload section of LushRide's premium chauffeur services." />
      </Helmet>
      <div className="absolute inset-0 z-0">
         <FadeImage 
            src="https://images.unsplash.com/photo-1512404098908-1cc67c7e5a62?auto=format&fit=crop&w=1920&q=60&fm=webp" 
            alt="Mobile App" 
            wrapperClassName="absolute inset-0"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme via-theme/80 to-theme transition-colors duration-500" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-lush-yellow uppercase tracking-widest text-xs font-semibold mb-4 block">Mobile Experience</span>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight">
              Prestige in Your <br/>
              <span className="font-light italic text-white/80">Pocket.</span>
            </h2>
            <p className="text-muted-1 font-light leading-relaxed mb-10 max-w-md">
              Book rides seamlessly, track your chauffeur in real-time, and manage your invoices with the exclusive LushRide mobile application.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-full hover:bg-lush-yellow hover:text-black transition-colors duration-300">
                <Apple size={24} />
                <div className="text-left flex flex-col">
                  <span className="text-[10px] uppercase tracking-wide leading-none">Download on the</span>
                  <span className="text-sm font-semibold leading-tight">App Store</span>
                </div>
              </a>
              <a href="#" className="flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-300">
                <Play size={20} className="ml-1" />
                <div className="text-left flex flex-col">
                  <span className="text-[10px] uppercase tracking-wide leading-none">Get it on</span>
                  <span className="text-sm font-semibold leading-tight">Google Play</span>
                </div>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
             <div className="relative mx-auto w-[280px] h-[580px] bg-black border-[8px] border-[#1C1C1E] rounded-[3rem] shadow-2xl overflow-hidden shadow-lush-yellow/10">
               {/* Mock App UI */}
               <div className="absolute inset-0 bg-[#050505] flex flex-col font-sans">
                 {/* Map Background Simulation */}
                 <div className="absolute inset-0 opacity-40">
                   <FadeImage src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=60&fm=webp" alt="Map Route" className="w-full h-1/2 object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] h-1/2" />
                 </div>

                 {/* Content */}
                 <div className="relative z-10 flex flex-col h-full p-5 pt-12">
                   {/* Header elements */}
                   <div className="flex justify-between items-center mb-auto">
                     <div className="w-10 h-10 border border-white/20 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                       <div className="w-4 h-4 bg-white/80 rounded-sm" />
                     </div>
                     <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-lush-yellow animate-pulse" />
                       <span className="text-white text-[10px] font-medium tracking-wide">ONLINE</span>
                     </div>
                   </div>
                   
                   <AnimatePresence>
                     {showToast && (
                       <motion.div
                         initial={{ opacity: 0, y: -20, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: -20, scale: 0.95 }}
                         className="absolute top-24 left-4 right-4 bg-[#111]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-3"
                       >
                         <div className="w-10 h-10 rounded-full bg-lush-yellow/20 flex items-center justify-center text-lush-yellow flex-shrink-0">
                           <Car size={18} />
                         </div>
                         <div>
                           <p className="text-white text-xs font-semibold mb-0.5">Chauffeur Approaching</p>
                           <p className="text-white/60 text-[10px]">Your Lexus RX 350 is 2 minutes away.</p>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   {/* Bottom Sheet */}
                   <div className="bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 mt-auto shadow-2xl">
                     <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />
                     
                     {/* Car Preview */}
                     <div className="w-full aspect-[16/9] bg-black rounded-2xl mb-5 flex overflow-hidden border border-white/5 relative">
                        <FadeImage src="/lexus1.jpg" alt="App car preview" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
                        <div className="absolute bottom-2 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 z-20">
                          <span className="text-white font-medium text-xs">Lexus RX</span>
                        </div>
                     </div>
                     
                     {/* Locations */}
                     <div className="relative pl-6 mb-6">
                       {/* Timeline line */}
                       <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-white/10" />
                       <div className="absolute left-[3.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-lush-yellow" />
                       <div className="absolute left-[3.5px] bottom-1.5 w-2.5 h-2.5 rounded-sm bg-white" />
                       
                       <div className="mb-4">
                         <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Pickup</p>
                         <p className="text-white text-sm truncate font-medium">Murtala Muhammed Int'l Airport</p>
                       </div>
                       <div>
                         <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Drop-off</p>
                         <p className="text-white text-sm truncate font-medium">Eko Hotels & Suites, VI</p>
                       </div>
                     </div>
                     
                     <button className="w-full h-12 bg-lush-yellow rounded-xl flex items-center justify-center text-black font-semibold text-sm hover:bg-white transition-colors">
                       Confirm Executive Ride
                     </button>
                   </div>
                 </div>
               </div>
               
               {/* Notch */}
               <div className="absolute top-0 inset-x-0 h-6 bg-[#1C1C1E] rounded-b-xl w-32 mx-auto" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
