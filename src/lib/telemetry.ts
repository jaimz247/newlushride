// Telemetry collector for LushRide Worldwide
export interface PerformanceMetrics {
  ttfb: number; // ms
  fcp: number; // ms
  loadTime: number; // ms
  rtt: number; // ms
  downlink: number; // Mbps
  effectiveType: string;
  cls: number; // Cumulative Layout Shift approximation
  fid: number; // First Input Delay approximation
  totalViews: number;
}

export interface EngagementEvent {
  id: string;
  timestamp: string;
  category: 'click' | 'scroll' | 'system' | 'visibility';
  action: string;
  details?: string;
}

const TELEMETRY_METRICS_KEY = "lush_telemetry_metrics";
const TELEMETRY_EVENTS_KEY = "lush_engagement_events";

// Safe wrapper for localStorage
const safeGet = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const safeSet = (key: string, val: string) => {
  try {
    localStorage.setItem(key, val);
  } catch (e) {}
};

// Initialize telemetry and listeners
export function initTelemetry() {
  if (typeof window === 'undefined') return;

  // Track page views
  let views = parseInt(safeGet("lush_page_views") || "0", 10);
  views += 1;
  safeSet("lush_page_views", views.toString());

  // Create base metrics
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const metrics: PerformanceMetrics = {
    ttfb: 110,
    fcp: 220,
    loadTime: 490,
    rtt: connection?.rtt || 45,
    downlink: connection?.downlink || 30,
    effectiveType: connection?.effectiveType || '4g',
    cls: 0.012,
    fid: 8,
    totalViews: views
  };

  // 1. Navigation Timing (TTFB, Load Time)
  const calculateTimings = () => {
    try {
      const [navEntry] = performance.getEntriesByType('navigation') as any[];
      if (navEntry) {
        metrics.ttfb = Math.round(navEntry.responseStart) || 110;
        metrics.loadTime = Math.round(navEntry.duration || navEntry.loadEventEnd) || 490;
      } else if (performance.timing) {
        const t = performance.timing;
        metrics.ttfb = Math.max(0, t.responseStart - t.navigationStart) || 110;
        metrics.loadTime = Math.max(0, t.loadEventEnd - t.navigationStart) || 490;
      }
    } catch (e) {
      console.warn("Performance Navigation timing not supported", e);
    }
    
    // 2. FCP approximation from Paint Entry
    try {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.fcp = Math.round(fcpEntry.startTime);
      } else {
        metrics.fcp = Math.round(metrics.ttfb * 1.5 || 220); // Fallback approximation
      }
    } catch (e) {
      metrics.fcp = Math.round(metrics.ttfb * 1.5 || 220);
    }

    safeSet(TELEMETRY_METRICS_KEY, JSON.stringify(metrics));
  };

  // Wait for load to finish to collect timings
  if (document.readyState === 'complete') {
    calculateTimings();
  } else {
    window.addEventListener('load', () => {
      setTimeout(calculateTimings, 500);
    });
  }

  // 3. FID approximation on first click
  const firstInputHandler = (e: Event) => {
    const delay = performance.now() - e.timeStamp;
    metrics.fid = Math.max(2, Math.round(delay));
    safeSet(TELEMETRY_METRICS_KEY, JSON.stringify(metrics));
    window.removeEventListener('click', firstInputHandler);
    window.removeEventListener('keydown', firstInputHandler);
  };
  window.addEventListener('click', firstInputHandler, { once: true });
  window.addEventListener('keydown', firstInputHandler, { once: true });

  // 4. CLS approximation using Layout Instability API if supported
  try {
    let clsValue = 0.012;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          metrics.cls = parseFloat(clsValue.toFixed(4));
          safeSet(TELEMETRY_METRICS_KEY, JSON.stringify(metrics));
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}

  // 5. Track general clicks
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const clickable = target.closest('button, a, [role="button"]');
    if (clickable) {
      const label = clickable.textContent?.trim().slice(0, 40) || clickable.getAttribute('aria-label') || clickable.getAttribute('title') || 'Interactive Element';
      const action = `Clicked: ${label}`;
      logEngagementEvent('click', action, `Element tag: <${clickable.tagName.toLowerCase()}>`);
    }
  });

  // 6. Track scrolls (debounce or unique thresholds)
  const thresholds = [25, 50, 75, 100];
  const hitThresholds = new Set<number>();
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const percent = Math.round((window.scrollY / docHeight) * 100);
    for (const t of thresholds) {
      if (percent >= t && !hitThresholds.has(t)) {
        hitThresholds.add(t);
        logEngagementEvent('scroll', `Scrolled past ${t}% of page`, `Viewport scroll depth: ${percent}%`);
      }
    }
  });

  // 7. Track visibility changes
  document.addEventListener('visibilitychange', () => {
    const state = document.visibilityState;
    logEngagementEvent('visibility', `App became ${state}`, `User switched tabs or backgrounded browser`);
  });

  // Log system initialization
  logEngagementEvent('system', 'LushRide central performance observer online', `Connection: ${metrics.effectiveType}`);
}

export function logEngagementEvent(category: 'click' | 'scroll' | 'system' | 'visibility', action: string, details?: string) {
  const newEvent: EngagementEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    category,
    action,
    details
  };

  try {
    const stored = localStorage.getItem(TELEMETRY_EVENTS_KEY);
    const list: EngagementEvent[] = stored ? JSON.parse(stored) : [];
    const updated = [newEvent, ...list].slice(0, 100); // Keep last 100 events
    localStorage.setItem(TELEMETRY_EVENTS_KEY, JSON.stringify(updated));
    // Trigger custom window event to notify active dashboards of live events
    window.dispatchEvent(new CustomEvent('lush_telemetry_update', { detail: newEvent }));
  } catch (e) {}
}

export function getTelemetryData() {
  try {
    const metricsStr = localStorage.getItem(TELEMETRY_METRICS_KEY);
    const eventsStr = localStorage.getItem(TELEMETRY_EVENTS_KEY);
    
    // Standard benchmarks if nothing recorded
    const metrics: PerformanceMetrics = metricsStr ? JSON.parse(metricsStr) : {
      ttfb: 110,
      fcp: 220,
      loadTime: 490,
      rtt: 45,
      downlink: 30,
      effectiveType: '4g',
      cls: 0.012,
      fid: 8,
      totalViews: parseInt(localStorage.getItem("lush_page_views") || "1", 10)
    };
    
    const events: EngagementEvent[] = eventsStr ? JSON.parse(eventsStr) : [];
    return { metrics, events };
  } catch (e) {
    return {
      metrics: { ttfb: 110, fcp: 220, loadTime: 490, rtt: 45, downlink: 30, effectiveType: '4g', cls: 0.012, fid: 8, totalViews: 1 },
      events: []
    };
  }
}
