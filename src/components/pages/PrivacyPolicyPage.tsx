import React, { useState, useEffect } from 'react';
import { Shield, Printer, ArrowLeft, Search, CheckCircle2, FileText, Lock, Building2, Mail, ExternalLink, Scale } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import SEOHead from '../ui/SEOHead';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>('sec-1');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'sec-1', number: '1', title: 'Protected Personal Information' },
    { id: 'sec-2', number: '2', title: 'Information Provided Directly by You' },
    { id: 'sec-3', number: '3', title: 'Information Collected Through Your Use' },
    { id: 'sec-4', number: '4', title: 'Information Collected from Third-Party Sources' },
    { id: 'sec-5', number: '5', title: 'Protective Measures We Use' },
    { id: 'sec-6', number: '6', title: 'Legal Basis and Reasons for Processing' },
    { id: 'sec-7', number: '7', title: 'How We Use the Information We Collect' },
    { id: 'sec-8', number: '8', title: 'How We Disclose Information We Collect' },
    { id: 'sec-9', number: '9', title: 'Aggregated Data' },
    { id: 'sec-10', number: '10', title: 'Sharing Information with Law Enforcement' },
    { id: 'sec-11', number: '11', title: 'Social Media Sharing' },
    { id: 'sec-12', number: '12', title: 'Advertising and Analytic Services' },
    { id: 'sec-13', number: '13', title: 'Links to Third-Party Websites' },
    { id: 'sec-14', number: '14', title: 'International Privacy Practices' },
    { id: 'sec-15', number: '15', title: 'Account Information' },
    { id: 'sec-16', number: '16', title: 'Promotional Information Opt Out' },
    { id: 'sec-17', number: '17', title: 'Your Access and Rights to Personal Information' },
    { id: 'sec-18', number: '18', title: 'Violation of Privacy' },
    { id: 'sec-19', number: '19', title: 'Our Information Retention Policy' },
    { id: 'sec-20', number: '20', title: 'Contact Us' },
    { id: 'sec-21', number: '21', title: 'Consent' },
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
        title="Privacy Policy | LushRide Executive Transport" 
        description="Official Privacy Policy for LushRide Limited. Learn how we protect your personal data, PPI, geolocation, and payment information under NDPA." 
      />
      <Navbar />

      <main className="pt-28 pb-24">
        {/* Top Hero Banner */}
        <div className="relative bg-[#050505] border-b border-white/10 py-16 overflow-hidden">
          {/* Subtle gold mesh accent */}
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
              <span className="text-lush-yellow font-semibold">Privacy Policy</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lush-yellow/10 border border-lush-yellow/30 rounded-full text-lush-yellow text-[11px] font-mono tracking-widest uppercase mb-4">
                  <Shield size={13} /> Official Legal Binding Document
                </div>
                <h1 className="text-3xl md:text-5xl font-display text-white tracking-tight">
                  LUSHRIDE Privacy Policy
                </h1>
                <p className="text-muted-1 font-light text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                  LushRide Limited (“LushRide”) Data Protection, Safeguards, and User Privacy Standard.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Last Updated</p>
                  <p className="text-xs text-lush-yellow font-mono font-semibold">25th July 2026</p>
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
                    <FileText size={16} className="text-lush-yellow" />
                    <span>Table of Contents</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">21 Clauses</span>
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
                    <span>LushRide Limited</span>
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
              
              {/* Document Overview Header */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                <p className="text-white text-base md:text-lg leading-relaxed font-light">
                  LushRide Limited (“LushRide”) is the owner and operator of LushRide Limited software and any other software, online platform, website, mobile or tablet application or domains used to provide our services (together with the Website, referred to as the “Services"). LushRide respects the privacy of your personal data and makes every effort to ensure your information is protected and remains private. We have provided this Privacy Policy to explain how we collect, use, share, disclose and protect personal information about the Users of our Website and Services hereafter referred to as “user”, “you” or "your".
                </p>
                <p className="text-white/80 text-xs leading-relaxed pt-2 border-t border-white/10">
                  We may change this Privacy Policy from time to time. If we decide to change this Privacy Policy, we will inform you by posting the revised Privacy Policy on the Website, unless otherwise required by law to communicate through a different means.
                </p>
              </div>

              {/* Clause 1 */}
              <section id="sec-1" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">1.</span>
                  <h2 className="text-xl font-display text-white">Protected Personal Information</h2>
                </div>
                <p className="text-white/90">
                  “Protected Personal Information” or “PPI” is information about users, including information that can reasonably be used to identify you and that relates to your past, present or future activities, and/or the provision of our services to you. LushRide provides its services to individuals and groups and when we process PPI on behalf of such people, we are acting as a “Processor” to them. Therefore, LushRide has adopted and maintains appropriate physical, technical, administrative, and organisational procedures to safeguard and secure the Protected Personal Information we process. We shall not access, use, or disclose Protected Personal Information except as permitted by you, and/or applicable law. LushRide strives to protect the privacy of the Protected Personal Information it processes, and to avoid inadvertent disclosure.
                </p>
              </section>

              {/* Clause 2 */}
              <section id="sec-2" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">2.</span>
                  <h2 className="text-xl font-display text-white">Information Provided Directly by You</h2>
                </div>
                <p className="text-white/90">
                  We may collect certain information about you provided directly to us, such as when you request information, create, modify or lodge a complaint, complete a LushRide Online form, survey, questionnaire or application, contact customer support, enter into a service provider agreement, make a purchase, join or enroll for an event or otherwise communicate with us in any manner. This information may include, without limitation: name, date of birth, e-mail address, login name and password, home or work address, phone number, profile picture, saved favourite locations, preferences and settings related to the account, or any other personal information you choose to provide.
                </p>
                <p className="text-white/90">
                  We collect details of your payment methods including payment card type, bank name, bank account number, related payment verification information and transaction history on the platform. We collect identification documents including government-issued or national identity documents (such as passports, driver’s licences or national ID cards) and photographs/pictures you submit yourself. We also collect demographic data such as your age and gender.
                </p>
              </section>

              {/* Clause 3 */}
              <section id="sec-3" className="scroll-mt-32 space-y-6 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">3.</span>
                  <h2 className="text-xl font-display text-white">Information Collected Through Your Use of Our Services</h2>
                </div>
                <p className="text-white/90">
                  We may collect certain information about you, your activity on our Website and your computer or device when using our Services. These include:
                </p>

                <div className="space-y-4 pl-4 border-l-2 border-lush-yellow/40">
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">Geolocation Data</h3>
                    <p className="text-xs text-muted-1 leading-relaxed">
                      We collect data about your precise and/or approximate geolocation (including GPS, and IP address) from your mobile device depending on your app settings and device permissions, when you open and use LushRide.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">App Usage Data</h3>
                    <p className="text-xs text-muted-1 leading-relaxed">
                      This includes: details of journeys (date and time, pick-up and drop-off addresses, journey distances and routes), payment history (including whether you used any coupons or promotional codes), cancellation history, dates and times you log-in and log-off the LushRide app and app features or pages viewed, browser type, app crashes and other system activity.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">Communication Data</h3>
                    <p className="text-xs text-muted-1 leading-relaxed">
                      We collect communication and correspondence data when you engage with our Customer Support Team via the in-app chat function, report an incident, communicate via emails, web forms, or speak with our Customer Support agents, or communicate with Drivers via the LushRide app using the in-app chat function or via internet calls (where available).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">User Generated Data</h3>
                    <p className="text-xs text-muted-1 leading-relaxed">
                      We collect personal data when you use certain features. For example to provide recordings such as audio recordings generated during the trip (as part of our safety toolkit trip audio recording feature, where such feature is available, or feedback about other users, including compliments that you have the option to give to Drivers, when you finish your ride, along with a 5 star review.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">Device Data</h3>
                    <p className="text-xs text-muted-1 leading-relaxed">
                      We collect data about the devices you use to access the LushRide App, including the hardware model, device IP address and other unique device identifiers, device operating system, browser version, device vendor name, app version, identity of carrier and manufacturer and preferred languages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">Calendar Data</h3>
                    <p className="text-xs text-muted-1 leading-relaxed">
                      If you set your device permissions or choose to give LushRide access to your chosen calendar, we will collect information available in your calendar such as event details to use in providing you certain optional features.
                    </p>
                  </div>
                </div>

                <p className="text-white/80 text-xs">
                  We also automatically collect information via the Website or Service using various technologies, including, but not limited to Cookies and Web Beacons. We may collect your IP address, location, browsing behaviour and device IDs. This information is used by us to enable us to better understand how our Services are being used by visitors and allows us to administer and customise the Services to improve your overall experience.
                </p>
              </section>

              {/* Clause 4 */}
              <section id="sec-4" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">4.</span>
                  <h2 className="text-xl font-display text-white">Information Collected from Third-Party Sources</h2>
                </div>
                <p className="text-white/90">
                  We may also receive information about you from publicly and commercially available sources, as permitted by applicable law, which we may combine with other information we collect through our Services. For example, if you make a complaint to us about your safety, we can conduct a public search on available personal information about you that is exposing you to security risks or if you engage with a separate App or Website that uses our API, or whose API we use, we may receive information about you or your connections from that Website or App. This includes, without limitation, profile information, profile picture, gender, username, user ID associated with your social media account, age range, language, country, friends list, your contact names, e-mail addresses, phone numbers, identifiers and any other information you permit the social network to share with third parties. The data we receive is solely dependent upon your privacy settings with the social network.
                </p>
              </section>

              {/* Clause 5 */}
              <section id="sec-5" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">5.</span>
                  <h2 className="text-xl font-display text-white">Protective Measures We Use</h2>
                </div>
                <p className="text-white/90">
                  We have put in place physical, technical and administrative measures that are intended to help protect your information in our possession against loss, theft, misuse, unauthorised access, disclosure and alteration. Some of the safeguards we use are firewalls and data encryption, physical access controls to our data centres, and information access authorisation controls. Although we take measures to secure your information, we do not promise, and you should not expect, that your personal information, or searches, or other information will always remain secure. We cannot guarantee the security of our information storage, nor can we guarantee that the information you supply will not be intercepted while being transmitted to and from us over the Internet including, without limitation, email and text transmissions. If any information under our control is compromised as a result of a breach of security, we will take reasonable steps to investigate the situation and notify those individuals whose information may have been compromised and take other steps, in accordance with any applicable jurisdictional laws and regulations.
                </p>
              </section>

              {/* Clause 6 */}
              <section id="sec-6" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">6.</span>
                  <h2 className="text-xl font-display text-white">The Legal Basis and Reasons for Collection and Processing Your Personal Information</h2>
                </div>
                <p className="text-white/90">
                  The legal basis upon which we rely for the collection and processing of your Personal Information is the following:
                </p>
                <ul className="space-y-3 pl-2 list-none text-xs leading-relaxed text-white/90">
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">a.</span>
                    <span>When signing up to use our Services, you have given us explicit consent allowing LushRide to provide you with our Services and generally to process your information, in accordance with this Privacy Policy; and the transfer of your data to other jurisdictions as may be required in accordance with applicable law;</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">b.</span>
                    <span>It is necessary for entering into, or performing, the obligations of a contract between you and LushRide, including, without limitation, the Terms of Service agreement which may be accessed by you, or a customer’s Service Agreement;</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">c.</span>
                    <span>It is necessary to register you as a user, manage your account and profile, and authenticate you when you log in.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">d.</span>
                    <span>It is necessary for our legitimate interests in the proper administration of our Website, our Service and our business; analysing the use of the website and our Services; assuring the security of our website and Services; maintaining back-ups of our databases; and communicating with you;</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">e.</span>
                    <span>To resolve technical issues you encounter, to respond to your requests for assistance, comments and questions, to analyse crash information, to repair and improve the Services and provide other customer support.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">f.</span>
                    <span>To send communications via email and within the Services, including, for example, responding to your comments, questions and requests, providing customer support, and sending you technical notices, product updates, security alerts, and administrative, billing, and account management-related messages.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">g.</span>
                    <span>To send promotional communications that you have consented to receive or have expressed a legitimate interest in receiving.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">h.</span>
                    <span>It is necessary for our legitimate interests in the protection and assertion of our legal rights, and the legal rights of others, including you.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">i.</span>
                    <span>It is necessary for our compliance with certain legal provisions which may require us to process your personal data. By way of example, and without limitation, we may be required by law to disclose your personal data to law enforcement or a regulatory agency.</span>
                  </li>
                </ul>
              </section>

              {/* Clause 7 */}
              <section id="sec-7" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">7.</span>
                  <h2 className="text-xl font-display text-white">How We Use the Information We Collect</h2>
                </div>
                <p className="text-white/90">
                  Our primary purpose in collecting, holding, using and disclosing your Information is for our legitimate business purposes and to provide you with a safe, smooth, efficient, and customised experience while using the Service. Particularly, the information collected is used to identify users based on their location and demographics. This helps us to optimise our Services to meet specific needs of these users.
                </p>
                <p className="text-white font-medium text-xs uppercase tracking-wider mt-4">We will use this information in order to:</p>
                <ul className="space-y-2.5 pl-2 list-none text-xs text-white/90">
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">a.</span> <span>Provide users with our Services and Customer Support including but not limited to verifying your account and for informational and operational purposes, such as account management or system maintenance.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">b.</span> <span>Protect your safety online.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">c.</span> <span>Contact you and provide you with important notices.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">d.</span> <span>Analyse, improve and manage our Services and operations.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">e.</span> <span>Resolve problems and disputes and engage in other legal and security matters.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">f.</span> <span>Detect and prevent fraud, abuse and other security incidents.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">g.</span> <span>Enforce our Terms of Service and any terms and conditions of any other agreements for our Services.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">h.</span> <span>Build new services and other purposes as deemed necessary by LushRide upon notification to you.</span></li>
                </ul>

                <p className="text-white font-medium text-xs uppercase tracking-wider mt-6">Additionally, we may use the information we collect about you to:</p>
                <ul className="space-y-2.5 pl-2 list-none text-xs text-white/90">
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">a.</span> <span>Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events of LushRide and other companies, where permissible and according to local applicable laws.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">b.</span> <span>Display advertising, including advertising that is targeted to you or other users based on your location, interests, as well as your activities on our Services.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">c.</span> <span>Verify your identity and prevent impersonation, spam or other unauthorised or illegal activity.</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">d.</span> <span>Provide after-sales services to you.</span></li>
                </ul>
              </section>

              {/* Clause 8 */}
              <section id="sec-8" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">8.</span>
                  <h2 className="text-xl font-display text-white">How We Disclose Information We Collect</h2>
                </div>
                <p className="text-white/90">
                  a. We may disclose the information we collect about you as described in this Privacy Policy or as described at the time of collection or sharing, including as follows:
                </p>
                <ul className="space-y-3 pl-2 list-none text-xs text-white/90">
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">i)</span> <span>With third-party Service Providers that provide a variety of services on our behalf. For example, we may rely on service providers to provide web analytics, data processing, advertising, email distribution and other services; These service providers are obligated by contract to protect the confidentiality, integrity and security of the information we share with them;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">ii)</span> <span>With the general public if you submit content to a part of our Services that is viewable by the general public, such as a forum or community area;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">iii)</span> <span>With third parties with whom you choose to let us share information, for example other websites or apps that integrate with our API or Services, or those with an API or Service with which we integrate;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">iv)</span> <span>With current and future LushRide subsidiaries and affiliated entities that provide services, including payment processing services or conduct data processing on our behalf, or for data verification, data centralisation and/or logistics purposes;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">v)</span> <span>With affiliated entities that provide payment processing services on our behalf;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">vi)</span> <span>With vendors, consultants, marketing partners, and other service providers who need access to such information to carry out work on our behalf;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">vii)</span> <span>In response to a request for information by a competent authority, if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">viii)</span> <span>With law enforcement officials, government authorities, or other third parties if we believe your actions are inconsistent with our Terms of Service, or policies, or to protect the rights, property, or safety of LushRide or others;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">ix)</span> <span>In connection with, or during negotiations of, any merger, sale of company assets, consolidation or restructuring, financing, or acquisition of all or a portion of our business by or into another company;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">x)</span> <span>If we otherwise notify you and you consent to the sharing;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">xi)</span> <span>In an aggregated and/or de-identified form which cannot reasonably be used to identify you; and</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">xii)</span> <span>To enforce our Terms of Service, this Privacy Policy, and any other applicable agreements, or protect our legal rights.</span></li>
                </ul>
              </section>

              {/* Clause 9 */}
              <section id="sec-9" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">9.</span>
                  <h2 className="text-xl font-display text-white">Aggregated Data</h2>
                </div>
                <p className="text-white/90">
                  Aggregated Data is de-identified or anonymised and does not constitute Personal Data as this data does not directly or indirectly reveal you, or the user or the user’s customers identity. We may collect, use and share Aggregated Data such as statistical or demographic data for any purpose including, without limitation, research, security risk assessment, penetration testing, vulnerability testing, education, analysing usage trends and patterns, improving our Services and business operations, evaluating the performance of the LushRide Service and measuring the effectiveness of our content, and Service components. We may receive compensation in exchange for sharing de-identified or anonymised Aggregated Data which shall be for the account of LushRide.
                </p>
              </section>

              {/* Clause 10 */}
              <section id="sec-10" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">10.</span>
                  <h2 className="text-xl font-display text-white">Sharing Information with Law Enforcement</h2>
                </div>
                <p className="text-white/90">
                  LushRide is committed to cooperating with law enforcement while respecting everyone’s right to privacy. If we receive a request for user account information from a government agency investigating security incidents, we will review the request to be certain that it satisfies all legal requirements before releasing information to the requesting agency.
                </p>
              </section>

              {/* Clause 11 */}
              <section id="sec-11" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">11.</span>
                  <h2 className="text-xl font-display text-white">Social Media Sharing</h2>
                </div>
                <ul className="space-y-3 pl-2 list-none text-xs text-white/90">
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">a.</span>
                    <span>Our Services may now or in the future integrate with social sharing features and other related tools which let you share actions you take on our Services with other Apps, sites, or media, and vice versa, depending on the settings you establish with the social sharing service. Please refer to the privacy policies of those social sharing services for more information about how they handle the data you provide to or share through them.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">b.</span>
                    <span>Any information or content that you voluntarily disclose for posting publicly to a social sharing service becomes available to the public, as controlled by any applicable privacy settings that you set with the social sharing service. Once you have shared User Content or made it public, that User Content may be re-shared by others. If you remove information that you posted to the social sharing service, copies may still remain viewable in cached and archived pages, or if other users or third parties, using the social sharing service, have re-shared, copied or saved that User Content.</span>
                  </li>
                </ul>
              </section>

              {/* Clause 12 */}
              <section id="sec-12" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">12.</span>
                  <h2 className="text-xl font-display text-white">Advertising and Analytic Services Provided by Others</h2>
                </div>
                <p className="text-white/90">
                  We and third parties that provide content or functionality on the Services or provide us analytics and advertising services collect or receive information about your use of the Services and other websites or mobile applications, including through the use of Cookies, Web Beacons, software development kits (SDKs), and other technologies to identify your device when you visit our Website and use our Services, as well as when you visit other online sites and services. This information may include, for example, your IP address, browser, device information, pages viewed, time spent on pages, links clicked and conversion information. This information may be combined with information collected across different websites, online services, and linked or associated devices to, among other things, analyse and track data, determine the popularity of certain content, deliver advertising and content targeted to your interests, and better understand your online activity.
                </p>
              </section>

              {/* Clause 13 */}
              <section id="sec-13" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">13.</span>
                  <h2 className="text-xl font-display text-white">Links to Third-Party Websites</h2>
                </div>
                <ul className="space-y-3 pl-2 list-none text-xs text-white/90">
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">a.</span>
                    <span>Our Services, as well as the email messages sent with respect to our Services, may contain links or access to websites and services operated by third parties that are beyond our control. Links or access to third parties from our Services are not an endorsement by us of such third parties, or their websites, applications, products, services, or practices. We are not responsible for the security or privacy policy, terms, and conditions, practices or the content of such third parties. These third parties may send their own Cookies to you and independently collect data.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-lush-yellow font-bold shrink-0">b.</span>
                    <span>If you visit or access a third-party Website, application or other property that is linked or accessed from our Services, we encourage you to read any privacy policies and terms and conditions of that third party before providing any personally identifiable information. If you have a question about the terms and conditions, privacy policy, practices or contents of a third party, please contact the third party directly.</span>
                  </li>
                </ul>
              </section>

              {/* Clause 14 */}
              <section id="sec-14" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">14.</span>
                  <h2 className="text-xl font-display text-white">International Privacy Practices</h2>
                </div>
                <p className="text-white/90">
                  Where we need to transfer your Personal Data to another country, we will take all reasonable steps to ensure that any such transfers comply with applicable laws. We will take all steps necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organisation or a country unless there are sufficient controls in place including the security of Your data. We would also ensure your data is transferred outside the country with appropriate safeguard in compliance with the applicable law.
                </p>
              </section>

              {/* Clause 15 */}
              <section id="sec-15" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">15.</span>
                  <h2 className="text-xl font-display text-white">Account Information</h2>
                </div>
                <p className="text-white/90">
                  You may access or modify your account information at any time by logging into your online account. Please note that in some cases we may retain certain information about you as required by law, or for legitimate business purposes, to the extent permitted by law.
                </p>
              </section>

              {/* Clause 16 */}
              <section id="sec-16" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">16.</span>
                  <h2 className="text-xl font-display text-white">Promotional Information Opt Out</h2>
                </div>
                <p className="text-white/90">
                  You may opt out of receiving promotional messages from us at any time by following the instructions in those messages sent to you or by contacting us at any time using the Contact Us information at the end of this Privacy Policy. If you opt out, we may still send you non-promotional communications, such as those related to your account, or use of our products and Services.
                </p>
              </section>

              {/* Clause 17 */}
              <section id="sec-17" className="scroll-mt-32 space-y-6 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">17.</span>
                  <h2 className="text-xl font-display text-white">Your Access and Rights to Your Personal Information</h2>
                </div>
                <p className="text-white/90">
                  You have certain rights in relation to Personal Information we hold about you. You can exercise any of the following rights by contacting us using any of the methods in the Contact section below. We may need to request specific information from you to help us confirm your identity and ensure your right to access your Personal Data (or to exercise any of your other rights). This is a security measure to ensure that Personal Data is not disclosed to any person who has no right to receive it. We try to respond to all legitimate requests within one month. Occasionally, it may take us longer than a month if your request is particularly complex or you have made several requests. In this case, we will notify you and keep you updated. Your rights include:
                </p>

                <div className="space-y-4 text-xs text-white/90 pl-2">
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                    <span className="text-lush-yellow font-bold">a. Right to Access Your Personal Data</span>
                    <p className="leading-relaxed">
                      You have the right to access information held about you for the purpose of viewing and in certain cases updating or deleting such information. Furthermore, if you prefer that LushRide does not share certain information as described in this Privacy Policy, you can direct us not to share that information. We will comply with an individual’s requests regarding access, correction, sharing, and/or deletion of the personal data we store in accordance with applicable law. To make changes to your account affecting your personal information contact us at the email address in our Contact section below. For any deletion, non-sharing or update request, we will make the changes as soon as practicable, however, this information may stay in our backup files. If we cannot make the changes you want, we will let you know and explain why.
                    </p>
                  </div>

                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                    <span className="text-lush-yellow font-bold">b. Right of Correction or Completion of Your Personal Data</span>
                    <p className="leading-relaxed">
                      If the personal information we hold about you is not accurate, out of date or incomplete, you have a right to have the data corrected or completed. To make corrections to your account please contact us at the email address in our Contact section below.
                    </p>
                  </div>

                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                    <span className="text-lush-yellow font-bold">c. Right of Erasure or Deletion of Your Personal Data</span>
                    <p className="leading-relaxed">
                      In certain circumstances, you have the right to request that personal information we hold about you is deleted. If we cannot delete the information you want, we will let you know and explain why. To request information deletion please contact us at the email address in our Contact section below.
                    </p>
                  </div>

                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                    <span className="text-lush-yellow font-bold">d. Right to Object to or Restrict Processing of Your Personal Data</span>
                    <p className="leading-relaxed">
                      In certain circumstances, you have the right to object to our processing of your personal information. For example, you have the right to object to use of your personal information for direct marketing purposes. Similarly, you have the right to object to use of your personal information if we are processing your information based on legitimate interests and there are no compelling legitimate grounds for our processing which supersede your rights and interests. You may also have the right to restrict our use of your personal information, such as in circumstances where you have challenged the accuracy of the information and during the period where we are verifying its accuracy. To object to or restrict processing please contact us at the email address in our Contact section below.
                    </p>
                  </div>

                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                    <span className="text-lush-yellow font-bold">e. Right to Data Portability or Transfer of Your Personal Data</span>
                    <p className="leading-relaxed">
                      You have the right to be provided with a copy of the information we maintain about you in a structured, machine-readable and commonly used format. To receive a copy of the information we maintain about you and to request for a transfer of your personal to a third-party (e.g. another company which you have dealings with) in a structured, commonly used and machine-readable format please contact us at the email address in our Contact section below.
                    </p>
                  </div>

                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                    <span className="text-lush-yellow font-bold">f. Right to Withdrawal of Consent</span>
                    <p className="leading-relaxed">
                      If you have given your consent to us to process and share your Personal Information after we have requested it, you have the right to withdraw your consent at any time. To withdraw your consent please contact us at the email address in our Contact section below.
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 list-none">
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">g.</span> <span>Right to ask us for a copy of the safeguards under which personal data is transferred outside of Nigeria;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">h.</span> <span>Right not to be subject to decisions based solely on automated processing, including profiling, except where necessary for entering into, or performing, a contract with LushRide; it is based on your explicit consent and is subject to safeguards; or is authorised by law and is also subject to safeguards;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">i.</span> <span>Right to prevent processing that is likely to cause damage or distress to you or anyone else;</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">j.</span> <span>Right to be notified of a personal data breach which is likely to result in high risks to your rights and freedoms; and</span></li>
                    <li className="flex gap-2"><span className="text-lush-yellow font-bold">k.</span> <span>Right to make a complaint to the Nigeria Data Protection Commission or any other regulatory body.</span></li>
                  </ul>
                </div>

                <p className="text-xs text-white/80 bg-white/5 p-4 rounded-xl border border-white/10">
                  Where you have submitted a complaint, we will endeavour to resolve such feedback/query within thirty (30) days from the date of receipt. In the event that we are unable to resolve it before the expiration of the aforementioned timeline, we shall inform you about the extension of time needed to resolve such.
                </p>
              </section>

              {/* Clause 18 */}
              <section id="sec-18" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">18.</span>
                  <h2 className="text-xl font-display text-white">Violation of Privacy</h2>
                </div>
                <p className="text-white/90">
                  We have put in place procedures to deal with any suspected personal data breach and will notify you of any personal data breach and let you know the steps we have taken to remedy the breach and the security measures we have applied to render your personal data unintelligible.
                </p>
                <p className="text-white/90">
                  We will endeavour to remedy all suspected breaches of personal data within [thirty (30) days] from the date of the report of the breach.
                </p>
                <p className="text-white/90">
                  If you know or suspect that a personal data breach has occurred, you should immediately contact the LushRide team at <a href="mailto:info@lushride.ng" className="text-lush-yellow underline font-mono">info@lushride.ng</a>
                </p>
                <p className="text-white/90 font-medium text-xs uppercase tracking-wider mt-4">LushRide will not be responsible for any personal data breach which occurs as a result of:</p>
                <ul className="space-y-2 pl-2 list-none text-xs text-white/90">
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">a.</span> <span>an event which is beyond the control of LushRide;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">b.</span> <span>an act or threat of terrorism;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">c.</span> <span>an act of God (such as, but not limited to, fires, explosions, earthquakes, drought, tidal waves and floods) which compromises LushRide’s data protection measures;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">d.</span> <span>war, hostilities (whether war be declared or not), invasion, act of foreign enemies, mobilisation, requisition, or embargo;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">e.</span> <span>rebellion, revolution, insurrection, military or usurped power, or civil war which compromises LushRide’s data protection measures;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">f.</span> <span>pandemics or epidemics;</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">g.</span> <span>the transfer of your personal data to a third party on your instructions; and</span></li>
                  <li className="flex gap-2"><span className="text-lush-yellow font-bold shrink-0">h.</span> <span>the use of your personal data by a third party designated by you.</span></li>
                </ul>
              </section>

              {/* Clause 19 */}
              <section id="sec-19" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">19.</span>
                  <h2 className="text-xl font-display text-white">Our Information Retention Policy</h2>
                </div>
                <p className="text-white/90">
                  Unless you request that we delete certain information, we retain the information we collect for as long as your account is active or as needed to provide you services. Following termination or deactivation of your account, we will retain information for at least 1 year or for as long as needed for our legal purposes in accordance with applicable law. We will only retain your Personal Data for as long as we reasonably need to unless a longer retention period is required by law (for example for regulatory purposes). We will also retain your personal data to comply with a legal obligation.
                </p>
              </section>

              {/* Clause 20 */}
              <section id="sec-20" className="scroll-mt-32 space-y-4 bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">20.</span>
                  <h2 className="text-xl font-display text-white">Contact Us</h2>
                </div>
                <p className="text-white/90">
                  If you have any questions or if you would like to contact us about our processing of your personal information, including exercising your rights as outlined above, please contact us at <a href="mailto:info@lushride.ng" className="text-lush-yellow underline font-mono">info@lushride.ng</a>. When you contact us, we will ask you to verify your identity.
                </p>
              </section>

              {/* Clause 21 */}
              <section id="sec-21" className="scroll-mt-32 space-y-4 bg-[#0A0A0A] border-2 border-lush-yellow/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lush-yellow/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-lush-yellow font-mono font-bold text-lg">21.</span>
                  <h2 className="text-xl font-display text-white">Consent</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white font-medium text-base">
                    I confirm that I have read and understood this Privacy Policy and I consent to the processing of my Personal Data by LushRide in line with the terms of the Privacy Policy.
                  </p>
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-muted-1 gap-2">
                    <span>LUSHRIDE LIMITED (RC 8924511)</span>
                    <span className="text-lush-yellow">Last updated: 25th July 2026</span>
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
