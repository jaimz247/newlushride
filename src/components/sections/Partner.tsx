import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export default function Partner() {
  const [activeTab, setActiveTab] = useState<'vehicle'|'pilot'>('vehicle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      toast.success('Your application has been received. Our team will review and contact you.', {
        style: {
          background: '#111',
          color: '#fff',
          borderColor: 'rgba(255,255,255,0.1)'
        }
      });
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="partner" className="bg-theme transition-colors duration-500 py-32">
      <Helmet>
        <title>Partner | LushRide</title>
        <meta name="description" content="Explore the Partner section of LushRide's premium chauffeur services." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display mb-6 text-white">Join the Standard.</h2>
          <p className="text-lg text-muted-2 font-light max-w-xl mx-auto">
            We are actively expanding our fleet and our roster of elite pilots. Partner with LushRide for premium tier earnings and an exclusive clientele.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-white/10"
        >
          <div className="flex border-b border-white/10">
            <button 
              onClick={() => setActiveTab('vehicle')}
              className={`flex-1 py-4 text-sm tracking-widest uppercase transition-colors ${activeTab === 'vehicle' ? 'text-white border-b-2 border-lush-yellow bg-[#0A0A0A]' : 'text-muted-1 hover:text-white'}`}
            >
              Vehicle Owners
            </button>
            <button 
              onClick={() => setActiveTab('pilot')}
              className={`flex-1 py-4 text-sm tracking-widest uppercase transition-colors ${activeTab === 'pilot' ? 'text-white border-b-2 border-lush-yellow bg-[#0A0A0A]' : 'text-muted-1 hover:text-white'}`}
            >
              Prospective Pilots
            </button>
          </div>

          <div className="p-8 md:p-12 relative min-h-[400px]">
             <AnimatePresence mode="popLayout">
               {activeTab === 'vehicle' && (
                 <motion.div
                   key="vehicle"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                 >
                   <p className="text-muted-2 font-light text-sm mb-8">Access high-margin clientele and guarantee consistent ROI on your premium assets. All vehicles must be model year 2018 or newer.</p>
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Full Name / Company Name</label>
                        <input type="text" required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Email Address</label>
                          <input type="email" required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Phone Number</label>
                          <input type="tel" required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Vehicle Make, Model & Year</label>
                        <input type="text" required placeholder="e.g., Mercedes-Benz S-Class 2021" className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting || success}
                        className="py-4 px-8 border border-white/30 text-lush-yellow text-sm tracking-widest uppercase hover:border-lush-yellow transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Submitting...' : success ? 'Profile Received' : 'Submit Vehicle Profile'}
                      </button>
                   </form>
                 </motion.div>
               )}

               {activeTab === 'pilot' && (
                 <motion.div
                   key="pilot"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                 >
                   <p className="text-muted-2 font-light text-sm mb-8">Pass through The Lush Academy and earn top tier compensation driving Lagos' elite. Professional demeanor and clean driving history required.</p>
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">First Name</label>
                          <input type="text" required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Last Name</label>
                          <input type="text" required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Email Address</label>
                          <input type="email" required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Phone Number</label>
                          <input type="tel" required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-1 mb-2">Years of Professional Driving Experience</label>
                        <select required className="w-full bg-transparent border-b border-white/20 focus:border-lush-yellow text-white py-2 outline-none transition-colors appearance-none">
                          <option value="" className="bg-charcoal text-muted-1">Select range</option>
                          <option value="1-3" className="bg-charcoal">1 - 3 Years</option>
                          <option value="3-5" className="bg-charcoal">3 - 5 Years</option>
                          <option value="5+" className="bg-charcoal">5+ Years</option>
                        </select>
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting || success}
                        className="py-4 px-8 border border-white/30 text-lush-yellow text-sm tracking-widest uppercase hover:border-lush-yellow transition-colors mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Submitting...' : success ? 'Application Received' : 'Apply to the Academy'}
                      </button>
                   </form>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
