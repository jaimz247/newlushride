import { useState, useEffect } from 'react';
import { Logo } from "../ui/Logo";
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Circle } from 'lucide-react';
import FadeImage from '../ui/FadeImage';

import { useI18n } from '../../lib/i18n';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const [theme, setTheme] = useState<'midnight' | 'obsidian'>('midnight');

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['about', 'services', 'fleet', 'hubs', 'partner'];
    const sectionElements = sections.map(id => document.getElementById(id));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    sectionElements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const doc = document.documentElement;
    if (theme === 'obsidian') {
      doc.setAttribute('data-theme', 'obsidian');
    } else {
      doc.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'midnight' ? 'obsidian' : 'midnight');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-white/5 ${
        isScrolled ? 'bg-theme/95 backdrop-blur-md py-3' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer text-white hover:text-lush-yellow transition-colors">
            <Logo className="w-20 md:w-28 object-contain" />
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'about', label: t('nav.about') },
              { id: 'services', label: t('nav.services') },
              { id: 'fleet', label: t('nav.fleet') },
              { id: 'hubs', label: t('nav.hubs') },
              { id: 'partner', label: t('nav.partner') },
            ].map(link => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                className={`text-[10px] uppercase tracking-widest font-medium transition-colors ${activeSection === link.id ? 'text-lush-yellow' : 'text-white/60 hover:text-white'}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action & Menu Toggle */}
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium">
              <button onClick={() => setLang('EN')} className={`${lang === 'EN' ? 'text-white' : 'text-white/40 hover:text-white/80'} transition-colors`}>EN</button>
              <span className="text-white/20">/</span>
              <button onClick={() => setLang('FR')} className={`${lang === 'FR' ? 'text-white' : 'text-white/40 hover:text-white/80'} transition-colors`}>FR</button>
            </div>
            
            <button 
              onClick={toggleTheme}
              className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group hidden sm:flex"
              aria-label={`Switch to ${theme === 'midnight' ? 'Obsidian' : 'Midnight'} mode`}
            >
              <span className="text-[10px] uppercase tracking-widest mr-1">
                {theme === 'midnight' ? 'Midnight' : 'Obsidian'}
              </span>
              {theme === 'midnight' ? <Moon size={16} className="text-lush-yellow group-hover:scale-110 transition-transform" /> : <Circle fill="currentColor" size={14} className="group-hover:scale-110 transition-transform" />}
            </button>

            <a href="#book" className="hidden md:inline-flex px-6 py-3 bg-transparent border border-white/20 text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-charcoal transition-all">
              {t('nav.quote')}
            </a>
            <button 
              className="text-white p-2 hover:text-lush-yellow transition-colors flex items-center gap-3 group"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="hidden md:block text-[11px] font-medium tracking-[0.2em] uppercase">Menu</span>
              <Menu size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.9}
            style={{ touchAction: 'none' }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > window.innerWidth / 3 || velocity.x > 300) {
                setMobileMenuOpen(false);
              }
            }}
            className="fixed inset-0 z-[100] bg-theme/90 backdrop-blur-xl md:backdrop-blur-none transition-colors duration-500 flex flex-col md:flex-row"
          >
            {/* Left Decorative Side (Hidden on mobile) */}
            <div className="hidden md:flex flex-1 relative bg-black border-r border-white/5">
              <FadeImage 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=60&fm=webp" 
                alt="Menu Decor" 
                wrapperClassName="absolute inset-0"
                className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
              <div className="relative z-30 p-12 mt-auto">
                <Logo className="w-24 md:w-36 object-contain mb-6" />
                <p className="text-muted-1 font-light max-w-sm text-sm">
                  Lagos' finest premium chauffeur service. Absolute comfort, uncompromising privacy, and precision scheduling for the elite.
                </p>
              </div>
            </div>

            {/* Right Menu Side */}
            <div className="flex-1 flex flex-col pt-24 px-8 md:px-24 pb-12 overflow-y-auto w-full md:w-auto">
              <div className="flex justify-between items-center mb-16 md:absolute md:top-8 md:right-12 z-20">
                 <span className="md:hidden text-white font-display text-xl">LushRide.</span>
                 <button 
                  className="text-white p-2 hover:text-lush-yellow transition-colors flex items-center gap-3 group ml-auto"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="hidden md:block text-[11px] font-medium tracking-[0.2em] uppercase">Close</span>
                  <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
             
              <div className="flex flex-col gap-6 md:gap-8 mt-auto md:mt-24">
                {[
                  { num: '01', title: t('nav.about'), id: 'about' },
                  { num: '02', title: t('nav.services'), id: 'services' },
                  { num: '03', title: t('nav.fleet'), id: 'fleet' },
                  { num: '04', title: t('nav.hubs'), id: 'hubs' },
                  { num: '05', title: t('nav.partner'), id: 'partner' },
                ].map((item, index) => (
                  <motion.a 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={() => setMobileMenuOpen(false)} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-4xl md:text-6xl font-display transition-colors tracking-tight flex items-center group ${activeSection === item.id ? 'text-lush-yellow' : 'text-white hover:text-lush-yellow'}`}
                  >
                    <span className={`text-sm font-light mr-6 w-8 hidden md:block ${activeSection === item.id ? 'text-lush-yellow/50' : 'text-muted-1'}`}>{item.num}</span> {item.title}
                  </motion.a>
                ))}
                
                <motion.a 
                  href="#book" 
                  onClick={() => setMobileMenuOpen(false)} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 md:mt-12 inline-block px-12 py-4 border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-charcoal transition-all w-fit"
                >
                  Request a Quote
                </motion.a>
              </div>

              <div className="mt-auto pt-16 grid grid-cols-2 gap-8 md:hidden">
                 <div>
                    <h4 className="text-[10px] font-display text-muted-1 uppercase tracking-widest mb-3">Contact</h4>
                    <p className="text-xs text-white mb-1">Info@lushride.com</p>
                    <p className="text-xs text-white">+234 703 740 4784</p>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
