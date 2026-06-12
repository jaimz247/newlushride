import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Mail, User, CheckCircle, ArrowRight } from 'lucide-react';

export default function Waitlist() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // Simulate API registration
    setTimeout(() => {
      setIsSubmitting(false);
      setJoined(true);
      toast.success('Congratulations! You are officially on the LushRide waitlist.', {
        description: 'We will notify you the moment your priority access window opens.',
        style: {
          background: '#050505',
          color: '#fff',
          borderColor: '#E2E8F0',
        },
      });
      // Store in localStorage for persistence
      const currentList = JSON.parse(localStorage.getItem('lush_waitlist') || '[]');
      currentList.push({ name, email, time: new Date().toISOString() });
      localStorage.setItem('lush_waitlist', JSON.stringify(currentList));
    }, 1200);
  };

  return (
    <section id="waitlist" className="bg-theme py-32 transition-colors duration-500 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lush-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-16 text-center shadow-3xl">
          <div className="inline-flex px-4 py-2 bg-gradient-to-r from-lush-yellow/10 to-transparent border border-lush-yellow/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold text-lush-yellow mb-6">
            Exclusive App Launch
          </div>

          <h2 className="text-3xl md:text-5xl font-display text-white mb-6 tracking-tight">
            Join the Sovereign Circuit.
          </h2>
          <p className="text-muted-2 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12">
            LushRide is currently in premium private beta. Access to bookings is limited to registered queue holders. Secure your priority invite to experience Lagos' elite chauffeur service.
          </p>

          <AnimatePresence mode="wait">
            {!joined ? (
              <motion.form 
                key="form"
                onSubmit={handleJoin}
                className="max-w-md mx-auto space-y-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative">
                  <span className="text-white/40 absolute left-4 top-1/2 -translate-y-1/2">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:border-lush-yellow focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="relative">
                  <span className="text-white/40 absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:border-lush-yellow focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-lush-yellow text-black font-semibold tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed text-xs"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" />
                      <span>Securing VIP Access...</span>
                    </>
                  ) : (
                    <>
                      Request Priority Invite <ArrowRight size={14} />
                    </>
                  )}
                </button>

                {isSubmitting && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-1.5 text-[10px] text-lush-yellow/60 tracking-wider uppercase font-mono mt-2"
                  >
                    <span className="w-1.5 h-1.5 bg-lush-yellow rounded-full animate-ping" />
                    Connecting to Elite Guest Gateway...
                  </motion.div>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="max-w-md mx-auto py-6 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-lush-yellow/10 rounded-full text-lush-yellow mb-6">
                  <CheckCircle size={32} />
                </div>
                
                <h3 className="text-2xl font-display text-white mb-2">Priority Seat Secured.</h3>
                <p className="text-muted-2 text-sm font-light mb-8">
                  Welcome to the circle, <span className="text-white font-medium">{name}</span>. Your private invitation key is queued.
                </p>

                {/* Aesthetic VIP Pass Card */}
                <div className="border border-white/10 bg-black/60 rounded-xl p-6 text-left relative overflow-hidden mb-6 shadow-2xl">
                  {/* Fine linear decorative cuts */}
                  <div className="absolute top-0 right-0 h-16 w-16 bg-lush-yellow/5 rounded-bl-full border-b border-l border-white/5" />
                  
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-1">Vessel Tier</p>
                      <h4 className="text-xs font-semibold text-lush-yellow tracking-wider mt-0.5">Sovereign Lounge Access</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-1">Status</p>
                      <span className="inline-flex items-center px-2 py-0.5 mt-0.5 rounded text-[8px] font-bold tracking-widest uppercase bg-lush-yellow/10 text-lush-yellow border border-lush-yellow/20">
                        Priority Beta
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Queue Position</p>
                      <p className="text-xl font-display text-white mt-1">
                        #{Math.abs((name.length + email.length) * 11) % 450 + 2840}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Reference Code</p>
                      <p className="text-sm font-mono text-white mt-1.5 font-medium">
                        LR-{name.slice(0, 3).toUpperCase()}-{Math.round(name.length * email.length)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-white/10 pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Registered Email</p>
                      <p className="text-xs text-white/70 font-light mt-0.5">{email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Invite Window</p>
                      <p className="text-xs text-lush-yellow font-medium mt-0.5">Dispatching 14 Days</p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-muted-2 font-light leading-relaxed max-w-sm mx-auto">
                  A verification link and digital credentials have been logged. Please make sure to whitelist <span className="text-white">vips@lushride.com</span> in your inbox.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
