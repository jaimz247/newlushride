import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import FadeImage from '../ui/FadeImage';
import { ArrowRight, BookOpen, X } from 'lucide-react';


const articles = [

  {
    id: 1,
    title: 'Navigating Victoria Island: A Guide to the Finest Dining',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=60&fm=webp',
    date: 'May 12, 2026',
    readTime: '4 min read',
    content: (
      <>
        <p>Victoria Island stands as the undisputed heart of Lagos' opulent dining scene. From the moment you arrive, the atmosphere is electric yet refined, blending contemporary African cuisine with international gastronomic excellence.</p>
        <p>For those seeking the ultimate sensory experience, our chauffeurs will seamlessly navigate the bustling streets, delivering you to the doorstep of establishments like Noir, RSVP, or the exclusive RSVP. These venues not only boast extraordinary menus but also provide an ambiance that perfectly complements your executive lifestyle.</p>
        <p>A true connoisseur's journey in Victoria Island involves more than just the food; it's about the entire experience. Arriving in a pristine LushRide vehicle sets the tone for an evening of sophistication. The transition from your private oasis to the vibrant energy of the restaurant is swift and effortless.</p>
        <p>As you explore the diverse culinary landscape, remember that timing is everything in Lagos. Our advanced routing systems and experienced drivers ensure you never miss a reservation, allowing you to focus entirely on the exceptional flavors and company around you.</p>
        <p>Whether it is a power lunch to seal a crucial deal or an intimate dinner under the stars, Victoria Island's dining scene is prepared to exceed your every expectation. Let LushRide be the invisible thread that connects these moments of culinary brilliance, ensuring your journey is as memorable as the destination.</p>
        <p>Our commitment to your comfort extends beyond the ride. We partner with select venues to ensure your arrival is anticipated and met with the same level of discretion and service you have come to expect from us. Experience Victoria Island dining, redefined.</p>
      </>
    )
  },
  {
    id: 2,
    title: 'The Rise of Executive Armored Transport in Lagos',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=60&fm=webp',
    date: 'Apr 28, 2026',
    readTime: '6 min read',
    content: (
      <>
        <p>In the swiftly evolving corporate landscape of Lagos, security is no longer an afterthought; it is a primary operational requirement. The demand for executive armored transport has seen a significant surge as multinational executives and high-net-worth individuals seek unparalleled peace of mind.</p>
        <p>LushRide has responded to this growing need by integrating state-of-the-art B6-level armored vehicles into our Royal tier. These vehicles offer robust protection without compromising the luxurious interior environment our clients expect.</p>
        <p>The technology behind these vehicles is a marvel of modern engineering. They are designed to withstand significant ballistic impact while maintaining the maneuverability needed for urban environments. The integration is so seamless that, from the outside, they often appear as standard luxury sedans or SUVs.</p>
        <p>Beyond the hardware, the true differentiator lies in the personnel. Our chauffeurs assigned to these specialized units undergo intensive evasive driving courses, threat assessment training, and are constantly updated on security protocols.</p>
        <p>The rise of this service tier reflects a maturation in how corporate security is handled in West Africa. It is a proactive approach, ensuring that business continuity and personal safety are never compromised, regardless of the operating environment.</p>
        <p>Choosing an armored option with LushRide means investing in an invisible fortress, allowing our clients to navigate the city's dynamic environment with absolute confidence.</p>
      </>
    )
  },
  {
    id: 3,
    title: 'Seamless Airport Transfers: The MMIA Protocol',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=60&fm=webp',
    date: 'Apr 15, 2026',
    readTime: '5 min read',
    content: (
      <>
        <p>Navigating Murtala Muhammed International Airport (MMIA) can be a complex endeavor, particularly for first-time visitors or executives operating on tight schedules. The 'MMIA Protocol' is LushRide's dedicated response to this challenge.</p>
        <p>Our airport transfer service is designed to transform the often-stressful arrival and departure process into a fluid, elegant experience. From the runway to your residence, every detail is meticulously planned.</p>
        <p>Upon your arrival, our concierges monitor your flight status in real-time, adjusting pickup times to account for early arrivals or unexpected delays. You will be greeted directly at the arrivals terminal by a sharply dressed LushRide representative.</p>
        <p>We understand that after a long international flight, comfort is paramount. Your vehicle will be pre-cooled, stocked with preferred refreshments, and ready to depart immediately. In our Royal tier, clients can even enjoy rapid Wi-Fi to reconnect before reaching their destination.</p>
        <p>For departures, we employ advanced traffic modeling to determine the optimal departure time from your location, guaranteeing you arrive at the terminal with ample time for security and boarding, eliminating the anxiety of a rushed check-in.</p>
        <p>The MMIA Protocol is more than a ride; it is a commitment to ensuring your first and last impressions of Lagos are characterized by efficiency, luxury, and unyielding professionalism.</p>
      </>
    )
  }
];

