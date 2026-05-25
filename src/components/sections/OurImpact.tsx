import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

function Counter({ end, label, suffix = '' }: { end: number, label: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // ms
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div 
      ref={ref} 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center justify-center p-8 border border-white/5 bg-[#0A0A0A] shadow-xl rounded-xl cursor-default"
    >
      <h4 className="text-4xl md:text-5xl font-display text-lush-yellow mb-2 font-light">
        {count}{suffix}
      </h4>
      <p className="text-sm uppercase tracking-widest text-muted-1">{label}</p>
    </motion.div>
  );
}

export default function OurImpact() {
  return (
    <section className="py-24 bg-theme transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-lush-yellow uppercase tracking-widest text-xs font-semibold mb-4 block">Proven Excellence</span>
          <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Our Impact</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Counter end={500} suffix="+" label="Rides Completed" />
          <Counter end={100} suffix="%" label="On-Time Guarantee" />
          <Counter end={24} suffix="/7" label="Support Availability" />
        </div>
      </div>
    </section>
  );
}
