import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Experience() {
  return (
    <section id="services" className="bg-theme transition-colors duration-500 py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight mb-8">
              Provide Luxury Transport and Most Comfortable Experience
            </h2>
            <div className="inline-block border border-white/20 px-6 py-3 rounded-full">
              <span className="text-xs uppercase tracking-widest font-medium text-lush-yellow">Who We Are</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <p className="text-lg text-muted-2 font-light leading-relaxed mb-12">
              LushRide, based in Lagos and premiering the elite circuit, guarantees top-tier chauffeur services engineered for the discerning traveler. 
              Be it executive transit, airport protocols, or distinct private galas, our custom itinerary planning ensures every movement across Nigeria's economic capital is draped in prestige.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <a href="#book" className="flex items-center gap-3 group">
                <ArrowRight size={16} className="text-lush-yellow group-hover:translate-x-2 transition-transform" />
                <span className="text-base text-white hover:text-lush-yellow font-medium transition-colors">Airport Transfer</span>
              </a>
              <a href="#book" className="flex items-center gap-3 group">
                <ArrowRight size={16} className="text-lush-yellow group-hover:translate-x-2 transition-transform" />
                <span className="text-base text-white hover:text-lush-yellow font-medium transition-colors">City to City Ride</span>
              </a>
              <a href="#book" className="flex items-center gap-3 group">
                <ArrowRight size={16} className="text-lush-yellow group-hover:translate-x-2 transition-transform" />
                <span className="text-base text-white hover:text-lush-yellow font-medium transition-colors">Hourly Hire</span>
              </a>
              <a href="#book" className="flex items-center gap-3 group">
                <ArrowRight size={16} className="text-lush-yellow group-hover:translate-x-2 transition-transform" />
                <span className="text-base text-white hover:text-lush-yellow font-medium transition-colors">Chauffeur Service</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
