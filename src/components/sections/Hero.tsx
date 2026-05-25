import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'transfers' | 'hourly'>('transfers');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-theme transition-colors duration-500 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ scale: { duration: 15, ease: 'easeOut' }, opacity: { duration: 1.5, ease: 'easeIn' } }}
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/2022_Land_Rover_Range_Rover_SE_P440e_AWD_Automatic_3.0_Front.jpg" 
          alt="Imposing Luxury Vehicle" 
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center h-full">
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
            Lagos' finest premium chauffeur service. Absolute comfort, uncompromising privacy, and precision scheduling for the elite.
          </p>
        </motion.div>

        {/* Elevated Booking Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-5xl bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl"
        >
          <div className="flex gap-8 border-b border-white/10 pb-4 mb-6">
            <button 
              onClick={() => setActiveTab('transfers')}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'transfers' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
            >
              Transfers
            </button>
            <button 
              onClick={() => setActiveTab('hourly')}
              className={`text-[11px] tracking-[0.2em] font-medium uppercase transition-colors pb-4 -mb-[17px] ${activeTab === 'hourly' ? 'text-white border-b-2 border-lush-yellow' : 'text-muted-1 hover:text-white'}`}
            >
              Hourly
            </button>
          </div>

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
        </motion.div>
      </div>
    </section>
  );
}
