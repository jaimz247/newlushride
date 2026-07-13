import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, CheckCircle2, AlertCircle, Plus, Trash2, Save, 
  HelpCircle, Phone, Info, Car, FileText, LogOut, RefreshCw, Eye, Sparkles, AlertTriangle, Terminal,
  Activity, Gauge, Zap, TrendingUp, Laptop, MousePointer
} from 'lucide-react';
import { toast } from 'sonner';
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

function PerformanceTrackerView() {
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

  // Helpers to get ratings & colors
  const getTtfbRating = (v: number) => {
    if (v <= 200) return { label: 'Optimal (Excellent)', color: 'text-green-400', bg: 'bg-green-500' };
    if (v <= 600) return { label: 'Acceptable', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Needs Optimization', color: 'text-red-400', bg: 'bg-red-500' };
  };

  const getFcpRating = (v: number) => {
    if (v <= 1000) return { label: 'Optimal (Excellent)', color: 'text-green-400', bg: 'bg-green-500' };
    if (v <= 3000) return { label: 'Acceptable', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Needs Attention', color: 'text-red-400', bg: 'bg-red-500' };
  };

  const getLoadRating = (v: number) => {
    if (v <= 1500) return { label: 'Optimal (Executive Speed)', color: 'text-green-400', bg: 'bg-green-500' };
    if (v <= 4000) return { label: 'Good', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Slow Connection', color: 'text-red-400', bg: 'bg-red-500' };
  };

  const getClsRating = (v: number) => {
    if (v <= 0.1) return { label: 'Stable (Excellent)', color: 'text-green-400', bg: 'bg-green-500' };
    if (v <= 0.25) return { label: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Unstable Layout', color: 'text-red-400', bg: 'bg-red-500' };
  };

  const getFidRating = (v: number) => {
    if (v <= 100) return { label: 'Responsive (Instant)', color: 'text-green-400', bg: 'bg-green-500' };
    if (v <= 300) return { label: 'Slight Delay', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'Unresponsive', color: 'text-red-400', bg: 'bg-red-500' };
  };

  const ttfbRate = getTtfbRating(metrics.ttfb);
  const fcpRate = getFcpRating(metrics.fcp);
  const loadRate = getLoadRating(metrics.loadTime);
  const clsRate = getClsRating(metrics.cls);
  const fidRate = getFidRating(metrics.fid);

  return (
    <div className="space-y-10 animate-fadeIn text-white">
      <div className="border-b border-white/5 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-1">Core Web Vitals & Analytics</h2>
          <p className="text-xs text-[#999] uppercase tracking-wider">Real-time performance measurements and visitor engagement tracking</p>
        </div>
        <button
          onClick={() => {
            logEngagementEvent('system', 'Manual performance check triggered', 'Diagnostics reloaded successfully');
            toast.success("Diagnostics refreshed!");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-lush-yellow hover:bg-lush-yellow/90 text-charcoal text-xs font-semibold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(249,211,0,0.15)] transition-all"
        >
          <RefreshCw size={12} /> Force Diagnostic Check
        </button>
      </div>

      {/* Grid of meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metric Card: TTFB */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Response Latency</span>
              <h3 className="text-sm font-semibold tracking-wide text-white">TTFB (Time to First Byte)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${ttfbRate.color}`}>{metrics.ttfb} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${ttfbRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.ttfb / 800) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-white/30 uppercase tracking-widest font-mono">
              <span>0ms</span>
              <span className={ttfbRate.color}>{ttfbRate.label}</span>
              <span>800ms</span>
            </div>
          </div>
        </div>

        {/* Metric Card: FCP */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Visual Initialization</span>
              <h3 className="text-sm font-semibold tracking-wide text-white">FCP (First Contentful Paint)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${fcpRate.color}`}>{metrics.fcp} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${fcpRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.fcp / 3000) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-white/30 uppercase tracking-widest font-mono">
              <span>0ms</span>
              <span className={fcpRate.color}>{fcpRate.label}</span>
              <span>3000ms</span>
            </div>
          </div>
        </div>

        {/* Metric Card: Load Time */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40">App Initialization</span>
              <h3 className="text-sm font-semibold tracking-wide text-white">Page Fully Loaded</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${loadRate.color}`}>{metrics.loadTime} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${loadRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.loadTime / 5000) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-white/30 uppercase tracking-widest font-mono">
              <span>0ms</span>
              <span className={loadRate.color}>{loadRate.label}</span>
              <span>5000ms</span>
            </div>
          </div>
        </div>

        {/* Metric Card: CLS */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Visual Stability</span>
              <h3 className="text-sm font-semibold tracking-wide text-white">CLS (Cumulative Layout Shift)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${clsRate.color}`}>{metrics.cls}</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${clsRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.cls / 0.3) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-white/30 uppercase tracking-widest font-mono">
              <span>0.00</span>
              <span className={clsRate.color}>{clsRate.label}</span>
              <span>0.30+</span>
            </div>
          </div>
        </div>

        {/* Metric Card: FID */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Input Responsiveness</span>
              <h3 className="text-sm font-semibold tracking-wide text-white">FID (First Input Delay)</h3>
            </div>
            <span className={`text-xl font-mono font-bold ${fidRate.color}`}>{metrics.fid} ms</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${fidRate.bg} transition-all duration-500`}
                style={{ width: `${Math.min(100, (metrics.fid / 300) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-white/30 uppercase tracking-widest font-mono">
              <span>0ms</span>
              <span className={fidRate.color}>{fidRate.label}</span>
              <span>300ms</span>
            </div>
          </div>
        </div>

        {/* Connection telemetry card */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-6 flex flex-col justify-between space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-lush-yellow/[0.02] rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-lush-yellow/10 border border-lush-yellow/20 rounded-lg flex items-center justify-center text-lush-yellow">
              <Zap size={16} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-white/30">Client Network Status</span>
              <h4 className="text-xs font-semibold text-white/90">Central Broadband Uplink</h4>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 text-left">
            <div className="bg-white/[0.01] p-2 rounded border border-white/5">
              <span className="text-[8px] uppercase text-white/40 block font-mono">RTT / latency</span>
              <span className="text-xs font-semibold font-mono text-white/90">{metrics.rtt} ms</span>
            </div>
            <div className="bg-white/[0.01] p-2 rounded border border-white/5">
              <span className="text-[8px] uppercase text-white/40 block font-mono">bandwidth</span>
              <span className="text-xs font-semibold font-mono text-white/90">{metrics.downlink} Mbps</span>
            </div>
            <div className="bg-white/[0.01] p-2 rounded border border-white/5">
              <span className="text-[8px] uppercase text-white/40 block font-mono">Class of conn.</span>
              <span className="text-xs font-semibold font-mono text-lush-yellow uppercase">{metrics.effectiveType}</span>
            </div>
            <div className="bg-white/[0.01] p-2 rounded border border-white/5">
              <span className="text-[8px] uppercase text-white/40 block font-mono">Total Views</span>
              <span className="text-xs font-semibold font-mono text-white/90">{metrics.totalViews}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time User Engagement Event Log Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lush-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lush-yellow"></span>
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Live Engagement Telemetry Feed</h3>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("lush_engagement_events");
              setTelemetry(getTelemetryData());
              toast.success("Engagement logs cleared");
            }}
            disabled={events.length === 0}
            className="text-[10px] font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest disabled:opacity-40"
          >
            Clear Feed
          </button>
        </div>

        {events.length === 0 ? (
          <div className="border border-white/5 bg-charcoal/30 rounded-xl p-12 text-center max-w-lg mx-auto">
            <Laptop className="text-white/20 mx-auto mb-4 w-8 h-8" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-1">Awaiting Visitor Activity</h3>
            <p className="text-[11px] text-white/40 leading-relaxed">
              No recent interaction metrics have been cached yet. Try scrolling the homepage, clicking options, or opening from other devices to watch live logs stream in.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {events.map((event) => (
              <div 
                key={event.id}
                className="flex items-start gap-3 p-3.5 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-lg transition-colors text-left"
              >
                <div className={`p-2 rounded-md shrink-0 ${
                  event.category === 'click' 
                    ? 'bg-lush-yellow/10 text-lush-yellow' 
                    : event.category === 'scroll' 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : event.category === 'visibility' 
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'bg-white/5 text-white/70'
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
                    <p className="text-xs font-semibold text-white truncate">{event.action}</p>
                    <span className="text-[9px] font-mono text-white/30 shrink-0">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {event.details && (
                    <p className="text-[10px] text-white/50 font-mono mt-0.5">{event.details}</p>
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
  const [activeTab, setActiveTab] = useState<'hero' | 'fleet' | 'faq' | 'contact' | 'logs' | 'performance'>('hero');
  const [errorLogs, setErrorLogs] = useState<FleetErrorLog[]>([]);

  // Token cache key
  const TOKEN_KEY = "lush_admin_token";
  const LOGS_KEY = "lush_fleet_error_logs";

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setIsAuthenticated(true);
      fetchConfig();
    } else {
      setIsLoading(false);
    }

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
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      } else {
        toast.error("Failed to load site configurations from server.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Network error when connecting to server.");
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

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(TOKEN_KEY, data.token);
        setIsAuthenticated(true);
        toast.success("Welcome Back, Commander. Authorized access granted.");
        fetchConfig();
      } else {
        const err = await res.json();
        toast.error(err.error || "Access denied. Invalid password.");
      }
    } catch (e) {
      toast.error("Failed to connect to authentication gateway.");
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
        toast.success("All changes successfully persisted to server storage! Production site updated.", {
          duration: 4000
        });
        addErrorLog('info', 'Publish Suite Configurations', 'Configuration successfully published to server database.', 'IP Address/Client: Local Admin CMS Console');
      } else {
        const err = await res.json();
        const errMsg = err.error || "Failed to update configurations.";
        toast.error(errMsg);
        addErrorLog('error', 'Publish Suite Configurations', `Server rejected layout updates: ${errMsg}`, `Authorization Token: Match, Status Code: ${res.status}`);
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      toast.error("Network error saving changes. Please try again.");
      addErrorLog('error', 'Publish Suite Configurations', 'Network error occurred while trying to save configurations.', errorMsg);
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

  const updateContact = (key: 'phone' | 'email' | 'address' | 'whatsapp', val: string) => {
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
    <div className="fixed inset-0 z-50 bg-[#080808] text-white flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="shrink-0 bg-[#0c0c0c] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-lush-yellow/10 border border-lush-yellow/30 text-lush-yellow text-[10px] uppercase tracking-widest font-semibold rounded">
            ADMIN CENTRAL
          </div>
          <h1 className="text-lg font-display uppercase tracking-wider text-white hidden md:block">
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

          <button
            onClick={handleLogout}
            title="Terminate session"
            className="p-2.5 rounded border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all flex items-center justify-center"
          >
            <LogOut size={16} />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 border border-white/20 hover:border-white text-xs tracking-widest uppercase text-white/80 hover:text-white transition-all rounded"
            >
              Close
            </button>
          )}
        </div>
      </header>

      {/* Main Container Split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Rail */}
        <aside className="w-16 md:w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col shrink-0">
          <div className="p-4 hidden md:block select-none border-b border-white/5">
            <p className="text-[10px] text-[#555] uppercase tracking-widest font-semibold">WORKSPACE SECTIONS</p>
          </div>
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'hero' 
                  ? 'bg-lush-yellow text-black font-semibold' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Hero Section</span>
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'fleet' 
                  ? 'bg-lush-yellow text-black font-semibold' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Car size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Fleet Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'faq' 
                  ? 'bg-lush-yellow text-black font-semibold' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">FAQ Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'contact' 
                  ? 'bg-lush-yellow text-black font-semibold' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Phone size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Contact Routing</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'logs' 
                  ? 'bg-lush-yellow text-black font-semibold' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Diagnostic Logs</span>
            </button>

            <button
              onClick={() => setActiveTab('performance')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded transition-all text-left ${
                activeTab === 'performance' 
                  ? 'bg-lush-yellow text-black font-semibold' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity size={16} />
              <span className="hidden md:inline uppercase tracking-widest text-xs">Core Web Vitals</span>
            </button>
          </nav>

          <div className="p-4 border-t border-white/5 hidden md:block">
            <div className="flex items-center gap-2 text-[10px] text-white/30 tracking-wider">
              <Sparkles size={10} className="text-lush-yellow" /> LIVE PRODUCTION SYNC
            </div>
          </div>
        </aside>

        {/* Editing Panels Workspace */}
        <main className="flex-1 bg-[#050505] overflow-y-auto p-6 md:p-10">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <RefreshCw className="text-lush-yellow animate-spin mb-4" size={32} />
              <p className="text-xs uppercase tracking-widest text-white/40">Fetching Secure Configuration...</p>
            </div>
          ) : !config ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center border border-dashed border-white/10 rounded-xl max-w-md mx-auto my-12">
              <AlertTriangle className="text-red-500 mb-4 animate-bounce" size={40} />
              <h2 className="text-lg font-display text-white uppercase tracking-widest mb-2">Boot Error</h2>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                Could not retrieve custom configuration from the database. Please reload or contact technical support.
              </p>
              <button 
                onClick={fetchConfig}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors text-xs uppercase tracking-widest font-semibold rounded"
              >
                <RefreshCw size={12} /> Retry Gateway
              </button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-10 pb-20">
              {/* Tab: Hero Editor */}
              {activeTab === 'hero' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-white/5 pb-6">
                    <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-1">Hero Presentation</h2>
                    <p className="text-xs text-[#999] uppercase tracking-wider">Customize the greeting and first impression copy lines</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 bg-charcoal/30 border border-white/5 p-6 rounded-xl">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Hero Large Title</label>
                      <input
                        type="text"
                        value={config.hero.title}
                        onChange={(e) => updateHero('title', e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all"
                      />
                      <p className="text-[10px] text-white/40 italic">Use '\n' to trigger a hard line break for visual styling hierarchy</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Subheading Tagline</label>
                      <textarea
                        rows={4}
                        value={config.hero.subtitle}
                        onChange={(e) => updateHero('subtitle', e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Fleet Manager */}
              {activeTab === 'fleet' && (
                <div className="space-y-12 animate-fadeIn">
                  <div className="border-b border-white/5 pb-6">
                    <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-1">Fleet Portfolio</h2>
                    <p className="text-xs text-[#999] uppercase tracking-wider">Customize vehicle categories, specifications, active images, comfort features & safety suites</p>
                  </div>

                  {config.fleet.map((car, fleetIdx) => (
                    <div key={fleetIdx} className="bg-charcoal/35 border border-white/10 rounded-xl p-8 relative space-y-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      {/* Floating Ribbon Accent */}
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-lush-yellow to-transparent rounded-l-xl" />

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#f9d300] font-semibold">Tier Category #{fleetIdx + 1}</span>
                          <h3 className="text-xl font-display text-white">{car.name}</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Visual Headline Name</label>
                          <input
                            type="text"
                            value={car.name}
                            onChange={(e) => updateFleetField(fleetIdx, 'name', e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Sub-model / Year Label</label>
                          <input
                            type="text"
                            value={car.subtitle}
                            onChange={(e) => updateFleetField(fleetIdx, 'subtitle', e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all"
                          />
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="border-t border-white/5 pt-6">
                        <p className="text-[10px] uppercase tracking-widest text-white/50 mb-4 font-semibold">Mechanical Specifications</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-[#777]">Engine Drive</label>
                            <input
                              type="text"
                              value={car.specs.engine}
                              onChange={(e) => updateFleetSpecField(fleetIdx, 'engine', e.target.value)}
                              className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-[#777]">Fuel Efficiency</label>
                            <input
                              type="text"
                              value={car.specs.efficiency}
                              onChange={(e) => updateFleetSpecField(fleetIdx, 'efficiency', e.target.value)}
                              className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-[#777]">Sitting Capacity</label>
                            <input
                              type="text"
                              value={car.specs.capacity}
                              onChange={(e) => updateFleetSpecField(fleetIdx, 'capacity', e.target.value)}
                              className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Images */}
                      <div className="border-t border-white/5 pt-6 space-y-4">
                        <div className="flex justify-between items-center bg-black/20 p-2 rounded border border-white/5">
                          <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Active Images Showcase ({car.images.length})</p>
                          <button
                            type="button"
                            onClick={() => addFleetArrayItem(fleetIdx, 'images')}
                            className="flex items-center gap-1.5 text-[10px] text-[#f9d300] hover:underline"
                          >
                            <Plus size={12} /> Add Image Url
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {car.images.map((imgUrl, imgIdx) => (
                            <div key={imgIdx} className="flex gap-2 items-center bg-black/40 p-3 rounded-lg border border-white/10">
                              <span className="text-[10px] font-mono text-[#555] select-none">#{imgIdx + 1}</span>
                              <input
                                type="text"
                                value={imgUrl}
                                onChange={(e) => handleFleetArrayItemChange(fleetIdx, 'images', imgIdx, e.target.value)}
                                className="flex-1 bg-black/60 border border-white/10 rounded py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow font-mono"
                                placeholder="/my-car-image.jpg or https://..."
                              />
                              <div className="w-10 h-10 border border-white/20 rounded overflow-hidden bg-charcoal/50 shrink-0">
                                {imgUrl && <img src={imgUrl} alt="Preset visual" className="w-full h-full object-cover" onError={(e) => { (e.target as any).style.display = 'none' }} />}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFleetArrayItem(fleetIdx, 'images', imgIdx)}
                                className="text-white/40 hover:text-red-500 p-2 transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comfort and Safety List Items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                        {/* Comfort Features */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-black/20 p-2 rounded border border-white/5">
                            <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Comfort Specifications</span>
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
                              <div key={featIdx} className="flex gap-2 items-center bg-black/20 p-1.5 rounded border border-white/5">
                                <input
                                  type="text"
                                  value={feat}
                                  onChange={(e) => handleFleetArrayItemChange(fleetIdx, 'comfortFeatures', featIdx, e.target.value)}
                                  className="flex-1 bg-transparent py-1 px-2 text-white text-xs outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFleetArrayItem(fleetIdx, 'comfortFeatures', featIdx)}
                                  className="text-white/30 hover:text-red-500 cursor-pointer"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Safety Features */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-black/20 p-2 rounded border border-white/5">
                            <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Safety Specifications</span>
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
                              <div key={featIdx} className="flex gap-2 items-center bg-black/20 p-1.5 rounded border border-white/5">
                                <input
                                  type="text"
                                  value={feat}
                                  onChange={(e) => handleFleetArrayItemChange(fleetIdx, 'safetyFeatures', featIdx, e.target.value)}
                                  className="flex-1 bg-transparent py-1 px-2 text-white text-xs outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFleetArrayItem(fleetIdx, 'safetyFeatures', featIdx)}
                                  className="text-white/30 hover:text-red-500 cursor-pointer"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Overviews & History */}
                      <div className="border-t border-white/5 pt-6 space-y-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Tier Design Overview Narrative</label>
                          <textarea
                            rows={3}
                            value={car.overview}
                            onChange={(e) => updateFleetField(fleetIdx, 'overview', e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Security Safety Specs</label>
                            <input
                              type="text"
                              value={car.safety}
                              onChange={(e) => updateFleetField(fleetIdx, 'safety', e.target.value)}
                              className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Fleet History Provenance</label>
                            <input
                              type="text"
                              value={car.history}
                              onChange={(e) => updateFleetField(fleetIdx, 'history', e.target.value)}
                              className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow"
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
                  <div className="border-b border-white/5 pb-6 flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-1">Frequently Asked Questions</h2>
                      <p className="text-xs text-[#999] uppercase tracking-wider">Create, edit, and reorganize FAQ accordions on production page</p>
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
                      <div key={index} className="bg-charcoal/30 border border-white/10 rounded-xl p-6 relative space-y-4 shadow">
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex gap-2 items-center flex-1">
                            <span className="text-[10px] uppercase text-white/40 tracking-widest">Category:</span>
                            <input
                              type="text"
                              value={faq.category}
                              onChange={(e) => handleFaqChange(index, 'category', e.target.value)}
                              className="bg-black/45 border border-white/10 rounded px-2.5 py-1 text-xs text-[#f9d300] outline-none tracking-widest uppercase font-mono"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFaq(index)}
                            className="text-white/30 hover:text-red-500 p-1.5 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-[#777]">Question Title</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                              className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[9px] uppercase tracking-widest text-[#777]">Answer Paragraph</label>
                            <textarea
                              rows={3}
                              value={faq.answer}
                              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                              className="w-full bg-black/60 border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-lush-yellow resize-none"
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
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-white/5 pb-6">
                    <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-1">Contact Routing & Operations</h2>
                    <p className="text-xs text-[#999] uppercase tracking-wider">Update telephone lines, emails, maps, and active dispatch targets</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-charcoal/30 border border-white/5 p-6 rounded-xl">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Direct Chauffeur Line (Display)</label>
                      <input
                        type="text"
                        value={config.contact.phone}
                        onChange={(e) => updateContact('phone', e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Concierge WhatsApp Number</label>
                      <input
                        type="text"
                        value={config.contact.whatsapp}
                        onChange={(e) => updateContact('whatsapp', e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Operational HQ Address</label>
                      <input
                        type="text"
                        value={config.contact.address}
                        onChange={(e) => updateContact('address', e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest text-[#aaa]">Corporate Enquiries Email</label>
                      <input
                        type="email"
                        value={config.contact.email}
                        onChange={(e) => updateContact('email', e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg py-3 px-4 text-white text-sm outline-none focus:border-lush-yellow transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Diagnostic Logs */}
              {activeTab === 'logs' && (
                <div className="space-y-8 animate-fadeIn text-white">
                  <div className="border-b border-white/5 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-1">Diagnostic Logs & Audit Trails</h2>
                      <p className="text-xs text-[#999] uppercase tracking-wider">Monitor validating checkpoints, layout publishes, and failed update attempts</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const badLogDetail = `Error: Field "specs.engine" missing. Given payload: {"name": "Luminus Phantom", "specs": {"efficiency": "9km/L", "capacity": "4 seats"}}`;
                          addErrorLog('error', 'Validate Fleet Portfolio', 'Intentionally triggered mock fleet update failure for testing error logging utility.', badLogDetail);
                          toast.info("Simulated fleet validation failure logged!");
                        }}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-[11px] uppercase tracking-widest font-semibold rounded transition-colors"
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
                    <div className="border border-white/5 bg-charcoal/30 rounded-xl p-12 text-center max-w-lg mx-auto">
                      <CheckCircle2 className="text-green-500 mx-auto mb-4 animate-pulse w-8 h-8" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-1">All Systems Operational</h3>
                      <p className="text-xs text-white/50 leading-relaxed">
                        No fleet update failures or CMS synchronization errors have been recorded in your local workspace. Try saving empty fields or click "Simulate Failure" to test.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {errorLogs.map((log) => (
                        <div 
                          key={log.id} 
                          className={`border rounded-lg p-5 bg-charcoal/20 transition-all ${
                            log.severity === 'error' 
                              ? 'border-red-500/20 hover:border-red-500/40' 
                              : log.severity === 'warning' 
                              ? 'border-amber-500/20 hover:border-amber-500/40' 
                              : 'border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase ${
                                log.severity === 'error' 
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                  : log.severity === 'warning' 
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}>
                                {log.severity}
                              </span>
                              <span className="text-xs font-semibold text-white/80">{log.action}</span>
                            </div>
                            <span className="text-[10px] text-white/30 font-mono">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-white/90 font-medium">{log.message}</p>
                            {log.details && (
                              <pre className="mt-2.5 p-3 rounded bg-black/80 text-[10px] font-mono text-red-200/90 overflow-x-auto whitespace-pre-wrap border border-white/5 select-all">
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
                <PerformanceTrackerView />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
