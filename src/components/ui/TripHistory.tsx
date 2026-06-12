import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Search, RefreshCw, Car, Printer, Clock, Route } from 'lucide-react';
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
    distance: '32 km',
    time: '45 mins',
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
    distance: 'N/A',
    time: '8 Hours',
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
    distance: '38 km',
    time: '55 mins',
    amount: '₦120,000',
    status: 'Completed',
  }
];

export default function TripHistory({ onClose }: TripHistoryProps) {
  const [printId, setPrintId] = useState<string | null>(null);

  useEffect(() => {
    if (printId) {
      window.print();
      // setTimeout to allow print dialog to capture before resetting
      const timeout = setTimeout(() => setPrintId(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [printId]);

  const handleRebook = (id: string) => {
    toast.success(`Booking ${id} has been queued for re-booking. Our concierge will contact you to confirm.`);
  };

  const handlePrint = (id: string) => {
    setPrintId(id);
  };

  return (
    <>
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${printId ? 'hidden' : ''}`}>
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

                    <div className="flex items-center gap-4 text-xs font-light text-muted-1 mb-4">
                      <span className="flex items-center gap-1.5"><Car size={14} /> {trip.vehicle}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-white/80 font-medium">{trip.amount}</span>
                    </div>

                    <div className="bg-[#111] rounded-md p-3 border border-white/5 flex gap-4 md:gap-6 justify-between items-center text-xs text-white/60">
                      <div className="flex items-center gap-2">
                         <Route size={14} className="text-lush-yellow/80" />
                         <span><span className="hidden md:inline uppercase text-[9px] tracking-widest text-white/40 mr-1">Est. Distance:</span>{trip.distance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Clock size={14} className="text-lush-yellow/80" />
                         <span><span className="hidden md:inline uppercase text-[9px] tracking-widest text-white/40 mr-1">Est. Time:</span>{trip.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Car size={14} className="text-lush-yellow/80" />
                         <span className="line-clamp-1"><span className="hidden lg:inline uppercase text-[9px] tracking-widest text-white/40 mr-1">Class:</span>{trip.vehicle.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 justify-end shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
                    <button 
                      onClick={() => handleRebook(trip.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black text-[10px] uppercase font-semibold tracking-widest rounded hover:bg-lush-yellow transition-colors whitespace-nowrap"
                    >
                      <RefreshCw size={14} /> Re-book
                    </button>
                    <button 
                      onClick={() => handlePrint(trip.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 text-white text-[10px] uppercase font-semibold tracking-widest rounded hover:border-white/30 transition-colors whitespace-nowrap"
                    >
                      <Printer size={14} /> Print Itinerary
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {printId && (
        <div className="bg-white text-black p-8 max-w-2xl mx-auto hidden print:block absolute inset-0 z-[9999]">
          {mockHistory.filter(t => t.id === printId).map(trip => (
            <div key={trip.id} className="border-2 border-black p-8">
              <div className="flex justify-between items-start mb-12 border-b-2 border-black pb-8">
                <div>
                  <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">LushRide</h1>
                  <p className="text-sm text-gray-500 font-mono">EXECUTIVE ITINERARY</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-xl">{trip.id}</p>
                  <p className="text-gray-500 mt-1">{trip.date}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Service Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold">Type</p>
                      <p>{trip.type}</p>
                    </div>
                    <div>
                      <p className="font-bold">Vehicle</p>
                      <p>{trip.vehicle}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Route Information</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-black pl-4">
                      <p className="font-bold text-sm uppercase text-gray-500">Pick-up</p>
                      <p className="text-lg">{trip.origin}</p>
                    </div>
                    <div className="border-l-2 border-black pl-4">
                      <p className="font-bold text-sm uppercase text-gray-500">Drop-off</p>
                      <p className="text-lg">{trip.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-8 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-bold text-green-600 uppercase tracking-widest">{trip.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold">{trip.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
