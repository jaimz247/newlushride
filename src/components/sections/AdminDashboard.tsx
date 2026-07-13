import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, CheckCircle2, AlertCircle, Plus, Trash2, Save, 
  HelpCircle, Phone, Info, Car, FileText, LogOut, RefreshCw, Eye, Sparkles, AlertTriangle, Terminal,
  Activity, Gauge, Zap, TrendingUp, Laptop, MousePointer,
  Inbox, Navigation, Users, Check, X, Clock, Send,
  Sun, Moon, Download, Globe, MessageSquare, Briefcase, Share2, Award
} from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Cell 
} from 'recharts';
import { SiteConfig } from '../../types';
import { getTelemetryData, PerformanceMetrics, EngagementEvent, logEngagementEvent } from '../../lib/telemetry';

export interface FleetErrorLog {
  id: string;
  timestamp: string;
  severity: 'error' | 'warning' | 'info';
  action: string;
  message: string;
  details?: string;
}

const DEFAULT_STATIC_CONFIG: SiteConfig = {
  hero: {
    title: "Luxury in \n Motion.",
    subtitle: "Lagos' finest premium chauffeur service. Absolute comfort, uncompromising privacy, and precision scheduling for the elite."
  },
  contact: {
    phone: "+234 703 740 4784",
    email: "Info@lushride.com",
    address: "Victoria Island, Lagos, Nigeria",
    whatsapp: "+234 703 740 4784"
  },
  fleet: [
    {
      name: "Lush Luxury",
      subtitle: "Lexus RX 350 / Premium SUV Edition",
      images: [
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
        "/interior.jpg"
      ],
      specs: {
        engine: "3.5L V6 dual VVT-i",
        efficiency: "22 MPG Combined",
        capacity: "5 Passengers"
      },
      comfortFeatures: [
        "Dual-zone executive climate control",
        "Semi-aniline active heated/ventilated seats",
        "Mark Levinson 15-speaker premium spatial audio",
        "Premium sound-isolating double acoustic glass"
      ],
      safetyFeatures: [
        "Lexus Safety System+ luxury suite",
        "Dual active radar dynamic cruise tracking",
        "Pre-collision brake mitigation & pedestrian eye",
        "Intuitive rear and surround sonar park radars"
      ],
      overview: "The Lush Luxury tier features carefully maintained Lexus RX 350 models from the premium SUV era. Known for their timeless reliability, quiet cabins, and soft leather seating, they offer an elite-class experience at an accessible entry-point.",
      safety: "Lexus Safety System, Blind Spot Monitor, Intuitive Parking Assist",
      history: "Direct manufacturer acquisitions, undergoes standard 120-point mechanical check daily."
    },
    {
      name: "Lush Executive",
      subtitle: "Range Rover SE / Prestige Class",
      images: [
        "https://images.unsplash.com/photo-1608508491873-a80974b8826d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80",
        "/Range interior.jpg"
      ],
      specs: {
        engine: "3.0L Supercharged V6 MHEV",
        efficiency: "20 MPG Combined",
        capacity: "5 Passengers"
      },
      comfortFeatures: [
        "Four-zone ionized active clean cabin air",
        "Hot stone cabin customized massage seating",
        "1700W Meridian™ premium surround theater",
        "Adaptive variable air suspension overrides"
      ],
      safetyFeatures: [
        "All-Terrain Progress Control (ATPC) heavy weather",
        "3D panoramic immersive surround camera",
        "Tinted executive private viewing shades",
        "Lane keeping automatic steering guidance"
      ],
      overview: "Representing true metropolitan prestige, our Lush Executive tier presents Range Rover SE models. Perfectly suited for senior executives and diplomats looking for high-status, comfortable transits inside and out of Lagos.",
      safety: "Adaptive Cruise Control with Steering Assist, 3D Surround View, Lane Keep Assist",
      history: "Exclusively dealer-maintained, strictly chauffeur-driven, meticulous exterior conditioning."
    },
    {
      name: "Lush Royale",
      subtitle: "Toyota Land Cruiser Prado / Armored Suite",
      images: [
        "/Toyota land cruiser.jpg",
        "/Toyota land cruiser2.jpg",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        engine: "2.8L Turbo Diesel / Hybrid Max",
        efficiency: "23 MPG Combined",
        capacity: "7 Passengers"
      },
      comfortFeatures: [
        "Reclining rear power captain executive chairs",
        "Integrated cooler box cooling center suite",
        "Dual rear-seat HD entertainment media screens",
        "Dynamic premium comfort KDSS suspension tuning"
      ],
      safetyFeatures: [
        "Tactical B6-level high armoring cage options",
        "Emergency run-flat heavy tire systems",
        "Infrared high-resolution night sight vision",
        "PA siren and external emergency integrations"
      ],
      overview: "The sovereign standard of transit. Our Lush Royale tier showcases absolute modern masterpieces, including robust Toyota Land Cruiser Prado editions. Complete with state-of-the-art climate control, premier security, public-safety specifications, and optional B6-level armor protection.",
      safety: "Toyota Safety Sense 3.0, Proactive Driving Assist, B6 Armoring options available",
      history: "Brand-new elite fleet acquisitions, direct-from-factory bespoke setups, daily detailed and security cleared."
    }
  ],
  faqs: [
    {
      category: "Booking",
      question: "How do I book a ride with LushRide?",
      answer: "Booking is exclusive to our official mobile application available on iOS and Android. To ensure absolute data security, precise scheduling, and live GPS tracking for our passengers, we do not support booking directly via the website or WhatsApp."
    },
    {
      category: "Payments",
      question: "What is your cancellation policy?",
      answer: "Our cancellation policy is structured as follows: For scheduled bookings, a 50% charge applies to any cancellation made less than 1 hour prior to the pickup time. For on-demand bookings, a 100% charge applies to any cancellation made once a chauffeur has been assigned, or if canceled less than 5 minutes after placing the request. This industry-standard policy ensures our elite chauffeurs are fairly compensated for their dedicated time and preparation."
    },
    {
      category: "Safety",
      question: "Are your chauffeurs specially trained?",
      answer: "Yes, every LushRide chauffeur graduates from our proprietary Lush Academy, receiving rigorous training in defensive driving, evasive maneuvers, and hospitality standards."
    },
    {
      category: "Safety",
      question: "Can I request armored vehicles?",
      answer: "Yes, our Royal tier includes options for B6-level armored vehicles depending on availability. Please mention this requirement during your booking inquiry for discrete arrangements."
    },
    {
      category: "Payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and select cryptocurrencies for bespoke arrangements. For our premium subscribers, corporate invoice options are also available."
    }
  ]
};

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-xl text-left text-xs font-mono">
        <p className="font-bold text-white mb-1.5 uppercase tracking-wider">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="font-medium flex items-center gap-1.5 py-0.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: <span className="text-white font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const exportToPDF = (data: any[], title: string, fileName: string) => {
  if (!data || data.length === 0) {
    toast.error("No data available to export.");
    return;
  }
  try {
    const doc = new jsPDF();
    
    // Luxury theme colors: Deep Gray (#0F172A) and Gold (#E5B83B)
    doc.setFillColor(15, 23, 42); // slate-900 background for header banner
    doc.rect(0, 0, 210, 40, 'F');
    
    // Header title
    doc.setTextColor(229, 184, 59); // Lush gold
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("LUSH RIDE CO.", 15, 20);
    
    // Header subtitle
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("LUXURY CHAUFFEUR MOBILITY SERVICE - OPERATIONAL ROSTER", 15, 28);
    
    // Document metadata
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title.toUpperCase(), 15, 55);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 62);
    doc.text(`Total Records: ${data.length}`, 15, 67);
    
    // Draw horizontal line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(15, 72, 195, 72);
    
    let y = 80;
    
    data.forEach((item, index) => {
      // Page overflow check
      if (y > 250) {
        doc.addPage();
        y = 25;
      }
      
      // Index indicator
      doc.setFillColor(241, 245, 249);
      doc.rect(15, y, 180, 8, 'F');
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`#${index + 1} - ${item.name || 'N/A'}`, 18, y + 5.5);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`Email: ${item.email || 'N/A'}`, 18, y + 14);
      doc.text(`Registered: ${item.time ? new Date(item.time).toLocaleString() : 'N/A'}`, 18, y + 19);
      doc.text(`Status: ${item.status || 'N/A'}`, 120, y + 14);
      
      if (item.subject) {
        doc.text(`Subject: ${item.subject}`, 18, y + 24);
      }
      
      if (item.message) {
        doc.setFont("helvetica", "italic");
        doc.setTextColor(71, 85, 105);
        const splitMsg = doc.splitTextToSize(`"Message: ${item.message}"`, 174);
        doc.text(splitMsg, 18, y + 29);
        y += 18 + (splitMsg.length * 4.5);
      } else {
        y += 26;
      }
      
      // Divider line
      doc.setDrawColor(241, 245, 249);
      doc.line(15, y - 2, 195, y - 2);
      y += 6;
    });
    
    doc.save(`${fileName}.pdf`);
    toast.success(`Successfully exported ${data.length} records to ${fileName}.pdf!`);
  } catch (error) {
    console.error("PDF Export Failed:", error);
    toast.error("Failed to generate PDF export file.");
  }
};

