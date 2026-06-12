import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'FR';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    'nav.about': 'ABOUT',
    'nav.services': 'SERVICES',
    'nav.fleet': 'FLEET',
    'nav.hubs': 'HUBS',
    'nav.partner': 'PARTNERS',
    'nav.quote': 'REQUEST QUOTE',
    'hero.title': 'The Sovereign of\nLagos Transit',
    'hero.subtitle': 'Lagos\' finest premium chauffeur service. Absolute comfort, uncompromising privacy, and precision scheduling for the elite.',
    'hero.cta': 'Book Your Journey',
    'hero.secondary': 'Explore the Fleet'
  },
  FR: {
    'nav.about': 'À PROPOS',
    'nav.services': 'SERVICES',
    'nav.fleet': 'FLOTTE',
    'nav.hubs': 'CENTRES',
    'nav.partner': 'PARTENAIRES',
    'nav.quote': 'DEVIS',
    'hero.title': 'Le Souverain du\nTransit de Lagos',
    'hero.subtitle': 'Le service de chauffeur premium le plus raffiné de Lagos. Confort absolu, vie privée sans compromis et planification de précision pour l\'élite.',
    'hero.cta': 'Réservez votre voyage',
    'hero.secondary': 'Explorer la Flotte'
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.toUpperCase().startsWith('FR') ? 'FR' : 'EN';
    }
    return 'EN';
  });

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
