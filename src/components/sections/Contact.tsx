import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};
    let hasError = false;

    ['name', 'email', 'subject', 'message'].forEach((field) => {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      if (!input.value.trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      toast.success('Your message has been sent. Our concierge will be in touch.', {
        style: {
          background: '#111',
          color: '#fff',
          borderColor: 'rgba(255,255,255,0.1)'
        }
      });
      
      form.reset();
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const getBorderColor = (field: string) => errors[field] ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-lush-yellow';

  return (
    <section id="contact" className="bg-theme transition-colors duration-500 py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display mb-6 text-white leading-tight">
              Connect with Our <br className="hidden md:block"/> Concierge.
            </h2>
            <p className="text-lg text-muted-2 font-light leading-relaxed mb-12">
              Whether you require bespoke mobility solutions, immediate support, or ongoing partnership logistics, our dedicated concierge team is available around the clock.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-lush-yellow mr-6 flex-shrink-0">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-1 mb-1">Direct Line</p>
                  <a href="tel:+2347037404784" className="text-lg font-light text-white hover:text-lush-yellow transition-colors">+234 703 740 4784</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-lush-yellow mr-6 flex-shrink-0">
                  <MessageSquare size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-1 mb-1">WhatsApp Concierge</p>
                  <a href="https://wa.me/2347037404784" target="_blank" rel="noreferrer" className="text-lg font-light text-white hover:text-lush-yellow transition-colors">+234 703 740 4784</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-lush-yellow mr-6 flex-shrink-0">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-1 mb-1">General Inquiries</p>
                  <a href="mailto:Info@lushride.com" className="text-lg font-light text-white hover:text-lush-yellow transition-colors">Info@lushride.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Simple Contact Form */}
          <motion.div 
            className="bg-charcoal border border-white/10 p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <h3 className="text-2xl font-display text-white mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['name'] ? 'text-red-500' : 'text-muted-1'}`}>Name</label>
                  <input name="name" type="text" className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors ${getBorderColor('name')}`} onChange={() => setErrors(e => ({...e, name: false}))} />
                </div>
                <div>
                  <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['email'] ? 'text-red-500' : 'text-muted-1'}`}>Email</label>
                  <input name="email" type="email" className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors ${getBorderColor('email')}`} onChange={() => setErrors(e => ({...e, email: false}))} />
                </div>
              </div>
              
              <div>
                <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['subject'] ? 'text-red-500' : 'text-muted-1'}`}>Subject</label>
                <input name="subject" type="text" className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors ${getBorderColor('subject')}`} onChange={() => setErrors(e => ({...e, subject: false}))} />
              </div>
              
              <div>
                <label className={`block text-xs uppercase tracking-widest mb-2 ${errors['message'] ? 'text-red-500' : 'text-muted-1'}`}>Message</label>
                <textarea name="message" rows={4} className={`w-full bg-transparent border-b text-white py-2 outline-none transition-colors resize-none ${getBorderColor('message')}`} onChange={() => setErrors(e => ({...e, message: false}))}></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || success}
                className={`w-full py-4 border text-sm tracking-widest uppercase font-medium transition-all mt-4 ${
                  success 
                    ? 'bg-lush-yellow border-lush-yellow text-charcoal'
                    : 'bg-transparent border-white/30 text-lush-yellow hover:bg-lush-yellow hover:text-charcoal'
                }`}
              >
                {isSubmitting ? 'Sending...' : success ? 'Message Sent' : 'Message Concierge'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
