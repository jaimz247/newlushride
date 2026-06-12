import React, { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import WhatsAppButton from './components/ui/WhatsAppButton';
import { Toaster } from 'sonner';
import { Helmet } from 'react-helmet-async';

const Hero = lazy(() => import('./components/sections/Hero'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Fleet = lazy(() => import('./components/sections/Fleet'));
const Hubs = lazy(() => import('./components/sections/Hubs'));
const LushAcademy = lazy(() => import('./components/sections/LushAcademy'));
const Trust = lazy(() => import('./components/sections/Trust'));
const Corporate = lazy(() => import('./components/sections/Corporate'));
const Partner = lazy(() => import('./components/sections/Partner'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Accolades = lazy(() => import('./components/sections/Accolades'));
const OurImpact = lazy(() => import('./components/sections/OurImpact'));
const ServiceAreas = lazy(() => import('./components/sections/ServiceAreas'));
const AppDownload = lazy(() => import('./components/sections/AppDownload'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const Insights = lazy(() => import('./components/sections/Insights'));
const Waitlist = lazy(() => import('./components/sections/Waitlist'));
const AdminDashboard = lazy(() => import('./components/sections/AdminDashboard'));

function Divider() {
  return <div className="w-full h-px bg-white/10" />;
}

const GenericFallback = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-lush-yellow border-t-transparent animate-spin rounded-full"></div>
  </div>
);

const FleetSkeleton = () => (
  <section className="py-32 bg-theme">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="w-2/3 h-12 bg-white/5 animate-pulse rounded-md mb-6"></div>
      <div className="w-1/2 h-4 bg-white/5 animate-pulse rounded-md mb-16"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 h-96 flex flex-col animate-pulse">
            <div className="w-full aspect-[16/10] bg-white/5 rounded-lg mb-6"></div>
            <div className="w-1/2 h-6 bg-white/5 rounded mb-2"></div>
            <div className="w-1/3 h-4 bg-white/5 rounded mb-4"></div>
            <div className="mt-auto grid grid-cols-3 gap-4">
               <div className="h-4 bg-white/5 rounded"></div>
               <div className="h-4 bg-white/5 rounded"></div>
               <div className="h-4 bg-white/5 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const InsightsSkeleton = () => (
  <section className="py-32 bg-theme">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex justify-between items-end mb-16">
        <div className="w-1/2">
           <div className="w-3/4 h-12 bg-white/5 animate-pulse rounded-md mb-6"></div>
           <div className="w-2/3 h-4 bg-white/5 animate-pulse rounded-md"></div>
        </div>
        <div className="w-32 h-6 bg-white/5 animate-pulse rounded-md"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-2xl h-96 flex flex-col animate-pulse">
            <div className="w-full aspect-[4/3] bg-white/5"></div>
            <div className="p-6 flex flex-col flex-grow">
               <div className="w-1/3 h-3 bg-white/5 rounded mb-4"></div>
               <div className="w-full h-6 bg-white/5 rounded mb-2"></div>
               <div className="w-2/3 h-6 bg-white/5 rounded"></div>
               <div className="mt-auto w-24 h-3 bg-white/5 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const checkPath = () => {
      setIsAdminView(window.location.pathname === '/admin');
    };
    checkPath();
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
  };

  if (isAdminView) {
    return (
      <div className="bg-theme min-h-screen text-white selection:bg-white selection:text-charcoal cursor-auto">
        <Toaster position="bottom-center" />
        <Suspense fallback={
          <div className="h-screen flex flex-col items-center justify-center bg-[#050505]">
            <div className="w-8 h-8 border-2 border-lush-yellow border-t-transparent animate-spin rounded-full mb-4"></div>
            <p className="text-xs uppercase tracking-widest text-white/40">Loading Command Console...</p>
          </div>
        }>
          <AdminDashboard onClose={navigateToHome} />
        </Suspense>
      </div>
    );
  }
  return (
    <div className="bg-theme min-h-screen text-white selection:bg-white selection:text-charcoal cursor-auto md:cursor-none transition-colors duration-500">
      <Helmet>
        <title>LushRide | Executive Chauffeur Service in Lagos</title>
        <meta name="description" content="Lagos' finest premium chauffeur service. Absolute comfort, uncompromising privacy, and precision scheduling for the elite." />
        <link rel="canonical" href="https://lushride.com/" />
      </Helmet>
      <ScrollProgress />
      <CustomCursor />
      <Toaster position="bottom-center" />
      <Navbar />
      <WhatsAppButton />
      <main>
        <Suspense fallback={<GenericFallback />}>
          <Hero />
          <Divider />
          <Accolades />
          <Divider />
          <Experience />
          <Divider />
          <OurImpact />
          <Divider />
          
          <Suspense fallback={<FleetSkeleton />}>
            <Fleet />
          </Suspense>
          
          <Divider />
          <Hubs />
          <Divider />
          <ServiceAreas />
          <Divider />
          <LushAcademy />
          <Divider />
          
          <Suspense fallback={<InsightsSkeleton />}>
            <Insights />
          </Suspense>
          
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
          <Waitlist />
          <Divider />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
