export function Logo({ className = "w-24 md:w-32" }: { className?: string, textClassName?: string }) {
  return (
    <div className="flex items-center">
      <img src="/logo.png" alt="LushRide" className={`object-contain ${className}`} />
    </div>
  );
}

