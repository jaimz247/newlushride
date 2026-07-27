import React, { useEffect } from 'react';
import { ShieldCheck, Lock, FileText, Printer, ArrowLeft, Building2, Mail, Shield, CheckCircle2, UserCheck, AlertTriangle, KeyRound } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import SEOHead from '../ui/SEOHead';

export default function SecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        title="Security & Privacy Statement | LushRide Executive Transport" 
        description="LushRide Security Policy & Compliance. ISO 27001 Certified ISMS, vetted executive chauffeurs, B6 armor suite options, and mobile police escort detachments." 
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
              <span className="text-lush-yellow font-semibold">Security &amp; ISO Certification</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-lush-yellow/10 border border-lush-yellow/30 rounded-full text-lush-yellow text-[11px] font-mono tracking-widest uppercase mb-4">
                  <ShieldCheck size={13} /> ISO 27001 Certified Infrastructure
                </div>
                <h1 className="text-3xl md:text-5xl font-display text-white tracking-tight">
                  SECURITY &amp; PRIVACY SAFEGUARDS
                </h1>
                <p className="text-muted-1 font-light text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
                  Uncompromising protection, vetted personnel, encrypted telemetry, and executive armed escort protocols.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handlePrint}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs uppercase tracking-widest font-medium rounded transition-all flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <Printer size={15} /> Print Statement
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Overview Cards */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-lush-yellow/30 transition-all">
              <div className="w-12 h-12 bg-lush-yellow/10 rounded-xl flex items-center justify-center text-lush-yellow">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-display text-white">ISO 27001 Certified</h3>
              <p className="text-xs text-muted-1 leading-relaxed">
                Adherence to ISO/IEC 27001 standards for information security management systems (ISMS). Personal itineraries and encrypted telemetry are safeguarded under strict NDPA standards.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-lush-yellow/30 transition-all">
              <div className="w-12 h-12 bg-lush-yellow/10 rounded-xl flex items-center justify-center text-lush-yellow">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-display text-white">Vetted Fleet &amp; Chauffeurs</h3>
              <p className="text-xs text-muted-1 leading-relaxed">
                Pre and post-trip mechanical and security sweeps. Chauffeurs undergo biometric checks, defensive driving maneuvers, and strict Non-Disclosure Agreements (NDAs).
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-lush-yellow/30 transition-all">
              <div className="w-12 h-12 bg-lush-yellow/10 rounded-xl flex items-center justify-center text-lush-yellow">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-display text-white">Executive Escort Units</h3>
              <p className="text-xs text-muted-1 leading-relaxed">
                Bespoke mobile escort units and MOPOL (Mobile Police) detachments. Advance risk assessment and route clearance for high-profile diplomats and corporate executives.
              </p>
            </div>
          </div>

          {/* Deep Security Provisions */}
          <div className="bg-[#080808] border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl font-display text-white">Comprehensive Security Operational Standards</h2>
              <p className="text-xs text-lush-yellow font-mono uppercase tracking-widest mt-1">LushRide Risk Management &amp; Data Security Protocol</p>
            </div>

            <div className="space-y-6 text-sm text-muted-1 leading-relaxed">
              <div className="flex gap-4">
                <div className="mt-1 text-lush-yellow shrink-0"><KeyRound size={20} /></div>
                <div>
                  <h4 className="text-base text-white font-semibold mb-1">End-to-End Encryption &amp; Payment Safeguards</h4>
                  <p className="text-xs">
                    All payment transaction tokens are processed via PCI-DSS Level 1 compliant gateways (Paystack Payments Limited). Raw credit card numbers and banking PINs are never stored on LushRide servers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 text-lush-yellow shrink-0"><Lock size={20} /></div>
                <div>
                  <h4 className="text-base text-white font-semibold mb-1">B6 Armored Fleet Capabilities</h4>
                  <p className="text-xs">
                    Our Lush Royale tier provides options for B6-level armored Toyota Land Cruiser Prado vehicles. Equipped with run-flat emergency tire systems, reinforced ballistic glass, and PA emergency sirens.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 text-lush-yellow shrink-0"><AlertTriangle size={20} /></div>
                <div>
                  <h4 className="text-base text-white font-semibold mb-1">Incident Reporting &amp; Rapid Emergency Response</h4>
                  <p className="text-xs">
                    The LushRide app features a direct 24/7 in-app emergency SOS button linked directly to our central security dispatch hub in Victoria Island, Lagos. Real-time GPS tracking permits immediate dispatch of armed support units if requested.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-1 font-mono gap-4">
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-lush-yellow" />
                <span>LushRide Limited Legal Security Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-lush-yellow" />
                <a href="mailto:info@lushride.ng" className="text-white hover:text-lush-yellow transition-colors">info@lushride.ng</a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
