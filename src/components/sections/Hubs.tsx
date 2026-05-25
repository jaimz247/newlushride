import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import FadeImage from '../ui/FadeImage';

const hubs = [
  {
    name: 'Ikoyi',
    desc: 'The center of corporate elegance & luxury living.',
    image: 'https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Victoria Island',
    desc: 'The vibrant heart of commerce & fine dining.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lekki',
    desc: 'The dynamic pulse of lifestyle & contemporary culture.',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
  }
];

export default function Hubs() {
  return (
    <section id="hubs" className="bg-theme transition-colors duration-500 py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-white leading-tight">
            Lagos, Reimagined
          </h2>
          <p className="text-lg text-muted-2 font-light leading-relaxed max-w-2xl mx-auto">
            From the corporate boardrooms of Victoria Island to the opulent estates of Ikoyi, experience the city's finest hubs with absolute discretion and peerless comfort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hubs.map((hub, index) => (
             <motion.div 
                key={hub.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative h-[450px] overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                <FadeImage 
                  src={hub.image} 
                  alt={hub.name}
                  wrapperClassName="absolute inset-0 z-0"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="font-display text-3xl text-white mb-2">{hub.name}</h3>
                  <p className="text-sm font-light text-white/80 line-clamp-2">{hub.desc}</p>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
