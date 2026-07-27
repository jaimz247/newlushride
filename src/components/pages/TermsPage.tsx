import React, { useState, useEffect } from 'react';
import { Scale, Printer, ArrowLeft, Search, FileSignature, CheckCircle2, Building2, Mail, ShieldAlert } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import SEOHead from '../ui/SEOHead';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('sec-1');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'sec-1', number: '1', title: 'Introduction' },
    { id: 'sec-2', number: '2', title: 'Definitions' },
    { id: 'sec-3', number: '3', title: 'Nature of Services' },
    { id: 'sec-4', number: '4', title: 'Registration and Account' },
    { id: 'sec-5', number: '5', title: 'Booking, Fares, and Payment' },
    { id: 'sec-6', number: '6', title: 'Rider Conduct and Obligations' },
    { id: 'sec-7', number: '7', title: 'Ratings and Feedback' },
    { id: 'sec-8', number: '8', title: 'Safety Features' },
    { id: 'sec-9', number: '9', title: 'Lost Property' },
    { id: 'sec-10', number: '10', title: 'Data Protection and Privacy Consents' },
    { id: 'sec-11', number: '11', title: 'Rider–Driver Communications' },
    { id: 'sec-12', number: '12', title: 'Intellectual Property' },
    { id: 'sec-13', number: '13', title: 'Third-Party Services' },
    { id: 'sec-14', number: '14', title: 'Limitation of Liability' },
    { id: 'sec-15', number: '15', title: 'Indemnification' },
    { id: 'sec-16', number: '16', title: 'Suspension and Termination' },
    { id: 'sec-17', number: '17', title: 'Complaints and Dispute Resolution' },
    { id: 'sec-18', number: '18', title: 'Force Majeure' },
    { id: 'sec-19', number: '19', title: 'Notices' },
    { id: 'sec-20', number: '20', title: 'General Provisions' },
    { id: 'sec-21', number: '21', title: 'User Provided Content' },
    { id: 'sec-22', number: '22', title: 'Platform Restrictions & Anti-Fraud' },
    { id: 'sec-consents', number: '23', title: 'Consents & Confirmation' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="bg-theme min-h-screen text-white selection:bg-lush-yellow selection:text-black">
      <SEOHead 
        title="Terms of Use | LushRide Executive Transport" 
        description="Official Rider Terms of Use and Terms of Reference for LushRide Limited. Corporate governance, fares, safety protocols, and passenger terms." 
      />
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Top Hero Banner */}
        <div className="relative bg-[#050505] border-b border-white/10 py-16 overflow-hidden">
          <div className="absolute -top-24 right-10 w-96 h-96 bg-lush-yellow/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-1 mb-6">
              <button 
                onClick={navigateHome}
                className="hover:text-lush-yellow transition-colors flex items-center gap-1 focus:outline-none"
              >
                <ArrowLeft size={14} /> Home
              </button>
              <span>/</span>
              <span className="text-white/40">Legal &amp; Compliance</span>
              <span>/</span>
              <span className="text-lush-yellow font-semibold">Terms of Use &amp; Reference</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lush-yellow/10 border border-lush-yellow/30 rounded-full text-lush-yellow text-[11px] font-mono tracking-widest uppercase mb-4">
                  <Scale size={13} /> Official Rider Agreement
                </div>
                <h1 className="text-3xl md:text-5xl font-display text-white tracking-tight">
                  RIDER TERMS OF USE &amp; REFERENCE
                </h1>
                <p className="text-muted-1 font-light text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                  LUSHRIDE LIMITED (RC 8924511) Corporate Governance, Terms of Reference, and Rider Operating Agreement.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Last Updated</p>
                  <p className="text-xs text-lush-yellow font-mono font-semibold">13th July 2026</p>
                </div>
                <button
                  onClick={handlePrint}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs uppercase tracking-widest font-medium rounded transition-all flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <Printer size={15} /> Print Document
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Table of Contents Sidebar */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
                    <FileSignature size={16} className="text-lush-yellow" />
                    <span>Table of Contents</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">22 Sections</span>
                </div>

                {/* Quick Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-3 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search clause title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-lush-yellow/50"
                  />
                </div>

                {/* List of links */}
                <div className="max-h-[50vh] overflow-y-auto pr-1 space-y-1 custom-scrollbar text-xs">
                  {sections
                    .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.number.includes(searchQuery))
                    .map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2.5 ${
                          activeSection === sec.id
                            ? 'bg-lush-yellow text-black font-semibold'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeSection === sec.id ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'}`}>
                          {sec.number}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </button>
                    ))}
                </div>

                <div className="pt-4 border-t border-white/10 text-[11px] text-muted-1 space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <Building2 size={13} className="text-lush-yellow" />
                    <span>LushRide Limited (RC 8924511)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Mail size={13} className="text-lush-yellow" />
                    <a href="mailto:info@lushride.ng" className="hover:text-lush-yellow transition-colors">info@lushride.ng</a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Document Body */}
            <article className="lg:col-span-8 space-y-12 text-sm leading-relaxed text-muted-1">
              
              {/* Section 1 */}
              <section id="sec-1" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">1.</span>
                  <h2 className="text-xl font-display text-white">INTRODUCTION</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>1.1</strong> These Rider Terms of Use (“Terms,” “Terms of Use”) constitute a legally binding agreement between you (“User,” “Rider,” “you”) and LUSHRIDE LIMITED, a company duly incorporated under the laws of the Federal Republic of Nigeria with RC number 8924511 (“Company,” “we,” “us,” “our”), governing your access to and use of the LushRide mobile application, website, and related services (collectively, the “Platform” or “Services”) as a Rider.</p>
                  <p><strong>1.2</strong> By downloading, installing, registering for, or otherwise using the Platform as a Rider, you confirm that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and any other policies referenced herein. If you do not agree, you must not use the Platform.</p>
                  <p><strong>1.3</strong> By using the Platform, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into a binding contract. These Terms expressly supersede prior agreements or arrangements made with you.</p>
                  <p><strong>1.4</strong> We may introduce supplemental terms for particular Services (for example, terms governing a specific event, activity, or promotion). Any such supplemental terms will be made available to you at the point of use and, once disclosed, are incorporated into and form part of these Terms as they relate to that Service. In the event of any conflict between these Terms and supplemental terms, the supplemental terms shall govern to the extent of the inconsistency.</p>
                  <p><strong>1.5</strong> We may amend these Terms at any time. We will notify you of material changes via the app, email, or SMS before they take effect. Continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.</p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="sec-2" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">2.</span>
                  <h2 className="text-xl font-display text-white">DEFINITIONS</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <ul className="space-y-3 list-none">
                    <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Rider”</strong> means a User who requests transportation services through the Platform.</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Driver” or “Driver-Partner”</strong> means an independent contractor who provides transportation services to Riders using the Platform.</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Trip”</strong> means a single ride booked, accepted, and completed (or cancelled) through the Platform.</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Fare”</strong> means the total amount payable by a Rider for a Trip, including base fare, dynamic pricing, tolls, levies, and applicable taxes (e.g., Value Added Tax).</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Account”</strong> means the User's registered profile on the Platform.</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow shrink-0">●</span> <span><strong>“Personal Data”</strong> has the meaning given under the Nigeria Data Protection Act 2023 (“NDPA”).</span></li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="sec-3" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">3.</span>
                  <h2 className="text-xl font-display text-white">NATURE OF SERVICES</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>3.1</strong> LushRide Limited provides a platform that connects Riders seeking transportation with independent, third-party Drivers. We do not own, operate, or provide transportation services directly, and we are not a common carrier. Drivers are independent contractors and are not employees, agents, or partners of the Company.</p>
                  <p><strong>3.2</strong> We do not guarantee the availability of Drivers, uninterrupted service, or specific vehicle conditions, but we require all Drivers to meet our verification, licensing, and vehicle standards as a condition of using the Platform.</p>
                  <p><strong>3.3</strong> Estimated fares, arrival times, and routes provided through the Platform are estimates only and may vary due to traffic, weather, road conditions, or other factors beyond our control.</p>
                  
                  <div className="bg-white/[0.03] border border-white/10 p-5 rounded-xl mt-4 space-y-2">
                    <p className="text-lush-yellow font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert size={16} /> DISCLAIMER OF WARRANTIES
                    </p>
                    <p className="text-[11px] leading-relaxed text-white/80 uppercase font-mono">
                      THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” THE COMPANY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. LUSHRIDE MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE REGARDING THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY OR AVAILABILITY OF THE SERVICES, OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. YOU AGREE THAT THE RISK ARISING OUT OF YOUR USE OF THE SERVICES REMAINS SOLELY WITH YOU, TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="sec-4" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">4.</span>
                  <h2 className="text-xl font-display text-white">REGISTRATION AND ACCOUNT</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>4.1</strong> To use the Platform as a Rider, you must register using accurate, current, and up to date information, including your full name, phone number, and email address.</p>
                  <p><strong>4.2</strong> You are responsible for maintaining the confidentiality of your login credentials and OTPs (one-time passwords) and for all activities conducted through your Account. Notify us immediately of any unauthorized use.</p>
                  <p><strong>4.3</strong> We reserve the right to suspend or terminate Accounts that provide false information, are used fraudulently, or violate these Terms. Unless otherwise permitted by the Company in writing, you may only possess one Account.</p>
                  <p><strong>4.4 Identity Verification Consent:</strong> You consent to our verification of your identity, including through NIN (National Identification Number), facial recognition/selfie matching, and third-party verification services, in compliance with applicable Nigerian laws.</p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="sec-5" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">5.</span>
                  <h2 className="text-xl font-display text-white">BOOKING, FARES, AND PAYMENT</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>5.1</strong> Riders may request Trips through the Platform. A Trip is confirmed once a Driver accepts the request.</p>
                  <p><strong>5.2</strong> Fares are calculated based on distance, time, demand, applicable levies, and any promotional discounts.</p>
                  <p><strong>5.3</strong> Payment may be made via debit/credit card, bank transfer, USSD, mobile wallet, or in-app wallet balance, in accordance with the payment options available on the Platform. Card and bank details are processed through Paystack Payments Limited compliant third-party payment processors; we do not store your full card details.</p>
                  <p><strong>5.4 Payment Consent:</strong> By adding a payment method, you authorise us and our payment processing partners to charge applicable Fares, cancellation fees, wait-time fees, and other charges specified in these Terms to your selected payment method.</p>
                  <p><strong>5.5</strong> Cancellation fees may apply if you cancel a Trip after a Driver has been assigned and has commenced travel to the pickup point, or if you are a “no-show.” Cancellation fees will be disclosed within the app.</p>
                  <p><strong>5.6</strong> All Fares are inclusive of applicable Value Added Tax (VAT) in accordance with Nigerian tax law.</p>
                  <p><strong>5.7</strong> Fares or charges paid by you are final and non-refundable, unless otherwise determined by the Company or required by applicable law.</p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="sec-6" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">6.</span>
                  <h2 className="text-xl font-display text-white">RIDER CONDUCT AND OBLIGATIONS</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>6.1</strong> As a Rider, you agree to: (a) provide accurate pickup/drop-off information; (b) treat Drivers with courtesy and respect; (c) not carry illegal, hazardous, or prohibited items; (d) not exceed the vehicle's approved seating capacity; (e) wear seatbelts where fitted and comply with the Driver's reasonable safety instructions; (f) not engage in harassment, violence, discrimination, or abusive conduct toward Drivers or other passengers.</p>
                  <p><strong>6.2</strong> Riders travelling with children must ensure appropriate supervision and, where required by law, appropriate child restraint systems.</p>
                  <p><strong>6.3</strong> We reserve the right to suspend or deactivate Riders who violate community guidelines, engage in fraud (including GPS spoofing, fraudulent chargebacks, or promo abuse), or pose a safety risk.</p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="sec-7" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">7.</span>
                  <h2 className="text-xl font-display text-white">RATINGS AND FEEDBACK</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  <strong>7.1</strong> After each Trip, Riders and Drivers may rate each other and leave feedback. Ratings help maintain quality and safety standards on the Platform and may affect your ability to continue using the Platform.
                </p>
              </section>

              {/* Section 8 */}
              <section id="sec-8" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">8.</span>
                  <h2 className="text-xl font-display text-white">SAFETY FEATURES</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>8.1</strong> The Platform may offer safety features including trip-sharing with emergency contacts, an in-app emergency/SOS button, trip audio recording (where consented to), driver/rider identity verification, and GPS trip tracking.</p>
                  <p><strong>8.2 Consent to Trip Tracking and Recording:</strong> By using the Platform, you consent to the collection of real-time location data during Trips for safety, dispute resolution, and service improvement purposes, and to audio/incident recording features, subject to our Privacy Policy.</p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="sec-9" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">9.</span>
                  <h2 className="text-xl font-display text-white">LOST PROPERTY</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  You understand and agree that it is your responsibility to ensure that you remove your property from the vehicle of a Driver-Partner when disembarking. Should you leave your property in the vehicle of a Driver-Partner, the Driver-Partner may hand over your property to you or the Company. The Company shall not be held liable in the event of the Driver-Partner not handing over your property as expected, nor shall the Company be liable for loss or damage to your property whilst it is in transit. While the Company will take reasonable steps to establish the owner of property left in a Driver-Partner's vehicle if returned to the offices of the Company, when your property is in the Company's possession, you understand and agree that the Company will only keep your property in its possession for a maximum period of three months from the date on which the Driver-Partner handed your property to the Company, after which the Company will be entitled to deal with your property as it deems fit and you shall have no claim whatsoever against the Company in respect of your unclaimed property.
                </p>
              </section>

              {/* Section 10 */}
              <section id="sec-10" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">10.</span>
                  <h2 className="text-xl font-display text-white">DATA PROTECTION AND PRIVACY CONSENTS</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>10.1</strong> We process your Personal Data in accordance with the Nigeria Data Protection Act 2023 (NDPA) and our Privacy Policy, which is incorporated into these Terms by reference.</p>
                  <p><strong>10.2</strong> By accepting these Terms, you expressly consent to: (a) the collection, processing, and storage of your Personal Data, including name, phone number, email, government-issued ID numbers (NIN where applicable), photograph, and payment information; (b) the collection of precise real-time and historical location/GPS data while the app is in use (and, where you separately opt in, in the background) for purposes of trip matching, navigation, fare calculation, safety, and fraud prevention; (c) the sharing of necessary Personal Data between you and Drivers (e.g., name, phone number, photo, location) strictly to facilitate a Trip; (d) the transfer of your Personal Data to our affiliates, payment processors, identity verification providers, cloud hosting providers, and other third-party service providers, including transfers outside Nigeria, subject to appropriate safeguards as required under the NDPA; (e) the use of your data for service improvement, fraud detection, customer support, and legal compliance; (f) receiving transactional communications (trip updates, receipts, OTPs, safety alerts) via SMS, push notification, email, or WhatsApp; (g) receiving promotional/marketing communications, which you may opt out of at any time via in-app settings or by contacting support, without affecting transactional communications.</p>
                  <p><strong>10.3</strong> You have the right, under the NDPA, to access, correct, delete, or request portability of your Personal Data, and to withdraw consent (subject to legal or contractual retention requirements), by sending an email to info@lushride.ng.</p>
                  <p><strong>10.4</strong> We retain Personal Data only for as long as necessary to fulfil the purposes outlined in our Privacy Policy or as required by law.</p>
                  <p><strong>10.5</strong> Full details of our data practices, your rights, and how to exercise them are set out in our Privacy Policy.</p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="sec-11" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">11.</span>
                  <h2 className="text-xl font-display text-white">RIDER–DRIVER COMMUNICATIONS</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  You should treat Drivers and other LushRide Users with respect. You can only communicate with other Users for purposes related to the Services. You shall not share any unnecessary contact information. Communication should end when the Service is complete, unless it is to return a lost item. Any other communication may be seen as harassment and lead to suspension or termination of your account. We enable Users to communicate on the Platform, for example via in-app chat or in-app calls, and we have the right to monitor and record your communications with other Users to review compliance with these Terms. Where this functionality is available, you may contact a Driver via the mobile number provided in the app interface; in this case, mobile charges set by your mobile carrier will apply.
                </p>
              </section>

              {/* Section 12 */}
              <section id="sec-12" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">12.</span>
                  <h2 className="text-xl font-display text-white">INTELLECTUAL PROPERTY</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>12.1</strong> The Platform, including its software, design, logos, trademarks, and content, is owned by or licensed to the Company and is protected under relevant intellectual property laws, including the Copyright Act and the Trademarks Act. You are granted a limited, non-exclusive, non-transferable, revocable licence to use the Platform for its intended purpose only.</p>
                  <p><strong>12.2</strong> You may not copy, modify, reverse-engineer, decompile, or create derivative works from the Platform.</p>
                </div>
              </section>

              {/* Section 13 */}
              <section id="sec-13" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">13.</span>
                  <h2 className="text-xl font-display text-white">THIRD-PARTY SERVICES</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  <strong>13.1</strong> The Platform may integrate third-party services (e.g., mapping, payment gateways, SMS providers). We are not responsible for the acts, omissions, or content of third-party service providers, though we will make reasonable efforts to work with reputable providers.
                </p>
              </section>

              {/* Section 14 */}
              <section id="sec-14" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">14.</span>
                  <h2 className="text-xl font-display text-white">LIMITATION OF LIABILITY</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>14.1</strong> To the maximum extent permitted under Nigerian law, the Company shall not be liable for: (a) the acts, omissions, or negligence of Drivers, who act as independent parties; (b) indirect, incidental, special, or consequential damages arising from use of the Platform; (c) loss of property left in a vehicle, delays, or Trip cancellations, except where caused by our proven gross negligence or wilful misconduct.</p>
                  <p><strong>14.2</strong> Our total aggregate liability arising from these Terms, to the extent permitted by law, shall not exceed the total Fares paid by you in the 3 months preceding the claim.</p>
                </div>
              </section>

              {/* Section 15 */}
              <section id="sec-15" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">15.</span>
                  <h2 className="text-xl font-display text-white">INDEMNIFICATION</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  You agree to indemnify and hold harmless the Company, its directors, employees, and agents from any claims, losses, liabilities, and expenses (including reasonable legal fees) arising from your breach of these Terms, violation of applicable law, or misuse of the Platform.
                </p>
              </section>

              {/* Section 16 */}
              <section id="sec-16" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">16.</span>
                  <h2 className="text-xl font-display text-white">SUSPENSION AND TERMINATION</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>16.1</strong> We may suspend or terminate your Account, with or without notice, for violation of these Terms, fraudulent activity, safety concerns, or as required by law or regulatory directive.</p>
                  <p><strong>16.2</strong> You may deactivate your Account at any time by contacting customer support, subject to settlement of any outstanding Fares or obligations.</p>
                </div>
              </section>

              {/* Section 17 */}
              <section id="sec-17" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">17.</span>
                  <h2 className="text-xl font-display text-white">COMPLAINTS AND DISPUTE RESOLUTION</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>17.1 Complaints:</strong> In-app complaints or disputes regarding a Trip, Fare, or User conduct should first be submitted through the Platform's support channel or info@lushride.ng within 3 days of the incident.</p>
                  <p><strong>17.2 Governing Law:</strong> These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.</p>
                  <p><strong>17.3 Dispute Resolution:</strong> Any dispute arising from these Terms that cannot be resolved amicably within 30 days shall be referred to mediation in Lagos, Nigeria, in accordance with the Arbitration and Mediation Act 2023, conducted in English by a sole arbitrator. Nothing in this clause prevents either party from seeking urgent injunctive relief from a competent court.</p>
                </div>
              </section>

              {/* Section 18 */}
              <section id="sec-18" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">18.</span>
                  <h2 className="text-xl font-display text-white">FORCE MAJEURE</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  Neither party shall be liable for failure to perform obligations due to events beyond reasonable control, including strikes, riots, insurrection, fuel scarcity, natural disasters, government action, or network/telecommunications failure.
                </p>
              </section>

              {/* Section 19 */}
              <section id="sec-19" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">19.</span>
                  <h2 className="text-xl font-display text-white">NOTICES</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  Notices under these Terms may be sent via in-app notification, SMS, or email to the contact details provided in your Account and shall be deemed received 24 hours after sending.
                </p>
              </section>

              {/* Section 20 */}
              <section id="sec-20" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">20.</span>
                  <h2 className="text-xl font-display text-white">GENERAL PROVISIONS</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>20.1 Entire Agreement:</strong> These Terms, together with the Privacy Policy and any other referenced policies, constitute the entire agreement between you and the Company.</p>
                  <p><strong>20.2 Severability:</strong> If any provision is found invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
                  <p><strong>20.3 No Waiver:</strong> Failure to enforce any right under these Terms does not constitute a waiver of that right.</p>
                  <p><strong>20.4 Assignment:</strong> You may not assign your rights under these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.</p>
                  <p><strong>20.5 Language:</strong> These Terms are drafted in English, which shall be the governing language in case of translation discrepancies.</p>
                </div>
              </section>

              {/* Section 21 */}
              <section id="sec-21" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">21.</span>
                  <h2 className="text-xl font-display text-white">USER PROVIDED CONTENT</h2>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  The Company may, in its sole discretion, permit you from time to time to submit, upload, publish or otherwise make available to LushRide through the Services textual, audio, and/or visual content and information, including commentary and feedback related to the Services, initiation of support requests, and submission of entries for competitions and promotions (“User Content”). Any User Content provided by you remains your property. However, by providing User Content to the Company, you grant the Company a worldwide, perpetual, irrevocable, transferrable, royalty-free license, with the right to sublicense, to use, copy, modify, create derivative works of, distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels now known or hereafter devised, without further notice to or consent from you, and without the requirement of payment to you or any other person or entity. You agree not to provide User Content that is defamatory, libelous, hateful, violent, obscene, pornographic, unlawful, or otherwise offensive.
                </p>
              </section>

              {/* Section 22 */}
              <section id="sec-22" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">22.</span>
                  <h2 className="text-xl font-display text-white">PLATFORM RESTRICTIONS &amp; ANTI-FRAUD</h2>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-white/90">
                  <p><strong>22.1</strong> You must not use the Platform:</p>
                  <ul className="space-y-2 pl-4 list-none">
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to do anything illegal;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to do anything that violates these Terms or any other Platform rules and LushRide Policies;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>for any purpose not intended by these Terms;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to transfer or sell your account, password or identification to any other party;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to impersonate another person or disguise your identity, or use or attempt to use another User's account;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to solicit others to engage in illegal or dangerous activities;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to stalk, threaten, or harass others;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to upload any content on the Platform which is inaccurate, inappropriate, infringes anyone's rights (such as intellectual property, privacy or personality rights) or is otherwise illegal;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow">●</span> <span>to undermine the Platform's operations or security, or attempt to gain unauthorised access to the Platform or its related systems or networks.</span></li>
                  </ul>
                  <p className="mt-4"><strong>22.2 Anti-Fraud:</strong> Users are prohibited from engaging in any activity that aims to circumvent, bypass, or otherwise avoid the natural functionality, processes, or fees of the Platform. Violating anti-fraud provisions may result in temporary or permanent bans, or other actions, depending on the severity of the infraction.</p>
                </div>
              </section>

              {/* Section 23 Consents */}
              <section id="sec-consents" className="scroll-mt-32 space-y-4 bg-[#0A0A0A] border-2 border-lush-yellow/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lush-yellow/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">23.</span>
                  <h2 className="text-xl font-display text-white">CONSENTS &amp; ACKNOWLEDGMENTS</h2>
                </div>
                <div className="space-y-4 text-xs leading-relaxed text-white/90">
                  <p className="text-white font-medium">By registering an Account or using LushRide Services, you confirm that you:</p>
                  <ul className="space-y-2.5 pl-2 list-none">
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">o</span> <span>Have read and agree to these Rider Terms of Use and the Privacy Policy;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">o</span> <span>Consent to identity verification including NIN validation and facial verification;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">o</span> <span>Consent to the collection and processing of your location/GPS data during trips;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">o</span> <span>Consent to the sharing of necessary trip data between you and Drivers;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">o</span> <span>Consent to receive transactional communications (SMS, push, email, WhatsApp);</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">o</span> <span>Consent (optional) to receive marketing/promotional communications.</span></li>
                  </ul>
                  
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between font-mono text-[11px] text-muted-1 gap-2">
                    <span>LUSHRIDE LIMITED (RC 8924511)</span>
                    <span className="text-lush-yellow">Last updated: 13th July 2026</span>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
