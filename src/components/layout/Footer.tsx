import { Logo } from "../ui/Logo";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Lock, FileText, Scale, Printer, Shield, Check, FileSignature } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'terms' | 'privacy'>('terms');

  const openLegalModal = (tab: 'terms' | 'privacy') => {
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
                <a 
                  href="/security"
                  className="flex flex-col items-start pt-2 border-t border-white/10 w-[200px] text-left hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-lush-yellow rounded-sm"
                  aria-label="View Security and Privacy Information"
                >
                   <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-1.5 flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lush-yellow text-opacity-80"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Security & Privacy</span>
                   <p className="text-[10px] text-muted-1 leading-snug">ISO 27001 Certified &amp; Vetted Fleet. Armed escort services available upon request.</p>
                </a>
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
          <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center">
            <a 
              href="/terms" 
              className="text-xs font-light text-muted-1 hover:text-white transition-colors cursor-pointer"
            >
              Terms of Use
            </a>
            <a 
              href="/terms-of-reference" 
              className="text-xs font-light text-muted-1 hover:text-white transition-colors cursor-pointer"
            >
              Terms of Reference
            </a>
            <a 
              href="/privacy" 
              className="text-xs font-light text-muted-1 hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
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
                    <FileSignature size={12} /> Terms of Use
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
                    <div className="space-y-8 animate-fadeIn">
                      <div>
                        <h2 className="text-xl font-display text-white border-b border-white/10 pb-2 mb-4">RIDER TERMS OF USE</h2>
                        <p className="text-xs text-lush-yellow uppercase tracking-widest mb-6">LUSH RIDE LIMITED | Last Updated: 13 July 2026</p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">1. INTRODUCTION</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>1.1</strong> These Rider Terms of Use (“Terms,” “Terms of Use”) constitute a legally binding agreement between you (“User,” “Rider,” “you”) and LUSHRIDE LIMITED, a company duly incorporated under the laws of the Federal Republic of Nigeria with RC number 8924511 (“Company,” “we,” “us,” “our”), governing your access to and use of the LushRide mobile application, website, and related services (collectively, the “Platform” or “Services”) as a Rider.</p>
                          <p><strong>1.2</strong> By downloading, installing, registering for, or otherwise using the Platform as a Rider, you confirm that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and any other policies referenced herein. If you do not agree, you must not use the Platform.</p>
                          <p><strong>1.3</strong> By using the Platform, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into a binding contract. These Terms expressly supersede prior agreements or arrangements made with you.</p>
                          <p><strong>1.4</strong> We may introduce supplemental terms for particular Services (for example, terms governing a specific event, activity, or promotion). Any such supplemental terms will be made available to you at the point of use and, once disclosed, are incorporated into and form part of these Terms as they relate to that Service. In the event of any conflict between these Terms and supplemental terms, the supplemental terms shall govern to the extent of the inconsistency.</p>
                          <p><strong>1.5</strong> We may amend these Terms at any time. We will notify you of material changes via the app, email, or SMS before they take effect. Continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">2. DEFINITIONS</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <ul className="space-y-3 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Rider”</strong> means a User who requests transportation services through the Platform.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Driver” or “Driver-Partner”</strong> means an independent contractor who provides transportation services to Riders using the Platform.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Trip”</strong> means a single ride booked, accepted, and completed (or cancelled) through the Platform.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Fare”</strong> means the total amount payable by a Rider for a Trip, including base fare, dynamic pricing, tolls, levies, and applicable taxes (e.g., Value Added Tax).</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Account”</strong> means the User's registered profile on the Platform.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Personal Data”</strong> has the meaning given under the Nigeria Data Protection Act 2023 (“NDPA”).</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">3. NATURE OF SERVICES</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>3.1</strong> LushRide Limited provides a platform that connects Riders seeking transportation with independent, third-party Drivers. We do not own, operate, or provide transportation services directly, and we are not a common carrier. Drivers are independent contractors and are not employees, agents, or partners of the Company.</p>
                          <p><strong>3.2</strong> We do not guarantee the availability of Drivers, uninterrupted service, or specific vehicle conditions, but we require all Drivers to meet our verification, licensing, and vehicle standards as a condition of using the Platform.</p>
                          <p><strong>3.3</strong> Estimated fares, arrival times, and routes provided through the Platform are estimates only and may vary due to traffic, weather, road conditions, or other factors beyond our control.</p>
                          <div className="bg-white/[0.03] border border-white/10 p-4 rounded-lg mt-2">
                            <p className="text-white font-semibold uppercase text-[10px] tracking-wider mb-1 text-lush-yellow">DISCLAIMER</p>
                            <p className="text-[11px] leading-relaxed text-white/80">
                              THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” THE COMPANY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. LUSHRIDE MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE REGARDING THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY OR AVAILABILITY OF THE SERVICES, OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. YOU AGREE THAT THE RISK ARISING OUT OF YOUR USE OF THE SERVICES REMAINS SOLELY WITH YOU, TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">4. REGISTRATION AND ACCOUNT</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>4.1</strong> To use the Platform as a Rider, you must register using accurate, current, and up to date information, including your full name, phone number, and email address.</p>
                          <p><strong>4.2</strong> You are responsible for maintaining the confidentiality of your login credentials and OTPs (one-time passwords) and for all activities conducted through your Account. Notify us immediately of any unauthorized use.</p>
                          <p><strong>4.3</strong> We reserve the right to suspend or terminate Accounts that provide false information, are used fraudulently, or violate these Terms. Unless otherwise permitted by the Company in writing, you may only possess one Account.</p>
                          <p><strong>4.4 Identity Verification Consent:</strong> You consent to our verification of your identity, including through NIN (National Identification Number), facial recognition/selfie matching, and third-party verification services, in compliance with applicable Nigerian laws.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">5. BOOKING, FARES, AND PAYMENT</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>5.1</strong> Riders may request Trips through the Platform. A Trip is confirmed once a Driver accepts the request.</p>
                          <p><strong>5.2</strong> Fares are calculated based on distance, time, demand, applicable levies, and any promotional discounts.</p>
                          <p><strong>5.3</strong> Payment may be made via debit/credit card, bank transfer, USSD, mobile wallet, or in-app wallet balance, in accordance with the payment options available on the Platform. Card and bank details are processed through Paystack Payments Limited compliant third-party payment processors; we do not store your full card details.</p>
                          <p><strong>5.4 Payment Consent:</strong> By adding a payment method, you authorise us and our payment processing partners to charge applicable Fares, cancellation fees, wait-time fees, and other charges specified in these Terms to your selected payment method.</p>
                          <p><strong>5.5</strong> Cancellation fees may apply if you cancel a Trip after a Driver has been assigned and has commenced travel to the pickup point, or if you are a “no-show.” Cancellation fees will be disclosed within the app.</p>
                          <p><strong>5.6</strong> All Fares are inclusive of applicable Value Added Tax (VAT) in accordance with Nigerian tax law.</p>
                          <p><strong>5.7</strong> Fares or charges paid by you are final and non-refundable, unless otherwise determined by the Company or required by applicable law.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">6. RIDER CONDUCT AND OBLIGATIONS</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>6.1</strong> As a Rider, you agree to: (a) provide accurate pickup/drop-off information; (b) treat Drivers with courtesy and respect; (c) not carry illegal, hazardous, or prohibited items; (d) not exceed the vehicle's approved seating capacity; (e) wear seatbelts where fitted and comply with the Driver's reasonable safety instructions; (f) not engage in harassment, violence, discrimination, or abusive conduct toward Drivers or other passengers.</p>
                          <p><strong>6.2</strong> Riders travelling with children must ensure appropriate supervision and, where required by law, appropriate child restraint systems.</p>
                          <p><strong>6.3</strong> We reserve the right to suspend or deactivate Riders who violate community guidelines, engage in fraud (including GPS spoofing, fraudulent chargebacks, or promo abuse), or pose a safety risk.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">7. RATINGS AND FEEDBACK</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>7.1</strong> After each Trip, Riders and Drivers may rate each other and leave feedback. Ratings help maintain quality and safety standards on the Platform and may affect your ability to continue using the Platform.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">8. SAFETY FEATURES</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>8.1</strong> The Platform may offer safety features including trip-sharing with emergency contacts, an in-app emergency/SOS button, trip audio recording (where consented to), driver/rider identity verification, and GPS trip tracking.</p>
                          <p><strong>8.2 Consent to Trip Tracking and Recording:</strong> By using the Platform, you consent to the collection of real-time location data during Trips for safety, dispute resolution, and service improvement purposes, and to audio/incident recording features, subject to our Privacy Policy.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">9. LOST PROPERTY</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>You understand and agree that it is your responsibility to ensure that you remove your property from the vehicle of a Driver-Partner when disembarking. Should you leave your property in the vehicle of a Driver-Partner, the Driver-Partner may hand over your property to you or the Company. The Company shall not be held liable in the event of the Driver-Partner not handing over your property as expected, nor shall the Company be liable for loss or damage to your property whilst it is in transit. While the Company will take reasonable steps to establish the owner of property left in a Driver-Partner's vehicle if returned to the offices of the Company, when your property is in the Company's possession, you understand and agree that the Company will only keep your property in its possession for a maximum period of three months from the date on which the Driver-Partner handed your property to the Company, after which the Company will be entitled to deal with your property as it deems fit and you shall have no claim whatsoever against the Company in respect of your unclaimed property.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">10. DATA PROTECTION AND PRIVACY CONSENTS</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>10.1</strong> We process your Personal Data in accordance with the Nigeria Data Protection Act 2023 (NDPA) and our Privacy Policy, which is incorporated into these Terms by reference.</p>
                          <p><strong>10.2</strong> By accepting these Terms, you expressly consent to: (a) the collection, processing, and storage of your Personal Data, including name, phone number, email, government-issued ID numbers (NIN where applicable), photograph, and payment information; (b) the collection of precise real-time and historical location/GPS data while the app is in use (and, where you separately opt in, in the background) for purposes of trip matching, navigation, fare calculation, safety, and fraud prevention; (c) the sharing of necessary Personal Data between you and Drivers (e.g., name, phone number, photo, location) strictly to facilitate a Trip; (d) the transfer of your Personal Data to our affiliates, payment processors, identity verification providers, cloud hosting providers, and other third-party service providers, including transfers outside Nigeria, subject to appropriate safeguards as required under the NDPA; (e) the use of your data for service improvement, fraud detection, customer support, and legal compliance; (f) receiving transactional communications (trip updates, receipts, OTPs, safety alerts) via SMS, push notification, email, or WhatsApp; (g) receiving promotional/marketing communications, which you may opt out of at any time via in-app settings or by contacting support, without affecting transactional communications.</p>
                          <p><strong>10.3</strong> You have the right, under the NDPA, to access, correct, delete, or request portability of your Personal Data, and to withdraw consent (subject to legal or contractual retention requirements), by sending an email to info@lushride.ng.</p>
                          <p><strong>10.4</strong> We retain Personal Data only for as long as necessary to fulfil the purposes outlined in our Privacy Policy or as required by law.</p>
                          <p><strong>10.5</strong> Full details of our data practices, your rights, and how to exercise them are set out in our Privacy Policy.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">11. RIDER–DRIVER COMMUNICATIONS</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>You should treat Drivers and other LushRide Users with respect. You can only communicate with other Users for purposes related to the Services. You shall not share any unnecessary contact information. Communication should end when the Service is complete, unless it is to return a lost item. Any other communication may be seen as harassment and lead to suspension or termination of your account. We enable Users to communicate on the Platform, for example via in-app chat or in-app calls, and we have the right to monitor and record your communications with other Users to review compliance with these Terms. Where this functionality is available, you may contact a Driver via the mobile number provided in the app interface; in this case, mobile charges set by your mobile carrier will apply.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">12. INTELLECTUAL PROPERTY</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>12.1</strong> The Platform, including its software, design, logos, trademarks, and content, is owned by or licensed to the Company and is protected under relevant intellectual property laws, including the Copyright Act and the Trademarks Act. You are granted a limited, non-exclusive, non-transferable, revocable licence to use the Platform for its intended purpose only.</p>
                          <p><strong>12.2</strong> You may not copy, modify, reverse-engineer, decompile, or create derivative works from the Platform.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">13. THIRD-PARTY SERVICES</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>13.1</strong> The Platform may integrate third-party services (e.g., mapping, payment gateways, SMS providers). We are not responsible for the acts, omissions, or content of third-party service providers, though we will make reasonable efforts to work with reputable providers.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">14. LIMITATION OF LIABILITY</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>14.1</strong> To the maximum extent permitted under Nigerian law, the Company shall not be liable for: (a) the acts, omissions, or negligence of Drivers, who act as independent parties; (b) indirect, incidental, special, or consequential damages arising from use of the Platform; (c) loss of property left in a vehicle, delays, or Trip cancellations, except where caused by our proven gross negligence or wilful misconduct.</p>
                          <p><strong>14.2</strong> Our total aggregate liability arising from these Terms, to the extent permitted by law, shall not exceed the total Fares paid by you in the 3 months preceding the claim.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">15. INDEMNIFICATION</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>You agree to indemnify and hold harmless the Company, its directors, employees, and agents from any claims, losses, liabilities, and expenses (including reasonable legal fees) arising from your breach of these Terms, violation of applicable law, or misuse of the Platform.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">16. SUSPENSION AND TERMINATION</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>16.1</strong> We may suspend or terminate your Account, with or without notice, for violation of these Terms, fraudulent activity, safety concerns, or as required by law or regulatory directive.</p>
                          <p><strong>16.2</strong> You may deactivate your Account at any time by contacting customer support, subject to settlement of any outstanding Fares or obligations.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">17. COMPLAINTS AND DISPUTE RESOLUTION</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>17.1 Complaints:</strong> In-app complaints or disputes regarding a Trip, Fare, or User conduct should first be submitted through the Platform's support channel or info@lushride.ng within 3 days of the incident.</p>
                          <p><strong>17.2 Governing Law:</strong> These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.</p>
                          <p><strong>17.3 Dispute Resolution:</strong> Any dispute arising from these Terms that cannot be resolved amicably within [30] days shall be referred to mediation in Lagos, Nigeria, in accordance with the Arbitration and Mediation Act 2023, conducted in English by a sole arbitrator. Nothing in this clause prevents either party from seeking urgent injunctive relief from a competent court.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">18. FORCE MAJEURE</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>Neither party shall be liable for failure to perform obligations due to events beyond reasonable control, including strikes, riots, insurrection, fuel scarcity, natural disasters, government action, or network/telecommunications failure.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">19. NOTICES</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>Notices under these Terms may be sent via in-app notification, SMS, or email to the contact details provided in your Account and shall be deemed received 24 hours after sending.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">20. GENERAL PROVISIONS</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>20.1 Entire Agreement:</strong> These Terms, together with the Privacy Policy and any other referenced policies, constitute the entire agreement between you and the Company.</p>
                          <p><strong>20.2 Severability:</strong> If any provision is found invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
                          <p><strong>20.3 No Waiver:</strong> Failure to enforce any right under these Terms does not constitute a waiver of that right.</p>
                          <p><strong>20.4 Assignment:</strong> You may not assign your rights under these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.</p>
                          <p><strong>20.5 Language:</strong> These Terms are drafted in English, which shall be the governing language in case of translation discrepancies.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">21. USER PROVIDED CONTENT</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>The Company may, in its sole discretion, permit you from time to time to submit, upload, publish or otherwise make available to LushRide through the Services textual, audio, and/or visual content and information, including commentary and feedback related to the Services, initiation of support requests, and submission of entries for competitions and promotions (“User Content”). Any User Content provided by you remains your property. However, by providing User Content to the Company, you grant the Company a worldwide, perpetual, irrevocable, transferrable, royalty-free license, with the right to sublicense, to use, copy, modify, create derivative works of, distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels now known or hereafter devised, without further notice to or consent from you, and without the requirement of payment to you or any other person or entity. You agree not to provide User Content that is defamatory, libelous, hateful, violent, obscene, pornographic, unlawful, or otherwise offensive.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">22. PLATFORM RESTRICTIONS</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p><strong>22.1</strong> You must not use the Platform:</p>
                          <ul className="space-y-2 pl-4 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to do anything illegal;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to do anything that violates these Terms or any other Platform rules and LushRide Policies;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>for any purpose not intended by these Terms;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to transfer or sell your account, password or identification to any other party;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to impersonate another person or disguise your identity, or use or attempt to use another User's account;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to solicit others to engage in illegal or dangerous activities;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold text-base line-height-1 mt-[-2px] shrink-0">●</span> <span>to stalk, threaten, or harass others;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to upload any content on the Platform which is inaccurate, inappropriate, infringes anyone's rights (such as intellectual property, privacy or personality rights) or is otherwise illegal;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to undermine the Platform's operations or security, or attempt to gain unauthorised access to the Platform or its related systems or networks.</span></li>
                          </ul>
                          <p className="mt-4"><strong>22.2 Anti-Fraud:</strong> Users are prohibited from engaging in any activity that aims to circumvent, bypass, or otherwise avoid the natural functionality, processes, or fees of the Platform. Violating anti-fraud provisions may result in temporary or permanent bans, or other actions, depending on the severity of the infraction.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">CONSENTS</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>By clicking “I Agree” / registering an Account, you confirm that you:</p>
                          <ul className="space-y-2 pl-4 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow">o</span> <span>Have read and agree to these Rider Terms of Use and the Privacy Policy;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">o</span> <span>Consent to identity verification;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">o</span> <span>Consent to the collection and processing of your location/GPS data;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">o</span> <span>Consent to the sharing of necessary trip data between you and Drivers;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">o</span> <span>Consent to receive transactional communications (SMS, push, email);</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">o</span> <span>Consent (optional) to receive marketing/promotional communications.</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeLegalTab === 'privacy' && (
                    <div className="space-y-8 animate-fadeIn">
                      <div>
                        <h2 className="text-xl font-display text-white border-b border-white/10 pb-2 mb-4">PRIVACY POLICY</h2>
                        <p className="text-xs text-lush-yellow uppercase tracking-widest mb-6">LUSHRIDE LIMITED | Last Updated: 25th July 2026</p>
                        <p className="text-xs leading-relaxed">
                          LushRide Limited (“LushRide”) is the owner and operator of LushRide Limited software and any other software, online platform, website, mobile or tablet application or domains used to provide our services (together with the Website, referred to as the “Services"). LushRide respects the privacy of your personal data and makes every effort to ensure your information is protected and remains private. We have provided this Privacy Policy to explain how we collect, use, share, disclose and protect personal information about the Users of our Website and Services hereafter referred to as “user”, “you” or "your".
                        </p>
                        <p className="text-xs leading-relaxed mt-3">
                          We may change this Privacy Policy from time to time. If we decide to change this Privacy Policy, we will inform you by posting the revised Privacy Policy on the Website, unless otherwise required by law to communicate through a different means.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">1. Protected Personal Information</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            “Protected Personal Information” or “PPI'' is information about users, including information that can reasonably be used to identify you and that relates to your past, present or future activities, and/or the provision of our services to you. LushRide provides its services to individuals and groups and when we process PPI on behalf of such people, we are acting as a “Processor” to them. Therefore, LushRide has adopted and maintains appropriate physical, technical, administrative, and organisational procedures to safeguard and secure the Protected Personal Information we process. We shall not access, use, or disclose Protected Personal Information except as permitted by you, and/or applicable law. LushRide strives to protect the privacy of the Protected Personal Information it processes, and to avoid inadvertent disclosure.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">2. Information Provided Directly by You</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>
                            We may collect certain information about you provided directly to us, such as when you request information, create, modify or lodge a complaint, complete a LushRide Online form, survey, questionnaire or application, contact customer support, enter into a service provider agreement, make a purchase, join or enroll for an event or otherwise communicate with us in any manner. This information may include, without limitation: name, date of birth, e-mail address, login name and password, home or work address, phone number, profile picture, saved favourite locations, preferences and settings related to the account, or any other personal information you choose to provide.
                          </p>
                          <p>
                            We collect details of your payment methods including payment card type, bank name, bank account number, related payment verification information and transaction history on the platform. We collect identification documents including government-issued or national identity documents (such as passports, driver’s licences or national ID cards) and photographs/pictures you submit yourself. We also collect demographic data such as your age and gender.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">3. Information Collected Through Your Use of Our Services</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>
                            We may collect certain information about you, your activity on our Website and your computer or device when using our Services. These include:
                          </p>
                          <p className="font-semibold text-white/90">Geolocation Data</p>
                          <p>
                            We collect data about your precise and/or approximate geolocation (including GPS, and IP address) from your mobile device depending on your app settings and device permissions, when you open and use LushRide.
                          </p>
                          <p className="font-semibold text-white/90">App Usage Data</p>
                          <p>
                            This includes: details of journeys (date and time, pick-up and drop-off addresses, journey distances and routes), payment history (including whether you used any coupons or promotional codes), cancellation history, dates and times you log-in and log-off the LushRide app and app features or pages viewed, browser type, app crashes and other system activity.
                          </p>
                          <p className="font-semibold text-white/90">Communication Data</p>
                          <p>
                            We collect communication and correspondence data when you engage with our Customer Support Team via the in-app chat function, report an incident, communicate via emails, web forms, or speak with our Customer Support agents, or communicate with Drivers via the LushRide app using the in-app chat function or via internet calls (where available).
                          </p>
                          <p className="font-semibold text-white/90">User Generated Data</p>
                          <p>
                            We collect personal data when you use certain features. For example to provide recordings such as audio recordings generated during the trip (as part of our safety toolkit trip audio recording feature, where such feature is available, or feedback about other users, including compliments that you have the option to give to Drivers, when you finish your ride, along with a 5 star review.
                          </p>
                          <p className="font-semibold text-white/90">Device Data</p>
                          <p>
                            We collect data about the devices you use to access the LushRide App, including the hardware model, device IP address and other unique device identifiers, device operating system, browser version, device vendor name, app version, identity of carrier and manufacturer and preferred languages.
                          </p>
                          <p className="font-semibold text-white/90">Calendar Data</p>
                          <p>
                            If you set your device permissions or choose to give LushRide access to your chosen calendar, we will collect information available in your calendar such as event details to use in providing you certain optional features.
                          </p>
                          <p className="mt-4">
                            We also automatically collect information via the Website or Service using various technologies, including, but not limited to Cookies and Web Beacons. We may collect your IP address, location, browsing behaviour and device IDs. This information is used by us to enable us to better understand how our Services are being used by visitors and allows us to administer and customise the Services to improve your overall experience.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">4. Information Collected from Third-Party Sources</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            We may also receive information about you from publicly and commercially available sources, as permitted by applicable law, which we may combine with other information we collect through our Services. For example, if you make a complaint to us about your safety, we can conduct a public search on available personal information about you that is exposing you to security risks or if you engage with a separate App or Website that uses our API, or whose API we use, we may receive information about you or your connections from that Website or App. This includes, without limitation, profile information, profile picture, gender, username, user ID associated with your social media account, age range, language, country, friends list, your contact names, e-mail addresses, phone numbers, identifiers and any other information you permit the social network to share with third parties. The data we receive is solely dependent upon your privacy settings with the social network.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">5. Protective Measures We Use</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            We have put in place physical, technical and administrative measures that are intended to help protect your information in our possession against loss, theft, misuse, unauthorised access, disclosure and alteration. Some of the safeguards we use are firewalls and data encryption, physical access controls to our data centres, and information access authorisation controls. Although we take measures to secure your information, we do not promise, and you should not expect, that your personal information, or searches, or other information will always remain secure. We cannot guarantee the security of our information storage, nor can we guarantee that the information you supply will not be intercepted while being transmitted to and from us over the Internet including, without limitation, email and text transmissions. If any information under our control is compromised as a result of a breach of security, we will take reasonable steps to investigate the situation and notify those individuals whose information may have been compromised and take other steps, in accordance with any applicable jurisdictional laws and regulations.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">6. The Legal Basis and Reasons for Collection and Processing Your Personal Information</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>The legal basis upon which we rely for the collection and processing of your Personal Information is the following:</p>
                          <ul className="space-y-2 pl-4 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow">a.</span> <span>When signing up to use our Services, you have given us explicit consent allowing LushRide to provide you with our Services and generally to process your information, in accordance with this Privacy Policy; and the transfer of your data to other jurisdictions as may be required in accordance with applicable law;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">b.</span> <span>It is necessary for entering into, or performing, the obligations of a contract between you and LushRide, including, without limitation, the Terms of Service agreement which may be accessed by you, or a customer’s Service Agreement;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">c.</span> <span>It is necessary to register you as a user, manage your account and profile, and authenticate you when you log in.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">d.</span> <span>It is necessary for our legitimate interests in the proper administration of our Website, our Service and our business; analysing the use of the website and our Services; assuring the security of our website and Services; maintaining back-ups of our databases; and communicating with you;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">e.</span> <span>To resolve technical issues you encounter, to respond to your requests for assistance, comments and questions, to analyse crash information, to repair and improve the Services and provide other customer support.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">f.</span> <span>To send communications via email and within the Services, including, for example, responding to your comments, questions and requests, providing customer support, and sending you technical notices, product updates, security alerts, and administrative, billing, and account management-related messages.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">g.</span> <span>To send promotional communications that you have consented to receive or have expressed a legitimate interest in receiving.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">h.</span> <span>It is necessary for our legitimate interests in the protection and assertion of our legal rights, and the legal rights of others, including you.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">i.</span> <span>It is necessary for our compliance with certain legal provisions which may require us to process your personal data. By way of example, and without limitation, we may be required by law to disclose your personal data to law enforcement or a regulatory agency.</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">7. How We Use the Information We Collect</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>
                            Our primary purpose in collecting, holding, using and disclosing your Information is for our legitimate business purposes and to provide you with a safe, smooth, efficient, and customised experience while using the Service. Particularly, the information collected is used to identify users based on their location and demographics. This helps us to optimise our Services to meet specific needs of these users.
                          </p>
                          <p className="font-semibold text-white/90">We will use this information in order to:</p>
                          <ul className="space-y-1.5 pl-4 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow">a.</span> <span>Provide users with our Services and Customer Support including but not limited to verifying your account and for informational and operational purposes, such as account management or system maintenance.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">b.</span> <span>Protect your safety online.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">c.</span> <span>Contact you and provide you with important notices.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">d.</span> <span>Analyse, improve and manage our Services and operations.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">e.</span> <span>Resolve problems and disputes and engage in other legal and security matters.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">f.</span> <span>Detect and prevent fraud, abuse and other security incidents.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">g.</span> <span>Enforce our Terms of Service and any terms and conditions of any other agreements for our Services.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">h.</span> <span>Build new services and other purposes as deemed necessary by LushRide upon notification to you.</span></li>
                          </ul>
                          <p className="font-semibold text-white/90 mt-4">Additionally, we may use the information we collect about you to:</p>
                          <ul className="space-y-1.5 pl-4 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow">a.</span> <span>Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events of LushRide and other companies, where permissible and according to local applicable laws.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">b.</span> <span>Display advertising, including advertising that is targeted to you or other users based on your location, interests, as well as your activities on our Services.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">c.</span> <span>Verify your identity and prevent impersonation, spam or other unauthorised or illegal activity.</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">d.</span> <span>Provide after-sales services to you.</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">8. How We Disclose Information We Collect</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>a. We may disclose the information we collect about you as described in this Privacy Policy or as described at the time of collection or sharing, including as follows:</p>
                          <ul className="space-y-2.5 pl-4 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">i)</span> <span>With third-party Service Providers that provide a variety of services on our behalf. For example, we may rely on service providers to provide web analytics, data processing, advertising, email distribution and other services; These service providers are obligated by contract to protect the confidentiality, integrity and security of the information we share with them;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">ii)</span> <span>With the general public if you submit content to a part of our Services that is viewable by the general public, such as a forum or community area;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">iii)</span> <span>With third parties with whom you choose to let us share information, for example other websites or apps that integrate with our API or Services, or those with an API or Service with which we integrate;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">iv)</span> <span>With current and future LushRide subsidiaries and affiliated entities that provide services, including payment processing services or conduct data processing on our behalf, or for data verification, data centralisation and/or logistics purposes;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">v)</span> <span>With affiliated entities that provide payment processing services on our behalf;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">vi)</span> <span>With vendors, consultants, marketing partners, and other service providers who need access to such information to carry out work on our behalf;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">vii)</span> <span>In response to a request for information by a competent authority, if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">viii)</span> <span>With law enforcement officials, government authorities, or other third parties if we believe your actions are inconsistent with our Terms of Service, or policies, or to protect the rights, property, or safety of LushRide or others;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">ix)</span> <span>In connection with, or during negotiations of, any merger, sale of company assets, consolidation or restructuring, financing, or acquisition of all or a portion of our business by or into another company;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">x)</span> <span>If we otherwise notify you and you consent to the sharing;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">xi)</span> <span>In an aggregated and/or de-identified form which cannot reasonably be used to identify you; and</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow font-bold">xii)</span> <span>To enforce our Terms of Service, this Privacy Policy, and any other applicable agreements, or protect our legal rights.</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">9. Aggregated Data</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            Aggregated Data is de-identified or anonymised and does not constitute Personal Data as this data does not directly or indirectly reveal you, or the user or the user’s customers identity. We may collect, use and share Aggregated Data such as statistical or demographic data for any purpose including, without limitation, research, security risk assessment, penetration testing, vulnerability testing, education, analysing usage trends and patterns, improving our Services and business operations, evaluating the performance of the LushRide Service and measuring the effectiveness of our content, and Service components. We may receive compensation in exchange for sharing de-identified or anonymised Aggregated Data which shall be for the account of LushRide.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">10. Sharing Information with Law Enforcement</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            LushRide is committed to cooperating with law enforcement while respecting everyone’s right to privacy. If we receive a request for user account information from a government agency investigating security incidents, we will review the request to be certain that it satisfies all legal requirements before releasing information to the requesting agency.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">11. Social Media Sharing</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>
                            <strong>a.</strong> Our Services may now or in the future integrate with social sharing features and other related tools which let you share actions you take on our Services with other Apps, sites, or media, and vice versa, depending on the settings you establish with the social sharing service. Please refer to the privacy policies of those social sharing services for more information about how they handle the data you provide to or share through them.
                          </p>
                          <p>
                            <strong>b.</strong> Any information or content that you voluntarily disclose for posting publicly to a social sharing service becomes available to the public, as controlled by any applicable privacy settings that you set with the social sharing service. Once you have shared User Content or made it public, that User Content may be re-shared by others. If you remove information that you posted to the social sharing service, copies may still remain viewable in cached and archived pages, or if other users or third parties, using the social sharing service, have re-shared, copied or saved that User Content.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">12. Advertising and Analytic Services Provided by Others</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            We and third parties that provide content or functionality on the Services or provide us analytics and advertising services collect or receive information about your use of the Services and other websites or mobile applications, including through the use of Cookies, Web Beacons, software development kits (SDKs), and other technologies to identify your device when you visit our Website and use our Services, as well as when you visit other online sites and services. This information may include, for example, your IP address, browser, device information, pages viewed, time spent on pages, links clicked and conversion information. This information may be combined with information collected across different websites, online services, and linked or associated devices to, among other things, analyse and track data, determine the popularity of certain content, deliver advertising and content targeted to your interests, and better understand your online activity.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">13. Links to Third-Party Websites</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>
                            <strong>a.</strong> Our Services, as well as the email messages sent with respect to our Services, may contain links or access to websites and services operated by third parties that are beyond our control. Links or access to third parties from our Services are not an endorsement by us of such third parties, or their websites, applications, products, services, or practices. We are not responsible for the security or privacy policy, terms, and conditions, practices or the content of such third parties. These third parties may send their own Cookies to you and independently collect data.
                          </p>
                          <p>
                            <strong>b.</strong> If you visit or access a third-party Website, application or other property that is linked or accessed from our Services, we encourage you to read any privacy policies and terms and conditions of that third party before providing any personally identifiable information. If you have a question about the terms and conditions, privacy policy, practices or contents of a third party, please contact the third party directly.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">14. International Privacy Practices</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            Where we need to transfer your Personal Data to another country, we will take all reasonable steps to ensure that any such transfers comply with applicable laws. We will take all steps necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organisation or a country unless there are sufficient controls in place including the security of Your data. We would also ensure your data is transferred outside the country with appropriate safeguard in compliance with the applicable law.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">15. Account Information</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            You may access or modify your account information at any time by logging into your online account. Please note that in some cases we may retain certain information about you as required by law, or for legitimate business purposes, to the extent permitted by law.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">16. Promotional Information opt Out</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            You may opt out of receiving promotional messages from us at any time by following the instructions in those messages sent to you or by contacting us at any time using the Contact Us information at the end of this Privacy Policy. If you opt out, we may still send you non-promotional communications, such as those related to your account, or use of our products and Services.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">17. Your Access and Rights to Your Personal Information</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>
                            You have certain rights in relation to Personal Information we hold about you. You can exercise any of the following rights by contacting us using any of the methods in the Contact section below. We may need to request specific information from you to help us confirm your identity and ensure your right to access your Personal Data (or to exercise any of your other rights). This is a security measure to ensure that Personal Data is not disclosed to any person who has no right to receive it. We try to respond to all legitimate requests within one month. Occasionally, it may take us longer than a month if your request is particularly complex or you have made several requests. In this case, we will notify you and keep you updated. Your rights include:
                          </p>
                          <ul className="space-y-3 list-none pl-0">
                            <li><strong>a. Right to Access Your Personal Data.</strong> You have the right to access information held about you for the purpose of viewing and in certain cases updating or deleting such information. Furthermore, if you prefer that LushRide does not share certain information as described in this Privacy Policy, you can direct us not to share that information. We will comply with an individual’s requests regarding access, correction, sharing, and/or deletion of the personal data we store in accordance with applicable law. To make changes to your account affecting your personal information contact us at the email address in our Contact section below. For any deletion, non-sharing or update request, we will make the changes as soon as practicable, however, this information may stay in our backup files. If we cannot make the changes you want, we will let you know and explain why.</li>
                            <li><strong>b. Right of Correction or Completion of Your Personal Data.</strong> If the personal information we hold about you is not accurate, out of date or incomplete, you have a right to have the data corrected or completed. To make corrections to your account please contact us at the email address in our Contact section below.</li>
                            <li><strong>c. Right of Erasure or Deletion of Your Personal Data.</strong> In certain circumstances, you have the right to request that personal information we hold about you is deleted. If we cannot delete the information you want, we will let you know and explain why. To request information deletion please contact us at the email address in our Contact section below.</li>
                            <li><strong>d. Right to Object to or Restrict Processing of Your Personal Data.</strong> In certain circumstances, you have the right to object to our processing of your personal information. For example, you have the right to object to use of your personal information for direct marketing purposes. Similarly, you have the right to object to use of your personal information if we are processing your information based on legitimate interests and there are no compelling legitimate grounds for our processing which supersede your rights and interests. You may also have the right to restrict our use of your personal information, such as in circumstances where you have challenged the accuracy of the information and during the period where we are verifying its accuracy. To object to or restrict processing please contact us at the email address in our Contact section below.</li>
                            <li><strong>e. Right to Data Portability or Transfer of Your Personal Data.</strong> You have the right to be provided with a copy of the information we maintain about you in a structured, machine-readable and commonly used format. To receive a copy of the information we maintain about you and to request for a transfer of your personal to a third-party (e.g. another company which you have dealings with) in a structured, commonly used and machine-readable format please contact us at the email address in our Contact section below.</li>
                            <li><strong>f. Right to Withdrawal of Consent.</strong> If you have given your consent to us to process and share your Personal Information after we have requested it, you have the right to withdraw your consent at any time. To withdraw your consent please contact us at the email address in our Contact section below.</li>
                            <li><strong>g.</strong> Right to ask us for a copy of the safeguards under which personal data is transferred outside of Nigeria;</li>
                            <li><strong>h.</strong> Right not to be subject to decisions based solely on automated processing, including profiling, except where necessary for entering into, or performing, a contract with LushRide; it is based on your explicit consent and is subject to safeguards; or is authorised by law and is also subject to safeguards;</li>
                            <li><strong>i.</strong> Right to prevent processing that is likely to cause damage or distress to you or anyone else;</li>
                            <li><strong>j.</strong> Right to be notified of a personal data breach which is likely to result in high risks to your rights and freedoms; and</li>
                            <li><strong>k.</strong> Right to make a complaint to the Nigeria Data Protection Commission or any other regulatory body.</li>
                          </ul>
                          <p className="mt-3 text-white/80">
                            Where you have submitted a complaint, we will endeavour to resolve such feedback/query within thirty (30) days from the date of receipt. In the event that we are unable to resolve it before the expiration of the aforementioned timeline, we shall inform you about the extension of time needed to resolve such.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">18. Violation of Privacy</h4>
                        <div className="pl-4 border-l border-white/10 space-y-3 text-xs leading-relaxed">
                          <p>
                            We have put in place procedures to deal with any suspected personal data breach and will notify you of any personal data breach and let you know the steps we have taken to remedy the breach and the security measures we have applied to render your personal data unintelligible.
                          </p>
                          <p>
                            We will endeavour to remedy all suspected breaches of personal data within [thirty (30) days] from the date of the report of the breach.
                          </p>
                          <p>
                            If you know or suspect that a personal data breach has occurred, you should immediately contact the LushRide team at <a href="mailto:info@lushride.ng" className="text-lush-yellow hover:underline">info@lushride.ng</a>
                          </p>
                          <p className="font-semibold text-white/90">LushRide will not be responsible for any personal data breach which occurs as a result of:</p>
                          <ul className="space-y-1.5 pl-4 list-none">
                            <li className="flex gap-2"><span className="text-lush-yellow">a.</span> <span>an event which is beyond the control of LushRide;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">b.</span> <span>an act or threat of terrorism;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">c.</span> <span>an act of God (such as, but not limited to, fires, explosions, earthquakes, drought, tidal waves and floods) which compromises LushRide’s data protection measures;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">d.</span> <span>war, hostilities (whether war be declared or not), invasion, act of foreign enemies, mobilisation, requisition, or embargo;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">e.</span> <span>rebellion, revolution, insurrection, military or usurped power, or civil war which compromises LushRide’s data protection measures;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">f.</span> <span>pandemics or epidemics;</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">g.</span> <span>the transfer of your personal data to a third party on your instructions; and</span></li>
                            <li className="flex gap-2"><span className="text-lush-yellow">h.</span> <span>the use of your personal data by a third party designated by you.</span></li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">19. Our Information Retention Policy</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            Unless you request that we delete certain information, we retain the information we collect for as long as your account is active or as needed to provide you services. Following termination or deactivation of your account, we will retain information for at least 1 year or for as long as needed for our legal purposes in accordance with applicable law. We will only retain your Personal Data for as long as we reasonably need to unless a longer retention period is required by law (for example for regulatory purposes). We will also retain your personal data to comply with a legal obligation.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">20. Contact Us</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            If you have any questions or if you would like to contact us about our processing of your personal information, including exercising your rights as outlined above, please contact us at <a href="mailto:info@lushride.ng" className="text-lush-yellow hover:underline">info@lushride.ng</a>. When you contact us, we will ask you to verify your identity.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">21. Consent</h4>
                        <div className="pl-4 border-l border-white/10 text-xs leading-relaxed">
                          <p>
                            I confirm that I have read and understood this Privacy Policy and I consent to the processing of my Personal Data by LushRide in line with the terms of the Privacy Policy.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Footer controls */}
              <div className="border-t border-white/10 p-6 flex items-center justify-between bg-black/40">
                <p className="text-[10px] uppercase tracking-wider text-muted-1">
                  Last updated: July 2026 | LushRide Legal Panel
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
