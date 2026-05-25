import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, X } from 'lucide-react';
import { toast } from 'sonner';

export default function QuickEnquiryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-charcoal border border-white/20 text-white rounded-full shadow-2xl hover:scale-110 hover:border-lush-yellow transition-all duration-300"
        aria-label="Quick Enquiry"
      >
        <Calendar size={24} className="text-lush-yellow" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-40 right-6 z-[100] w-80 bg-theme/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-3xl p-6"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            <h4 className="text-white font-display text-lg mb-4">Check Availability</h4>
            <form 
              className="space-y-4"
              onSubmit={(e) => { 
                e.preventDefault(); 
                toast.success('Availability checked. Our team will contact you shortly.', {
                  style: {
                    background: '#111',
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.1)'
                  }
                });
                setIsOpen(false);
              }}
            >
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Date</label>
                <input name="date" type="date" required className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-lush-yellow transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Vehicle</label>
                <select 
                  name="category"
                  className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-lush-yellow transition-colors appearance-none"
                >
                  <option value="Any">Any Available</option>
                  <option value="Luxury">Luxury Class</option>
                  <option value="Executive">Executive Class</option>
                  <option value="Royal">Royal Class</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-lush-yellow transition-colors mt-2 text-sm">
                Check Now
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
