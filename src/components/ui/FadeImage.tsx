import React, { useState, useEffect, useRef } from 'react';

interface FadeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  placeholder?: string;
}

const DEFAULT_B64_PLACEHOLDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGNQQAEzCWEGhu8M34X+M/yH4l9M/5m+M/xn+AdkvoPxT2aoKgw1MAkAADMDEWv41/YdAAAAAElFTkSuQmCC";

export default function FadeImage({ wrapperClassName = '', className = '', placeholder = DEFAULT_B64_PLACEHOLDER, src, ...props }: FadeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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
        src={isInView ? src : undefined}
        onLoad={(e) => {
          setIsLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
        className={`relative z-20 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
}