const ArticleModal = ({ selectedArticle, onClose }: { selectedArticle: typeof articles[0], onClose: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#050505] border border-white/10 rounded-2xl w-full max-w-4xl h-[90vh] relative shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-title"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-black/50 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all focus:outline-none focus:ring-2 focus:ring-lush-yellow"
          aria-label="Close article"
        >
          <X size={20} />
        </button>

        {/* Progress Bar Container */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-40">
          <motion.div 
            className="h-full bg-lush-yellow origin-left"
            style={{ scaleX }}
          />
        </div>

        {/* Scrollable Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="relative h-64 md:h-96 w-full">
            <FadeImage 
              src={selectedArticle.image} 
              alt={selectedArticle.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
          </div>
          
          <div className="max-w-2xl mx-auto px-6 py-12 -mt-24 relative z-10">
            <div className="flex items-center gap-4 text-xs text-lush-yellow mb-6 font-mono tracking-widest uppercase">
              <span>{selectedArticle.category}</span>
              <span className="w-1 h-1 rounded-full bg-lush-yellow/50" />
              <span>{selectedArticle.date}</span>
              <span className="w-1 h-1 rounded-full bg-lush-yellow/50" />
              <span>{selectedArticle.readTime}</span>
            </div>
            
            <h2 id="article-title" className="text-3xl md:text-5xl font-display text-white mb-10 leading-tight">
              {selectedArticle.title}
            </h2>
            
            <div className="prose prose-invert prose-lg prose-p:text-muted-2 prose-p:font-light prose-p:leading-relaxed space-y-8">
              {selectedArticle.content}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Insights() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Insights & Journal | LushRide</title>
        <meta name="description" content="Explore the Insights section of LushRide's premium chauffeur services in Lagos." />
      </Helmet>
      <section id="insights" className="py-32 bg-theme transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-white leading-tight">
                Lush Insights
              </h2>
              <p className="text-lg text-muted-2 font-light leading-relaxed max-w-xl">
                Curated perspectives on luxury travel, executive security, and navigating the dynamic landscape of Lagos.
              </p>
            </div>
            <button className="flex items-center text-lush-yellow text-sm font-semibold tracking-widest uppercase hover:text-white transition-colors group">
              <BookOpen size={18} className="mr-3 group-hover:scale-110 transition-transform" />
              View All Articles
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden h-[400px] animate-pulse">
                  <div className="w-full h-[200px] bg-white/5" />
                  <div className="p-6 h-[200px] flex flex-col">
                    <div className="w-1/3 h-3 bg-white/5 mb-4 rounded" />
                    <div className="w-full h-6 bg-white/5 mb-2 rounded" />
                    <div className="w-2/3 h-6 bg-white/5 mb-8 rounded" />
                    <div className="w-1/4 h-3 bg-white/5 mt-auto rounded" />
                  </div>
                </div>
              ))
            ) : (
              articles.map((article, i) => (
                <motion.article 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group cursor-pointer flex flex-col h-full bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
                  role="button"
                  aria-label={`Read article: ${article.title}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <FadeImage 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-white border border-white/10">
                      {article.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-white/40 mb-4 font-mono">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-display text-white mb-4 group-hover:text-lush-yellow transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <div className="mt-auto pt-6 flex items-center text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">
                      Read Article <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            selectedArticle={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
