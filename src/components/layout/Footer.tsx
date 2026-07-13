import { Logo } from "../ui/Logo";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Lock, FileText, Scale, Printer, Shield, Check, FileSignature } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'terms' | 'privacy' | 'legal'>('terms');

  const openLegalModal = (tab: 'terms' | 'privacy' | 'legal') => {
    setActiveLegalTab(tab);
    setIsLegalModalOpen(true);
  };

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
            <button 
              onClick={() => openLegalModal('terms')} 
              className="text-xs font-light text-muted-1 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            >
              Terms
            </button>
            <button 
              onClick={() => openLegalModal('privacy')} 
              className="text-xs font-light text-muted-1 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => openLegalModal('legal')} 
              className="text-xs font-light text-muted-1 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            >
              Legal Notice
            </button>
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

        {isLegalModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setIsLegalModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
          >
            <motion.div 
              initial={{ scale: 0.96, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setIsLegalModalOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-lush-yellow rounded-full p-1 z-10"
                aria-label="Close legal modal"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-10 flex-1">
                {/* Header Info */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-lush-yellow/10 rounded-full flex items-center justify-center text-lush-yellow shrink-0">
                    <Scale size={22} />
                  </div>
                  <div>
                    <h3 id="legal-modal-title" className="text-xl md:text-2xl font-display text-white">LushRide Legal &amp; Compliance Portal</h3>
                    <p className="text-xs text-lush-yellow uppercase tracking-widest mt-0.5">Corporate Governance &amp; Data Safeguards</p>
                  </div>
                </div>

                {/* Tabs Controller */}
                <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-6">
                  <button 
                    onClick={() => setActiveLegalTab('terms')}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 cursor-pointer ${
                      activeLegalTab === 'terms' 
                        ? 'bg-lush-yellow text-black' 
                        : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <FileSignature size={12} /> Terms of Service
                  </button>
                  <button 
                    onClick={() => setActiveLegalTab('privacy')}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 cursor-pointer ${
                      activeLegalTab === 'privacy' 
                        ? 'bg-lush-yellow text-black' 
                        : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Shield size={12} /> Privacy Policy
                  </button>
                  <button 
                    onClick={() => setActiveLegalTab('legal')}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2 cursor-pointer ${
                      activeLegalTab === 'legal' 
                        ? 'bg-lush-yellow text-black' 
                        : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Scale size={12} /> Legal Notice
                  </button>
                  
                  <button
                    onClick={() => {
                      window.print();
                      toast.info("Opening system print menu...");
                    }}
                    className="ml-auto px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
                    title="Print documentation"
                  >
                    <Printer size={12} /> Print
                  </button>
                </div>

                {/* Content Sections */}
                <div className="text-left text-sm font-light text-muted-1 space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  
                  {activeLegalTab === 'terms' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-l-2 border-lush-yellow pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">1. Agreement to Terms</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          Welcome to LushRide. These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client", "Passenger") and LushRide Ltd ("LushRide", "we", "our"), registered in the Federal Republic of Nigeria. By submitting a reservation, booking custom executive transport, or contracting armed security escorts, you accept and agree to be bound by these Terms without limitation.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">2. Vehicle Allocations and Fleet Substitution</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          LushRide operates an ultra-premium, heavily vetted fleet (including customized SUVs, luxury sedans, and armored B6/B7 escorts). While we make every mechanical and operational effort to dispatch the exact model selected during booking, we reserve the absolute right to substitute vehicle assets with an equivalent or superior tier of luxury vehicle in the event of scheduled maintenance, immediate tactical sweeps, or airport customs security requirements.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">3. Chauffeur Standards and Operational Directives</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          All LushRide chauffeurs are professional, rigorously screened, and undergo extensive tactical defensive driving and executive hospitality training. Our chauffeurs are bound by strict corporate Non-Disclosure Agreements (NDAs). Under no circumstances is any client or passenger permitted to operate a LushRide fleet vehicle. Chauffeurs are authorized to refuse transportation or alter routes immediately if any passenger engages in unlawful activity, acts in a hostile manner, or breaches safety protocols.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">4. Detailed Cancellation &amp; Escort Mobilization Rules</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          We recognize that executive calendars undergo frequent shifts. To ensure optimal fleet scheduling, the following cancellation policy is strictly enforced:
                        </p>
                        <ul className="mt-2 space-y-1.5 text-xs">
                          <li className="flex items-start gap-2 text-white/90">
                            <span className="text-lush-yellow font-bold select-none">•</span>
                            <span><strong>Standard Bookings (Over 24 Hours):</strong> Complete, penalty-free cancellation with a 100% refund.</span>
                          </li>
                          <li className="flex items-start gap-2 text-white/90">
                            <span className="text-lush-yellow font-bold select-none">•</span>
                            <span><strong>Standard Bookings (12 to 24 Hours):</strong> Cancellation is subject to a 50% reservation hold fee.</span>
                          </li>
                          <li className="flex items-start gap-2 text-white/90">
                            <span className="text-lush-yellow font-bold select-none">•</span>
                            <span><strong>Standard Bookings (Under 12 Hours / No-Show):</strong> Cancellation or failure to show is subject to a 100% booking charge.</span>
                          </li>
                          <li className="flex items-start gap-2 text-white/90">
                            <span className="text-lush-yellow font-bold select-none">•</span>
                            <span><strong>Armed Escort &amp; MOPOL Detachments:</strong> Due to immediate police mobilization, state clearance fees, and armed personnel scheduling, any armed security escort bookings are 100% non-refundable within 48 hours of scheduled transit.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">5. Airport Waiting Times &amp; Flight Monitoring</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          LushRide uses real-time satellite telemetry to track client flights (including commercial arrivals at Lagos MMIA and Abuja Nnamdi Azikiwe, as well as private aviation terminals). Airport transfers include 60 minutes of complimentary waiting time from actual flight touchdown. Non-airport executive pickups include 15 minutes of complimentary waiting. Standard hourly overtime rates will apply after these margins expire.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">6. Client Liability, Indemnity and Force Majeure</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          LushRide strives for immaculate, uncompromised punctuality. However, we are not liable for delayed arrivals, missed flights, or itinerary failures caused by events beyond our direct operational control (Force Majeure). This includes extreme traffic bottlenecks, sudden fuel scarcity, hazardous weather, civil unrest, or state-directed police barriers. The client agrees to indemnify and hold LushRide harmless against any damage to vehicle interiors caused by willful misconduct, and agrees that LushRide's maximum liability is strictly limited to the base booking fare.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeLegalTab === 'privacy' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-l-2 border-lush-yellow pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">1. Commitment to Executive Privacy</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          LushRide serves high-profile corporate leaders, diplomatic representatives, and private individuals who require absolute discretion. We handle your identity, movement logs, and security directives with premium confidentiality, fully aligned with the Nigeria Data Protection Regulation (NDPR) and global privacy acts.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">2. Data Acquisition Profiles</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          We collect only the essential details necessary to orchestrate a highly secure, luxury trip:
                        </p>
                        <ul className="mt-2 space-y-1 text-xs">
                          <li className="flex items-center gap-2"><Check size={12} className="text-lush-yellow" /> Passenger names, phone numbers, and encrypted email credentials.</li>
                          <li className="flex items-center gap-2"><Check size={12} className="text-lush-yellow" /> Detailed travel itineraries, flight coordinates, and landing targets.</li>
                          <li className="flex items-center gap-2"><Check size={12} className="text-lush-yellow" /> Corporate billing entities, tax certificates, and clearance documentation.</li>
                          <li className="flex items-center gap-2"><Check size={12} className="text-lush-yellow" /> Advance security preferences, dietary options, and escort authorization codes.</li>
                        </ul>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">3. Technical Security &amp; Encryption Protocols</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          Your customer record and booking history are shielded by enterprise-grade AES-256 encryption. Dispatch databases are strictly segregated, utilizing cloud-hosted security parameters. Chauffeurs are explicitly forbidden from storing passenger telephone numbers or destination details on personal devices.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">4. Automated Data Purge Cycles</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          To minimize any long-term physical or digital risk footprint:
                        </p>
                        <ul className="mt-2 space-y-1.5 text-xs">
                          <li className="flex items-start gap-2 text-white/90">
                            <span className="text-lush-yellow font-bold select-none">•</span>
                            <span><strong>Trip Telemetry logs:</strong> Specific GPS tracking, route timing records, and coordinates are archived 30 days post-trip.</span>
                          </li>
                          <li className="flex items-start gap-2 text-white/90">
                            <span className="text-lush-yellow font-bold select-none">•</span>
                            <span><strong>Itinerary Purging:</strong> Historical flight manifests, custom security logs, and escort dispatch files are permanently and securely deleted from all cloud systems after 180 days, except where corporate accounts request persistent logging for annual audits.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">5. Armed Escort Disclosures &amp; State Security Cooperation</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          When you request armed escorts or Mobile Police (MOPOL) support, we cooperate fully with registered law enforcement entities to register legal weapons transport manifests and route clearances. Your movement data is never sold, leased, or disclosed to third-party marketing brokers.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">6. Customer Sovereignty and Legal Rights</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          Under the NDPR, passengers have full legal authority to inspect, rectify, restrict, or request the immediate deletion of their personal profiles ("Right to be Forgotten"). Any compliance requests can be directly registered with our legal panel at <a href="mailto:info@lushride.com" className="text-lush-yellow hover:underline">info@lushride.com</a>.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeLegalTab === 'legal' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-l-2 border-lush-yellow pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">1. Entity Incorporation and Licensing</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          LushRide and LushRide Worldwide are commercial trade names of LushRide Ltd, a private limited liability entity registered with the Corporate Affairs Commission (CAC) of the Federal Republic of Nigeria. Our operational activities conform to all municipal transport licenses, federal safety regulations, and corporate taxes.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">2. Armed Patrol and Security Regulation</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          All armed escorts, VIP protection agents, and Mobile Police (MOPOL) detachments provided by LushRide are sourced, verified, and legally deployed in accordance with the regulatory mandates of the Nigeria Police Force and the Ministry of Police Affairs. All weapons and support personnel carry certified official duty sheets and travel authorizations.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">3. Intellectual Property Rights</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          All visual layouts, trademarked logos, typography, bespoke design matrices, digital booking engines, and original media assets hosted on this application are the exclusive intellectual property of LushRide Ltd. Any unauthorized copying, distribution, or reproduction of these assets is subject to immediate legal prosecution.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">4. Insurance Protection Declarations</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          Every vehicle in the active LushRide showroom, including armored executive vehicles and security escorts, is protected by high-value commercial vehicle and passenger liability underwriting with premium coverage levels managed by major, licensed Nigerian insurance organizations.
                        </p>
                      </div>

                      <div className="border-l-2 border-white/20 pl-4 py-1">
                        <h4 className="text-white font-medium uppercase text-xs tracking-wider">5. Legal Jurisdiction and Choice of Law</h4>
                        <p className="mt-2 text-xs leading-relaxed">
                          These compliance policies, terms, and regulatory disclosures are governed exclusively by and must be interpreted in alignment with the laws of the Federal Republic of Nigeria. Any legal disputes or litigation arising out of our operations will be handled exclusively by the state or federal courts situated in Lagos, Nigeria.
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Footer controls */}
              <div className="border-t border-white/10 p-6 flex items-center justify-between bg-black/40">
                <p className="text-[10px] uppercase tracking-wider text-muted-1">
                  Last updated: June 2026 | LushRide Legal Panel
                </p>
                <button
                  onClick={() => setIsLegalModalOpen(false)}
                  className="px-6 py-2.5 bg-white hover:bg-lush-yellow text-black font-bold uppercase text-[10px] tracking-widest rounded transition-all cursor-pointer shadow-md hover:shadow-lush-yellow/10"
                >
                  Acknowledge &amp; Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
