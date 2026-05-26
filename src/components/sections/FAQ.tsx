import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do I book a ride with LushRide?",
    answer: "You can book directly through our mobile application, available on iOS and Android. Alternatively, you can use the booking form on this website or contact our 24/7 concierge directly via WhatsApp for VIP arrangements."
  },
  {
    question: "What is your cancellation policy?",
    answer: "For standard executive rides, cancellations made up to 4 hours before the scheduled time are fully refundable. For Royal category bookings or special multi-fleet requests, a 24-hour notice is required."
  },
  {
    question: "Are your chauffeurs specially trained?",
    answer: "Yes, every LushRide chauffeur graduates from our proprietary Lush Academy, receiving rigorous training in defensive driving, evasive maneuvers, and premium hospitality standards."
  },
  {
    question: "Can I request armored vehicles?",
    answer: "Yes, our Royal tier includes options for B6-level armored vehicles depending on availability. Please mention this requirement during your booking inquiry for discrete arrangements."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-32 bg-theme transition-colors duration-500">
      <Helmet>
        <title>FAQ | LushRide</title>
        <meta name="description" content="Explore the FAQ section of LushRide's premium chauffeur services." />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-lush-yellow uppercase tracking-widest text-xs font-semibold mb-4 block">Information</span>
          <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-[#0A0A0A]">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-white font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`text-lush-yellow transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-muted-1 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
