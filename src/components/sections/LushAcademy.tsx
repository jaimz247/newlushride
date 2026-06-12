import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import FadeImage from '../ui/FadeImage';

export default function LushAcademy() {
  return (
    <section id="academy" className="bg-theme transition-colors duration-500 py-12 md:py-24">
      <Helmet>
        <title>LushAcademy | LushRide</title>
        <meta name="description" content="Explore the LushAcademy section of LushRide's premium chauffeur services." />
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Visual Side */}
        <motion.div 
          className="min-h-[500px] lg:min-h-[800px] bg-[#0A0A0A] border-white/5 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <FadeImage 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=60&fm=webp" 
            alt="Lush Academy Training" 
            wrapperClassName="absolute inset-0 z-0"
            className="w-full h-full object-cover object-center opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 to-[#050505] lg:to-[#050505]" />
        </motion.div>

        {/* Content Side */}
        <div className="flex items-center justify-center p-12 lg:p-24">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm tracking-widest uppercase text-muted-1 mb-4">Our Core Differentiator</h2>
            <h3 className="text-4xl md:text-6xl font-display mb-8 text-white">
              The Lush Academy.
            </h3>
            <p className="text-lg text-muted-2 font-light leading-relaxed mb-6">
              A premium vehicle is only half the experience. The true luxury of LushRide lies in the hands at the wheel. We do not hire drivers; we train and certify <span className="font-medium text-lush-yellow">Chauffeurs</span>.
            </p>
            <p className="text-lg text-muted-2 font-light leading-relaxed mb-12">
              Every Chauffeur endures rigorous training at The Lush Academy. From evasive driving techniques and deep local navigation expertise to white-glove etiquette and absolute discretion. They are trained to anticipate your needs and fade into the background.
            </p>
            
            <ul className="space-y-6">
              {[
                "Rigorous Background & Security Vetting",
                "Luxury Hospitality & Etiquette Training",
                "Signed Non-Disclosure Agreements for Discretion"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-white mr-4 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-muted-2 font-light text-base">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
