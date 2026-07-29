import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Auto-recovery for chunk loading failures after new deployments
    if (
      error?.name === 'ChunkLoadError' || 
      error?.message?.includes('Failed to fetch dynamically imported module') ||
      error?.message?.includes('Importing a module script failed')
    ) {
      const hasReloaded = sessionStorage.getItem('lushride_chunk_reload');
      if (!hasReloaded) {
        sessionStorage.setItem('lushride_chunk_reload', 'true');
        window.location.reload();
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white px-6">
          <h1 className="text-4xl font-display mb-4 text-white">Something went wrong.</h1>
          <p className="text-white/60 mb-8 max-w-md text-center">We apologize for the inconvenience. Please refresh the page to try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-lush-yellow transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
