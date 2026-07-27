import React, { useState, useEffect, useRef } from 'react';

interface FadeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  placeholder?: string;
  priority?: boolean;
}

const DEFAULT_B64_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGNQQAEzCWEGhu8M34X+M/yH4l9M/5m+M/xn+AdkvoPxT2aoKgw1MAkAADMDEWv41/YdAAAAAElFTkSuQmCC";

function getOptimizedImageAttrs(src: string | undefined, originalSizes?: string) {
  if (!src) return {};

  const isUnsplash = src.includes('images.unsplash.com');
  if (!isUnsplash) {
    // For non-unsplash images (like local ones), we use normal src and standard lazy loading attributes
    return {
      src,
      loading: 'lazy' as const,
      decoding: 'async' as const,
    };
  }

  // Extract base photography URL
  const baseUrl = src.split('?')[0];
  
  // Custom high-luxury responsive sizes using modern WebP format
  const widths = [375, 480, 640, 768, 1024, 1280, 1600];
  const srcSet = widths
    .map(w => {
      // Scale down Quality slightly for smaller mobile devices to save cellular broadband and CPU
      const q = w <= 480 ? 70 : w <= 768 ? 75 : w <= 1024 ? 80 : 85;
      return `${baseUrl}?auto=format&fit=crop&fm=webp&w=${w}&q=${q} ${w}w`;
    })
    .join(', ');

  // Default fallback source (WebP format with high quality)
  const optimizedSrc = `${baseUrl}?auto=format&fit=crop&fm=webp&w=1200&q=80`;

  return {
    src: optimizedSrc,
    srcSet,
    sizes: originalSizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
}

export default function FadeImage({ 
  wrapperClassName = '', 
  className = '', 
  placeholder = DEFAULT_B64_PLACEHOLDER, 
  src, 
  sizes,
  priority = false,
  ...props 
}: FadeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isEager = priority || props.loading === 'eager';
  const [isInView, setIsInView] = useState(isEager);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isEager) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Preload 200px before appearing in viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isEager]);

  const optimized = getOptimizedImageAttrs(src, sizes);

  return (
    <div className={`relative overflow-hidden w-full h-full bg-[#111] ${wrapperClassName}`}>
      {/* Blurred base64 placeholder */}
      <img 
        src={placeholder} 
        alt="" 
        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl filter transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0 z-0' : 'opacity-100 z-10'}`} 
      />
      
      <img
        {...props}
        ref={imgRef}
        src={isInView ? optimized.src : undefined}
        srcSet={isInView ? optimized.srcSet : undefined}
        sizes={isInView ? optimized.sizes : undefined}
        loading={optimized.loading}
        decoding={optimized.decoding}
        onLoad={(e) => {
          setIsLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
        className={`relative z-20 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
}