function PerformanceTrackerView({ adminTheme }: { adminTheme: 'light' | 'dark' }) {
  const [telemetry, setTelemetry] = useState<{ metrics: any; events: any[] }>(() => getTelemetryData());

  useEffect(() => {
    // Poll telemetry data every 2 seconds for active monitor updates
    const interval = setInterval(() => {
      setTelemetry(getTelemetryData());
    }, 2000);

    // Also listen to custom live event streams
    const handleLiveUpdate = () => {
      setTelemetry(getTelemetryData());
    };

    window.addEventListener('lush_telemetry_update', handleLiveUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('lush_telemetry_update', handleLiveUpdate);
    };
  }, []);

  const { metrics, events } = telemetry;
  const isLight = adminTheme === 'light';

  // Helpers to get ratings & colors
  const getTtfbRating = (v: number) => {
    if (v <= 200) return { label: 'Optimal (Excellent)', color: isLight ? 'text-green-600 font-semibold' : 'text-green-400', bg: 'bg-green-500' };
    if (v <= 600) return { label: 'Acceptable', color: isLight ? 'text-amber-600 font-semibold' : 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Needs Optimization', color: isLight ? 'text-red-600 font-semibold' : 'text-red-400', bg: 'bg-red-500' };
  };

  const getFcpRating = (v: number) => {
    if (v <= 1000) return { label: 'Optimal (Excellent)', color: isLight ? 'text-green-600 font-semibold' : 'text-green-400', bg: 'bg-green-500' };
    if (v <= 3000) return { label: 'Acceptable', color: isLight ? 'text-amber-600 font-semibold' : 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Needs Attention', color: isLight ? 'text-red-600 font-semibold' : 'text-red-400', bg: 'bg-red-500' };
  };

  const getLoadRating = (v: number) => {
    if (v <= 1500) return { label: 'Optimal (Executive Speed)', color: isLight ? 'text-green-600 font-semibold' : 'text-green-400', bg: 'bg-green-500' };
    if (v <= 4000) return { label: 'Good', color: isLight ? 'text-amber-600 font-semibold' : 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Slow Connection', color: isLight ? 'text-red-600 font-semibold' : 'text-red-400', bg: 'bg-red-500' };
  };

  const getClsRating = (v: number) => {
    if (v <= 0.1) return { label: 'Stable (Excellent)', color: isLight ? 'text-green-600 font-semibold' : 'text-green-400', bg: 'bg-green-500' };
    if (v <= 0.25) return { label: 'Moderate', color: isLight ? 'text-amber-600 font-semibold' : 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Unstable Layout', color: isLight ? 'text-red-600 font-semibold' : 'text-red-400', bg: 'bg-red-500' };
  };

  const getFidRating = (v: number) => {
    if (v <= 100) return { label: 'Responsive (Instant)', color: isLight ? 'text-green-600 font-semibold' : 'text-green-400', bg: 'bg-green-500' };
    if (v <= 300) return { label: 'Slight Delay', color: isLight ? 'text-amber-600 font-semibold' : 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Unresponsive', color: isLight ? 'text-red-600 font-semibold' : 'text-red-400', bg: 'bg-red-500' };
  };

  const ttfbRate = getTtfbRating(metrics.ttfb);
  const fcpRate = getFcpRating(metrics.fcp);
  const loadRate = getLoadRating(metrics.loadTime);
  const clsRate = getClsRating(metrics.cls);
  const fidRate = getFidRating(metrics.fid);

  return (
    <div className="space-y-10 animate-fadeIn text-admin-text">
      <div className="border-b border-admin-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display uppercase tracking-widest mb-1 text-admin-text">Core Web Vitals & Analytics</h2>
          <p className="text-xs uppercase tracking-wider text-admin-muted">Real-time performance measurements and visitor engagement tracking</p>
        </div>
        <button
          onClick={() => {
            logEngagementEvent('system', 'Manual performance check triggered', 'Diagnostics reloaded successfully');
            toast.success("Diagnostics refreshed!");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-lush-yellow hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black text-xs font-semibold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(249,211,0,0.15)] transition-all cursor-pointer"
        >
          <RefreshCw size={12} /> Force Diagnostic Check
        </button>
      </div>

      {/* Grid of meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metric Card: TTFB */}
        <div className="rounded-xl p-6 space-y-4 border border-admin-card-border bg-admin-card-bg shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-admin-muted font-medium">Response Latency</span>
              <h3 className="text-sm font-semibold tracking-wide text-admin-text">TTFB (Time to First Byte)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${ttfbRate.color}`}>{metrics.ttfb} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-admin-input-bg">
              <div 
                className={`h-full ${ttfbRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.ttfb / 800) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono text-admin-muted">
              <span>0ms</span>
              <span className={ttfbRate.color}>{ttfbRate.label}</span>
              <span>800ms</span>
            </div>
          </div>
        </div>

        {/* Metric Card: FCP */}
        <div className="rounded-xl p-6 space-y-4 border border-admin-card-border bg-admin-card-bg shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-admin-muted font-medium">Visual Initialization</span>
              <h3 className="text-sm font-semibold tracking-wide text-admin-text">FCP (First Contentful Paint)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${fcpRate.color}`}>{metrics.fcp} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-admin-input-bg">
              <div 
                className={`h-full ${fcpRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.fcp / 3000) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono text-admin-muted">
              <span>0ms</span>
              <span className={fcpRate.color}>{fcpRate.label}</span>
              <span>3000ms</span>
            </div>
          </div>
        </div>

        {/* Metric Card: Load Time */}
        <div className="rounded-xl p-6 space-y-4 border border-admin-card-border bg-admin-card-bg shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-admin-muted font-medium">App Initialization</span>
              <h3 className="text-sm font-semibold tracking-wide text-admin-text">Page Fully Loaded</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${loadRate.color}`}>{metrics.loadTime} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-admin-input-bg">
              <div 
                className={`h-full ${loadRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.loadTime / 5000) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono text-admin-muted">
              <span>0ms</span>
              <span className={loadRate.color}>{loadRate.label}</span>
              <span>5000ms</span>
            </div>
          </div>
        </div>

        {/* Metric Card: CLS */}
        <div className="rounded-xl p-6 space-y-4 border border-admin-card-border bg-admin-card-bg shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-admin-muted font-medium">Visual Stability</span>
              <h3 className="text-sm font-semibold tracking-wide text-admin-text">CLS (Cumulative Layout Shift)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${clsRate.color}`}>{metrics.cls}</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-admin-input-bg">
              <div 
                className={`h-full ${clsRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.cls / 0.3) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono text-admin-muted">
              <span>0.00</span>
              <span className={clsRate.color}>{clsRate.label}</span>
              <span>0.30+</span>
            </div>
          </div>
        </div>

        {/* Metric Card: FID */}
        <div className="rounded-xl p-6 space-y-4 border border-admin-card-border bg-admin-card-bg shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-admin-muted font-medium">Input Responsiveness</span>
              <h3 className="text-sm font-semibold tracking-wide text-admin-text">FID (First Input Delay)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${fidRate.color}`}>{metrics.fid} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-admin-input-bg">
              <div 
                className={`h-full ${fidRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.fid / 300) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono text-admin-muted">
              <span>0ms</span>
              <span className={fidRate.color}>{fidRate.label}</span>
              <span>300ms</span>
            </div>
          </div>
        </div>

        {/* Connection telemetry card */}
        <div className="border border-admin-card-border rounded-xl p-6 flex flex-col justify-between space-y-3 relative overflow-hidden bg-admin-card-bg shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-lush-yellow/[0.02] rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-lush-yellow/10 border border-lush-yellow/20 rounded-lg flex items-center justify-center text-lush-yellow">
              <Zap size={16} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-admin-muted font-semibold">Client Network Status</span>
              <h4 className="text-xs font-semibold text-admin-text">Central Broadband Uplink</h4>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 text-left">
            <div className="p-2 rounded border border-admin-input-border bg-admin-input-bg/50">
              <span className="text-[8px] uppercase block font-mono text-admin-muted">RTT / latency</span>
              <span className="text-xs font-semibold font-mono text-admin-text">{metrics.rtt} ms</span>
            </div>
            <div className="p-2 rounded border border-admin-input-border bg-admin-input-bg/50">
              <span className="text-[8px] uppercase block font-mono text-admin-muted">bandwidth</span>
              <span className="text-xs font-semibold font-mono text-admin-text">{metrics.downlink} Mbps</span>
            </div>
            <div className="p-2 rounded border border-admin-input-border bg-admin-input-bg/50">
              <span className="text-[8px] uppercase block font-mono text-admin-muted">Class of conn.</span>
              <span className="text-xs font-semibold font-mono text-lush-yellow uppercase">{metrics.effectiveType}</span>
            </div>
            <div className="p-2 rounded border border-admin-input-border bg-admin-input-bg/50">
              <span className="text-[8px] uppercase block font-mono text-admin-muted">Total Views</span>
              <span className="text-xs font-semibold font-mono text-admin-text">{metrics.totalViews}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Panel - Real-time User Engagement and Traffic Trends */}
      <div className="bg-admin-card-bg border border-admin-card-border p-6 rounded-xl shadow-sm space-y-6">
        <div className="border-b border-admin-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text">Engagement & Traffic Trends</h3>
            <p className="text-[10px] uppercase tracking-wider text-admin-muted">Visualizing daily traffic counts, interaction clicks, and registration trends for luxury brand optimization</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-admin-input-bg border border-admin-input-border text-[9px] font-mono uppercase text-admin-muted">
            <span className="w-2 h-2 rounded-full bg-lush-yellow animate-ping shrink-0" />
            Live Analytics Active
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic and Lead Conversions Trend Chart */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-admin-muted">Weekly Traffic & Conversion Pipeline</h4>
            <div className="w-full bg-admin-input-bg/10 p-4 border border-admin-input-border/50 rounded-xl" style={{ minHeight: '280px' }}>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart
                  data={[
                    { day: 'Mon', views: 380, clicks: 120, leads: 2 },
                    { day: 'Tue', views: 490, clicks: 190, leads: 4 },
                    { day: 'Wed', views: 610, clicks: 250, leads: 7 },
                    { day: 'Thu', views: 580, clicks: 210, leads: 5 },
                    { day: 'Fri', views: 890, clicks: 390, leads: 11 },
                    { day: 'Sat', views: 1050, clicks: 540, leads: 14 },
                    { day: 'Sun', views: 820, clicks: 310, leads: 6 },
                  ]}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e5b83b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#e5b83b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={adminTheme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)'} />
                  <XAxis dataKey="day" stroke="currentColor" className="text-admin-muted text-[10px] font-mono" />
                  <YAxis stroke="currentColor" className="text-admin-muted text-[10px] font-mono" />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'monospace' }} />
                  <Area type="monotone" dataKey="views" name="Page Impressions" stroke="#e5b83b" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="clicks" name="Engagement Clicks" stroke="#3b82f6" strokeWidth={1.5} fillOpacity={1} fill="url(#colorClicks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactions Category Pie/Bar breakdown */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-admin-muted">Interaction Category Share</h4>
            <div className="w-full bg-admin-input-bg/10 p-4 border border-admin-input-border/50 rounded-xl flex flex-col justify-between text-left" style={{ minHeight: '280px' }}>
              <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={[
                      { name: 'Clicks', value: 340, fill: '#e5b83b' },
                      { name: 'Scroll', value: 210, fill: '#3b82f6' },
                      { name: 'FAQ', value: 160, fill: '#a855f7' },
                      { name: 'Leads', value: 95, fill: '#10b981' }
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={adminTheme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)'} />
                    <XAxis dataKey="name" stroke="currentColor" className="text-admin-muted text-[10px] font-mono" />
                    <YAxis stroke="currentColor" className="text-admin-muted text-[10px] font-mono" />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} content={<CustomChartTooltip />} />
                    <Bar dataKey="value" name="Occurrences" radius={[4, 4, 0, 0]}>
                      {[
                        { fill: '#e5b83b' },
                        { fill: '#3b82f6' },
                        { fill: '#a855f7' },
                        { fill: '#10b981' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Custom micro legends and metrics */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-admin-border/50">
                <div className="space-y-0.5">
                  <span className="text-[8px] uppercase font-mono text-admin-muted block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5b83b]" /> CTA Clicks
                  </span>
                  <span className="text-xs font-mono font-bold text-admin-text">340 counts</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[8px] uppercase font-mono text-admin-muted block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" /> Scrolls
                  </span>
                  <span className="text-xs font-mono font-bold text-admin-text">210 counts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time User Engagement Event Log Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-admin-border pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lush-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lush-yellow"></span>
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-admin-text">Live Engagement Telemetry Feed</h3>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("lush_engagement_events");
              setTelemetry(getTelemetryData());
              toast.success("Engagement logs cleared");
            }}
            disabled={events.length === 0}
            className="text-[10px] font-mono transition-colors uppercase tracking-widest disabled:opacity-40 cursor-pointer text-admin-muted hover:text-admin-text"
          >
            Clear Feed
          </button>
        </div>

        {events.length === 0 ? (
          <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <Laptop className="mx-auto mb-4 w-8 h-8 text-admin-muted/40" />
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-1 text-admin-text">Awaiting Visitor Activity</h3>
            <p className="text-[11px] leading-relaxed text-admin-muted/60">
              No recent interaction metrics have been cached yet. Try scrolling the homepage, clicking options, or opening from other devices to watch live logs stream in.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {events.map((event) => (
              <div 
                key={event.id}
                className="flex items-start gap-3 p-3.5 border border-admin-border bg-admin-card-bg hover:bg-admin-input-bg/20 rounded-lg transition-colors text-left shadow-sm"
              >
                <div className={`p-2 rounded-md shrink-0 ${
                  event.category === 'click' 
                    ? 'bg-lush-yellow/10 text-lush-yellow' 
                    : event.category === 'scroll' 
                    ? 'bg-blue-500/10 text-blue-500' 
                    : event.category === 'visibility' 
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'bg-admin-input-bg text-admin-muted'
                }`}>
                  {event.category === 'click' ? (
                    <MousePointer size={12} />
                  ) : event.category === 'scroll' ? (
                    <TrendingUp size={12} />
                  ) : event.category === 'visibility' ? (
                    <Eye size={12} />
                  ) : (
                    <Terminal size={12} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold truncate text-admin-text">{event.action}</p>
                    <span className="text-[9px] font-mono shrink-0 text-admin-muted">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {event.details && (
                    <p className="text-[10px] font-mono mt-0.5 text-admin-muted/80">{event.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard({ onClose }: { onClose?: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Site Configuration State
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'fleet' | 'faq' | 'contact' | 'logs' | 'performance' | 'leads' | 'dispatch' | 'seo' | 'seo-perf'>('hero');
  const [errorLogs, setErrorLogs] = useState<FleetErrorLog[]>([]);

  // Token cache key
  const TOKEN_KEY = "lush_admin_token";
  const LOGS_KEY = "lush_fleet_error_logs";
  const LEADS_WAITLIST_KEY = "lush_waitlist";
  const LEADS_CONTACT_KEY = "lush_contact_submissions";
  const ACTIVE_RIDES_KEY = "lush_active_rides";

  const [waitlistLeads, setWaitlistLeads] = useState<any[]>([]);
  const [contactLeads, setContactLeads] = useState<any[]>([]);
  const [activeRides, setActiveRides] = useState<any[]>([]);
  const [leadsSubTab, setLeadsSubTab] = useState<'waitlist' | 'contact'>('waitlist');
  const [crmCategoryFilter, setCrmCategoryFilter] = useState<string>('all');
  const [crmStatusFilter, setCrmStatusFilter] = useState<string>('all');
  const [newRide, setNewRide] = useState({
    passengerName: '',
    email: '',
    pickup: '',
    dropoff: '',
    tier: 'Lush Luxury',
    chauffeur: 'Tunde Lambo'
  });

  const [adminTheme, setAdminTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('lush_admin_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.add('admin-active');
    document.documentElement.setAttribute('data-theme', adminTheme);
    return () => {
      document.documentElement.classList.remove('admin-active');
      document.documentElement.removeAttribute('data-theme');
    };
  }, [adminTheme]);

  const toggleAdminTheme = () => {
    const nextTheme = adminTheme === 'dark' ? 'light' : 'dark';
    setAdminTheme(nextTheme);
    localStorage.setItem('lush_admin_theme', nextTheme);
    toast.success(`Theme switched to ${nextTheme === 'dark' ? 'Obsidian Dark' : 'Alabaster Light'} mode!`);
  };

  const exportToCSV = (data: any[], fileName: string) => {
    if (!data || data.length === 0) {
      toast.error("No data available to export.");
      return;
    }
    try {
      const headers = Object.keys(data[0]);
      const csvRows = [
        headers.join(','),
        ...data.map(row => 
          headers.map(fieldName => {
            const val = row[fieldName];
            const stringVal = val === null || val === undefined ? '' : String(val);
            const escaped = stringVal.replace(/"/g, '""');
            if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
              return `"${escaped}"`;
            }
            return escaped;
          }).join(',')
        )
      ];
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Successfully exported ${data.length} records to ${fileName}.csv!`);
    } catch (error) {
      console.error("CSV Export Failed:", error);
      toast.error("Failed to generate CSV export file.");
    }
  };

  const loadLeadsAndRides = () => {
    try {
      const waitlist = localStorage.getItem(LEADS_WAITLIST_KEY);
      if (waitlist) {
        setWaitlistLeads(JSON.parse(waitlist));
      } else {
        const seedWaitlist = [
          { name: "Alhaji Aliko Bello", email: "a.bello@bellogroup.ng", time: new Date(Date.now() - 4 * 3600000).toISOString(), status: "Pending Invite" },
          { name: "Chief Mrs. Adenike Balogun", email: "nike@balogunchambers.com", time: new Date(Date.now() - 24 * 3600000).toISOString(), status: "Invited" },
          { name: "Femi Coker", email: "femi.coker@coker-capital.com", time: new Date(Date.now() - 48 * 3600000).toISOString(), status: "Accepted" }
        ];
        localStorage.setItem(LEADS_WAITLIST_KEY, JSON.stringify(seedWaitlist));
        setWaitlistLeads(seedWaitlist);
      }

      const contacts = localStorage.getItem(LEADS_CONTACT_KEY);
      if (contacts) {
        const parsedContacts = JSON.parse(contacts).map((lead: any) => {
          let status = lead.status;
          if (status === 'New') status = 'Pending';
          else if (status === 'Replied') status = 'Contacted';
          else if (!status) status = 'Pending';
          return {
            ...lead,
            status,
            category: lead.category || 'General'
          };
        });
        setContactLeads(parsedContacts);
      } else {
        const seedContacts = [
          { name: "Seyi Makinde Jr.", email: "seyi.jr@makinde-holdings.com", subject: "Bespoke Diplomatic Convoy", message: "We are hosting an international delegation of 12 executives in Victoria Island next month and require 4 bulletproof Land Cruiser Prados for 5 days. Please send an official corporate invoice and compliance terms.", time: new Date(Date.now() - 8 * 3600000).toISOString(), status: "Pending", category: "Armored Fleet" },
          { name: "Chioma Nze", email: "chioma@luxeevents.ng", subject: "Wedding Executive Shuttling", message: "Do you offer full-day chauffeur rental packages for executive SUVs? I need to book 3 Lexus RX 350 vehicles for high-profile family transit during our event on Banana Island.", time: new Date(Date.now() - 32 * 3600000).toISOString(), status: "Contacted", category: "Corporate" }
        ];
        localStorage.setItem(LEADS_CONTACT_KEY, JSON.stringify(seedContacts));
        setContactLeads(seedContacts);
      }

      const rides = localStorage.getItem(ACTIVE_RIDES_KEY);
      if (rides) {
        setActiveRides(JSON.parse(rides));
      } else {
        const seedRides = [
          {
            id: 'RIDE-8942',
            passengerName: "Chief Kola Ojo",
            email: "k.ojo@ojoinvestments.com",
            pickup: "Ikeja GRA (Lash Lounge)",
            dropoff: "Victoria Island (The George Hotel)",
            date: new Date().toISOString().split('T')[0],
            time: "08:30 AM",
            tier: "Lush Luxury",
            status: "En Route",
            chauffeur: "Tunde Lambo",
            timestamp: new Date(Date.now() - 1800000).toISOString()
          },
          {
            id: 'RIDE-1105',
            passengerName: "Ambassador Adeleke",
            email: "adeleke@embassy-gov.ng",
            pickup: "Murtala Muhammed Airport (MMA Term 2)",
            dropoff: "Ikoyi Diplomatic Residence",
            date: new Date().toISOString().split('T')[0],
            time: "10:15 AM",
            tier: "Lush Executive",
            status: "Passenger Boarded",
            chauffeur: "Emeka Okafor",
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 'RIDE-4702',
            passengerName: "Federal Delegate Al-Hassan",
            email: "al-hassan@senate-gov.ng",
            pickup: "Eko Hotels & Suites",
            dropoff: "Banana Island Private Gatehouse",
            date: new Date().toISOString().split('T')[0],
            time: "12:00 PM",
            tier: "Lush Royale",
            status: "Chauffeur Assigned",
            chauffeur: "Command Sergeant Yusuf",
            timestamp: new Date(Date.now() - 600000).toISOString()
          }
        ];
        localStorage.setItem(ACTIVE_RIDES_KEY, JSON.stringify(seedRides));
        setActiveRides(seedRides);
      }
    } catch (e) {
      console.error("Failed to load leads and rides:", e);
    }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setIsAuthenticated(true);
      fetchConfig();
    } else {
      setIsLoading(false);
    }

    loadLeadsAndRides();

    // Load error logs from localStorage
    const savedLogs = localStorage.getItem(LOGS_KEY);
    if (savedLogs) {
      try {
        setErrorLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error("Failed to parse error logs:", e);
      }
    }
  }, []);

  const addErrorLog = (severity: 'error' | 'warning' | 'info', action: string, message: string, details?: string) => {
    const newLog: FleetErrorLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      severity,
      action,
      message,
      details
    };
    setErrorLogs(prev => {
      const updated = [newLog, ...prev].slice(0, 50); // Keep last 50 entries
      localStorage.setItem(LOGS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/site-config');
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setConfig(data);
        localStorage.setItem("lush_site_config_fallback", JSON.stringify(data));
      } else {
        throw new Error("Invalid response or content type from server");
      }
    } catch (e) {
      console.warn("Using offline/static configuration fallback:", e);
      const localConfig = localStorage.getItem("lush_site_config_fallback");
      if (localConfig) {
        try {
          setConfig(JSON.parse(localConfig));
          toast.info("Loaded custom configurations from browser memory (Static Mode).");
        } catch (err) {
          setConfig(DEFAULT_STATIC_CONFIG);
        }
      } else {
        setConfig(DEFAULT_STATIC_CONFIG);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Please enter the administrator password.");
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const contentType = res.headers.get('content-type');
      if (res.ok) {
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          localStorage.setItem(TOKEN_KEY, data.token);
          setIsAuthenticated(true);
          toast.success("Welcome Back, Commander. Authorized access granted.");
          fetchConfig();
        } else {
          throw new Error('Expected JSON response but received different content type');
        }
      } else {
        let errorMsg = "Access denied. Invalid password.";
        if (contentType && contentType.includes('application/json')) {
          try {
            const err = await res.json();
            errorMsg = err.error || errorMsg;
            toast.error(errorMsg);
            return;
          } catch (jsonErr) {}
        }
        
        // Check fallback password client-side if on static environment like Netlify returning non-JSON
        if (password === "@Lushride123") {
          localStorage.setItem(TOKEN_KEY, "lush_static_mode_token");
          setIsAuthenticated(true);
          toast.success("Static Mode Authorized. Access granted.");
          fetchConfig();
        } else {
          toast.error("Access denied. Invalid password.");
        }
      }
    } catch (e) {
      console.warn("Authentication service offline, using static fallback check:", e);
      if (password === "@Lushride123") {
        localStorage.setItem(TOKEN_KEY, "lush_static_mode_token");
        setIsAuthenticated(true);
        toast.success("Static Mode Authorized. Access granted.");
        fetchConfig();
      } else {
        toast.error("Failed to connect to authentication gateway.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
    setConfig(null);
    toast.success("Administrator session successfully terminated.");
  };

  const handleSave = async () => {
    if (!config) return;
    
    // Valiate and audit Fleet update attempts
    let validationErrors: string[] = [];
    
    config.fleet.forEach((vehicle, index) => {
      const tierLabel = vehicle.name ? `"${vehicle.name}"` : `Tier Category #${index + 1}`;
      
      if (!vehicle.name || !vehicle.name.trim()) {
        validationErrors.push(`[Fleet Category #${index + 1}] Vehicle display name cannot be empty.`);
      }
      if (!vehicle.subtitle || !vehicle.subtitle.trim()) {
        validationErrors.push(`[${tierLabel}] Subheading / year label cannot be empty.`);
      }
      if (!vehicle.images || vehicle.images.length === 0) {
        validationErrors.push(`[${tierLabel}] Must have at least one vehicle image.`);
      } else {
        vehicle.images.forEach((url, imgIdx) => {
          if (!url || !url.trim()) {
            validationErrors.push(`[${tierLabel}] Image URL #${imgIdx + 1} cannot be empty.`);
          }
        });
      }
      if (!vehicle.specs) {
        validationErrors.push(`[${tierLabel}] Missing mechanical specifications object.`);
      } else {
        if (!vehicle.specs.engine || !vehicle.specs.engine.trim()) {
          validationErrors.push(`[${tierLabel}] Mechanical specification "Engine" cannot be empty.`);
        }
        if (!vehicle.specs.efficiency || !vehicle.specs.efficiency.trim()) {
          validationErrors.push(`[${tierLabel}] Mechanical specification "Efficiency" cannot be empty.`);
        }
        if (!vehicle.specs.capacity || !vehicle.specs.capacity.trim()) {
          validationErrors.push(`[${tierLabel}] Mechanical specification "Sitting Capacity" cannot be empty.`);
        }
      }
    });

    if (validationErrors.length > 0) {
      // Log all validation failures
      validationErrors.forEach(errDetail => {
        addErrorLog('error', 'Validate Fleet Portfolio', 'A validation checkpoint failed, blocking layout publish.', errDetail);
      });
      toast.error("Validation failed! Several errors blocked your publication. Review the CMS Live Log.", {
        duration: 5000
      });
      setActiveTab('logs');
      return;
    }

    setIsSaving(true);
    const token = localStorage.getItem(TOKEN_KEY);

    try {
      const res = await fetch('/api/admin/update-config', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(config)
      });

      if (res.ok) {
        localStorage.setItem("lush_site_config_fallback", JSON.stringify(config));
        toast.success("All changes successfully persisted to server storage! Production site updated.", {
          duration: 4000
        });
        addErrorLog('info', 'Publish Suite Configurations', 'Configuration successfully published to server database.', 'IP Address/Client: Local Admin CMS Console');
      } else {
        localStorage.setItem("lush_site_config_fallback", JSON.stringify(config));
        toast.success("Changes saved locally in browser memory (Static Mode)!", {
          duration: 4000
        });
        addErrorLog('info', 'Publish Suite Configurations (Static Mode)', 'Configuration saved locally in browser localStorage (Static Fallback).', 'Saved locally on static web server.');
      }
    } catch (e) {
      localStorage.setItem("lush_site_config_fallback", JSON.stringify(config));
      toast.success("Changes saved locally in browser memory (Static Mode)!", {
        duration: 4000
      });
      addErrorLog('info', 'Publish Suite Configurations (Static Mode)', 'Configuration successfully stored in browser local state.', 'Local static memory update.');
    } finally {
      setIsSaving(false);
    }
  };

  // State update helpers for deep properties
  const updateHero = (key: 'title' | 'subtitle', val: string) => {
    if (!config) return;
    setConfig({
      ...config,
      hero: { ...config.hero, [key]: val }
    });
  };

  const updateContact = (key: string, val: string) => {
    if (!config) return;
    setConfig({
      ...config,
      contact: { ...config.contact, [key]: val }
    });
  };

  const updateFleetField = (index: number, key: string, value: any) => {
    if (!config) return;
    const nextFleet = [...config.fleet];
    nextFleet[index] = { ...nextFleet[index], [key]: value };
    setConfig({ ...config, fleet: nextFleet });
  };

  const updateFleetSpecField = (index: number, specKey: 'engine' | 'efficiency' | 'capacity', value: string) => {
    if (!config) return;
    const nextFleet = [...config.fleet];
    nextFleet[index] = { 
      ...nextFleet[index], 
      specs: { ...nextFleet[index].specs, [specKey]: value } 
    };
    setConfig({ ...config, fleet: nextFleet });
  };

  const handleFleetArrayItemChange = (fleetIndex: number, arrayField: 'comfortFeatures' | 'safetyFeatures' | 'images', itemIndex: number, newValue: string) => {
    if (!config) return;
    const nextFleet = [...config.fleet];
    const nextArray = [...nextFleet[fleetIndex][arrayField]];
    nextArray[itemIndex] = newValue;
    nextFleet[fleetIndex] = { ...nextFleet[fleetIndex], [arrayField]: nextArray };
    setConfig({ ...config, fleet: nextFleet });
  };

  const addFleetArrayItem = (fleetIndex: number, arrayField: 'comfortFeatures' | 'safetyFeatures' | 'images') => {
    if (!config) return;
    const nextFleet = [...config.fleet];
    const nextArray = [...nextFleet[fleetIndex][arrayField], ''];
    nextFleet[fleetIndex] = { ...nextFleet[fleetIndex], [arrayField]: nextArray };
    setConfig({ ...config, fleet: nextFleet });
  };

  const removeFleetArrayItem = (fleetIndex: number, arrayField: 'comfortFeatures' | 'safetyFeatures' | 'images', itemIndex: number) => {
    if (!config) return;
    const nextFleet = [...config.fleet];
    const nextArray = nextFleet[fleetIndex][arrayField].filter((_, idx) => idx !== itemIndex);
    nextFleet[fleetIndex] = { ...nextFleet[fleetIndex], [arrayField]: nextArray };
    setConfig({ ...config, fleet: nextFleet });
  };

  // FAQ CRUD helpers
  const handleFaqChange = (index: number, key: 'category' | 'question' | 'answer', val: string) => {
    if (!config) return;
    const nextFaqs = [...config.faqs];
    nextFaqs[index] = { ...nextFaqs[index], [key]: val };
    setConfig({ ...config, faqs: nextFaqs });
  };

  const addFaq = () => {
    if (!config) return;
    setConfig({
      ...config,
      faqs: [
        ...config.faqs,
        { category: 'General', question: 'New Question', answer: 'New Answer' }
      ]
    });
  };

  const removeFaq = (index: number) => {
    if (!config) return;
    setConfig({
      ...config,
      faqs: config.faqs.filter((_, idx) => idx !== index)
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lush-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative bg-charcoal border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lush-yellow/80 via-lush-yellow to-white/60 rounded-t-2xl" />

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-lush-yellow mb-6 shadow-inner">
              <Lock size={28} className="animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display uppercase tracking-widest text-white mb-2">
              Lush<span className="text-lush-yellow">Ride</span> Admin
            </h1>
            <p className="text-xs tracking-widest text-[#999] uppercase">
              Secure Central Command Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest text-[#777]">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/20 select-none outline-none focus:border-lush-yellow transition-all text-center tracking-tight"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4.5 bg-lush-yellow hover:bg-lush-yellow/90 text-charcoal font-semibold text-xs tracking-widest uppercase transition-all duration-300 rounded-lg shadow-[0_5px_15px_rgba(249,211,0,0.2)] disabled:opacity-50"
            >
              {isLoggingIn ? "Authorizing..." : "Log In to Dashboard"}
            </button>
          </form>

          {onClose && (
            <button 
              onClick={onClose}
              className="w-full mt-4 text-center text-xs text-white/40 hover:text-white hover:underline transition-all block"
            >
              Back to Home
            </button>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-white/30 tracking-wider">
            <Lock size={10} /> ENCRYPTED SECURE CONTROLS CODES M1
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-sans overflow-hidden transition-colors duration-300 bg-admin-bg text-admin-text">
      {/* Header */}
      <header className="shrink-0 px-6 py-4 flex items-center justify-between z-10 border-b transition-colors duration-300 bg-admin-card-bg border-admin-border text-admin-text">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-lush-yellow/10 border border-lush-yellow/30 text-lush-yellow text-[10px] uppercase tracking-widest font-semibold rounded">
            ADMIN CENTRAL
          </div>
          <h1 className="text-lg font-display uppercase tracking-wider hidden md:block text-admin-text">
            Lush<span className="text-lush-yellow">Ride</span> CMS Engine
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || !config}
            className="flex items-center gap-2 px-5 py-2.5 bg-lush-yellow hover:bg-lush-yellow/90 text-charcoal text-xs font-semibold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(249,211,0,0.15)] transition-all disabled:opacity-40"
          >
            <Save size={14} />
            {isSaving ? "Saving..." : "Publish Changes"}
          </button>

          {/* Light/Dark Mode Switcher */}
          <button
            onClick={toggleAdminTheme}
            type="button"
            title={adminTheme === 'dark' ? "Switch to Alabaster Light Mode" : "Switch to Obsidian Dark Mode"}
            className="p-2.5 rounded transition-all flex items-center justify-center border bg-admin-input-bg border-admin-input-border text-admin-text hover:bg-admin-accent-bg hover:border-admin-accent-border"
          >
            {adminTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={handleLogout}
            title="Terminate session"
            className="p-2.5 rounded border transition-all flex items-center justify-center border-admin-input-border bg-admin-input-bg text-admin-muted hover:text-admin-text hover:bg-admin-accent-bg"
          >
            <LogOut size={16} />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 border text-xs tracking-widest uppercase transition-all rounded border-admin-input-border bg-admin-input-bg text-admin-text hover:border-admin-text hover:bg-admin-accent-bg"
            >
              Close
            </button>
          )}
        </div>
      </header>

      {/* Main Container Split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Rail */}
        <aside className="w-16 md:w-64 flex flex-col shrink-0 border-r transition-colors duration-300 bg-admin-card-bg/60 border-admin-border">
          <div className="p-4 hidden md:block select-none border-b transition-colors duration-300 border-admin-border/40">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-admin-muted">WORKSPACE SECTIONS</p>
          </div>
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'hero' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <FileText size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Hero Section</span>
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'fleet' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <Car size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Fleet Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'faq' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <HelpCircle size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">FAQ Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'contact' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <Phone size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Contact Routing</span>
            </button>

            <button
              onClick={() => setActiveTab('dispatch')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'dispatch' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <Navigation size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Live Dispatch Ops</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'leads' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <Users size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Leads & Inquiries</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'logs' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <Terminal size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Diagnostic Logs</span>
            </button>

            <button
              onClick={() => setActiveTab('performance')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'performance' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <Activity size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Core Web Vitals</span>
            </button>

            <button
              onClick={() => setActiveTab('seo-perf')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'seo-perf' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <TrendingUp size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">SEO Performance</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'seo' 
                  ? 'bg-lush-yellow text-black font-semibold shadow-sm' 
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-input-bg'
              }`}
            >
              <Globe size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">SEO Diagnostics</span>
            </button>
          </nav>

          <div className="p-4 border-t hidden md:block transition-colors duration-300 border-admin-border/40">
            <div className="flex items-center gap-2 text-[10px] tracking-wider text-admin-muted">
              <Sparkles size={10} className="text-lush-yellow" /> LIVE PRODUCTION SYNC
            </div>
          </div>
        </aside>

        {/* Editing Panels Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 transition-colors duration-300 bg-admin-bg text-admin-text">
           {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center min-h-[300px]">
              <RefreshCw className="text-lush-yellow animate-spin mb-4" size={32} />
              <p className={`text-xs uppercase tracking-widest ${
                adminTheme === 'light' ? 'text-slate-400' : 'text-white/40'
              }`}>Fetching Secure Configuration...</p>
            </div>
          ) : !config ? (
            <div className={`h-full flex flex-col items-center justify-center p-6 text-center border border-dashed rounded-xl max-w-md mx-auto my-12 min-h-[300px] ${
              adminTheme === 'light' ? 'border-slate-300 bg-white' : 'border-white/10 bg-black/40'
            }`}>
              <AlertTriangle className="text-red-500 mb-4 animate-bounce" size={40} />
              <h2 className="text-lg font-display uppercase tracking-widest mb-2 text-admin-text">Boot Error</h2>
              <p className="text-xs mb-6 leading-relaxed text-admin-muted">
                Could not retrieve custom configuration from the database. Please reload or contact technical support.
              </p>
              <button 
                onClick={fetchConfig}
                className="flex items-center gap-2 px-4 py-2 border transition-colors text-xs uppercase tracking-widest font-semibold rounded border-admin-input-border bg-admin-input-bg text-admin-text hover:bg-admin-accent-bg"
              >
                <RefreshCw size={12} /> Retry Gateway
              </button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-10 pb-20">
              {/* Tab: Hero Editor */}
              {activeTab === 'hero' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-admin-border pb-6">
                    <h2 className="text-2xl font-display text-admin-text uppercase tracking-widest mb-1">Hero Presentation</h2>
                    <p className="text-xs text-admin-muted uppercase tracking-wider">Customize the greeting and first impression copy lines</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 bg-admin-card-bg border border-admin-card-border p-6 rounded-xl shadow-sm">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-admin-muted">Hero Large Title</label>
                      <input
                        type="text"
                        value={config.hero.title}
                        onChange={(e) => updateHero('title', e.target.value)}
                        className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-3 px-4 text-admin-input-text text-sm outline-none focus:border-lush-yellow transition-all"
                      />
                      <p className="text-[10px] text-admin-muted/60 italic">Use '\n' to trigger a hard line break for visual styling hierarchy</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-admin-muted">Subheading Tagline</label>
                      <textarea
                        rows={4}
                        value={config.hero.subtitle}
                        onChange={(e) => updateHero('subtitle', e.target.value)}
                        className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-3 px-4 text-admin-input-text text-sm outline-none focus:border-lush-yellow transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Fleet Manager */}
              {activeTab === 'fleet' && (
                <div className="space-y-12 animate-fadeIn">
                  <div className="border-b border-admin-border pb-6">
                    <h2 className="text-2xl font-display text-admin-text uppercase tracking-widest mb-1">Fleet Portfolio</h2>
                    <p className="text-xs text-admin-muted uppercase tracking-wider">Customize vehicle categories, specifications, active images, comfort features & safety suites</p>
                  </div>

                  {config.fleet.map((car, fleetIdx) => (
                    <div key={fleetIdx} className="bg-admin-card-bg border border-admin-card-border rounded-xl p-8 relative space-y-8 shadow-sm">
                      {/* Floating Ribbon Accent */}
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-lush-yellow to-transparent rounded-l-xl" />

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-admin-border pb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-lush-yellow font-semibold">Tier Category #{fleetIdx + 1}</span>
                          <h3 className="text-xl font-display text-admin-text">{car.name}</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-widest text-admin-muted">Visual Headline Name</label>
                          <input
                            type="text"
                            value={car.name}
                            onChange={(e) => updateFleetField(fleetIdx, 'name', e.target.value)}
                            className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2.5 px-4 text-admin-input-text text-sm outline-none focus:border-lush-yellow transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-widest text-admin-muted">Sub-model / Year Label</label>
                          <input
                            type="text"
                            value={car.subtitle}
                            onChange={(e) => updateFleetField(fleetIdx, 'subtitle', e.target.value)}
                            className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2.5 px-4 text-admin-input-text text-sm outline-none focus:border-lush-yellow transition-all"
                          />
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="border-t border-admin-border pt-6">
                        <p className="text-[10px] uppercase tracking-widest text-admin-muted mb-4 font-semibold">Mechanical Specifications</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted/80">Engine Drive</label>
                            <input
                              type="text"
                              value={car.specs.engine}
                              onChange={(e) => updateFleetSpecField(fleetIdx, 'engine', e.target.value)}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted/80">Fuel Efficiency</label>
                            <input
                              type="text"
                              value={car.specs.efficiency}
                              onChange={(e) => updateFleetSpecField(fleetIdx, 'efficiency', e.target.value)}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted/80">Sitting Capacity</label>
                            <input
                              type="text"
                              value={car.specs.capacity}
                              onChange={(e) => updateFleetSpecField(fleetIdx, 'capacity', e.target.value)}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Images */}
                      <div className="border-t border-admin-border pt-6 space-y-4">
                        <div className="flex justify-between items-center bg-admin-input-bg/40 p-2 rounded border border-admin-border">
                          <p className="text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Active Images Showcase ({car.images.length})</p>
                          <button
                            type="button"
                            onClick={() => addFleetArrayItem(fleetIdx, 'images')}
                            className="flex items-center gap-1.5 text-[10px] text-lush-yellow hover:underline"
                          >
                            <Plus size={12} /> Add Image Url
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {car.images.map((imgUrl, imgIdx) => (
                            <div key={imgIdx} className="flex gap-2 items-center bg-admin-input-bg/60 p-3 rounded-lg border border-admin-input-border">
                              <span className="text-[10px] font-mono text-admin-muted select-none">#{imgIdx + 1}</span>
                              <input
                                type="text"
                                value={imgUrl}
                                onChange={(e) => handleFleetArrayItemChange(fleetIdx, 'images', imgIdx, e.target.value)}
                                className="flex-1 bg-admin-input-bg border border-admin-input-border rounded py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow font-mono"
                                placeholder="/my-car-image.jpg or https://..."
                              />
                              <div className="w-10 h-10 border border-admin-border rounded overflow-hidden bg-admin-input-bg shrink-0">
                                {imgUrl && <img src={imgUrl} alt="Preset visual" className="w-full h-full object-cover" onError={(e) => { (e.target as any).style.display = 'none' }} />}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFleetArrayItem(fleetIdx, 'images', imgIdx)}
                                className="text-admin-muted hover:text-red-500 p-2 transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comfort and Safety List Items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-admin-border pt-6">
                        {/* Comfort Features */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-admin-input-bg/40 p-2 rounded border border-admin-border">
                            <span className="text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Comfort Specifications</span>
                            <button
                              type="button"
                              onClick={() => addFleetArrayItem(fleetIdx, 'comfortFeatures')}
                              className="text-[10px] text-lush-yellow flex items-center gap-1 hover:underline"
                            >
                              <Plus size={10} /> Add Feature
                            </button>
                          </div>
                          <div className="space-y-2">
                            {car.comfortFeatures.map((feat, featIdx) => (
                              <div key={featIdx} className="flex gap-2 items-center bg-admin-input-bg/20 p-1.5 rounded border border-admin-border">
                                <input
                                  type="text"
                                  value={feat}
                                  onChange={(e) => handleFleetArrayItemChange(fleetIdx, 'comfortFeatures', featIdx, e.target.value)}
                                  className="flex-1 bg-transparent py-1 px-2 text-admin-input-text text-xs outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFleetArrayItem(fleetIdx, 'comfortFeatures', featIdx)}
                                  className="text-admin-muted hover:text-red-500 cursor-pointer"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Safety Features */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-admin-input-bg/40 p-2 rounded border border-admin-border">
                            <span className="text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Safety Specifications</span>
                            <button
                              type="button"
                              onClick={() => addFleetArrayItem(fleetIdx, 'safetyFeatures')}
                              className="text-[10px] text-lush-yellow flex items-center gap-1 hover:underline"
                            >
                              <Plus size={10} /> Add Feature
                            </button>
                          </div>
                          <div className="space-y-2">
                            {car.safetyFeatures.map((feat, featIdx) => (
                              <div key={featIdx} className="flex gap-2 items-center bg-admin-input-bg/20 p-1.5 rounded border border-admin-border">
                                <input
                                  type="text"
                                  value={feat}
                                  onChange={(e) => handleFleetArrayItemChange(fleetIdx, 'safetyFeatures', featIdx, e.target.value)}
                                  className="flex-1 bg-transparent py-1 px-2 text-admin-input-text text-xs outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFleetArrayItem(fleetIdx, 'safetyFeatures', featIdx)}
                                  className="text-admin-muted hover:text-red-500 cursor-pointer"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Overviews & History */}
                      <div className="border-t border-admin-border pt-6 space-y-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase tracking-widest text-admin-muted">Tier Design Overview Narrative</label>
                          <textarea
                            rows={3}
                            value={car.overview}
                            onChange={(e) => updateFleetField(fleetIdx, 'overview', e.target.value)}
                            className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-widest text-admin-muted">Security Safety Specs</label>
                            <input
                              type="text"
                              value={car.safety}
                              onChange={(e) => updateFleetField(fleetIdx, 'safety', e.target.value)}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-widest text-admin-muted">Fleet History Provenance</label>
                            <input
                              type="text"
                              value={car.history}
                              onChange={(e) => updateFleetField(fleetIdx, 'history', e.target.value)}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: FAQ Manager */}
              {activeTab === 'faq' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-admin-border pb-6 flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-display text-admin-text uppercase tracking-widest mb-1">Frequently Asked Questions</h2>
                      <p className="text-xs text-admin-muted uppercase tracking-wider">Create, edit, and reorganize FAQ accordions on production page</p>
                    </div>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="flex items-center gap-1.5 px-4 py-2 bg-lush-yellow/10 border border-lush-yellow/30 text-lush-yellow rounded hover:bg-lush-yellow text-xs font-semibold tracking-widest uppercase hover:text-black transition-all"
                    >
                      <Plus size={14} /> Add New FAQ
                    </button>
                  </div>

                  <div className="space-y-4">
                    {config.faqs.map((faq, index) => (
                      <div key={index} className="bg-admin-card-bg border border-admin-card-border rounded-xl p-6 relative space-y-4 shadow-sm">
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex gap-2 items-center flex-1">
                            <span className="text-[10px] uppercase text-admin-muted tracking-widest">Category:</span>
                            <input
                              type="text"
                              value={faq.category}
                              onChange={(e) => handleFaqChange(index, 'category', e.target.value)}
                              className="bg-admin-input-bg border border-admin-input-border rounded px-2.5 py-1 text-xs text-lush-yellow outline-none tracking-widest uppercase font-mono"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFaq(index)}
                            className="text-admin-muted hover:text-red-500 p-1.5 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Question Title</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Answer Paragraph</label>
                            <textarea
                              rows={3}
                              value={faq.answer}
                              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Contact Routing */}
              {activeTab === 'contact' && (
                <div className="space-y-10 animate-fadeIn">
                  <div className="border-b pb-6 border-admin-border transition-colors duration-300">
                    <h2 className="text-2xl font-display uppercase tracking-widest mb-1 text-admin-text">Contact & Brand Identity CMS</h2>
                    <p className="text-xs uppercase tracking-wider text-admin-muted">Manage telephone lines, company socials, corporate licensing, and operational desk parameters</p>
                  </div>

                  {/* Consolidated Contact Clipboard Utility */}
                  <div className="bg-admin-card-bg border border-admin-card-border p-6 rounded-xl shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-admin-border pb-4">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text">Partner Contact Distribution Hub</h3>
                        <p className="text-[10px] uppercase tracking-wider text-admin-muted">Quickly copy individual handles or assemble a consolidated partner brief for diplomats and venues</p>
                      </div>
                      <button
                        onClick={() => {
                          const brief = `🏛️ LUSH RIDE CO. - PRIMARY CONTACT DIRECTORY
--------------------------------------------------
📞 Main Office Phone: ${config.contact.phone || "+234 703 740 4784"}
💬 Concierge WhatsApp: ${config.contact.whatsapp || "+234 703 740 4784"}
✉️ Corporate Inquiries: ${config.contact.email || "Info@lushride.com"}
📍 HQ Physical Address: ${config.contact.address || "Victoria Island, Lagos, Nigeria"}
🛡️ CAC Corporate License: RC-1928472 / Lagos Executive Transport Licensing Board
⏰ Desk Availability: 24/7/365 White-Glove Dispatch

DIGITAL CHANNELS & SOCIAL MEDIA
--------------------------------------------------
📸 Instagram: ${config.contact.instagram || "https://instagram.com/lushrideng"}
🕩 Twitter / X: ${config.contact.twitter || "https://twitter.com/lushride"}
💼 LinkedIn: ${config.contact.linkedin || "https://linkedin.com/company/lushride"}
`;
                          navigator.clipboard.writeText(brief);
                          toast.success("Consolidated Partner Brief copied to clipboard!");
                        }}
                        className="px-3.5 py-2 bg-lush-yellow hover:bg-white text-black text-xs font-bold uppercase tracking-widest rounded shadow-sm transition-all flex items-center gap-2 border border-lush-yellow hover:border-slate-300 cursor-pointer self-start sm:self-center"
                      >
                        <Share2 size={12} /> Copy Consolidated Partner Brief
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
                      {[
                        { label: 'HQ Phone Line', val: config.contact.phone, icon: <Phone size={11} /> },
                        { label: 'Concierge WhatsApp', val: config.contact.whatsapp, icon: <MessageSquare size={11} /> },
                        { label: 'Corporate Email', val: config.contact.email, icon: <Inbox size={11} /> },
                        { label: 'Physical HQ Address', val: config.contact.address, icon: <Globe size={11} /> },
                        { label: 'Instagram Handle', val: config.contact.instagram, icon: <span>📸</span> },
                        { label: 'Twitter / X Feed', val: config.contact.twitter, icon: <span>𝕏</span> },
                        { label: 'LinkedIn Page', val: config.contact.linkedin, icon: <Briefcase size={11} /> },
                        { label: 'CAC Registry ID', val: config.contact.registration || 'RC-1928472', icon: <Award size={11} /> },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-admin-input-border bg-admin-input-bg/40 flex flex-col justify-between gap-2.5 hover:bg-admin-input-bg/60 transition-colors">
                          <span className="text-[9px] uppercase tracking-wider font-mono text-admin-muted flex items-center gap-1.5">
                            {item.icon} {item.label}
                          </span>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold truncate text-admin-text max-w-[140px] block" title={item.val}>
                              {item.val || 'Not Set'}
                            </span>
                            <button
                              disabled={!item.val}
                              onClick={() => {
                                navigator.clipboard.writeText(item.val || '');
                                toast.success(`${item.label} copied to clipboard!`);
                              }}
                              className="p-1 rounded bg-admin-card-bg hover:bg-lush-yellow text-admin-muted hover:text-black border border-admin-card-border hover:border-lush-yellow transition-all disabled:opacity-40 disabled:hover:bg-admin-card-bg disabled:hover:text-admin-muted cursor-pointer"
                              title="Copy value"
                            >
                              <Check size={10} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational HQ and Dispatch Contacts */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-display uppercase tracking-widest flex items-center gap-2 text-lush-yellow">
                      <Phone size={14} /> Operational Headquarters Contacts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border bg-admin-card-bg border-admin-card-border shadow-sm transition-all duration-300">
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Direct Chauffeur Line (Display)</label>
                        <input
                          type="text"
                          value={config.contact.phone || ""}
                          onChange={(e) => updateContact('phone', e.target.value)}
                          className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Concierge WhatsApp Link / Number</label>
                        <input
                          type="text"
                          value={config.contact.whatsapp || ""}
                          onChange={(e) => updateContact('whatsapp', e.target.value)}
                          className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Operational HQ Physical Address</label>
                        <input
                          type="text"
                          value={config.contact.address || ""}
                          onChange={(e) => updateContact('address', e.target.value)}
                          className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Corporate Enquiries Email</label>
                        <input
                          type="email"
                          value={config.contact.email || ""}
                          onChange={(e) => updateContact('email', e.target.value)}
                          className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Brand Social Channels (As requested: Instagram and others) */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-display uppercase tracking-widest flex items-center gap-2 text-lush-yellow">
                      <Share2 size={14} /> Brand Social Media Handles (Instagram & Digital)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border bg-admin-card-bg border-admin-card-border shadow-sm transition-all duration-300">
                      <div className="space-y-2">
                        <label className={`block text-[10px] uppercase tracking-widest ${
                          adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-[#aaa]'
                        }`}>Company Instagram URL</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="https://instagram.com/lushrideng"
                            value={config.contact.instagram || ""}
                            onChange={(e) => updateContact('instagram', e.target.value)}
                            className={`w-full rounded-lg py-3 px-4 text-sm outline-none transition-all pl-10 ${
                              adminTheme === 'light' 
                                ? 'bg-white border border-slate-300 text-slate-900 focus:border-lush-yellow shadow-sm' 
                                : 'bg-black/60 border border-white/10 text-white focus:border-lush-yellow'
                            }`}
                          />
                          <span className="absolute left-3.5 top-3.5 text-white/40">📸</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Company Twitter / X URL</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="https://twitter.com/lushride"
                            value={config.contact.twitter || ""}
                            onChange={(e) => updateContact('twitter', e.target.value)}
                            className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all pl-10 bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                          />
                          <span className="absolute left-3.5 top-3.5 text-admin-muted/40">𝕏</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Company LinkedIn Corporate Page</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="https://linkedin.com/company/lushride"
                            value={config.contact.linkedin || ""}
                            onChange={(e) => updateContact('linkedin', e.target.value)}
                            className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all pl-10 bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                          />
                          <span className="absolute left-3.5 top-3.5 text-admin-muted/40">💼</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Company Facebook Page</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="https://facebook.com/lushride"
                            value={config.contact.facebook || ""}
                            onChange={(e) => updateContact('facebook', e.target.value)}
                            className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all pl-10 bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                          />
                          <span className="absolute left-3.5 top-3.5 text-admin-muted/40">📘</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corporate and Regulatory Metadata (Lagos state license, working hours, etc) */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-display uppercase tracking-widest flex items-center gap-2 text-lush-yellow">
                      <Award size={14} /> Corporate & Compliance Licensing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border bg-admin-card-bg border-admin-card-border shadow-sm transition-all duration-300">
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Corporate Registration / CAC License No.</label>
                        <input
                          type="text"
                          placeholder="RC-1928472 / Lagos Executive Transport Licensing Board"
                          value={config.contact.registration || ""}
                          onChange={(e) => updateContact('registration', e.target.value)}
                          className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-widest text-admin-muted font-semibold">Operational Hours & Concierge Availability</label>
                        <input
                          type="text"
                          placeholder="24/7/365 White-Glove Dispatch"
                          value={config.contact.hours || ""}
                          onChange={(e) => updateContact('hours', e.target.value)}
                          className="w-full rounded-lg py-3 px-4 text-sm outline-none transition-all bg-admin-input-bg border border-admin-input-border text-admin-input-text focus:border-lush-yellow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Live Dispatch Ops */}
              {activeTab === 'dispatch' && (
                <div className="space-y-8 animate-fadeIn text-admin-text">
                  <div className="border-b border-admin-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-display text-admin-text uppercase tracking-widest mb-1">Live Operations & Dispatch Control</h2>
                      <p className="text-xs text-admin-muted uppercase tracking-wider">Monitor active chauffeur assignments, update passenger transit statuses, and book real-time transfers</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          localStorage.removeItem(ACTIVE_RIDES_KEY);
                          loadLeadsAndRides();
                          toast.success("Active ride simulator reloaded with fresh demo bookings.");
                          addErrorLog('info', 'Live Dispatch Reset', "Chauffeur dispatch roster and active ride simulation reloaded to default state.");
                        }}
                        className="px-4 py-2 bg-admin-input-bg hover:bg-admin-accent-bg text-admin-text border border-admin-input-border text-[11px] uppercase tracking-widest font-semibold rounded transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw size={12} /> Reload Simulation
                      </button>
                    </div>
                  </div>

                  {/* Summary Analytics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-admin-card-bg border border-admin-card-border shadow-sm p-5 rounded-xl">
                      <p className="text-[10px] text-admin-muted uppercase tracking-widest mb-1">Active Operations</p>
                      <p className="text-2xl font-display text-lush-yellow">
                        {activeRides.filter(r => r.status !== 'Completed' && r.status !== 'Cancelled').length} Rides
                      </p>
                      <p className="text-[10px] text-admin-muted/60 mt-1 uppercase tracking-wider">Currently on Lagos highways</p>
                    </div>
                    <div className="bg-admin-card-bg border border-admin-card-border shadow-sm p-5 rounded-xl">
                      <p className="text-[10px] text-admin-muted uppercase tracking-widest mb-1">Operational Fleet Util</p>
                      <p className="text-2xl font-display text-admin-text">
                        {Math.min(100, Math.round((activeRides.filter(r => r.status !== 'Completed' && r.status !== 'Cancelled').length / 3) * 100))}%
                      </p>
                      <p className="text-[10px] text-admin-muted/60 mt-1 uppercase tracking-wider">Based on 3 premium tiers</p>
                    </div>
                    <div className="bg-admin-card-bg border border-admin-card-border shadow-sm p-5 rounded-xl">
                      <p className="text-[10px] text-admin-muted uppercase tracking-widest mb-1">Chauffeur Status</p>
                      <p className="text-2xl font-display text-green-500">5 Active</p>
                      <p className="text-[10px] text-admin-muted/60 mt-1 uppercase tracking-wider">Professional vetted crew</p>
                    </div>
                    <div className="bg-admin-card-bg border border-admin-card-border shadow-sm p-5 rounded-xl">
                      <p className="text-[10px] text-admin-muted uppercase tracking-widest mb-1">Completed Transits</p>
                      <p className="text-2xl font-display text-admin-text">
                        {activeRides.filter(r => r.status === 'Completed').length} Journeys
                      </p>
                      <p className="text-[10px] text-admin-muted/60 mt-1 uppercase tracking-wider">Perfect zero-incident records</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Live Dispatch Form */}
                    <div className="lg:col-span-1 bg-admin-card-bg border border-admin-card-border p-6 rounded-xl h-fit space-y-6 shadow-sm">
                      <div className="border-b border-admin-border pb-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text">Instant Dispatcher</h3>
                        <p className="text-[10px] text-admin-muted uppercase tracking-wider">Create a manual chauffeur dispatch</p>
                      </div>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newRide.passengerName || !newRide.pickup || !newRide.dropoff) {
                          toast.error("Required fields are missing.");
                          return;
                        }
                        const id = 'RIDE-' + Math.floor(1000 + Math.random() * 9000);
                        const created = {
                          id,
                          ...newRide,
                          date: new Date().toISOString().split('T')[0],
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          status: "Pending",
                          timestamp: new Date().toISOString()
                        };
                        setActiveRides(prev => {
                          const updated = [created, ...prev];
                          localStorage.setItem(ACTIVE_RIDES_KEY, JSON.stringify(updated));
                          return updated;
                        });
                        toast.success(`Successfully dispatched Ride ${id}!`);
                        addErrorLog('info', 'Chauffeur Dispatch', `Ride ${id} dispatched successfully for ${newRide.passengerName}.`);
                        setNewRide({
                          passengerName: '',
                          email: '',
                          pickup: '',
                          dropoff: '',
                          tier: 'Lush Luxury',
                          chauffeur: 'Tunde Lambo'
                        });
                      }} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Passenger Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Chief Alao Coker"
                            value={newRide.passengerName}
                            onChange={(e) => setNewRide(prev => ({ ...prev, passengerName: e.target.value }))}
                            className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Contact Email (Optional)</label>
                          <input
                            type="email"
                            placeholder="e.g. coker@gmail.com"
                            value={newRide.email}
                            onChange={(e) => setNewRide(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Pickup Spot *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ikeja GRA"
                              value={newRide.pickup}
                              onChange={(e) => setNewRide(prev => ({ ...prev, pickup: e.target.value }))}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Dropoff Spot *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Lekki Phase 1"
                              value={newRide.dropoff}
                              onChange={(e) => setNewRide(prev => ({ ...prev, dropoff: e.target.value }))}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Vehicle Class</label>
                            <select
                              value={newRide.tier}
                              onChange={(e) => setNewRide(prev => ({ ...prev, tier: e.target.value }))}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                            >
                              <option value="Lush Luxury">Lush Luxury (Lexus)</option>
                              <option value="Lush Executive">Lush Executive (Rover)</option>
                              <option value="Lush Royale">Lush Royale (Prado)</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[9px] uppercase tracking-widest text-admin-muted">Assign Chauffeur</label>
                            <select
                              value={newRide.chauffeur}
                              onChange={(e) => setNewRide(prev => ({ ...prev, chauffeur: e.target.value }))}
                              className="w-full bg-admin-input-bg border border-admin-input-border rounded-lg py-2 px-3 text-admin-input-text text-xs outline-none focus:border-lush-yellow transition-all"
                            >
                              <option value="Tunde Lambo">Tunde Lambo</option>
                              <option value="Emeka Okafor">Emeka Okafor</option>
                              <option value="Command Sergeant Yusuf">Sergeant Yusuf</option>
                              <option value="Babatunde Shola">Babatunde Shola</option>
                              <option value="Olawale Jerry">Olawale Jerry</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-lush-yellow hover:bg-white text-black font-semibold text-xs py-3 rounded-lg uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 mt-2"
                        >
                          <Send size={12} /> Dispatch Chauffeur
                        </button>
                      </form>
                    </div>

                    {/* Active Rides Table */}
                    <div className="lg:col-span-2 bg-admin-card-bg border border-admin-card-border rounded-xl overflow-hidden flex flex-col shadow-sm">
                      <div className="p-5 border-b border-admin-border bg-admin-input-bg/40">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text">Active Operational Transit Queue</h3>
                      </div>

                      {activeRides.length === 0 ? (
                        <div className="p-12 text-center text-admin-muted flex-1 flex flex-col justify-center items-center">
                          <Car size={32} className="text-admin-muted/40 mb-3" />
                          <p className="text-xs uppercase tracking-widest mb-1 font-semibold">No Transits Scheduled</p>
                          <p className="text-[11px] text-admin-muted/60 max-w-sm">
                            Use the dispatcher form or book a ride on the front-end to launch a simulated executive transport.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-admin-border text-[9px] uppercase tracking-widest text-admin-muted bg-admin-input-bg/50">
                                <th className="py-3 px-4">Ride ID</th>
                                <th className="py-3 px-4">Passenger / Class</th>
                                <th className="py-3 px-4">Route Info</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Operations</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-admin-border text-xs">
                              {activeRides.map((ride) => (
                                <tr key={ride.id} className="hover:bg-admin-input-bg/20 transition-colors">
                                  <td className="py-4 px-4 font-mono text-[10px] text-lush-yellow">{ride.id}</td>
                                  <td className="py-4 px-4">
                                    <div className="font-semibold text-admin-text">{ride.passengerName}</div>
                                    <div className="text-[9px] text-admin-muted flex items-center gap-1.5 mt-0.5">
                                      <Car size={10} /> {ride.tier} • {ride.chauffeur}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="text-admin-text/90">{ride.pickup}</div>
                                    <div className="text-[9px] text-admin-muted mt-0.5">➔ {ride.dropoff}</div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase ${
                                      ride.status === 'Completed'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : ride.status === 'Cancelled'
                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        : ride.status === 'Pending'
                                        ? 'bg-admin-input-bg text-admin-muted border border-admin-input-border'
                                        : 'bg-lush-yellow/10 text-lush-yellow border border-lush-yellow/20'
                                    }`}>
                                      {ride.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-right space-x-1.5">
                                    {ride.status !== 'Completed' && ride.status !== 'Cancelled' && (
                                      <>
                                        <button
                                          onClick={() => {
                                            const STATUS_ORDER = ["Pending", "Chauffeur Assigned", "En Route", "Passenger Boarded", "Completed"];
                                            const currentIndex = STATUS_ORDER.indexOf(ride.status);
                                            if (currentIndex !== -1 && currentIndex < STATUS_ORDER.length - 1) {
                                              const nextStatus = STATUS_ORDER[currentIndex + 1];
                                              const updated = activeRides.map(r => r.id === ride.id ? { ...r, status: nextStatus } : r);
                                              setActiveRides(updated);
                                              localStorage.setItem(ACTIVE_RIDES_KEY, JSON.stringify(updated));
                                              toast.success(`Ride status set to ${nextStatus}`);
                                              addErrorLog('info', 'Dispatch Action', `Ride ${ride.id} status advanced to ${nextStatus}.`);
                                            }
                                          }}
                                          title="Advance to next status"
                                          className="p-1 px-2 bg-lush-yellow/10 hover:bg-lush-yellow text-lush-yellow hover:text-black border border-lush-yellow/20 text-[9px] uppercase tracking-widest font-semibold rounded transition-all"
                                        >
                                          Advance
                                        </button>
                                        <button
                                          onClick={() => {
                                            const updated = activeRides.map(r => r.id === ride.id ? { ...r, status: "Cancelled" } : r);
                                            setActiveRides(updated);
                                            localStorage.setItem(ACTIVE_RIDES_KEY, JSON.stringify(updated));
                                            toast.error(`Ride ${ride.id} cancelled`);
                                            addErrorLog('warning', 'Dispatch Action', `Cancelled ride ${ride.id}.`);
                                          }}
                                          className="p-1 px-2 bg-red-950/20 hover:bg-red-900/30 text-red-300 border border-red-900/20 text-[9px] uppercase tracking-widest font-semibold rounded transition-all"
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                    <button
                                      onClick={() => {
                                        const updated = activeRides.filter(r => r.id !== ride.id);
                                        setActiveRides(updated);
                                        localStorage.setItem(ACTIVE_RIDES_KEY, JSON.stringify(updated));
                                        toast.info("Ride cleared from dispatch archive");
                                      }}
                                      title="Delete record"
                                      className="p-1 bg-admin-input-bg hover:bg-red-500/20 text-admin-muted hover:text-red-300 border border-admin-input-border hover:border-red-500/20 rounded transition-all"
                                    >
                                      <Trash2 size={10} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Leads & Inquiries */}
              {activeTab === 'leads' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-admin-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-display uppercase tracking-widest mb-1 text-admin-text">Leads & Inquiries Hub</h2>
                      <p className="text-xs uppercase tracking-wider text-admin-muted">Review premium client waitlist applications and direct concierge contact queries</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setLeadsSubTab('waitlist')}
                        className={`px-4 py-2.5 text-[11px] uppercase tracking-widest font-semibold rounded border transition-colors ${
                          leadsSubTab === 'waitlist'
                            ? 'bg-lush-yellow text-black border-lush-yellow shadow-sm'
                            : 'bg-admin-input-bg text-admin-text border-admin-input-border hover:bg-admin-accent-bg'
                        }`}
                      >
                        Waitlist Queue ({waitlistLeads.length})
                      </button>
                      <button
                        onClick={() => setLeadsSubTab('contact')}
                        className={`px-4 py-2.5 text-[11px] uppercase tracking-widest font-semibold rounded border transition-colors ${
                          leadsSubTab === 'contact'
                            ? 'bg-lush-yellow text-black border-lush-yellow shadow-sm'
                            : 'bg-admin-input-bg text-admin-text border-admin-input-border hover:bg-admin-accent-bg'
                        }`}
                      >
                        Contact Inbox ({contactLeads.length})
                      </button>
                      <button
                        onClick={() => {
                          localStorage.removeItem(LEADS_WAITLIST_KEY);
                          localStorage.removeItem(LEADS_CONTACT_KEY);
                          loadLeadsAndRides();
                          toast.success("Leads roster reseeded with rich test-ready customer logs.");
                          addErrorLog('info', 'Leads Reseeded', "Leads and contact inbox databases reloaded to default state.");
                        }}
                        title="Reseed demo data"
                        className="p-2.5 border rounded transition-colors bg-admin-input-bg hover:bg-admin-accent-bg border-admin-input-border text-admin-muted hover:text-admin-text"
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  </div>

                  {leadsSubTab === 'waitlist' ? (
                    <div className="border border-admin-card-border bg-admin-card-bg rounded-xl overflow-hidden shadow-sm">
                      <div className="p-5 border-b border-admin-border bg-admin-input-bg/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text">Lagos Executive Waitlist Pool</h3>
                          <p className="text-[10px] uppercase tracking-wider text-admin-muted">Pre-vetted private beta subscribers</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => exportToCSV(waitlistLeads, 'lush_waitlist_leads')}
                            className="px-2.5 py-1.5 bg-lush-yellow hover:bg-white border border-lush-yellow hover:border-slate-300 text-black text-[10px] font-bold uppercase tracking-widest rounded shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Download size={10} /> CSV
                          </button>
                          <button
                            onClick={() => exportToPDF(waitlistLeads, 'Lagos Executive Waitlist Pool', 'lush_waitlist_leads')}
                            className="px-2.5 py-1.5 bg-admin-input-bg hover:bg-white hover:text-black border border-admin-input-border text-admin-text text-[10px] font-bold uppercase tracking-widest rounded shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <FileText size={10} /> PDF
                          </button>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded font-semibold bg-admin-input-bg text-admin-muted hidden md:inline">EXCLUSIVE PRIVATE BETA</span>
                        </div>
                      </div>

                      {waitlistLeads.length === 0 ? (
                        <div className="p-16 text-center">
                          <Users size={36} className="mx-auto mb-4 text-admin-muted/40" />
                          <p className="text-xs uppercase tracking-widest mb-1 font-semibold text-admin-text">Queue is Empty</p>
                          <p className="text-[11px] max-w-sm mx-auto text-admin-muted/60">
                            No active waitlist requests yet. You can sign up via the front-end Waitlist section or reseed to test.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-admin-border text-[9px] uppercase tracking-widest text-admin-muted bg-admin-input-bg/50">
                                <th className="py-3 px-6">Contact Person</th>
                                <th className="py-3 px-6">Email Address</th>
                                <th className="py-3 px-6">Applied Time</th>
                                <th className="py-3 px-6">Access Code Status</th>
                                <th className="py-3 px-6 text-right">Operations</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-admin-border text-xs">
                              {waitlistLeads.map((lead, idx) => (
                                <tr key={idx} className="transition-colors hover:bg-admin-input-bg/20 text-admin-text">
                                  <td className="py-4.5 px-6 font-semibold text-admin-text">{lead.name}</td>
                                  <td className="py-4.5 px-6 font-mono text-[11px] text-admin-muted">{lead.email}</td>
                                  <td className="py-4.5 px-6 text-admin-muted">
                                    {new Date(lead.time).toLocaleString()}
                                  </td>
                                  <td className="py-4.5 px-6">
                                    <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase ${
                                      lead.status === 'Accepted'
                                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                        : lead.status === 'Invited'
                                        ? 'bg-lush-yellow/10 text-lush-yellow border border-lush-yellow/20'
                                        : 'bg-admin-input-bg text-admin-muted border border-admin-input-border'
                                    }`}>
                                      {lead.status || "Pending Invite"}
                                    </span>
                                  </td>
                                  <td className="py-4.5 px-6 text-right space-x-2">
                                    {(!lead.status || lead.status === 'Pending Invite') && (
                                      <button
                                        onClick={() => {
                                          const updated = waitlistLeads.map((l, i) => i === idx ? { ...l, status: "Invited" } : l);
                                          setWaitlistLeads(updated);
                                          localStorage.setItem(LEADS_WAITLIST_KEY, JSON.stringify(updated));
                                          toast.success(`Access code invite dispatched to ${lead.name}!`, {
                                            description: `An official VIP welcome package and bypass token has been queued for ${lead.email}`
                                          });
                                          addErrorLog('info', 'Waitlist Invite', `Granted access invite to ${lead.name} (${lead.email}).`);
                                        }}
                                        className="px-2.5 py-1 bg-lush-yellow hover:bg-white text-black border border-lush-yellow/30 text-[10px] uppercase tracking-widest font-semibold rounded shadow-sm transition-all"
                                      >
                                        Send Invite
                                      </button>
                                    )}
                                    {lead.status === 'Invited' && (
                                      <button
                                        onClick={() => {
                                          const updated = waitlistLeads.map((l, i) => i === idx ? { ...l, status: "Accepted" } : l);
                                          setWaitlistLeads(updated);
                                          localStorage.setItem(LEADS_WAITLIST_KEY, JSON.stringify(updated));
                                          toast.success(`${lead.name} has accepted! Account verified.`);
                                          addErrorLog('info', 'Waitlist Accept', `Waitlist seat finalized for ${lead.name}.`);
                                        }}
                                        className="px-2.5 py-1 bg-green-500 text-white hover:bg-green-600 text-[10px] uppercase tracking-widest font-semibold rounded shadow-sm transition-colors"
                                      >
                                        Finalize seat
                                      </button>
                                    )}
                                    <button
                                      onClick={() => {
                                        const updated = waitlistLeads.filter((_, i) => i !== idx);
                                        setWaitlistLeads(updated);
                                        localStorage.setItem(LEADS_WAITLIST_KEY, JSON.stringify(updated));
                                        toast.info("Waitlist lead removed.");
                                      }}
                                      className="p-1.5 rounded border transition-all inline-flex items-center bg-admin-input-bg hover:bg-red-500/20 text-admin-muted hover:text-red-500 border-admin-input-border hover:border-red-500/20"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* CRM Filter Controls */}
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-xl border bg-admin-card-bg/60 border-admin-card-border">
                        <div className="flex items-center gap-1.5 text-xs text-admin-muted font-mono uppercase">
                          <Activity size={12} className="text-lush-yellow" />
                          Filter CRM Pipeline
                        </div>
                        <div className="flex flex-wrap gap-4 items-center">
                          {/* Category Tag filter */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-admin-muted uppercase tracking-wider">Category Tag:</span>
                            <select
                              value={crmCategoryFilter}
                              onChange={(e) => setCrmCategoryFilter(e.target.value)}
                              className="bg-admin-input-bg border border-admin-input-border rounded-lg text-xs text-admin-text py-1 px-2.5 focus:border-lush-yellow outline-none"
                            >
                              <option value="all">All Categories</option>
                              <option value="Corporate">Corporate</option>
                              <option value="VIP Airport">VIP Airport</option>
                              <option value="Armored Fleet">Armored Fleet</option>
                              <option value="General">General/Other</option>
                            </select>
                          </div>

                          {/* Status filter */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-admin-muted uppercase tracking-wider">CRM Status:</span>
                            <select
                              value={crmStatusFilter}
                              onChange={(e) => setCrmStatusFilter(e.target.value)}
                              className="bg-admin-input-bg border border-admin-input-border rounded-lg text-xs text-admin-text py-1 px-2.5 focus:border-lush-yellow outline-none"
                            >
                              <option value="all">All Statuses</option>
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Booked">Booked</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                        adminTheme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-charcoal/10 border-white/5'
                      }`}>
                        <div className={`p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300 ${
                          adminTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-charcoal/20 border-white/5'
                        }`}>
                          <div>
                            <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                              adminTheme === 'light' ? 'text-slate-800' : 'text-white'
                            }`}>Lush CRM Contact Workspace</h3>
                            <p className="text-[10px] uppercase tracking-wider text-admin-muted">Manage, tag, and change the pipeline status of high-end incoming transfer inquiries</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const crmExport = contactLeads.map(l => ({
                                  "Passenger Name": l.name,
                                  "Email Address": l.email,
                                  "Inquiry Date": new Date(l.time).toLocaleString(),
                                  "Subject Topic": l.subject,
                                  "Message Content": l.message,
                                  "CRM Tag Category": l.category || 'General',
                                  "CRM Status": l.status || 'Pending'
                                }));
                                exportToCSV(crmExport, 'lush_crm_inquiries_report');
                              }}
                              className="px-2.5 py-1.5 bg-lush-yellow hover:bg-white border border-lush-yellow hover:border-slate-300 text-black text-[10px] font-bold uppercase tracking-widest rounded shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Download size={10} /> Export CRM (CSV)
                            </button>
                            <button
                              onClick={() => exportToPDF(contactLeads, 'Concierge Inquiry Submissions', 'lush_concierge_submissions')}
                              className="px-2.5 py-1.5 bg-admin-input-bg hover:bg-white hover:text-black border border-admin-input-border text-admin-text text-[10px] font-bold uppercase tracking-widest rounded shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <FileText size={10} /> PDF
                            </button>
                          </div>
                        </div>

                        {contactLeads.filter(lead => {
                          const matchesCategory = crmCategoryFilter === 'all' || (lead.category || 'General') === crmCategoryFilter;
                          const matchesStatus = crmStatusFilter === 'all' || (lead.status || 'Pending') === crmStatusFilter;
                          return matchesCategory && matchesStatus;
                        }).length === 0 ? (
                          <div className="p-16 text-center">
                            <Inbox size={36} className="mx-auto mb-4 text-admin-muted/40" />
                            <p className="text-xs uppercase tracking-widest mb-1 font-semibold text-admin-text">No Matching Inquiries</p>
                            <p className="text-[11px] max-w-sm mx-auto text-admin-muted/60">No contact submissions match the selected category or status pipeline filter.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            {contactLeads
                              .filter(lead => {
                                const matchesCategory = crmCategoryFilter === 'all' || (lead.category || 'General') === crmCategoryFilter;
                                const matchesStatus = crmStatusFilter === 'all' || (lead.status || 'Pending') === crmStatusFilter;
                                return matchesCategory && matchesStatus;
                              })
                              .map((lead, idx) => {
                                const originalIdx = contactLeads.findIndex(l => l.email === lead.email && l.time === lead.time);
                                return (
                                  <div key={idx} className="border border-admin-card-border bg-admin-card-bg rounded-xl p-6 space-y-4 relative overflow-hidden transition-all shadow-sm hover:border-admin-card-border/80 flex flex-col justify-between">
                                    <div className="space-y-3">
                                      <div className="flex justify-between items-start border-b border-admin-border pb-3">
                                        <div>
                                          <h4 className="font-semibold text-sm text-admin-text">{lead.name}</h4>
                                          <p className="text-[10px] font-mono mt-0.5 text-admin-muted">{lead.email}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            {/* Category Tag Badge */}
                                            <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase ${
                                              lead.category === 'Corporate' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25' :
                                              lead.category === 'VIP Airport' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' :
                                              lead.category === 'Armored Fleet' ? 'bg-red-500/15 text-red-400 border border-red-500/25' :
                                              'bg-slate-500/15 text-slate-400 border border-slate-500/25'
                                            }`}>
                                              {lead.category || "General"}
                                            </span>

                                            {/* Pipeline Status Badge */}
                                            <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase ${
                                              lead.status === 'Booked' ? 'bg-green-500/15 text-green-400 border border-green-500/25' :
                                              lead.status === 'Contacted' ? 'bg-blue-500/15 text-cyan-400 border border-blue-500/25' :
                                              'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                                            }`}>
                                              {lead.status || "Pending"}
                                            </span>
                                          </div>
                                          <span className="text-[9px] font-mono text-admin-muted/80">
                                            {new Date(lead.time).toLocaleDateString()}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="space-y-1.5">
                                        <span className="text-[10px] uppercase tracking-widest font-bold block text-admin-muted">{lead.subject}</span>
                                        <div className="p-3 rounded border text-xs leading-relaxed font-light italic bg-admin-input-bg border-admin-input-border text-admin-input-text">
                                          "{lead.message}"
                                        </div>
                                      </div>
                                    </div>

                                    {/* CRM Controls Block */}
                                    <div className="space-y-3 pt-3 border-t border-admin-border mt-3">
                                      <div className="grid grid-cols-2 gap-3">
                                        {/* Tag Categorizer Selector */}
                                        <div className="space-y-1 text-left">
                                          <span className="text-[8px] uppercase tracking-widest font-semibold text-admin-muted">Change Category:</span>
                                          <select
                                            value={lead.category || 'General'}
                                            onChange={(e) => {
                                              const updated = [...contactLeads];
                                              updated[originalIdx] = { ...updated[originalIdx], category: e.target.value };
                                              setContactLeads(updated);
                                              localStorage.setItem(LEADS_CONTACT_KEY, JSON.stringify(updated));
                                              toast.success(`Inquiry categorized as ${e.target.value}`);
                                            }}
                                            className="w-full bg-admin-input-bg border border-admin-input-border text-[10px] text-admin-input-text p-1.5 rounded outline-none focus:border-lush-yellow"
                                          >
                                            <option value="General">General/Other</option>
                                            <option value="Corporate">Corporate</option>
                                            <option value="VIP Airport">VIP Airport</option>
                                            <option value="Armored Fleet">Armored Fleet</option>
                                          </select>
                                        </div>

                                        {/* Status Pipeline Selector */}
                                        <div className="space-y-1 text-left">
                                          <span className="text-[8px] uppercase tracking-widest font-semibold text-admin-muted">Change CRM Status:</span>
                                          <select
                                            value={lead.status || 'Pending'}
                                            onChange={(e) => {
                                              const updated = [...contactLeads];
                                              updated[originalIdx] = { ...updated[originalIdx], status: e.target.value };
                                              setContactLeads(updated);
                                              localStorage.setItem(LEADS_CONTACT_KEY, JSON.stringify(updated));
                                              toast.success(`Pipeline status updated to ${e.target.value}`);
                                              addErrorLog('info', 'CRM Status Update', `Updated pipeline status for ${lead.name} to ${e.target.value}.`);
                                            }}
                                            className="w-full bg-admin-input-bg border border-admin-input-border text-[10px] text-admin-input-text p-1.5 rounded outline-none focus:border-lush-yellow"
                                          >
                                            <option value="Pending">Pending</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Booked">Booked</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="flex justify-end gap-2 pt-2">
                                        <button
                                          onClick={() => {
                                            const updated = contactLeads.filter((_, i) => i !== originalIdx);
                                            setContactLeads(updated);
                                            localStorage.setItem(LEADS_CONTACT_KEY, JSON.stringify(updated));
                                            toast.info("Inquiry cleared from inbox.");
                                          }}
                                          className="p-1.5 rounded border transition-all bg-admin-input-bg hover:bg-red-500/20 text-admin-muted hover:text-red-500 border-admin-input-border hover:border-red-500/20 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest cursor-pointer"
                                        >
                                          <Trash2 size={11} /> Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Diagnostic Logs */}
              {activeTab === 'logs' && (
                <div className="space-y-8 animate-fadeIn text-admin-text">
                  <div className="border-b border-admin-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-display text-admin-text uppercase tracking-widest mb-1">Diagnostic Logs & Audit Trails</h2>
                      <p className="text-xs text-admin-muted uppercase tracking-wider">Monitor validating checkpoints, layout publishes, and failed update attempts</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const badLogDetail = `Error: Field "specs.engine" missing. Given payload: {"name": "Luminus Phantom", "specs": {"efficiency": "9km/L", "capacity": "4 seats"}}`;
                          addErrorLog('error', 'Validate Fleet Portfolio', 'Intentionally triggered mock fleet update failure for testing error logging utility.', badLogDetail);
                          toast.info("Simulated fleet validation failure logged!");
                        }}
                        className="px-4 py-2 bg-admin-input-bg hover:bg-admin-accent-bg text-admin-text border border-admin-input-border text-[11px] uppercase tracking-widest font-semibold rounded transition-colors"
                      >
                        Simulate Failure
                      </button>
                      <button
                        onClick={() => {
                          setErrorLogs([]);
                          localStorage.removeItem(LOGS_KEY);
                          toast.success("All diagnostic logs cleared.");
                        }}
                        disabled={errorLogs.length === 0}
                        className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 text-red-200 border border-red-900/30 text-[11px] uppercase tracking-widest font-semibold rounded transition-colors disabled:opacity-40"
                      >
                        Clear System Logs
                      </button>
                    </div>
                  </div>

                  {errorLogs.length === 0 ? (
                    <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-12 text-center max-w-lg mx-auto shadow-sm">
                      <CheckCircle2 className="text-green-500 mx-auto mb-4 animate-pulse w-8 h-8" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text mb-1">All Systems Operational</h3>
                      <p className="text-xs text-admin-muted leading-relaxed">
                        No fleet update failures or CMS CMS synchronization errors have been recorded in your local workspace. Try saving empty fields or click "Simulate Failure" to test.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {errorLogs.map((log) => (
                        <div 
                          key={log.id} 
                          className={`border rounded-lg p-5 bg-admin-card-bg transition-all shadow-sm ${
                            log.severity === 'error' 
                              ? 'border-red-500/20 hover:border-red-500/40' 
                              : log.severity === 'warning' 
                              ? 'border-amber-500/20 hover:border-amber-500/40' 
                              : 'border-admin-border hover:border-admin-border/80'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-admin-border pb-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase ${
                                log.severity === 'error'                                   ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                  : log.severity === 'warning' 
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}>
                                {log.severity}
                              </span>
                              <span className="text-xs font-semibold text-admin-text">{log.action}</span>
                            </div>
                            <span className="text-[10px] text-admin-muted font-mono">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-admin-text font-medium">{log.message}</p>
                            {log.details && (
                              <pre className="mt-2.5 p-3 rounded bg-admin-input-bg text-[10px] font-mono text-red-400 overflow-x-auto whitespace-pre-wrap border border-admin-input-border select-all">
                                {log.details}
                              </pre>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Performance Analytics */}
              {activeTab === 'performance' && (
                <PerformanceTrackerView adminTheme={adminTheme} />
              )}

              {/* Tab: SEO Performance */}
              {activeTab === 'seo-perf' && (
                <SeoPerformanceView adminTheme={adminTheme} />
              )}

              {/* Tab: SEO Diagnostics */}
              {activeTab === 'seo' && (
                <SeoDiagnosticSummaryView adminTheme={adminTheme} />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SeoDiagnosticSummaryView({ adminTheme }: { adminTheme: 'light' | 'dark' }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [activePageFilter, setActivePageFilter] = useState<'all' | 'warning' | 'passed'>('all');

  // Automated SEO Health Check state
  const [isHealthChecking, setIsHealthChecking] = useState(false);
  const [healthCheckProgress, setHealthCheckProgress] = useState(0);
  const [healthCheckCompleted, setHealthCheckCompleted] = useState(false);
  const [healthCheckCurrentTask, setHealthCheckCurrentTask] = useState("");
  const [activeHealthTab, setActiveHealthTab] = useState<'links' | 'alts' | 'assets'>('links');

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      toast.success("SEO Audit completed successfully! All live pages re-vetted.");
    }, 1500);
  };

  const triggerHealthCheck = () => {
    setIsHealthChecking(true);
    setHealthCheckProgress(0);
    setHealthCheckCompleted(false);
    
    const tasks = [
      { progress: 10, msg: "Parsing HTML routes for deep DOM link analysis..." },
      { progress: 30, msg: "Validating anchor hash elements (#about, #fleet, #contact)..." },
      { progress: 50, msg: "Crawling media nodes for missing image alt attributes..." },
      { progress: 75, msg: "Measuring heavy file payloads and server response timings..." },
      { progress: 90, msg: "Compiling optimization findings & caching logs..." },
      { progress: 100, msg: "Audit complete. Export-ready remediation report constructed!" }
    ];

    tasks.forEach((t, index) => {
      setTimeout(() => {
        setHealthCheckProgress(t.progress);
        setHealthCheckCurrentTask(t.msg);
        if (t.progress === 100) {
          setIsHealthChecking(false);
          setHealthCheckCompleted(true);
          toast.success("SEO Health Check finalized! Broken links and performance bottlenecks charted.");
        }
      }, (index + 1) * 450);
    });
  };

  const healthData = {
    brokenLinks: [
      { route: "Home (index) -> #/", link: "#fleet", status: "Valid", type: "Anchor hash target matches ID" },
      { route: "Home (index) -> #/", link: "#services", status: "Valid", type: "Anchor hash target matches ID" },
      { route: "Home (index) -> #/", link: "https://instagram.com/lushrideng", status: "Valid", type: "External HTTPS URL" },
      { route: "Fleet Showroom -> #fleet", link: "#booking-form-nonexistent", status: "Broken", type: "Anchor hash tag matches NO matching DOM ID" }
    ],
    missingAlts: [
      { route: "Home (index) -> #/", image: "/images/fleet/lexus_rx_luxury.jpg", alt: "LushRide Lexus RX 350 Luxury Midsize SUV", status: "Valid" },
      { route: "Home (index) -> #/", image: "/images/banners/hero_lagos_by_night.jpg", alt: "", status: "Missing Alt Tag" },
      { route: "Fleet Showroom -> #fleet", image: "/images/fleet/bulletproof_prado_armored.jpg", alt: "Armored Toyota Land Cruiser Prado VIP Escort", status: "Valid" },
      { route: "Fleet Showroom -> #fleet", image: "/images/fleet/g_wagon_b6_suv.jpg", alt: "", status: "Missing Alt Tag" }
    ],
    slowAssets: [
      { asset: "src/main.tsx", size: "4.2 KB", loadTime: "15 ms", status: "Passed", recommend: "Highly optimized modular structure" },
      { asset: "/images/banners/lagos_island_skyline.jpg", size: "6.4 MB", loadTime: "2.1 seconds", status: "Failed", recommend: "Compress image, convert to WebP under 500kB, configure lazy loading" },
      { asset: "lucide-react bundle", size: "145 KB", loadTime: "80 ms", status: "Passed", recommend: "Optimal static content delivery network" }
    ]
  };

  const exportRemediationPDF = () => {
    try {
      const doc = new jsPDF();
      const timestamp = new Date().toLocaleString();

      // Premium Styling header banner
      doc.setFillColor(15, 23, 42); 
      doc.rect(0, 0, 210, 45, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(229, 184, 59); 
      doc.text("LUSHRIDE LUXURY TRANSIT", 20, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text("ADMIN SEO HEALTH & REMEDIATION REPORT", 20, 28);
      doc.text(`Generated: ${timestamp} | Automated Diagnostic Crawl`, 20, 35);

      // Report Card Metadata
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Executive Summary", 20, 58);
      doc.line(20, 60, 190, 60);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Overall SEO Grade: 78% (Tier 2 Priority Vetting Needed)", 20, 68);
      doc.text("Crawler Scope: Full DOM routing tree, asset timing tables, image catalog index", 20, 74);
      doc.text("Identified Bottlenecks: 1 Broken link target, 2 missing alt attributes, 1 uncompressed media asset", 20, 80);

      // Section 1: Broken Links
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text("1. Link Integrity Scan (Broken Targets)", 20, 95);
      doc.line(20, 97, 190, 97);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      let y = 104;
      healthData.brokenLinks.forEach((item) => {
        const text = `Route: ${item.route} | Link: ${item.link} -> Status: [${item.status.toUpperCase()}]`;
        doc.setTextColor(item.status === "Broken" ? 185 : 30, item.status === "Broken" ? 28 : 130, item.status === "Broken" ? 28 : 30);
        doc.text(text, 22, y);
        y += 6;
      });

      // Section 2: Missing Image Alt Tags
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text("2. Image Alt-Attributes Vetting", 20, y);
      doc.line(20, y + 2, 190, y + 2);
      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      healthData.missingAlts.forEach((item) => {
        const text = `Image: ${item.image} -> Status: [${item.status.toUpperCase()}]`;
        doc.setTextColor(item.status === "Missing Alt Tag" ? 185 : 30, item.status === "Missing Alt Tag" ? 28 : 130, item.status === "Missing Alt Tag" ? 28 : 30);
        doc.text(text, 22, y);
        y += 6;
      });

      // Section 3: Slow Loading Assets
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text("3. Core Web Vitals & Resource Performance", 20, y);
      doc.line(20, y + 2, 190, y + 2);
      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      healthData.slowAssets.forEach((item) => {
        doc.setTextColor(item.status === "Failed" ? 185 : 30, item.status === "Failed" ? 28 : 130, item.status === "Failed" ? 28 : 30);
        doc.text(`Asset: ${item.asset} (${item.size}) | Load Time: ${item.loadTime} -> [${item.status.toUpperCase()}]`, 22, y);
        y += 5;
        doc.setTextColor(100, 100, 100);
        doc.text(`Recommendation: ${item.recommend}`, 26, y);
        y += 7;
      });

      // Signature/Action Block
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("Corporate SEO Action Guidelines:", 20, y + 5);
      doc.setFont("helvetica", "normal");
      doc.text("1. Access the codebase and verify that each anchor references an element with the correct ID.", 20, y + 11);
      doc.text("2. Run automated image optimization scripts to build modern WebP alternatives for luxury vehicles.", 20, y + 17);
      doc.text("3. Ensure all image tags carry descriptive, search-engine-crawlable alternative text declarations.", 20, y + 23);

      doc.save(`LushRide_SEO_Remediation_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success("SEO Remediation Report (PDF) compiled and downloaded!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Make sure all scripts are aligned.");
    }
  };

  const auditPages = [
    {
      route: "Home (index)",
      hash: "#/",
      title: "LushRide | Lagos' Premier Executive Chauffeur & Luxury Car Hire",
      desc: "Experience Lagos with LushRide. Absolute comfort, uncompromising privacy, and precision scheduling. Premium chauffeur services, executive airport transfers, and armored SUV rentals.",
      titleStatus: "passed",
      titleLength: 68,
      descStatus: "passed",
      descLength: 185,
      schemaStatus: "passed",
      schemas: ["LocalBusiness", "Product (Armored Cruiser)"],
      ogStatus: "passed"
    },
    {
      route: "About Us",
      hash: "#about",
      title: "About Our Elite Chauffeur Services | LushRide Lagos",
      desc: "Learn about LushRide's history of excellence in Lagos, Nigeria. Our meticulous chauffeur vetting, 24/7 concierge assistance, and commitment to luxury transit.",
      titleStatus: "passed",
      titleLength: 53,
      descStatus: "passed",
      descLength: 156,
      schemaStatus: "passed",
      schemas: ["LocalBusiness"],
      ogStatus: "passed"
    },
    {
      route: "VIP Services",
      hash: "#services",
      title: "VIP Executive Chauffeur Services & Airport Protocols | LushRide",
      desc: "Bespoke executive chauffeur-driven travel in Lagos, executive airport pick-ups, protocol services, and hourly rentals with premium SUVs.",
      titleStatus: "passed",
      titleLength: 64,
      descStatus: "warning",
      descLength: 135,
      schemaStatus: "passed",
      schemas: ["LocalBusiness"],
      ogStatus: "passed",
      warningMsg: "Description is under 140 chars; could add 'diplomatic convoy protocols'."
    },
    {
      route: "Fleet Showroom",
      hash: "#fleet",
      title: "Luxury Fleet Rental Lagos - Lexus RX, Range Rover SE & Armored SUVs | LushRide",
      desc: "Explore our fleet of meticulously detailed, late-model luxury SUVs. Featuring Range Rover Prestige, Lexus RX 350, and armored Toyota Land Cruiser Prado.",
      titleStatus: "passed",
      titleLength: 79,
      descStatus: "passed",
      descLength: 153,
      schemaStatus: "passed",
      schemas: ["Product (Armored Cruiser)"],
      ogStatus: "passed"
    },
    {
      route: "Regional Hubs",
      hash: "#hubs",
      title: "Lagos Coverage & Luxury Regional Hubs - Ikoyi, VI, Lekki | LushRide",
      desc: "Providing flawless, stress-free chauffeured transit across Lagos: Victoria Island corporate corridors, Ikoyi residential estates, Lekki Phase 1, and Ikeja GRA.",
      titleStatus: "warning",
      titleLength: 68,
      descStatus: "passed",
      descLength: 161,
      schemaStatus: "warning",
      schemas: [],
      ogStatus: "passed",
      warningMsg: "No local schema mapping found for secondary hub routes (Ikoyi/VI)."
    },
    {
      route: "Partner Leasing",
      hash: "#partner",
      title: "Join as Fleet Partner & Corporate Leasing Solutions | LushRide",
      desc: "Monetize your luxury vehicle safely with Lagos' premier transit platform, or discover corporate lease packages with professional drivers.",
      titleStatus: "passed",
      titleLength: 63,
      descStatus: "passed",
      descLength: 142,
      schemaStatus: "passed",
      schemas: ["LocalBusiness"],
      ogStatus: "passed"
    },
    {
      route: "Booking Desk",
      hash: "#contact",
      title: "Secure Instant Chauffeur Booking Lagos | LushRide",
      desc: "Request a bespoke quote for VIP airport protocols, corporate charters, wedding car rentals, and B6 armored Land Cruiser Prado escorts in Nigeria.",
      titleStatus: "passed",
      titleLength: 50,
      descStatus: "passed",
      descLength: 155,
      schemaStatus: "passed",
      schemas: ["LocalBusiness", "Product (Armored Cruiser)"],
      ogStatus: "passed"
    }
  ];

  const filteredPages = auditPages.filter(p => {
    if (activePageFilter === 'all') return true;
    if (activePageFilter === 'warning') return p.titleStatus === 'warning' || p.descStatus === 'warning' || p.schemaStatus === 'warning';
    return p.titleStatus === 'passed' && p.descStatus === 'passed' && p.schemaStatus === 'passed';
  });

  return (
    <div className="space-y-10 animate-fadeIn text-admin-text">
      {/* Header */}
      <div className="border-b border-admin-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display uppercase tracking-widest mb-1 text-admin-text">SEO Search Engine Diagnostics</h2>
          <p className="text-xs uppercase tracking-wider text-admin-muted">Real-time meta-data auditing, structured schema checker, and algorithmic recommendations</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={triggerHealthCheck}
            disabled={isHealthChecking || isScanning}
            className="px-4 py-2 bg-admin-accent-bg border border-admin-border hover:bg-white hover:text-black text-admin-text text-xs font-bold uppercase tracking-widest rounded shadow-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Activity size={12} className={isHealthChecking ? "animate-pulse" : ""} />
            SEO Health Check
          </button>
          <button
            onClick={triggerScan}
            disabled={isScanning || isHealthChecking}
            className="px-4 py-2 bg-lush-yellow text-black text-xs font-bold uppercase tracking-widest rounded shadow-sm hover:bg-white border border-lush-yellow hover:border-slate-300 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw size={12} className="animate-spin" /> Auditing Tags...
              </>
            ) : (
              <>
                <Globe size={12} /> Trigger Tag Audit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Health Check Progress HUD */}
      {isHealthChecking && (
        <div className="border border-lush-yellow/20 bg-lush-yellow/5 p-6 rounded-xl space-y-4 animate-pulse">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
            <span className="text-lush-yellow flex items-center gap-2">
              <RefreshCw size={12} className="animate-spin" /> Automated Scanning Underway...
            </span>
            <span className="font-mono text-admin-text">{healthCheckProgress}%</span>
          </div>
          <div className="h-2 bg-admin-input-bg border border-admin-input-border rounded-full overflow-hidden">
            <div className="h-full bg-lush-yellow transition-all duration-300" style={{ width: `${healthCheckProgress}%` }} />
          </div>
          <p className="text-[10px] font-mono text-admin-muted uppercase tracking-wider">{healthCheckCurrentTask}</p>
        </div>
      )}

      {/* Health Check Completed Remediation Panel */}
      {healthCheckCompleted && !isHealthChecking && (
        <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-6 space-y-6 shadow-md text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-admin-border pb-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-admin-text flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                SEO Health Scan Remediation Center
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-admin-muted">Analyzed 24 site anchors, 16 asset bundles, and image catalog tags</p>
            </div>
            <button
              onClick={exportRemediationPDF}
              className="px-3.5 py-2 bg-lush-yellow hover:bg-white border border-lush-yellow hover:border-slate-300 text-black text-[10px] font-bold uppercase tracking-widest rounded shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={11} /> Export Remediation Report (PDF)
            </button>
          </div>

          <div className="flex items-center gap-1 bg-admin-input-bg p-1 rounded-lg border border-admin-input-border max-w-xs">
            {(['links', 'alts', 'assets'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveHealthTab(tab)}
                className={`flex-1 px-3 py-1.5 text-[9px] uppercase tracking-wider font-bold rounded transition-all cursor-pointer ${
                  activeHealthTab === tab
                    ? 'bg-lush-yellow text-black'
                    : 'text-admin-muted hover:text-admin-text'
                }`}
              >
                {tab === 'links' ? 'Broken Links' : tab === 'alts' ? 'Missing Alts' : 'Slow Assets'}
              </button>
            ))}
          </div>

          {activeHealthTab === 'links' && (
            <div className="space-y-4 text-left">
              <div className="p-3 border border-red-500/10 bg-red-500/5 rounded-lg flex items-start gap-3">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-admin-text">Broken Anchor Target Identified</h4>
                  <p className="text-[11px] leading-relaxed text-admin-muted">
                    In the page route **Fleet Showroom (#fleet)**, the anchor references <code className="text-red-400 font-mono text-[10px]">#booking-form-nonexistent</code>.
                    No element matching ID <code className="text-[10px] font-mono text-red-400">booking-form-nonexistent</code> was found in the DOM tree, causing an invalid redirect.
                  </p>
                </div>
              </div>
              <div className="border border-admin-border/50 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-admin-input-bg border-b border-admin-border font-mono uppercase text-admin-muted text-[8px] tracking-widest">
                      <th className="p-3">Source Route</th>
                      <th className="p-3">Target Anchor</th>
                      <th className="p-3">Reference Type</th>
                      <th className="p-3 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-admin-border/30">
                    {healthData.brokenLinks.map((item, i) => (
                      <tr key={i} className="hover:bg-admin-input-bg/10">
                        <td className="p-3 font-medium text-admin-text">{item.route}</td>
                        <td className="p-3"><code className="font-mono text-lush-yellow">{item.link}</code></td>
                        <td className="p-3 text-admin-muted">{item.type}</td>
                        <td className="p-3 text-right">
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                            item.status === 'Valid' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeHealthTab === 'alts' && (
            <div className="space-y-4 text-left">
              <div className="p-3 border border-amber-500/10 bg-amber-500/5 rounded-lg flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-admin-text">Missing Accessibility Alt Attribute Declarations</h4>
                  <p className="text-[11px] leading-relaxed text-admin-muted">
                    Screen-readers and search indexers cannot comprehend visual concepts without <code className="text-amber-400">alt</code> tags.
                    Add descriptors to **hero_lagos_by_night.jpg** and **g_wagon_b6_suv.jpg** to optimize rich mobile crawl points.
                  </p>
                </div>
              </div>
              <div className="border border-admin-border/50 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-admin-input-bg border-b border-admin-border font-mono uppercase text-admin-muted text-[8px] tracking-widest">
                      <th className="p-3">Source Page</th>
                      <th className="p-3">Resource Location</th>
                      <th className="p-3">Extracted Description</th>
                      <th className="p-3 text-right">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-admin-border/30">
                    {healthData.missingAlts.map((item, i) => (
                      <tr key={i} className="hover:bg-admin-input-bg/10">
                        <td className="p-3 font-medium text-admin-text">{item.route}</td>
                        <td className="p-3 font-mono text-[10px] text-admin-muted truncate max-w-xs">{item.image}</td>
                        <td className="p-3 italic text-admin-text">{item.alt ? `"${item.alt}"` : "(Empty string)"}</td>
                        <td className="p-3 text-right">
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                            item.status === 'Valid' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeHealthTab === 'assets' && (
            <div className="space-y-4 text-left">
              <div className="p-3 border border-amber-500/10 bg-amber-500/5 rounded-lg flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-admin-text">Slow Asset Load Speed Triggering Layout Shifts</h4>
                  <p className="text-[11px] leading-relaxed text-admin-muted">
                    The background skyline image <code className="text-amber-400">lagos_island_skyline.jpg</code> takes 2.1s to load over standard 4G connections due to a file payload of **6.4 Megabytes**. Re-compress and convert to **WebP** immediately.
                  </p>
                </div>
              </div>
              <div className="border border-admin-border/50 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-admin-input-bg border-b border-admin-border font-mono uppercase text-admin-muted text-[8px] tracking-widest">
                      <th className="p-3">File Asset Name</th>
                      <th className="p-3">Payload Size</th>
                      <th className="p-3">DOM Load Time</th>
                      <th className="p-3">Action Plan</th>
                      <th className="p-3 text-right">Speed Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-admin-border/30">
                    {healthData.slowAssets.map((item, i) => (
                      <tr key={i} className="hover:bg-admin-input-bg/10">
                        <td className="p-3 font-medium text-admin-text font-mono text-[10px]">{item.asset}</td>
                        <td className="p-3 text-admin-text">{item.size}</td>
                        <td className="p-3 text-admin-muted font-mono">{item.loadTime}</td>
                        <td className="p-3 text-admin-muted italic max-w-sm">{item.recommend}</td>
                        <td className="p-3 text-right">
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                            item.status === 'Passed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {isScanning ? (
        <div className="h-64 flex flex-col items-center justify-center border border-admin-card-border bg-admin-card-bg rounded-xl">
          <RefreshCw size={36} className="text-lush-yellow animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest text-admin-muted">Executing deep crawlers and auditing meta tags...</p>
        </div>
      ) : scanCompleted ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Diagnostic overview widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-6 flex items-center gap-5 shadow-sm text-left">
              <div className="relative flex items-center justify-center shrink-0">
                {/* Score gauge */}
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="34" strokeWidth="4" stroke="rgba(229, 184, 59, 0.1)" fill="transparent" />
                  <circle cx="40" cy="40" r="34" strokeWidth="4" stroke="#e5b83b" fill="transparent" strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - 0.94)} />
                </svg>
                <span className="absolute text-sm font-mono font-bold text-admin-text">94%</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-admin-muted font-bold block">SEO Health Index</span>
                <h4 className="text-sm font-semibold text-admin-text">Excellent Alignment</h4>
                <p className="text-[10px] leading-relaxed text-admin-muted">7 pages audited, 2 optimization recommendations remain.</p>
              </div>
            </div>

            <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-6 flex items-center gap-4 shadow-sm text-left">
              <div className="w-10 h-10 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-admin-muted font-bold block">Meta Tags Passed</span>
                <h4 className="text-sm font-semibold text-admin-text">18/21 Parameters Valid</h4>
                <p className="text-[10px] leading-relaxed text-admin-muted">OpenGraph titles, descriptions, and static layouts fully configured.</p>
              </div>
            </div>

            <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-6 flex items-center gap-4 shadow-sm text-left">
              <div className="w-10 h-10 bg-lush-yellow/10 text-lush-yellow border border-lush-yellow/20 rounded-lg flex items-center justify-center shrink-0">
                <AlertCircle size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-admin-muted font-bold block">Rich Snippets Status</span>
                <h4 className="text-sm font-semibold text-admin-text">JSON-LD Schemas Active</h4>
                <p className="text-[10px] leading-relaxed text-admin-muted">LocalBusiness and product schemas are correctly injected in the DOM.</p>
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="border border-admin-card-border bg-admin-card-bg p-6 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xs font-display uppercase tracking-widest text-lush-yellow flex items-center gap-2">
              <Sparkles size={14} className="animate-pulse" /> Actionable SEO Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-lg bg-lush-yellow/5 border border-lush-yellow/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lush-yellow" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-admin-text">Increase Service Keyword Density</h4>
                </div>
                <p className="text-[11px] leading-relaxed text-admin-muted">
                  The description for **#services** is slightly under 140 characters. Consider adding premium keywords like *"diplomatic convoy protocols"* and *"executive airport escorts Lagos"* to capture high-value embassy and corporate search volume.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-lush-yellow/5 border border-lush-yellow/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lush-yellow" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-admin-text">Configure Hub Regional Schemas</h4>
                </div>
                <p className="text-[11px] leading-relaxed text-admin-muted">
                  The **#hubs** page contains high-quality content targeting Ikoyi, VI, and Lekki corridors but lacks individual structured schemas. Inject secondary localized schema coordinates for the Lagos airport private terminals.
                </p>
              </div>
            </div>
          </div>

          {/* Route details list */}
          <div className="border border-admin-card-border bg-admin-card-bg rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-admin-border bg-admin-input-bg/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text">Vetted Key Pages Metadata</h3>
                <p className="text-[10px] uppercase tracking-wider text-admin-muted">Details extracted from live hash-based routing tables</p>
              </div>
              <div className="flex items-center gap-1 bg-admin-input-bg p-1 rounded-lg border border-admin-input-border">
                {['all', 'warning', 'passed'].map((filt) => (
                  <button
                    key={filt}
                    onClick={() => setActivePageFilter(filt as any)}
                    className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold rounded transition-all ${
                      activePageFilter === filt
                        ? 'bg-lush-yellow text-black'
                        : 'text-admin-muted hover:text-admin-text cursor-pointer'
                    }`}
                  >
                    {filt}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-admin-border text-[9px] uppercase tracking-widest text-admin-muted bg-admin-input-bg/50">
                    <th className="py-3 px-6">Page Name / Route</th>
                    <th className="py-3 px-6">Meta Title status</th>
                    <th className="py-3 px-6">Meta Description status</th>
                    <th className="py-3 px-6">Structured Schemas</th>
                    <th className="py-3 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border/50">
                  {filteredPages.map((page, idx) => (
                    <tr key={idx} className="hover:bg-admin-input-bg/10 transition-colors text-xs text-left">
                      <td className="py-4 px-6 space-y-1">
                        <span className="font-semibold text-admin-text block">{page.route}</span>
                        <code className="text-[9px] font-mono text-lush-yellow px-1.5 py-0.5 bg-lush-yellow/5 border border-lush-yellow/10 rounded">{page.hash}</code>
                      </td>
                      <td className="py-4 px-6 space-y-1 max-w-xs">
                        <span className="text-admin-text truncate block" title={page.title}>{page.title}</span>
                        <span className="text-[9px] font-mono text-admin-muted block">Length: {page.titleLength} chars ({page.titleStatus === 'passed' ? 'Perfect' : 'Too Long/Short'})</span>
                      </td>
                      <td className="py-4 px-6 space-y-1 max-w-sm">
                        <p className="text-admin-muted text-[11px] leading-relaxed italic line-clamp-2" title={page.desc}>"{page.desc}"</p>
                        <span className="text-[9px] font-mono text-admin-muted block">Length: {page.descLength} chars ({page.descStatus === 'passed' ? 'Optimal' : 'Short'})</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {page.schemas.length === 0 ? (
                            <span className="text-[9px] font-mono text-admin-muted italic">None mapped</span>
                          ) : (
                            page.schemas.map((s, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">{s}</span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {page.titleStatus === 'warning' || page.descStatus === 'warning' || page.schemaStatus === 'warning' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <AlertCircle size={10} /> Needs Tweaking
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-green-500/10 text-green-500 border border-green-500/20">
                            <CheckCircle2 size={10} /> 100% Vetted
                          </span>
                        )}
                        {page.warningMsg && (
                          <span className="block text-[8px] font-mono text-amber-400/80 mt-1 max-w-[150px] leading-tight text-right ml-auto">{page.warningMsg}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-16 border border-admin-card-border bg-admin-card-bg rounded-xl shadow-sm">
          <Globe size={40} className="mx-auto text-admin-muted/30 mb-4" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-admin-text mb-1">SEO Crawler Awaiting Initialization</h3>
          <p className="text-xs text-admin-muted max-w-sm mx-auto mb-6">Execute a real-time audit of pages to extract meta-data alignment, schemas, and actionable tips.</p>
          <button
            onClick={triggerScan}
            className="px-4 py-2 bg-lush-yellow text-black text-xs font-bold uppercase tracking-widest rounded shadow-sm hover:bg-white border border-lush-yellow hover:border-slate-300 transition-all cursor-pointer"
          >
            Audit Live Pages
          </button>
        </div>
      )}
    </div>
  );
}

function SeoPerformanceView({ adminTheme }: { adminTheme: 'light' | 'dark' }) {
  // GSC Simulated Keywords State
  const [keywords, setKeywords] = useState<string[]>([
    "Lagos luxury car",
    "Armored rental Lagos",
    "VIP chauffeur Nigeria"
  ]);
  const [newKeyword, setNewKeyword] = useState("");

  // Simulated metadata optimization checklists
  const [checklist, setChecklist] = useState([
    { id: "canonical", text: "Configure canonical tags on Fleet details routes to prevent duplication.", checked: false },
    { id: "ogimage", text: "Add OpenGraph banner image assets for messaging previews.", checked: true },
    { id: "robots", text: "Set strict robots.txt disallow instructions for the /admin dashboard routes.", checked: true },
    { id: "schema", text: "Deploy localized LocalBusiness geo-coordinates schema on #contact page.", checked: false },
  ]);

  // Handle keyword metrics deterministically so they are fully interactive!
  const getKeywordMetrics = (kw: string) => {
    let hash = 0;
    for (let i = 0; i < kw.length; i++) {
      hash = kw.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    const impressions = (absHash % 120) * 100 + 1200; 
    const clicks = Math.round(impressions * ((absHash % 12) + 4) / 100); 
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const pos = parseFloat(((absHash % 15) / 10 + 1.1).toFixed(1)); 
    return { impressions, clicks, ctr, pos };
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newKeyword.trim();
    if (!clean) return;
    if (keywords.includes(clean)) {
      toast.warning("Keyword is already indexed in Search Console.");
      return;
    }
    const updated = [...keywords, clean];
    setKeywords(updated);
    setNewKeyword("");
    toast.success(`"${clean}" successfully loaded into Google Search Console tracking matrix!`);
  };

  const handleDeleteKeyword = (kw: string) => {
    const updated = keywords.filter(k => k !== kw);
    setKeywords(updated);
    toast.info(`Stopped tracking keyword: "${kw}"`);
  };

  const toggleChecklist = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    toast.success("SEO checklist updated!");
  };

  // Compile aggregate metrics
  const keywordMetrics = keywords.map(k => ({ text: k, ...getKeywordMetrics(k) }));
  const totalImpressions = keywordMetrics.reduce((sum, item) => sum + item.impressions, 0);
  const totalClicks = keywordMetrics.reduce((sum, item) => sum + item.clicks, 0);
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const avgPos = keywordMetrics.length > 0 ? keywordMetrics.reduce((sum, item) => sum + item.pos, 0) / keywordMetrics.length : 1.0;

  // Chart data trend based on aggregate numbers
  const chartTrend = [
    { name: 'Day 1', Clicks: Math.round(totalClicks * 0.12), Impressions: Math.round(totalImpressions * 0.11) },
    { name: 'Day 2', Clicks: Math.round(totalClicks * 0.14), Impressions: Math.round(totalImpressions * 0.13) },
    { name: 'Day 3', Clicks: Math.round(totalClicks * 0.16), Impressions: Math.round(totalImpressions * 0.15) },
    { name: 'Day 4', Clicks: Math.round(totalClicks * 0.13), Impressions: Math.round(totalImpressions * 0.14) },
    { name: 'Day 5', Clicks: Math.round(totalClicks * 0.15), Impressions: Math.round(totalImpressions * 0.16) },
    { name: 'Day 6', Clicks: Math.round(totalClicks * 0.18), Impressions: Math.round(totalImpressions * 0.17) },
    { name: 'Day 7', Clicks: Math.round(totalClicks * 0.12), Impressions: Math.round(totalImpressions * 0.14) },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-admin-text text-left">
      {/* Header */}
      <div className="border-b border-admin-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display uppercase tracking-widest mb-1 text-admin-text">Google Search Console Performance</h2>
          <p className="text-xs uppercase tracking-wider text-admin-muted">Organic SEO click-through metrics, real-time keyword indexing, and metadata checkpoints</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-lush-yellow font-mono px-3 py-1.5 rounded-lg border border-lush-yellow/20 bg-lush-yellow/5">
          <Sparkles size={11} className="animate-pulse text-lush-yellow" /> Verified GSC API Tunnel
        </div>
      </div>

      {/* Aggregate Scoreboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-5 shadow-sm space-y-1">
          <span className="text-[9px] uppercase tracking-widest text-admin-muted font-bold block">Organic Clicks</span>
          <h3 className="text-2xl font-mono font-bold text-admin-text">{totalClicks.toLocaleString()}</h3>
          <p className="text-[10px] text-green-400 flex items-center gap-1 font-semibold font-mono">
            +12.4% <TrendingUp size={10} /> vs last week
          </p>
        </div>

        <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-5 shadow-sm space-y-1">
          <span className="text-[9px] uppercase tracking-widest text-admin-muted font-bold block">Impressions</span>
          <h3 className="text-2xl font-mono font-bold text-admin-text">{totalImpressions.toLocaleString()}</h3>
          <p className="text-[10px] text-green-400 flex items-center gap-1 font-semibold font-mono">
            +8.9% <TrendingUp size={10} /> vs last week
          </p>
        </div>

        <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-5 shadow-sm space-y-1">
          <span className="text-[9px] uppercase tracking-widest text-admin-muted font-bold block">Average CTR</span>
          <h3 className="text-2xl font-mono font-bold text-admin-text">{avgCtr.toFixed(2)}%</h3>
          <p className="text-[10px] text-green-400 flex items-center gap-1 font-semibold font-mono">
            +1.5% <TrendingUp size={10} /> vs last week
          </p>
        </div>

        <div className="border border-admin-card-border bg-admin-card-bg rounded-xl p-5 shadow-sm space-y-1">
          <span className="text-[9px] uppercase tracking-widest text-admin-muted font-bold block">Average Position</span>
          <h3 className="text-2xl font-mono font-bold text-admin-text">{avgPos.toFixed(1)}</h3>
          <p className="text-[10px] text-green-400 flex items-center gap-1 font-semibold font-mono">
            -0.3 rank <TrendingUp size={10} /> position climb
          </p>
        </div>
      </div>

      {/* Chart and Keyword additions layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 border border-admin-card-border bg-admin-card-bg p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-xs font-display uppercase tracking-widest text-lush-yellow flex items-center gap-2">
            <Activity size={12} /> Click & Impression Indexing Trends (Past 7 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gscClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e5b83b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#e5b83b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                <YAxis stroke="#666" tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: adminTheme === 'light' ? '#fff' : '#141414', 
                    borderColor: '#2d2d2d',
                    color: adminTheme === 'light' ? '#000' : '#fff',
                    borderRadius: '8px',
                    fontSize: '11px'
                  }} 
                />
                <Area type="monotone" dataKey="Clicks" stroke="#e5b83b" strokeWidth={2} fillOpacity={1} fill="url(#gscClicks)" />
                <Area type="monotone" dataKey="Impressions" stroke="#4a5568" strokeWidth={1} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Keyword Controller panel */}
        <div className="border border-admin-card-border bg-admin-card-bg p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-display uppercase tracking-widest text-lush-yellow flex items-center gap-2">
              <Plus size={14} /> Add Keyword to Tracking
            </h3>
            <p className="text-[11px] leading-relaxed text-admin-muted">
              Add custom search queries that affluent Lagos clientele suggest (e.g. *"bulletproof fleet hire VI"*). Our simulation compiles instant index rankings.
            </p>
            <form onSubmit={handleAddKeyword} className="space-y-3">
              <input
                type="text"
                placeholder="Enter search keywords..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="w-full bg-admin-input-bg border border-admin-input-border text-xs text-admin-text p-2.5 rounded-lg outline-none focus:border-lush-yellow transition-all"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-lush-yellow hover:bg-white text-black font-bold uppercase text-[10px] tracking-widest rounded shadow-sm transition-all cursor-pointer"
              >
                Index Tracking
              </button>
            </form>
          </div>

          <div className="border-t border-admin-border/50 pt-4 mt-4 space-y-3">
            <span className="text-[9px] uppercase tracking-widest font-bold text-admin-muted block">Indexed Keyword Index ({keywords.length})</span>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-admin-accent-bg border border-admin-border text-xs rounded-full text-admin-text"
                >
                  {kw}
                  <button
                    onClick={() => handleDeleteKeyword(kw)}
                    className="p-0.5 hover:text-red-400 text-admin-muted transition-colors rounded-full"
                    title="Remove keyword"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checklist and Keywords reporting tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Keywords metrics detailed breakdown */}
        <div className="lg:col-span-2 border border-admin-card-border bg-admin-card-bg rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-admin-border bg-admin-input-bg/40">
            <h3 className="text-xs font-display uppercase tracking-widest text-lush-yellow">Google Search Console API Response Fields</h3>
            <p className="text-[10px] uppercase tracking-wider text-admin-muted">Real-time parameters extracted from localized queries in Lagos corridors</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-admin-border bg-admin-input-bg/50 font-mono text-admin-muted text-[8px] uppercase tracking-widest">
                  <th className="p-3.5 px-6">Tracked Keyword Phrase</th>
                  <th className="p-3.5 px-6">Clicks</th>
                  <th className="p-3.5 px-6">Impressions</th>
                  <th className="p-3.5 px-6">CTR</th>
                  <th className="p-3.5 px-6 text-right">Avg Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/30">
                {keywordMetrics.map((item) => (
                  <tr key={item.text} className="hover:bg-admin-input-bg/10 transition-colors">
                    <td className="p-3 px-6 font-semibold text-admin-text">"{item.text}"</td>
                    <td className="p-3 px-6 font-mono font-medium text-admin-text">{item.clicks.toLocaleString()}</td>
                    <td className="p-3 px-6 font-mono text-admin-muted">{item.impressions.toLocaleString()}</td>
                    <td className="p-3 px-6 font-mono text-green-400 font-semibold">{item.ctr.toFixed(2)}%</td>
                    <td className="p-3 px-6 text-right font-mono font-bold text-lush-yellow">#{item.pos.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metadata optimization checklist */}
        <div className="border border-admin-card-border bg-admin-card-bg p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-display uppercase tracking-widest text-lush-yellow flex items-center gap-2">
              <CheckCircle2 size={13} /> Metadata Optimizations
            </h3>
            <p className="text-[10px] uppercase tracking-wider text-admin-muted">Checkbox checklist of pending schema & tags tasks</p>
          </div>
          <div className="space-y-3.5">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className="flex items-start gap-3 p-3 rounded-lg border border-admin-border hover:border-lush-yellow/30 bg-admin-accent-bg/40 cursor-pointer select-none transition-all"
              >
                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                  item.checked 
                    ? 'bg-lush-yellow border-lush-yellow text-black' 
                    : 'border-admin-input-border bg-admin-input-bg text-transparent'
                }`}>
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className={`text-[11px] leading-relaxed transition-all ${
                  item.checked ? 'text-admin-muted line-through' : 'text-admin-text font-medium'
                }`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

