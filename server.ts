import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to store dynamic site configurations
const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(DATA_DIR, "siteConfig.json");

// Default initial config matching the pre-existing visual details
const DEFAULT_CONFIG = {
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

// Ensure data directory and default config file exist
function initializeConfig() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONFIG_FILE)) {
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2), "utf-8");
      console.log("[Data] Site configuration initialized with defaults.");
    }
  } catch (error) {
    console.error("[Data] Failed to initialize configuration:", error);
  }
}
initializeConfig();

// Read config helper
function getSiteConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("[Data] Error reading config file, serving defaults:", e);
  }
  return DEFAULT_CONFIG;
}

// Write config helper
function saveSiteConfig(newConfig: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("[Data] Error writing config file:", e);
    return false;
  }
}

// Session store (in-memory token validation)
const ADMIN_TOKEN = "lush_secure_token_secret_2026_xyz";

// API Route for health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API Route for site-config
app.get("/api/site-config", (req, res) => {
  res.json(getSiteConfig());
});

// API Route for Admin Login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || "lushadmin";

  if (password === configuredPassword) {
    return res.json({ success: true, token: ADMIN_TOKEN });
  } else {
    return res.status(401).json({ error: "Invalid admin password. Access denied." });
  }
});

// API Route for updating configuration
app.post("/api/admin/update-config", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(403).json({ error: "Unauthorized access." });
  }

  const newConfig = req.body;
  if (!newConfig || typeof newConfig !== "object") {
    return res.status(400).json({ error: "Invalid configuration payload." });
  }

  const success = saveSiteConfig(newConfig);
  if (success) {
    res.json({ success: true, message: "Configuration successfully updated." });
  } else {
    res.status(500).json({ error: "Failed to persist site configuration." });
  }
});

// API Route for Newsletter
app.post("/api/newsletter/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: "Valid email is required" });
  }
  console.log(`[Newsletter] Subscribed: ${email}`);
  setTimeout(() => {
    res.json({ success: true, message: "Subscribed successfully" });
  }, 800);
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
