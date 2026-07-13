import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Calendar, CreditCard, ShieldCheck, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateFAQSchema } from '../../lib/schema';

const faqs = [
  {
    category: 'Booking',
    question: "How do I book a ride with LushRide?",
    answer: "Booking is exclusive to our official mobile application available on iOS and Android. To ensure absolute data security, precise scheduling, and live GPS tracking for our passengers, we do not support booking directly via the website or WhatsApp."
  },
  {
    category: 'Payments',
    question: "What is your cancellation policy?",
    answer: "Our cancellation policy is structured as follows: For scheduled bookings, a 50% charge applies to any cancellation made less than 1 hour prior to the pickup time. For on-demand bookings, a 100% charge applies to any cancellation made once a chauffeur has been assigned, or if canceled less than 5 minutes after placing the request. This industry-standard policy ensures our elite chauffeurs are fairly compensated for their dedicated time and preparation."
  },
  {
    category: 'Safety',
    question: "Are your chauffeurs specially trained?",
    answer: "Yes, every LushRide chauffeur graduates from our proprietary Lush Academy, receiving rigorous training in defensive driving, evasive maneuvers, and premium hospitality standards."
  },
  {
    category: 'Safety',
    question: "Can I request armored vehicles?",
    answer: "Yes, our Royal tier includes options for B6-level armored vehicles depending on availability. Please mention this requirement during your booking inquiry for discrete arrangements."
  },
  {
    category: 'Payments',
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and select cryptocurrencies for bespoke arrangements. For our premium subscribers, corporate invoice options are also available."
  }
];

const categories = ['All', 'Booking', 'Payments', 'Safety'];

const CategoryIcon = ({ category, className }: { category: string, className?: string }) => {
  switch (category) {
    case 'Booking': return <Calendar className={className} size={18} />;
    case 'Payments': return <CreditCard className={className} size={18} />;
    case 'Safety': return <ShieldCheck className={className} size={18} />;
    default: return null;
  }
};

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [faqList, setFaqList] = useState<typeof faqs>(faqs);

  useEffect(() => {
    fetch('/api/site-config')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error("Invalid response or content type");
      })
      .then(data => {
        if (data && data.faqs) {
          setFaqList(data.faqs);
        }
      })
      .catch(err => {
        console.log("Using static local fallback FAQs config", err);
        const cached = localStorage.getItem("lush_site_config_fallback");
        if (cached) {
          try {
            const data = JSON.parse(cached);
            if (data && data.faqs) {
              setFaqList(data.faqs);
            }
          } catch (e) {}
        }
      });
  }, []);

  const schemaData = generateFAQSchema(faqList, "https://lushride.com/#faq");

  const filteredFaqs = useMemo(() => {
    return faqList.filter(faq => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, faqList]);

  return (
    <section id="faq" className="py-32 bg-theme transition-colors duration-500">
      <Helmet>
        <title>FAQ | LushRide</title>
        <meta name="description" content="Explore the FAQ section of LushRide's premium chauffeur services." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-lush-yellow uppercase tracking-widest text-xs font-semibold mb-4 block">Information</span>
          <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Frequently Asked Questions</h2>
        </div>
        
        <div className="mb-10 flex flex-col md:flex-row gap-6 justify-between items-center bg-[#0A0A0A] p-4 rounded-xl border border-white/10">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbars">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setOpenQuestion(null); }}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-lush-yellow text-black' 
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenQuestion(null); }}
              className="w-full bg-black border border-white/20 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-lush-yellow focus:outline-none transition-colors"
              aria-label="Search frequently asked questions"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openQuestion === faq.question;
              const relatedFaqs = faqList.filter(f => f.question !== faq.question && f.category === faq.category).slice(0, 2);
              if (relatedFaqs.length < 2) {
                const more = faqList.filter(f => f.question !== faq.question && !relatedFaqs.includes(f)).slice(0, 2 - relatedFaqs.length);
                relatedFaqs.push(...more);
              }

              return (
              <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-[#0A0A0A]">
                <button
                  onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <CategoryIcon category={faq.category} className="text-lush-yellow/60" />
                    <span className="text-white font-medium">{faq.question}</span>
                  </div>
                  <ChevronDown 
                    className={`text-lush-yellow transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    size={20} 
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="text-muted-1 font-light leading-relaxed mb-6">
                          {faq.answer}
                        </div>
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(`Q: ${faq.question}\nA: ${faq.answer}`);
                              toast.success('Question and answer copied to clipboard!');
                            }}
                            className="flex items-center gap-2 text-[10px] uppercase font-semibold text-white/50 hover:text-lush-yellow transition-colors"
                          >
                            <Share2 size={12} /> Share this Answer
                          </button>
                        </div>
                        {relatedFaqs.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-white/5">
                            <span className="text-[10px] uppercase tracking-widest text-lush-yellow font-semibold block mb-3">Related Questions</span>
                            <div className="space-y-2">
                              {relatedFaqs.map((relFaq, idx) => (
                                <button 
                                  key={idx}
                                  onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory('All');
                                    setOpenQuestion(relFaq.question);
                                    setTimeout(() => {
                                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                  }}
                                  className="block text-left text-xs text-white/60 hover:text-white transition-colors"
                                >
                                  → {relFaq.question}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )})
          ) : (
             <div className="text-center py-12 text-white/50 bg-[#0A0A0A] rounded-xl border border-white/10">
               <p>No questions found for your search.</p>
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
