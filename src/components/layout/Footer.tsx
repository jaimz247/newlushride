import { Logo } from "../ui/Logo";

export default function Footer() {
  return (
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
              <div className="flex flex-col items-start pt-2 border-t border-white/10 w-[200px]">
                 <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-1.5 flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lush-yellow text-opacity-80"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Security & Privacy</span>
                 <p className="text-[10px] text-muted-1 leading-snug">ISO 27001 Certified &amp; Vetted Fleet. Armed escort services available upon request.</p>
              </div>
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

          {/* Col 4: Business & Contact */}
          <div>
            <h4 className="text-sm font-display text-white mb-6">For Businesses</h4>
             <ul className="space-y-4 mb-8">
              <li><a href="#corporate" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Corporations</a></li>
              <li><a href="#partner" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Travel Agencies</a></li>
              <li><a href="#corporate" className="text-sm font-light text-muted-1 hover:text-white transition-colors">Events</a></li>
            </ul>
            
            <h4 className="text-sm font-display text-white mb-4">Contact</h4>
            <ul className="space-y-3">
               <li><a href="mailto:info@lushride.com" className="text-sm font-light text-lush-yellow hover:text-white transition-colors">info@lushride.com</a></li>
               <li><a href="mailto:sales@lushride.com" className="text-sm font-light text-lush-yellow hover:text-white transition-colors">sales@lushride.com</a></li>
               <li><a href="tel:+2347037404784" className="text-sm font-light text-lush-yellow hover:text-white transition-colors">+234 703 740 4784</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-1 font-light">
            © {new Date().getFullYear()} LushRide Worldwide. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-xs font-light text-muted-1 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-xs font-light text-muted-1 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-light text-muted-1 hover:text-white transition-colors">Legal Notice</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
