import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Fleet from './components/sections/Fleet';
import Hubs from './components/sections/Hubs';
import LushAcademy from './components/sections/LushAcademy';
import Trust from './components/sections/Trust';
import Corporate from './components/sections/Corporate';
import Partner from './components/sections/Partner';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import QuickEnquiryButton from './components/ui/QuickEnquiryButton';
import Accolades from './components/sections/Accolades';
import WhatsAppButton from './components/ui/WhatsAppButton';
import OurImpact from './components/sections/OurImpact';
import ServiceAreas from './components/sections/ServiceAreas';
import AppDownload from './components/sections/AppDownload';
import FAQ from './components/sections/FAQ';
import { Toaster } from 'sonner';

function Divider() {
  return <div className="w-full h-px bg-white/10" />;
}

export default function App() {
  return (
    <div className="bg-theme min-h-screen text-white selection:bg-white selection:text-charcoal cursor-auto md:cursor-none transition-colors duration-500">
      <ScrollProgress />
      <CustomCursor />
      <QuickEnquiryButton />
      <Toaster position="bottom-center" />
      <Navbar />
      <WhatsAppButton />
      <main>
        <Hero />
        <Divider />
        <Accolades />
        <Divider />
        <Experience />
        <Divider />
        <OurImpact />
        <Divider />
        <Fleet />
        <Divider />
        <Hubs />
        <Divider />
        <ServiceAreas />
        <Divider />
        <LushAcademy />
        <Divider />
        <AppDownload />
        <Divider />
        <Trust />
        <Divider />
        <Corporate />
        <Divider />
        <Partner />
        <Divider />
        <FAQ />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
