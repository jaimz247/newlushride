import { motion } from 'motion/react';

export default function Accolades() {
  return (
    <section className="bg-theme transition-colors duration-500 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="md:w-1/3"
           >
             <h3 className="text-xl font-display text-white mb-2 tracking-tight">Trusted Global Standards</h3>
             <p className="text-sm text-muted-1 font-light leading-relaxed max-w-sm mx-auto md:mx-0">
               Certified for excellence, safety, and operational discretion in executive transport across West Africa.
             </p>
           </motion.div>
           <div className="md:w-2/3 flex flex-wrap items-center justify-center md:justify-end gap-12 lg:gap-16 opacity-60 grayscale hover:opacity-100 transition-opacity duration-700">
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="flex flex-col items-center gap-3 group"
             >
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-lush-yellow transition-colors duration-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               <span className="text-[10px] tracking-widest uppercase font-semibold text-white/80">ISO 9001</span>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-col items-center gap-3 group"
             >
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-lush-yellow transition-colors duration-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
               <span className="text-[10px] tracking-widest uppercase font-semibold text-white/80">Certified</span>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="flex flex-col items-center gap-3 group"
             >
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-lush-yellow transition-colors duration-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
               <span className="text-[10px] tracking-widest uppercase font-semibold text-white/80">Secure</span>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="flex flex-col items-center gap-3 group"
             >
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-lush-yellow transition-colors duration-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               <span className="text-[10px] tracking-widest uppercase font-semibold text-white/80">Five Star</span>
             </motion.div>

           </div>
        </div>
      </div>
    </section>
  );
}
