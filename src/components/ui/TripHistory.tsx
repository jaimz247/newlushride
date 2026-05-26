import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Search, RefreshCw, Car } from 'lucide-react';
import { toast } from 'sonner';

interface TripHistoryProps {
  onClose: () => void;
}

const mockHistory = [
  {
    id: 'TRP-8472',
    date: '2026-04-12',
    type: 'Transfer',
    origin: 'Murtala Muhammed Airport',
    destination: 'Eko Hotel & Suites, Victoria Island',
    vehicle: 'Lexus RX 350',
    amount: '₦85,000',
    status: 'Completed',
  },
  {
    id: 'TRP-7391',
    date: '2026-03-28',
    type: 'Hourly',
    origin: 'Lekki Phase 1',
    destination: 'Multiple Stops (Lagos Mainland)',
    vehicle: 'Mercedes-Benz G-Wagon',
    amount: '₦350,000',
    status: 'Completed',
  },
  {
    id: 'TRP-6102',
    date: '2026-02-15',
    type: 'Transfer',
    origin: 'Banana Island',
    destination: 'Murtala Muhammed Airport',
    vehicle: 'Range Rover Sentinel',
    amount: '₦120,000',
    status: 'Completed',
  }
];

export default function TripHistory({ onClose }: TripHistoryProps) {
  const handleRebook = (id: string) => {
    toast.success(`Booking ${id} has been queued for re-booking. Our concierge will contact you to confirm.`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-3xl" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5 bg-charcoal">
          <div>
            <h2 className="text-2xl font-display text-white mb-1">Trip History</h2>
            <p className="text-sm text-muted-1">Review your past itineraries and repeat bookings.</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto hide-scrollbar flex-1 bg-charcoal/50">
          <div className="flex flex-col gap-4">
            {mockHistory.map((trip) => (
              <div key={trip.id} className="bg-[#0A0A0A] border border-white/5 p-5 rounded-lg hover:border-lush-yellow/30 transition-colors group flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-lush-yellow border border-lush-yellow/30 px-2 py-0.5 rounded-sm bg-lush-yellow/10">
                      {trip.type}
                    </span>
                    <span className="text-xs text-muted-1 font-mono">{trip.date}</span>
                    <span className="text-xs text-white/40 ml-auto md:ml-2">ID: {trip.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_24px_1fr] gap-3 items-center mb-4">
                    <div className="flex items-start gap-2">
                       <MapPin size={14} className="text-white/30 mt-0.5 shrink-0" />
                       <span className="text-sm text-white/80 line-clamp-1">{trip.origin}</span>
                    </div>
                    <div className="hidden md:flex justify-center text-white/20">
                      <Search size={16} className="rotate-90" />
                    </div>
                    <div className="flex items-start gap-2">
                       <MapPin size={14} className="text-lush-yellow mt-0.5 shrink-0" />
                       <span className="text-sm text-white/80 line-clamp-1">{trip.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-light text-muted-1">
                    <span className="flex items-center gap-1.5"><Car size={14} /> {trip.vehicle}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/80">{trip.amount}</span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-3 justify-end shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
                  <button 
                    onClick={() => handleRebook(trip.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black text-[10px] uppercase font-semibold tracking-widest rounded hover:bg-lush-yellow transition-colors whitespace-nowrap"
                  >
                    <RefreshCw size={14} /> Re-book
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2.5 border border-white/10 text-white text-[10px] uppercase font-semibold tracking-widest rounded hover:border-white/30 transition-colors whitespace-nowrap">
                    View Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
