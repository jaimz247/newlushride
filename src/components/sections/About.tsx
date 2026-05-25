import { motion } from 'motion/react';
import FadeImage from '../ui/FadeImage';

export default function About() {
  return (
    <section id="about" className="bg-theme transition-colors duration-500 py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm tracking-widest uppercase text-lush-yellow mb-4">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-display mb-8 text-white leading-tight">
              Redefining Transportation <br className="hidden md:block"/> in Lagos.
            </h3>
            <p className="text-lg text-muted-2 font-light leading-relaxed mb-6">
              For too long, discerning executives and elite travelers in Lagos have been forced to choose between the inconvenience of self-managed drivers and the unpredictable quality of mainstream ride-hailing applications.
            </p>
            <p className="text-lg text-muted-2 font-light leading-relaxed">
              LushRide was established to bridge this gap. We provide an oasis of calm, safety, and uncompromising quality in the heart of Africa's most dynamic metropolis. This is not just a ride; it is a meticulously managed mobility experience.
            </p>
          </motion.div>

          <motion.div 
            className="w-full aspect-square md:aspect-[4/3] bg-[#0A0A0A] rounded-sm relative flex items-center justify-center p-8 group overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FadeImage 
               src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" 
               alt="Executive Class"
               wrapperClassName="absolute inset-0 z-0"
               className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700 ease-in-out mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/80 to-transparent z-10" />
            <div className="relative z-20 text-center max-w-sm">
              <span className="font-display text-4xl text-lush-yellow opacity-80 block mb-6">"</span>
              <p className="text-xl md:text-2xl font-display text-white leading-relaxed italic text-shadow-sm">
                A sanctuary in motion for those who understand the value of their time and peace of mind.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
