import { Logo } from "../ui/Logo";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Lock, FileText } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#020202] pt-24 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            
            {/* Col 1: Brand */}
            <div>
              <div className="mb-6">
                <Logo className="w-28 md:w-36 object-contain" />
              </div>
              <p className="text-muted-1 font-light text-[11px] leading-relaxed max-w-[200px] mt-4 uppercase tracking-widest">
                LushRide Ltd is registered in Nigeria. Delivering unparalleled executive transport across major commercial hubs.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <button 
                  onClick={() => setIsSecurityModalOpen(true)}
                  className="flex flex-col items-start pt-2 border-t border-white/10 w-[200px] text-left hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-lush-yellow rounded-sm"
                  aria-label="View Security and Privacy Information"
                >
                   <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-1.5 flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lush-yellow text-opacity-80"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Security & Privacy</span>
                   <p className="text-[10px] text-muted-1 leading-snug">ISO 27001 Certified &amp; Vetted Fleet. Armed escort services available upon request.</p>
                </button>
              </div>
            </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-display text-white mb-6">Chauffeur Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Airport Transfer</a></li>
              <li><a href="#services" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Hourly Hire</a></li>
              <li><a href="#services" className="text-sm font-light text-muted-1 hover:text-white transition-colors">City to City Ride</a></li>
            </ul>
          </div>

          {/* Col 3: Hubs */}
          <div>
            <h4 className="text-sm font-display text-white mb-6">Top Hubs</h4>
            <ul className="space-y-4">
              <li><a href="#hubs" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Ikoyi</a></li>
              <li><a href="#hubs" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Victoria Island</a></li>
              <li><a href="#hubs" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Lekki Phase 1</a></li>
            </ul>
          </div>

          {/* Col 4: Business & Contact & Newsletter */}
          <div>
            <h4 className="text-sm font-display text-white mb-6">For Businesses</h4>
             <ul className="space-y-4 mb-10">
              <li><a href="#corporate" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Corporations</a></li>
              <li><a href="#partner" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Travel Agencies</a></li>
              <li><a href="#corporate" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Events</a></li>
            </ul>
            
            <h4 className="text-sm font-display text-white mb-4 mt-8">Contact</h4>
            <ul className="space-y-3 mb-10">
               <li><a href="mailto:info@lushride.com" className="text-sm font-light text-lush-yellow hover:text-white transition-colors">info@lushride.com</a></li>
               <li><a href="mailto:sales@lushride.com" className="text-sm font-light text-lush-yellow hover:text-white transition-colors">sales@lushride.com</a></li>
               <li><a href="tel:+2347037404784" className="text-sm font-light text-lush-yellow hover:text-white transition-colors">+234 703 740 4784</a></li>
            </ul>

            <h4 className="text-sm font-display text-white mb-4 mt-8">Lush Updates</h4>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector('button');
                const input = e.currentTarget.querySelector('input');
                if (btn && input) {
                  const email = input.value;
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                    toast.error('Please enter a valid email address');
                    return;
                  }

                  const origText = btn.textContent;
                  btn.textContent = 'Subscribing...';
                  btn.disabled = true;
                  try {
                    const response = await fetch('/api/newsletter/subscribe', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email }),
                    });
                    
                    if (response.ok) {
                      toast.success('Successfully subscribed to Lush Updates!');
                      btn.textContent = 'Subscribed!';
                      btn.classList.add('text-green-400');
                      input.value = '';
                    } else {
                      toast.error('Failed to subscribe. Please try again later.');
                      btn.textContent = 'Error';
                      btn.classList.add('text-red-400');
                    }
                  } catch (error) {
                    toast.error('An unexpected error occurred.');
                    btn.textContent = 'Error';
                    btn.classList.add('text-red-400');
                  } finally {
                    setTimeout(() => {
                      if (btn) {
                        btn.textContent = origText;
                        btn.classList.remove('text-green-400', 'text-red-400');
                        btn.disabled = false;
                      }
                    }, 3000);
                  }
                }
              }}
              className="flex flex-col gap-3"
            >
              <input type="email" required placeholder="Enter your email" className="bg-[#111] border border-white/10 rounded-md px-4 py-2.5 text-xs text-white focus:outline-none focus:border-lush-yellow transition-colors placeholder:text-white/30" />
              <button type="submit" className="text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2.5 rounded-md transition-colors text-center font-medium">Subscribe</button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-1 font-light">
            © {new Date().getFullYear()} LushRide Worldwide. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/50">
            <a href="https://www.instagram.com/lushrideng/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs font-light text-muted-1 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-xs font-light text-muted-1 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-light text-muted-1 hover:text-white transition-colors">Legal Notice</a>
            <a 
              href="/admin" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-xs font-light text-muted-1 hover:text-lush-yellow transition-colors font-medium"
            >
              Staff Login
            </a>
          </div>
        </div>

      </div>
    </footer>

      <AnimatePresence>
        {isSecurityModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setIsSecurityModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="security-modal-title"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button 
                onClick={() => setIsSecurityModalOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-lush-yellow rounded-full p-1"
                aria-label="Close security modal"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-lush-yellow/10 rounded-full flex items-center justify-center text-lush-yellow">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 id="security-modal-title" className="text-2xl font-display text-white">Security & Privacy</h3>
                    <p className="text-sm text-lush-yellow uppercase tracking-widest mt-1">Uncompromising Protection</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1 text-white/40"><FileText size={20} /></div>
                    <div>
                      <h4 className="text-lg text-white mb-2 font-medium">ISO 27001 Certified</h4>
                      <p className="text-muted-1 font-light leading-relaxed text-sm">
                        LushRide maintains strict adherence to the ISO/IEC 27001 standard for information security management systems (ISMS). Your personal details, itineraries, and payment data are encrypted and handled with absolute confidentiality.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 text-white/40"><Lock size={20} /></div>
                    <div>
                      <h4 className="text-lg text-white mb-2 font-medium">Vetted Fleet & Chauffeurs</h4>
                      <p className="text-muted-1 font-light leading-relaxed text-sm">
                        Every vehicle undergoes pre and post-trip security sweeps. Our chauffeurs are rigorously vetted, trained in defensive driving, and bound by strict non-disclosure agreements to ensure your privacy during transit.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 text-white/40"><ShieldCheck size={20} /></div>
                    <div>
                      <h4 className="text-lg text-white mb-2 font-medium">Executive Escort Services</h4>
                      <p className="text-muted-1 font-light leading-relaxed text-sm">
                        For heightened security requirements, LushRide offers armed or unarmed mobile escort units and MOPOL (Mobile Police) detachments. Advance risk assessments can be arranged for high-profile movement within and outside Lagos.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
