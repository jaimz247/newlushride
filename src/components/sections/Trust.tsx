import { Shield, EyeOff, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "Comprehensive Protection",
    description: "Every ride operates under top-tier commercial insurance with comprehensive liability coverage, ensuring absolute peace of mind for high-net-worth individuals and corporate executives."
  },
  {
    icon: EyeOff,
    title: "Guaranteed Discretion",
    description: "Your business remains yours. All LushRide Pilots are bound by strict non-disclosure agreements. Vehicles feature privacy options to create a secure mobile sanctuary."
  },
  {
    icon: MapPin,
    title: "Advanced Over-Watch",
    description: "Real-time command center tracking and integrated SOS features ensure every journey is monitored by our dedicated security team without ever feeling intrusive."
  }
];

export default function Trust() {
  return (
    <section className="bg-theme transition-colors duration-500 py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">Trust &amp; Discretion.</h2>
          <div className="w-16 h-[1px] bg-lush-yellow/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {TRUST_FEATURES.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-8 text-lush-yellow">
                <feature.icon strokeWidth={1} size={28} />
              </div>
              <h3 className="text-xl font-display text-white mb-4">{feature.title}</h3>
              <p className="text-muted-1 font-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
