export interface SiteConfig {
  hero: {
    title: string;
    subtitle: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    registration?: string;
    hours?: string;
  };
  fleet: {
    name: string;
    subtitle: string;
    images: string[];
    specs: {
      engine: string;
      efficiency: string;
      capacity: string;
    };
    comfortFeatures: string[];
    safetyFeatures: string[];
    overview: string;
    safety: string;
    history: string;
  }[];
  faqs: {
    category: string;
    question: string;
    answer: string;
  }[];
}
