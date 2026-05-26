import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './index.css';

import { I18nProvider } from './lib/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
